import path from "path";
import chalk from "chalk";
import { createDirectory, writeFile, installDependencies } from "../utils/file";
import { ExtensionConfig } from "../config/default";
import { createReactTemplate } from "./react";
import { createVanillaTemplate } from "./vanilla";
import { generateWebpackTemplate } from "./webpack";
import { createHtmlTemplate } from "./html";
import { createPopupTemplate } from "./popup";
import { createOptionsTemplate } from "./options";
import { createBackgroundTemplate } from "./background";
import { createContentTemplate } from "./content";

export async function createExtension(config: ExtensionConfig) {
  const projectPath = path.join(process.cwd(), config.name);

  try {
    // Create directories
    createDirectory(projectPath);
    createDirectory(path.join(projectPath, "src/pages/popup"));
    createDirectory(path.join(projectPath, "src/pages/options"));
    createDirectory(path.join(projectPath, "src/background"));
    createDirectory(path.join(projectPath, "src/content-scripts"));
    createDirectory(path.join(projectPath, "src/styles"));
    createDirectory(path.join(projectPath, "public/assets"));

    // Generate files based on template
    generateManifest(projectPath, config);
    generateWebpackConfig(projectPath, config);
    generateTsConfig(projectPath);
    createHtmlTemplate(projectPath, config);
    generateSourceFiles(projectPath, config);
    generateMainFiles(projectPath, config);

    // Setup dependencies
    process.chdir(projectPath);
    setupPackageJson(config);
    installProjectDependencies(config);

    logSuccess(config.name);
  } catch (error) {
    logError(error);
    process.exit(1);
  }
}

function generateManifest(projectPath: string, config: ExtensionConfig): void {
  const manifest = {
    manifest_version: 3,
    name: config.name,
    version: "1.0.0",
    description: config.description,
    action: {
      default_popup: "popup.html",
    },
    permissions: config.permissions,
  };

  writeFile(path.join(projectPath, "manifest.json"), JSON.stringify(manifest, null, 2));
}

function generateWebpackConfig(projectPath: string, config: ExtensionConfig): void {
  const webpackConfig = generateWebpackTemplate(config);
  writeFile(path.join(projectPath, "webpack.config.js"), webpackConfig);
}

function generateTsConfig(projectPath: string): void {
  const tsConfig = {
    compilerOptions: {
      target: "es5",
      lib: ["dom", "dom.iterable", "esnext"],
      allowJs: true,
      skipLibCheck: true,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      strict: true,
      forceConsistentCasingInFileNames: true,
      module: "esnext",
      moduleResolution: "node",
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: "react-jsx",
    },
    include: ["src"],
  };

  writeFile(path.join(projectPath, "tsconfig.json"), JSON.stringify(tsConfig, null, 2));
}

function generateSourceFiles(projectPath: string, config: ExtensionConfig): void {
  const template = config.useReact ? createReactTemplate(config) : createVanillaTemplate(config);
  const extension = config.useReact ? "tsx" : "ts";

  writeFile(path.join(projectPath, `src/popup.${extension}`), template);
}

function setupPackageJson(config: ExtensionConfig): void {
  const packageJson = {
    name: config.name,
    version: "1.0.0",
    scripts: {
      build: "webpack --mode production",
      dev: "webpack --mode development --watch",
    },
  };

  writeFile("package.json", JSON.stringify(packageJson, null, 2));
}

function installProjectDependencies(config: ExtensionConfig): void {
  const dependencies = getDependencies(config);
  const devDependencies = getDevDependencies(config);

  const pm = config.packageManager;

  if (dependencies.length) {
    installDependencies(dependencies, false, pm);
  }
  if (devDependencies.length) {
    installDependencies(devDependencies, true, pm);
  }
}

function getDependencies(config: ExtensionConfig): string[] {
  return config.useReact ? ["react", "react-dom"] : [];
}

function getDevDependencies(config: ExtensionConfig): string[] {
  return [
    "typescript",
    "webpack",
    "webpack-cli",
    "ts-loader",
    "@types/chrome",
    "html-webpack-plugin",
    "copy-webpack-plugin",
    ...(config.useReact ? ["@types/react", "@types/react-dom"] : []),
    ...(config.useTailwind ? ["tailwindcss", "postcss", "postcss-loader", "autoprefixer"] : []),
  ];
}

function generateMainFiles(projectPath: string, config: ExtensionConfig): void {
  const ext = config.useReact ? "tsx" : "ts";

  writeFile(path.join(projectPath, `src/pages/popup/index.${ext}`), createPopupTemplate(config));
  writeFile(path.join(projectPath, `src/pages/options/index.${ext}`), createOptionsTemplate(config));
  writeFile(path.join(projectPath, `src/background/index.ts`), createBackgroundTemplate());
  writeFile(path.join(projectPath, `src/content-scripts/index.ts`), createContentTemplate());
}

function logSuccess(name: string): void {
  console.log(chalk.green("\n✨ Chrome extension created successfully!"));
  console.log(chalk.blue("\nNext steps:"));
  console.log(`1. cd ${name}`);
  console.log("2. npm run build");
  console.log("3. Load extension from dist/ directory in Chrome\n");
}

function logError(error: any): void {
  console.error(chalk.red("Error creating extension:"), error);
}

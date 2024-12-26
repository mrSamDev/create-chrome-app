import path from "path";
import { writeFile } from "../../utils/file";
import { ExtensionConfig } from "../../config/default";

function generateTailwindConfig(projectPath: string): void {
  const config = `
  module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {},
    },
    plugins: [],
  }`;
  writeFile(path.join(projectPath, "tailwind.config.js"), config);
}

function generatePostcssConfig(projectPath: string): void {
  const config = `
  module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }`;
  writeFile(path.join(projectPath, "postcss.config.js"), config);
}

function generateTailwindStyles(projectPath: string): void {
  const css = `
  @tailwind base;
  @tailwind components;
  @tailwind utilities;`;
  writeFile(path.join(projectPath, "src/styles/tailwind.css"), css);
}

export default function generateStyles(projectPath: string, config: ExtensionConfig) {
  if (config.useTailwind) {
    generateTailwindConfig(projectPath);
    generatePostcssConfig(projectPath);
    generateTailwindStyles(projectPath);
  }
}

export interface ExtensionConfig {
  name: string;
  description: string;
  permissions: string[];
  useReact: boolean;
  useTailwind: boolean;
  packageManager: "npm" | "pnpm";
}

export const defaultPermissions = ["activeTab", "storage", "notifications"];

export const dependencies = {
  react: ["react", "react-dom"],
  dev: ["typescript", "webpack", "webpack-cli", "ts-loader"],
};

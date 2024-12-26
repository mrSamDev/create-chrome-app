export interface ExtensionConfig {
  name: string;
  description: string;
  permissions: string[];
  useReact: boolean;
  useTailwind: boolean;
  packageManager: "npm" | "pnpm";
}

export const defaultPermissions = [
  "activeTab",
  "alarms",
  "background",
  "bookmarks",
  "browserSettings",
  "browsingData",
  "clipboardRead",
  "clipboardWrite",
  "contentSettings",
  "contextMenus",
  "cookies",
  "debugger",
  "declarativeContent",
  "declarativeNetRequest",
  "desktopCapture",
  "downloads",
  "favicon",
  "fontSettings",
  "geolocation",
  "history",
  "identity",
  "idle",
  "management",
  "notifications",
  "pageCapture",
  "power",
  "printing",
  "privacy",
  "proxy",
  "scripting",
  "search",
  "sessions",
  "storage",
  "system.cpu",
  "system.memory",
  "system.storage",
  "tabGroups",
  "tabs",
  "topSites",
  "tts",
  "ttsEngine",
  "webNavigation",
  "webRequest",
];

export const dependencies = {
  react: ["react", "react-dom"],
  dev: ["typescript", "webpack", "webpack-cli", "ts-loader"],
};

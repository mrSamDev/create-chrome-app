import { ExtensionConfig } from "../../config/default";
import path from "path";
import { writeFile } from "../../utils/file";

export function createGenerateManifest(projectPath: string, config: ExtensionConfig): void {
  const manifest = {
    manifest_version: 3,
    name: config.name,
    version: "1.0.0",
    description: config.description,
    permissions: config.permissions,
    action: {
      default_popup: "popup.html",
      default_icon: {
        "16": "assets/icon16.png",
        "48": "assets/icon48.png",
        "128": "assets/icon128.png",
      },
    },
    icons: {
      "16": "assets/icon16.png",
      "48": "assets/icon48.png",
      "128": "assets/icon128.png",
    },
    options_ui: {
      page: "options.html",
      open_in_tab: true,
    },
    background: {
      service_worker: "background.js",
    },
    content_scripts: [
      {
        matches: ["<all_urls>"],
        js: ["content.js"],
      },
    ],
  };

  writeFile(path.join(projectPath, "public/manifest.json"), JSON.stringify(manifest, null, 2));
}

import { ExtensionConfig } from "../../config/default";
import { writeFile } from "../../utils/file";
import path from "path";

export function createHtmlTemplate(projectPath: string, config: ExtensionConfig): void {
  // Create popup.html
  writeFile(
    path.join(projectPath, "public/popup.html"),
    `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>${config.name} Popup</title>
    ${config.useTailwind ? '<link href="./styles/tailwind.css" rel="stylesheet">' : ""}
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`
  );

  // Create options.html
  writeFile(
    path.join(projectPath, "public/options.html"),
    `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>${config.name} Options</title>
    ${config.useTailwind ? '<link href="./styles/tailwind.css" rel="stylesheet">' : ""}
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`
  );
}

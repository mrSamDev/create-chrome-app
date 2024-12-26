import { ExtensionConfig } from "../../config/default";

export function createHtmlTemplate(title: string, config: ExtensionConfig): string {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      ${config.useTailwind ? '<link href="./styles/tailwind.css" rel="stylesheet">' : ""}
    </head>
    <body>
      <div id="root"></div>
    </body>
  </html>`;
}

import { ExtensionConfig } from "../../config/default";

export function createVanillaTemplate(config: ExtensionConfig): string {
  return `
    document.getElementById('root')!.innerHTML = '<h1>${config.name}</h1>';
    `;
}

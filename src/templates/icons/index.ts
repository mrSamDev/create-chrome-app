import path from "path";
import { writeFile } from "../../utils/file";

export function createIcons(projectPath: string): void {
  const sizes = [16, 48, 128];
  sizes.forEach((size) => {
    // Create a basic SVG icon
    const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#4285f4"/>
      </svg>`;

    writeFile(path.join(projectPath, `public/assets/icon${size}.png`), svg);
  });
}

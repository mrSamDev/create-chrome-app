import fs from "fs";
import { execSync } from "child_process";

export function createDirectory(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function writeFile(filePath: string, content: string): void {
  fs.writeFileSync(filePath, content);
}

export function installDependencies(dependencies: string[], dev = false): void {
  const command = `npm install ${dev ? "-D" : ""} ${dependencies.join(" ")}`;
  execSync(command, { stdio: "inherit" });
}

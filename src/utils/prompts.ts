import { input, select, checkbox, confirm } from "@inquirer/prompts";
import { validateProjectName } from "./validation";
import { ExtensionConfig, defaultPermissions } from "../config/default";

export async function promptUser(): Promise<ExtensionConfig> {
  const name = await input({
    message: "What is your extension name?",
    validate: validateProjectName,
  });

  const description = await input({
    message: "Enter a description:",
  });

  const permissions = await checkbox({
    message: "Select required permissions:",
    choices: defaultPermissions.map((p) => ({ value: p, label: p })),
  });

  const packageManager: "npm" | "pnpm" = await select({
    message: "Select package manager:",
    choices: [
      //@ts-ignore
      { value: "npm", label: "npm" },
      //@ts-ignore
      { value: "pnpm", label: "pnpm" },
    ],
    default: "npm",
  });

  const useReact = await confirm({
    message: "Would you like to use React?",
  });

  const useTailwind = await confirm({
    message: "Would you like to use Tailwind CSS?",
  });

  return { name, description, packageManager, permissions, useReact, useTailwind };
}

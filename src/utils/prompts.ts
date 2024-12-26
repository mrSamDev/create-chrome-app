import { input, select, confirm } from "@inquirer/prompts";
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

  const permissions = await select({
    message: "Select required permissions:",
    choices: defaultPermissions.map((p) => ({ value: p, label: p })),
    loop: true,
    default: defaultPermissions[0],
  });

  console.log("permissions: ", permissions);

  const useReact = await confirm({
    message: "Would you like to use React?",
  });

  const useTailwind = await confirm({
    message: "Would you like to use Tailwind CSS?",
  });

  return { name, description, permissions, useReact, useTailwind };
}

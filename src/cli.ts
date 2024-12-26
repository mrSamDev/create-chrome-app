#!/usr/bin/env node
import { Command } from "commander";
import { promptUser } from "./utils/prompts";
import { createExtension } from "./templates/base";

const program = new Command();

program.name("ccx").description("CLI to create Chrome extensions with TypeScript").version("1.0.0");

program
  .command("create", { isDefault: true })
  .description("Create a new Chrome extension")
  .action(async () => {
    try {
      const config = await promptUser();
      await createExtension(config);
    } catch (error) {
      console.error("Error:", error);
      process.exit(1);
    }
  });

program.parse();

export function validateProjectName(input: string): boolean | string {
  if (!input) return "Project name is required";
  if (!/^[a-zA-Z0-9-_]+$/.test(input)) {
    return "Project name can only contain letters, numbers, dashes and underscores";
  }
  return true;
}

import { ExtensionConfig } from "../../config/default";

export function createReactTemplate(config: ExtensionConfig): string {
  return `
  import React from 'react';
  import { createRoot } from 'react-dom/client';
  import App from './App';
  
  const root = createRoot(document.getElementById('root')!);
  root.render(<App />);
  `;
}

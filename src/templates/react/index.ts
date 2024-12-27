import { ExtensionConfig } from "../../config/default";

export function createReactTemplate(config: ExtensionConfig): string {
  return `
import React from 'react';
import { createRoot } from 'react-dom/client';
import Popup from './Popup';

const root = createRoot(document.getElementById('root')!);
root.render(<Popup />);

// src/pages/options/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import Options from './Options';

const root = createRoot(document.getElementById('root')!);
root.render(<Options />);

// src/content-scripts/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import ContentApp from './ContentApp';

const mount = () => {
  const root = document.createElement('div');
  root.id = 'extension-root';
  document.body.appendChild(root);
  createRoot(root).render(<ContentApp />);
};

// Ensure DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
`;
}

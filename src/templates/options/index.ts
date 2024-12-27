import { ExtensionConfig } from "../../config/default";

export function createOptionsTemplate(config: ExtensionConfig): string {
  if (config.useReact) {
    return `
import React from 'react';
${config.useTailwind ? "import '../../styles/tailwind.css';" : ""}

const Options = () => {
 return (
   <div className="p-4">
     <h1 className="text-2xl font-bold mb-4">Options</h1>
     <div className="space-y-4">
       <div className="flex items-center space-x-2">
         <input type="checkbox" id="notifications" />
         <label htmlFor="notifications">Enable notifications</label>
       </div>
     </div>
   </div>
 );
};
  
  export default Options;`;
  }
  return `
document.addEventListener('DOMContentLoaded', () => {
 const root = document.getElementById('root');
 if (root) {
   root.innerHTML = \`
     <h1>Options</h1>
     <div>
       <input type="checkbox" id="notifications">
       <label for="notifications">Enable notifications</label>
     </div>
   \`;
 }
    
  
  `;
}

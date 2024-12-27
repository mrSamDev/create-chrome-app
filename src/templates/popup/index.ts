import { ExtensionConfig } from "../../config/default";

export function createPopupTemplate(config: ExtensionConfig): string {
  if (config.useReact) {
    return `
  import React, { useState } from 'react';
${config.useTailwind ? "import '../../styles/tailwind.css';" : ""}

const Popup = () => {
 const [count, setCount] = useState(0);

 return (
   <div className="p-4 min-w-[300px]">
     <h1 className="text-2xl font-bold mb-4">${config.name}</h1>
     <button 
       className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
       onClick={() => setCount(prev => prev + 1)}
     >
       Count: {count}
     </button>
   </div>
 );
};
  
  export default Popup;`;
  }
  return `


document.addEventListener('DOMContentLoaded', () => {
 const root = document.getElementById('root');
 let count = 0;
 
 if (root) {
   const button = document.createElement('button');
   button.textContent = 'Count: 0';
   button.onclick = () => {
     count++;
     button.textContent = \`Count: \${count}\`;
   };
   root.appendChild(button);
 }
  `;
}

export function createContentTemplate(): string {
  return `
 // This script runs in the context of web pages
 console.log('Content script loaded');
 
 document.addEventListener('click', () => {
  chrome.runtime.sendMessage({ 
    type: 'GET_DATA' 
  }, (response) => {
    console.log('Response:', response);
  });
 });`;
}

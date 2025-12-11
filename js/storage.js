// Simple storage helpers using localStorage; switch to IndexedDB when needed
export function save(key, value){
  try{localStorage.setItem(key,JSON.stringify(value));return true}catch(e){console.warn('Storage save failed',e);return false}
}
export function load(key){
  try{return JSON.parse(localStorage.getItem(key))}catch(e){return null}
}
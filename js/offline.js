window.addEventListener('offline', ()=>{
  try{if('serviceWorker' in navigator)console.log('offline - service worker active');}catch(e){}
});
window.addEventListener('online', ()=>{console.log('You are online');});
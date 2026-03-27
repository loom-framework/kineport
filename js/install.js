// -----------------------------------------------------------------------------
// Description: Application bootstrap and initialization logic.
// Author: Janis Bedeicis
// Github: https://github.com/loom-framework
// E-mail: loom.framework@gmail.com
// Created: 2008
// -----------------------------------------------------------------------------


// Optional: show install prompt when available
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e)=>{
  e.preventDefault();
  deferredPrompt = e;
  // show custom install CTA if desired
  const btn = document.createElement('button');
  btn.textContent = 'Install this app';
  btn.className='set_btn';
  btn.addEventListener('click', async ()=>{
    btn.disabled=true;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    console.log('Install choice', choice);
    deferredPrompt = null;
    btn.remove();
  });
  document.querySelector('.drawer-settings')?.appendChild(btn);
});
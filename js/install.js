// Optional: show install prompt when available
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e)=>{
  e.preventDefault();
  deferredPrompt = e;
  // show custom install CTA if desired
  const btn = document.createElement('button');
  btn.textContent = 'Install as app';
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
// Optional: show install prompt when available
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e)=>{
  e.preventDefault();
  deferredPrompt = e;
  // show custom install CTA if desired
  const btn = document.createElement('button');
  btn.textContent = 'Install app';
  btn.className='btn';
  btn.addEventListener('click', async ()=>{
    btn.disabled=true;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    console.log('Install choice', choice);
    deferredPrompt = null;
    btn.remove();
  });
  document.querySelector('.hero')?.appendChild(btn);
});
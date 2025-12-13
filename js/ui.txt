// UI: theme toggle, nav toggle, enhanced accessibility
const themeBtn = document?.getElementById('theme-toggle') || document.querySelector('#component-header button#theme-toggle');
if(themeBtn){
  themeBtn.addEventListener('click', ()=>{
    const cur = document.documentElement.getAttribute('data-theme')||'light';
    const next = cur==='dark'?'light':'dark';
    document.documentElement.setAttribute('data-theme',next);
    try{localStorage.setItem('theme',next)}catch(e){}
    themeBtn.setAttribute('aria-pressed', next==='dark');
  });
}
// restore saved theme
try{const t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}

// nav toggle behavior
const menuBtn = document?.getElementById('menu-toggle') || document.querySelector('#component-header button#menu-toggle');
const nav = document.getElementById('nav-menu') || document.querySelector('.site-nav');
if(menuBtn && nav){
  menuBtn.addEventListener('click', ()=>{
    const expanded = menuBtn.getAttribute('aria-expanded')==='true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
}

// keyboard: close nav with Escape
document.addEventListener('keydown',(e)=>{if(e.key==='Escape'){nav?.classList.remove('open');menuBtn?.setAttribute('aria-expanded','false');}});
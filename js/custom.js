const links = document.querySelectorAll('nav a');
  const currentPath = window.location.pathname; // gets current page path

  links.forEach(link => {
    if(link.getAttribute('href') === currentPath){
      link.style.fontWeight = 'bold'; // make current page bold
      // Optional: link.style.color = 'black';
    }
  });
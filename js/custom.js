// Universal print button
document.addEventListener('click', function (e) {
    if (e.target?.id === 'print-page') {

        // Close drawer before print
        const drawer = document.querySelector('.mobile-drawer');
        if (drawer) drawer.classList.remove('open');

        // Allow layout to update before printing
        setTimeout(() => window.print(), 50);
    }
});

// Ensure drawer is closed before print
window.addEventListener('beforeprint', () => {
    const drawer = document.querySelector('.mobile-drawer');
    if (drawer) drawer.classList.remove('open');
});

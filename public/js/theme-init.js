(function () {
    try {
        let saved = localStorage.getItem('theme');
        let prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        let theme = saved || (prefersDark ? 'dark' : 'light');
        let root = document.documentElement;
        root.classList.toggle('dark', theme === 'dark');
        root.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
    } catch (e) {}
})();
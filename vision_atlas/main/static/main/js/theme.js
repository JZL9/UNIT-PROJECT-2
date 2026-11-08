const html = document.documentElement;
const btn = document.getElementById('themeToggle');
const icon = btn.querySelector('i');

function applyTheme(theme) {
    html.setAttribute('data-bs-theme', theme);
    icon.className = theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars';
    localStorage.setItem('theme', theme);
}

applyTheme(localStorage.getItem('theme') || 'light');

btn.addEventListener('click', () => {
    const next = html.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
});
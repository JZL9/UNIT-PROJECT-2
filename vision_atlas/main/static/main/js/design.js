const navbar = document.querySelector('.navbar');

if (document.body.classList.contains('has-hero')) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll);
}

document.body.classList.add('js-reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const steps = document.querySelectorAll('.scrolly-step');

if (steps.length) {
    const images = document.querySelectorAll('.scrolly-img');

    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const current = entry.target.dataset.step;
            steps.forEach((s) => s.classList.toggle('active', s === entry.target));
            images.forEach((img) => img.classList.toggle('active', img.dataset.step === current));
        });
    }, { rootMargin: '-45% 0px -45% 0px' });

    steps.forEach((s) => stepObserver.observe(s));
}


document.querySelectorAll('.stat-value').forEach((el) => {
    const match = el.textContent.trim().match(/^([\d,]+)(.*)$/);
    if (!match) return;

    const [, numberText, suffix] = match;
    if (!numberText.includes(',') && !suffix) return;

    const target = parseInt(numberText.replace(/,/g, ''), 10);
    const start = performance.now();
    const duration = 3500;

    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased).toLocaleString('en-US') + suffix;
        if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
});


const progressBar = document.querySelector('.scroll-progress');

function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? window.scrollY / max : 0;
    progressBar.style.width = `${progress * 100}%`;
}

updateProgress();
window.addEventListener('scroll', updateProgress);
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
document.addEventListener("DOMContentLoaded", () => {
    const navbar     = document.querySelector('.navbar');
    const hamburger  = document.getElementById('hamburger');
    const navLinks   = document.getElementById('nav-links');
    const backToTop  = document.getElementById('back-to-top');
    const HEADER_H   = 70;

    // ─── 1. Entrance Animations ──────────────────────────────────────────────
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px', threshold: 0.12 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => scrollObserver.observe(el));

    // ─── 2. Smooth Scroll ────────────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.pageYOffset - HEADER_H;
            window.scrollTo({ top, behavior: 'smooth' });
            closeMenu();
        });
    });

    // ─── 3. Navbar Shadow + Back-to-Top on Scroll ────────────────────────────
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        navbar.classList.toggle('scrolled', y > 20);
        backToTop.classList.toggle('visible', y > 400);
    }, { passive: true });

    // ─── 4. Active Nav Link ──────────────────────────────────────────────────
    const sections   = document.querySelectorAll('section[id], header[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]:not(.btn-primary-outline)');

    const activeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navAnchors.forEach(a => {
                    a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

    sections.forEach(s => activeObserver.observe(s));

    // ─── 5. Mobile Menu ──────────────────────────────────────────────────────
    function closeMenu() {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
        navLinks.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    document.addEventListener('click', e => {
        if (navLinks.classList.contains('open') && !navbar.contains(e.target)) {
            closeMenu();
        }
    });

    // ─── 6. Back to Top ──────────────────────────────────────────────────────
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

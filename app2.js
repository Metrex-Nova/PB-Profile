// Dark / light mode
const modeToggle = document.getElementById('modeToggle');
const icon = modeToggle.querySelector('i');

function setTheme(dark) {
    document.body.classList.toggle('dark-mode', dark);
    icon.className = dark ? 'fas fa-sun' : 'fas fa-moon';
}

let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) {}
setTheme(saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches);

modeToggle.addEventListener('click', () => {
    const dark = !document.body.classList.contains('dark-mode');
    setTheme(dark);
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
});

// Flowers drift gently with scroll (parallax)
const flowers = document.querySelectorAll('.flower');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) {
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const y = window.scrollY;
            flowers.forEach((f, i) => {
                const offset = Math.sin(y / 500 + i * 1.3) * (40 + i * 10);
                f.style.setProperty('--py', `${offset.toFixed(1)}px`);
            });
            ticking = false;
        });
    }, { passive: true });
}

// Typing effect
const typed = document.getElementById('typed-text');
const words = ['Mathematician', 'Researcher', 'Computer Scientist', 'Physicist'];
let w = 0, c = 0;

function type() {
    if (c < words[w].length) {
        typed.textContent += words[w].charAt(c++);
        setTimeout(type, 90);
    } else {
        setTimeout(erase, 1500);
    }
}

function erase() {
    if (c > 0) {
        typed.textContent = words[w].substring(0, --c);
        setTimeout(erase, 60);
    } else {
        w = (w + 1) % words.length;
        setTimeout(type, 400);
    }
}

if (reduceMotion) {
    typed.textContent = words.join(' · ');
} else {
    setTimeout(type, 600);
}

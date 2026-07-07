document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Terminal Intro Animation ---
    const introSection = document.getElementById('terminal-intro');
    const introType = document.getElementById('intro-type');
    const introText = "Initializing OS payload... \nBypassing security protocols... \nConnection established... \nAccess Granted.";
    let introIndex = 0;

    function typeIntro() {
        if (introIndex < introText.length) {
            if (introText.charAt(introIndex) === '\n') {
                introType.innerHTML += '<br><span class="prompt">root@sahil-os:~#</span> ';
            } else {
                introType.innerHTML += introText.charAt(introIndex);
            }
            introIndex++;
            setTimeout(typeIntro, 30);
        } else {
            setTimeout(() => {
                introSection.style.opacity = '0';
                setTimeout(() => {
                    introSection.style.display = 'none';
                    initHeroTyping();
                    initMatrixBackground();
                    initNeuralCanvas();
                }, 1000);
            }, 800);
        }
    }
    typeIntro();

    // --- 2. Hero Section Typing Effect ---
    const heroRoles = [
        "Cybersecurity Enthusiast",
        "Ethical Hacker",
        "Networking Specialist",
        "Cloud & DevOps Learner"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const heroTypeElement = document.getElementById('hero-type');

    function initHeroTyping() {
        const currentRole = heroRoles[roleIndex];
        
        if (isDeleting) {
            heroTypeElement.innerHTML = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            heroTypeElement.innerHTML = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % heroRoles.length;
            typeSpeed = 500;
        }
        setTimeout(initHeroTyping, typeSpeed);
    }

    // --- 3. Scroll Reveal & Counters ---
    const overlay = document.querySelector('.portfolio-overlay');
    const revealElements = document.querySelectorAll('.fade-in-up');
    const counters = document.querySelectorAll('.counter');
    let hasAnimatedCounters = false;

    function checkScroll() {
        // Sticky nav bg
        const navbar = document.getElementById('navbar');
        if (overlay.scrollTop > 50) {
            navbar.style.background = 'rgba(0, 10, 0, 0.95)';
            navbar.style.boxShadow = '0 2px 15px rgba(0, 255, 65, 0.2)';
        } else {
            navbar.style.background = 'rgba(0, 10, 0, 0.8)';
            navbar.style.boxShadow = 'none';
        }

        // Reveal elements
        const triggerBottom = window.innerHeight * 0.85;
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('visible');
            }
        });

        // Counters
        const statsSection = document.getElementById('achievements');
        if (statsSection) {
            const sectionTop = statsSection.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight * 0.8 && !hasAnimatedCounters) {
                hasAnimatedCounters = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const inc = target / 30; // approx 30 frames
                    let current = 0;
                    const updateCounter = () => {
                        current += inc;
                        if (current < target) {
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCounter();
                });
            }
        }
    }
    overlay.addEventListener('scroll', checkScroll);
    checkScroll(); // check once on load

    // --- 4. Matrix Rain Background ---
    function initMatrixBackground() {
        const canvas = document.getElementById('matrixCanvas');
        const ctx = canvas.getContext('2d');
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~'.split('');
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];
        for (let x = 0; x < columns; x++) { drops[x] = 1; }

        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 8, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#00ff41'; // Matrix green
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                if (Math.random() > 0.95) ctx.fillStyle = '#fff';
                else ctx.fillStyle = '#0f0';

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        setInterval(drawMatrix, 50);
    }

    // --- 5. Small Neural Canvas Animation ---
    function initNeuralCanvas() {
        const canvas = document.getElementById('neuralCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        // It has fixed width/height 350x200
        const points = [];
        for(let i=0; i<30; i++){
            points.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5
            });
        }

        function drawNeural() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#000a00';
            ctx.fillRect(0,0, canvas.width, canvas.height);

            for(let i=0; i<points.length; i++) {
                let p = points[i];
                p.x += p.vx;
                p.y += p.vy;
                if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if(p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI*2);
                ctx.fillStyle = '#00ff41';
                ctx.fill();

                for(let j=i+1; j<points.length; j++){
                    let p2 = points[j];
                    let d = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if(d < 70) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(0, 255, 65, ${1 - d/70})`;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(drawNeural);
        }
        drawNeural();
    }

    // --- 6. Draggable OS Windows ---
    const windows = document.querySelectorAll('.os-window');
    windows.forEach(win => {
        const titlebar = win.querySelector('.window-titlebar');
        const closeBtn = win.querySelector('.win-close');
        let isDragging = false;
        let startX, startY, initialX, initialY;

        // Bring to front on click
        win.addEventListener('mousedown', () => {
            windows.forEach(w => w.style.zIndex = 10);
            win.style.zIndex = 12;
        });

        if (titlebar) {
            titlebar.addEventListener('mousedown', (e) => {
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                initialX = win.offsetLeft;
                initialY = win.offsetTop;
                // prevent text selection
                e.preventDefault();
            });

            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                win.style.left = (initialX + dx) + 'px';
                win.style.top = (initialY + dy) + 'px';
            });

            document.addEventListener('mouseup', () => {
                isDragging = false;
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                win.style.display = 'none';
            });
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if(hamburger){
        hamburger.addEventListener('click', () => {
            if(navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.right = '0';
                navLinks.style.top = '60px';
                navLinks.style.background = '#000';
                navLinks.style.padding = '20px';
                navLinks.style.border = '1px solid #00ff41';
            }
        });
    }

});

// Global functions for certificate modal
window.openCertModal = function(imageSrc) {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('certModalImg');
    if (modal && modalImg) {
        modal.style.display = "flex";
        modalImg.src = imageSrc;
    }
};

window.closeCertModal = function() {
    const modal = document.getElementById('certModal');
    if (modal) {
        modal.style.display = "none";
    }
};

window.addEventListener('click', function(event) {
    const modal = document.getElementById('certModal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

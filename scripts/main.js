document.addEventListener('DOMContentLoaded', () => {

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));


    // Mobile Nav Toggle & Accessibility
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = navLinks ? navLinks.querySelectorAll('a') : [];

    if (mobileToggle && navLinks) {

        function toggleMenu() {
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');

            if (!isExpanded) {
                mobileToggle.innerHTML = '&#10005;'; // X symbol
                document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open

                // Focus trap logic could go here, for now ensure first link is focusable
                setTimeout(() => {
                    if (navItems.length > 0) navItems[0].focus();
                }, 100);

            } else {
                mobileToggle.innerHTML = '&#9776;'; // Hamburger symbol
                document.body.style.overflow = '';
            }
        }

        function closeMenu() {
            mobileToggle.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('active');
            mobileToggle.innerHTML = '&#9776;';
            document.body.style.overflow = '';
            mobileToggle.focus(); // Return focus to toggle
        }

        mobileToggle.addEventListener('click', toggleMenu);

        // Close when a link is clicked
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    closeMenu();
                }
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
                closeMenu();
            }
        });
    }

    // Quote Form: Interactive Mockup Logic
    const artworkInput = document.getElementById('artwork-upload');
    const dropZone = document.getElementById('drop-zone');
    const mockupOverlay = document.getElementById('mockup-overlay');
    const fileNameDisplay = document.getElementById('file-name');
    const garmentRadios = document.querySelectorAll('input[name="garment"]');
    const mockupBase = document.getElementById('mockup-base');

    if (artworkInput && mockupOverlay) {

        // Handle Garment Change (Visual only for this demo)
        garmentRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                // In a real app, this would switch the background image URL
                // For now, we'll just slightly change the "base" styling or color
                mockupBase.className = 'mockup-base ' + e.target.value;
            });
        });

        // Handle File Upload
        function handleFile(file) {
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    mockupOverlay.src = e.target.result;
                    mockupOverlay.style.display = 'block';
                    fileNameDisplay.textContent = 'Selected: ' + file.name;
                    fileNameDisplay.style.color = 'var(--color-owl-gold)';
                };
                reader.readAsDataURL(file);
            }
        }

        artworkInput.addEventListener('change', (e) => {
            handleFile(e.target.files[0]);
        });

        // Click to upload
        dropZone.addEventListener('click', () => artworkInput.click());

        // Drag & Drop
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = 'var(--color-owl-gold)';
            dropZone.style.background = 'rgba(214, 162, 74, 0.1)';
        });

        dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = '';
            dropZone.style.background = '';
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = '';
            dropZone.style.background = '';
            const file = e.dataTransfer.files[0];
            handleFile(file);
        });
    }

});

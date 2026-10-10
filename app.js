document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       MOBILE MENU / HAMBURGER
       ========================================================================== */
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('open');
            navMenu.classList.toggle('open');
        });
        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }
    /* ==========================================================================
       ACTIVE LINK ON SCROLL
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    /* ==========================================================================
       HERO AUTO IMAGE SLIDER
       ========================================================================== */
    const heroSlides = document.querySelectorAll('#heroSlider .slide');
    let currentHeroSlide = 0;
    if (heroSlides.length > 0) {
        setInterval(() => {
            // Remove active class from current slide
            heroSlides[currentHeroSlide].classList.remove('active');
            
            // Increment index
            currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
            
            // Add active class to new slide
            heroSlides[currentHeroSlide].classList.add('active');
        }, 5000); // 5 seconds interval
    }
    /* ==========================================================================
       CERTIFICATE LIGHTBOX
       ========================================================================== */
    const certificateBtn = document.getElementById('certificateBtn');
    const certificateLightbox = document.getElementById('certificateLightbox');
    const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
    if (certificateBtn && certificateLightbox) {
        const closeLightbox = () => certificateLightbox.classList.remove('open');
        certificateBtn.addEventListener('click', () => certificateLightbox.classList.add('open'));
        if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
        certificateLightbox.addEventListener('click', (e) => {
            if (e.target === certificateLightbox) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });
    }
    /* ==========================================================================
       CONTACT FORM SUBMISSION (API POST)
       ========================================================================== */
    // Paste your Formspree URL here (e.g. https://formspree.io/f/abcdwxyz)
    const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successModal = document.getElementById('successModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalOkBtn = document.getElementById('modalOkBtn');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            // Form data
            const name = document.getElementById('formName').value;
            const email = document.getElementById('formEmail').value;
            const website = document.getElementById('formWebsite').value || 'Not specified';
            const message = document.getElementById('formMessage').value;
            if (FORM_ENDPOINT.includes('YOUR_FORM_ID')) {
                alert('The form is temporarily unavailable. Please contact me via social media.');
                return;
            }
            // Start loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            try {
                // Perform POST request
                const response = await fetch(FORM_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        website: website,
                        message: message
                    })
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('Submission Success:', data);
                    
                    // Show success modal
                    successModal.classList.add('open');
                    
                    // Reset form
                    contactForm.reset();
                } else {
                    alert('Something went wrong while sending. Please try again later.');
                }
            } catch (error) {
                console.error('Submission Error:', error);
                alert('Network error. Please check your internet connection.');
            } finally {
                // End loading state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        });
    }
    // Modal closing logic
    if (successModal) {
        const closeModal = () => {
            successModal.classList.remove('open');
        };
        if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
        if (modalOkBtn) modalOkBtn.addEventListener('click', closeModal);
        // Close when clicking backdrop
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                closeModal();
            }
        });
    }
});

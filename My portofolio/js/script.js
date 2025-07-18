document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        // Global settings:
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add `aos-*` classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 120, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 800, // values from 0 to 3000, with step 50ms
        easing: 'ease-in-out', // default easing for AOS animations
        once: true, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element should trigger the animation
    });

    // Update current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Smooth Scrolling for Navigation Links and Navbar Sticky Effect ---
    const navbar = document.getElementById('mainNav');
    let navbarHeight = navbar ? navbar.offsetHeight : 0; // Initial navbar height

    // Function to update navbar height and Bootstrap ScrollSpy offset
    const updateNavbarHeightAndScrollSpy = () => {
        if (navbar) {
            navbarHeight = navbar.offsetHeight; // Get current height
            // Update Bootstrap ScrollSpy offset if it's active
            // This ensures sections activate correctly in the nav when scrolled
            if (typeof bootstrap !== 'undefined' && bootstrap.ScrollSpy) {
                const bsScrollSpy = bootstrap.ScrollSpy.getInstance(document.body);
                if (bsScrollSpy) {
                    bsScrollSpy._config.offset = navbarHeight + 1; // Add 1px to avoid flickering
                    bsScrollSpy.refresh(); // Re-calculate scrollspy positions
                }
            }
        }
    };

    // Recalculate on window resize
    window.addEventListener('resize', updateNavbarHeightAndScrollSpy);
    // Also call it once on initial load (after DOMContentLoaded) to set initial offset
    updateNavbarHeightAndScrollSpy();

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('#mainNav .nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor jump

            const targetId = this.getAttribute('href').substring(1); // Get target section ID
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Ensure navbarHeight is up-to-date right before scrolling
                if (navbar) navbarHeight = navbar.offsetHeight;

                // Calculate scroll position, accounting for fixed navbar height and a small extra padding
                const offsetTop = targetElement.offsetTop - navbarHeight - 10; // -10px for a bit of visual breathing room above section

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth' // Smooth scroll animation
                });

                // Close the navbar on mobile after clicking a link (if it's expanded)
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarToggler && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click(); // Simulate a click on the toggler to close the nav menu
                }
            }
        });
    });

    // Add sticky/transparent navbar effect on scroll
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { // When scrolled down more than 50px
                navbar.classList.add('navbar-scrolled'); // Add the class for styling
            } else {
                navbar.classList.remove('navbar-scrolled'); // Remove the class if at top
            }
        });
    }

    // --- Back to Top Button ---
    // Dynamically create the button element
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scrollTopBtn'; // Assign the ID defined in CSS
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top'); // Accessibility
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'; // Font Awesome icon
    document.body.appendChild(scrollTopBtn); // Add button to the body

    // Show/hide the button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // If user scrolls down more than 300px
            scrollTopBtn.style.display = 'flex'; // Show button (using flex for centering content)
        } else {
            scrollTopBtn.style.display = 'none'; // Hide button
        }
    });

    // Scroll to top when the button is clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0, // Scroll to the very top
            behavior: 'smooth' // Smooth scroll animation
        });
    });

    // No explicit JavaScript initialization for the carousel is needed
    // because data-bs-ride="carousel" handles automatic initialization by Bootstrap.
    // However, if you had other Bootstrap JS components you wanted to manually init,
    // you would do it here, e.g.:
    // const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    // const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
});
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('authModal');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const closeBtn = document.querySelector('.close');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Open modal for login
    loginBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    });

    // Open modal for register
    registerBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });

    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Switch to register form
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });

    // Switch to login form
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Form submissions
    document.getElementById('loginFormElement').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        // Here you would typically send this data to your server
        console.log('Login attempt:', { username, password });
        
        // For demo purposes, we'll just show an alert
        alert('Login functionality would connect to your backend. Check the console for details.');
        
        // Close modal after "login"
        modal.style.display = 'none';
    });

    document.getElementById('registerFormElement').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('regUsername').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Here you would typically send this data to your server
        console.log('Registration attempt:', { username, email, password });
        
        // For demo purposes, we'll just show an alert
        alert('Registration functionality would connect to your backend. Check the console for details.');
        
        // Switch to login form after "registration"
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });

    // Load events from server
    loadEvents();

    // Search functionality
    document.getElementById('searchBtn').addEventListener('click', function() {
        const searchTerm = document.querySelector('.search-box input').value;
        const location = document.getElementById('locationFilter').value;
        const category = document.getElementById('categoryFilter').value;
        
        loadEvents(searchTerm, location, category);
    });

    // Function to load events
    function loadEvents(searchTerm = '', location = '', category = '') {
        // In a real application, this would fetch from your PHP backend
        // For now, we'll use mock data
        const mockEvents = [
            {
                id: 1,
                title: "Dar es Salaam Music Festival",
                description: "Annual music festival featuring top Tanzanian artists and international guests.",
                location: "Dar es Salaam",
                date: "2023-12-15",
                time: "18:00",
                category: "Music",
                image: "music.png"
            },
            {
                id: 2,
                title: "Kilimanjaro Marathon",
                description: "Join thousands of runners in this spectacular race at the foot of Africa's highest peak.",
                location: "Moshi",
                date: "2023-11-25",
                time: "06:00",
                category: "Sports",
                image: "marathon.png"
            },
            {
                id: 3,
                title: "Zanzibar International Film Festival",
                description: "Celebrating African cinema with screenings, workshops, and filmmaker discussions.",
                location: "Zanzibar",
                date: "2024-01-20",
                time: "10:00",
                category: "Cultural",
                image: "mrembo.jpg"
            },
            {
                id: 4,
                title: "Tanzania Tech Summit",
                description: "The premier event for technology professionals and entrepreneurs in Tanzania.",
                location: "Dar es Salaam",
                date: "2023-10-10",
                time: "09:00",
                category: "Business",
                image: "summit.png"
            },
            {
                id: 5,
                title: "Serengeti Wildlife Photography Workshop",
                description: "Learn from professional photographers in the heart of the Serengeti.",
                location: "Arusha",
                date: "2023-09-15",
                time: "07:00",
                category: "Education",
                image: "pundamilia.jpg"
            },
            {
                id: 6,
                title: "Dodoma Food Festival",
                description: "Experience the diverse culinary traditions of Tanzania in one exciting event.",
                location: "Dodoma",
                date: "2023-11-05",
                time: "12:00",
                category: "Cultural",
                image: "menyu pro.jpg"
            }
        ];

        // Filter events based on search criteria
        let filteredEvents = mockEvents.filter(event => {
            const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                event.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLocation = location === '' || event.location === location;
            const matchesCategory = category === '' || event.category === category;
            
            return matchesSearch && matchesLocation && matchesCategory;
        });

        displayEvents(filteredEvents);
    }

    // Function to display events
    function displayEvents(events) {
        const eventsContainer = document.getElementById('eventsContainer');
        eventsContainer.innerHTML = '';

        if (events.length === 0) {
            eventsContainer.innerHTML = '<p class="no-events">No events found matching your criteria.</p>';
            return;
        }

        events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            
            eventCard.innerHTML = `
                <div class="event-image" style="background-image: url('${event.image}')"></div>
                <div class="event-info">
                    <h3>${event.title}</h3>
                    <div class="event-meta">
                        <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
                        <span><i class="far fa-calendar-alt"></i> ${formatDate(event.date)}</span>
                    </div>
                    <div class="event-meta">
                        <span><i class="far fa-clock"></i> ${event.time}</span>
                        <span><i class="fas fa-tag"></i> ${event.category}</span>
                    </div>
                    <p class="event-description">${event.description}</p>
                    <div class="event-actions">
                        <button class="details-btn" data-id="${event.id}">Details</button>
                        <button class="register-btn" data-id="${event.id}">Register</button>
                    </div>
                </div>
            `;
            
            eventsContainer.appendChild(eventCard);
        });

        // Add event listeners to the new buttons
        document.querySelectorAll('.details-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const eventId = this.getAttribute('data-id');
                alert(`Details for event ${eventId} would be shown here.`);
            });
        });

        document.querySelectorAll('.register-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const eventId = this.getAttribute('data-id');
                modal.style.display = 'block';
                loginForm.style.display = 'block';
                registerForm.style.display = 'none';
                alert(`After login, you would register for event ${eventId}.`);
            });
        });
    }

    // Helper function to format date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
});
// Toggle password visibility
document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      this.textContent = '👁‍🗨';
    } else {
      passwordField.type = 'password';
      this.textContent = '👁';
    }
  });
  
  // Handle login form submission
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    if (username === 'admin' && password === 'student1234') {
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid credentials. Please try again.');
    }
  });
  
  // Testimonials Data
  const testimonials = [
    {
      quote: "Check-in has made tracking attendance so smooth and accessible!",
      author: "Anusha",
      department: "CSE"
    },
    {
      quote: "The interface is super easy to use. Love the instant notifications!",
      author: "Rahul",
      department: "ECE"
    },
    {
      quote: "Real-time tracking helps us stay punctual and aware.",
      author: "Meena",
      department: "IT"
    }
  ];
  
  
  
  // Initialize Testimonials
  let currentTestimonialIndex = 0;
  
  function initializeTestimonials() {
    const slider = document.getElementById('testimonialSlider');
    const dotsContainer = document.getElementById('testimonialDots');
    
    // Add testimonials to slider
    testimonials.forEach((testimonial, index) => {
      const slide = document.createElement('div');
      slide.className = 'testimonial-slide';
      slide.innerHTML = `
        <div class="testimonial-content">
          <p class="text-lg text-gray-700 italic mb-4">${testimonial.quote}</p>
          <div class="font-medium">
            - ${testimonial.author}, <span class="text-green-600">${testimonial.department}</span>
          </div>
        </div>
      `;
      slider.appendChild(slide);
      
      // Add dot
      const dot = document.createElement('button');
      dot.className = testimonial-dot mx-1 ${index === 0 ? 'active' : ''};
      dot.onclick = () => showTestimonial(index);
      dotsContainer.appendChild(dot);
    });
  }
  
  function showTestimonial(index) {
    const slider = document.getElementById('testimonialSlider');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    currentTestimonialIndex = index;
    slider.style.transform = translateX(-${index * 100}%);
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }
  
  // Initialize Creators
  function initializeCreators() {
    const container = document.querySelector('.grid');
    
    creators.forEach(creator => {
      const card = document.createElement('div');
      card.className = 'creator-card';
      card.innerHTML = `
        <div class="creator-image">
          <span class="text-gray-400 text-2xl">👤</span>
        </div>
        <p class="font-medium">${creator.name}</p>
      `;
      container.appendChild(card);
    });
  }
  
  // Event Listeners
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initializeTestimonials();
    initializeCreators();
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Testimonial navigation
    document.getElementById('prevTestimonial').addEventListener('click', () => {
      currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentTestimonialIndex);
    });
    
    document.getElementById('nextTestimonial').addEventListener('click', () => {
      currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
      showTestimonial(currentTestimonialIndex);
    });
    
    // Auto-advance testimonials
    setInterval(() => {
      currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
      showTestimonial(currentTestimonialIndex);
    }, 5000);
    
    // Button handlers
    document.getElementById('signupBtn').addEventListener('click', () => {
      alert('Sign up functionality will be implemented in the next version.');
    });
    
    document.getElementById('getStartedBtn').addEventListener('click', () => {
      document.getElementById('username').focus();
    });
  });

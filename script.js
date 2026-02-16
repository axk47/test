/* ============================================
   ABDULLAH ABDUL KHADER - PORTFOLIO SCRIPTS
   Enhanced with 3D Effects, Matrix Rain & More
   ============================================ */

// ============================================
// DATA
// ============================================

const skillsData = [
  // Languages
  { name: 'Java', category: 'language', level: 90 },
  { name: 'Python', category: 'language', level: 95 },
  { name: 'SQL', category: 'language', level: 88 },
  { name: 'JavaScript', category: 'language', level: 92 },
  { name: 'HTML/CSS', category: 'language', level: 90 },
  { name: 'Kotlin', category: 'language', level: 75 },
  // Frameworks
  { name: 'FastAPI', category: 'framework', level: 88 },
  { name: 'Next.js', category: 'framework', level: 90 },
  { name: 'React', category: 'framework', level: 92 },
  { name: 'Node.js', category: 'framework', level: 85 },
  { name: 'OpenTelemetry', category: 'framework', level: 80 },
  { name: 'Git', category: 'framework', level: 90 },
  { name: 'Linux', category: 'framework', level: 85 },
  { name: 'PostgreSQL', category: 'framework', level: 88 },
  // Concepts
  { name: 'Software Testing', category: 'concept', level: 92 },
  { name: 'REST APIs', category: 'concept', level: 95 },
  { name: 'Agile Development', category: 'concept', level: 88 },
  { name: 'Cybersecurity', category: 'concept', level: 78 },
  { name: 'OOP', category: 'concept', level: 92 },
  { name: 'Multithreading', category: 'concept', level: 85 },
];

const experienceData = [
  {
    title: 'AI Training Specialist',
    company: 'Aether Project â€“ Outlier AI',
    location: 'Remote',
    period: 'Jan 2026 â€“ Present',
    type: 'Contract',
    description: [
      'Train and evaluate large language models by generating high-quality code examples',
      'Perform data annotation and quality assurance tasks to improve AI model accuracy',
      'Assess code correctness, efficiency, and adherence to best practices',
    ],
    skills: ['LLM Training', 'Code Review', 'AI Evaluation', 'Python'],
  },
  {
    title: 'IT Go Live Support',
    company: 'Niagara Health',
    location: 'St. Catharines, ON',
    period: 'Sep 2024 â€“ Dec 2024',
    type: 'Co-op',
    description: [
      'Analyzed complex software systems to identify bugs and troubleshoot issues',
      'Provided technical support to healthcare professionals during critical deployments',
      'Collaborated with IT team to enhance system performance',
    ],
    skills: ['System Analysis', 'Bug Fixing', 'Technical Support', 'Healthcare IT'],
  },
  {
    title: 'Scout Captain',
    company: 'Bharat Scout and Guides',
    location: 'Dammam, KSA',
    period: 'Apr 2022 â€“ Aug 2022',
    type: 'Leadership',
    description: [
      'Led team of 30 members, increasing project completion efficiency by 20%',
      'Organized and coordinated community service projects and outdoor activities',
      'Mentored younger scouts in leadership skills and personal development',
    ],
    skills: ['Leadership', 'Team Management', 'Project Coordination', 'Mentoring'],
  },
];

const projectsData = [
  {
    title: 'ScholarScout',
    subtitle: 'PC Finder',
    description: 'Full-stack web application to rank and recommend academic program committee candidates using multi-factor scoring algorithm.',
    tech: ['Python', 'FastAPI', 'Next.js', 'React', 'NetworkX'],
    image: 'project-scholarscout.jpg',
    highlights: [
      'Built FastAPI backend with REST endpoints for researcher discovery',
      'Implemented semantic similarity matching and explainable ranking',
    ],
  },
  {
    title: 'Code Plagiarism Detection',
    subtitle: 'Academic Tool',
    description: 'Backend plagiarism detection engine analyzing structural code similarities beyond surface-level changes.',
    tech: ['Python', 'Git', 'AST Parsing', 'Algorithm Design'],
    image: 'project-plagiarism.jpg',
    highlights: [
      'Engineered backend detection engine for structural code analysis',
      'Compared abstract syntax trees across student submissions',
    ],
  },
  {
    title: 'Distributed File Transfer',
    subtitle: 'System with Tracing',
    description: 'Client-server file transfer application with integrated distributed tracing using OpenTelemetry.',
    tech: ['Java', 'OpenTelemetry', 'Distributed Systems', 'Testing'],
    image: 'project-filetransfer.jpg',
    highlights: [
      'Built client-server file transfer with distributed tracing',
      'Applied dynamic symbolic execution for defect diagnosis',
    ],
  },
  {
    title: 'Hockey League Database',
    subtitle: 'Sports Management',
    description: 'Relational database system for managing hockey league data with complex relationships.',
    tech: ['SQL', 'PostgreSQL', 'MS Access', 'Database Design'],
    image: 'project-hockey.jpg',
    highlights: [
      'Designed normalized ER model with constraints and triggers',
      'Built interactive database application with forms and queries',
    ],
  },
];

// ============================================
// MATRIX RAIN EFFECT
// ============================================

function initMatrixRain() {
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);
  
  const chars = 'ã‚¢ã‚¤ã‚¦ã‚¨ã‚ªã‚«ã‚­ã‚¯ã‚±ã‚³ã‚µã‚·ã‚¹ã‚»ã‚½ã‚¿ãƒãƒ„ãƒ†ãƒˆãƒŠãƒ‹ãƒŒãƒãƒŽãƒãƒ’ãƒ•ãƒ˜ãƒ›ãƒžãƒŸãƒ ãƒ¡ãƒ¢ãƒ¤ãƒ¦ãƒ¨ãƒ©ãƒªãƒ«ãƒ¬ãƒ­ãƒ¯ãƒ²ãƒ³0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charArray = chars.split('');
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);
  const speeds = Array(columns).fill(0).map(() => Math.random() * 0.5 + 0.5);
  const brightness = Array(columns).fill(0).map(() => Math.random() * 0.5 + 0.5);
  
  let frameCount = 0;
  
  function draw() {
    frameCount++;
    if (frameCount % 2 === 0) {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        ctx.fillStyle = `rgba(56, 189, 248, ${brightness[i]})`;
        ctx.fillText(char, x, y);
        
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
          brightness[i] = Math.random() * 0.5 + 0.5;
        }
        drops[i] += speeds[i];
      }
    }
    requestAnimationFrame(draw);
  }
  
  draw();
}

// ============================================
// FLOATING ORBS EFFECT
// ============================================

function initFloatingOrbs() {
  const canvas = document.getElementById('orbCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);
  
  const orbs = [];
  const colors = ['hsla(199, 89%, 48%, ', 'hsla(190, 90%, 60%, ', 'hsla(210, 100%, 60%, ', 'hsla(180, 80%, 50%, '];
  
  for (let i = 0; i < 8; i++) {
    orbs.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 100 + 50,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }
  
  let time = 0;
  
  function draw() {
    time += 0.01;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    orbs.forEach(orb => {
      orb.x += orb.vx;
      orb.y += orb.vy;
      
      if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius;
      if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius;
      if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius;
      if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius;
      
      const pulseRadius = orb.radius + Math.sin(time + orb.x * 0.01) * 20;
      const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, pulseRadius);
      gradient.addColorStop(0, orb.color + '0.4)');
      gradient.addColorStop(0.5, orb.color + '0.2)');
      gradient.addColorStop(1, orb.color + '0)');
      
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, pulseRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    });
    
    requestAnimationFrame(draw);
  }
  
  draw();
}

// ============================================
// PARTICLE FIELD EFFECT
// ============================================

function initParticleField() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);
  
  const particles = [];
  const particleCount = 80;
  const focalLength = 300;
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: (Math.random() - 0.5) * canvas.width * 2,
      y: (Math.random() - 0.5) * canvas.height * 2,
      z: Math.random() * 1000,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      vz: -Math.random() * 2 - 0.5,
      size: Math.random() * 2 + 1,
    });
  }
  
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - canvas.width / 2) * 0.001;
    mouseY = (e.clientY - canvas.height / 2) * 0.001;
  });
  
  function draw() {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    particles.forEach(particle => {
      particle.x += particle.vx + mouseX * particle.z * 0.01;
      particle.y += particle.vy + mouseY * particle.z * 0.01;
      particle.z += particle.vz;
      
      if (particle.z < -focalLength) {
        particle.z = 1000;
        particle.x = (Math.random() - 0.5) * canvas.width * 2;
        particle.y = (Math.random() - 0.5) * canvas.height * 2;
      }
      
      const scale = focalLength / (focalLength + particle.z);
      const x2d = particle.x * scale + centerX;
      const y2d = particle.y * scale + centerY;
      const size2d = particle.size * scale;
      const opacity = Math.max(0, Math.min(1, (1000 - particle.z) / 1000));
      
      ctx.beginPath();
      ctx.arc(x2d, y2d, size2d, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(199, 89%, 48%, ${opacity * 0.8})`;
      ctx.fill();
    });
    
    // Draw connections
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dz = p1.z - p2.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (distance < 200 && p1.z < 500 && p2.z < 500) {
          const scale1 = focalLength / (focalLength + p1.z);
          const scale2 = focalLength / (focalLength + p2.z);
          const x1 = p1.x * scale1 + centerX;
          const y1 = p1.y * scale1 + centerY;
          const x2 = p2.x * scale2 + centerX;
          const y2 = p2.y * scale2 + centerY;
          const avgZ = (p1.z + p2.z) / 2;
          const opacity = Math.max(0, (500 - avgZ) / 500) * 0.3;
          
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = `hsla(199, 89%, 48%, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });
    
    requestAnimationFrame(draw);
  }
  
  draw();
}

// ============================================
// CYBER GRID EFFECT
// ============================================

function initCyberGrid() {
  const canvas = document.getElementById('gridCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);
  
  const gridSize = 50;
  let offset = 0;
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = 'hsla(199, 89%, 48%, 0.1)';
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    // Horizontal lines with scroll
    offset = (offset + 0.5) % gridSize;
    for (let y = offset; y <= canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    
    // Intersection points
    ctx.fillStyle = 'hsla(199, 89%, 48%, 0.3)';
    for (let x = 0; x <= canvas.width; x += gridSize) {
      for (let y = offset; y <= canvas.height; y += gridSize) {
        const distFromCenter = Math.sqrt(Math.pow(x - canvas.width / 2, 2) + Math.pow(y - canvas.height / 2, 2));
        const maxDist = Math.sqrt(Math.pow(canvas.width / 2, 2) + Math.pow(canvas.height / 2, 2));
        ctx.globalAlpha = (1 - distFromCenter / maxDist) * 0.5;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
    
    requestAnimationFrame(draw);
  }
  
  draw();
}

// ============================================
// TYPING EFFECT
// ============================================

function initTypingEffect() {
  const roleElement = document.getElementById('heroRole');
  if (!roleElement) return;
  
  const text = roleElement.textContent;
  roleElement.textContent = '';
  let i = 0;
  
  function type() {
    if (i < text.length) {
      roleElement.textContent += text.charAt(i);
      i++;
      setTimeout(type, 50);
    }
  }
  
  setTimeout(type, 800);
}

// ============================================
// 3D TILT EFFECT FOR HERO
// ============================================

function initHeroTilt() {
  const heroContent = document.getElementById('heroContent');
  const heroImage = document.getElementById('heroImage');
  if (!heroContent || !heroImage) return;
  
  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    
    heroContent.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    heroImage.style.transform = `rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
  });
}

// ============================================
// TILT CARDS
// ============================================

function initTiltCards() {
  const cards = document.querySelectorAll('[data-tilt]');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / centerY * -10;
      const rotateY = (x - centerX) / centerX * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

// ============================================
// RENDER SKILLS
// ============================================

function renderSkills() {
  const cloud = document.getElementById('skillsCloud');
  const langContainer = document.getElementById('langSkills');
  const frameworkContainer = document.getElementById('frameworkSkills');
  const conceptContainer = document.getElementById('conceptSkills');
  
  if (cloud) {
    skillsData.forEach((skill, index) => {
      const tag = document.createElement('span');
      tag.className = `skill-tag-cloud ${skill.category}`;
      tag.innerHTML = `${skill.name}<span class="skill-level">${skill.level}%</span>`;
      tag.style.animationDelay = `${index * 0.1}s`;
      cloud.appendChild(tag);
    });
  }
  
  const renderSkillBar = (skill, container) => {
    const item = document.createElement('div');
    item.className = 'skill-bar-item';
    item.innerHTML = `
      <span class="skill-name">${skill.name}</span>
      <div class="skill-progress">
        <div class="skill-progress-bar ${skill.category}" style="width: 0%"></div>
      </div>
      <span class="skill-percent">${skill.level}%</span>
    `;
    container.appendChild(item);
    
    // Animate progress bar
    setTimeout(() => {
      item.querySelector('.skill-progress-bar').style.width = `${skill.level}%`;
    }, 500);
  };
  
  if (langContainer) {
    skillsData.filter(s => s.category === 'language').forEach(s => renderSkillBar(s, langContainer));
  }
  if (frameworkContainer) {
    skillsData.filter(s => s.category === 'framework').slice(0, 6).forEach(s => renderSkillBar(s, frameworkContainer));
  }
  if (conceptContainer) {
    skillsData.filter(s => s.category === 'concept').slice(0, 6).forEach(s => renderSkillBar(s, conceptContainer));
  }
}

// ============================================
// RENDER EXPERIENCE
// ============================================

function renderExperience() {
  const container = document.querySelector('.timeline-items');
  if (!container) return;
  
  experienceData.forEach((exp, index) => {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.innerHTML = `
      <div class="timeline-node"></div>
      <div class="timeline-card" style="${index % 2 === 1 ? 'grid-column: 2' : ''}">
        <div class="timeline-header">
          <div class="timeline-title">
            <h3>${exp.title}</h3>
            <p class="company">${exp.company}</p>
          </div>
          <div class="timeline-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          </div>
        </div>
        <div class="timeline-meta">
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            ${exp.location}
          </span>
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            ${exp.period}
          </span>
          <span class="badge badge-outline">${exp.type}</span>
        </div>
        <ul class="timeline-desc">
          ${exp.description.map(d => `<li>${d}</li>`).join('')}
        </ul>
        <div class="timeline-skills">
          ${exp.skills.map(s => `<span>${s}</span>`).join('')}
        </div>
      </div>
    `;
    container.appendChild(item);
  });
  
  // Animate timeline line
  const timelinePath = document.getElementById('timelinePath');
  if (timelinePath) {
    setTimeout(() => {
      timelinePath.style.transition = 'stroke-dashoffset 2s ease';
      timelinePath.style.strokeDashoffset = '0';
    }, 500);
  }
}

// ============================================
// RENDER PROJECTS
// ============================================

function renderProjects() {
  const container = document.getElementById('projectsGrid');
  if (!container) return;
  
  projectsData.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card tilt-card';
    card.setAttribute('data-tilt', '');
    card.innerHTML = `
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}" onerror="this.style.display='none'">
        <div class="project-corners">
          <div class="corner-accent tl"></div>
          <div class="corner-accent tr"></div>
          <div class="corner-accent bl"></div>
          <div class="corner-accent br"></div>
        </div>
        <div class="project-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        </div>
      </div>
      <div class="project-content">
        <div class="project-header">
          <h3>${project.title}</h3>
          <span class="project-tag">${project.subtitle}</span>
        </div>
        <p>${project.description}</p>
        <ul class="project-highlights">
          ${project.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
        <div class="project-tech">
          ${project.tech.map(t => `<span>${t}</span>`).join('')}
        </div>
        <div class="project-actions">
          <a href="#" class="btn btn-secondary">View Code</a>
          <a href="#" class="btn btn-primary">Live Demo</a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  
  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    } else {
      navbar.style.background = 'rgba(15, 23, 42, 0.8)';
    }
  });
  
  // Mobile menu toggle
  menuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
  
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navLinks.classList.remove('active');
      }
    });
  });
}

// ============================================
// CONTACT FORM
// ============================================

function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    submitBtn.classList.add('loading');
    
    // Simulate form submission
    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.classList.add('success');
      
      setTimeout(() => {
        submitBtn.classList.remove('success');
        form.reset();
      }, 2000);
    }, 1500);
  });
}

// ============================================
// BACK TO TOP
// ============================================

function initBackToTop() {
  const btn = document.getElementById('backToTop');
  btn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  document.querySelectorAll('.card, .timeline-card, .project-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // Add visible class styles
  const style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);
}

// ============================================
// CONSOLE EASTER EGG
// ============================================

function consoleEasterEgg() {
  console.log('%cðŸ‘‹ Hey there!', 'font-size: 24px; font-weight: bold; color: #38bdf8;');
  console.log('%cThanks for checking out my portfolio!', 'font-size: 14px; color: #94a3b8;');
  console.log('%cFeel free to connect with me on LinkedIn or GitHub!', 'font-size: 12px; color: #64748b;');
}

// ============================================
// HERO MATRIX â€” intro-only falling 0/1 then freeze
// ============================================
function initHeroMatrix() {
  const canvas = document.getElementById("heroMatrix");
  const hero = document.getElementById("hero");
  if (!canvas || !hero) return;
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let cell = 12;
  let cols = 0, rows = 0;
  let bits = [];
  let heads = [];
  function resize() {
    const r = hero.getBoundingClientRect();
    const w = Math.max(320, Math.floor(r.width));
    const h = Math.max(260, Math.floor(r.height));
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cell = Math.max(10, Math.min(16, Math.floor(w / 90)));
    cols = Math.floor(w / cell);
    rows = Math.floor(h / cell);
    bits = Array.from({ length: cols }, () => Array.from({ length: rows }, () => (Math.random() > 0.5 ? '1' : '0')));
    heads = Array.from({ length: cols }, () => -Math.floor(Math.random() * rows));
  }
  function drawFrame(ts, running) {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);
    ctx.font = `${Math.floor(cell * 0.86)}px 'Courier New', monospace`;
    ctx.textBaseline = 'top';
    const grad = ctx.createRadialGradient(w*0.55, h*0.5, 10, w*0.55, h*0.5, Math.max(w,h));
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, 'rgba(0,0,0,0.14)');
    for (let x = 0; x < cols; x++) {
      const head = heads[x];
      for (let y = 0; y < rows; y++) {
        let a = 0.14;
        if (running) {
          const d = y - head;
          if (d >= 0 && d < 10) a = 0.65 * (1 - d / 10) + 0.18;
        }
        ctx.fillStyle = `rgba(56,189,248,${a.toFixed(3)})`;
        ctx.fillText(bits[x][y], x * cell, y * cell);
      }
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }
  resize();
  let start = performance.now();
  let anim = true;
  function tick(ts) {
    if (anim) {
      for (let i = 0; i < cols; i++) {
        if (Math.random() > 0.02) heads[i]++;
        if (heads[i] > rows + 8) heads[i] = -Math.floor(Math.random() * rows * 0.5);
      }
    }
    drawFrame(ts, anim);
    if (ts - start < 2800) requestAnimationFrame(tick);
    else { anim = false; drawFrame(ts, anim); }
  }
  requestAnimationFrame(tick);
  window.addEventListener('resize', () => { const wasAnimating = anim; resize(); drawFrame(performance.now(), wasAnimating); });
}
// ============================================
// RENDERERS (skills are handled inline; add exp + projects here)
// ============================================
function renderExperience() {
  const wrap = document.getElementById('experienceTimeline');
  if (!wrap) return;
  wrap.innerHTML = '';
  (experienceData || []).forEach((item) => {
    const card = document.createElement('div');
    card.className = 'timeline-card card';
    card.innerHTML = `
      <div class="timeline-card-header">
        <div>
          <h3>${item.title}</h3>
          <p class="text-muted">${item.company} · ${item.location}</p>
        </div>
        <span class="badge">${item.period}</span>
      </div>
      <ul class="timeline-list">${(item.description||[]).map(d=>`<li>${d}</li>`).join('')}</ul>
    `;
    wrap.appendChild(card);
  });
}
function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  (projectsData || []).forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card card';
    card.innerHTML = `
      <div class="project-content">
        <h3>${p.title}</h3>
        ${p.subtitle ? `<p class="text-muted">${p.subtitle}</p>` : ''}
        <p>${p.description||''}</p>
        <div class="project-tags">${(p.tech||[]).map(t=>`<span class="tag">${t}</span>`).join('')}</div>
      </div>`;
    grid.appendChild(card);
  });
}document.addEventListener('DOMContentLoaded', () => {
    initHeroMatrix();
  initFloatingOrbs();
  initParticleField();
  initCyberGrid();
  
  // UI effects
  initTypingEffect();
  initHeroTilt();
  initTiltCards();
  
  // Render content
  if (window.renderSkills) window.renderSkills();
  renderExperience();
  renderProjects();
  
  // Interactions
  initNavigation();
  initContactForm();
  initBackToTop();
  initScrollAnimations();
  
  // Easter egg
  consoleEasterEgg();
});

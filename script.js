const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; 
    const increment = target / (duration / 16); 
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
            if (element.parentElement.querySelector('.stat-label').textContent.includes('Rate')) {
                element.textContent = target + '%';
            } else {
                element.textContent = target + '+';
            }
        }
    };
    
    updateCounter();
};

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
                animateCounter(statNumber);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-card').forEach(card => {
    observer.observe(card);
});

const fadeElements = document.querySelectorAll('.about-card, .program-card, .achievement-card, .gallery-item');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                requestAnimationFrame(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                });
            }, index * 100);
            
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 2rem 3rem;
        border-radius: 16px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        z-index: 10000;
        text-align: center;
        animation: fadeIn 0.3s ease;
    `;
    
    successMessage.innerHTML = `
        <h3 style="margin-bottom: 0.5rem; font-size: 1.5rem;">Thank You, ${name}!</h3>
        <p style="margin: 0;">We've received your message and will get back to you soon.</p>
    `;
    
    document.body.appendChild(successMessage);
    
    contactForm.reset();
    
    setTimeout(() => {
        successMessage.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 300);
    }, 3000);
});

document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

const programCards = document.querySelectorAll('.program-card');

programCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

const buttons = document.querySelectorAll('.btn, .btn-link');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
        }
    }
`;
document.head.appendChild(style);

const revealElements = document.querySelectorAll('.section-header, .contact-wrapper');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(50px)';
            entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            requestAnimationFrame(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            });
            
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});

const interactiveCards = document.querySelectorAll('.about-card, .program-card, .achievement-card');

interactiveCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            card.click();
        }
    });
});

const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.textContent = `© ${currentYear} Calvin Private School. All rights reserved.`;
}

console.log('%c🎓 Calvin Private School', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%cWelcome to our website! Built with ❤️ for private education excellence.', 'color: #764ba2; font-size: 14px;');

document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

const newsModal = document.getElementById('newsModal');
const newsModalClose = document.getElementById('newsModalClose');
const newsModalOverlay = newsModal.querySelector('.modal-overlay');
const newsModalTitle = document.getElementById('newsModalTitle');
const newsModalBody = document.getElementById('newsModalBody');

const newsData = {
    'olympiad': {
        title: 'Calvin Private School Wins State Science Olympiad',
        date: 'October 15, 2024',
        content: `
            <p>In an outstanding display of scientific knowledge and teamwork, Calvin Private School's science team has claimed the top spot at the State Science Olympiad, competing against over 50 schools from across the state.</p>
            
            <h3>Historic Victory</h3>
            <p>The team, led by coach Dr. Lerato Khumalo, secured first place with record-breaking scores in multiple categories including Chemistry Lab, Experimental Design, and Forensics. This marks the school's third consecutive appearance at the state level and their first gold medal.</p>
            
            <h3>Team Members</h3>
            <p>The winning team consisted of seniors Sipho Ndlovu and Zanele Mokoena, juniors Tumi Mahlangu and Ayanda Nkosi, and sophomores Lindiwe Dube and Kagiso Molefe. Each member contributed their expertise in different scientific disciplines.</p>
            
            <h3>Road to Victory</h3>
            <p>"The students have been preparing since last summer," said Dr. Khumalo. "They've shown incredible dedication, meeting three times a week after school and on weekends. This victory is a testament to their hard work and passion for science."</p>
            
            <h3>What's Next</h3>
            <p>The team will now represent our state at the National Science Olympiad in May 2025. The school community is rallying behind them with fundraising efforts already underway to support their trip.</p>
            
            <p><strong>Congratulations to our champions! Calvin Private School is proud of you!</strong></p>
        `
    },
    'college-fair': {
        title: 'Fall College Fair This Friday',
        date: 'October 12, 2024',
        content: `
            <p>Calvin Private School is excited to host our annual Fall College Fair this Friday, October 18th, from 2:00 PM to 5:00 PM in the main gymnasium.</p>
            
            <h3>What to Expect</h3>
            <p>Representatives from over 30 colleges and universities will be on campus to meet with students, answer questions, and provide information about their institutions. This is an excellent opportunity for juniors and seniors to explore their options for higher education.</p>
            
            <h3>Participating Institutions</h3>
            <p>Confirmed attendees include state universities, private colleges, community colleges, and technical schools. Many institutions will have admissions counselors available to discuss application requirements, financial aid, and scholarship opportunities.</p>
            
            <h3>Preparation Tips</h3>
            <ul>
                <li>Bring copies of your unofficial transcript</li>
                <li>Prepare questions about programs, campus life, and admissions</li>
                <li>Dress appropriately - business casual recommended</li>
                <li>Bring a notebook to take notes</li>
                <li>Collect brochures and contact information</li>
            </ul>
            
            <h3>Parent Participation</h3>
            <p>Parents and guardians are strongly encouraged to attend with their students. College counselor Mrs. Thandi Sithole will be available throughout the event to provide guidance.</p>
            
            <p><strong>Don't miss this valuable opportunity to plan your future!</strong></p>
        `
    },
    'stem-lab': {
        title: 'New STEM Lab Opening Ceremony',
        date: 'October 10, 2024',
        content: `
            <p>Calvin Private School is thrilled to announce the grand opening of our brand new, state-of-the-art STEM laboratory on October 22nd at 10:00 AM.</p>
            
            <h3>Cutting-Edge Facilities</h3>
            <p>The new 3,000 square foot facility features advanced equipment including 3D printers, laser cutters, robotics stations, and computer workstations with the latest software for engineering design and scientific modeling.</p>
            
            <h3>Investment in Education</h3>
            <p>This $2.5 million project was made possible through a combination of district funding, state grants, and generous donations from local businesses and community partners. The lab represents our commitment to preparing students for careers in science, technology, engineering, and mathematics.</p>
            
            <h3>Student Opportunities</h3>
            <p>The STEM lab will serve students in computer science, engineering, physics, and advanced mathematics courses. It will also be home to our robotics club, coding club, and engineering design team.</p>
            
            <h3>Opening Ceremony Details</h3>
            <p>The ceremony will include remarks from Principal Mandla Zwane, district superintendent, and representatives from our community partners. Students will demonstrate some of the lab's capabilities, and tours will be available throughout the day.</p>
            
            <p><strong>Join us in celebrating this exciting milestone for Calvin Private School!</strong></p>
        `
    },
    'hamilton': {
        title: 'Drama Club Presents "Hamilton"',
        date: 'October 8, 2024',
        content: `
            <p>The Calvin Private School Drama Club is proud to present their fall production of the hit musical "Hamilton" from November 15-17 in the main auditorium.</p>
            
            <h3>About the Production</h3>
            <p>This ambitious production features a cast of 40 talented students bringing to life the story of American founding father Alexander Hamilton through hip-hop, R&B, and traditional show tunes. Under the direction of Mr. Bongani Radebe, our students have been rehearsing since August.</p>
            
            <h3>Cast Highlights</h3>
            <p>Senior Nkosi Khumalo stars as Alexander Hamilton, with junior Precious Moyo as Eliza Hamilton. The ensemble cast includes students from all grade levels, showcasing the incredible talent at Calvin Private School.</p>
            
            <h3>Show Times</h3>
            <ul>
                <li>Friday, November 15 - 7:00 PM</li>
                <li>Saturday, November 16 - 2:00 PM and 7:00 PM</li>
                <li>Sunday, November 17 - 2:00 PM</li>
            </ul>
            
            <h3>Tickets</h3>
            <p>Tickets are $10 for students and seniors, $15 for adults. They can be purchased at the door or reserved in advance through the school office. Seating is limited, so early arrival is recommended.</p>
            
            <p><strong>Support our talented students - we can't wait to see you there!</strong></p>
        `
    },
    'conferences': {
        title: 'Parent-Teacher Conferences',
        date: 'October 5, 2024',
        content: `
            <p>Calvin Private School will hold Fall Parent-Teacher Conferences on October 25-26 from 4:00 PM to 8:00 PM. This is an important opportunity to discuss your student's progress and goals for the school year.</p>
            
            <h3>Scheduling Your Conference</h3>
            <p>Parents can schedule appointments online through our parent portal or by calling the school office at (217) 555-0100. Each conference slot is 15 minutes. We encourage you to meet with all of your student's teachers.</p>
            
            <h3>What to Discuss</h3>
            <ul>
                <li>Current grades and academic progress</li>
                <li>Attendance and participation</li>
                <li>Study habits and homework completion</li>
                <li>Social and emotional development</li>
                <li>College and career planning (for upperclassmen)</li>
                <li>Any concerns or questions you may have</li>
            </ul>
            
            <h3>Progress Reports</h3>
            <p>First quarter progress reports will be available at the conferences. Teachers will have specific information about your student's performance and areas for improvement.</p>
            
            <h3>Virtual Options</h3>
            <p>For parents unable to attend in person, virtual conferences via Zoom are available. Please indicate your preference when scheduling.</p>
            
            <p><strong>We look forward to partnering with you in your student's education!</strong></p>
        `
    },
    'art-exhibition': {
        title: 'Student Art Exhibition Opens',
        date: 'October 1, 2024',
        content: `
            <p>Calvin Private School's annual student art exhibition is now open in the main hallway gallery, featuring stunning works from our talented visual arts students.</p>
            
            <h3>Featured Artwork</h3>
            <p>The exhibition showcases over 50 pieces including paintings, drawings, sculptures, ceramics, and digital art. Works span various styles and themes, demonstrating the creativity and technical skill of our students.</p>
            
            <h3>Student Artists</h3>
            <p>Art teacher Ms. Naledi Mthembu selected pieces from students in Art I through AP Studio Art. "The quality and diversity of work this year is exceptional," said Ms. Mthembu. "Our students have really pushed themselves creatively."</p>
            
            <h3>Featured Artists</h3>
            <p>Special recognition goes to seniors Themba Dlamini and Zinhle Ngcobo, whose portfolios have been selected for the state art competition. Junior Mpho Moloi's ceramic sculpture series has garnered particular attention.</p>
            
            <h3>Viewing Information</h3>
            <p>The exhibition is open during school hours and will remain on display through October 31. An artist reception will be held on October 20 from 6:00-8:00 PM, where students will be present to discuss their work.</p>
            
            <h3>Community Support</h3>
            <p>Several pieces will be available for purchase, with proceeds supporting the art department and student scholarships.</p>
            
            <p><strong>Stop by and celebrate the artistic achievements of our students!</strong></p>
        `
    }
};

function openNewsModal(newsType) {
    const news = newsData[newsType];
    if (!news) return;
    
    newsModalTitle.textContent = news.title;
    newsModalBody.innerHTML = `
        <p class="news-date" style="color: var(--text-secondary); margin-bottom: 1.5rem;">${news.date}</p>
        ${news.content}
    `;
    
    newsModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeNewsModal() {
    newsModal.classList.remove('active');
    document.body.style.overflow = '';
}

document.querySelectorAll('[data-news]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const newsType = link.getAttribute('data-news');
        openNewsModal(newsType);
    });
});

newsModalClose.addEventListener('click', closeNewsModal);
newsModalOverlay.addEventListener('click', closeNewsModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && newsModal.classList.contains('active')) {
        closeNewsModal();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const programModal = document.getElementById('programModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    if (!programModal) {
        console.error('Modal not found!');
        return;
    }

    const programData = {
        arts: {
            icon: '🎨',
            title: 'Arts & Humanities',
            description: 'Express yourself through our comprehensive arts and humanities programs. From visual arts to performing arts, we provide opportunities for creative growth and self-expression.',
            highlights: [
                'Fully equipped art studios and practice rooms',
                'Annual student art exhibitions and performances',
                'Award-winning band and choir programs',
                'Drama productions and theater workshops',
                'Creative writing and literary magazine'
            ],
            courses: [
                'Visual Arts - Drawing, painting, ceramics, and sculpture',
                'Band & Orchestra - Concert band, jazz band, and marching band',
                'Choir - Concert choir, show choir, and vocal ensembles',
                'Drama & Theater - Acting, stagecraft, and production',
                'Creative Writing - Poetry, fiction, and journalism'
            ],
            stats: [
                { number: '200+', label: 'Arts Students' },
                { number: '15+', label: 'Annual Shows' },
                { number: '10+', label: 'State Awards' }
            ],
            quote: {
                title: 'Why Choose Arts & Humanities?',
                text: 'Develop your creative talents and critical thinking skills. Our arts programs have won state recognition and our students regularly earn scholarships to top arts colleges.'
            }
        },
        tech: {
            icon: '💻',
            title: 'STEM Programs',
            description: 'Prepare for the future with our comprehensive STEM programs. Gain hands-on experience in science, technology, engineering, and mathematics through project-based learning.',
            highlights: [
                'Modern computer labs with current software',
                'Robotics club and FIRST Robotics team',
                'Engineering design and 3D printing lab',
                'Partnerships with local tech companies',
                'STEM competitions and science fairs'
            ],
            courses: [
                'Computer Science - Learn programming in Python, Java, and JavaScript',
                'Engineering & Robotics - Design, build, and program robots',
                'Advanced Mathematics - Calculus, Statistics, and AP Math',
                'Physics & Chemistry - Hands-on lab experiments and research',
                'Environmental Science - Study sustainability and ecology'
            ],
            stats: [
                { number: '300+', label: 'STEM Students' },
                { number: '5+', label: 'State Titles' },
                { number: '80%', label: 'College STEM' }
            ],
            quote: {
                title: 'Why Choose STEM?',
                text: 'Build skills for in-demand careers. Our STEM students consistently score above state averages and many receive scholarships for engineering and computer science programs.'
            }
        },
        science: {
            icon: '🔬',
            title: 'College Prep & AP Courses',
            description: 'Challenge yourself with our rigorous Advanced Placement and honors courses. Earn college credit while still in high school and prepare for success at top universities.',
            highlights: [
                '15+ AP courses across all subjects',
                'Honors tracks in core subjects',
                'College counseling and application support',
                'Dual enrollment with local colleges',
                'SAT/ACT prep courses and workshops'
            ],
            courses: [
                'AP Sciences - AP Biology, Chemistry, Physics, and Environmental Science',
                'AP Mathematics - AP Calculus AB/BC and AP Statistics',
                'AP English - AP Language and AP Literature',
                'AP Social Studies - AP US History, World History, and Government',
                'AP Foreign Languages - Spanish, French, and more'
            ],
            stats: [
                { number: '400+', label: 'AP Students' },
                { number: '3.5', label: 'Avg AP Score' },
                { number: '85%', label: 'College Ready' }
            ],
            quote: {
                title: 'Why Choose AP Courses?',
                text: 'Get a head start on college. Our AP students save thousands in college tuition and are better prepared for university-level coursework. Many earn full scholarships.'
            }
        },
        sports: {
            icon: '⚽',
            title: 'Athletics & Activities',
            description: 'Build character, teamwork, and leadership through our competitive athletics and diverse extracurricular programs. Join one of our many varsity teams or student organizations.',
            highlights: [
                'Modern athletic facilities and fields',
                'Experienced coaching staff',
                'Varsity, JV, and freshman teams',
                '50+ student clubs and organizations',
                'Athletic scholarships and recognition'
            ],
            courses: [
                'Varsity Sports - Football, basketball, soccer, volleyball, baseball, softball',
                'Track & Field - Cross country, indoor and outdoor track',
                'Individual Sports - Tennis, golf, swimming, wrestling',
                'Student Clubs - Debate, robotics, drama, student government, and more',
                'Physical Education - Fitness, health, and wellness for all students'
            ],
            stats: [
                { number: '12+', label: 'State Titles' },
                { number: '500+', label: 'Student Athletes' },
                { number: '18', label: 'Varsity Sports' }
            ],
            quote: {
                title: 'Why Join Athletics & Activities?',
                text: 'Develop lifelong skills and friendships. Our programs teach discipline, teamwork, and perseverance. Many of our athletes earn college scholarships and leadership positions.'
            }
        }
    };

    function openProgramModal(programType) {
        const program = programData[programType];
        if (!program) return;
        modalIcon.textContent = program.icon;
        modalTitle.textContent = program.title;
        
        let bodyHTML = `
            <p>${program.description}</p>
            
            <h3>Program Highlights</h3>
            <ul>
                ${program.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
            </ul>
            
            <h3>Featured Courses</h3>
            <ul>
                ${program.courses.map(course => `<li>${course}</li>`).join('')}
            </ul>
            
            <div class="modal-highlight">
                <h4>${program.quote.title}</h4>
                <p>${program.quote.text}</p>
            </div>
            
            <h3>Program Statistics</h3>
            <div class="modal-stats">
                ${program.stats.map(stat => `
                    <div class="modal-stat">
                        <div class="modal-stat-number">${stat.number}</div>
                        <div class="modal-stat-label">${stat.label}</div>
                    </div>
                `).join('')}
            </div>
        `;
        
        modalBody.innerHTML = bodyHTML;
        
        programModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeProgramModal() {
        programModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-program]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const programType = button.getAttribute('data-program');
            openProgramModal(programType);
        });
    });

    modalClose.addEventListener('click', closeProgramModal);
    modalOverlay.addEventListener('click', closeProgramModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && programModal.classList.contains('active')) {
            closeProgramModal();
        }
    });

    const modalEnrollBtn = document.getElementById('modalEnrollBtn');
    if (modalEnrollBtn) {
        modalEnrollBtn.addEventListener('click', () => {
            closeProgramModal();
            setTimeout(() => {
                scrollToSection('contact');
            }, 300); 
        });
    }
    document.querySelector('.modal-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

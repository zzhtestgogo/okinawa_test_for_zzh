// 漢堡菜單功能
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 漢堡菜單切換
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // 點擊導航連結時關閉菜單
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // 表單提交
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 取得表單數據
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            // 驗證
            if (!name || !email || !message) {
                alert('請填寫所有必填欄位！');
                return;
            }

            // 驗證郵箱格式
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('請輸入有效的郵箱地址！');
                return;
            }

            // 模擬提交（實際應用中應發送到服務器）
            console.log('提交表單:', { name, email, phone, message });
            alert(`感謝您的來信，${name}！我們會盡快與您聯絡。`);
            contactForm.reset();
        });
    }

    // CTA 按鈕點擊事件
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const itinerarySection = document.getElementById('itinerary');
            if (itinerarySection) {
                itinerarySection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 預訂按鈕點擊事件
    const bookingButtons = document.querySelectorAll('.booking-btn');
    bookingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const hotelName = this.closest('.hotel-card').querySelector('h3').textContent;
            alert(`您選擇了 ${hotelName}，請稍候，我們會將您導向預訂頁面...`);
        });
    });

    // 滾動動畫效果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 觀察卡片元素
    const cards = document.querySelectorAll(
        '.itinerary-card, .attraction-card, .hotel-card, .info-card'
    );
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // 導航欄滾動效果
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // 平滑滾動支持（用於舊瀏覽器）
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 添加頁面加載動畫
    window.addEventListener('load', function() {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.animation = 'none';
            setTimeout(() => {
                heroContent.style.animation = '';
            }, 10);
        }
    });

    // 計數器動畫（可選）
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter');
        const speed = 200;

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        });
    };

    // 檢查視口中的計數器
    const counterSection = document.querySelector('.counter');
    if (counterSection) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        if (counterSection) {
            counterObserver.observe(counterSection);
        }
    }

    // 根據主題設置顏色方案
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    function handleThemeChange(e) {
        if (e.matches) {
            document.documentElement.style.colorScheme = 'dark';
        } else {
            document.documentElement.style.colorScheme = 'light';
        }
    }

    prefersDark.addEventListener('change', handleThemeChange);

    // 返回頂部按鈕（如果需要）
    const createBackToTopButton = () => {
        const button = document.createElement('button');
        button.id = 'backToTop';
        button.innerHTML = '↑';
        button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 20px;
            cursor: pointer;
            display: none;
            z-index: 99;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;

        document.body.appendChild(button);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        });

        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        });
    };

    createBackToTopButton();

    // 行程卡片點擊展開更多信息
    const itineraryCards = document.querySelectorAll('.itinerary-card');
    itineraryCards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            this.style.transform = this.style.transform === 'scale(1.02)' 
                ? 'translateY(-10px)' 
                : 'scale(1.02)';
        });
    });

    // 景點卡片顯示更多詳情
    const attractionCards = document.querySelectorAll('.attraction-card');
    attractionCards.forEach(card => {
        const description = card.querySelector('p');
        if (description) {
            card.addEventListener('mouseenter', function() {
                description.style.maxHeight = '200px';
            });
            card.addEventListener('mouseleave', function() {
                description.style.maxHeight = 'none';
            });
        }
    });

    // 頁面載入時的淡入效果
    document.documentElement.style.opacity = '0';
    document.documentElement.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', () => {
        document.documentElement.style.opacity = '1';
    });

    console.log('✅ 沖繩旅遊網頁已準備就緒！');
});

// 工具函數：格式化日期
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('zh-TW', options);
}

// 工具函數：計算行程天數
function calculateDays(startDate, endDate) {
    const timeDiff = Math.abs(endDate - startDate);
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
}

// 導出函數（如果需要在其他腳本中使用）
window.travelUtils = {
    formatDate,
    calculateDays
};

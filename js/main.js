document.addEventListener('DOMContentLoaded', () => {

    // --- 1. 语言翻译数据 ---
	const translations = {
		'zh-CN': {
			pageTitle: "ヤンイー",
			avatarAlt: "ヤンイー",
			aboutMe: "关于我",
			aboutMeText: "欢迎来到我的个人主页。我是一名活跃在多个平台上的内容创作者，你可以在Bilibili、YouTube和X上找到我。",
			followMe: "关注我",
			latestVideo: "我的最新视频",
			footerText: "&copy; 2025 ヤンイー",
			toggleTheme: "切换主题",
			blogLink: "博客",
			gameLink: "游戏",
			recommendedMusic: "推荐一个音乐"
		},

		'zh-TW': {
			pageTitle: "ヤンイー",
			avatarAlt: "ヤンイー",
			aboutMe: "關於我",
			aboutMeText: "歡迎來到我的個人主頁。我是一名活躍在多個平台上的內容創作者，你可以在Bilibili、YouTube和X上找到我。",
			followMe: "關注我",
			latestVideo: "我的最新影片",
			footerText: "&copy; 2025 ヤンイー",
			toggleTheme: "切換主題",
			blogLink: "博客",
			gameLink: "遊戲",
			recommendedMusic: "推薦一首音樂"
    	},

		en: {
			pageTitle: "ヤンイー",
			avatarAlt: "ヤンイー",
			aboutMe: "About Me",
			aboutMeText: "Welcome to my homepage. I am a content creator active on multiple platforms. You can find me on Bilibili, YouTube, and X.",
			followMe: "Follow Me",
			latestVideo: "My Latest Video",
			footerText: "&copy; 2025 ヤンイー",
			toggleTheme: "Toggle Theme",
			blogLink: "Blog",
			gameLink: "Games",
			recommendedMusic: "Recommended Music"
		},

		ja: {
			pageTitle: "ヤンイー",
			avatarAlt: "ヤンイー",
			aboutMe: "私について",
			aboutMeText: "私のホームページへようこそ。私は複数のプラットフォームで活動しているコンテンツクリエーターです。Bilibili、YouTube、Xで私を見つけることができます。",
			followMe: "フォローする",
			latestVideo: "最新の動画",
			footerText: "&copy; 2025 ヤンイー",
			toggleTheme: "テーマ切り替え",
			blogLink: "ブログ",
        	gameLink: "ゲーム",
			recommendedMusic: "おすすめの音楽"
    	},

		ru: {
			pageTitle: "ヤンイー",
        	avatarAlt: "ヤンイー",
        	aboutMe: "Обо мне",
        	aboutMeText: "Добро пожаловать на мою домашнюю страницу. Я создатель контента, активный на нескольких платформах. Вы можете найти меня на Bilibili, YouTube и X.",
        	followMe: "Подписаться",
        	latestVideo: "Моё последнее видео",
        	footerText: "&copy; 2025 ヤンイー",
        	toggleTheme: "Сменить тему",
        	blogLink: "Блог",
        	gameLink: "Игры",
			recommendedMusic: "Рекомендованная музыка"
		}
	};

    // --- 2. 获取 DOM 元素 ---
    const langSwitcher = document.getElementById('lang-switcher');
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const mainNav = document.getElementById('main-nav');
    const overlay = document.getElementById('overlay');

    // --- 3. 侧边栏控制功能 ---
    const openSidebar = () => {
        if (mainNav && overlay && bodyEl) {
            mainNav.classList.add('open');
            overlay.classList.add('active');
            bodyEl.classList.add('no-scroll');
        }
    };

    const closeSidebar = () => {
        if (mainNav && overlay && bodyEl) {
            mainNav.classList.remove('open');
            overlay.classList.remove('active');
            bodyEl.classList.remove('no-scroll');
        }
    };

    if (menuToggle) { menuToggle.addEventListener('click', openSidebar); }
    if (closeMenu) { closeMenu.addEventListener('click', closeSidebar); }
    if (overlay) { overlay.addEventListener('click', closeSidebar); }


    // --- 4. 语言切换功能 ---
    const setLanguage = (lang) => {
        const langData = translations[lang];
        if (!langData) return;

        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (langData[key]) {
                el.innerHTML = langData[key];
            }
        });
        
        document.querySelectorAll('[data-lang-key-alt]').forEach(el => {
            const key = el.getAttribute('data-lang-key-alt');
            if (langData[key]) {
                el.setAttribute('alt', langData[key]);
            }
        });

        document.title = langData.pageTitle;
        htmlEl.lang = lang;
        localStorage.setItem('preferredLanguage', lang);
    };

    // --- 5. 主题切换功能 ---
    const setTheme = (theme) => {
        if (theme === 'dark') {
            bodyEl.classList.add('dark-mode');
        } else {
            bodyEl.classList.remove('dark-mode');
        }
        localStorage.setItem('preferredTheme', theme);
    };
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = bodyEl.classList.contains('dark-mode') ? 'light' : 'dark';
            setTheme(currentTheme);
        });
    }

    // --- 6. 初始化 ---
    if (langSwitcher) {
        const savedLang = localStorage.getItem('preferredLanguage');
        const browserLang = navigator.language;

        let initialLang = 'zh-CN';

        if (savedLang) {
            initialLang = savedLang;
        } else if (translations[browserLang]) {
            initialLang = browserLang;
        } else if (browserLang.startsWith('zh-TW') || browserLang.startsWith('zh-HK')) {
            initialLang = 'zh-TW';
        } else if (browserLang.startsWith('zh')) {
            initialLang = 'zh-CN';
        } else if (browserLang.startsWith('ru')) {
            initialLang = 'ru';
        } else if (browserLang.startsWith('ja')) {
            initialLang = 'ja';
        } else if (browserLang.startsWith('en')) {
            initialLang = 'en';
        }
        
        langSwitcher.value = initialLang;
        setLanguage(initialLang);

        langSwitcher.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }

    const savedTheme = localStorage.getItem('preferredTheme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let initialTheme = 'light';
    if (savedTheme) {
        initialTheme = savedTheme;
    } else if (prefersDark) {
        initialTheme = 'dark';
    }
    setTheme(initialTheme);
	});

// 更好看且不移位的五角星点击特效
document.addEventListener('click', function(e) {
    // 避免在按钮栏等区域触发粒子（���有需要可恢复下句）
    // if (e.target.closest('nav,.control-btn,input,select,button')) return;

    const cx = e.clientX, cy = e.clientY;
    const colors = ['#fff8b3', '#ffe684', '#ffb6b3', '#b4daff', '#fcf2ff'];
    const count = 8 + Math.floor(Math.random() * 3); // 8~10颗星
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'starlight';
        // 方向、距离、初始缩放和转角
        const angle = 2 * Math.PI * (i / count) + Math.random() * 0.8;
        const radius = 32 + Math.random() * 20;
        const dx = Math.cos(angle) * radius;
        const dy = Math.sin(angle) * radius;

        star.style.left = cx + 'px';
        star.style.top = cy + 'px';
        star.style.setProperty('--dx', dx + 'px');
        star.style.setProperty('--dy', dy + 'px');
        star.style.setProperty('--star-color', colors[Math.floor(Math.random()*colors.length)]);
        star.style.setProperty('--star-rotate', (Math.random()*360) + 'deg');

        document.body.appendChild(star);

        // 动画结束后自动销毁
        star.addEventListener('animationend', () => star.remove());
    }
});
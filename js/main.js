document.addEventListener('DOMContentLoaded', () => {

    // --- 1. 语言翻译数据 (新增 blogLink) ---
    const translations = {
        en: {
            pageTitle: "YanYi's Homepage",
            avatarAlt: "YanYi's avatar",
            aboutMe: "About Me",
            aboutMeText: "Welcome to my homepage. I am a content creator active on multiple platforms. You can find me on Bilibili, YouTube, and X.",
            followMe: "Follow Me",
            footerText: "&copy; 2025 YanYi's Homepage",
            toggleTheme: "Toggle Theme",
            blogLink: "Blog" // 新增
        },
        ja: {
            pageTitle: "ヤンイーのホームページ",
            avatarAlt: "ヤンイーのアバター",
            aboutMe: "私について",
            aboutMeText: "私のホームページへようこそ。私は複数のプラットフォームで活動しているコンテンツクリエーターです。Bilibili、YouTube、Xで私を見つけることができます。",
            followMe: "フォローする",
            footerText: "&copy; 2025 ヤンイーのホームページ",
            toggleTheme: "テーマ切り替え",
            blogLink: "ブログ" // 新增
        },
        zh: {
            pageTitle: "ヤンイー的个人主页",
            avatarAlt: "ヤンイー的头像",
            aboutMe: "关于我",
            aboutMeText: "欢迎来到我的个人主页。我是一名活跃在多个平台上的内容创作者，你可以在Bilibili、YouTube和X上找到我。",
            followMe: "关注我",
            footerText: "&copy; 2025 ヤンイー的个人主页",
            toggleTheme: "切换主题",
            blogLink: "博客" // 新增
        }
    };

    // --- 2. 获取 DOM 元素 (新增侧边栏相关元素) ---
    const langSwitcher = document.getElementById('lang-switcher');
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    
    // 新增元素
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const mainNav = document.getElementById('main-nav');
    const overlay = document.getElementById('overlay');

    // --- 3. 侧边栏控制功能 (新增) ---
    const openSidebar = () => {
        mainNav.classList.add('open');
        overlay.classList.add('active');
    };

    const closeSidebar = () => {
        mainNav.classList.remove('open');
        overlay.classList.remove('active');
    };

    menuToggle.addEventListener('click', openSidebar);
    closeMenu.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);


    // --- 4. 语言切换功能 (保持不变) ---
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
        htmlEl.lang = lang === 'zh' ? 'zh-CN' : lang;
        localStorage.setItem('preferredLanguage', lang);
    };

    // --- 5. 主题切换功能 (保持不变) ---
    const setTheme = (theme) => {
        if (theme === 'dark') {
            bodyEl.classList.add('dark-mode');
        } else {
            bodyEl.classList.remove('dark-mode');
        }
        localStorage.setItem('preferredTheme', theme);
    };

    themeToggle.addEventListener('click', () => {
        const currentTheme = bodyEl.classList.contains('dark-mode') ? 'light' : 'dark';
        setTheme(currentTheme);
    });

    // --- 6. 初始化 (保持不变) ---
    const savedLang = localStorage.getItem('preferredLanguage');
    const browserLang = navigator.language.split('-')[0];
    
    let initialLang = 'zh';
    if (savedLang) {
        initialLang = savedLang;
    } else if (translations[browserLang]) {
        initialLang = browserLang;
    }
    
    langSwitcher.value = initialLang;
    setLanguage(initialLang);

    const savedTheme = localStorage.getItem('preferredTheme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let initialTheme = 'light';
    if (savedTheme) {
        initialTheme = savedTheme;
    } else if (prefersDark) {
        initialTheme = 'dark';
    }
    
    setTheme(initialTheme);
    
    langSwitcher.addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });
});
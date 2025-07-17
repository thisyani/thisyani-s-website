document.addEventListener('DOMContentLoaded', () => {

    // --- 1. 语言翻译数据 ---
    const translations = {
        en: {
            pageTitle: "YanYi's Homepage",
            avatarAlt: "YanYi's avatar",
            aboutMe: "About Me",
            aboutMeText: "Welcome to my homepage. I am a content creator active on multiple platforms. You can find me on Bilibili, YouTube, and X.",
            followMe: "Follow Me",
            footerText: "&copy; 2025 YanYi's Homepage",
            toggleTheme: "Toggle Theme"
        },
        ja: {
            pageTitle: "ヤンイーのホームページ",
            avatarAlt: "ヤンイーのアバター",
            aboutMe: "私について",
            aboutMeText: "私のホームページへようこそ。私は複数のプラットフォームで活動しているコンテンツクリエーターです。Bilibili、YouTube、Xで私を見つけることができます。",
            followMe: "フォローする",
            footerText: "&copy; 2025 ヤンイーのホームページ",
            toggleTheme: "テーマ切り替え"
        },
        zh: {
            pageTitle: "ヤンイー的个人主页",
            avatarAlt: "ヤンイー的头像",
            aboutMe: "关于我",
            aboutMeText: "欢迎来到我的个人主页。我是一名活跃在多个平台上的内容创作者，你可以在Bilibili、YouTube和X上找到我。",
            followMe: "关注我",
            footerText: "&copy; 2025 ヤンイー的个人主页",
            toggleTheme: "切换主题"
        }
    };

    // --- 2. 获取 DOM 元素 ---
    const langSwitcher = document.getElementById('lang-switcher');
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const bodyEl = document.body;

    // --- 3. 语言切换功能 ---
    const setLanguage = (lang) => {
        const langData = translations[lang];
        if (!langData) return;

        // 更新所有带 data-lang-key 的元素
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (langData[key]) {
                el.innerHTML = langData[key];
            }
        });
        
        // 更新带 data-lang-key-alt 的 img 标签
         document.querySelectorAll('[data-lang-key-alt]').forEach(el => {
            const key = el.getAttribute('data-lang-key-alt');
            if (langData[key]) {
                el.setAttribute('alt', langData[key]);
            }
        });

        // 更新页面标题
        document.title = langData.pageTitle;
        // 更新 html 的 lang 属性
        htmlEl.lang = lang === 'zh' ? 'zh-CN' : lang;
        // 保存用户选择
        localStorage.setItem('preferredLanguage', lang);
    };

    // --- 4. 主题切换功能 ---
    const setTheme = (theme) => {
        if (theme === 'dark') {
            bodyEl.classList.add('dark-mode');
        } else {
            bodyEl.classList.remove('dark-mode');
        }
        // 保存用户选择
        localStorage.setItem('preferredTheme', theme);
    };

    themeToggle.addEventListener('click', () => {
        const currentTheme = bodyEl.classList.contains('dark-mode') ? 'light' : 'dark';
        setTheme(currentTheme);
    });

    // --- 5. 初始化 ---
    // 读取保存的语言或根据浏览器语言设置默认值
    const savedLang = localStorage.getItem('preferredLanguage');
    const browserLang = navigator.language.split('-')[0]; // "en-US" -> "en"
    
    let initialLang = 'zh'; // 默认中文
    if (savedLang) {
        initialLang = savedLang;
    } else if (translations[browserLang]) {
        initialLang = browserLang;
    }
    
    langSwitcher.value = initialLang;
    setLanguage(initialLang);

    // 读取保存的主题或根据系统偏好设置
    const savedTheme = localStorage.getItem('preferredTheme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let initialTheme = 'light';
    if (savedTheme) {
        initialTheme = savedTheme;
    } else if (prefersDark) {
        initialTheme = 'dark';
    }
    
    setTheme(initialTheme);
    
    // 监听语言切换器的变化
    langSwitcher.addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });
});
// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", function () {
  // Add smooth scrolling to all anchor links
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Add scroll effect to header
  const header = document.querySelector(".header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up
      header.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });

  // Add fade-in animation to elements when they come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
      }
    });
  }, observerOptions);

  // Observe all feature cards, screenshots, and other sections
  const elementsToAnimate = document.querySelectorAll(
    ".feature-card, .screenshot-item, .contact-method"
  );
  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });

  // Mobile menu toggle (if needed in future)
  function initMobileMenu() {
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (navToggle && navMenu) {
      navToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
      });
    }
  }

  initMobileMenu();

  // Add click effect to buttons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add typing effect to hero title (optional)
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  }

  // Initialize typing effect for hero title
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    // Uncomment the line below to enable typing effect
    // typeWriter(heroTitle, originalText, 50);
  }

  // Add parallax effect to hero section
  function initParallax() {
    const hero = document.querySelector(".hero");
    const heroImage = document.querySelector(".hero-image");

    if (hero && heroImage) {
      window.addEventListener("scroll", function () {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        heroImage.style.transform = `translateY(${rate}px)`;
      });
    }
  }

  initParallax();

  // Add counter animation for statistics (if needed)
  function animateCounters() {
    const counters = document.querySelectorAll(".counter");

    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        counter.textContent = Math.floor(current);

        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        }
      }, 16);
    });
  }

  // Initialize counter animation when counters come into view
  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        counterObserver.unobserve(entry.target);
      }
    });
  });

  const counterSection = document.querySelector(".counters");
  if (counterSection) {
    counterObserver.observe(counterSection);
  }

  // Add form validation (if contact form is added in future)
  function initFormValidation() {
    const forms = document.querySelectorAll("form");

    forms.forEach((form) => {
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        const inputs = form.querySelectorAll(
          "input[required], textarea[required]"
        );
        let isValid = true;

        inputs.forEach((input) => {
          if (!input.value.trim()) {
            input.classList.add("error");
            isValid = false;
          } else {
            input.classList.remove("error");
          }
        });

        if (isValid) {
          // Form is valid, submit it
          console.log("Form submitted successfully");
          // Add your form submission logic here
        }
      });
    });
  }

  initFormValidation();

  // Add lazy loading for images (when images are added)
  function initLazyLoading() {
    const images = document.querySelectorAll("img[data-src]");

    const imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => {
      imageObserver.observe(img);
    });
  }

  initLazyLoading();

  // Add theme toggle (if dark mode is needed)
  function initThemeToggle() {
    const themeToggle = document.querySelector(".theme-toggle");

    if (themeToggle) {
      themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-theme");
        localStorage.setItem(
          "theme",
          document.body.classList.contains("dark-theme") ? "dark" : "light"
        );
      });

      // Load saved theme
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
      }
    }
  }

  initThemeToggle();

  // Language switcher & i18n
  function initI18n() {
    const translations = {
      ja: {
        page_title: "タイマー日記 - 時間管理アプリ",
        meta_description:
          "タイマー日記は、時間の記録と管理を簡単に行えるiOSアプリです。ストップウォッチ機能、タイマー機能、休憩時間の記録など、充実した機能で効率的な時間管理をサポートします。",

        app_name: "タイマー日記",
        nav_features: "機能",
        nav_screenshots: "スクリーンショット",
        nav_download: "ダウンロード",
        nav_privacy: "プライバシー",
        nav_contact: "お問い合わせ",

        hero_title_line1: "時間を記録し、",
        hero_title_line2: "効率的に管理する",
        hero_description:
          "タイマー日記は、あなたの時間を記録し、分析するためのシンプルで使いやすいiOSアプリです。ストップウォッチ、タイマー、休憩時間の記録など、充実した機能で時間管理をサポートします。",
        hero_download_button: "App Storeでダウンロード",
        hero_features_button: "機能を見る",

        features_title: "主な機能",
        feature_stopwatch_title: "ストップウォッチ機能",
        feature_stopwatch_text:
          "シンプルなストップウォッチで時間を計測。一時停止・再開機能で正確な時間記録が可能です。",
        feature_timer_title: "タイマー機能",
        feature_timer_text:
          "設定した時間で自動的にタイマーが終了。音と通知でお知らせします。",
        feature_break_title: "休憩時間の記録",
        feature_break_text:
          "休憩時間を自動で計測・記録。実働時間を正確に把握できます。",
        feature_category_title: "カテゴリ管理",
        feature_category_text:
          "作業内容をカテゴリ別に分類。色分けで視覚的に管理できます。",
        feature_history_title: "履歴・分析",
        feature_history_text:
          "過去の記録をカレンダー表示で確認。時間の使い方を分析できます。",
        feature_live_title: "目標設定",
        feature_live_text:
          "1日の目標時間を設定し、達成状況を一目で確認できます。",

        screenshots_title: "スクリーンショット",
        screenshots_main_title: "メイン画面",
        screenshots_main_text: "シンプルで使いやすいUI",
        screenshots_analysis_title: "分析画面",
        screenshots_analysis_text: "時間の使い方を詳細に分析",
        screenshots_history_title: "履歴画面",
        screenshots_history_text: "蓄積された記録を一覧で確認",
        screenshots_live_title: "ゴール",
        screenshots_live_text: "目標の達成状況を一覧で確認",

        download_title: "ダウンロード",
        download_heading: "App Storeで今すぐダウンロード",
        download_subheading: "iOS 15.0以降に対応しています。",
        download_button: "App Storeでダウンロード",
        download_requirements_title: "システム要件",
        download_requirements_ios: "iOS 15.0以降",
        download_requirements_devices: "iPhone、iPad対応",
        download_requirements_price: "無料ダウンロード",

        privacy_title: "プライバシーポリシー",
        privacy_handling_heading: "個人情報の取り扱いについて",
        privacy_handling_text:
          "タイマー日記は、ユーザーのプライバシーを尊重し、個人情報の保護に努めています。",
        privacy_collect_heading: "収集する情報",
        privacy_collect_text: "収集する情報はありません。",
        privacy_storage_heading: "情報の保存",
        privacy_storage_text:
          "すべてのデータはデバイス内にローカル保存され、外部サーバーには送信されません。",
        privacy_sharing_heading: "第三者との共有",
        privacy_sharing_text:
          "収集した情報を第三者と共有することはありません。",
        privacy_contact_heading: "お問い合わせ",
        privacy_contact_text_before: "プライバシーポリシーに関するご質問は、",
        privacy_contact_link: "お問い合わせ",
        privacy_contact_text_after: "までご連絡ください。",

        contact_title: "お問い合わせ",
        contact_intro:
          "アプリに関するご質問、バグ報告、機能要望などがございましたら、お気軽にお問い合わせください。",
        contact_email_heading: "📧 メール",
        contact_bug_heading: "🐛 バグ報告",
        contact_bug_text:
          "アプリ内の不具合や問題を発見された場合は、上記メールアドレスまで詳細をお送りください。",
        contact_feature_heading: "💡 機能要望",
        contact_feature_text:
          "新しい機能のご要望もお待ちしています。ユーザーの皆様の声を大切にしています。",

        footer_copyright: "© 2025 タイマー日記. All rights reserved.",
      },
      en: {
        page_title: "Timer Diary - Time Management App",
        meta_description:
          "Timer Diary is an iOS app that makes it easy to record and manage your time. With features like a stopwatch, timer, and break tracking, it helps you manage your time efficiently.",

        app_name: "Timer Diary",
        nav_features: "Features",
        nav_screenshots: "Screenshots",
        nav_download: "Download",
        nav_privacy: "Privacy",
        nav_contact: "Contact",

        hero_title_line1: "Record your time,",
        hero_title_line2: "and manage it efficiently",
        hero_description:
          "Timer Diary is a simple, easy-to-use iOS app for recording and analyzing how you spend your time. With a stopwatch, timer, break tracking, and more, it helps you manage your time efficiently.",
        hero_download_button: "Download on the App Store",
        hero_features_button: "View features",

        features_title: "Main features",
        feature_stopwatch_title: "Stopwatch",
        feature_stopwatch_text:
          "Measure time with a simple stopwatch. Pause and resume to record time accurately.",
        feature_timer_title: "Timer",
        feature_timer_text:
          "The timer automatically stops after the time you set and notifies you with sound and notifications.",
        feature_break_title: "Break tracking",
        feature_break_text:
          "Automatically measure and record break time so you can see your actual working time.",
        feature_category_title: "Category management",
        feature_category_text:
          "Categorize your activities by type, and use colors to manage them visually.",
        feature_history_title: "History & analytics",
        feature_history_text:
          "Check past records on a calendar and analyze how you spend your time.",
        feature_live_title: "Goal setting",
        feature_live_text:
          "Set daily goals and quickly see how close you are to achieving them.",

        screenshots_title: "Screenshots",
        screenshots_main_title: "Main screen",
        screenshots_main_text: "Simple and easy-to-use UI",
        screenshots_analysis_title: "Analysis screen",
        screenshots_analysis_text: "Analyze how you spend your time in detail",
        screenshots_history_title: "History screen",
        screenshots_history_text:
          "See all your accumulated records at a glance",
        screenshots_live_title: "Goal",
        screenshots_live_text: "Check your goals and progress at a glance",

        download_title: "Download",
        download_heading: "Download now on the App Store",
        download_subheading: "Supports iOS 17.0 and later.",
        download_button: "Download on the App Store",
        download_requirements_title: "System requirements",
        download_requirements_ios: "iOS 17.0 or later",
        download_requirements_devices: "Works on iPhone and iPad",
        download_requirements_price: "Free download",

        privacy_title: "Privacy Policy",
        privacy_handling_heading: "Handling of personal information",
        privacy_handling_text:
          "Timer Diary respects your privacy and strives to protect your personal information.",
        privacy_collect_heading: "Information we collect",
        privacy_collect_text: "We do not collect any personal information.",
        privacy_storage_heading: "Data storage",
        privacy_storage_text:
          "All data is stored locally on your device and is never sent to external servers.",
        privacy_sharing_heading: "Sharing with third parties",
        privacy_sharing_text:
          "We never share your information with third parties.",
        privacy_contact_heading: "Contact",
        privacy_contact_text_before:
          "If you have any questions about this privacy policy, please contact us from ",
        privacy_contact_link: "Contact",
        privacy_contact_text_after: ".",

        contact_title: "Contact",
        contact_intro:
          "If you have any questions about the app, want to report a bug, or request a feature, feel free to contact us.",
        contact_email_heading: "📧 Email",
        contact_bug_heading: "🐛 Bug reports",
        contact_bug_text:
          "If you find any issues or bugs in the app, please send the details to the email address above.",
        contact_feature_heading: "💡 Feature requests",
        contact_feature_text:
          "We also welcome requests for new features. We value feedback from all our users.",

        footer_copyright: "© 2025 Timer Diary. All rights reserved.",
      },
    };

    const langButtons = document.querySelectorAll(".lang-btn");
    const i18nElements = document.querySelectorAll("[data-i18n-key]");

    function applyLanguage(lang) {
      const dict = translations[lang] || translations.ja;

      i18nElements.forEach((el) => {
        const key = el.getAttribute("data-i18n-key");
        const value = dict[key];
        if (!value) return;

        const tag = el.tagName.toLowerCase();
        if (tag === "input" || tag === "textarea") {
          el.placeholder = value;
        } else {
          el.textContent = value;
        }
      });

      // Update localized images
      const localizedImages = document.querySelectorAll(
        "img[data-src-ja], img[data-src-en]"
      );

      localizedImages.forEach((img) => {
        const jaSrc = img.getAttribute("data-src-ja");
        const enSrc = img.getAttribute("data-src-en");

        if (lang === "en" && enSrc) {
          img.src = enSrc;
        } else if (jaSrc) {
          img.src = jaSrc;
        }
      });

      // Update html lang attribute
      document.documentElement.lang = lang === "en" ? "en" : "ja";

      // Update title and meta description
      if (dict.page_title) {
        document.title = dict.page_title;
      }

      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription && dict.meta_description) {
        metaDescription.setAttribute("content", dict.meta_description);
      }

      // Update active state on language buttons
      langButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.lang === lang);
      });

      localStorage.setItem("language", lang);

      // Reflect language in URL (e.g. ?lang=ja or ?lang=en)
      try {
        const url = new URL(window.location.href);
        url.searchParams.set("lang", lang);
        window.history.replaceState({}, "", url);
      } catch (e) {
        // URL API not available; safely ignore
      }
    }

    langButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.dataset.lang;
        applyLanguage(lang);
      });
    });

    // Determine initial language from URL, saved setting, or browser
    const searchParams = new URLSearchParams(window.location.search);
    const rawUrlLang = (searchParams.get("lang") || "").toLowerCase();
    let urlLang = null;
    if (rawUrlLang.startsWith("en")) {
      urlLang = "en";
    } else if (rawUrlLang.startsWith("ja")) {
      urlLang = "ja";
    }

    const savedLang = localStorage.getItem("language");
    const browserLang = (navigator.language || "ja").toLowerCase();
    const initialLang =
      urlLang || savedLang || (browserLang.startsWith("en") ? "en" : "ja");

    applyLanguage(initialLang);
  }

  initI18n();
});

// Add CSS for ripple effect
const style = document.createElement("style");
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .header {
        transition: transform 0.3s ease;
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
    
    .error {
        border-color: #ff4444 !important;
        box-shadow: 0 0 0 2px rgba(255, 68, 68, 0.2) !important;
    }
    
    .dark-theme {
        background-color: #1a1a1a;
        color: #ffffff;
    }
    
    .dark-theme .header {
        background-color: #2a2a2a;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }
    
    .dark-theme .feature-card,
    .dark-theme .contact-method,
    .dark-theme .privacy-content {
        background-color: #2a2a2a;
        color: #ffffff;
    }
`;
document.head.appendChild(style);

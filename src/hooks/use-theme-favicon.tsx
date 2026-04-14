import { useEffect } from "react";

const useThemeFavicon = () => {
  useEffect(() => {
    const updateFavicon = () => {
      const isDark = document.documentElement.classList.contains("dark");
      const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
      const appleFavicon = document.querySelector<HTMLLinkElement>('link[rel="apple-touch-icon"]');
      const href = isDark ? "/favicon-dark.png?v=3" : "/favicon.png?v=3";
      if (favicon) favicon.href = href;
      if (appleFavicon) appleFavicon.href = href;
    };

    updateFavicon();

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === "class") updateFavicon();
      }
    });
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);
};

export default useThemeFavicon;

import { useState, useEffect } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    // Always enforce dark mode as default if not set
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "dark");
    }
  }, [theme]);

  return { theme, setTheme };
}

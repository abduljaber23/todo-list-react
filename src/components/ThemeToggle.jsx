import React, { useEffect, useState } from "react";
import { Lightbulb } from "lucide-react";

const THEME_DARK = "night";
const THEME_LIGHT = "dracula";
const THEME_KEY = "theme";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(THEME_LIGHT);

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", THEME_LIGHT);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(THEME_KEY, next);
  };

  return (
    <div>
      <button className="" onClick={toggleTheme} aria-label="Toggle theme">
        <Lightbulb />
      </button>
    </div>
  );
};

export default ThemeToggle;

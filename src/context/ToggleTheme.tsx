"use client";
import { themes, useTheme } from "@src/context/ThemeContext";

export default function ToggleTheme() {
  const { theme, setAppTheme } = useTheme();

  return (
    <div className="flex gap-2">
      {themes.map((t) => (
        <button
          key={t}
          onClick={() => setAppTheme(t)}
          className={`px-3 py-1 rounded ${
            theme === t ? "border-2 border-black" : "border"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

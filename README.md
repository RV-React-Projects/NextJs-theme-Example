## Getting Started

### Clone the Repository

```bash
git clone https://github.com/RV-React-Projects/NextJs-theme-Example.git
cd theme-toggle
```

### Install Dependencies

```bash
bun install
```

### Run the Project

```bash
bun run start
```

To set up a custom theme toggle in your Next.js project without any external library, follow these steps:

1. **Create a Theme Context:**

   Create a `ThemeContext.tsx` file in your project (e.g., inside a `context` folder):

   ```tsx
   // context/ThemeContext.tsx
   import React, {
     createContext,
     useContext,
     useState,
     useEffect,
   } from "react";

   type Theme = "light" | "dark";

   interface ThemeContextProps {
     theme: Theme;
     toggleTheme: () => void;
   }

   const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

   export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
     children,
   }) => {
     const [theme, setTheme] = useState<Theme>("light");

     useEffect(() => {
       const storedTheme = localStorage.getItem("theme") as Theme;
       if (storedTheme) setTheme(storedTheme);
     }, []);

     useEffect(() => {
       document.documentElement.setAttribute("data-theme", theme);
       localStorage.setItem("theme", theme);
     }, [theme]);

     const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

     return (
       <ThemeContext.Provider value={{ theme, toggleTheme }}>
         {children}
       </ThemeContext.Provider>
     );
   };

   export const useTheme = () => {
     const context = useContext(ThemeContext);
     if (!context)
       throw new Error("useTheme must be used within ThemeProvider");
     return context;
   };
   ```

2. **Update `global.css`:**

   Define your theme variables in `styles/global.css`:

   ```css
   :root {
     --background: #fff;
     --text: #111;
   }

   [data-theme="dark"] {
     --background: #111;
     --text: #fff;
   }

   body {
     background: var(--background);
     color: var(--text);
     transition:
       background 0.2s,
       color 0.2s;
   }
   ```

3. **Wrap your app with ThemeProvider:**

   In `app/layout.tsx` or `_app.tsx`:

   ```tsx
   import { ThemeProvider } from "../context/ThemeContext";
   import "../styles/global.css";

   export default function RootLayout({ children }) {
     return <ThemeProvider>{children}</ThemeProvider>;
   }
   ```

4. **Add a Theme Toggle Button:**

   Use the context in your components:

   ```tsx
   import { useTheme } from "../context/ThemeContext";

   export default function ThemeToggle() {
     const { theme, toggleTheme } = useTheme();
     return (
       <button onClick={toggleTheme}>
         Switch to {theme === "light" ? "dark" : "light"} mode
       </button>
     );
   }
   ```

Now your Next.js app supports theme toggling without any external library!

/\*\*

- Sets a custom attribute (commonly named 'data-theme') on the root HTML element to apply a theme.
-
- Note: The attribute name 'data-theme' is just a convention; you can use any name or even set an attribute without a name directly, e.g.:
-
- document.documentElement.setAttribute(theme)
-
- This approach allows dynamic switching of themes by updating the attribute value.
  \*/

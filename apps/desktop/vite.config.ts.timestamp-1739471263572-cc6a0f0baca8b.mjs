// vite.config.ts
import { defineConfig } from "file:///C:/Users/artem/Documents/work/TTracker/node_modules/vite/dist/node/index.js";
import path from "node:path";
import electron from "file:///C:/Users/artem/Documents/work/TTracker/node_modules/vite-plugin-electron/dist/simple.mjs";
import react from "file:///C:/Users/artem/Documents/work/TTracker/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tailwindcss from "file:///C:/Users/artem/Documents/work/TTracker/node_modules/@tailwindcss/vite/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\artem\\Documents\\work\\TTracker\\apps\\desktop";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: "electron/main.ts"
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__vite_injected_original_dirname, "electron/preload.ts")
      },
      // Ployfill the Electron and Node.js API for Renderer process.
      // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: process.env.NODE_ENV === "test" ? void 0 : {}
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhcnRlbVxcXFxEb2N1bWVudHNcXFxcd29ya1xcXFxUVHJhY2tlclxcXFxhcHBzXFxcXGRlc2t0b3BcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFydGVtXFxcXERvY3VtZW50c1xcXFx3b3JrXFxcXFRUcmFja2VyXFxcXGFwcHNcXFxcZGVza3RvcFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYXJ0ZW0vRG9jdW1lbnRzL3dvcmsvVFRyYWNrZXIvYXBwcy9kZXNrdG9wL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xyXG5pbXBvcnQgZWxlY3Ryb24gZnJvbSAndml0ZS1wbHVnaW4tZWxlY3Ryb24vc2ltcGxlJ1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXHJcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tICdAdGFpbHdpbmRjc3Mvdml0ZSdcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIHRhaWx3aW5kY3NzKCksXHJcbiAgICBlbGVjdHJvbih7XHJcbiAgICAgIG1haW46IHtcclxuICAgICAgICAvLyBTaG9ydGN1dCBvZiBgYnVpbGQubGliLmVudHJ5YC5cclxuICAgICAgICBlbnRyeTogJ2VsZWN0cm9uL21haW4udHMnLFxyXG4gICAgICB9LFxyXG4gICAgICBwcmVsb2FkOiB7XHJcbiAgICAgICAgLy8gU2hvcnRjdXQgb2YgYGJ1aWxkLnJvbGx1cE9wdGlvbnMuaW5wdXRgLlxyXG4gICAgICAgIC8vIFByZWxvYWQgc2NyaXB0cyBtYXkgY29udGFpbiBXZWIgYXNzZXRzLCBzbyB1c2UgdGhlIGBidWlsZC5yb2xsdXBPcHRpb25zLmlucHV0YCBpbnN0ZWFkIGBidWlsZC5saWIuZW50cnlgLlxyXG4gICAgICAgIGlucHV0OiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnZWxlY3Ryb24vcHJlbG9hZC50cycpLFxyXG4gICAgICB9LFxyXG4gICAgICAvLyBQbG95ZmlsbCB0aGUgRWxlY3Ryb24gYW5kIE5vZGUuanMgQVBJIGZvciBSZW5kZXJlciBwcm9jZXNzLlxyXG4gICAgICAvLyBJZiB5b3Ugd2FudCB1c2UgTm9kZS5qcyBpbiBSZW5kZXJlciBwcm9jZXNzLCB0aGUgYG5vZGVJbnRlZ3JhdGlvbmAgbmVlZHMgdG8gYmUgZW5hYmxlZCBpbiB0aGUgTWFpbiBwcm9jZXNzLlxyXG4gICAgICAvLyBTZWUgXHVEODNEXHVEQzQ5IGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJvbi12aXRlL3ZpdGUtcGx1Z2luLWVsZWN0cm9uLXJlbmRlcmVyXHJcbiAgICAgIHJlbmRlcmVyOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Rlc3QnXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cm9uLXZpdGUvdml0ZS1wbHVnaW4tZWxlY3Ryb24tcmVuZGVyZXIvaXNzdWVzLzc4I2lzc3VlY29tbWVudC0yMDUzNjAwODA4XHJcbiAgICAgICAgPyB1bmRlZmluZWRcclxuICAgICAgICA6IHt9LFxyXG4gICAgfSksXHJcbiAgXSxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyVixTQUFTLG9CQUFvQjtBQUN4WCxPQUFPLFVBQVU7QUFDakIsT0FBTyxjQUFjO0FBQ3JCLE9BQU8sV0FBVztBQUNsQixPQUFPLGlCQUFpQjtBQUp4QixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsSUFDWixTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUE7QUFBQSxRQUVKLE9BQU87QUFBQSxNQUNUO0FBQUEsTUFDQSxTQUFTO0FBQUE7QUFBQTtBQUFBLFFBR1AsT0FBTyxLQUFLLEtBQUssa0NBQVcscUJBQXFCO0FBQUEsTUFDbkQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUlBLFVBQVUsUUFBUSxJQUFJLGFBQWEsU0FFL0IsU0FDQSxDQUFDO0FBQUEsSUFDUCxDQUFDO0FBQUEsRUFDSDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

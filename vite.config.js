import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
<<<<<<< HEAD
import { qrcode } from "vite-plugin-qrcode";
=======
>>>>>>> ceab142 (fixed conflicts and merged development)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), qrcode()],
});

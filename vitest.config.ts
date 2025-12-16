import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTest.ts',
    coverage: {
      provider: 'istanbul',          
      reporter: ['text', 'html'],    
      istanbul: {                     
        include: ['src/**/*.{ts,tsx}'], 
        all: true,                       
      },
    },
  },
});

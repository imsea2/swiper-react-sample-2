import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    base: '/swiper-react-sample-2/', // 여기에 실제 저장소 이름 입력
  build: {
    outDir: 'dist'
  }

})

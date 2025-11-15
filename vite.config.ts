import {defineConfig} from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: '.', // 项目根
    server: {
        port: 5173
    },
    build: {
        outDir: 'dist',
        lib: {
            entry: resolve(__dirname, 'src/image-cropper.ts'),
            name: 'ImageCropperLib',
            fileName: (format) => `image-cropper.${format}.js`,
            formats: ['es', 'umd'] // es 给模块化环境；umd 给浏览器 script 直接引用
        },
    },

});

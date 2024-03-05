import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import {UnpluginVueComponentsResolver} from 'maz-ui/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            dts: true,
            resolvers: [UnpluginVueComponentsResolver()],
        }),
    ],
    server: {
        host: true,
    },
})

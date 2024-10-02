import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { UnpluginVueComponentsResolver } from 'maz-ui/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		Components({
			dts: true,
			resolvers: [UnpluginVueComponentsResolver()]
		})
	],

	server: {
		watch: {
			usePolling: true
		},
		host: true, // needed for the Docker Container port mapping to work
		strictPort: true,
		port: 5173 // you can replace this port with any port
	},
	assetsInclude: ['**/*.csv']
})

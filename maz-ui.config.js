import { defineConfig } from '@mazui/cli'

export default defineConfig({
    outputCssFilePath: './css/maz-ui-variables.css',
    theme: {
        colors: {
            primary: 'hsl(150.32, 0.872, 0.206)',
            secondary: 'hsl(137.647%, 86%, 28.4%)',
            info: 'hsl(188, 78%, 41%)',
            success: 'hsl(80, 61%, 50%)',
            warning: 'hsl(40, 97%, 59%)',
            danger: 'hsl(1, 100%, 71%)',
            bgOverlay: 'hsl(0, 0%, 0% / 30%)',
            lightTheme: {
                textColor: 'hsl(0, 0%, 85%)',
                colorMuted: 'hsla(0, 0%, 0%, 0.54)',
                bgColor: 'hsl(0, 0%, 100%)',
            },
            darkTheme: {
                textColor: 'hsl(210, 8%, 14%)',
                colorMuted: 'hsla(0, 0%, 100%, 0.54)',
                bgColor: 'hsl(235, 16%, 15%)',
            },
        },
        borderWidth: '0.125rem',
        borderRadius: '0.5rem',
        fontFamily: `system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', roboto, oxygen,
    ubuntu, cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
    },
})
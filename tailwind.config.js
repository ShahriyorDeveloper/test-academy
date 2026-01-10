/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#3b5998',
                secondary: '#8b9dc3',
                'bg-color': '#dfe3ee',
                'bg-white': '#ffffff',
                'text-dark': '#333333',
                'text-light': '#666666',
                success: '#4caf50',
                danger: '#f44336',
                warning: '#ff9800',
            },
            borderRadius: {
                'xl': '16px',
            },
            keyframes: {
                progress: {
                    '0%': { strokeDasharray: '0, 100' },
                }
            },
            animation: {
                progress: 'progress 1s ease-out forwards',
            }
        },
    },
    plugins: [],
}

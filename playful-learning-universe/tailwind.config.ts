
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Kid-friendly colors
				"kid-blue": "#4A7CFA",
				"kid-red": "#FF6B6B",
				"kid-yellow": "#FFD93D",
				"kid-green": "#6BCB77",
				"kid-purple": "#B088F9",
				"kid-pink": "#FF9BD2",
				"kid-orange": "#FF9F45",
				"kid-teal": "#4ECDC4",
				"kid-light-blue": "#A7C5EB",
				"kid-light-green": "#C1FFD7",
				"kid-light-yellow": "#FEF9A7",
				"kid-light-pink": "#FFDCF5",
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				"2xl": "1rem",
				"3xl": "1.5rem",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				// Custom keyframes for our kid-friendly UI
				"float": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" },
				},
				"bounce-slight": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-4px)" },
				},
				"wiggle": {
					"0%, 100%": { transform: "rotate(-3deg)" },
					"50%": { transform: "rotate(3deg)" },
				},
				"scale-up": {
					"0%": { transform: "scale(0.8)", opacity: "0" },
					"100%": { transform: "scale(1)", opacity: "1" },
				},
				"pop": {
					"0%": { transform: "scale(0.9)" },
					"40%": { transform: "scale(1.1)" },
					"100%": { transform: "scale(1)" },
				},
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				"slide-in-right": {
					"0%": { transform: "translateX(100%)", opacity: "0" },
					"100%": { transform: "translateX(0)", opacity: "1" },
				},
				"slide-in-left": {
					"0%": { transform: "translateX(-100%)", opacity: "0" },
					"100%": { transform: "translateX(0)", opacity: "1" },
				},
				"slide-in-bottom": {
					"0%": { transform: "translateY(20px)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" },
				},
				"rotate-center": {
					"0%": { transform: "rotate(0)" },
					"100%": { transform: "rotate(360deg)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				// Custom animations
				"float": "float 3s ease-in-out infinite",
				"bounce-slight": "bounce-slight 2s ease-in-out infinite",
				"wiggle": "wiggle 2s ease-in-out infinite",
				"scale-up": "scale-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
				"pop": "pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
				"fade-in": "fade-in 0.5s ease-out forwards",
				"slide-in-right": "slide-in-right 0.5s ease-out forwards",
				"slide-in-left": "slide-in-left 0.5s ease-out forwards",
				"slide-in-bottom": "slide-in-bottom 0.5s ease-out forwards",
				"rotate-center": "rotate-center 8s linear infinite",
			},
			boxShadow: {
				"kid": "0 8px 20px rgba(0, 0, 0, 0.1)",
				"kid-hover": "0 12px 25px rgba(0, 0, 0, 0.15)",
				"kid-pressed": "0 4px 8px rgba(0, 0, 0, 0.1)",
			},
			fontFamily: {
				"kid": ['Nunito', 'sans-serif'],
				"kid-title": ['Poppins', 'sans-serif'],
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

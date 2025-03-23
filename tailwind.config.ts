
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
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				display: ['Playfair Display', 'serif'],
			},
			colors: {
				vanilla: {
					50: '#FFFCF5',
					100: '#FFF9EB',
					200: '#FFF3D6',
					300: '#FFECBC',
					400: '#FFDF94',
					500: '#FFD36B',
					600: '#EABE60',
					700: '#C49E50',
					800: '#A17F40',
					900: '#7F6033',
				},
				earth: {
					50: '#F7F5F2',
					100: '#EBE7E0',
					200: '#D8D0C2',
					300: '#C4B9A3',
					400: '#B0A184',
					500: '#9C8A66',
					600: '#7D6F52',
					700: '#5F533D',
					800: '#403829',
					900: '#201C14',
				},
				cardano: {
				  50: '#E6F7FF',
				  100: '#B3E7FF',
				  200: '#80D6FF',
				  300: '#4DC4FF',
				  400: '#26B7FF',
				  500: '#00A3FF',
				  600: '#008CDB',
				  700: '#0072B7',
				  800: '#005993',
				  900: '#004B7A',
				},
				nature: {
				  50: '#F1F8E9',
				  100: '#DCEDC8',
				  200: '#C5E1A5',
				  300: '#AED581',
				  400: '#9CCC65',
				  500: '#8BC34A',
				  600: '#7CB342',
				  700: '#689F38',
				  800: '#558B2F',
				  900: '#33691E',
				},
				taino: {
				  50: '#FFF8E1',
				  100: '#FFECB3',
				  200: '#FFE082',
				  300: '#FFD54F',
				  400: '#FFCA28',
				  500: '#FFC107',
				  600: '#FFB300',
				  700: '#FFA000',
				  800: '#FF8F00',
				  900: '#FF6F00',
				},
				// Add the tribal colors properly to Tailwind config
				'tribal-green': '#4CAF50',
				'tribal-bright-green': '#76FF03',
				'tribal-yellow': '#FFD36B',
				'tribal-bright-yellow': '#FFFF00',
				'tribal-terracotta': '#E57373',
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
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0', opacity: '0' },
					to: { height: 'var(--radix-accordion-content-height)', opacity: '1' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
					to: { height: '0', opacity: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-down': {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 10px 0px var(--tribal-color)' },
					'50%': { boxShadow: '0 0 20px 5px var(--tribal-color)' }
				},
				'rotate-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'fade-out': 'fade-out 0.5s ease-out forwards',
				'slide-up': 'slide-up 0.6s ease-out forwards',
				'slide-down': 'slide-down 0.6s ease-out forwards',
				'scale-in': 'scale-in 0.4s ease-out forwards',
				'float': 'float 5s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'rotate-slow': 'rotate-slow 20s linear infinite'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'noise-pattern': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

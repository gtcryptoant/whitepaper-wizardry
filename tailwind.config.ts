import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

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
					50: '#FCF7E6',
					100: '#F7E8C0',
					200: '#F2DFA0',
					300: '#ECD580',
					400: '#E5CC60',
					500: '#D4A857',
					600: '#C08A40',
					700: '#A17035',
					800: '#825C2B',
					900: '#664720',
				},
				earth: {
					50: '#E6EBE9',
					100: '#C2D1CB',
					200: '#9AB5AA',
					300: '#729988',
					400: '#538370',
					500: '#2E5E4E',
					600: '#264A3E',
					700: '#1D362E',
					800: '#14231F',
					900: '#0B110F',
				},
				clay: {
					50: '#F7E8E6',
					100: '#EDC5C0',
					200: '#E2A199',
					300: '#D77D73',
					400: '#CD5A4D',
					500: '#B44D3C',
					600: '#9A3E32',
					700: '#752F26',
					800: '#4F1F19',
					900: '#29100D',
				},
				teal: {
					50: '#E6F4F3',
					100: '#C2E3E1',
					200: '#99D2CE',
					300: '#70C0BB',
					400: '#55A8A2',
					500: '#3B8F8A',
					600: '#2F7570',
					700: '#235A55',
					800: '#173E3B',
					900: '#0C1F1E',
				},
				carbon: {
					50: '#E6E6E6',
					100: '#C0C0C0',
					200: '#9A9A9A',
					300: '#747474',
					400: '#575757',
					500: '#3B3B3B',
					600: '#2F2F2F',
					700: '#232323',
					800: '#171717',
					900: '#0C0C0C',
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
				'tribal-green': '#2E5E4E',
				'tribal-bright-green': '#55A8A2',
				'tribal-yellow': '#D4A857',
				'tribal-bright-yellow': '#F7E8C0',
				'tribal-terracotta': '#B44D3C',
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
	plugins: [
		require("tailwindcss-animate"),
		plugin(function({ addUtilities }) {
			addUtilities({
				'.mask-border': {
					'mask-image': 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
					'mask-composite': 'destination-out',
					'pointer-events': 'none'
				}
			})
		})
	],
} satisfies Config;

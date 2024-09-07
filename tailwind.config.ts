import { join } from 'path';
import type { Config } from 'tailwindcss';

import { skeleton } from '@skeletonlabs/tw-plugin';

const config = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			animation: {
				shake: 'shake 0.5s ease infinite'
			},
			keyframes: {
				shake: {
					'0%': { transform: 'translateX(0)' },
					'25%': { transform: 'translateX(-10px)' },
					'50%': { transform: 'translateX(10px)' },
					'75%': { transform: 'translateX(-10px)' },
					'100%': { transform: 'translateX(0)' }
				}
			}
		}
	},
	plugins: [
		skeleton({
			themes: { preset: [{ name: 'modern' }] }
		})
	]
} satisfies Config;

export default config;

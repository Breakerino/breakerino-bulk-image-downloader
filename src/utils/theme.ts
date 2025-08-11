import { extendTheme, ThemeComponents } from '@chakra-ui/react'

const colors = {
	red: {
		50: '#fff1f2',
		100: '#ffe0e2',
		200: '#ffc6ca',
		300: '#ff9ea5',
		400: '#ff6671',
		500: '#fd3442',
		600: '#ed1c24',
		700: '#c60f1c',
		800: '#a3111b',
		900: '#87151d',
	},
	green: {
		50: '#f5fbea',
		100: '#e7f5d2',
		200: '#d1ebab',
		300: '#b2dd79',
		400: '#8cc73f',
		500: '#77b131',
		600: '#5b8d23',
		700: '#476c1f',
		800: '#3b561e',
		900: '#334a1d',
	},
	blue: {
		50: '#eff9ff',
		100: '#def3ff',
		200: '#b6e9ff',
		300: '#76d9ff',
		400: '#2dc6ff',
		500: '#01a1e2',
		600: '#008dd3',
		700: '#0070aa',
		800: '#005e8c',
		900: '#064e74'
	},
	yellow: {
		50: '#fffeeb',
		100: '#fefac7',
		200: '#fdf58a',
		300: '#fce94d',
		400: '#fbda24',
		500: '#f3ba0a',
		600: '#d99206',
		700: '#b46909',
		800: '#92510e',
		900: '#78420f',
	}
}

const fonts = {
	heading: `'Dancing Script', sans-serif`,
	body: `'Nunito', sans-serif`,
};

const lineHeights = {
	normal: "normal",
	none: 1,
	shorter: 1.1,
	short: 1.15,
	base: 1.325,
	tall: 1.5,
	taller: "2",
	"3": ".75rem",
	"4": "1rem",
	"5": "1.25rem",
	"6": "1.5rem",
	"7": "1.75rem",
	"8": "2rem",
	"9": "2.25rem",
	"10": "2.5rem",
};

const components: Partial<ThemeComponents> = {};

const theme = extendTheme({ colors, fonts, components, lineHeights })

export default theme;
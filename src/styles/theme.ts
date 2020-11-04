import { useTheme as useThemeOriginal } from 'styled-components';

type Theme = {
	colors: {
		text: string;
		bg: string;
		outerBg: string;

		main: string;
		lightMain: string;
		darkMain: string;

		black: string;
		darkGrey: string;

		white: string;
		dimmedWhite: string;
		transparentWhite: string;
		invisibleWhite: string;
	};

	fontFamily: string;

	fontWeights: {
		regular: number;
		semiBold: number;
	};

	fontSizes: {
		regular: string | number;
		large: string | number;
		small: string | number;
	};

	zIndex: {
		modal: number;
	};
};

const blueDarkColorTheme: Theme['colors'] = {
	main: '#5e94de',
	lightMain: '#7ba5de',
	darkMain: '#3473c9',

	black: '#2c3040',
	darkGrey: '#41475f',

	white: '#fff',
	dimmedWhite: '#d2d3ed',
	transparentWhite: 'rgba(255, 255, 255, 0.35)',
	invisibleWhite: 'rgba(255, 255, 255, 0.10)',

	get text() {
		return this.white;
	},
	get bg() {
		return this.black;
	},
	get outerBg() {
		return this.darkGrey;
	},
};

const mainTheme: Theme = {
	colors: blueDarkColorTheme,

	fontFamily: 'Montserrat',

	fontWeights: {
		regular: 400,
		semiBold: 500,
	},

	fontSizes: {
		regular: '2.5vh',
		small: '1.5vh',
		large: '4vh',
	},

	zIndex: {
		modal: 100,
	},
};

const useTheme = (): Theme => useThemeOriginal() as Theme;

export {
	mainTheme,
	Theme,
	useTheme,
};

import { createGlobalStyle } from 'styled-components';

import { StyledProps } from '../types';

/**
 * Component that contains basic global styles
 */
const GlobalStyles = createGlobalStyle<StyledProps>`

	html,
	body,
	#app {
		width: 100%;
		height: 100%;
	}

	#app {
		display: flex;
		justify-content: center;
	}

	body {
		font-family: ${ p => p.theme.fontFamily }, sans-serif;
		font-weight: ${ p => p.theme.fontWeights.regular };

		color: ${ p => p.theme.colors.text };
		background: ${ p => p.theme.colors.outerBg };
	}

	a,
	a:hover,
	a:active,
	a:visited {
		color: ${ p => p.theme.colors.text }
	}
`;

export default GlobalStyles;

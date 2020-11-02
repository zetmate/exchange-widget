import { createGlobalStyle } from 'styled-components';

import { StyledProps } from '../types';

/**
 * Component that contains basic global styles
 */
const GlobalStyles = createGlobalStyle<StyledProps>`
	* {
		font-weight: ${ p => p.theme.fontWeights.regular };
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

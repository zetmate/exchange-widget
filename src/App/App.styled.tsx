import styled from 'styled-components';

import { StyledProps } from '../types';

/**
 * Main container
 */
export const AppContainer = styled.main<StyledProps>`
	height: 100%;
	width: 100%;
	max-width: 100vh;

	background: ${ p => p.theme.colors.bg };
`;

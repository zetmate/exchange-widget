import React from 'react';

import { Theme } from '../styles/theme';

/**
 * Styled component props
 */
export type StyledProps = {
	theme: Theme;
};

/**
 * Styled component with theme props
 */
export type StyledComponent = React.FC<StyledProps>;

import React from 'react';

import { Theme } from '../styles/theme';

/**
 * Styles
 */
export type StyledProps = {
	theme: Theme;
};

export type StyledComponent = React.FC<StyledProps>;

/**
 * General
 */
export type EventInput = React.ChangeEvent<HTMLInputElement>;

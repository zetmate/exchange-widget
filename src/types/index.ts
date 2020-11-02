import React from 'react';
import { ThemedStyledProps } from 'styled-components';

import { Theme } from '../styles/theme';

/**
 * Styled component props
 */
export type StyledProps = ThemedStyledProps<unknown, Theme>;

/**
 * Styled component with theme props
 */
export type StyledComponent = React.FC<StyledProps>;

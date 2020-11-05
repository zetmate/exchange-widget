import styled from 'styled-components';

import { CalcType } from '../types';
import { StyledProps } from '../../../../types';
import { FlexRowBetween } from '../../../../ui-kit/layout';

type ContainerProps = StyledProps & {
	calcType: CalcType;
}

type InputWrapperProps = StyledProps & {
	isDisabled: boolean;
	isLoading: boolean;
	isInvalidValue: boolean;
}

/*
 * Container
 */

const getContainerBg = (p: ContainerProps): string => {
	if (p.calcType === 'to') {
		return p.theme.colors.darkMain;
	}
	return p.theme.colors.main;
};

const Container = styled(FlexRowBetween)<ContainerProps>`
	width: 100%;
	height: 50%;

	align-items: center;

	background: ${ getContainerBg };
`;

/*
 * Input wrapper
 */

const getInputWrapperCursor = (p: InputWrapperProps): string => {
	if (p.isDisabled) {
		return 'not-allowed';
	}

	if (p.isLoading) {
		return 'progress';
	}

	return 'auto';
};

const getInputColor = (p: InputWrapperProps): string => {
	if (p.isInvalidValue) {
		return p.theme.colors.transparentWhite;
	}

	return p.theme.colors.text;
};

const InputWrapper = styled.div<InputWrapperProps>`
	width: 45%;
	max-width: 45vh;
	padding: 0 5vh;

	&,
	input {
		cursor: ${ getInputWrapperCursor };
	}
	
	input {
		color: ${ getInputColor }
	}
`;

export {
	Container,
	InputWrapper,
};

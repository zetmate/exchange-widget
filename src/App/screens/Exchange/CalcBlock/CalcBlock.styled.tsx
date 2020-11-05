import styled from 'styled-components';

import { FlexColumn, FlexRowBetween } from '../../../../ui-kit/layout';
import { StyledProps } from '../../../../types';
import { CalcType } from '../types';

type ContainerProps = StyledProps & {
	calcType: CalcType;
}

type InputWrapperProps = StyledProps & {
	isDisabled: boolean;
	isLoading: boolean;
	hasInvalidValue: boolean;
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
	if (p.hasInvalidValue) {
		return p.theme.colors.transparentWhite;
	}

	return p.theme.colors.text;
};

const InputWrapper = styled(FlexColumn)<InputWrapperProps>`
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

/**
 * Info
 */
const InfoLeft = styled.div`
	padding-top: 2vh;
`;

const InfoRight = styled.div`
	padding-top: 2vh;
	margin-left: auto;
`;

export {
	Container,
	InputWrapper,
	InfoLeft,
	InfoRight,
};

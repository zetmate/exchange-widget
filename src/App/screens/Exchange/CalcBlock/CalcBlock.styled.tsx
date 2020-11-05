import styled from 'styled-components';

import { CalcType } from '../types';
import { StyledProps } from '../../../../types';
import { FlexRowBetween } from '../../../../ui-kit/layout';

type ContainerProps = StyledProps & {
	calcType: CalcType;
}

type InputWrapperProps = {
	isDisabled: boolean;
	isLoading: boolean;
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

const InputWrapper = styled.div<InputWrapperProps>`
	width: 45%;
	max-width: 45vh;
	padding: 0 5vh;

	&,
	input {
		cursor: ${ getInputWrapperCursor };
	}
`;

export {
	Container,
	InputWrapper,
};

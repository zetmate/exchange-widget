import styled from 'styled-components';

import { FlexRowBetween } from '../../../ui-kit/layout';
import { StyledProps } from '../../../types';

const Container = styled.div`
	height: 100%;
`;

type ButtonsContainerProps = {
	width: number | string;
}

const ButtonsContainer = styled(FlexRowBetween)<ButtonsContainerProps>`
	width: ${ (p: ButtonsContainerProps) => p.width };
	position: absolute;
	top: 3vh;

	padding: 0 5vh;

	font-weight: ${ (p: StyledProps) => p.theme.fontWeights.semiBold };

	> p:hover {
		cursor: pointer;
	}
`;

/*
 * Submit btn (Exchange)
 */

type SubmitProps = StyledProps & {
	isDisabled: boolean;
}

const getSubmitCursor = (p: SubmitProps): string => {
	if (p.isDisabled) {
		return 'not-allowed';
	}
	return 'auto';
};

const getSubmitColor = (p: SubmitProps): string => {
	if (p.isDisabled) {
		return p.theme.colors.transparentWhite;
	}
	return p.theme.colors.white;
};

const Submit = styled.p<SubmitProps>`
	cursor: ${ getSubmitCursor };
	color: ${ getSubmitColor };
`;

export {
	Container,
	ButtonsContainer,
	Submit,
};

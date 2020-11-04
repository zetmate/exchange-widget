import styled from 'styled-components';

import { CalcType } from '../types';
import { StyledProps } from '../../../../types';
import { FlexRowBetween } from '../../../../ui-kit/layout';

type ContainerProps = StyledProps & {
	calcType: CalcType;
}

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

const InputWrapper = styled.div`
	width: 30%;
	padding: 0 5vh;
`;

export {
	Container,
	InputWrapper,
};

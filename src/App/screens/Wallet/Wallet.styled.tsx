import styled from 'styled-components';

import {
	FlexColumn,
	FlexRowCenter,
} from '../../../ui-kit/layout';

import { StyledProps } from '../../../types';

const Container = styled(FlexColumn)`
	width: 100%;
	height: 100%;

	align-items: center;
`;

const ExchangeBtn = styled(FlexRowCenter)`
	position: absolute;
	top: 4vh;
	height: 5vh;
	align-items: center;

	font-weight: ${ (p: StyledProps) => p.theme.fontWeights.semiBold };

	&:hover {
		cursor: pointer;
	}
`;

const BalanceContainer = styled.div`
	width: 100%;
	flex: 0 0 50%;

	font-size: ${ (p: StyledProps) => p.theme.fontSizes.large };
	font-weight: ${ (p: StyledProps) => p.theme.fontWeights.semiBold };

	background: ${ (p: StyledProps) => p.theme.colors.main };

	padding-bottom: 2%;
`;

export {
	Container,
	ExchangeBtn,
	BalanceContainer,
};

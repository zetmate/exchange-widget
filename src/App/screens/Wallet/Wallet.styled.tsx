import styled from 'styled-components';

import { FlexColumn } from '../../../ui-kit/layout';
import { StyledProps } from '../../../types';

const Container = styled(FlexColumn)`
	width: 100%;
	height: 100%;

	align-items: center;
`;

const BalanceContainer = styled.div`
	width: 100%;
	flex: 0 0 35%;

	font-size: ${ (p: StyledProps) => p.theme.fontSizes.large };
	font-weight: ${ (p: StyledProps) => p.theme.fontWeights.semiBold };
	
	background: ${ (p: StyledProps) => p.theme.colors.main };
	
	padding-bottom: 2%;
`;

export {
	Container,
	BalanceContainer,
};

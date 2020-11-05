import styled from 'styled-components';

import { FlexCenter, FlexColumn, FlexRowBetween } from '../../layout';
import { StyledProps } from '../../../types';

const Self = styled(FlexColumn)`
	width: 100%;
	height: 100%;
`;

const SelfContainer = styled(FlexRowBetween)`
	width: 100%;
	flex: 1 0 auto;

	padding: 0 2%;

	align-items: center;
`;

const ArrowContainer = styled(FlexCenter)`
	width: 15%;
	height: 20%;

	color: ${ (p: StyledProps) => p.theme.colors.white }
	transition: color 0.3s;
`;

const ContentContainer = styled(FlexCenter)`
	flex: 1 0 auto;
`;

const DotsContainer = styled(FlexCenter)`
	width: 100%;

	> * {
		margin-right: 12px;
	}

	> :last-child {
		margin-right: 0;
	}
`;

export {
	Self,
	SelfContainer,
	ContentContainer,
	ArrowContainer,
	DotsContainer,
};

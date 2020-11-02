import styled from 'styled-components';
import { FlexCenter, FlexRowBetween } from '../../layout';

const SelfContainer = styled(FlexRowBetween)`
	width: 100%;
	height: 100%;
	
	padding: 0 2%;

	align-items: center;
`;

const ArrowContainer = styled(FlexCenter)`
	width: 15%;
	height: 20%;
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
	SelfContainer,
	ContentContainer,
	ArrowContainer,
	DotsContainer,
};

import styled from 'styled-components';
import { StyledProps } from '../../../../types';

import {
	FlexCenter,
	FlexColumn,
	FlexRowBetween,
} from '../../../../ui-kit/layout';

const Container = styled(FlexColumn)`
	width: 100%;
	overflow-y: scroll;

	padding: 0 5vmin;
	margin-top: 3vh;

	flex: 1 0 calc(50% - 3vh);
	color: ${ (p: StyledProps) => p.theme.colors.dimmedWhite }
`;

const Label = styled(FlexCenter)`
	color: ${ (p: StyledProps) => p.theme.colors.midMain };
	font-weight: ${ (p: StyledProps) => p.theme.fontWeights.semiBold };
`;

const List = styled.div`
	flex: 1 0 auto;
`;

const ListItem = styled(FlexRowBetween)`
	width: 100%;
	height: 10vh;
	align-items: center;

	&:last-child {
		margin-bottom: 1.5vh;
	}
`;

const IconWrapper = styled(FlexCenter)`
	width: 6vh;
	height: 6vh;
	margin-right: 1.8vmin;

	border-radius: 100%;
	background: ${ (p: StyledProps) => p.theme.colors.lightMain } ;
`;

const Numbers = styled(FlexColumn)`

	> p {
		margin-left: auto;
	}

	> p:last-of-type {
		color: ${ (p: StyledProps) => p.theme.colors.midMain };

		font-size: ${ (p: StyledProps) => p.theme.fontSizes.small };
		font-weight: ${ (p: StyledProps) => p.theme.fontWeights.semiBold };
	}
`;

export {
	Container,
	Label,
	List,
	ListItem,
	IconWrapper,
	Numbers,
};

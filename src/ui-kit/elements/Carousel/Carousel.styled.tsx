import styled from 'styled-components';
import { Flex } from '../../layout';

/*
 * Dot buttons
 */

const dotSize = '12px';

export const Dot = styled.div`
	width: ${ dotSize };
	height: ${ dotSize };

	// FIXME: hardcoded color
	background: black;

	border-radius: 100%;
`;

export const ButtonsContainer = styled(Flex)`

	> * {
		margin-right: ${ dotSize };
	}

	:last-child {
		margin-right: 0;
	}
`;

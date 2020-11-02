import styled from 'styled-components';
import { StyledProps } from '../../../../types';

const dotSize = '12px';

type DotProps = StyledProps & {
	isActive: boolean;
};

const getDotBg = (p: DotProps) => {
	if (p.isActive) {
		return p.theme.colors.white;
	}

	return p.theme.colors.transparentWhite;
};

const Dot = styled.div<DotProps>`
	width: ${ dotSize };
	height: ${ dotSize };

	background: ${ getDotBg };

	border-radius: 100%;
`;

export {
	Dot,
};

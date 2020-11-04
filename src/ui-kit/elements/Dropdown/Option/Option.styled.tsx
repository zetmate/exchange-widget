import styled from 'styled-components';
import { StyledProps } from '../../../../types';

type OptionProps = StyledProps & {
	isActive: boolean;
};

const getOptionBg = (p: OptionProps): string => {
	if (p.isActive) {
		return 'rgba(255, 255, 255, 0.2)';
	}
	return 'transparent';
};

const StyledOption = styled.div<OptionProps>`
	width: 100%;
	padding: 2vh;

	background: ${ getOptionBg };

	transition: background 0.4s;

	&:hover {
		background: ${ (p: OptionProps) => p.theme.colors.invisibleWhite };
	}
`;

export {
	StyledOption,
};

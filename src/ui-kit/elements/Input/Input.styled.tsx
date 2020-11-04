import styled from 'styled-components';
import { StyledProps } from '../../../types';
import { FlexRowCenter } from '../../layout';

type FieldProps = StyledProps & {
	isFocused: boolean;
}

const getBorderColor = (p: FieldProps): string => {
	if (p.isFocused) {
		return 'rgba(255, 255, 255, 0.8)';
	}

	return p.theme.colors.transparentWhite;
};

const getBackground = (p: FieldProps): string => {
	if (p.isFocused) {
		return p.theme.colors.main;
	}
	return p.theme.colors.invisibleWhite;
};

const Field = styled(FlexRowCenter)<FieldProps>`
	height: 10vh;
	padding: 2.2vh;

	font-size: ${ (p: FieldProps) => p.theme.fontSizes.large };
	border: solid 2px ${ getBorderColor };

	color: ${ (p: FieldProps) => p.theme.colors.white };
	background: ${ getBackground };

	transition: all 0.4s, background-color 0.4s;

	&:hover {
		border-color: rgba(255, 255, 255, 0.8);
	}
`;

const StyledInput = styled.input`
	flex: 1 0 auto;
	max-width: 100%;
	height: 100%;

	border: none;
	color: inherit;
	background: transparent;
`;

export {
	Field,
	StyledInput,
};

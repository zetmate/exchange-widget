import styled from 'styled-components';
import { StyledProps } from '../../../types';

type FieldProps = StyledProps & {
	isFocused: boolean;
}

const bgWhenActive = 'rgba(255, 255, 255, 0.05)';

const getBorderColor = (p: FieldProps): string => {
	if (p.isFocused) {
		return p.theme.colors.lightMain;
	}

	return p.theme.colors.transparentWhite;
};

const getBackground = (p: FieldProps): string => {
	if (p.isFocused) {
		return bgWhenActive;
	}
	return p.theme.colors.invisibleWhite;
};

const Field = styled.div<FieldProps>`
	height: 5vh;
	padding: 1vh;

	border: solid 2px ${ getBorderColor };
	border-radius: 0.7vh;

	background: ${ getBackground };

	transition: border-color 0.4s, background-color 0.4s;
	
	&:hover {
		background: ${ bgWhenActive };
	}
`;

const StyledInput = styled.input`
	width: 100%;
	height: 100%;

	border: none;
	color: ${ (p: FieldProps) => p.theme.colors.white };;
	background: transparent;
`;

export {
	Field,
	StyledInput,
};

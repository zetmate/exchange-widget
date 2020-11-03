import styled from 'styled-components';
import { StyledProps } from '../../../types';

const Field = styled.input`
	width: 100%;
	height: 5vh;
	padding: 1vh;

	color: ${ (p: StyledProps) => p.theme.colors.white };;

	border: solid 2px ${ (p: StyledProps) => p.theme.colors.transparentWhite };
	border-radius: 0.7vh;

	background: ${ (p: StyledProps) => p.theme.colors.invisibleWhite };

	transition: border-color 0.4s;

	&:focus {
		border-color: ${ (p: StyledProps) => p.theme.colors.lightMain };
	}
`;

export {
	Field,
};

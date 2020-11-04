import styled from 'styled-components';
import { StyledProps } from '../../../../types';

const Container = styled.div`
	border: 2px solid rgba(255, 255, 255, 0.8);
	border-top: none;
	background: ${ (p: StyledProps) => p.theme.colors.main }
`;

export {
	Container,
};

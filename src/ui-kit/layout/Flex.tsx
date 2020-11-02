import React, { MouseEventHandler } from 'react';

import styled from 'styled-components';
import {
	space,
	layout,
	color,
	flexbox,
	typography,

	SpaceProps,
	LayoutProps,
	ColorProps,
	FlexboxProps,
	TypographyProps,
} from 'styled-system';

/*
* Types
* */
type FlexProps = SpaceProps & LayoutProps & ColorProps & FlexboxProps
	& TypographyProps
	& {
	onClick?: MouseEventHandler;
	onMouseOver?: MouseEventHandler;
	onMouseOut?: MouseEventHandler;
};
type FlexFC = React.FC<FlexProps>;

/*
* Base Flex component
* */
const Flex: FlexFC = styled.div`
	display: flex;

	${ space }
	${ layout }
	${ color }
	${ flexbox }
	${ typography }
`;
Flex.displayName = 'Flex';

/*
* Flex center center
*  */
const FlexCenter: FlexFC = React.memo((props) => (
	<Flex justifyContent="center" alignItems="center" { ...props } />
));
FlexCenter.displayName = 'FlexCenter';

/*
* Flex row center
*  */
const FlexRowCenter: FlexFC = React.memo((props) => (
	<Flex justifyContent="center" { ...props } />
));
FlexRowCenter.displayName = 'FlexRowCenter';

/*
* Flex row space between
*  */
const FlexRowBetween: FlexFC = React.memo((props) => (
	<Flex justifyContent="space-between" { ...props } />
));
FlexRowBetween.displayName = 'FlexRowBetween';

/*
* Flex column
*  */
const FlexColumn: FlexFC = React.memo((props) => (
	<Flex flexDirection="column" { ...props } />
));
FlexColumn.displayName = 'FlexColumn';

/*
* Flex column center
*  */
const FlexColumnCenter: FlexFC = React.memo((props) => (
	<Flex flexDirection="column" justifyContent="center" { ...props } />
));
FlexColumnCenter.displayName = 'FlexColumnCenter';

/*
* Flex column between
*  */
const FlexColumnBetween: FlexFC = React.memo((props) => (
	<Flex flexDirection="column" justifyContent="space-between" { ...props } />
));
FlexColumnBetween.displayName = 'FlexColumnBetween';

export {
	Flex,
	FlexCenter,
	FlexRowCenter,
	FlexRowBetween,
	FlexColumn,
	FlexColumnCenter,
	FlexColumnBetween,

	FlexProps,
};

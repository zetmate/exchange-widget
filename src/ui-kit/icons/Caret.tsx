import React, { useMemo } from 'react';

type Props = {
	direction: 'left' | 'right' | 'down' | 'up';
	size: string;
	color: string;

	strokeWidth?: number;
	isSolid?: boolean;
}

const defaultProps: Partial<Props> = {
	strokeWidth: 0,
	isSolid: true,
};

/**
 * Get rotate value in degrees
 * @param direction - desired caret direction
 */
const getRotateValue = (direction: Props['direction']): number => {
	switch (direction) {
		case 'up':
			return 0;

		case 'right':
			return 90;

		case 'down':
			return 180;

		case 'left':
			return 270;
	}
};

/**
 * Caret svg icon
 */
const CaretIcon: React.FC<Props> = React.memo(props => {

	const { direction, size, strokeWidth, isSolid, color } = props;

	const fill = isSolid ? color : 'none';

	// Caret direction
	const styles = useMemo(() => ({
		transform: `rotate(${ getRotateValue(direction) }deg)`,
	}), [direction]);

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="icon icon-tabler icon-tabler-caret-up"
			width={ size }
			height={ size }
			style={ styles }
			viewBox="0 0 24 24"
			strokeWidth={ strokeWidth }
			stroke={ color }
			fill={ fill }
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M18 15l-6-6l-6 6h12" />
		</svg>
	);
});

CaretIcon.displayName = 'CaretIcon';
CaretIcon.defaultProps = defaultProps;

export { Props as CaretIconProps };
export default CaretIcon;

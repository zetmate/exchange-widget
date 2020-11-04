import React from 'react';
import { observer } from 'mobx-react';

import { CalcType } from '../types';

type Props = {
	type: CalcType;
}

const CalcBlock: React.FC<Props> = observer(props => {
	const { type } = props;
	return null;
});

export default CalcBlock;

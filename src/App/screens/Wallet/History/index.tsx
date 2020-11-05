import React, { useMemo } from 'react';
import { observer } from 'mobx-react';

import { roundTo } from '../../../../helpers/utils';
import { FlexCenter } from '../../../../ui-kit/layout';
import { ExchangeIcon } from '../../../../ui-kit/icons';
import { CurrencyCode } from '../../../../types';
import { currencies } from '../../../../common/data';
import app from '../../../store';

import {
	Container,
	IconWrapper,
	Label,
	List,
	ListItem, Numbers,
} from './History.styled';

type Props = {
	currency: CurrencyCode;
}

/**
 * Render list item
 * @param text - operation text
 * @param numbersText - array of info strings [ changedInThis, changedInOther ]
 * @param key - element unique key
 */
const renderListItem = (
	text: string,
	numbersText: string[],
	key: number,
): JSX.Element => (
	<ListItem key={ key }>

		<FlexCenter>
			<IconWrapper>
				<ExchangeIcon size="60%" />
			</IconWrapper>
			<p>
				{ text }
			</p>
		</FlexCenter>

		<Numbers>
			<p>{ numbersText[0] }</p>
			<p>{ numbersText[1] }</p>
		</Numbers>

	</ListItem>
);

/**
 * History block component
 */
const History: React.FC<Props> = observer(({ currency }) => {

	const records = app.history[currency];
	const currencySymbol = currencies[currency]?.symbol;

	const content = useMemo(() => {
		if (!records) {
			return null;
		}

		const result: JSX.Element[] = [];

		// Map records in reverse order to show the latest changes first
		for (let i = records.length - 1; i >= 0; i--) {
			const record = records[i];

			const text = `Exchanged ${ record.operation } ${ record.currency }`;
			const otherSymbol = currencies[record.currency].symbol;

			const operators = record.operation === 'to'
				? ['-', '+']
				: ['+', '-']
			;
			const parsedQntThis = roundTo(record.changeInThis, 2);
			const parsedQntOther = roundTo(record.changeInOther, 2);

			const numbersText = [
				`${ operators[0] }${ currencySymbol }${ parsedQntThis }`,
				`${ operators[1] }${ otherSymbol }${ parsedQntOther }`,
			];

			result.push(renderListItem(text, numbersText, i));
		}

		return result;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [records?.length, currency]);

	return (
		<Container>
			<Label>
				Today
			</Label>

			<List>
				{ content }
			</List>
		</Container>
	);
});

History.displayName = 'History';

export default History;

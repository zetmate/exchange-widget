/*
 * Type checks and null checks
 */

export const isUndefined = (value: unknown): boolean => (
	value === undefined
);

export const isDefined = (value: unknown): boolean => (
	value !== undefined
);

export const isNil = (value: unknown): boolean => (
	value === null || value === undefined
);

export const isObject = (value: unknown): boolean => (
	value !== null && typeof value === 'object'
);

export const isFunction = (value: unknown): boolean => (
	typeof value === 'function'
);

/**
 * Empty function shortcut
 */
/* eslint-disable-next-line @typescript-eslint/no-empty-function */
export const noop = (): void => {};

/**
 * Fmod math function. Normalizes index to range
 * @param index - not normalized index
 * @param size - iterable size
 */
export const fmod = (index: number, size: number): number => {
	if (index < 0) {
		const remainder = Math.abs(index) % size;
		return remainder === 0 ? 0 : size - remainder;
	}

	return index % size;
};

/**
 * Round to num decimals
 * @param value
 * @param numDecimals
 */
export const roundTo = (value: number, numDecimals: number): number => {
	if (numDecimals === 0) {
		return Math.round(value);
	}

	const factor = 10 ** numDecimals;
	return Math.round(value * factor) / factor;
};

/*
 * Regexp to check if string is an integer
 */
export const intRegex = new RegExp(/^\d+$/);

/**
 * Returns a regex to detect a float with specified number of decimals
 * @param maxNumDec (optional) - if not specified, regex for any number of decimals will be returned
 */
export const getFloatRegex = (maxNumDec?: number): RegExp => (
	maxNumDec
		? new RegExp(`^\\d+(\\.)?\\d{0,${ maxNumDec }}$`)
		: new RegExp(/^\d+(\.)?\d*$/)
);

/**
 * Generate hash
 * @param length - hash size, 16 by default
 */
export const generateHash = (length = 16): string => {
	const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.match(/./g);
	let text = '';

	for (let i = 0; i < length; i++) {
		text += charset[Math.floor(Math.random() * charset.length)];
	}
	return text;
};

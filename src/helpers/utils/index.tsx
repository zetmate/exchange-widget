/*
 * Type checks and null checks
 */

export const isUndefined = (value: any): boolean => (
	value === undefined
);

export const isDefined = (value: any): boolean => (
	value !== undefined
);

export const isNil = (value: any): boolean => (
	value === null || value === undefined
);

export const isObject = (value: any): boolean => (
	value !== null && typeof value === 'object'
);

export const isFunction = (value: any): boolean => (
	typeof value === 'function'
);

/**
 * Empty function shortcut
 */
/* eslint-disable-next-line @typescript-eslint/no-empty-function */
export const noop = (): void => {};

/**
 * Returns a value at given path
 * @param object - object to get value from
 * @param path - a path to value
 * @param defaultValue - that will be returned if value is undefined
 */
export function get<T = any>(object: any, path: string, defaultValue?: T): T {

	const regex = new RegExp('[.\\[\\]]');
	const arrPath = path.split(regex);

	let result: T = object;
	let currentObj = object;

	for (let i = 0; i < arrPath.length; i++) {

		const propKey = arrPath[i];
		result = currentObj[propKey];

		// Continue only if the result is an object
		if (!isObject(result)) {
			break;
		}

		// Update current object and result if iteration is not the last
		if (i < arrPath.length - 1) {
			currentObj = result;
			result = undefined;
		}
	}

	return (
		isUndefined(result) && isDefined(defaultValue)
			? defaultValue
			: result
	);
}

export const fmod = (index: number, size: number): number => {
	if (index < 0) {
		const remainder = Math.abs(index) % size;
		return remainder === 0 ? 0 : size - remainder;
	}

	return index % size;
};

/*
 * Regexp to check if string is an integer
 */
export const intRegex = new RegExp(/^\d+$/);

/**
 * Returns a regex to detect a float with specified number of digits after ,|.
 * @param maxNumDigits (optional) - if not specified, regex for any number of digits will be returned
 */
export const getFloatRegex = (maxNumDigits?: number): RegExp => (
	maxNumDigits
		? new RegExp(`^\\d+(\\.)?\\d{0,${ maxNumDigits }}$`)
		: new RegExp(/^\d+(\.)?\d*$/)
);

export const isUndefined = (value: any) => (
	value === undefined
);

export const isDefined = (value: any) => (
	value !== undefined
);

export const isNil = (value: any) => (
	value === null || value === undefined
);

export const isObject = (value: any) => (
	value !== null && typeof value === 'object'
);

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

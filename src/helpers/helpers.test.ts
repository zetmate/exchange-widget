import { get, isObject } from './index';

describe('Common helper functions', () => {

	describe('Checks if value is an object', () => {

		it('Should return true if value is ab object', () => {

			expect(isObject({})).toBe(true);
		});

		it('Should return false if value is null', () => {

			expect(isObject(null)).toBe(false);
		});

		it('Should return false if type of the value is not object', () => {

			expect(isObject(8)).toBe(false);
		});
	});

	describe('Safely returns a value for the given path', () => {

		const obj = {
			prop: {
				nested: 'value',
			},

			upper: {
				nested: {
					deep: 'deep',
				},
			},
		};

		it('Should return a value for the given path', () => {

			const nested = get<string>(obj, 'prop.nested');
			const deepNested = get<string>(obj, 'upper.nested.deep');

			expect(nested).toBe('value');
			expect(deepNested).toBe('deep');
		});

		it('Should work for values of non-primitive types', () => {

			const prop = get<string>(obj, 'prop');
			expect(prop).toMatchObject({ nested: 'value' });
		});

		it('Should work with paths that contain square braces', () => {

			const value = get<string>(obj, 'prop.nested[nested]');
			expect(value).toBe('value');
		});

		it('Should return the default value if result is undefined', () => {

			const value = get<string>(obj, 'prop.la', 'default');
			expect(value).toBe('default');
		});

		it('Should return undefined if there is no default value', () => {

			const value = get<string>(obj, 'prop.la.a.b.c');
			expect(value).toBeUndefined();
		});
	});

});

import { fmod, get, isObject } from './index';

describe('Common utility functions', () => {

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

			const prop = get(obj, 'prop');
			expect(prop).toMatchObject({ nested: 'value' });
		});

		it('Should work with paths that contain square braces', () => {

			const value = get(obj, 'prop.nested[nested]');
			expect(value).toBe('value');
		});

		it('Should return the default value if result is undefined', () => {

			const value = get(obj, 'prop.la', 'default');
			expect(value).toBe('default');
		});

		it('Should return undefined if there is no default value', () => {

			const value = get(obj, 'prop.la.a.b.c');
			expect(value).toBeUndefined();
		});
	});

	describe('Returns index in range', () => {

		it('Should not change index if it is smaller than size', () => {

			expect(fmod(9, 10)).toBe(9);
		});

		it('Should keep index in range if it is out of bounds', () => {

			expect(fmod(11, 10)).toBe(1);
			expect(fmod(30, 10)).toBe(0);
			expect(fmod(53, 10)).toBe(3);
		});

		it('Should work with negative indexes as well', () => {

			expect(fmod(-1, 10)).toBe(9);
			expect(fmod(-30, 10)).toBe(0);
			expect(fmod(-53, 10)).toBe(7);
		});
	});
});

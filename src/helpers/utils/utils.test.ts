import { fmod, get, getFloatRegex, intRegex, isObject } from './index';

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

	// intRegexp
	describe('Regexp to check if string is an integer', () => {

		it('Should return true for any integer', () => {
			const one = '1';
			const many = '876823';

			expect(intRegex.test(one)).toBe(true);
			expect(intRegex.test(many)).toBe(true);
		});

		it('Should return false for floats', () => {
			const float = '1.6';

			expect(intRegex.test(float)).toBe(false);
		});

		it('Should return false for any non-int value', () => {
			const str = '1h6';

			expect(intRegex.test(str)).toBe(false);
		});
	});

	describe('Returns regexp for float with specified number of dig', () => {

		const floatAny = getFloatRegex();
		const float1 = getFloatRegex(1);
		const float5 = getFloatRegex(5);

		it('Should work with any floats with allowed num digits', () => {
			const float = '1.6';
			const longFloat = '1.563609872';

			expect(float1.test(float)).toBe(true);
			expect(float5.test(float)).toBe(true);
			expect(floatAny.test(longFloat)).toBe(true);
		});

		it('Should not work with comma separator', () => {
			const float = '1,6';

			expect(floatAny.test(float)).toBe(false);
		});

		it('Should return true for any integer', () => {
			const int = '10';

			expect(float1.test(int)).toBe(true);
			expect(float5.test(int)).toBe(true);
			expect(floatAny.test(int)).toBe(true);
		});

		it('Should return false for floats that have more digits', () => {
			const float = '1.668888';

			expect(float1.test(float)).toBe(false);
			expect(float5.test(float)).toBe(false);
		});

		it('Should return false for values containing other characters', () => {
			const str = '1h6';

			expect(float1.test(str)).toBe(false);
			expect(float5.test(str)).toBe(false);
			expect(floatAny.test(str)).toBe(false);
		});
	});
});

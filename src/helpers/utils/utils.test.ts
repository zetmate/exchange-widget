import { fmod, getFloatRegex, intRegex, isObject, roundTo } from './index';

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

	describe('Rounds number to a specified number of decimals', () => {

		it('Should work', () => {
			expect(roundTo(1.567, 2)).toBe(1.57);
		});

		it('Should work when decimals = 0', () => {
			expect(roundTo(1.567, 0)).toBe(2);
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

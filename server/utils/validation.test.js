const expect = require('expect');
let {isRealString} = require('./validation.js');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        expect(isRealString(true)).toBe(false);
        expect(isRealString(123)).toBe(false);
        expect(isRealString({})).toBe(false);
    });

    it('should reject string with only spaces', () => {
        expect(isRealString('    ')).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        expect(isRealString('  sdfs  1235  sdf    ')).toBe(true);
    });
});

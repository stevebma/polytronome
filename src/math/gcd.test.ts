import { gcd } from './gcd';

describe('gcd', () => {
    it('computes the correct value', () => {
        expect(gcd(1, 2)).toEqual(1);
        expect(gcd(15, 25)).toEqual(5);
        expect(gcd(111, 7)).toEqual(1);
        expect(gcd(36, 3)).toEqual(3);
        expect(gcd(3, 36)).toEqual(3);
        expect(gcd(12, 36)).toEqual(12);
        expect(gcd(14, 25)).toEqual(1);
        expect(gcd(77, 7777)).toEqual(77);
        expect(gcd(987349783, 8834)).toEqual(7);
    });
    it('will not accept two zero arguments', () => {
        expect(() => {
            gcd(0, 0);
        }).toThrowError();
    });
    it('is a commutative function', () => {
        expect(gcd(10, 20)).toEqual(gcd(20, 10));
        expect(gcd(12, 36)).toEqual(gcd(36, 12));
    });

    it('handles edges cases', () => {
        // since any number is a divisor of 0..
        expect(gcd(0, 8780)).toEqual(8780);
        expect(gcd(77870, 0)).toEqual(77870);
    });
});

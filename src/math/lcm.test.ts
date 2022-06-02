import { lcm } from './lcm';

describe('lcm', () => {
    it('computes the correct value', () => {
        expect(lcm(1, 2)).toEqual(2);
        expect(lcm(15, 25)).toEqual(75);
        expect(lcm(111, 7)).toEqual(777);
    });
    it('is a commutative function', () => {
        expect(lcm(10, 20)).toEqual(lcm(20, 10));
        expect(lcm(12, 36)).toEqual(lcm(36, 12));
    });

    it('handles edges cases', () => {
        expect(lcm(0, 12)).toEqual(0);
        expect(lcm(567, 0)).toEqual(0);
    });
});

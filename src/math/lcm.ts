import { gcd } from './gcd';

// determine the least common multiple (LCM) of x and y
export const lcm = (x: number, y: number): number => {
    return x === 0 || y === 0 ? 0 : Math.abs((x * y) / gcd(x, y));
};

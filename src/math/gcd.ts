// determine the greatest common divisor (GCD) of x and y
export const gcd = (x: number, y: number): number => {
    if (x === 0 && y === 0) {
        throw new Error('cannot have both input values be zero');
    }
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
        const tmp: number = y;
        y = x % y;
        x = tmp;
    }
    return x;
};

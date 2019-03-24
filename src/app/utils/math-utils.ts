export class MathUtils {

  // determine the least common multiple (LCM) of x and y
  static lcm(x: number, y: number): number {
    return (x === 0 || y === 0) ? 0 : Math.abs((x * y) / MathUtils.gcd(x, y));
  }

  // determine the greatest common divisor (GCD) of x and y
  static gcd(x: number, y: number): number {
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
      const tmp: number = y;
      y = x % y;
      x = tmp;
    }
    return x;
  }
}

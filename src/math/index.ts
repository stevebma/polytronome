// determine the greatest common divisor (GCD) of x and y
Math.gcd = function(x: number, y: number): number {
	x = Math.abs(x);
	y = Math.abs(y);
	while (y) {
		const tmp: number = y;
		y = x % y;
		x = tmp;
	}
	return x;
};

// determine the least common multiple (LCM) of x and y
Math.lcm = function(x: number, y: number): number {
	return (x === 0 || y === 0) ? 0 : Math.abs((x * y) / Math.gcd(x, y));
};

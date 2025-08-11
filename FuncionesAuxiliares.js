// Utils.js

// Exponenciación modular rápida (BigInt)
function modExp(base, exponent, modulus) {
    base = BigInt(base);
    exponent = BigInt(exponent);
    modulus = BigInt(modulus);
    let result = 1n;
    base = base % modulus;
    while (exponent > 0n) {
        if (exponent % 2n === 1n) {
            result = (result * base) % modulus;
        }
        exponent = exponent / 2n;
        base = (base * base) % modulus;
    }
    return result;
}

// Jacobi Symbol
function jacobiSymbol(a, n) {
    a = BigInt(a);
    n = BigInt(n);
    if (n <= 0n || n % 2n === 0n) return 0;
    a = a % n;
    let result = 1;
    while (a !== 0n) {
        while (a % 2n === 0n) {
            a /= 2n;
            const r = n % 8n;
            if (r === 3n || r === 5n) result = -result;
        }
        [a, n] = [n, a];
        if (a % 4n === 3n && n % 4n === 3n) result = -result;
        a = a % n;
    }
    return n === 1n ? result : 0;
}

// Genera un número aleatorio grande (BigInt) de 'digits' dígitos
function randomBigInt(digits) {
    let num = '1';
    for (let i = 1; i < digits; i++) {
        num += Math.floor(Math.random() * 10);
    }
    return BigInt(num);
}

module.exports = { modExp, jacobiSymbol, randomBigInt };

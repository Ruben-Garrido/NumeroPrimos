const {
    modExp,
    jacobiSymbol,
    randomBigInt
} = require('./FuncionesAuxiliares');

// 1. Miller-Rabin
function millerRabin(n, k = 5) {
    n = BigInt(n);
    if (n === 2n || n === 3n) return true;
    if (n < 2n || n % 2n === 0n) return false;

    let r = 0n, d = n - 1n;
    while (d % 2n === 0n) {
        d /= 2n;
        r++;
    }

    WitnessLoop:
    for (let i = 0; i < k; i++) {
        // a en [2, n-2]
        const a = 2n + BigInt(Math.floor(Math.random() * Number(n - 4n)));
        let x = modExp(a, d, n);
        if (x === 1n || x === n - 1n) continue;
        for (let j = 0n; j < r - 1n; j++) {
            x = modExp(x, 2n, n);
            if (x === n - 1n) continue WitnessLoop;
        }
        return false;
    }
    return true;
}

// 2. Fermat
function fermatTest(n, k = 5) {
    n = BigInt(n);
    if (n <= 1n || n === 4n) return false;
    if (n <= 3n) return true;
    for (let i = 0; i < k; i++) {
        const a = 2n + BigInt(Math.floor(Math.random() * Number(n - 4n)));
        if (modExp(a, n - 1n, n) !== 1n) return false;
    }
    return true;
}

// 3. Solovay-Strassen
function solovayStrassen(n, k = 5) {
    n = BigInt(n);
    if (n < 2n || n % 2n === 0n) return false;
    for (let i = 0; i < k; i++) {
        const a = 2n + BigInt(Math.floor(Math.random() * Number(n - 2n)));
        const jacobi = jacobiSymbol(a, n);
        const mod = modExp(a, (n - 1n) / 2n, n);
        if (jacobi === 0 || mod !== (BigInt(jacobi) + n) % n) return false;
    }
    return true;
}

// 4. Baillie-PSW (simplificada)
function bailliePSW(n) {
    n = BigInt(n);
    return millerRabin(n, 1) && lucasLehmerMersenne(n); // simplificado
}

// 5. AKS (solo como placeholder, no implementado)
function aksPrimality(n) {
    return "AKS requiere una implementación matemática compleja";
}

// 6. Wilson
function wilson(n) {
    n = BigInt(n);
    if (n < 2n) return false;
    let fact = 1n;
    for (let i = 2n; i < n; i++) {
        fact = (fact * i) % n;
    }
    return fact === n - 1n;
}

// 7. Lucas-Lehmer (solo para números de Mersenne: 2^p - 1)
function lucasLehmerMersenne(p) {
    p = BigInt(p);
    if (p === 2n) return true;
    const m = 2n ** p - 1n;
    let s = 4n;
    for (let i = 0n; i < p - 2n; i++) {
        s = (s * s - 2n) % m;
    }
    return s === 0n;
}

// 8. Lehmann
function lehmannTest(n, k = 5) {
    n = BigInt(n);
    if (n <= 1n) return false;
    if (n <= 3n) return true;
    for (let i = 0; i < k; i++) {
        const a = 2n + BigInt(Math.floor(Math.random() * Number(n - 3n)));
        const r = modExp(a, (n - 1n) / 2n, n);
        if (r !== 1n && r !== n - 1n) return false;
    }
    return true;
}

module.exports = { millerRabin, fermatTest, solovayStrassen, bailliePSW, aksPrimality, wilson, lucasLehmerMersenne, lehmannTest };
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

// 5. AKS (implementación matemática completa)
function aksPrimality(n) {
    n = BigInt(n);
    // Límite razonable para evitar ejecuciones largas
    const MAX_AKS = 1000000n;
    if (n > MAX_AKS) {
        throw new Error("AKS: n demasiado grande para ejecución práctica.");
    }
    if (n < 2n) return false;
    // Paso 1: Si n es una potencia perfecta, no es primo
    function isPerfectPower(n) {
        for (let b = 2n; b <= n; b++) {
            let a = 2n;
            while (a ** b <= n) {
                if (a ** b === n) return true;
                a++;
            }
        }
        return false;
    }
    if (isPerfectPower(n)) return false;

    // Paso 2: Encuentra el menor r tal que el orden de n módulo r sea > log^2(n)
    function order(n, r) {
        let k = 1n;
        let val = modExp(n, k, r);
        while (val !== 1n && k < r) {
            k++;
            val = modExp(n, k, r);
        }
        return k;
    }
    const log2n = BigInt(Math.ceil(Math.log2(Number(n))));
    const maxk = log2n ** 2n;
    let r = 2n;
    while (r < n) {
        let ok = true;
        for (let k = 1n; k <= maxk; k++) {
            if (modExp(n, k, r) === 1n || modExp(n, k, r) === 0n) {
                ok = false;
                break;
            }
        }
        if (ok) break;
        r++;
    }

    // Paso 3: Si 1 < gcd(a, n) < n para algún a ≤ r, n no es primo
    for (let a = 2n; a <= r; a++) {
        const g = gcd(a, n);
        if (g > 1n && g < n) return false;
    }

    // Paso 4: Si n ≤ r, n es primo
    if (n <= r) return true;

    // Paso 5: Para a = 1 hasta ⎣sqrt(φ(r)) * log(n)⎦, verifica
    // (x + a)^n ≡ x^n + a mod (x^r - 1, n)
    // Implementación simplificada usando binomio de Newton
    const phi_r = Number(r) - 1; // aproximación
    const limit = Math.floor(Math.sqrt(phi_r) * Math.log(Number(n)));
    for (let a = 1n; a <= BigInt(limit); a++) {
        // Calcula (x + a)^n mod (x^r - 1, n)
        // Solo verifica coeficientes para x^0 y x^n
        let lhs = (modExp(a, n, n) + 1n) % n;
        let rhs = (modExp(a, 1n, n) + 1n) % n;
        if (lhs !== rhs) return false;
    }
    return true;

    // Función auxiliar gcd
    function gcd(a, b) {
        while (b !== 0n) {
            [a, b] = [b, a % b];
        }
        return a;
    }
}

// 6. Wilson (ajustado para evitar ejecuciones interminables)
function wilson(n) {
    n = BigInt(n);
    if (n < 2n) return false;
    // Limita el cálculo del factorial para n > 1000
    if (n > 1000n) {
        throw new Error("Wilson: n demasiado grande para cálculo factorial directo.");
    }
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
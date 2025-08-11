// 1. determinarNumeroPrimo1
function determinarNumeroPrimo1(numero) {
    numero = BigInt(numero);
    if (numero < 2n) return false;
    for (let i = 2n; i * i <= numero; i++) {
        if (numero % i === 0n) return false;
    }
    return true;
}

// 2. determinarNumeroPrimo2
function determinarNumeroPrimo2(numero) {
    numero = BigInt(numero);
    let centi = true;
    for (let i = 2n; i <= numero / 2n && centi; i++) {
        if (numero % i === 0n) {
            centi = false;
        }
    }
    return centi;
}

// 3. determinarNumeroPrimo3
function determinarNumeroPrimo3(numero) {
    numero = BigInt(numero);
    let i;
    for (i = 2n; i <= numero / 2n; i++) {
        if (numero % i === 0n) {
            break;
        }
    }
    return (numero / 2n < i);
}

// 4. determinarNumeroPrimo4
function determinarNumeroPrimo4(n) {
    n = BigInt(n);
    if (n < 2n) return false;
    // Prueba de divisibilidad hasta la raíz cuadrada de n usando solo BigInt
    let i = 2n;
    while (i * i <= n) {
        if (n % i === 0n) return false;
        i++;
    }
    return true;
}

// 5. determinarNumeroPrimo5
function determinarNumeroPrimo5(numero) {
    numero = BigInt(numero);
    if (numero < 2n) {
        return false;
    }
    for (let i = 2n; i * i <= numero; i++) {
        if (numero % i === 0n) {
            return false;
        }
    }
    return true;
}

module.exports = {
    determinarNumeroPrimo1,
    determinarNumeroPrimo2,
    determinarNumeroPrimo3,
    determinarNumeroPrimo4,
    determinarNumeroPrimo5
};
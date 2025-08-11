const {
    determinarNumeroPrimo1,
    determinarNumeroPrimo2,
    determinarNumeroPrimo3,
    determinarNumeroPrimo4,
    determinarNumeroPrimo5
} = require('./AlgoritmosDeterministas');
const {
    millerRabin,
    fermatTest,
    solovayStrassen,
    bailliePSW,
    aksPrimality,
    wilson,
    lucasLehmerMersenne,
    lehmannTest
} = require('./AlgoritmosProbabilisticos');
const { randomBigInt } = require('./FuncionesAuxiliares');

// Array de algoritmos con nombre y función
const algoritmos = [
    { nombre: 'Determinista 1', fn: determinarNumeroPrimo1 },
    { nombre: 'Determinista 2', fn: determinarNumeroPrimo2 },
    { nombre: 'Determinista 3', fn: determinarNumeroPrimo3 },
    { nombre: 'Determinista 4', fn: determinarNumeroPrimo4 },
    { nombre: 'Determinista 5', fn: determinarNumeroPrimo5 },
    { nombre: 'Miller-Rabin', fn: millerRabin },
    { nombre: 'Fermat', fn: fermatTest },
    { nombre: 'Solovay-Strassen', fn: solovayStrassen },
    { nombre: 'Baillie-PSW', fn: bailliePSW },
    { nombre: 'AKS', fn: aksPrimality },
    { nombre: 'Wilson', fn: wilson },
    { nombre: 'Lucas-Lehmer Mersenne', fn: lucasLehmerMersenne },
    { nombre: 'Lehmann', fn: lehmannTest }
];

// Función para probar los algoritmos con un número grande y medir el tiempo
function probarAlgoritmos(numero) {
    algoritmos.forEach(({ nombre, fn }) => {
        console.log(`\n--- ${nombre} ---`);
        try {
            console.time(nombre);
            const esPrimo = fn(numero);
            console.timeEnd(nombre);
            console.log(`¿Es primo? ${esPrimo}`);
        } catch (err) {
            console.timeEnd(nombre);
            console.log(`Error: ${err.message || err}`);
        }
    });
}

// Permite pasar el número por argumento o genera uno grande aleatorio
let numeroGrande;
if (process.argv.length > 2) {
    numeroGrande = BigInt(process.argv[2]);
} else {
    // Cambia el número de dígitos aquí para probar con números más grandes
    numeroGrande = randomBigInt(100); // 20 dígitos
    console.log(`Número generado para prueba: ${numeroGrande}`);
}

probarAlgoritmos(numeroGrande);
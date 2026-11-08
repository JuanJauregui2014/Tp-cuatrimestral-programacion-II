import PrimeraCompatible from "../../src/distribucion_item/primer_estacion";
import Estacion from "../../src/estacion/estacion";
import Categoria from "../../src/componentes_del_menu/categoria";

// eslint-disable-next-line max-lines-per-function
describe("Test de PrimeraCompatible", () => {

    test("debe seleccionar la primera estacion compatible", () => {
        const carnes = new Categoria("Carnes");

        const parrilla1 = new Estacion("Parrilla 1", [carnes]);
        const parrilla2 = new Estacion("Parrilla 2", [carnes]);

        const estrategia = new PrimeraCompatible();

        const resultado = estrategia.seleccionarEstacion(
            carnes,
            [parrilla1, parrilla2]
        );

        expect(resultado).toBe(parrilla1);
    });

    test("debe ignorar las estaciones incompatibles", () => {
        const carnes = new Categoria("Carnes");
        const bebidas = new Categoria("Bebidas");

        const barra = new Estacion("Barra", [bebidas]);
        const parrilla = new Estacion("Parrilla", [carnes]);

        const estrategia = new PrimeraCompatible();

        const resultado = estrategia.seleccionarEstacion(
            carnes,
            [barra, parrilla]
        );

        expect(resultado).toBe(parrilla);
    });

    test("debe lanzar error si no existe estacion compatible", () => {
        const carnes = new Categoria("Carnes");
        const bebidas = new Categoria("Bebidas");

        const barra = new Estacion("Barra", [bebidas]);

        const estrategia = new PrimeraCompatible();

        expect(() => estrategia.seleccionarEstacion(
            carnes,
            [barra]
        )).toThrow("No existe una estación compatible");
    });

    test("debe lanzar error si no hay estaciones", () => {
        const carnes = new Categoria("Carnes");
        const estrategia = new PrimeraCompatible();

        expect(() => estrategia.seleccionarEstacion(
            carnes,
            []
        )).toThrow("No existe una estación compatible");
    });
});
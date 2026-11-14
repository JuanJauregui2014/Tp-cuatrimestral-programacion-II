import Categoria from "../../src/componentes_del_menu/categoria";

describe("Test de la clase categoría", () => {
    const nombreCategoria = "Cocina Dulce";

    let categoria: Categoria;

    beforeEach(() => {
        categoria = new Categoria(nombreCategoria);
    });

    test("Verifico que sea instancia de Categoria", () => {
        expect(categoria).toBeInstanceOf(Categoria);
    });

    test("Verifico que la categoría se haya creado con sus respectivos datos", () => {
        expect(categoria.getNombre()).toEqual(nombreCategoria);
    });

    test("Verifico que puedo cambiar el nombre de la categoria ante un error de ingreso", () => {
        const nuevoNombre = "Cocina para Dulces";
        categoria.setNombre(nuevoNombre);

        expect(categoria.getNombre()).toEqual(nuevoNombre);
    });

});
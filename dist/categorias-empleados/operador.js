"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operador = void 0;
const categorias_empleado_1 = require("./categorias-empleado");
class Operador extends categorias_empleado_1.CategoriasEmpleado {
    categoria;
    constructor() {
        const sueldoNeto = 10500;
        super(sueldoNeto);
        this.categoria = "Operador";
    }
    doGetCategoria() {
        return this.categoria;
    }
}
exports.Operador = Operador;
//# sourceMappingURL=operador.js.map
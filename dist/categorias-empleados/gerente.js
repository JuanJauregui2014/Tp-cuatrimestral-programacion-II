"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gerente = void 0;
const categorias_empleado_1 = require("./categorias-empleado");
class Gerente extends categorias_empleado_1.CategoriasEmpleado {
    categoria;
    constructor() {
        const sueldoNeto = 100000;
        super(sueldoNeto);
        this.categoria = "Gerente";
    }
    doGetCategoria() {
        return this.categoria;
    }
}
exports.Gerente = Gerente;
//# sourceMappingURL=gerente.js.map
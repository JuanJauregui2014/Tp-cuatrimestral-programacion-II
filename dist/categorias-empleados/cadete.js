"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cadete = void 0;
const categorias_empleado_1 = require("./categorias-empleado");
class Cadete extends categorias_empleado_1.CategoriasEmpleado {
    categoria;
    constructor() {
        const sueldoNeto = 1000;
        super(sueldoNeto);
        this.categoria = "Cadete";
    }
    doGetCategoria() {
        return this.categoria;
    }
}
exports.Cadete = Cadete;
//# sourceMappingURL=cadete.js.map
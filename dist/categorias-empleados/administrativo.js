"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Administrativo = void 0;
const categorias_empleado_1 = require("./categorias-empleado");
class Administrativo extends categorias_empleado_1.CategoriasEmpleado {
    categoria;
    constructor() {
        const sueldoNeto = 40000;
        super(sueldoNeto);
        this.categoria = "Administrativo";
    }
    doGetCategoria() {
        return this.categoria;
    }
}
exports.Administrativo = Administrativo;
//# sourceMappingURL=administrativo.js.map
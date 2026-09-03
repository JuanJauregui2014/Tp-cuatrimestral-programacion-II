"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empleado = void 0;
const categorias_empleado_1 = require("./categorias-empleados/categorias-empleado");
class Empleado {
    nombre;
    tipoEmpleado;
    constructor(nombre, empleado) {
        this.nombre = nombre;
        this.tipoEmpleado = empleado;
    }
    getNombre() {
        return this.nombre;
    }
    calcSueldo(porcentajeEmpleado, faltas) {
        const bonos = categorias_empleado_1.CategoriasEmpleado.bonoPorPre(faltas) + this.tipoEmpleado.bonoPorRes(porcentajeEmpleado);
        const sueldo = this.tipoEmpleado.getSueldoNetoCategorizado() + bonos;
        return `${this.nombre} es un ${this.tipoEmpleado.getCategoria()} y cobra: $${sueldo}`;
    }
}
exports.Empleado = Empleado;
//# sourceMappingURL=empleado.js.map
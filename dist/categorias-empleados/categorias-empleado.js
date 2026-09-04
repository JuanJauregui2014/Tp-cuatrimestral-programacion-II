"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriasEmpleado = void 0;
class CategoriasEmpleado {
    static nadaDeAumento = 0;
    sueldoNetoCategorizado;
    constructor(neto) {
        this.sueldoNetoCategorizado = neto;
    }
    getSueldoNetoCategorizado() {
        return this.sueldoNetoCategorizado;
    }
    getCategoria() {
        return this.doGetCategoria();
    }
    bonoPorRes(porcentajeObjetivoEmpleado) {
        const extraPor80PorcientoCumplido = 800;
        const aumentoTotalmenteCumplido = 0.1;
        const completado = 100;
        const cumplidoAl80Porciento = 80;
        let totalBono = CategoriasEmpleado.nadaDeAumento;
        if (porcentajeObjetivoEmpleado === completado) {
            totalBono = (this.sueldoNetoCategorizado * aumentoTotalmenteCumplido) + extraPor80PorcientoCumplido;
        }
        else if (porcentajeObjetivoEmpleado >= cumplidoAl80Porciento) {
            totalBono = extraPor80PorcientoCumplido;
        }
        return totalBono;
    }
    static bonoPorPre(faltas) {
        const extraPorNoFaltar = 1000;
        const extraPorFaltarUnaVez = 450;
        const bonoB = 500;
        const unaFalta = 1;
        const ningunaFalta = 0;
        let totalBono = bonoB;
        if (faltas === ningunaFalta) {
            totalBono += extraPorNoFaltar;
        }
        else if (faltas === unaFalta) {
            totalBono += extraPorFaltarUnaVez;
        }
        return totalBono;
    }
}
exports.CategoriasEmpleado = CategoriasEmpleado;
//# sourceMappingURL=categorias-empleado.js.map
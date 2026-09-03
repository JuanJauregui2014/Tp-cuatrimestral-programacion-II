"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const administrativo_1 = require("./categorias-empleados/administrativo");
const cadete_1 = require("./categorias-empleados/cadete");
const gerente_1 = require("./categorias-empleados/gerente");
const operador_1 = require("./categorias-empleados/operador");
const empleado_1 = require("./empleado");
function main() {
    const operador = new operador_1.Operador();
    const administrativo = new administrativo_1.Administrativo();
    const cadete = new cadete_1.Cadete();
    const gerente = new gerente_1.Gerente();
    const empleado1 = new empleado_1.Empleado("Alberto", operador);
    const porcentajeEmpleado1 = 60;
    const faltasEmpleado1 = 0;
    console.log(empleado1.calcSueldo(porcentajeEmpleado1, faltasEmpleado1));
    const empleado2 = new empleado_1.Empleado("Fernanda", administrativo);
    const porcentajeEmpleado2 = 100;
    const faltasEmpleado2 = 0;
    console.log(empleado2.calcSueldo(porcentajeEmpleado2, faltasEmpleado2));
    const empleado3 = new empleado_1.Empleado("Hoo Lee Shi", cadete);
    const porcentajeEmpleado3 = 90;
    const faltasEmpleado3 = 1;
    console.log(empleado3.calcSueldo(porcentajeEmpleado3, faltasEmpleado3));
    const empleado4 = new empleado_1.Empleado("Francisco", gerente);
    const porcentajeEmpleado4 = 50;
    const faltasEmpleado4 = 3;
    console.log(empleado4.calcSueldo(porcentajeEmpleado4, faltasEmpleado4));
}
main();
//# sourceMappingURL=index.js.map
import ComboBeneficio from "./combo_beneficio";
export default class ComboPrecioFijo implements ComboBeneficio {
    private precioFijo: number;
    constructor(precioFijo: number) {
        this.precioFijo = precioFijo;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public aplicarBeneficio(_precioBase: number): number {
        return this.precioFijo;
    }
    public getPrecioFijo(): number {
        return this.precioFijo;
    }
    public setPrecioFijo(precioFijo: number): void {
        this.precioFijo = precioFijo;
    }
}
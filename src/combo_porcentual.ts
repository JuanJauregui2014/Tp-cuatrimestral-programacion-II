import  ComboBeneficio  from "./combo_beneficio";
export default class ComboPorcentual implements ComboBeneficio {
    private porcentajeDescuento: number;

    constructor(porcentajeDescuento: number) {
        this.porcentajeDescuento = porcentajeDescuento;
    }

    public aplicarBeneficio(precioBase: number): number {
        return precioBase - (precioBase * this.porcentajeDescuento);
    }
    public getPorcentajeDescuento(): number
    { return this.porcentajeDescuento; }

    public setPorcentajeDescuento(porcentajeDescuento: number): void
     { this.porcentajeDescuento = porcentajeDescuento; }
}
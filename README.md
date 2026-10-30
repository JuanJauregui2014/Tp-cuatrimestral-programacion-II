# 🍽️ Gestión de Pedidos — Fogón del Barrio

Trabajo Práctico — Programación II  
CUVL · 2024

---

## Descripción

Sistema de gestión de pedidos para el restaurante "Fogón del Barrio". Permite registrar pedidos en tres modalidades (salón, retiro y envío propio), agregar y quitar productos o combos, distribuir los ítems entre las estaciones de cocina y facturar con distintos medios de pago.

---

## Integrantes

| Nombre | Rama |
|--------|------|
| Juan Ignacio Jauregui | rama-juan |
| Johan Nuñez | rama-johan |
| Luciano Crudele | rama-lucho |

---

## Tecnologías

- TypeScript
- Jest + ts-jest (pruebas unitarias)

---

## Estructura del proyecto

```
src/
├── categoria.ts
├── combo.ts
├── combo_beneficio.ts
├── combo_porcentual.ts
├── combo_preciofijo.ts
├── dia_semana.ts
├── efectivo.ts
├── elemento_menu.ts
├── estacion.ts
├── estado_item.ts
├── estado_pedido.ts
├── item.ts
├── medio_de_pago.ts
├── menu.ts
├── pedido.ts
├── pedido_envio_propio.ts
├── pedido_retirar.ts
├── pedido_salon.ts
├── producto.ts
├── restaurante.ts
├── tarjeta_de_credito.ts
├── tarjeta_de_debito.ts
└── billetera_virtual.ts

tests/
├── combo.test.ts
├── estacion.test.ts
├── item.test.ts
├── menu.test.ts
├── producto.test.ts
└── restaurante.test.ts

diagramas/
└── diagramas.puml
```

---

## Instalación

```bash
git clone <url-del-repositorio>
cd Trabajo-Practico-Programacion-II
npm install
```

---

## Compilación y ejecución

**Compilar el proyecto:**
```bash
npm run build
```

**Ejecutar en modo producción** (requiere build previo):
```bash
npm run start
```

---

## Pruebas unitarias

**Correr todos los tests:**
```bash
npm run test
```

> La cobertura de código apunta a superar el 80% en todos los archivos del proyecto.

---

## Requerimientos funcionales implementados

- [x] Registrar pedidos en las tres modalidades
- **[No implementado] Agregar y quitar ítems mientras el pedido está en construcción**
- **[No implementado] Deshacer la última modificación**
- [x] Confirmar pedido
- **[No implementado] Distribuir ítems a las estaciones de cocina**
- [x] Avanzar estado de cada ítem (pendiente → en preparación → listo)
- [x] Impedir modificar ítems en preparación
- [x] Impedir facturar pedidos con ítems sin terminar
- **[No implementado] Calcular precio total con combos y beneficios**
- **[No implementado] Aplicar descuentos por medio de pago o día especial**
- [x] Consultar historial de pedidos finalizados

---

## Patrones de diseño aplicados

### Strategy — Medios de pago y beneficios de combo

**Categoría:** Comportamiento

**Problema que resuelve:** tanto los medios de pago como los beneficios de los combos pueden variar de forma independiente. Sin el patrón, cada variación requeriría condicionales repetidos en `Pedido` y en `Combo`.

**Participantes:**
- Interfaz `MedioDePago` → estrategia de pago (`Efectivo`, `TarjetaDeCredito`, `TarjetaDeDebito`, `BilleteraVirtual`)
- Interfaz `ComboBeneficio` → estrategia de precio (`ComboPorcentual`, `ComboPrecioFijo`)

**Ventajas:** agregar un nuevo medio de pago o un nuevo tipo de beneficio no requiere tocar el código existente.

---

### *(Segundo patrón — completar con el equipo)*

---

## Diagrama de clases

El diagrama se encuentra en `diagramas/diagramas.puml` y puede visualizarse con la extensión PlantUML en VS Code o en [plantuml.com](https://plantuml.com).

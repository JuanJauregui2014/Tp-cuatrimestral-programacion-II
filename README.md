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
├── diagramas.puml
├── secuencia_agregar_item.puml
└── secuencia_facturar_pedido.puml
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
Strategy — Selección de estaciones para distribuir ítems
Categoría: Comportamiento. Es otra aplicación del mismo patrón Strategy, no un tercer tipo de patrón.

Problema que resuelve: los productos deben enviarse a una estación capaz de preparar su categoría. La lógica que distribuye el pedido no necesita decidir por sí misma qué estación elegir.

Participantes:
- EstrategiaSeleccion: interfaz con seleccionarEstacion(categoria, estaciones).
- PrimeraCompatible: estrategia concreta que devuelve la primera estación compatible.
- DistribuidorPedidos: recibe una EstrategiaSeleccion en el constructor y delega la elección mediante buscarEstacion().
- Estacion: determina si puede preparar una categoría y administra su cola FIFO.
- Restaurante: encuentra el pedido y delega su distribución.
Funcionamiento: DistribuidorPedidos recorre los ítems y, para los combos, crea preparaciones separadas por producto sin reemplazar el combo original del pedido. Primero verifica que cada preparación tenga una estación compatible; después registra las preparaciones, las asigna a las estaciones y confirma el pedido.

Justificación: se separa el criterio de selección del proceso de distribución. Actualmente solo existe PrimeraCompatible, porque satisface la necesidad del TP. La interfaz permite sustituirla por otro criterio en el futuro sin reescribir el distribuidor.

## Command — Modificaciones reversibles de pedidos
Categoría: Comportamiento.

**Problema que resuelve**: el requisito de deshacer la última modificación debe funcionar tanto si la operación fue agregar como si fue quitar un ítem. En vez de administrar historiales independientes por tipo de operación, se mantiene un único historial de comandos.

**Participantes**:
- Interfaz ComandoPedido: define las operaciones ejecutar() y deshacer().
- AgregarItemCommand: agrega un ítem y puede retirar esa agregación.
- QuitarItemCommand: elimina un ítem, guarda su posición original y puede restaurarlo allí.
- Pedido: ejecuta cada comando al modificar los ítems, lo guarda en historialComandos y utiliza deshacerUltimaModificacion() para revertir el último comando ejecutado.

**Funcionamiento**: al agregar o quitar un ítem, Pedido crea el comando correspondiente y lo ejecuta. Si la operación tuvo éxito, guarda el comando en su historial. Al solicitar deshacer, obtiene el último comando, invoca su método deshacer() y lo retira del historial. Solo se permite modificar o deshacer mientras el pedido está en construcción.

**Ventajas**: unifica el historial, conserva el orden de las modificaciones y encapsula en cada comando la lógica necesaria para revertir su propia operación. Además, Pedido no necesita distinguir el tipo del último comando para deshacerlo.
---

## Diagrama de clases y secuencia

El diagrama de clases se encuentra en `diagramas/diagramas.puml` y puede visualizarse con la extensión PlantUML en VS Code o en [plantuml.com](https://plantuml.com).

El diagrama de secuencia del agregado de un item al pedido se encuentra en `diagramas/secuencia_agregar_item.puml` y puede visualizarse con la extensión PlantUML en VS Code o en [plantuml.com](https://plantuml.com).

El diagrama de secuencia de la facturación de un pedido se encuentra en `diagramas/secuencia_facturar_pedido.puml` y puede visualizarse con la extensión PlantUML en VS Code o en [plantuml.com](https://plantuml.com).
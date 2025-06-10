document.addEventListener("DOMContentLoaded", function() {
    // Base de datos de ensayos y sus parámetros (simplificada)
    const ensayosDB = {
        suelos: [
            {
                id: "control",
                nombre: "Control de obra",
                parametros: [
                    { nombre: "Densidad in situ cono de arena", precio: 150 },
                    { nombre: "Contenido de humedad (speedy)", precio: 1500 },
                    { nombre: "Densimetro nuclear", precio: 400 },
                    { nombre: "Ensayo Dynamic Cone Penetrometer (DCP)", precio: 500 }
                ]
            },
            {
                id: "suelosviviendas",
                nombre: "EMS para Viviendas",
                parametros: [
                    { nombre: "Excavacion de calicatas (hasta 2 m)", precio: 150 },
                    { nombre: "Ensayos de laboratorio basicos", precio: 1500 },
                    { nombre: "Ensayo SPT (opcional)", precio: 400 },
                    { nombre: "Informe Técnico", precio: 500 }
                ]
            },
            {
                id: "suelosedificaciones",
                nombre: "EMS para Edificaciones",
                parametros: [
                    { nombre: "Excavación de calicatas (hasta 5 m)", precio: 232 },
                    { nombre: "Ensayos de laboratorio especiales", precio: 454 },
                    { nombre: "Ensayo SPT (necesario)", precio: 222 },
                    { nombre: "Informe Técnico detallado", precio: 240 },
                    { nombre: "Análisis de licuefacción", precio: 320 }
                ]
            }
        ],
        topografia: [
            {
                id: "levantamiento",
                nombre: "Levantamiento Topografico",
                parametros: [
                    { nombre: "Nave Industrial - Área (m²)", precio: 120 },
                    { nombre: "Estacionamiento - Área (m²)", precio: 150 },
                    { nombre: "Plaza / Jardin (m²)", precio: 150 },
                    { nombre: "Vias y carreteras (km)", precio: 150 },
                    { nombre: "Fotogrametria", precio: 150 },
                    { nombre: "Lotizacion", precio: 150 },
                    { nombre: "Lote baldio m2", precio: 80 }
                ]
            },
            {
                id: "replanteo",
                nombre: "Trazo y replanteo",
                parametros: [
                    { nombre: "Nave Industrial - Área (m²)", precio: 120 },
                    { nombre: "Estacionamiento - Área (m²)", precio: 150 },
                    { nombre: "Plaza / Jardin (m²)", precio: 150 },
                    { nombre: "Vias y carreteras (km)", precio: 150 },
                    { nombre: "Control de obra edificios", precio: 150 },
                    
                ]
            },
            {
                id: "geodesia",
                nombre: "Informe geodesico",
                parametros: [
                    { nombre: "Área (m²)", precio: 120 },
                    { nombre: "Monumentación (hito geodésico tipo mojón + placa)", precio: 150 },
                    { nombre: "Número de puntos", precio: 80 },
                    { nombre: "Informe tecnico", precio: 80 }
                ]
            }
        ],
        hidrologico: [
            {
                id: "hidrologia",
                nombre: "Informe Hidrologico",
                parametros: [
                    { nombre: "Revisión de información hidrometeorológica histórica (SENAMHI, ANA, etc.)", precio: 120 },
                    { nombre: "Visita técnica y reconocimiento de campo (verificación de cauces, drenajes naturales, puntos críticos)", precio: 150 },
                    { nombre: "Análisis de cuenca (delimitación, pendiente, área de escorrentía) con SIG", precio: 150 },
                    { nombre: "Cálculo de caudales de diseño (método racional, hidrogramas, etc.) para varios periodos de retorno", precio: 150 },
                    { nombre: "Evaluación de riesgo de inundación / flujo de avenidas", precio: 150 },
                    { nombre: "Informe hidrológico completo con mapas, tablas, anexos y conclusiones", precio: 150 }
                ]
            }
        ]
    };

    // Muestra los ensayos específicos
    window.mostrarEnsayosEspecificos = function() {
        const tipoGeneral = document.getElementById("tipo-general").value;
        const especificosContainer = document.getElementById("ensayos-especificos-container");
        const especificosSelect = document.getElementById("ensayos-especificos");
        const otrosFormContainer = document.getElementById("otros-form-container");
        const parametrosContainer = document.getElementById("parametros-container");
        
        especificosSelect.innerHTML = '<option value="0">Seleccione un ensayo</option>';
        
        if (tipoGeneral === "0") {
            especificosContainer.classList.add("hidden");
            otrosFormContainer.classList.add("hidden");
            parametrosContainer.classList.add("hidden");
            return;
        }
        
        if (tipoGeneral === "otros") {
            especificosContainer.classList.add("hidden");
            parametrosContainer.classList.add("hidden");
            otrosFormContainer.classList.remove("hidden");
            return;
        }
        
        especificosContainer.classList.remove("hidden");
        otrosFormContainer.classList.add("hidden");
        
        ensayosDB[tipoGeneral].forEach(ensayo => {
            const option = new Option(ensayo.nombre, ensayo.id);
            especificosSelect.add(option);
        });
    };

    // Muestra la tabla con precios
    window.mostrarTablaParametros = function() {
        const tipoGeneral = document.getElementById("tipo-general").value;
        const ensayoEspecifico = document.getElementById("ensayos-especificos").value;
        const tablaBody = document.querySelector("#tabla-parametros tbody");
        
        tablaBody.innerHTML = "";
        
        if (ensayoEspecifico === "0") {
            document.getElementById("parametros-container").classList.add("hidden");
            return;
        }
        
        const ensayo = ensayosDB[tipoGeneral].find(e => e.id === ensayoEspecifico);
        document.getElementById("titulo-ensayo").textContent = ensayo.nombre;
        
        // Llenar tabla
        ensayo.parametros.forEach(param => {
            const row = document.createElement("tr");
            
            const cellDesc = document.createElement("td");
            cellDesc.textContent = param.nombre;
            
            const cellPrecio = document.createElement("td");
            cellPrecio.textContent = param.precio.toFixed(2);
            
            const cellCantidad = document.createElement("td");
            const input = document.createElement("input");
            input.type = "number";
            input.min = "1";
            input.value = "1";
            input.className = "form-control";
            input.dataset.precio = param.precio;
            input.addEventListener("input", calcularTotales);
            cellCantidad.appendChild(input);
            
            const cellSubtotal = document.createElement("td");
            cellSubtotal.className = "subtotal";
            cellSubtotal.textContent = param.precio.toFixed(2);
            
            row.appendChild(cellDesc);
            row.appendChild(cellPrecio);
            row.appendChild(cellCantidad);
            row.appendChild(cellSubtotal);
            
            tablaBody.appendChild(row);
        });
        
        // Fila de TOTAL
        const totalRow = document.createElement("tr");
        totalRow.innerHTML = `
            <td colspan="3" style="text-align: right; font-weight: bold;">TOTAL (S/.)</td>
            <td id="total" style="font-weight: bold;">${calcularTotal().toFixed(2)}</td>
        `;
        tablaBody.appendChild(totalRow);
        
        document.getElementById("parametros-container").classList.remove("hidden");
    };

    // Calcula totales
    function calcularTotales() {
        const subtotals = document.querySelectorAll(".subtotal");
        let total = 0;
        
        subtotals.forEach((cell, index) => {
            const input = document.querySelectorAll(".form-control")[index];
            const precio = parseFloat(input.dataset.precio);
            const cantidad = parseInt(input.value) || 0;
            const subtotal = precio * cantidad;
            
            cell.textContent = subtotal.toFixed(2);
            total += subtotal;
        });
        
        document.getElementById("total").textContent = total.toFixed(2);
    }

    function calcularTotal() {
        return ensayosDB[document.getElementById("tipo-general").value]
            ?.find(e => e.id === document.getElementById("ensayos-especificos").value)
            ?.parametros.reduce((sum, param) => sum + param.precio, 0) || 0;
    }

    // Botones
    window.enviarCotizacion = function() {
        const tipoGeneral = document.getElementById("tipo-general").value;
        
        if (tipoGeneral === "otros") {
            // Validar campos requeridos
            const email = document.getElementById("email").value;
            const nombre = document.getElementById("nombre").value;
            const trabajo = document.getElementById("trabajo").value;
            
            if (!email || !nombre || !trabajo) {
                alert("Por favor complete todos los campos requeridos (*)");
                return;
            }
            
            const datosCliente = {
                email: email,
                telefono: document.getElementById("telefono").value,
                nombre: nombre,
                empresa: document.getElementById("empresa").value,
                trabajo: trabajo
            };
            
            alert(`Solicitud de cotización enviada. Nos contactaremos con usted pronto.\n\nDetalles:\nNombre: ${datosCliente.nombre}\nEmail: ${datosCliente.email}\nTrabajo: ${datosCliente.trabajo}`);
        } else {
            const total = document.getElementById("total")?.textContent || "0.00";
            alert(`Cotización enviada. Total: S/.${total}`);
        }
    };

    window.resetForm = function() {
        document.getElementById("forma_datos").reset();
        document.getElementById("ensayos-especificos-container").classList.add("hidden");
        document.getElementById("parametros-container").classList.add("hidden");
        document.getElementById("otros-form-container").classList.add("hidden");
    };
});
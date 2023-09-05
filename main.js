 //Tercera Entrega - Alan Guastavino


 const modelosMonitores = {
  Asus: ["Monitor Gamer Pro", "Monitor Gaming Master"],
  Acer: ["Monitor Nitro", "Monitor Predator"],
  LG: ["Monitor UltraGear", "Monitor Gaming Pro"]
};


function calcularCostoMonitor(marca, modelo, tipoPanel, pulgadas, frecuencia) {
  const modelosMonitores = [
    { marca: "Asus", modelo: "Monitor Gamer Pro", tipoPanel: "IPS", pulgadas: "24", frecuencia: { "60Hz": 97899, "144Hz": 322650 } },
    { marca: "Asus", modelo: "Monitor Gamer Pro", tipoPanel: "IPS", pulgadas: "27", frecuencia: { "60Hz": 96500, "144Hz": 350800 } },
    { marca: "Asus", modelo: "Monitor Gaming Master", tipoPanel: "VA", pulgadas: "27", frecuencia: { "60Hz": 82500, "144Hz": 235690 } },
    { marca: "Acer", modelo: "Monitor Nitro", tipoPanel: "TN", pulgadas: "24", frecuencia: { "60Hz": 79999 } },
    { marca: "Acer", modelo: "Monitor Nitro", tipoPanel: "TN", pulgadas: "27", frecuencia: { "60Hz": 98799 } },
    { marca: "Acer", modelo: "Monitor Predator", tipoPanel: "IPS", pulgadas: "27", frecuencia: { "60Hz": 85999, "144Hz": 184999 } },
    { marca: "LG", modelo: "Monitor UltraGear", tipoPanel: "IPS", pulgadas: "27", frecuencia: { "60Hz": 114999, "144Hz": 309999 } },
    { marca: "LG", modelo: "Monitor Gaming Pro", tipoPanel: "VA", pulgadas: "24", frecuencia: { "60Hz": 92635, "144Hz": 209999 } },
    { marca: "LG", modelo: "Monitor Gaming Pro", tipoPanel: "VA", pulgadas: "27", frecuencia: { "60Hz": 91599, "144Hz": 224999 } },
  ];
  
  localStorage.setItem ("Monitores", JSON.stringify(modelosMonitores));

  const monitor = modelosMonitores.find(item => 
    item.marca === marca && 
    item.modelo === modelo && 
    item.tipoPanel === tipoPanel && 
    item.pulgadas === pulgadas && 
    frecuencia in item.frecuencia
  );

  if (monitor) {
    return monitor.frecuencia[frecuencia];
  } else {
    return 0;
  }
}

window.onload = function() {
  const marcaSelect = document.getElementById('marca');
  const modeloSelect = document.getElementById('modelo');
  const tipoPanelSelect = document.getElementById('tipoPanel');
  const pulgadasSelect = document.getElementById('pulgadas');
  const frecuenciaSelect = document.getElementById('frecuencia');
  const calcularButton = document.getElementById('calcular');
  const detallesCompraDiv = document.getElementById('detalles-compra');
  const resultadoDiv = document.getElementById('resultado');

  marcaSelect.addEventListener('change', function() {
    modeloSelect.innerHTML = '';
    const modelos = modelosMonitores[marcaSelect.value];
    modelos.forEach(modelo => {
      const option = document.createElement('option');
      option.value = modelo;
      option.textContent = modelo;
      modeloSelect.appendChild(option);
    });
  });

  calcularButton.addEventListener('click', function() {
    const marca = marcaSelect.value;
    const modelo = modeloSelect.value;
    const tipoPanel = tipoPanelSelect.value;
    const pulgadas = pulgadasSelect.value;
    const frecuencia = frecuenciaSelect.value;

    const costo = calcularCostoMonitor(marca, modelo, tipoPanel, pulgadas, frecuencia);

    if (costo > 0) {
      const detallesMonitor = {
        marca: marca,
        modelo: modelo,
        tipoPanel: tipoPanel,
        pulgadas: pulgadas,
        frecuencia: frecuencia,
        costo: costo
      };

      localStorage.setItem('detallesMonitor', JSON.stringify(detallesMonitor));

      detallesCompraDiv.innerHTML = `
        <h2>Detalles de la Compra</h2>
        <p>Marca: ${marca}</p>
        <p>Modelo: ${modelo}</p>
        <p>Tipo de Panel: ${tipoPanel}</p>
        <p>Pulgadas: ${pulgadas} pulgadas</p>
        <p>Frecuencia: ${frecuencia}</p>
        <p>Costo: $${costo}</p>
        <button id="comprar">COMPRAR</button>
      `;

      const comprarButton = document.getElementById('comprar');
      comprarButton.addEventListener('click', function() {
        resultadoDiv.innerHTML = `
          <p>¡Compra realizada con éxito!</p>
        `;
      });
    } else {
      detallesCompraDiv.innerHTML = `
        <p>El monitor seleccionado no se encuentra disponible en nuestras opciones.</p>
      `;
      resultadoDiv.innerHTML = '';
    }
  });
};

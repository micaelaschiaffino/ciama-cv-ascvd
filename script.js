// script.js - Calculadora ASCVD en español (simplificación)
document.getElementById('formulario').addEventListener('submit', function(e) {
  e.preventDefault();

  // Captura de inputs
  const edad = parseInt(document.getElementById('edad').value);
  const sexo = document.getElementById('sexo').value;
  const raza = document.getElementById('raza').value;
  const tc = parseFloat(document.getElementById('colesterolTotal').value);
  const hdl = parseFloat(document.getElementById('hdl').value);
  const ps = parseFloat(document.getElementById('presionSistolica').value);
  const tratPS = document.getElementById('tratamientoPresion').value === 'si';
  const diabetes = document.getElementById('diabetes').value === 'si';
  const fumador = document.getElementById('fumador').value === 'si';

  // Validación básica
  if (edad < 40 || edad > 79) {
    alert('La guía ASCVD está validada para edades entre 40 y 79 años.');
    return;
  }

  // Incorporá aquí el cálculo matemático real del score ASCVD según tablas oficiales.
  // Para avanzar, adapto un ejemplo simplificado (a reemplazar por fórmula exacta)
  let riesgo =
    0.02 * edad +
    (sexo === 'masculino' ? 1.2 : 1.0) +
    (raza === 'afroamericano' ? 1.1 : 1.0) +
    (tc / 200) +
    (hdl < 40 ? 0.5 : 0) +
    (ps / 120) +
    (tratPS ? 0.5 : 0) +
    (diabetes ? 0.8 : 0) +
    (fumador ? 0.7 : 0);

  riesgo = Math.min(100, Math.max(0, riesgo));  
  const riesgoDec = riesgo.toFixed(1);

  // Riesgo vitalicio (ejemplo, sustituir por fórmula real)
  const vitalicio = Math.min(100, (riesgo * 2) + (edad < 60 ? 5 : 10));
  const vitalicioDec = vitalicio.toFixed(1);

  // Color y texto según nivel
  let color, label;
  if (riesgo >= 20) {
    color = '#E74C3C';
    label = 'Riesgo alto';
  } else if (riesgo >= 7.5) {
    color = '#E67E22';
    label = 'Riesgo moderado-alto';
  } else if (riesgo >= 5) {
    color = '#F1C40F';
    label = 'Riesgo moderado';
  } else {
    color = '#2ECC71';
    label = 'Riesgo bajo';
  }

  // Muestra de resultado
  const divRes = document.getElementById('resultado');
  divRes.style.backgroundColor = color;
  divRes.innerHTML = `
    <p><strong>${label}</strong> a 10 años: ${riesgoDec}%</p>
    <p>Riesgo vitalicio estimado: ${vitalicioDec}%</p>
  `;

  // Recomendaciones
  const divRec = document.getElementById('recomendaciones');
  divRec.innerHTML = `
    <h2>Recomendaciones</h2>
    <ul>
      <li>Consulta con un/a especialista.</li>
      <li>Control regular de presión, lípidos y peso.</li>
      <li>Evaluar la conveniencia de medicación preventiva.</li>
      <li>Adoptar y mantener hábitos de vida saludables.</li>
    </ul>
    <p class="aclaracion">
      *Esta herramienta es informativa y no reemplaza una evaluación médica personalizada.
    </p>
  `;
});

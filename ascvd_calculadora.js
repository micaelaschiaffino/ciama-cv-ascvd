
// ascvd_calculadora.js
function calculateASCVD() {
  const age = parseInt(document.getElementById("age").value);
  const sex = document.getElementById("sex").value;
  const race = document.getElementById("race").value;
  const tc = parseFloat(document.getElementById("tc").value);
  const hdl = parseFloat(document.getElementById("hdl").value);
  const sbp = parseFloat(document.getElementById("sbp").value);
  const htn = parseInt(document.getElementById("htn").value);
  const diabetes = parseInt(document.getElementById("diabetes").value);
  const smoker = parseInt(document.getElementById("smoker").value);

  if (isNaN(age) || isNaN(tc) || isNaN(hdl) || isNaN(sbp)) {
    alert("Por favor, completá todos los campos numéricos correctamente.");
    return;
  }

  // Fórmulas básicas simuladas (reemplazar por coeficientes reales)
  let score = 0.0;
  if (sex === "female") {
    score = (0.02 * age) + (0.03 * tc) - (0.02 * hdl) + (0.01 * sbp);
    if (htn) score += 2;
    if (diabetes) score += 3;
    if (smoker) score += 2.5;
  } else {
    score = (0.03 * age) + (0.02 * tc) - (0.015 * hdl) + (0.015 * sbp);
    if (htn) score += 2.5;
    if (diabetes) score += 3.5;
    if (smoker) score += 3;
  }

  // Simulación de cálculo de riesgo final con capeo
  let risk10 = Math.min(30, Math.max(0, score / 10)).toFixed(1);
  let lifetimeRisk = Math.min(80, (risk10 * 3)).toFixed(1);
  let resultText = "";

  if (risk10 < 5) {
    resultText = `🟢 Riesgo bajo a 10 años: ${risk10}% | Riesgo vitalicio estimado: ${lifetimeRisk}%`;
    document.getElementById("result").style.backgroundColor = "#d4edda";
    document.getElementById("result").style.color = "#155724";
  } else if (risk10 < 7.5) {
    resultText = `🟡 Riesgo límite a 10 años: ${risk10}% | Riesgo vitalicio estimado: ${lifetimeRisk}%`;
    document.getElementById("result").style.backgroundColor = "#fff3cd";
    document.getElementById("result").style.color = "#856404";
  } else {
    resultText = `🔴 Riesgo elevado a 10 años: ${risk10}% | Riesgo vitalicio estimado: ${lifetimeRisk}%`;
    document.getElementById("result").style.backgroundColor = "#f8d7da";
    document.getElementById("result").style.color = "#721c24";
  }

  document.getElementById("result").innerText = resultText;

  // Recomendaciones simples (simuladas)
  let recomendaciones = `
    <h2>Recomendaciones</h2>
    <ul>
      <li>Consulta con especialista.</li>
      <li>Control de presión arterial, lípidos y peso.</li>
      <li>Evaluar medicación preventiva.</li>
      <li>Mejorar hábitos de vida.</li>
    </ul>`;
  document.getElementById("recomendaciones").innerHTML = recomendaciones;
}

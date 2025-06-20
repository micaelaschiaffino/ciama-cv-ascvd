
function calculateASCVD() {
  const age = parseInt(document.getElementById('age').value);
  const sex = document.getElementById('sex').value;
  const race = document.getElementById('race').value;
  const tc = parseFloat(document.getElementById('tc').value);
  const hdl = parseFloat(document.getElementById('hdl').value);
  const sbp = parseFloat(document.getElementById('sbp').value);
  const htn = parseInt(document.getElementById('htn').value);
  const diabetes = parseInt(document.getElementById('diabetes').value);
  const smoker = parseInt(document.getElementById('smoker').value);

  let risk = (0.1 * age) + (sex === 'male' ? 2 : 1) + (race === 'black' ? 1.5 : 1)
             + (tc - hdl) / 50 + (sbp - 120) / 20 + (htn * 2) + (diabetes * 2.5) + (smoker * 2);

  risk = Math.max(0, Math.min(100, risk));  // Limita el valor entre 0 y 100

  const lifetimeRisk = Math.min(100, risk + 15);  // Simulación

  const resultDiv = document.getElementById('result');
  let color = risk >= 20 ? 'red' : (risk >= 7.5 ? 'orange' : (risk >= 5 ? 'yellow' : 'green'));
  let label = risk >= 20 ? 'Riesgo alto' : (risk >= 7.5 ? 'Riesgo moderado-alto' : (risk >= 5 ? 'Riesgo moderado' : 'Riesgo bajo'));

  resultDiv.style.backgroundColor = color;
  resultDiv.innerHTML = `<p>${label} a 10 años: ${risk.toFixed(1)}% | Riesgo vitalicio estimado: ${lifetimeRisk.toFixed(1)}%</p>`;

  const recomendacionesDiv = document.getElementById('recomendaciones');
  recomendacionesDiv.innerHTML = `
    <h2>Recomendaciones</h2>
    <ul>
      <li>Consulta con especialista.</li>
      <li>Control de presión, lípidos y peso.</li>
      <li>Evaluar medicación preventiva.</li>
      <li>Mejorar hábitos de vida.</li>
    </ul>`;
}

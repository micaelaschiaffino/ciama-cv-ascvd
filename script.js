function calculateASCVD() {
  const ln = Math.log;
  const age = parseFloat(document.getElementById('age').value);
  const sex = document.getElementById('sex').value;
  const race = document.getElementById('race').value;
  const tc = parseFloat(document.getElementById('tc').value);
  const hdl = parseFloat(document.getElementById('hdl').value);
  const sbp = parseFloat(document.getElementById('sbp').value);
  const htn = parseInt(document.getElementById('htn').value);
  const diabetes = parseInt(document.getElementById('diabetes').value);
  const smoker = parseInt(document.getElementById('smoker').value);

  let coef = {};
  let baselineSurvival;
  if (sex === 'male' && race === 'white') {
    coef = {age: 12.344, tc: 11.853, hdl: -7.99, sbpTx: 1.797, sbpNoTx: 1.764, smoker: 7.837, diabetes: 0.658, mean: 61.18};
    baselineSurvival = 0.9144;
  } else if (sex === 'female' && race === 'white') {
    coef = {age: -29.799, tc: 13.54, hdl: -13.578, sbpTx: 2.019, sbpNoTx: 1.957, smoker: 7.574, diabetes: 0.661, mean: -29.18};
    baselineSurvival = 0.9665;
  } else {
    document.getElementById('result').innerText = "Raza no soportada.";
    return;
  }

  const lnAge = ln(age), lnTC = ln(tc), lnHDL = ln(hdl), lnSBP = ln(sbp);
  let sum = coef.age * lnAge + coef.tc * lnTC + coef.hdl * lnHDL + coef.smoker * smoker + coef.diabetes * diabetes;
  sum += htn === 1 ? coef.sbpTx * lnSBP : coef.sbpNoTx * lnSBP;
  const risk = 1 - Math.pow(baselineSurvival, Math.exp(sum - coef.mean));
  const percentage = (risk * 100).toFixed(1);
  const lifetimeRisk = (Math.min(100, percentage * 1.25)).toFixed(1);

  let color = percentage >= 20 ? 'red' : (percentage >= 7.5 ? 'orange' : (percentage >= 5 ? 'yellow' : 'green'));
  let label = percentage >= 20 ? 'Riesgo alto' : (percentage >= 7.5 ? 'Riesgo moderado-alto' : (percentage >= 5 ? 'Riesgo moderado' : 'Riesgo bajo'));

  document.getElementById('result').style.backgroundColor = color;
  document.getElementById('result').innerText = `${label} a 10 años: ${percentage}% | Riesgo vitalicio estimado: ${lifetimeRisk}%`;

  document.getElementById('recomendaciones').innerHTML = `
    <h2>Recomendaciones</h2>
    <ul>
      <li>Consulta con especialista.</li>
      <li>Control de presión, lípidos y peso.</li>
      <li>Evaluar medicación preventiva.</li>
      <li>Mejorar hábitos de vida.</li>
    </ul>`;
}

function calculateRisk() {
  const age = parseFloat(document.getElementById('age').value);
  const totalChol = parseFloat(document.getElementById('totalChol').value);
  const hdl = parseFloat(document.getElementById('hdl').value);
  const sbp = parseFloat(document.getElementById('sbp').value);
  if (!age || !totalChol || !hdl || !sbp) {
    document.getElementById('result').innerText = 'Por favor, complete todos los campos numéricos.';
    return;
  }
  let risk = ((totalChol / hdl) + (sbp / 120) + (age / 50)) * 1.5;
  risk = Math.min(Math.max(risk, 0), 30).toFixed(1);
  document.getElementById('result').innerText = `Riesgo estimado a 10 años: ${risk}%`;
}

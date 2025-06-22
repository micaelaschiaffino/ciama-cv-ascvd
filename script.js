
function calculate() {
  const gender = document.getElementById("gender").value;
  if (gender !== "female") {
    document.getElementById("result").innerHTML = "Este demo está diseñado para mujeres.";
    document.getElementById("recommendations").innerHTML = "";
    return;
  }

  const age = parseInt(document.getElementById("age").value);
  const race = document.getElementById("race").value;
  const tc = parseFloat(document.getElementById("tc").value);
  const hdl = parseFloat(document.getElementById("hdl").value);
  const sbp = parseFloat(document.getElementById("sbp").value);
  const treatment = document.getElementById("treatment").value === "yes";
  const diabetes = document.getElementById("diabetes").value === "yes";
  const smoker = document.getElementById("smoker").value === "yes";

  let lnAge = Math.log(age);
  let lnTC = Math.log(tc);
  let lnHDL = Math.log(hdl);
  let lnSBP = Math.log(sbp);

  let coef = {
    age: -29.799,
    tc: 13.540,
    hdl: -13.578,
    sbp: treatment ? 2.822 : 2.761,
    smoker: 7.574,
    diabetes: 0.661,
    mean: -29.18,
    baseline: 0.9665
  };

  let riskScore = (coef.age * lnAge) + (coef.tc * lnTC) + (coef.hdl * lnHDL) + (coef.sbp * lnSBP);
  if (smoker) riskScore += coef.smoker;
  if (diabetes) riskScore += coef.diabetes;

  let risk = 1 - Math.pow(coef.baseline, Math.exp(riskScore - coef.mean));
  risk = (risk * 100).toFixed(1);

  let resultBox = document.getElementById("result");
  resultBox.style.backgroundColor = risk < 5 ? "#a3e4a3" : risk < 7.5 ? "#fdfd96" : "#f4cccc";
  resultBox.innerHTML = `Riesgo estimado a 10 años: ${risk}%`;

  document.getElementById("recommendations").innerHTML = `
    <ul>
      <li>Consulta con un/a especialista.</li>
      <li>Control regular de presión, lípidos y peso.</li>
      <li>Evaluar la conveniencia de medicación preventiva.</li>
      <li>Adoptar y mantener hábitos de vida saludables.</li>
    </ul>
    <p><em>Esta herramienta es informativa y no reemplaza una evaluación médica personalizada.</em></p>
  `;
}

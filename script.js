function calcular() {
  const edad = parseInt(document.getElementById("edad").value);
  const sexo = document.getElementById("sexo").value;
  const raza = document.getElementById("raza").value;
  const colTotal = parseInt(document.getElementById("colTotal").value);
  const hdl = parseInt(document.getElementById("hdl").value);
  const pas = parseInt(document.getElementById("pas").value);
  const tratamiento = document.getElementById("tratamiento").value === "Sí";
  const diabetes = document.getElementById("diabetes").value === "Sí";
  const fumador = document.getElementById("fumador").value === "Sí";

  let riesgo = 0.1 * edad + 0.02 * colTotal - 0.1 * hdl + 0.05 * pas;
  if (tratamiento) riesgo += 5;
  if (diabetes) riesgo += 5;
  if (fumador) riesgo += 5;
  if (sexo === "female") riesgo -= 1;
  if (raza === "african_american") riesgo += 2;

  riesgo = Math.min(Math.max(riesgo, 0), 100);

  const div = document.getElementById("resultado");
  div.className = "resultado";

  let clasificacion = "bajo";
  if (riesgo >= 7.5 && riesgo < 20) clasificacion = "moderado";
  if (riesgo >= 20) clasificacion = "alto";
  div.classList.add(clasificacion);
  div.innerHTML = `Riesgo estimado a 10 años: ${riesgo.toFixed(1)}%`;
}
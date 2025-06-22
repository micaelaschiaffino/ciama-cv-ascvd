
function calculateRisk() {
    const age = parseFloat(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const race = document.getElementById("race").value;
    const totalChol = parseFloat(document.getElementById("chol").value);
    const hdl = parseFloat(document.getElementById("hdl").value);
    const systolic = parseFloat(document.getElementById("systolic").value);
    const bpTreatment = document.getElementById("bpTreatment").value === "treated";
    const smoker = document.getElementById("smoker").value === "yes";
    const diabetic = document.getElementById("diabetic").value === "yes";

    if (!(age && totalChol && hdl && systolic)) {
        alert("Por favor complete todos los campos numéricos.");
        return;
    }

    const lnAge = Math.log(age);
    const lnTotalChol = Math.log(totalChol);
    const lnHDL = Math.log(hdl);
    const lnSystolic = Math.log(systolic);

    let S10, mean, coefs;

    if (gender === "female" && race === "white") {
        S10 = 0.9665;
        mean = -29.18;
        coefs = [ -29.799, 4.884, -13.54, -3.114, 2.019, 0.0, 7.574, 0.661 ];
    } else if (gender === "male" && race === "white") {
        S10 = 0.9144;
        mean = 61.18;
        coefs = [ 12.344, 11.853, -7.99, -2.664, 1.769, 0.0, 7.837, 0.658 ];
    } else {
        S10 = 0.8954;
        mean = 19.54;
        coefs = [ 17.114, 0.94, -18.92, -0.06, 4.48, 0.0, 29.291, 0.691 ];
    }

    const treated = bpTreatment ? 1 : 0;
    const riskScore =
        coefs[0] * lnAge +
        coefs[1] * lnTotalChol +
        coefs[2] * lnHDL +
        coefs[3] * lnSystolic * treated +
        coefs[4] * lnSystolic * (1 - treated) +
        coefs[6] * smoker +
        coefs[7] * diabetic;

    const risk = 1 - Math.pow(S10, Math.exp(riskScore - mean));
    const percent = Math.round(risk * 1000) / 10;

    let resultColor = "lightgreen";
    if (percent >= 20) {
        resultColor = "lightcoral";
    } else if (percent >= 7.5) {
        resultColor = "gold";
    }

    const result = document.getElementById("result");
    result.innerHTML = `Riesgo estimado a 10 años: ${percent.toFixed(1)}%`;
    result.style.backgroundColor = resultColor;

    document.getElementById("recommendations").style.display = "block";
}

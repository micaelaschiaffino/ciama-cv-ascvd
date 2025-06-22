
function calculateRisk() {
    const age = parseFloat(document.getElementById("age").value);
    const tc = parseFloat(document.getElementById("tc").value);
    const hdl = parseFloat(document.getElementById("hdl").value);
    const sbp = parseFloat(document.getElementById("sbp").value);
    const treatment = document.getElementById("treatment").value === "true";
    const smoker = document.getElementById("smoker").value === "true";
    const diabetic = document.getElementById("diabetic").value === "true";
    const sex = document.getElementById("sex").value;
    const race = document.getElementById("race").value;

    if (age < 40 || age > 79) {
        document.getElementById("result").innerText = "La edad debe estar entre 40 y 79 años.";
        return;
    }

    let lnAge = Math.log(age);
    let lnTC = Math.log(tc);
    let lnHDL = Math.log(hdl);
    let lnSBP = Math.log(sbp);

    // Coeficientes de ejemplo para mujer blanca (se deben ajustar según tabla oficial)
    let coef = {
        ln_age: -29.799,
        ln_tc: 13.540,
        ln_hdl: -13.578,
        ln_sbp: treatment ? 2.882 : 1.998,
        smoker: 7.574,
        diabetic: 0.661,
        mean: -29.18,
        baseline_survival: 0.9665
    };

    if (sex === "male") {
        coef = {
            ln_age: 12.344,
            ln_tc: 11.853,
            ln_hdl: -7.99,
            ln_sbp: treatment ? 1.797 : 1.764,
            smoker: 7.837,
            diabetic: 0.658,
            mean: 61.18,
            baseline_survival: 0.9144
        };
    }

    let sum = coef.ln_age * lnAge +
              coef.ln_tc * lnTC +
              coef.ln_hdl * lnHDL +
              coef.ln_sbp * lnSBP +
              coef.smoker * (smoker ? 1 : 0) +
              coef.diabetic * (diabetic ? 1 : 0);

    let risk = 1 - Math.pow(coef.baseline_survival, Math.exp(sum - coef.mean));
    risk = (risk * 100).toFixed(1);

    document.getElementById("result").innerHTML = "Riesgo estimado a 10 años: <strong>" + risk + "%</strong>";
}

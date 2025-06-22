
document.getElementById("risk-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const race = document.getElementById("race").value;
    const totalChol = parseFloat(document.getElementById("total-cholesterol").value);
    const hdl = parseFloat(document.getElementById("hdl").value);
    const systolic = parseFloat(document.getElementById("systolic").value);
    const bpTreatment = document.getElementById("bp-treatment").value === "yes";
    const diabetes = document.getElementById("diabetes").value === "yes";
    const smoker = document.getElementById("smoker").value === "yes";

    if (gender === "male") {
        document.getElementById("result").textContent = "Este demo está realizado solo para mujeres.";
        document.getElementById("recommendations").style.display = "none";
        return;
    }

    const lnAge = Math.log(age);
    const lnTotalChol = Math.log(totalChol);
    const lnHDL = Math.log(hdl);
    const lnSystolic = Math.log(systolic);

    let s = 0.95012;
    let baselineSurvival = 0.9665;

    const coeffs = {
        age: -29.799,
        ln_total_chol: 13.540,
        ln_hdl: -13.578,
        ln_age_ln_total_chol: -3.114,
        ln_age_ln_hdl: 3.149,
        treated_sbp: 2.019,
        untreated_sbp: 1.957,
        smoker: 7.574,
        diabetes: 0.661
    };

    let score = (coeffs.age * lnAge) +
                (coeffs.ln_total_chol * lnTotalChol) +
                (coeffs.ln_hdl * lnHDL) +
                (coeffs.ln_age_ln_total_chol * lnAge * lnTotalChol) +
                (coeffs.ln_age_ln_hdl * lnAge * lnHDL) +
                (bpTreatment ? coeffs.treated_sbp : coeffs.untreated_sbp) * lnSystolic +
                (smoker ? coeffs.smoker : 0) +
                (diabetes ? coeffs.diabetes : 0);

    const risk = 1 - Math.pow(baselineSurvival, Math.exp(score - s));
    const riskPercent = (risk * 100).toFixed(1);

    document.getElementById("result").textContent = "Riesgo estimado a 10 años: " + riskPercent + "%";
    document.getElementById("recommendations").style.display = "block";
});

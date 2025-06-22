function log(x) {
    return Math.log(x);
}

function calculateRisk() {
    const age = parseFloat(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const race = document.getElementById("race").value;
    const tc = parseFloat(document.getElementById("tc").value);
    const hdl = parseFloat(document.getElementById("hdl").value);
    const sbp = parseFloat(document.getElementById("sbp").value);
    const bp_treated = document.getElementById("bp_treated").value === "true";
    const smoker = document.getElementById("smoker").value === "true";
    const diabetes = document.getElementById("diabetes").value === "true";

    if (!age || !tc || !hdl || !sbp) {
        document.getElementById("result").innerText = "Por favor complete todos los campos.";
        return;
    }

    const ln_age = log(age);
    const ln_tc = log(tc);
    const ln_hdl = log(hdl);
    const ln_sbp = log(sbp);

    let coeff = {};
    let mean = 0, baseline = 0;

    if (gender === "female" && race === "white") {
        coeff = {
            age: -29.799,
            tc: 13.540,
            age_tc: -3.114,
            hdl: -13.578,
            age_hdl: 3.149,
            treated: 2.019,
            untreated: 1.957,
            smoker: 7.574,
            age_smoker: -1.665,
            diabetes: 0.661
        };
        mean = -29.18;
        baseline = 0.9665;
    } else {
        document.getElementById("result").innerText = "Esta demo solo calcula para mujeres blancas.";
        return;
    }

    const sum =
        coeff.age * ln_age +
        coeff.tc * ln_tc +
        coeff.age_tc * ln_age * ln_tc +
        coeff.hdl * ln_hdl +
        coeff.age_hdl * ln_age * ln_hdl +
        (bp_treated ? coeff.treated : coeff.untreated) * ln_sbp +
        coeff.smoker * (smoker ? 1 : 0) +
        coeff.age_smoker * ln_age * (smoker ? 1 : 0) +
        coeff.diabetes * (diabetes ? 1 : 0);

    const risk = 1 - Math.pow(baseline, Math.exp(sum - mean));
    const resultText = "Riesgo estimado a 10 años: " + (risk * 100).toFixed(1) + "%";
    document.getElementById("result").innerText = resultText;
}

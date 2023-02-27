const selects = document.querySelectorAll("select"),
    from = document.querySelector("#from"),
    to = document.querySelector("#to"),
    convertBtn = document.querySelector("#convert"),
    switchBtn = document.querySelector("#switch");

selects.forEach((select, index) => {
    for (i in countries) {
        let selected;
        if (index === 0) {
            selected = countries[i]["name"] == "Jordan" ? "selected" : ""
        }
        if (index === 1) {
            selected = countries[i]["name"] == "United States" ? "selected" : ""
        }
        let option = `<option value=${countries[i]["currency"]} ${selected}>${countries[i]["name"]}</option>`
        select.insertAdjacentHTML("beforeend", option);
    }
});

let inputField = document.querySelector("#amount"),
    output = document.querySelector(".output");

function getCurrency() {
    selectedFrom = from.value;
    selectedTO = to.value;
    if (inputField.value === "" || inputField.value === "0") {
        inputField.value = 1;
    }
    output.textContent = `wait...`
    fetch(`https://v6.exchangerate-api.com/v6/b290c80d8815edab18cbe6e3/latest/${selectedFrom}`).then(
        (result) => {
            return result.json();
        }).then((res) => {
            let result = res.conversion_rates
            output.textContent = `${inputField.value} ${selectedFrom} = ${(parseFloat(inputField.value) * result[selectedTO]).toFixed(2)} ${selectedTO}`
        });


}
window.addEventListener("load", () => {
    getCurrency()
})
switchBtn.addEventListener("click", () => {
    let selectedTemp = from.value;
    from.value = to.value;
    to.value = selectedTemp;
    getCurrency()
})

convertBtn.addEventListener("click", () => {
    getCurrency()
});


classes = {
    "safe": ".trust0, .trust-1",
    "online": ".score-1",
    "frontend": ".frontendFalse",
    "domainonly": ".nodomainTrue"
}

function createStyle(option) {
    const style = document.createElement("style");
    style.id = option + "style";
    document.querySelector("#optionstuff").appendChild(style);
    return document.querySelector(`#${option}style`);
}

function handleOption(option, checked, classestohide) {
    let optionstyle;
    optionstyle = document.querySelector(`#${option}style`);
    if (!optionstyle) {
        optionstyle = createStyle(option);
    }

    if (checked) {
        optionstyle.innerText = `${classestohide} { display: none; }`;
    } else {
        optionstyle.innerText = "";
    }
}

function updateOption(option) {
    const checkbox = document.getElementById(option);
    handleOption(option, checkbox.checked, classes[option])
}

document.querySelectorAll("#settings > * label").forEach((label) => {
    const setting = label.getAttribute("for");
    const checkbox = document.getElementById(setting);

    updateOption(setting);
    checkbox.addEventListener("change", function() {
        updateOption(this.id)
    })
})
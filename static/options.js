classes = {
    "safe": ".trust0, .trust-1",
    "online": ".score-1",
    "frontend": ".frontendFalse",
    "domainonly": ".nodomainTrue",
    "search": ".search"
}

instances = document.querySelectorAll(`*[data-is-instance]`)
checkboxes = document.querySelectorAll('#settings > * input[type="checkbox"]')
search = document.querySelector('#search')

checkboxes.forEach((input) => {
    handleOption(input.id, input.checked, classes[input.id])

    input.addEventListener("change", function() {
        handleOption(input.id, input.checked, classes[input.id])
    })
})

handleSearch(search.id, search.value)

search.addEventListener("input", function() {
    handleSearch(search.id, search.value)
})

// Styling functions

function handleOption(option, active, classestohide) {
    console.log("3. handleoption - option: " + option + " - active: " + active + " - classestohide: " + classestohide)

    let optionstyle;
    optionstyle = document.querySelector(`#${option}style`);

    if (!optionstyle) {
        optionstyle = createStyle(option);
    }

    if (active) {
        optionstyle.innerText = `${classestohide} { display: none; }`;
    } else {
        optionstyle.innerText = "";
    }
}

function handleSearch(option, active) {
    console.log("3. handleoption_search - option: " + option + " - active: " + active)

    if (active) {
        instances.forEach((instance) => {
            if (instance.dataset.api.includes(active) || instance.dataset.frontend.includes(active)) {
                console.log(instance)
                instance.classList.add("show")
                instance.classList.remove("hide")
            } else {
                instance.classList.add("hide")
                instance.classList.remove("show")

            }
        })
    } else {
        instances.forEach((instance) => {
            instance.classList.add("show")
            instance.classList.remove("hide")
        })
    }
}

function createStyle(option) {
    console.log("4. createstyle - option: " + option)

    const style = document.createElement("style");
    style.id = option + "style";
    document.querySelector("#optionstuff").appendChild(style);
    return document.querySelector(`#${option}style`);
}
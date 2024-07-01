const d = document;


function contactFormValidations() {
    const $form = d.querySelector(".contact-form"),
        $input = d.querySelectorAll(".contact-form [required]");

    console.log($input);

    $input.forEach((input) => {
        const $span = d.createElement("span");
        $span.id = input.name;
        $span.textContent = input.title;
        $span.classList.add("contact-form-error", "none");
        input.insertAdjacentElement("afterend", $span);
    });

    d.addEventListener("keyup", (e) => {
        if (e.target.matches(".contact-form [required]")) {
            let $input = e.target
            pattern = $input.pattern || $input.dataset.pattern;

            if (pattern && $input.value !== "") {
                console.log("el input tiene patron");
                let regex = new RegExp(pattern);
                return !regex.exec($input.value)
                    ? d.getElementById($input.name).classList.add("is-active")
                    : d.getElementById($input.name).classList.remove("is-active");

            }

            if (pattern) {
                return $input.value === ""
                    ? d.getElementById($input.name).classList.add("is-active")
                    : d.getElementById($input.name).classList.remove("is-active");

            }

        }
    });

    d.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Enviando Formulario");

        const $loader = d.querySelector(".contact-form-loader");
        const $response = d.querySelector(".contact-form-response");
        const $form = e.target;

        $loader.classList.remove("none");

        setTimeout(() => {
            $loader.classList.add("none");
            $response.classList.remove("none");
            $form.reset();

            setTimeout(() => $response.classList.add("none"), 3000);
        }, 3000);
    });


}



// document.addEventListener("DOMContentLoaded", (e) => {
//     contactFormValidations();
// })




// MENU HAMBURGUESA -------------------------------


function hamburguerMenu(panelBtn, panel, menu) {
    const d = document;

    d.addEventListener("click", (e) => {
        if (e.target.matches(panelBtn) || e.target.matches(`${panelBtn} *`)) {
            d.querySelector(panel).classList.toggle("is-active");
            d.querySelector(panelBtn).classList.toggle("is-active");
        }
        if (e.target.matches(menu)) {
            d.querySelector(panel).classList.remove("is-active");
            d.querySelector(panelBtn).classList.remove("is-active");
        }
    });
}





document.addEventListener("DOMContentLoaded", (e) => {
    hamburguerMenu(".panel-btn", ".panel", ".menu-hambur a");
    contactFormValidations();
});





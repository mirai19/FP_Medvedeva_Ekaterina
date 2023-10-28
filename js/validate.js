function validateForm() {
    var form = document.getElementById("feedbackForm");
    var isValid = form.checkValidity();

    if (isValid) {
        var formData  = getData();
        var feedbackSent = false;

        var name = formData.firstName + " " + formData.lastName;
        feedbackSent = getCookie(name);

        var dialogOverlay = document.getElementById("dialogOverlay");
        var dialogBox = document.getElementById("dialogBox");

        if (feedbackSent) {
            dialogBox.querySelector("p").textContent = name + ", your feedback is being processed!!";
            dialogOverlay.style.display = "flex";
        } else {
            saveData();

            dialogBox.querySelector("p").textContent = name + ", thanks for reaching out!";
            dialogOverlay.style.display = "flex";

            setCookie(name);
        }
    } else {
        highlightInvalidFields();
    }
}

function setCookie(name) {
    
    document.cookie = name + "=true; path=/";
}


function highlightInvalidFields() {
    var form = document.getElementById("feedbackForm");

    for (var i = 0; i < form.elements.length; i++) {
        var element = form.elements[i];
        var span = element.nextElementSibling;

        if (element.validity.valid === false) {
            element.classList.add("invalid");
            span.textContent = getValidationMessage(element);
        } else {
            element.classList.remove("invalid");
            span.textContent = "";
        }
    }

    updateSubmitButton();
}

function getValidationMessage(element) {
    if (element.validity.valueMissing) {
        return "This field is required.";
    }

    if (element.validity.typeMismatch) {
        return "Please enter a valid " + element.type + ".";
    }

    if (element.validity.patternMismatch) {
        return "Please match the requested format.";
    }

    return "Invalid input.";
}

function updateSubmitButton() {
    var form = document.getElementById("feedbackForm");
    var submitButton = document.getElementById("submitButton");
    submitButton.disabled = !form.checkValidity();
}

function saveData() {
    var form = document.getElementById("feedbackForm");
    var formData = {};

    for (var i = 0; i < form.elements.length; i++) {
        var element = form.elements[i];

        if (element.type !== "button") {
            formData[element.name] = element.value;
        }
    }

    localStorage.setItem("formData", JSON.stringify(formData));
}

function getData() {
    var form = document.getElementById("feedbackForm");
    var formData = {};
    for (var i = 0; i < form.elements.length; i++) {
        var element = form.elements[i];

        if (element.type !== "button") {
            formData[element.name] = element.value;
        }
    }
	return formData;
}

function prefillForm() {
    var formData = localStorage.getItem("formData");

    if (formData) {
        formData = JSON.parse(formData);

        for (var key in formData) {
            if (formData.hasOwnProperty(key)) {
                var element = document.getElementsByName(key)[0];

                if (element) {
                    element.value = formData[key];
                }
            }
        }
    }

}

function getCookie(name) {
    var cookies = document.cookie.split("; ");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].split("=");

        if (cookie[0] === name) {
            console.log('cookie[1] ' + cookie[1]);
            return cookie[1];
        }
    }
    return null;
}

function closeDialog() {
    var dialogOverlay = document.getElementById("dialogOverlay");
    dialogOverlay.style.display = "none";
}

window.onload = prefillForm;

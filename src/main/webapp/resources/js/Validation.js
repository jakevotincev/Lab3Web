

function validateY() {
    let Y = document.getElementById("Y");
    if (isNaN(Number(Y.value)) || Y.value === "-") {
        disableButton();
    } else {
        if (Number(Y.value) >= -5 && Number(Y.value) <= 5) {
            activateButton();
        } else {
            disableButton()

        }
    }
}

function activateButton() {
        document.getElementById("checkButton").style.color = "#D3D3D3";
        document.getElementById("checkButton").style.removeProperty("background-position")



}

function disableButton() {
    document.getElementById("checkButton").style.color = "#000000";
    document.getElementById("checkButton").style.backgroundPosition = "0 0";
}
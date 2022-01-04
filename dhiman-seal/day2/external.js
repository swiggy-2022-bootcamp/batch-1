/**
 * Gets currently selected value of a radio button group by name.
 * @param {string} radioGroupName - Name of the radio button group.
 * @return {string} - Value of the selected radio button.
 */
function getRadioValue(radioGroupName) {
    let elements = document.getElementsByName(radioGroupName);
    for (let element of elements) {
        if (element.checked) {
            return element.value;
        }
    }
}

/**
 * Generates the Radio buttons to choose preferred Display style.
 * @return {void}
 */
function generateDisplayRadioButtons() {
    let display_option = [
        "block",
        "inline",
        "inline-block",
        "none",
        "table",
        "table-cell",
        "table-row",
        "table-row-group",
        "table-column",
        "table-column-group",
        "table-caption",
        "table-footer-group",
        "table-header-group",
        "table-row-group",
        "table-cell",
        "table-column-group",
        "table-column",
        "table-footer-group",
        "table-header-group",
        "table-row",
        "table-row-group",
    ];
    for (let option of display_option) {
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "dis_radio";
        radio.value = option;
        radio.id = option + "_radio";
        document.getElementById("display_radios").appendChild(radio);
        let label = document.createElement("label");
        label.htmlFor = option;
        label.innerHTML = option + '&nbsp;';
        document.getElementById("display_radios").appendChild(label);
    }
    // Select first radio.
    document.getElementsByName("dis_radio")[0].checked = true;
}
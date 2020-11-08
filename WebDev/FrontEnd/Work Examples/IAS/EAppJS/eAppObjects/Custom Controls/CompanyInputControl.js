function CompanyInputController(
    labelComp,
    noteComp,
    inputId,
    inputClass,
    inputName,
    inputValue,
    placeholderValue,
    required,
    enabled,
    rulesMessage,
    responses
){
    //Objects
    function CompanyInputObj(
        inputId,
        inputClass,
        inputName,
        inputValue,
        placeholderValue,
        required,
        enabled,
        rulesmsg,
        responses
    ) {
        this.inputId = !NullOrEmptyCheck(inputId) ? inputId : "";
        this.inputClass = !NullOrEmptyCheck(inputClass) ? inputClass : "";
        this.inputName = !NullOrEmptyCheck(inputName) ? inputName : "";
        this.inputValue = !NullOrEmptyCheck(String(inputValue)) ? inputValue : "";
        this.placeholderValue = "";
        this.isRequired = required ? true : false;
        this.isEnabled = enabled ? "" : "disabled";
        this.responses = responses !== null || responses.length > 0 ? responses : "";
        this.rulseMsg = !NullOrEmptyCheck(rulesmsg) ? rulesmsg.split("|") : "";
        this.contextValue = placeholderValue;
    };

    function CreateCompanyInput(
        label,
        note,
        inputObj
    ){
        var inputArr = [];
        let reqText = "";

        if (inputObj.rulseMsg.length > 0) {
            reqText = AlertController(inputObj.rulseMsg[0], inputObj.rulseMsg[1]);
        }

        inputArr.push("<div id='" + inputObj.inputId + "-div'>");

        inputArr.push(label);
        inputArr.push(note);

        inputArr.push("<div id='" + inputObj.inputId + "-alertDiv'>" + reqText + "</div>");

        if (!NullOrEmptyCheck(inputObj.isEnabled)) {
            inputArr.push("<div class='company-input-container ui-widget'>");
            inputArr.push("<input type='text' id='" + inputObj.inputId + "' class='" + inputObj.inputClass + "' name='" + inputObj.inputName + "' placeholder='" + inputObj.placeholderValue + "' value='" + inputObj.inputValue + "' onkeypress='ApplyAutocomplete(this.id)' " + inputObj.isEnabled + ">");
            inputArr.push("<div id='" + inputObj.inputId + "-alertDiv'></div>");
            inputArr.push("</div>");
        }
        else {
            if (inputObj.isRequired) {
                inputArr.push("<div class='company-input-container ui-widget'>");
                inputArr.push("<input type='text' id='" + inputObj.inputId + "' class='" + inputObj.inputClass + "' name='" + inputObj.inputName + "' placeholder='" + inputObj.placeholderValue + "' value='" + inputObj.inputValue + "' onkeypress='ApplyAutocomplete(this.id)'  required>");
                inputArr.push("<div id='" + inputObj.inputId + "-alertDiv'></div>");
                inputArr.push("</div>");
            }
            else {
                inputArr.push("<div class='company-input-container ui-widget'>");
                inputArr.push("<input type='text' id='" + inputObj.inputId + "' class='" + inputObj.inputClass + "' name='" + inputObj.inputName + "' placeholder='" + inputObj.placeholderValue + "' value='" + inputObj.inputValue + "' onkeypress='ApplyAutocomplete(this.id)' " + inputObj.isEnabled + ">");
                inputArr.push("<div id='" + inputObj.inputId + "-alertDiv'></div>");
                inputArr.push("</div>");
            }
        }

        inputArr.push("</div>");

        return CreateElement(inputArr);
    }

    var labelCompVar = !NullOrEmptyCheck(labelComp) ? labelComp : "";
    var noteCompVar = !NullOrEmptyCheck(noteComp) ? noteComp : "";

    return CreateCompanyInput(
        labelCompVar,
        noteCompVar,
        new CompanyInputObj(
            inputId,
            inputClass,
            inputName,
            inputValue,
            placeholderValue,
            required,
            enabled,
            rulesMessage,
            responses
        )
    );
};
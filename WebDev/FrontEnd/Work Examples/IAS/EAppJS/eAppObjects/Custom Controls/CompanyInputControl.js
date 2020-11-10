//Objects
class CompanyInputObj{
    constructor(
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
        this.isRequired = required ? "required" : "";
        this.isEnabled = enabled ? "" : "disabled";
        this.responses = responses !== null || responses.length > 0 ? responses : "";
        this.rulseMsg = !NullOrEmptyCheck(rulesmsg) ? rulesmsg.split("|") : "";
        this.contextValue = placeholderValue;
    };
};

const CompanyInputController = (
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
) => {
    const CreateCompanyInput = (
        label,
        note,
        inputObj
    ) => {
        var inputArr = [];
        let reqText, reqOut, enabledOut;

        if (inputObj.rulseMsg.length > 0) {
            reqText = AlertController(inputObj.rulseMsg[0], inputObj.rulseMsg[1]);
            reqOut = `<div id='${inputObj.inputId}-alertDiv'>${reqText}</div>`
        }

        return `<div id='${inputObj.inputId}-div'>
                ${label}
                ${note}
                ${reqOut}
                <div class='company-input-container ui-widget'>
                <input type='text' id='${inputObj.inputId}' class='${inputObj.inputClass}' name='${inputObj.inputName}' placeholder='${inputObj.placeholderValue}' value='${inputObj.inputValue}' onkeypress='ApplyAutocomplete(this.id)' ${inputObj.isEnabled} ${inputObj.isRequired}>
                <div id='${inputObj.inputId}-alertDiv'></div>
                </div>
                </div>`;
    }

    let labelCompVar = !NullOrEmptyCheck(labelComp) ? labelComp : "";
    let noteCompVar = !NullOrEmptyCheck(noteComp) ? noteComp : "";

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
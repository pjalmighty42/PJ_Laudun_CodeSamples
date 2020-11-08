class InputCompObj {
    constructor(
        inType = "text",
        inputId = "",
        inputClass = "",
        inputName = "",
        dataMask = "",
        pattern = "",
        minLength = 0,
        maxLength = 250,
        inputValue = "",
        placeholderValue = "",
        isRequired = false,
        isEnabled = true,
        rulesmsg = "",
        functionCallBack = ""
    ) {
        this.inputType = !NullOrEmptyCheck(inType) ? inType : "text";
        this.inputId = !NullOrEmptyCheck(inputId) ? inputId : "";
        this.inputClass = !NullOrEmptyCheck(inputClass) ? inputClass : "";
        this.inputName = !NullOrEmptyCheck(inputName) ? inputName : "";
        this.dataMask = !NullOrEmptyCheck(dataMask) ? dataMask : "";
        this.pattern = !NullOrEmptyCheck(pattern) ? pattern : "";
        this.minLength = minLength !== 0 ? minLength : 0;
        this.maxLength = maxLength !== 250 ? maxLength : 250;
        this.inputValue = !NullOrEmptyCheck(String(inputValue)) ? inputValue : "";
        this.placeholderValue = !NullOrEmptyCheck(placeholderValue) ? ReturnPureContextValue(placeholderValue) : "";
        this.isRequired = isRequired === true ? true : false;
        this.isEnabled = isEnabled === true ? true : false;
        this.callbackFn = !NullOrEmptyCheck(functionCallBack) ? functionCallBack : "";
        this.answer = !NullOrEmptyCheck(inputValue) ? inputValue : "";
        this.rulseMsg = !NullOrEmptyCheck(rulesmsg) ? rulesmsg.split("|") : "";
        this.contextValue = placeholderValue;
    }
};


function InputComponentController(
    labelComp,
    noteComp,
    type,
    inId,
    classes,
    name,
    mask,
    pat,
    minlngth,
    maxlngth,
    inputVal,
    placeholder,
    required,
    enabled,
    rulesMessage,
    includeCheck
){
    let labelCompVar = !NullOrEmptyCheck(labelComp) ? labelComp : "";
    let noteCompVar = !NullOrEmptyCheck(noteComp) ? noteComp : "";

    //This will create the <input> element from the passed in Input Object
    function CreateInputElement(inputObj){
        let erOutput = EnableAndRequiredCheck(inputObj.isEnabled, inputObj.isRequired);

        let rulesText = "";

        if (inputObj.rulseMsg.length > 1) {
            rulesText = AlertController(inputObj.rulseMsg[0], inputObj.rulseMsg[1]);
        }

        //First Check to see if the <input> is required 
        switch (inputObj.inputType) {
            case "text":
                return `<div class='input-container'>
                <input type='text' id='${inputObj.inputId}' class='${inputObj.inputClass}' name='${inputObj.inputName}' min='${inputObj.minLength}' maxlength='${inputObj.maxLength}' placeholder='${inputObj.placeholderValue}' value='${inputObj.inputValue}' ${inputObj.callbackFn} ${erOutput}>
                <div id='${inputObj.inputId}-alertDiv'>${rulesText}</div>
                </div>`;
            case "email":
                return `<div class='input-container'>
                <input type='text' id='${inputObj.inputId}' class='${inputObj.inputClass}' name='${inputObj.inputName}' data-mask='${inputObj.dataMask}' min='2' maxlength='64' placeholder='${inputObj.placeholderValue}' value='${inputObj.inputValue}' ${inputObj.callbackFn} ${erOutput}>
                <div id='${inputObj.inputId}-alertDiv'>${rulesText}</div>
                </div>`;
            case "date":
                return `<div class='input-container'>
                <input type='text' input-type='date' id='${inputObj.inputId}' class='${inputObj.inputClass}' min='10' maxlength='10' name='${inputObj.inputName}' value='${inputObj.answer}' ${inputObj.callbackFn} ${erOutput}>
                <div id='${inputObj.inputId}-alertDiv'>${rulesText}</div>
                </div>`;
            case "time":
                var DateId1 = inputObj.inputId + "Date";
                return `<div class='input-container'>
                <div class='time-date-div'><input type='text' input-type='date' id='${DateId1}' class='${inputObj.inputClass}' maxlength='10' name='${inputObj.inputName}' required> <input type='time' id='${inputObj.inputId}' class='${inputObj.inputClass}' name='${inputObj.inputName}' min='9:00' max='17:00' ${inputObj.callbackFn} ${erOutput}></div>
                <div id='${inputObj.inputId}-alertDiv'>${rulesText}</div>
                </div>`;
            case "ssn":
                return `<div class='input-container'>
                <input type='text' input-type='ssn' id='${inputObj.inputId}' class='${inputObj.inputClass}' name='${inputObj.inputName}' placeholder='${inputObj.placeholderValue}' value='${inputObj.inputValue}' maxlength='9' onchange='editRulesCheckInput(this.id)' ${erOutput}>
                <div id='${inputObj.inputId}-alertDiv'>${rulesText}</div>
                </div>`;
            case "ssn4":
                return `<div class='input-container'>
                <input type='text' input-type='ssn4' id='${inputObj.inputId}' class='${inputObj.inputClass}' name='${inputObj.inputName}' placeholder='${inputObj.placeholderValue}' value='${inputObj.inputValue}' maxlength='4' onchange='editRulesCheckInput("${inputObj.inputId})' ${inputObj.callbackFn} ${erOutput}>
                <div id='${inputObj.inputId}-alertDiv'>${rulesText}</div>
                </div>`;
            case "phone":
                return `<div class='input-container'>
                <input type='text' input-type='phone' id='${inputObj.inputId}' class='${inputObj.inputClass}' name='${inputObj.inputName}' placeholder='${inputObj.placeholderValue}' value='${inputObj.inputValue}' maxlength='10' ${inputObj.callbackFn} ${erOutput}>
                <div id='${inputObj.inputId}-alertDiv'>${rulesText}</div>
                </div>`;
            case "int":
                return `<div class='input-container'>
                <input type='text' id='${inputObj.inputId}' class='${inputObj.inputClass}' name='${inputObj.inputName}' value='${inputObj.inputValue}' min='${inputObj.minLength}' max='${inputObj.maxLength}' maxlength='${inputObj.maxLength.toString().length}' onkeypress='return isInputNumeric(event)' oninput='maxLengthCheck(this)' ${inputObj.callbackFn} ${erOutput}>
                <div id='${inputObj.inputId}-alertDiv'>${rulesText}</div>
                </div>`;
            case "range":
                var rangeVal = !NullOrEmptyCheck(inputObj.inputValue) ? inputObj.inputValue : 1;
                return `<div class='input-container'>
                <div class='range-bg'><input type='range' id='${inputObj.inputId}' min='1' max='100' value='${rangeVal}' class='range-slider ${inputObj.inputClass}' name='${inputObj.inputName}' oninput='adjustSlider(this)' onblur='editRulesCheckInput(this.id)' required> <input type='number' id='${inputObj.inputId}' class='range-slider-input ${inputObj.inputClass}' name='${inputObj.inputName}'  min='1' max='100' value='${rangeVal}' oninput='adjustSlider(this)' onblur='editRulesCheckInput(this.id)' ${erOutput}></div>
                <div id='${inputObj.inputId}-alertDiv'>${rulesText}</div>
                </div>`;
            case "zip":
                return `<div class='input-container'>
                <input type='text' input-type='zip' id='${inputObj.inputId}' class='${inputObj.inputClass}' name='${inputObj.inputName}' placeholder='${inputObj.placeholderValue}' value='${inputObj.inputValue}' maxlength='5' pattern='[0-9]{5}' ${inputObj.callbackFn} ${erOutput}>
                <div id='${inputObj.inputId}-alertDiv'>${rulesText}</div>
                </div>`;
        }
    };

    function CreateInputElementNoCheck(inputObj) {
        let erOutput = EnableAndRequiredCheck(inputObj.isEnabled, inputObj.isRequired);

        let rulesText = "";

        if (inputObj.rulseMsg.length > 1) {
            rulesText = AlertController(inputObj.rulseMsg[0], inputObj.rulseMsg[1]);
        }

        switch (inputObj.inputType) {
            case "text":
                return `<div class='input-container'>
                <input type='text' id='${inputObj.inputId}' class='${inputObj.inputClass}' name='${inputObj.inputName}' min='${inputObj.minLength}' maxlength='${inputObj.maxLength}' placeholder='${inputObj.placeholderValue}' value='${inputObj.inputValue}' ${erOutput}>
                <div id='${inputObj.inputId}-alertDiv'>${rulesText}</div>
                </div>`;
            case "email":
                return `<div class='input-container'>
                <input type='text' id='${inputObj.inputId}' class='${inputObj.inputClass}' name='${inputObj.inputName}' data-mask='${inputObj.dataMask}' min='2' maxlength='64' placeholder='${inputObj.placeholderValue}' value='${inputObj.inputValue}' ${erOutput}>
                <div id='${inputObj.inputId}-alertDiv'>${rulesText}</div>
                </div>`;
            case "date":
                return `<div class='input-container'>
                <input type='text' input-type='date' id='${inputObj.inputId}' class='${inputObj.inputClass}' min='10' maxlength='10' name='${inputObj.inputName}' value='${inputObj.answer}' ${erOutput}>
                <div id='${inputObj.inputId}-alertDiv'>${rulesText}</div>
                </div>`;
            case "time":
                var DateId1 = inputObj.inputId + "Date";
                return `<div class='input-container'>
                <div class='time-date-div'><input type='text' input-type='date' id='${DateId1}' class='${inputObj.inputClass}' maxlength='10' name='${inputObj.inputName}' required> <input type='time' id='${inputObj.inputId}' class='${inputObj.inputClass}' name='${inputObj.inputName}' min='9:00' max='17:00' ${erOutput}></div>
                <div id='${inputObj.inputId}-alertDiv'>${rulesText}</div>
                </div>`;
            case "ssn":
                return `<div class='input-container'>
                <input type='text' input-type='ssn' id='${inputObj.inputId}' class='${inputObj.inputClass}' name='${inputObj.inputName}' placeholder='${inputObj.placeholderValue}' value='${inputObj.inputValue}' maxlength='9' ${erOutput}>
                <div id='${inputObj.inputId}-alertDiv'>${rulesText}</div>
                </div>`;
            case "ssn4":
                return `<div class='input-container'>
                <input type='text' input-type='ssn4' id='${inputObj.inputId}' class='${inputObj.inputClass}' name='${inputObj.inputName}' placeholder='${inputObj.placeholderValue}' value='${inputObj.inputValue}' maxlength='4' onchange='editRulesCheckInput("${inputObj.inputId})' ${erOutput}>
                <div id='${inputObj.inputId}-alertDiv'>${rulesText}</div>
                </div>`;
            case "phone":
                return `<div class='input-container'>
                <input type='text' input-type='phone' id='${inputObj.inputId}' class='${inputObj.inputClass}' name='${inputObj.inputName}' placeholder='${inputObj.placeholderValue}' value='${inputObj.inputValue}' maxlength='10' ${erOutput}>
                <div id='${inputObj.inputId}-alertDiv'>${rulesText}</div>
                </div>`;
            case "int":
                return `<div class='input-container'>
                <input type='text' id='${inputObj.inputId}' class='${inputObj.inputClass}' name='${inputObj.inputName}' value='${inputObj.inputValue}' min='${inputObj.minLength}' max='${inputObj.maxLength}' maxlength='${inputObj.maxLength.toString().length}' onkeypress='return isInputNumeric(event)' oninput='maxLengthCheck(this)' ${erOutput}>
                <div id='${inputObj.inputId}-alertDiv'>${rulesText}</div>
                </div>`;
            case "range":
                var rangeVal = !NullOrEmptyCheck(inputObj.inputValue) ? inputObj.inputValue : 1;
                return `<div class='input-container'>
                <div class='range-bg'><input type='range' id='${inputObj.inputId}' min='1' max='100' value='${rangeVal}' class='range-slider ${inputObj.inputClass}' name='${inputObj.inputName}' oninput='adjustSlider(this)' required> <input type='number' id='${inputObj.inputId}' class='range-slider-input ${inputObj.inputClass}' name='${inputObj.inputName}'  min='1' max='100' value='${rangeVal}' oninput='adjustSlider(this)' ${erOutput}></div>
                <div id='${inputObj.inputId}-alertDiv'>${rulesText}</div>
                </div>`;
            case "zip":
                return `<div class='input-container'>
                <input type='text' input-type='zip' id='${inputObj.inputId}' class='${inputObj.inputClass}' name='${inputObj.inputName}' placeholder='${inputObj.placeholderValue}' value='${inputObj.inputValue}' maxlength='5' pattern='[0-9]{5}'  ${erOutput}>
                <div id='${inputObj.inputId}-alertDiv'>${rulesText}</div>
                </div>`;
        }
    };


    //This will take in any passed in Label or Note and create the full <input> with said items
    function CreateInputContainer(
        labelComp,
        noteComp,
        inputEl
    ) {
        let inputOut;

        if (!NullOrEmptyCheck(inputEl.callbackFn)) {
            inputOut = CreateInputElement(inputEl);
        }
        else {
            inputOut = CreateInputElementNoCheck(inputEl);
        }

        return `<div id='${inputEl.inputId}-container'>
                ${labelComp}
                ${noteComp}
                ${inputOut}
                </div>`;
    };

    return CreateInputContainer(
        labelCompVar,
        noteCompVar,
        new InputCompObj(
            type,
            inId,
            classes,
            name,
            mask,
            pat,
            minlngth,
            maxlngth,
            inputVal,
            placeholder,
            required,
            enabled,
            rulesMessage,
            includeCheck
        )
    );
};
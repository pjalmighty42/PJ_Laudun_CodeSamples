//This will take in any labels, or notes, and output the full radio group element for the page (+1 parameters)
class RadioButtonObj {
    constructor(
        isCustom = "",
        formIdName = "",
        formClassName = "",
        formName = "",
        radioLabelId = "",
        radioLabelClass = "",
        radioInputId = "",
        radioInputClass = "",
        radioNameVal = "",
        isRequired = false,
        isEnabled = "",
        options = [],
        answer = "",
        rulesmsg = "",
        contextVal = ""
    ) {
        this.isCustom = isCustom === true ? true : false;
        this.formIdName = !NullOrEmptyCheck(formIdName) ? "id ='" + formIdName + "'" : "";
        this.formClassName = !NullOrEmptyCheck(formClassName) ? "class='" + formClassName + "'" : "";
        this.formName = !NullOrEmptyCheck(formName) ? "name='" + formName + "'" : "";
        this.radioLabelId = !NullOrEmptyCheck(radioLabelId) ? radioLabelId : "";
        this.radioLabelClass = !NullOrEmptyCheck(radioLabelClass) ? "class='" + radioLabelClass + "'" : "";
        this.radioInputId = !NullOrEmptyCheck(radioInputId) ? radioInputId : "";
        this.radioInputClass = !NullOrEmptyCheck(radioInputClass) ? "class='" + radioInputClass + "'" : "";
        this.radioNameVal = !NullOrEmptyCheck(radioNameVal) ? "name='" + radioNameVal + "'" : "";
        this.isRequired = isRequired === true ? true : false;
        this.isEnabled = isEnabled === true ? true : false;

        if (options.length > 0) {
            if (options !== null) {
                this.options = options;
            }
        }
        else {
            this.options.push("ERR! No Options!");
        }

        this.rulseMsg = !NullOrEmptyCheck(rulesmsg) ? rulesmsg.split("|") : "";

        this.answer = answer !== NullOrEmptyCheck(answer) ? answer : "";
        this.contextVal = contextVal !== NullOrEmptyCheck(contextVal) ? contextVal : "";
    }
};

function RadioButtonGroupContainerController(
    isCustom,
    id,
    labelComp,
    noteComp,
    formClassName,
    radioLabelClass,
    radioInputClass,
    required,
    enabled,
    specialOptions,
    answer,
    contextVal,
    rulesMessage,
    includeCheck
){
    //This will create the actual radio button form group for the user to select
    function CreateRadioButtonGroup (label, note, rbGroupObj){
        let radioGroupObject = [];
        let reqText = ""; 
        let erOutput = EnableAndRequiredCheck(rbGroupObj.isEnabled, rbGroupObj.isRequired);
        let enabledSpan = rbGroupObj.isEnabled === true ? "radiomark" : "radiomark-disabled";

        if (rbGroupObj.rulseMsg.length > 0) {
            reqText = AlertController(rbGroupObj.rulseMsg[0], rbGroupObj.rulseMsg[1]);
        }

        radioGroupObject.push("<div id='" + id + "-container'>");
        radioGroupObject.push(label);
        radioGroupObject.push(note);

        radioGroupObject.push("<div id='" + id + "-alertDiv'>" + reqText + "</div>");
        
        radioGroupObject.push("<form " + rbGroupObj.formIdName + " " + rbGroupObj.formClassName + "" + rbGroupObj.formName + ">");

        if (rbGroupObj.isCustom === true) {
            if (NullOrEmptyCheck(rbGroupObj.answer)) {
                for (let i = 0; i < rbGroupObj.options.length; i++) {
                    radioGroupObject.push("<label id='" + rbGroupObj.radioLabelId + rbGroupObj.options[i].seqNum + "' " + rbGroupObj.radioLabelClass + ">" + rbGroupObj.options[i].value);
                    radioGroupObject.push("<input type='radio' id='" + rbGroupObj.radioInputId + rbGroupObj.options[i].seqNum + "' " + rbGroupObj.radioInputClass + " " + rbGroupObj.radioNameVal + " value='" + rbGroupObj.options[i].value + "' onclick='editRulesCheckInput(this.id)' " + erOutput + ">")
                    radioGroupObject.push("<span class='" + enabledSpan + "'></span>");
                    radioGroupObject.push("</label>");
                }
            }
            else {
                for (let i = 0; i < rbGroupObj.options.length; i++) {
                    if (rbGroupObj.options[i].value.localeCompare(rbGroupObj.answer) === 0) {
                        radioGroupObject.push("<label id='" + rbGroupObj.radioLabelId + rbGroupObj.options[i].seqNum + "' " + rbGroupObj.radioLabelClass + ">" + rbGroupObj.options[i].value);
                        radioGroupObject.push("<input type='radio' id='" + rbGroupObj.radioInputId + rbGroupObj.options[i].seqNum + "' " + rbGroupObj.radioInputClass + " " + rbGroupObj.radioNameVal + " value='" + rbGroupObj.options[i].value + "' onclick='editRulesCheckInput(this.id)' checked " + erOutput + ">")
                        radioGroupObject.push("<span class='" + enabledSpan + "'></span>");
                        radioGroupObject.push("</label>");
                    }
                    else {
                        radioGroupObject.push("<label id='" + rbGroupObj.radioLabelId + rbGroupObj.options[i].seqNum + "' " + rbGroupObj.radioLabelClass + ">" + rbGroupObj.options[i].value);
                        radioGroupObject.push("<input type='radio' id='" + rbGroupObj.radioInputId + rbGroupObj.options[i].seqNum + "' " + rbGroupObj.radioInputClass + " " + rbGroupObj.radioNameVal + " value='" + rbGroupObj.options[i].value + "' onclick='editRulesCheckInput(this.id)' " + erOutput + ">")
                        radioGroupObject.push("<span class='" + enabledSpan + "'></span>");
                        radioGroupObject.push("</label>");
                    }
                }
            }
        }
        else {
            if (NullOrEmptyCheck(rbGroupObj.answer)) {
                for (let i = 0; i < rbGroupObj.options.length; i++) {
                    radioGroupObject.push("<label id='" + rbGroupObj.radioLabelId + rbGroupObj.options[i].seqNum + "' " + rbGroupObj.radioLabelClass + ">" + rbGroupObj.options[i].value);
                    radioGroupObject.push("<input type='radio' id='" + rbGroupObj.radioInputId + rbGroupObj.options[i].seqNum + "' " + rbGroupObj.radioInputClass + " " + rbGroupObj.radioNameVal + " value='" + rbGroupObj.options[i].value + "' onclick='editRulesCheckInput(this)' " + erOutput + ">");
                    radioGroupObject.push("</label>");
                }
            }
            else {
                for (let i = 0; i < rbGroupObj.options.length; i++) {
                    if (rbGroupObj.options[i].value.localeCompare(rbGroupObj.answer) === 0) {
                        radioGroupObject.push("<label id='" + rbGroupObj.radioLabelId + rbGroupObj.options[i].seqNum + "' " + rbGroupObj.radioLabelClass + ">" + rbGroupObj.options[i].value);
                        radioGroupObject.push("<input type='radio' id='" + rbGroupObj.radioInputId + rbGroupObj.options[i].seqNum + "' " + rbGroupObj.radioInputClass + " " + rbGroupObj.radioNameVal + " value='" + rbGroupObj.options[i].value + "' onclick='editRulesCheckInput(this)' checked " + erOutput + ">");
                        radioGroupObject.push("</label>");
                    }
                    else {
                        radioGroupObject.push("<label id='" + rbGroupObj.radioLabelId + rbGroupObj.options[i].seqNum + "' " + rbGroupObj.radioLabelClass + ">" + rbGroupObj.options[i].value);
                        radioGroupObject.push("<input type='radio' id='" + rbGroupObj.radioInputId + rbGroupObj.options[i].seqNum + "' " + rbGroupObj.radioInputClass + " " + rbGroupObj.radioNameVal + " value='" + rbGroupObj.options[i].value + "' onclick='editRulesCheckInput(this)' " + erOutput + ">");
                        radioGroupObject.push("</label>");
                    }
                }
            }
        }

        radioGroupObject.push("</form>");
        radioGroupObject.push("</div>");

        return CreateElement(radioGroupObject);
    };

    function CreateRadioButtonGroupNoCheck(label, note, rbGroupObj) {
        let radioGroupObject = [];
        let erOutput = EnableAndRequiredCheck(rbGroupObj.isEnabled, rbGroupObj.isRequired);
        let enabledSpan = rbGroupObj.isEnabled === true ? "radiomark" : "radiomark-disabled";

        if (inputObj.rulseMsg.length > 0) {
            reqText = AlertController(inputObj.rulseMsg[0], inputObj.rulseMsg[1]);
        }
        radioGroupObject.push("<div id='" + id + "-container'>");
        radioGroupObject.push(label);
        radioGroupObject.push(note);

        radioGroupObject.push("<div id='" + id + "-alertDiv'></div>");

        radioGroupObject.push("<form " + rbGroupObj.formIdName + " " + rbGroupObj.formClassName + "" + rbGroupObj.formName + ">");

        if (rbGroupObj.isCustom) {
            if (NullOrEmptyCheck(rbGroupObj.answer)) {
                for (let i = 0; i < rbGroupObj.options.length; i++) {
                    radioGroupObject.push("<label id='" + rbGroupObj.radioLabelId + rbGroupObj.options[i].seqNum + "' " + rbGroupObj.radioLabelClass + ">" + rbGroupObj.options[i].value);
                    radioGroupObject.push("<input type='radio' id='" + rbGroupObj.radioInputId + rbGroupObj.options[i].seqNum + "' " + rbGroupObj.radioInputClass + " " + rbGroupObj.radioNameVal + " value='" + rbGroupObj.options[i].value + "' " + erOutput + ">")
                    radioGroupObject.push("<span class='" + enabledSpan + "'></span>");
                    radioGroupObject.push("</label>");
                }
            }
            else {
                for (let i = 0; i < rbGroupObj.options.length; i++) {
                    if (rbGroupObj.options[i].value.localeCompare(rbGroupObj.answer) === 0) {
                        radioGroupObject.push("<label id='" + rbGroupObj.radioLabelId + rbGroupObj.options[i].seqNum + "' " + rbGroupObj.radioLabelClass + ">" + rbGroupObj.options[i].value);
                        radioGroupObject.push("<input type='radio' id='" + rbGroupObj.radioInputId + rbGroupObj.options[i].seqNum + "' " + rbGroupObj.radioInputClass + " " + rbGroupObj.radioNameVal + " value='" + rbGroupObj.options[i].value + "' " + erOutput + ">")
                        radioGroupObject.push("<span class='" + enabledSpan + "'></span>");
                        radioGroupObject.push("</label>");
                    }
                    else {
                        radioGroupObject.push("<label id='" + rbGroupObj.radioLabelId + rbGroupObj.options[i].seqNum + "' " + rbGroupObj.radioLabelClass + ">" + rbGroupObj.options[i].value);
                        radioGroupObject.push("<input type='radio' id='" + rbGroupObj.radioInputId + rbGroupObj.options[i].seqNum + "' " + rbGroupObj.radioInputClass + " " + rbGroupObj.radioNameVal + " value='" + rbGroupObj.options[i].value + "' " + erOutput + ">")
                        radioGroupObject.push("<span class='" + enabledSpan + "'></span>");
                        radioGroupObject.push("</label>");
                    }
                }
            }
        }
        else {
            if (NullOrEmptyCheck(rbGroupObj.answer)) {
                for (let i = 0; i < rbGroupObj.options.length; i++) {
                    radioGroupObject.push("<label id='" + rbGroupObj.radioLabelId + rbGroupObj.options[i].seqNum + "' " + rbGroupObj.radioLabelClass + ">" + rbGroupObj.options[i].value);
                    radioGroupObject.push("<input type='radio' id='" + rbGroupObj.radioInputId + rbGroupObj.options[i].seqNum + "' " + rbGroupObj.radioInputClass + " " + rbGroupObj.radioNameVal + " value='" + rbGroupObj.options[i].value + "' " + erOutput + ">");
                    radioGroupObject.push("</label>");
                }
            }
            else {
                for (let i = 0; i < rbGroupObj.options.length; i++) {
                    if (rbGroupObj.options[i].value.localeCompare(rbGroupObj.answer) === 0) {
                        radioGroupObject.push("<label id='" + rbGroupObj.radioLabelId + rbGroupObj.options[i].seqNum + "' " + rbGroupObj.radioLabelClass + ">" + rbGroupObj.options[i].value);
                        radioGroupObject.push("<input type='radio' id='" + rbGroupObj.radioInputId + rbGroupObj.options[i].seqNum + "' " + rbGroupObj.radioInputClass + " " + rbGroupObj.radioNameVal + " value='" + rbGroupObj.options[i].value + "' " + erOutput + ">");
                        radioGroupObject.push("</label>");
                    }
                    else {
                        radioGroupObject.push("<label id='" + rbGroupObj.radioLabelId + rbGroupObj.options[i].seqNum + "' " + rbGroupObj.radioLabelClass + ">" + rbGroupObj.options[i].value);
                        radioGroupObject.push("<input type='radio' id='" + rbGroupObj.radioInputId + rbGroupObj.options[i].seqNum + "' " + rbGroupObj.radioInputClass + " " + rbGroupObj.radioNameVal + " value='" + rbGroupObj.options[i].value + "' " + erOutput + ">");
                        radioGroupObject.push("</label>");
                    }
                }
            }
        }

        radioGroupObject.push("</form>");
        radioGroupObject.push("</div>");

        return CreateElement(radioGroupObject);
    };

    if (includeCheck === true) {
        return CreateElement(
            CreateRadioButtonGroup(
                labelComp,
                noteComp,
                new RadioButtonObj(
                    isCustom,
                    id + "-radio-group",
                    formClassName,
                    id + "-radio-form",
                    id + '-radio-label',
                    radioLabelClass,
                    id,
                    radioInputClass,
                    id + '-question-radio-option',
                    required,
                    enabled,
                    specialOptions,
                    answer,
                    rulesMessage,
                    contextVal
                )
            )
        );
    }
    else {
        return CreateElement(
            CreateRadioButtonGroupNoCheck(
                labelComp,
                noteComp,
                new RadioButtonObj(
                    isCustom,
                    id + "-radio-group",
                    formClassName,
                    id + "-radio-form",
                    id + '-radio-label',
                    radioLabelClass,
                    id,
                    radioInputClass,
                    id + '-question-radio-option',
                    required,
                    enabled,
                    specialOptions,
                    answer,
                    rulesMessage,
                    contextVal
                )
            )
        );
    }
};
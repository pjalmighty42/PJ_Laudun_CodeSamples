function MedicareNumberController(
    labelComp,
    noteComp,
    inputId,
    inputClass,
    inputName,
    inputValue,
    placeholderValue,
    required,
    rulesMessage,
    enabled
) {
    function MedNumObj(
        objId,
        objClass,
        objName,
        objVal,
        phVal,
        isReq,
        rulesmsg,
        isEnabled
    ) {
        this.mnId = !NullOrEmptyCheck(objId) ? objId : "";
        this.mnClass = !NullOrEmptyCheck(objClass) ? objClass : "";
        this.mnName = !NullOrEmptyCheck(objName) ? objName : "";
        this.mnValue = !NullOrEmptyCheck(objVal) ? medNum(objVal) : "";
        this.mnPlaceholder = !NullOrEmptyCheck(phVal) ? phVal : "";
        this.mnIsReq = isReq === true ? true : false;
        this.mnIsEnabled = isEnabled === true ? true : false;
        this.rulseMsg = !NullOrEmptyCheck(rulesmsg) ? rulesmsg.split("|") : "";
    }

    function CreateMedNumInput(medNumObj) {
        let inputArr = [];

        inputArr.push("<div class='input-container'>");
        inputArr.push("<input type='text' id='" + medNumObj.mnId + "' class='" + medNumObj.mnClass + "' name='" + medNumObj.mnName + "' placeholder='" + medNumObj.mnPlaceholder + "' value='" + medNumObj.mnValue + "' minlength='9' maxlength='13' onchange='medNumberCheck(this.id)' onblur='mask(this, medNum);' onfocus='unmaskmedNum(this)' " + medNumObj.mnIsEnabled + ">");
        
        inputArr.push("</div>");

        return CreateElement(inputArr);
    }

    function CreateMedNumInputContainer(
        labelComp,
        noteComp,
        medNumEl
    ) {
        let fullInputEl = [];
        let reqText = "";

        if (medNumEl.rulseMsg.length > 0) {
            reqText = AlertController(medNumEl.rulseMsg[0], medNumEl.rulseMsg[1]);
        }

        fullInputEl.push("<div id='" + medNumEl.mnId + "-container'>");
        fullInputEl.push(labelComp);
        fullInputEl.push(noteComp);
        fullInputEl.push("<div id='" + medNumEl.mnId + "-alertDiv'>" + reqText + "</div>");
        fullInputEl.push(CreateMedNumInput(medNumEl));
        fullInputEl.push("</div>");

        return CreateElement(fullInputEl);
    }

    return CreateMedNumInputContainer(
        labelComp,
        noteComp,
        new MedNumObj(
            inputId,
            inputClass,
            inputName,
            inputValue,
            placeholderValue,
            required,
            rulesMessage,
            enabled
        )
    );
}

function medNumberCheck(id) {
    function MedChecker(val) {
        let output = [];
        
        if (val.length < 9 || val.length > 13) {
            if (val.toLowerCase().localeCompare("unknown") === 0) {
            }
            else {
                output.push("Your Medicare Number must be 10, or 11, characters long. Please input the correct amount of characters.");
            }
        }

        return output;
    }

    let medNumVal = $("#" + id).val();
    let errors = MedChecker(medNumVal);

    if (errors.length > 0) {
        let errorOut = "";
        for (var e = 0; e < errors.length; e++) {
            errorOut += errors[e] + " ";
        }
        $("#" + id + "-alertDiv").empty();
        $("#" + id + "-alertDiv").append(AlertController("danger", errorOut));
    }
    else {
        if (textChecker(medNumVal)) {
            $("#" + id + "-alertDiv").empty();
            editRulesCheckInput(id);
        }
        else {
            $("#" + id + "-alertDiv").empty();
            $("#" + id + "-alertDiv").append(AlertController("danger", "Invalid input. Please input a correct Medicare Number."));
        }
    }
}
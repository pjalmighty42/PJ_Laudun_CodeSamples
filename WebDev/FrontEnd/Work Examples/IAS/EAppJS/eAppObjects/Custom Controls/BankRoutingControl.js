function BankRoutingController(
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
    routing
) {
    function BankRoutingObj(
        objId,
        objClass,
        objName,
        objVal,
        phVal,
        isReq,
        isEnabled,
        rulesmsg,
        isRouting
    ) {
        this.brId = !NullOrEmptyCheck(objId) ? objId : "";
        this.brClass = !NullOrEmptyCheck(objClass) ? objClass : "";
        this.brName = !NullOrEmptyCheck(objName) ? objName : "";
        this.brValue = !NullOrEmptyCheck(objVal) ? objVal : "";
        this.brPlaceholder = !NullOrEmptyCheck(phVal) ? phVal : "";
        this.brIsReq = isReq === true ? true : false;
        this.brIsEnabled = isEnabled === true ? "" : "disabled";
        this.rulseMsg = !NullOrEmptyCheck(rulesmsg) ? rulesmsg.split("|") : "";
        this.brIsRouting = isRouting === true ? true : false;
    }

    var labelCompVar = !NullOrEmptyCheck(labelComp) ? labelComp : "";
    var noteCompVar = !NullOrEmptyCheck(noteComp) ? noteComp : "";

    function CreateBankRoutingInput(brObj) {
        let inputArr = [];
        let reqText = "";

        if (brObj.rulseMsg.length > 0) {
            reqText = AlertController(brObj.rulseMsg[0], brObj.rulseMsg[1]);
        }

        inputArr.push("<div class='input-container'>");
        if (brObj.brIsRouting === true) {
            inputArr.push("<input type='text' id='" + brObj.brId + "' class='" + brObj.brClass + "' name='" + brObj.brName + "' placeholder='" + brObj.brPlaceholder + "' value='" + brObj.brValue + "' min='0' max='999999999' maxlength='9' oninput='maxLengthCheck(this)' onblur='bankingRoutingCheck(this.id, true)'>");
        }
        else {
            inputArr.push("<input type='text' id='" + brObj.brId + "' class='" + brObj.brClass + "' name='" + brObj.brName + "' placeholder='" + brObj.brPlaceholder + "' value='" + brObj.brValue + "' min='0' max='99999999999999999' maxlength='17' oninput='maxLengthCheck(this)' onblur='bankingRoutingCheck(this.id, false)'>");
        }
        inputArr.push("<div id='bankInfo'></div>");
        inputArr.push("<div id='" + brObj.brId + "-alertDiv'>" + reqText + "</div>");
        inputArr.push("</div>");

        return CreateElement(inputArr);
    }

    function CreateBankRoutingContainer(
        labelComp,
        noteComp,
        brEl
    ) {
        var fullInputEl = [];

        fullInputEl.push("<div id='" + brEl.brId + "-container'>");
        fullInputEl.push(labelComp);
        fullInputEl.push(noteComp);
        fullInputEl.push(CreateBankRoutingInput(brEl));
        fullInputEl.push("</div>");

        return CreateElement(fullInputEl);
    }

    return CreateBankRoutingContainer(
        labelCompVar,
        noteCompVar,
        new BankRoutingObj(
            inputId,
            inputClass,
            inputName,
            inputValue,
            placeholderValue,
            required,
            enabled,
            rulesMessage,
            routing
        )
    );
};


function bankingRoutingCheck(id, isRoutingNum) {

    var itemVal = $("#" + id).val();

    if (!isRoutingNum) {
        if (NullOrEmptyCheck(itemVal)) {
            $("#" + id + "-alertDiv").empty();
            $("#" + id + "-alertDiv").append(AlertController("danger", "A response is required. Please input a Bank Account Number."));
        }
        else if (
            itemVal.length < 0 ||
            itemVal.length > 17
        ) {
            $("#" + id + "-alertDiv").empty();
            $("#" + id + "-alertDiv").append(AlertController("danger", "Invalid Bank Account Number. Input must be Numeric with no more than 17 digits."));
        }
        else if (!isNotaNumberChecker(itemVal)) {
            $("#" + id + "-alertDiv").empty();
            $("#" + id + "-alertDiv").append(AlertController("danger", "Invalid Bank Account Number. Input must be Numeric with no more than 17 digits."));
        }
        else {
            $("#" + id + "-alertDiv").empty();
            editRulesCheckInput(id);
        }
    }
    else {
        if (NullOrEmptyCheck(itemVal)) {
            $("#" + id + "-alertDiv").empty();
            $("#" + id + "-alertDiv").append(AlertController("danger", "A response is required. Please input a Bank Routing Number."));
        }
        else if (
            itemVal.length < 0 ||
            itemVal.length > 9
        ) {
            $("#" + id + "-alertDiv").empty();
            $("#" + id + "-alertDiv").append(AlertController("danger", "Invalid Bank Routing Number. Input must be Numeric with no more than 9 digits."));
        }
        else if (!isNotaNumberChecker(itemVal)) {
            $("#" + id + "-alertDiv").empty();
            $("#" + id + "-alertDiv").append(AlertController("danger", "Invalid Bank Routing Number. Input must be Numeric with no more than 9 digits."));
        }
        else {
            $("#" + id + "-alertDiv").empty();
            editRulesCheckInput(id);
        }
    }
}

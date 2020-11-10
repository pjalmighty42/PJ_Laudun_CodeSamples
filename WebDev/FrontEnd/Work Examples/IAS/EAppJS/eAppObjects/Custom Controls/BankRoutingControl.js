class BankRoutingObj{
    constructor(
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
    };
};

const BankRoutingController = (
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
) => {
    
    const CreateBankRoutingInput = (brObj) => {
        let reqText, bankingOut = "";

        if (brObj.rulseMsg.length > 0) {
            reqText = AlertController(brObj.rulseMsg[0], brObj.rulseMsg[1]);
        }

        if (brObj.brIsRouting === true) {
            bankingOut =`<input type='text' id='${brObj.brId}' class='${brObj.brClass}' name='${brObj.brName}' placeholder='${brObj.brPlaceholder}' value='${brObj.brValue}" +  + "' min='0' max='999999999' maxlength='9' oninput='maxLengthCheck(this)' onblur='bankingRoutingCheck(this.id, true)'></input>`;
        }
        else {
            bankingOut = `<input type='text' id='${brObj.brId}' class='${brObj.brClass}' name='${brObj.brName}' placeholder='${brObj.brPlaceholder}' value='${brObj.brValue}' min='0' max='99999999999999999' maxlength='17' oninput='maxLengthCheck(this)' onblur='bankingRoutingCheck(this.id, false)'>`;
        }

        return `<div class='input-container'>
                ${bankingOut}
                <div id='bankInfo'></div>
                <div id='${brObj.brId}-alertDiv'>${reqText}</div>
                </div>`;
    }

    const CreateBankRoutingContainer = (
        labelComp,
        noteComp,
        brEl
    ) => {
        let routingOut = CreateBankRoutingInput(brEl);

        return `<div id='${brEl.brId}-container'>
                ${labelComp}
                ${noteComp}
                ${routingOut}
                </div>`;
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


const bankingRoutingCheck = (id, isRoutingNum) => {

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

class CheckboxObj {
    constructor(
        isCustom = true,
        cbLabelId = "",
        cbLabelClass = "",
        cbInputId = "",
        cbInputClass = "",
        cbValue = "",
        isRequired = false,
        isEnabled = true,
        isChecked = false,
        rulesmsg = "",
        fnObj
    ) {
        this.isCustom = isCustom === true ? true : false;
        this.cbLabelId = !NullOrEmptyCheck(cbLabelId) ? cbLabelId : "";
        this.cbLabelClass = !NullOrEmptyCheck(cbLabelClass) ? cbLabelClass : "";
        this.cbInputId = !NullOrEmptyCheck(cbInputId) ? cbInputId : "";
        this.cbInputClass = !NullOrEmptyCheck(cbInputClass) ? cbInputClass : "";
        this.cbValue = !NullOrEmptyCheck(cbValue) ? cbValue : "";
        this.isRequired = isRequired === true ? true : false;
        this.isEnabled = isEnabled === true ? true : false;
        this.isChecked = isChecked === true ? "checked" : "";
        this.rulseMsg = !NullOrEmptyCheck(rulesmsg) ? rulesmsg.split("|") : "";
        this.callbackObj = ObjectCheck(fnObj) ? fnObj : ""; 
    }
}

function CheckboxController(
    isCustom,
    cbLabelId,
    cbLabelClass,
    cbInputId,
    cbInputClass,
    cbValue,
    isRequired,
    isEnabled,
    isChecked,
    rulesMessage,
    fnObj //{pId, docId, seqNum, type}
){
    function CheckboxComponent(cbObj) {

        let reqText = "";

        if (cbObj.rulseMsg.length > 0) {
            reqText = AlertController(cbObj.rulseMsg[0], cbObj.rulseMsg[1]);
        }

        let enabledSpan = cbObj.isEnabled === true ? "checkmark" : "checkmark-disabled";

        let cbCompObj = cbObj.isCustom === true ?
            cbObj.isEnabled === true ?
                `
                <div id='${cbObj.inputId}-alertDiv'>${reqText}</div>
                <label id='${cbObj.cbInputId}_label'  class='container ${cbObj.cbLabelClass}'>${cbObj.cbValue}
                <input type='checkbox' id='${cbObj.cbInputId}' class='${cbObj.cbInputClass}' value='${cbObj.cbValue}' ${cbObj.isChecked} 
                    onchange='DocumentAccept('${fnObj.parID}', '${fnObj.docID}', '${fnObj.seqNUM}', '${fnObj.Type}')'
                required>
                <span class='${enabledSpan}'></span>
                </label>
            ` : `
                <div id='${cbObj.inputId}-alertDiv'>${reqText}</div>
                <label id='${cbObj.cbInputId}_label'  class='container ${cbObj.cbLabelClass}'>${cbObj.cbValue}
                <input type='checkbox' id='${cbObj.cbInputId}' class='${cbObj.cbInputClass}' value='${cbObj.cbValue}' ${cbObj.isChecked} 
                    onchange='DocumentAccept('${fnObj.parID}', '${fnObj.docID}', '${fnObj.seqNUM}', '${fnObj.Type}')'
                disabled>
            `
            :
            `
                <div id='${cbObj.inputId}-alertDiv'>'${reqText}'</div>
                <input type='checkbox' id='${cbObj.cbInputId}' class='${cbObj.cbInputClass}' value='${cbObj.cbValue}' required ${cbObj.isChecked} 
                    onchange='DocumentAccept('${fnObj.parID}', '${fnObj.docID}', '${fnObj.seqNUM}', '${fnObj.Type}')'
                disabled>
            `;
        return CreateElement(cbCompObj);
    };

    return CheckboxComponent(
        new CheckboxObj(
            isCustom,
            cbLabelId,
            cbLabelClass,
            cbInputId,
            cbInputClass,
            cbValue,
            isRequired,
            isEnabled,
            isChecked,
            rulesMessage,
            fnObj
        )
    );
};
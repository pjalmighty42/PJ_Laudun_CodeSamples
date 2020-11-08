class CBAccordObj {
    constructor(
        id = "",
        value = "",
        secondVal = "",
        required = false,
        enabled = "",
        checked = false,
        rulesmsg = ""
    ) {
        this.CBID = id;
        this.CBValue = !NullOrEmptyCheck(value) ? value : "";
        this.CBSecondValue = !NullOrEmptyCheck(secondVal) ? secondVal : "";
        this.isEnabled = enabled == true ? true : false;
        this.isRequired = required === true ? true : false;
        this.isChecked = checked === true ? true : false;
        this.rulseMsg = !NullOrEmptyCheck(rulesmsg) ? rulesmsg.split("|") : "";
    }
}


function AccordionCheckboxController(
    cbId,
    cbValue,
    cbSecondVal,
    isRequired,
    isEnabled,
    isChecked,
    accordionPanelObject,
    rulesMessage
) {
    function CheckboxComponent(cbObj) {

        let cbCompObj = [];

        let checked = cbObj.isChecked ? 'checked' : '';

        if (cbObj.isEnabled === true) {
            return `<label id='${cbObj.CBID}_label'  class='accordCB-container cb-accord-label'><b>${cbObj.CBValue}</b> \n ${cbObj.CBSecondValue}
                    <input type='checkbox' id='${cbObj.CBID}' class='question-radio-option' value='${cbObj.CBValue}' ${checked} onclick='openCBAccordion(this.id)' required>
                    <span id='${cbObj.CBID}-accordCB-span' class='accordCB'></span>
                    </label>`;
        }
        else {
            return `<label id='${cbObj.CBID}_label'  class='accordCB-container-disabled cb-accord-label'><b>${cbObj.CBValue}</b> \n ${cbObj.CBSecondValue}
                    <input type='checkbox' id='${cbObj.CBID}' class='question-radio-option' value='${cbObj.CBValue}' ${checked} onclick='openCBAccordion(this.id)' disabled>
                    <span id='${cbObj.CBID}-accordCB-span' class='accordCB-disabled'></span>
                    </label>`;
        }
    }

    function CreateCBAccordionContainer(Id, cbObj, accordPanelObj) {
        //This will create the actual Accordion element (trigger plus the items that will open on trigger)
        let accordionObject = [];
        let reqText = "";
        let requiredIcon = "";

        if (cbObj.rulseMsg.length > 0) {
            reqText = AlertController(pageObj.rulseMsg[0], pageObj.rulseMsg[1]);
        }

        if (cbObj.isRequired === true && cbObj.isChecked === false) {
            requiredIcon = EAppIconController(cbObj.id, "Response is Required!");
        }

        cbObj.CBValue = requiredIcon + " " + cbObj.CBValue;

        let cbOut = CheckboxComponent(cbObj);
        let ddCollapsedOut = cbObj.isChecked ? 
        `<div id='${Id}-DDAccordID' class ='collapse show' data-parent='#${Id}-ParentID'>` :
        `<div id='${Id}-DDAccordID' class ='collapse' data-parent='#${Id}-ParentID'>`;

        let childOut = [];
        for (let apo = 0; apo < accordPanelObj.length; apo++) {
            if (typeof accordPanelObj[apo].childElsArr !== 'undefined') {
                childOut.push(CreateTriggerEls(accordPanelObj[apo]));
            }
            else {
                childOut.push(outputControl(accordPanelObj[apo]));
            }
        }

        return `<div id='${Id}-div' class='col-md-12'>
                <div id='${Id}-alertDiv'>${reqText}</div>
                <div id='${Id}-ParentID'>
                <div class='card'>
                <div class='card-header'>
                ${cbOut}
                </div>
                ${ddCollapsedOut}
                <div class='card-body'>
                ${childOut}
                </div>
                </div>
                </div>
                </div>
                </div>`;
    };

    let accordion = CreateCBAccordionContainer(
        cbId,
        new CBAccordObj(
            cbId,
            cbValue,
            cbSecondVal,
            isRequired,
            isEnabled,
            isChecked,
            rulesMessage
        ),
        accordionPanelObject
    )

    return accordion;
};

function openCBAccordion(id) {
    $(document).ready(function () {
        if ($('#' + id).is(':checked')) {
            console.log("Showing Accordion");
            $('#' + id + "-DDAccordID").collapse('show');

            let thisEl = data.dataList.find(d => d.id === id);
            let childObjArr = [];

            for (let i = 0; i < thisEl.childElementIDs.length; i++) {
                let childId = thisEl.childElementIDs[i].replace(/\s/g, '');

                let child = data.dataList.find(c => c.id === childId);
                child.isEnabled = true;
                childObjArr.push(child);
            }

            $('#' + id + '-DDAccordID').on('shown.bs.collapse', function () {
                console.log("show");

                ApplyControlsPostLoad(childObjArr);
            });

            let containerID = sessionStorage.getItem("contID");

            let containerData =
            {
                id: containerID,
                cvID: thisEl.cvid,
                contextID: id,
                value: "true",
                variableName: !NullOrEmptyCheck(thisEl.variableName) ? thisEl.variableName : "",
                sector: thisEl.pageSuffix,
                controlType: thisEl.controlType,
                legacyValue: thisEl.legacyValue,
                formQuestionNum: thisEl.formQuestionNum,
                kcId: thisEl.kcId,
                formField: thisEl.formField,
                effDate: thisEl.effDate,
                dataType: thisEl.dataType
            };

            PostData("Application/UpdateContainerData", containerData);
        }
        else {
            clearOverlays();
            console.log("Hiding Accordion");
            $('#' + id + "-DDAccordID").collapse('hide');
        }
    })
}
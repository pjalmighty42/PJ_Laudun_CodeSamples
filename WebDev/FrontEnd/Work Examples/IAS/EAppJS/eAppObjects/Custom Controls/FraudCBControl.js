class FraudCBAccordObj {
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


function FraudAccordionCheckboxController(
    cbId,
    cbValue,
    cbSecondVal,
    isRequired,
    isEnabled,
    isChecked,
    accordionPanelObject,
    rulesMessage
) {
    function FraudCheckboxComponent(cbObj) {

        let cbCompObj = [];

        let checked = cbObj.isChecked ? 'checked' : '';

        if (cbObj.isEnabled === true) {
            cbCompObj.push("<label id='" + cbObj.CBID + "_label'  class='accordCB-container cb-accord-label'><b>" + cbObj.CBValue + "</b> \n " + cbObj.CBSecondValue);
            cbCompObj.push("<input type='checkbox' id='" + cbObj.CBID + "' class='question-radio-option' value='" + cbObj.CBValue + "' " + checked + " onclick='AcceptFraud(this.id)' required>");
            cbCompObj.push("<span id='" + cbObj.CBID + "-accordCB-span' class='accordCB'></span>");
            cbCompObj.push("</label>");
        }
        else {
            cbCompObj.push("<label id='" + cbObj.CBID + "_label'  class='accordCB-container-disabled cb-accord-label'><b>" + cbObj.CBValue + "</b> \n " + cbObj.CBSecondValue);
            cbCompObj.push("<input type='checkbox' id='" + cbObj.CBID + "' class='question-radio-option' value='" + cbObj.CBValue + "' " + checked + " onclick='AcceptFraud(this.id)' disabled>");
            cbCompObj.push("<span id='" + cbObj.CBID + "-accordCB-span' class='accordCB-disabled'></span>");
            cbCompObj.push("</label>");
        }

        return CreateElement(cbCompObj);
    }

    function FraudCreateCBAccordionContainer(Id, cbObj, accordPanelObj) {
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

        //Else create the Accordion
        accordionObject.push("<div id='" + Id + "-div' class='col-md-12'>");
        accordionObject.push("<div id='" + Id + "-alertDiv'>" + reqText + "</div>");
        accordionObject.push("<div id='" + Id + "-ParentID'>");
        accordionObject.push("<div class='card'>");
        accordionObject.push("<div class='card-header'>");
        accordionObject.push(FraudCheckboxComponent(cbObj));
        accordionObject.push("</div>");
        if (cbObj.isChecked) {
            accordionObject.push("<div id='" + Id + "-DDAccordID' class ='collapse show' data-parent='#" + Id + "-ParentID'>");
        }
        else {
            accordionObject.push("<div id='" + Id + "-DDAccordID' class ='collapse' data-parent='#" + Id + "-ParentID'>");
        }
        accordionObject.push("<div class='card-body'>");

        for (let apo = 0; apo < accordPanelObj.length; apo++) {
            if (typeof accordPanelObj[apo].childElsArr !== 'undefined') {
                accordionObject.push(CreateTriggerEls(accordPanelObj[apo]));
            }
            else {
                accordionObject.push(outputControl(accordPanelObj[apo]));
            }
        }

        accordionObject.push("</div>");
        accordionObject.push("</div>");
        accordionObject.push("</div>");
        accordionObject.push("</div>");

        accordionObject.push("</div>");

        return CreateElement(accordionObject);
    };

    let accordion = FraudCreateCBAccordionContainer(
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

function AcceptFraud(id) {
    $(document).ready(function () {
        function LockControls(thisID) {

            var AllObjID = sessionStorage.getItem("SPDCntrlIDs").split(",");
            console.log(AllObjID);

            var thisIndx = AllObjID.indexOf(thisID);

            var LockIDArr = [];

            for (var i = 0; i < AllObjID.length; i++) {
                if (i < thisIndx) {
                    LockIDArr.push(AllObjID[i]);
                }
            }

            $("#" + thisID).prop("disabled", true);
            $("#" + thisID + "-accordCB-span").removeClass("accordCB");
            $("#" + thisID + "-accordCB-span").addClass("cb-locked");

            for (var i = 0; i < LockIDArr.length; i++) {

                let currEl = data.dataList.find(d => d.id === LockIDArr[i]);

                switch (currEl.controlType) {
                    case "checkbox":
                        $("#" + currEl.id).prop("disabled", true);
                        $("#" + currEl.id + "-accordCB-span").removeClass("accordCB");
                        $("#" + currEl.id + "-accordCB-span").addClass("cb-locked");
                        break;
                    case "signpad":
                        $(".sig-pad-btns-cont").empty();
                        $(".sig-pad-btns-cont").append("<div class='accepted-block'>Signature Locked! <i class='fa fa-lock'></i></div>");
                        break;
                    default:
                        break;
                }
            }
        }

        if ($('#' + id).is(':checked')) {
            console.log("Showing Accordion");
            $('#' + id + "-DDAccordID").collapse('show');

            let thisEl = data.dataList.find(d => d.id === id);
            let childObjArr = [];

            LockControls(thisEl.id);

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
            console.log("Hiding Accordion");
            $('#' + id + "-DDAccordID").collapse('hide');
        }
    })
}
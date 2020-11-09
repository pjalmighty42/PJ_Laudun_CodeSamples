
function AccordionEMailCheckboxController(
    cbId,
    cbValue,
    cbSecondValue,
    isRequired,
    isEnabled,
    isChecked,
    accordionPanelObject,
    rulesMessage,
    gridCount
) {
    function CBAccordObj(
        id,
        value,
        req,
        enabled,
        rulesmsg,
        checked
    ) {
        this.CBID = id;
        this.CBValue = value;
        this.CBSecondValue = !NullOrEmptyCheck(cbSecondValue) ? cbSecondValue : "";
        this.isRequired = req;
        this.isEnabled = enabled;
        this.rulseMsg = !NullOrEmptyCheck(rulesmsg) ? rulesmsg.split("|") : "";
        this.isChecked = checked === true ? true : false;
    }

    function CheckboxComponent(cbObj) {

        let cbCompObj = [];

        var checked = cbObj.isChecked ? 'checked' : '';

        if (cbObj.isEnabled === true) {
            cbCompObj.push("<label id='" + cbObj.CBID + "_label'  class='accordCB-container cb-accord-label'><h4>" + cbObj.CBValue + "</h4> \n" + cbObj.CBSecondValue);
            cbCompObj.push("<input type='checkbox' id='" + cbObj.CBID + "' class='question-radio-option' value='" + cbObj.CBValue + "' " + checked + " onclick='openEmailCBAccordion(this.id)' required>");
            cbCompObj.push("<span class='accordCB'></span>");
            cbCompObj.push("</label>");
        }
        else {
            cbCompObj.push("<label id='" + cbObj.CBID + "_label'  class='accordCB-container-disabled cb-accord-label'><h4>" + cbObj.CBValue + "</h4> \n" + cbObj.CBSecondValue);
            cbCompObj.push("<input type='checkbox' id='" + cbObj.CBID + "' class='question-radio-option' value='" + cbObj.CBValue + "' " + checked + " onclick='openEmailCBAccordion(this.id)' disabled>");
            cbCompObj.push("<span class='accordCB-disabled'></span>");
            cbCompObj.push("</label>");
        }

        return CreateElement(cbCompObj);
    }

    function CreateAccordion(Id, cbObj, accordPanelObj) {
        //This will create the actual Accordion element (trigger plus the items that will open on trigger)
        let accordionObject = [];
        let reqText = "";
        let requiredIcon = "";

        if (cbObj.rulseMsg.length > 0) {
            reqText = AlertController(cbObj.rulseMsg[0], cbObj.rulseMsg[1]);
        }

        if (cbObj.isRequired === true && cbObj.isChecked === false) {
            requiredIcon = EAppIconController(cbObj.id, "Response is Required!");
        }

        //Else create the Accordion
        accordionObject.push("<div id='" + Id + "-div' class='col-md-12'>");

        accordionObject.push("<div id='" + Id + "-alertDiv'>" + reqText + "</div>");

        let accrdPanObjs = [];

        for (var apo = 0; apo < accordPanelObj.length; apo++) {
            if (typeof accordPanelObj[apo].childElsArr !== 'undefined') {
                accrdPanObjs.push(CreateTriggerEls(accordPanelObj[apo]));
            }
            else {
                accrdPanObjs.push(outputControl(accordPanelObj[apo]));
            }
        }

        cbObj.CBValue = requiredIcon + " " + cbObj.CBValue;

        accrdPanObjs.push("<button id='" + Id + "_sendEsnEmail' class='btn btn-lg signin-btn-form' onclick='SendEmailToApplicant(this.id)'>Send E-Mail</button>");

        accordionObject.push("<div id='" + Id + "-ParentID'>");
        accordionObject.push("<div class='card'>");
        accordionObject.push("<div class='card-header'>");
        accordionObject.push(CheckboxComponent(cbObj));
        accordionObject.push("</div>");

        if (cbObj.isChecked) {
            accordionObject.push("<div id='" + Id + "-DDAccordID' class ='collapse show' data-parent='#" + Id + "-ParentID'>");
        }
        else {
            accordionObject.push("<div id='" + Id + "-DDAccordID' class ='collapse' data-parent='#" + Id + "-ParentID'>");
        }
        accordionObject.push("<div class='card-body'>");
        accordionObject.push(CreateElement(accrdPanObjs));
        accordionObject.push("</div>");
        accordionObject.push("</div>");
        accordionObject.push("</div>");
        accordionObject.push("</div>");

        accordionObject.push("</div>");

        return CreateElement(accordionObject);
    };

    var accordion = CreateAccordion(
        cbId,
        new CBAccordObj(
            cbId,
            cbValue,
            isRequired,
            isEnabled,
            rulesMessage,
            isChecked
        ),
        accordionPanelObject,
        gridCount
    )

    return accordion;
};

function openEmailCBAccordion(id) {
    $(document).ready(function () {
        if ($('#' + id).is(':checked')) {
            console.log("Showing Accordion");
            $('#' + id + "-DDAccordID").collapse('show');

            var thisEl = data.dataList.find(d => d.id === id);
            var childObjArr = [];

            for (var i = 0; i < thisEl.childElementIDs.length; i++) {
                var childId = thisEl.childElementIDs[i].replace(/\s/g, '');

                var child = data.dataList.find(c => c.id === childId);
                child.isEnabled = true;
                childObjArr.push(child);
            }

            $('#' + id + '-DDAccordID').on('shown.bs.collapse', function () {
                console.log("show");

                ApplyControlsPostLoad(childObjArr);
            });

            var containerID = sessionStorage.getItem("contID");

            var containerData =
            {
                id: containerID,
                contextID: id,
                cvID: thisEl.cvid,
                value: "true",
                variableName: !NullOrEmptyCheck(thisEl.variableName) ? thisEl.variableName : "",
                sector: thisEl.pageSuffix,
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
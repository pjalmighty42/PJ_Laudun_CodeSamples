class RadioGroupObj {
    constructor(
        labelObj = "",
        noteObj = "" ,
        isCustom = true,
        accordRGID = "",
        formClassName = "",
        radioLabelClass = "",
        radioInputClass = "",
        isRequired = false,
        isEnabled = true,
        options = [],
        rulesmsg = "",
        answer = ""
    ) {
        this.labelObj = !NullOrEmptyCheck(labelObj) ? labelObj : "";
        this.noteObj = !NullOrEmptyCheck(noteObj) ? noteObj : "";
        this.isCustom = isCustom === true ? true : false;
        this.accordRGID = accordRGID;
        this.formClassName = !NullOrEmptyCheck(formClassName) ? formClassName : "";
        this.radioLabelClass = !NullOrEmptyCheck(radioLabelClass) ? radioLabelClass : "";
        this.radioInputClass = !NullOrEmptyCheck(radioInputClass) ? radioInputClass : "";
        this.isRequired = isRequired === true ? true : false;
        this.isEnabled = isEnabled === true ? true : false;
        this.options = options;
        this.rulseMsg = !NullOrEmptyCheck(rulesmsg) ? rulesmsg.split("|") : "";
        this.answer = !NullOrEmptyCheck(answer) ? answer : "";
    }
}

function AccordionRadioGroupController(
    labelObj,
    noteObj,
    isCustom,
    accordRGID,
    formClassName,
    radioLabelClass,
    radioInputClass,
    isRequired,
    isEnabled,
    options,
    accordionPanelObject,
    answer,
    rulesMessage,
    isPrescription
){
    function CreateAccordionRadioElement(radioGroupObj){
        let radioGroupObject = [];
        let erOutput = EnableAndRequiredCheck(radioGroupObj.isEnabled, radioGroupObj.isRequired);
        let enabledSpan = radioGroupObj.isEnabled === true ? "radiomark" : "radiomark-disabled";

        radioGroupObject.push("<form id='" + radioGroupObj.accordRGID + "' class='" + radioGroupObj.formClassName + "' name='" + radioGroupObj.accordRGID + "-Form'>");

        if (radioGroupObj.isCustom) {
            //If so, create a custom radio <input> 
            for (let i = 0; i < radioGroupObj.options.length; i++) {
                if (radioGroupObj.options[i].value.localeCompare(radioGroupObj.answer) === 0) {
                    let idName = radioGroupObj.accordRGID + (i + 1);

                    radioGroupObject.push("<label id='" + radioGroupObj.accordRGID + "-label' class='" + radioGroupObj.radioLabelClass + "'>" + radioGroupObj.options[i].value);
                    radioGroupObject.push("<input type='radio' id='" + idName + "' class='" + radioGroupObj.radioInputClass + "' name='" + radioGroupObj.accordRGID + "-name' value='" + radioGroupObj.options[i].value + "' onclick='editRulesCheckInput(this.id)' checked " + erOutput + ">")
                    radioGroupObject.push("<span class='" + enabledSpan + "'></span>");
                    radioGroupObject.push("</label>");
                }
                else {
                    let idName = radioGroupObj.accordRGID + (i + 1);

                    radioGroupObject.push("<label id='" + radioGroupObj.accordRGID + "-label' class='" + radioGroupObj.radioLabelClass + "'>" + radioGroupObj.options[i].value);
                    radioGroupObject.push("<input type='radio' id='" + idName + "' class='" + radioGroupObj.radioInputClass + "' name='" + radioGroupObj.accordRGID + "-name' value='" + radioGroupObj.options[i].value + "' onclick='editRulesCheckInput(this.id)' " + erOutput + ">")
                    radioGroupObject.push("<span class='" + enabledSpan + "'></span>" );
                    radioGroupObject.push("</label>");
                }
            }
        }
        else {
            //If not, just create a basic radio <input>
            for (let i = 0; i < radioGroupObj.options.length; i++) {
                if (radioGroupObj.options[i].value.localeCompare(radioGroupObj.answer) === 0) {
                    let idName = radioGroupObj.accordRGID + (i + 1);

                    radioGroupObject.push("<label id='" + radioGroupObj.accordRGID + "-label' class='" + radioGroupObj.radioLabelClass + "'>" + radioGroupObj.options[i].value);
                    radioGroupObject.push("<input type='radio' id='" + idName + "' class='" + radioGroupObj.radioInputClass + "' name='" + radioGroupObj.accordRGID + "-name' value='" + radioGroupObj.options[i].value + "' onclick='editRulesCheckInput(this.id)' checked " + erOutput + ">");
                    radioGroupObject.push("</label>");
                }
                else {
                    let idName = radioGroupObj.accordRGID + (i + 1);

                    radioGroupObject.push("<label id='" + radioGroupObj.accordRGID + "-label' class='" + radioGroupObj.radioLabelClass + "'>" + radioGroupObj.options[i]);
                    radioGroupObject.push("<input type='radio' id='" + idName + "' class='" + radioGroupObj.radioInputClass + "' name='" + radioGroupObj.accordRGID + "-name' value='" + radioGroupObj.options[i].value + "' onclick='editRulesCheckInput(this.id)' " + erOutput + ">");
                    radioGroupObject.push("</label>");
                }
            }
        }
        
        radioGroupObject.push("</form>");

        return CreateElement(radioGroupObject);
    };

    function CreateAccordionRadioElementPrescription(radioGroupObj) {
        let radioGroupObject = [];
        let erOutput = EnableAndRequiredCheck(radioGroupObj.isEnabled, radioGroupObj.isRequired);
        let enabledSpan = radioGroupObj.isEnabled === true ? "radiomark" : "radiomark-disabled";

        radioGroupObject.push("<form id='" + radioGroupObj.accordRGID + "' class='" + radioGroupObj.formClassName + "' name='" + radioGroupObj.accordRGID + "-Form'>");

        if (radioGroupObj.isCustom) {
            //If so, create a custom radio <input> 
            for (let i = 0; i < radioGroupObj.options.length; i++) {
                if (radioGroupObj.options[i].value.localeCompare(radioGroupObj.answer) === 0) {
                    let idName = radioGroupObj.accordRGID + (i + 1);

                    radioGroupObject.push("<label id='" + radioGroupObj.accordRGID + "-label' class='" + radioGroupObj.radioLabelClass + "'>" + radioGroupObj.options[i].value);
                    radioGroupObject.push("<input type='radio' id='" + idName + "' class='" + radioGroupObj.radioInputClass + "' name='" + radioGroupObj.accordRGID + "-name' value='" + radioGroupObj.options[i].value + "' onclick='editRulesCheckInput(this.id)' checked " + erOutput + ">")
                    radioGroupObject.push("<span class='" + enabledSpan + "'></span>");
                    radioGroupObject.push("</label>");
                }
                else {
                    let idName = radioGroupObj.accordRGID + (i + 1);

                    radioGroupObject.push("<label id='" + radioGroupObj.accordRGID + "-label' class='" + radioGroupObj.radioLabelClass + "'>" + radioGroupObj.options[i].value);
                    radioGroupObject.push("<input type='radio' id='" + idName + "' class='" + radioGroupObj.radioInputClass + "' name='" + radioGroupObj.accordRGID + "-name' value='" + radioGroupObj.options[i].value + "' onclick='editRulesCheckInput(this.id)' " + erOutput + ">")
                    radioGroupObject.push("<span class='" + enabledSpan + "'></span>");
                    radioGroupObject.push("</label>");
                }
            }
        } else {
            //If not, just create a basic radio <input>
            for (let i = 0; i < radioGroupObj.options.length; i++) {
                if (radioGroupObj.options[i].value.localeCompare(radioGroupObj.answer) === 0) {
                    let idName = radioGroupObj.accordRGID + (i + 1);

                    radioGroupObject.push("<label id='" + radioGroupObj.accordRGID + "-label' class='" + radioGroupObj.radioLabelClass + "'>" + radioGroupObj.options[i].value);
                    radioGroupObject.push("<input type='radio' id='" + idName + "' class='" + radioGroupObj.radioInputClass + "' name='" + radioGroupObj.accordRGID + "-name' value='" + radioGroupObj.options[i].value + "' onclick='editRulesCheckInput(this.id)' checked " + erOutput + ">");
                    radioGroupObject.push("</label>");
                }
                else {
                    let idName = radioGroupObj.accordRGID + (i + 1);

                    radioGroupObject.push("<label id='" + radioGroupObj.accordRGID + "-label' class='" + radioGroupObj.radioLabelClass + "'>" + radioGroupObj.options[i]);
                    radioGroupObject.push("<input type='radio' id='" + idName + "' class='" + radioGroupObj.radioInputClass + "' name='" + radioGroupObj.accordRGID + "-name' value='" + radioGroupObj.options[i].value + "' onclick='editRulesCheckInput(this.id)' " + erOutput + ">");
                    radioGroupObject.push("</label>");
                }
            }
        }

        radioGroupObject.push("</form>");

        return CreateElement(radioGroupObject);
    };

    let newRGObj = new RadioGroupObj(
        labelObj,
        noteObj,
        isCustom,
        accordRGID,
        formClassName,
        radioLabelClass,
        radioInputClass,
        isRequired,
        isEnabled,
        options,
        rulesMessage,
        answer
    );

    let accordion = "";

    //This will create the actual Accordion element (trigger plus the items that will open on trigger)
    function CreateAccordion(
        accordRGID,
        labelObj,
        noteObj,
        radioGroupObj,
        accordionPanelObject,
        isPresc
    ){
        let accordionObject = [];
        let reqText = "";

        if (newRGObj.rulseMsg.length > 0) {
            reqText = AlertController(newRGObj.rulseMsg[0], newRGObj.rulseMsg[1]);
        }

        accordionObject.push("<div id='" + accordRGID + "-div' class='col-md-12'>");

        //If a Label is needed, create a Label 
        accordionObject.push(labelObj);
        //If a Sub-Title/Note is needed, create a Sub-Title/Note
        accordionObject.push(noteObj);
        accordionObject.push("<div id='" + accordRGID + "-alertDiv'>" + reqText + "</div>");

        accordionObject.push("<div id='" + accordRGID + "-ParentID'>");
        accordionObject.push("<div class='card'>");
        accordionObject.push("<div class='card-header'>");

        if (isPresc) {
            accordionObject.push(CreateAccordionRadioElementPrescription(radioGroupObj));
        }
        else {
            accordionObject.push(CreateAccordionRadioElement(radioGroupObj));
        }

        let accrdPanObjs = [];

        if (typeof accordionPanelObject === "string") {
            accrdPanObjs.push(accordionPanelObject);
        }
        else if (typeof accordionPanelObject !== 'undefined'){
            for (var apo = 0; apo < accordionPanelObject.length; apo++) {
                if (typeof accordionPanelObject[apo].childElsArr !== 'undefined') {
                    accrdPanObjs.push(CreateTriggerEls(accordionPanelObject[apo]));
                }
                else {
                    accrdPanObjs.push(outputControl(accordionPanelObject[apo]));
                }
            }
        }
        

        accordionObject.push("</div>");
        accordionObject.push("<div id='" + accordRGID + "-RadioAccordID' class='collapse' data-parent='#" + accordRGID + "-ParentID'>");
        accordionObject.push("<div class='card-body'>");
        accordionObject.push(CreateElement(accrdPanObjs));
        accordionObject.push("</div>");
        accordionObject.push("</div>");
        accordionObject.push("</div>");
        accordionObject.push("</div>");

        accordionObject.push("</div>");

        return CreateElement(accordionObject);
    };

    accordion = CreateAccordion(accordRGID, labelObj, noteObj, newRGObj, accordionPanelObject, isPrescription);


    return accordion;
};

function ApplyRBGAccord(data) {
    var triggerVal = data.responses.find(r => r.isTrigger === true);

    function AccordionCollapseSwitchRadio(
        optionPrefix,
        accordionID,
        switchElNum,
        answer
    ) {
        $(document).ready(function () {
            console.log("DropDown Accordion Created! Current params: OptPrefix= " + optionPrefix + " AccordID=" + accordionID + " SwitchNum=" + switchElNum);
            //This will combine the prefix and the trigger number for the <input> 
            //(E.g. - Prefix = Radio and Trigger Number = 1, will end up being "Radio1" being the triggering element)
            var triggerElement = optionPrefix + switchElNum.seqNum;

            //If the trigger element ID matches the trigger element, show the accordion
            console.log("Trigger El = " + triggerElement);

            if ($('#' + triggerElement).is(':checked') || answer.localeCompare(switchElNum.value) === 0) {
                console.log("Showing Accordion");
                $('#' + accordionID).collapse('show');
            }
            else {
                console.log("Hiding Accordion");
                $('#' + accordionID).collapse('hide');
            }

            $("input[name~='" + optionPrefix + "-name']").change(function (e) {
                if (e.target.id === triggerElement) {

                    console.log("DropDown Accordion On! Current params: TarID=" + e.target.id + " TriggerEl= " + triggerElement + " ElementID=" + e.target.id + " AccordionID=" + accordionID);
                    console.log("Showing Accordion");
                    $('#' + accordionID).collapse('show');
                }
                else {
                    console.log("DropDown Accordion Off! Current params: TarID=" + e.target.id + " TriggerEl= " + triggerElement + " ElementID=" + e.target.id + " AccordionID=" + accordionID);
                    console.log("Hiding Accordion");
                    $('#' + accordionID).collapse('hide');
                }
            });
        });
    };

    if (typeof triggerVal !== 'undefined') {
        AccordionCollapseSwitchRadio(data.id, data.id + "-RadioAccordID", triggerVal, data.answer);
    }
    
}
class DropDownGroupObj {
    constructor(
        labelObj = "",
        noteObj = "",
        selectIdName = "",
        selectClassName = "",
        optionsClassName = "",
        isRequired = false,
        isEnabled = true,
        options = [],
        triggerVal = "",
        answer = "",
        rulesmsg = "",
        contextVal = ""
    ) {
        this.selectIdName = selectIdName;
        this.options = options;
        this.triggerVal = triggerVal;
        this.answer = answer;
        this.labelObj = !NullOrEmptyCheck(labelObj) ? labelObj : "";
        this.noteObj = !NullOrEmptyCheck(noteObj) ? noteObj : "";
        this.selectClassName = !NullOrEmptyCheck(selectClassName) ? "class='" + selectClassName + "'" : "";
        this.optionsClassName = !NullOrEmptyCheck(optionsClassName) ? "class='" + optionsClassName + "'" : "";
        this.isRequired = !NullOrEmptyCheck(isRequired) && isRequired === true ? true : false;
        this.isEnabled = isEnabled === true ? true : false;
        this.rulseMsg = !NullOrEmptyCheck(rulesmsg) ? rulesmsg.split("|") : "";
        this.contextValue = !NullOrEmptyCheck(contextVal) ? contextVal : "";
    }
}

function AccordionDropDownGroupController(
    labelComp,
    noteComp,
    selectIdName,
    selectClassName,
    optionsClassName,
    isRequired,
    isEnabled,
    options,
    triggerVal,
    accordionPanelObject,
    answer,
    contextVal,
    rulesMessage,
    gridCount
){
    //This will create the DropDown element (aka- the trigger for the Accordion)
    function CreateDDGDropdownElement(dropDownGroupObj){
        let dropdownobject = [];
        let erOutput = EnableAndRequiredCheck(dropDownGroupObj.isEnabled, dropDownGroupObj.isRequired);

        dropdownobject.push("<select id='" + dropDownGroupObj.selectIdName + "-DropDownSel' " + dropDownGroupObj.selectClassName + " onchange='rulesCheckDropdownTriggerEl(this)' " + erOutput + ">");
        
        //Add the passed options list
        for (let i = 0; i < dropDownGroupObj.options.length; i++) {
            if (i === dropDownGroupObj.triggerVal) {
                if (dropDownGroupObj.options[i].value.localeCompare(dropDownGroupObj.answer) === 0) {
                    dropdownobject.push("<option " + dropDownGroupObj.optionsClassName + " is-trigger='true' selected>" + dropDownGroupObj.options[i].value + "</option>");
                }
                else {
                    dropdownobject.push("<option " + dropDownGroupObj.optionsClassName + " is-trigger='true'>" + dropDownGroupObj.options[i].value + "</option>");
                }
            }
            else {
                if (dropDownGroupObj.options[i].value.localeCompare(dropDownGroupObj.answer) === 0) {
                    dropdownobject.push("<option " + dropDownGroupObj.optionsClassName + " is-trigger='false' selected>" + dropDownGroupObj.options[i].value + "</option>");
                }
                else {
                    dropdownobject.push("<option " + dropDownGroupObj.optionsClassName + " is-trigger='false'>" + dropDownGroupObj.options[i].value + "</option>");
                }
            }
        }

        dropdownobject.push("</select>");

        //Assign to variable
        return dropdownobject;
    };

    let accordion = "";

    function CreateAccordion (selectIdName, labelComp, noteComp, ddgObj, accordPanelObj, gridCount){
        //This will create the actual Accordion element (trigger plus the items that will open on trigger)
        let accordionObject = [];
        let reqText = "";

        if (ddgObj.rulseMsg.length > 0) {
            reqText = AlertController(ddgObj.rulseMsg[0], ddgObj.rulseMsg[1]);
        }

        //Else create the Accordion
        accordionObject.push("<div id='" + selectIdName + "-div' class='" + gridCount + "'>");

        //If a Label is needed, create a Label 
        accordionObject.push(labelComp);

        //If a Sub-Title/Note is needed, create a Sub-Title/Note
        accordionObject.push(noteComp);

        accordionObject.push("<div id='" + selectIdName + "-alertDiv'>" + reqText + "</div>");

        let accrdPanObjs = [];

        for (var apo = 0; apo < accordPanelObj.length; apo++) {
            if (typeof accordPanelObj[apo].childElsArr !== 'undefined') {
                accrdPanObjs.push(CreateTriggerEls(accordPanelObj[apo]));
            }
            else {
                accrdPanObjs.push(outputControl(accordPanelObj[apo]));
            }
        }

        accordionObject.push("<div id='" + selectIdName + "-ParentID'>");
        accordionObject.push("<div class='card'>");
        accordionObject.push("<div class='card-header'>");
        accordionObject.push(CreateDDGDropdownElement(ddgObj));
        accordionObject.push("</div>");
        accordionObject.push("<div id='" + selectIdName + "-DDAccordID' class ='collapse' data-parent='#" + selectIdName + "-ParentID'>");
        accordionObject.push("<div class='card-body'>");
        accordionObject.push(CreateElement(accrdPanObjs));
        accordionObject.push("</div>");
        accordionObject.push("</div>");
        accordionObject.push("</div>");
        accordionObject.push("</div>");

        accordionObject.push("</div>");

        return CreateElement(accordionObject);
    };

    accordion = CreateAccordion(
        selectIdName,
        labelComp,
        noteComp,
        new DropDownGroupObj(
            labelComp,
            noteComp,
            selectIdName,
            selectClassName,
            optionsClassName,
            isRequired,
            isEnabled,
            options,
            triggerVal,
            answer,
            rulesMessage,
            contextVal
        ),
        accordionPanelObject,
        gridCount);

    //AccordionCollapseSwitchDropDown(triggerVal, selectIdName, selectIdName + "-DropDownSel", selectIdName + "-DDAccordID");

    return accordion;
};

function ApplyDDLAccord(data) {
    function AccordionCollapseSwitchDropDown(
        dropDownID,
        accordionID
    ) {
        $(document).ready(function () {

            var selOpt = $("#" + dropDownID + " option:selected");

            var isTrigger = selOpt.attr('is-trigger') === 'true' ? true : false;

            if (isTrigger) {
                $("#" + accordionID).collapse('show');
            }
            else {
                $("#" + accordionID).collapse('hide');
            }

        });
    };

    AccordionCollapseSwitchDropDown(data.id + "-AccorDDLSel-DropDownSel", data.id + "-AccorDDLSel-DDAccordID");
}
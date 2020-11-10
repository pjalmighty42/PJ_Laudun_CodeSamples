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

const AccordionDropDownGroupController = (
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
) => {
    //This will create the DropDown element (aka- the trigger for the Accordion)
    const CreateropdownElement = (dropDownGroupObj) => {
        let erOutput = EnableAndRequiredCheck(dropDownGroupObj.isEnabled, dropDownGroupObj.isRequired);

        let optionOut = dropDownGroupObj.options.map((d, i) => {
            if(i === dropDownGroupObj.triggerVal){ //Output for trigger options (options that could enable/open other controls)
                if(d.value.localeCompare(dropDownGroupObj.answer) === 0){
                    return `<option ${dropDownGroupObj.optionsClassName} is-trigger='true' selected>${d.value}</option>`;
                }
                else{
                    return `<option ${dropDownGroupObj.optionsClassName} is-trigger='true'>${d.value}</option>`;
                }
            }
            else{
                //Else output for normal options (options that do no trigger anything)
                if(d.value.localeCompare(dropDownGroupObj.answer) === 0){
                    return `<option ${dropDownGroupObj.optionsClassName} is-trigger='false' selected>${d.value}</option>`;
                }
                else{
                    return `<option ${dropDownGroupObj.optionsClassName} is-trigger='false'>${d.value}</option>`;
                }
            }
        });

        return `<select id='${dropDownGroupObj.selectIdName}-DropDownSel' ${dropDownGroupObj.selectClassName} onchange='rulesCheckDropdownTriggerEl(this)' ${erOutput}>
                ${optionOut}
                </select>`;
    };

    let accordion = "";

    const CreateAccordion = (selectIdName, labelComp, noteComp, ddgObj, accordPanelObj, gridCount) => {
        //This will create the actual Accordion element (trigger plus the items that will open on trigger)
        let reqText = "";

        if (ddgObj.rulseMsg.length > 0) {
            reqText = AlertController(ddgObj.rulseMsg[0], ddgObj.rulseMsg[1]);
        }

        let accrdPanObjs = [];

        for (var apo = 0; apo < accordPanelObj.length; apo++) {
            if (typeof accordPanelObj[apo].childElsArr !== 'undefined') {
                accrdPanObjs.push(CreateTriggerEls(accordPanelObj[apo]));
            }
            else {
                accrdPanObjs.push(outputControl(accordPanelObj[apo]));
            }
        }

        let ddEl = CreateropdownElement(ddgObj);

        return `<div id='${selectIdName}-div' class='${gridCount}'>
                    ${labelComp}
                    ${noteComp}
                    <div id='${selectIdName}-ParentID'>
                        <div id='${selectIdName}-alertDiv'>${reqText}</div>
                            <div class='card'>
                                <div class='card-header'>
                                ${ddEl}
                                </div>
                                <div id='${selectIdName}-DDAccordID' class ='collapse' data-parent='#${selectIdName}-ParentID'>
                                    <div class='card-body'>
                                        ${accrdPanObjs}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
    };

    return CreateAccordion(
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

};

const ApplyDDLAccord = (data) => {
    const AccordionCollapseSwitchDropDown = (
        dropDownID,
        accordionID
    ) => {
        $(document).ready(function () {

            let selOpt = $("#" + dropDownID + " option:selected");

            let isTrigger = selOpt.attr('is-trigger') === 'true' ? true : false;

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
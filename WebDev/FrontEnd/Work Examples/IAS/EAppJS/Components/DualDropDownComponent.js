class DualDDGroupObj {
    constructor(
        selAnswer = "",
        selectIdName = "",
        selectClassName = "",
        optionsClassName = "",
        isRequired = false,
        isEnabled = true,
        options = [],
        triggerVals = [],
        contextVal = "",
        rulesmsg = "",
        gridCount = ""
    ) {
        this.selAnswer = !NullOrEmptyCheck(selAnswer) ? selAnswer : "";
        this.selectIdName = selectIdName;
        this.selectClassName = selectClassName !== "" ? selectClassName : "";
        this.optionsClassName = optionsClassName !== "" ? optionsClassName : "";
        this.isRequired = isRequired === true ? true : false;
        this.isEnabled = isEnabled === false ? true : false;
        this.triggerVal = triggerVals;
        this.contextValue = !NullOrEmptyCheck(contextVal) ? ReturnPureContextValue(contextVal) : "";
        this.gridCount = gridCount;
        this.options = options;
        this.rulseMsg = !NullOrEmptyCheck(rulesmsg) ? rulesmsg.split("|") : "";
        this.accordDDLID = selectIdName + "-DDAccordID";
    }
}

function DualDropDownAccordionController(
    labelObj,
    noteObj,
    selAnswer,
    selectIdName,
    selectClassName,
    optionsClassName,
    isRequired,
    isEnabled,
    options,
    triggerVals,
    answers,
    contextVal,
    rulesMessage,
    gridCount
){
    function CreateDualDDGDropdownElement(dropDownGroupObj){
        let dropdownobject = [];
        let erOutput = EnableAndRequiredCheck(dropDownGroupObj.isEnabled, dropDownGroupObj.isRequired);

        dropdownobject.push("<select id='" + dropDownGroupObj.selectIdName + "-DropDownSel' class='" + dropDownGroupObj.selectClassName + "' onchange='rulesCheckDropdownTriggerEl(this)' " + erOutput + ">");

        //Add the passed options list
        for (var i = 0; i < dropDownGroupObj.options.length; i++) {
            if (dropDownGroupObj.options[i].isTrigger === true)  {
                dropdownobject.push("<option class='" + dropDownGroupObj.optionsClassName + "' is-trigger='true' sequence-number='" + dropDownGroupObj.options[i].seqNum + "' accord-id='" + dropDownGroupObj.accordDDLID + "' selected>" + dropDownGroupObj.options[i].value + "</option>");
            }
            else {
                dropdownobject.push("<option class='" + dropDownGroupObj.optionsClassName + "' is-trigger='false' sequence-number='" + dropDownGroupObj.options[i].seqNum + "' accord-id='" + dropDownGroupObj.accordDDLID + "'>" + dropDownGroupObj.options[i].value + "</option>");
            }
        }

        dropdownobject.push("</select>");

        //Assign to variable
        return dropdownobject;
    };

    let newDualDDObj = new DualDDGroupObj(
        selAnswer,
        selectIdName,
        selectClassName,
        optionsClassName,
        isRequired,
        isEnabled,
        options,
        triggerVals,
        contextVal,
        rulesMessage,
        gridCount
    );

    let dualDDLAccordion = "";

    function CreateDualDDLAccordion(selectIdName, labelComp, noteComp, duelDDLObj, gridCount) {
        let sortedAnswersList = [];

        siteItemStorage.dualDDLStore.answerList = [];

        //Go through the child elements
        for (let a = 0; a < answers.length; a++) {
            //Go through those, create the controls, and separate by triggerVal number
            // Will output: { seqNum: 1, control: <html>Control</html>}
            let accordOpts;

            if (typeof answers[a].accordionOptions !== 'undefined') {
                accordOpts = answers[a].accordionOptions.split("_");

                switch (answers[a].controlType) {
                    case "date":
                    case "ssn":
                    case "phone":
                        for (let r = 0; r < accordOpts.length; r++) {
                            sortedAnswersList.push({
                                "id": answers[a].id,
                                "controlType": answers[a].controlType,
                                "answer": answers[a].answer,
                                "seqNum": parseInt(accordOpts[r]),
                                "control": outputControl(answers[a])
                            });
                        }
                        break;
                    default:
                        for (let r = 0; r < accordOpts.length; r++) {
                            sortedAnswersList.push({
                                "seqNum": parseInt(accordOpts[r]),
                                "control": outputControl(answers[a])
                            });
                        }
                    break;
                }
                
            }
            else {
                accordOpts = answers[a].triggerObj.accordionOptions.split("_");

                for (let r = 0; r < accordOpts.length; r++) {
                    sortedAnswersList.push({
                        "id": answers[a].triggerObj.id,
                        "responses": answers[a].triggerObj.responses,
                        "triggerType": answers[a].triggerObj.triggerType,
                        "seqNum": parseInt(accordOpts[r]),
                        "control": CreateTriggerEls(answers[a], "col-sm-12 col-md-6 col-lg-6")
                    });
                }
            }
        }

        siteItemStorage.dualDDLStore.answerList = sortedAnswersList;

        let accordionObject = [];
        let reqText = "";

        if (inputObj.rulseMsg.length > 0) {
            reqText = AlertController(inputObj.rulseMsg[0], inputObj.rulseMsg[1]);
        }


        accordionObject.push("<div id='" + selectIdName + "-div' class='" + gridCount + "'>");

        //If a Label is needed, create a Label 
        accordionObject.push(labelComp);

        //If a Sub-Title/Note is needed, create a Sub-Title/Note
        accordionObject.push(noteComp);

        accordionObject.push("<div id='" + selectIdName + "-alertDiv'>" + reqText + "</div>");

        accordionObject.push("<div id='" + selectIdName + "-ParentID'>");
        accordionObject.push("<div class='card'>");
        accordionObject.push("<div class='card-header'>");
        accordionObject.push(CreateDualDDGDropdownElement(duelDDLObj));
        accordionObject.push("</div>");
        accordionObject.push("<div id='" + selectIdName + "-DDAccordID' class ='collapse' data-parent='#" + selectIdName + "-ParentID'>");
        accordionObject.push("<div class='card-body'>");
        accordionObject.push("</div>");
        accordionObject.push("</div>");
        accordionObject.push("</div>");
        accordionObject.push("</div>");

        accordionObject.push("</div>");

        return CreateElement(accordionObject);
    };

    dualDDLAccordion = CreateDualDDLAccordion(selectIdName, labelObj, noteObj, newDualDDObj, gridCount);

    return dualDDLAccordion;
};

function ApplyDualDDLAccord(data) {
    $(document).ready(function () {
        var triggerSeqVals = [];

        for (let r = 0; r < data.responses.length; r++) {
            if (data.responses[r].isTrigger) {
                triggerSeqVals.push(data.responses[r].seqNum);
            }
        }

        function AutoOpenDDL(selectID, accordID) {
                console.log("AutoOpenDDL");

                //Get the list of options by <select> ID
                var selOpt = $("#" + selectID + " option:selected");
                console.log(selOpt);

                //Create the body elements
                var cardBodyArr = [];
                var cardBody = "";

                var dualDDLItems = siteItemStorage.dualDDLStore.answerList;

                var selSeqNum = parseInt(selOpt.attr("sequence-number"));
                for (var a = 0; a < dualDDLItems.length; a++) {
                    if (dualDDLItems[a].seqNum === selSeqNum) {
                        cardBodyArr.push(dualDDLItems[a]);
                    }
                }

                //Finally show the accordion if there are any child els
                if (cardBodyArr.length > 0) {
                    $('#' + accordID).collapse('show');

                    $('#' + accordID + " .card-body").fadeOut("fast", function () {
                        $('#' + accordID + " .card-body").empty();

                        var bodyArrOut = [];

                        for (var cbc = 0; cbc < cardBodyArr.length; cbc++) {
                            bodyArrOut.push(cardBodyArr[cbc].control);
                        }

                        cardBody = CreateElement(bodyArrOut);

                        console.log("Showing Accordion");
                        $('#' + accordID + " .card-body").append(cardBody);

                        UpdateDualAccordionElements(cardBodyArr);
                       
                    });

                    $('#' + accordID + " .card-body").fadeIn("fast");
                }
        };

        AutoOpenDDL(data.id + '-DropDownSel', data.id + '-DDAccordID');

    });
}
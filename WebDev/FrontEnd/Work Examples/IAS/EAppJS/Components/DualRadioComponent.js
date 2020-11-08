class DualRadioObj {
    constructor(
        selAnswer = "",
        isCustom = true,
        accordRGID = "",
        formClassName = "",
        radioLabelClass = "",
        radioInputClass = "",
        isRequired = false,
        isEnabled = true,
        options = [],
        triggerVals = [],
        contextVal = "",
        rulesmsg = "",
        gridCount = ""
    ) {
        this.selAnswer = !NullOrEmptyCheck(selAnswer) ? selAnswer : "";
        this.isCustom = isCustom === true ? true : false;
        this.accordRGID = accordRGID;
        this.formClassName = !NullOrEmptyCheck(formClassName) ? formClassName : "";
        this.radioLabelClass = !NullOrEmptyCheck(radioLabelClass) ? radioLabelClass : "";
        this.radioInputClass = !NullOrEmptyCheck(radioInputClass) ? radioInputClass : "";
        this.isRequired = isRequired === true ? true : false;
        this.isEnabled = isEnabled === true ? true : false;
        this.triggerVals = triggerVals;
        this.contextVal = !NullOrEmptyCheck(contextVal) ? contextVal : "";
        this.gridCount = gridCount;
        this.rulseMsg = !NullOrEmptyCheck(rulesmsg) ? rulesmsg.split("|") : "";
        this.options = options;
    }
}


function DualRadioAccordionController(
    labelObj,
    noteObj,
    selAnswer,
    isCustom,
    accordRGID,
    formClassName,
    radioLabelClass,
    radioInputClass,
    isRequired,
    isEnabled,
    options,
    triggerVals,
    answers,
    contextVal,
    rulesMessage,
    gridCount
){
    let newDualRGObj = new DualRadioObj(
        selAnswer,
        isCustom,
        accordRGID,
        formClassName,
        radioLabelClass,
        radioInputClass,
        isRequired,
        isEnabled,
        options,
        triggerVals,
        contextVal,
        rulesMessage,
        gridCount
    );

    let dualRGAccord = "";

    function CreateDualRadioButtonGroupElement (radioGroupObj){
        let radioGroupObject = [];
        let erOutput = EnableAndRequiredCheck(radioGroupObj.isEnabled, radioGroupObj.isRequired);
        let enabledSpan = radioGroupObj.isEnabled === true ? "radiomark" : "radiomark-disabled";

        radioGroupObject.push("<form id='" + radioGroupObj.accordRGID + "' class='" + radioGroupObj.formClassName + "' name='" + radioGroupObj.accordRGID + "-Form'>");

        if (radioGroupObj.isCustom) {
            for (let i = 0; i < radioGroupObj.options.length; i++) {
                if (radioGroupObj.options[i].value.localeCompare(radioGroupObj.selAnswer) === 0) {
                    let idName = radioGroupObj.accordRGID + (i + 1);

                    radioGroupObject.push("<label id='" + radioGroupObj.accordRGID + "-label' class='" + radioGroupObj.radioLabelClass + "'>" + radioGroupObj.options[i].value);
                    radioGroupObject.push("<input type='radio' id='" + idName + "' class='" + radioGroupObj.radioInputClass + "' name='" + radioGroupObj.accordRGID + "-name' data-sequence-number='" + radioGroupObj.options[i].seqNum + "' value='" + radioGroupObj.options[i].value + "' onclick='AccordionCardSwitcher(this.id)' checked " + erOutput + ">");
                    radioGroupObject.push("<span class='" + enabledSpan + "'></span>");
                    radioGroupObject.push("</label>");
                }
                else {
                    let idName = radioGroupObj.accordRGID + (i + 1);

                    radioGroupObject.push("<label id='" + radioGroupObj.accordRGID + "-label' class='" + radioGroupObj.radioLabelClass + "'>" + radioGroupObj.options[i].value);
                    radioGroupObject.push("<input type='radio' id='" + idName + "' class='" + radioGroupObj.radioInputClass + "' name='" + radioGroupObj.accordRGID + "-name' data-sequence-number='" + radioGroupObj.options[i].seqNum + "' value='" + radioGroupObj.options[i].value + "' onclick='AccordionCardSwitcher(this.id)' " + erOutput+ ">");
                    radioGroupObject.push("<span class='" + enabledSpan + "'></span>");
                    radioGroupObject.push("</label>");
                }
            }
        }
        else {
            for (let i = 0; i < radioGroupObj.options.length; i++) {
                if (radioGroupObj.options[i].value.localeCompare(radioGroupObj.selAnswer) === 0) {
                    let idName = radioGroupObj.accordRGID + (i + 1);

                    radioGroupObject.push("<label id='" + radioGroupObj.accordRGID + "-label' class='" + radioGroupObj.radioLabelClass + "'>" + radioGroupObj.options[i].value);
                    radioGroupObject.push("<input type='radio' input-type='radio_accordion' id='" + idName + "' class='" + radioGroupObj.radioInputClass + "' name='" + radioGroupObj.accordRGID + "-name' data-sequence-number='" + radioGroupObj.options[i].seqNum + "' data-accord-id='" + accordID + "' value='" + radioGroupObj.options[i].value + "' onclick='AccordionCardSwitcher(this.id)' checked " + erOutput + ">");
                    radioGroupObject.push("</label>");
                }
                else {
                    let idName = radioGroupObj.accordRGID + (i + 1);

                    radioGroupObject.push("<label id='" + radioGroupObj.accordRGID + "-label' class='" + radioGroupObj.radioLabelClass + "'>" + radioGroupObj.options[i]);
                    radioGroupObject.push("<input type='radio' input-type='radio_accordion' id='" + idName + "' class='" + radioGroupObj.radioInputClass + "' name='" + radioGroupObj.accordRGID + "-name' data-sequence-number='" + radioGroupObj.options[i].seqNum + "' data-accord-id='" + accordID + "'  value='" + radioGroupObj.options[i].value + "' onclick='AccordionCardSwitcher(this.id)' " + erOutput + ">");
                    radioGroupObject.push("</label>");
                }
            }
        }

        radioGroupObject.push("</form>");

        return CreateElement(radioGroupObject);
    };

    function CreateDualRGBAccordion(
        accordRGID,
        labelObj,
        noteObj,
        gridCount,
        answers
    ){
       
        var thisRBG = [];

        //Go through the trigger vals
        for (let a = 0; a < answers.length; a++) {
            //Go through those, create the controls, and separate by triggerVal number
            let accordOpts;

            if (typeof answers[a].accordionOptions !== 'undefined') {
                accordOpts = answers[a].accordionOptions.split("_");

                switch (answers[a].controlType) {
                    case "date":
                    case "ssn":
                    case "phone":
                        for (let r = 0; r < accordOpts.length; r++) {
                            thisRBG.push({
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
                            thisRBG.push({
                                "id": answers[a].id,
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
                    thisRBG.push({
                            "id": answers[a].triggerObj.id,
                            "responses": answers[a].triggerObj.responses,
                            "triggerType": answers[a].triggerObj.triggerType,
                            "seqNum": parseInt(accordOpts[r]),
                            "control": CreateTriggerEls(answers[a], "col-sm-12 col-md-6 col-lg-6")
                    });
                }
            }
        }

        siteItemStorage.dualRBGStore.push({ id: accordRGID, answerList: thisRBG });

        let accordionObject = [];
        let reqText = "";

        if (newDualRGObj.rulseMsg.length > 0) {
            reqText = AlertController(newDualRGObj.rulseMsg[0], newDualRGObj.rulseMsg[1]);
        }

        accordionObject.push("<div id='" + accordRGID + "-div' class='" + gridCount + "'>");

        //If a Label is needed, create a Label 
        accordionObject.push(labelObj);
        accordionObject.push("<div id='" + accordRGID + "-alertDiv'>" + reqText + "</div>");
        //If a Sub-Title/Note is needed, create a Sub-Title/Note
        accordionObject.push(noteObj);

        accordionObject.push("<div id='" + accordRGID + "-ParentID'>");
        accordionObject.push("<div class='card'>");
        accordionObject.push("<div class='card-header'>");
        accordionObject.push(CreateDualRadioButtonGroupElement(newDualRGObj));
        accordionObject.push("</div>");
        accordionObject.push("<div id='" + accordRGID + "-RadioAccordID' class ='collapse' data-parent='#" + accordRGID + "-ParentID'>");
        accordionObject.push("<div class='card-body'>");
        accordionObject.push("</div>");
        accordionObject.push("</div>");
        accordionObject.push("</div>");
        accordionObject.push("</div>");

        accordionObject.push("</div>");

        return CreateElement(accordionObject);
    };

    dualRGAccord = CreateDualRGBAccordion(accordRGID, labelObj, noteObj, gridCount, answers, isRequired);

    AutoOpenRGB(accordRGID, selAnswer);

    return dualRGAccord;
};


function AccordionCardSwitcher(id) {
    $(document).ready(function () {
        var item = $("#" + id);

        var trueId = id.substring(0, id.length - 1);

        var seqNum = parseInt(!NullOrEmptyCheck($(item).attr('data-sequence-number')) ? $(item).attr('data-sequence-number') : null);
        var accordID = trueId + "-RadioAccordID";

        var cardBodyArr = [];
        var selBodyIDs = [];
        var cardBody = "";

        var dualDDLItems = siteItemStorage.dualRBGStore.find(i => i.id === trueId).answerList;

        for (var a = 0; a < dualDDLItems.length; a++) {
            if (dualDDLItems[a].seqNum === seqNum) {
                if (typeof dualDDLItems[a].id !== "undefined") {
                    selBodyIDs.push(dualDDLItems[a].id);
                    var distinctArr = [...new Set(selBodyIDs)];
                    siteItemStorage.dualRBGOpenedIDs = distinctArr;
                }
                
                cardBodyArr.push(dualDDLItems[a].control);
            }
        }

        if (cardBodyArr.length > 0) {
            $('#' + accordID).collapse('show');

            $('#' + accordID + " .card-body").fadeOut("fast", function () {
                $('#' + accordID + " .card-body").empty();

                cardBody = CreateElement(cardBodyArr);

                console.log("Showing Accordion");
                $('#' + accordID + " .card-body").append(cardBody);
            });

            $('#' + accordID + " .card-body").fadeIn("fast");
        }
        else {
            $('#' + accordID).collapse('hide');
            $('#' + accordID + " .card-body").empty();
        }

        editRulesCheckInput(id.toString());
    });
};

function ApplyDualRBGAccord(data) {

    var triggerSeqVals = [];

    for (let r = 0; r < data.responses.length; r++) {
        if (data.responses[r].isTrigger) {
            triggerSeqVals.push(data.responses[r].seqNum);
        }
    }

    if (triggerSeqVals.length > 0) {
        AutoOpenRGB(data.id, triggerSeqVals);
    }
}

function AutoOpenRGB(
    accordID,
    answers
) {
    $(document).ready(function () {
        if (Array.isArray(answers) === true) {
            for (var a = 0; a < answers.length; a++) {
                //create the control ID
                var controlID = accordID + answers[a].toString();
                var item = $('#' + controlID);

                //Check if it's checked
                if (item.is(':checked')) {
                    var thisRBG = siteItemStorage.dualRBGStore.find(d => d.id === accordID);

                    //Use the seqnum to get childEls controls
                    var seqNum = parseInt(item.attr('data-sequence-number'));

                    var cardBodyArr = [];
                    var selBodyIDs = [];
                    var cardBody = "";

                    var dualDDLItems = thisRBG.answerList;

                    for (var a = 0; a < dualDDLItems.length; a++) {
                        if (dualDDLItems[a].seqNum === seqNum) {
                            if (typeof dualDDLItems[a].id !== "undefined") {
                                selBodyIDs.push(dualDDLItems[a].id);
                                var distinctArr = [...new Set(selBodyIDs)];
                                siteItemStorage.dualRBGOpenedIDs = distinctArr;
                            }

                            cardBodyArr.push(dualDDLItems[a].control);
                        }
                    }

                    //Apply it to the Accordion and open it
                    if (cardBodyArr.length > 0) {
                        $('#' + accordID + '-RadioAccordID').collapse('show');

                        $('#' + accordID + "-RadioAccordID .card-body").fadeOut("fast", function () {
                            $('#' + accordID + "-RadioAccordID .card-body").empty();

                            cardBody = CreateElement(cardBodyArr);

                            console.log("Showing Accordion");
                            $('#' + accordID + "-RadioAccordID .card-body").append(cardBody);
                        });

                        $('#' + accordID + "-RadioAccordID .card-body").fadeIn("fast");

                        var childObjArr = [];

                        if (siteItemStorage.dualRBGOpenedIDs.length > 0) {
                            for (var i = 0; i < siteItemStorage.dualRBGOpenedIDs.length; i++) {
                                var child = data.dataList.find(c => c.id === siteItemStorage.dualRBGOpenedIDs[i]);
                                childObjArr.push(child);
                            }
                        }

                        $('#' + accordID + '-RadioAccordID').on('shown.bs.collapse', function () {
                            console.log("show");
                            ApplyControlsPostLoad(childObjArr);
                        });
                    }
                }
            }
        }
        else {
            //create the control ID
            var controlID = data.dataList.find(d => d.id === accordID);
            var item;

            for (var r = 0; r < controlID.responses.length; r++) {
                if (controlID.responses[r].value.localeCompare(answers) === 0) {
                    item = "#" + accordID + controlID.responses[r].seqNum;
                }
            }

            //Check if it's checked
            if ($(item + ':checked')) {
                var thisRBG = siteItemStorage.dualRBGStore.find(d => d.id === accordID);

                //Use the seqnum to get childEls controls
                var seqNum = parseInt($(item).attr('data-sequence-number'));

                var cardBodyArr = [];
                var cardBody = "";

                var dualDDLItems = thisRBG.answerList;

                for (var a = 0; a < dualDDLItems.length; a++) {
                    if (dualDDLItems[a].seqNum === seqNum) {
                        if (typeof dualDDLItems[a].id !== "undefined") {
                            siteItemStorage.dualRBGOpenedIDs.push(dualDDLItems[a].id);
                        }
                        cardBodyArr.push(dualDDLItems[a].control);
                    }
                }

                //Apply it to the Accordion and open it
                if (cardBodyArr.length > 0) {
                    $('#' + accordID + '-RadioAccordID').collapse('hide');

                    $('#' + accordID + "-RadioAccordID .card-body").fadeOut("fast", function () {
                        $('#' + accordID + "-RadioAccordID .card-body").empty();

                        cardBody = CreateElement(cardBodyArr);

                        console.log("Showing Accordion");
                        $('#' + accordID + "-RadioAccordID .card-body").append(cardBody);
                    });

                    $('#' + accordID + "-RadioAccordID .card-body").fadeIn("fast");

                    var childObjArr = [];

                    if (siteItemStorage.dualRBGOpenedIDs.length > 0) {
                        for (var i = 0; i < siteItemStorage.dualRBGOpenedIDs.length; i++) {
                            var child = data.dataList.find(c => c.id === siteItemStorage.dualRBGOpenedIDs[i]);
                            childObjArr.push(child);
                        }
                    }

                    $('#' + accordID + '-RadioAccordID').on('shown.bs.collapse', function () {
                        console.log("show");
                        ApplyControlsPostLoad(childObjArr);
                    });
                }
            }
        }
        //Loop through all triggers, if one is checked, open it
    });
};

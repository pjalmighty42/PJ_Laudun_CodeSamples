function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

//Data Object containers
var data = {
    dataList: [],
    controlList: [],
    outputData: [],
    htmlData: [],
    childElArr: [],
    signpadInfo: []
};

function ControlObject(
    suffix,
    id,
    controlType,
    dataType,
    value,
    secondaryVal,
    responses,
    sequence,
    answerVal,
    triggerType,
    childElIDsArr,
    accordOptions,
    isEnabled,
    isRequired,
    rulesMsg,
    gridCount
) {
    this.suffix = !NullOrEmptyCheck(suffix) ? suffix : "";
    this.id = id;
    this.controlType = controlType;
    this.dataType = dataType;
    this.value = value;
    this.secondaryVal = secondaryVal;
    this.responses = responses;
    this.sequence = sequence;
    this.answer = answerVal;
    this.triggerType = triggerType;
    this.childElIDsArr = childElIDsArr;
    this.accordionOptions = accordOptions;
    this.isEnabled = isEnabled;
    this.isRequired = isRequired;
    this.RuleMessage = rulesMsg;
    this.gridCount = gridCount;
};

function TriggerObject(
    obj,
    childElsArr
) {
    this.triggerObj = obj;
    this.childElsArr = childElsArr;
};

function AccordionGenerator (
    triggerType,
    triggerVal,
    triggerSecondVal,
    id,
    responses,
    answer,
    childElBody,
    gridCount,
    isRequired,
    isEnabled,
    rulesMsg
){
    var triggerSplit = triggerType.split("_");

    let requiredIcon = "";

    if (isRequired === true) {
        if (answer.localeCompare("None") === 0 || NullOrEmptyCheck(answer)) {
            requiredIcon = EAppIconController(id, "Response is Required!");
        }
    }

    //First check if the Accordion is a Collapsible Card Group
    if (triggerSplit[0] === "ccg") {
        //If so, create the CCG
        if (!NullOrEmptyCheck(triggerVal)) {

            var childEls = [];
            //Since CCG components will use objects, we need to pass it into array
            for (var i = 0; i < childElBody.length; i++) {
                childEls.push(childElBody[i]);
            }

            siteItemStorage.ccgData.baseCardChildItems.push({ parentID: id, children: childEls });

            var newCCG = CollapsibleGroupCardController(
                id,
                "" ,
                "Item",
                false,
                DropDownController(
                    LabelController(
                        "",
                        "question-label",
                        requiredIcon + " " + ModalSwitchChecker(triggerVal)
                    ),
                    "",
                    id + "_dropdown",
                    "question-dropdown-main",
                    "question-dropdown-option",
                    false,
                    isEnabled,
                    "ccg",
                    ["Please Make a Selection..", 1,2,3,4,5],
                    0,
                    ReturnPureContextValue(triggerVal),
                    "onchange='CollapsibleCardAddCards(this.id)'"
                ),
                id + "-dropdownSel",
                [],
                gridCount,
                isEnabled,
                isRequired
            );

            return CreateElement(newCCG);
        }
    }
    else if (triggerSplit[0] === "accordion") {
        switch (triggerSplit[1]) {
            case "dual":
                //If it's a dual accordion group, figure out what kind and go from there
                var triggerSeqVals = [];

                for (var r = 0; r < responses.length; r++) {
                    if (responses[r].isTrigger) {
                        triggerSeqVals.push(responses[r].seqNum);
                    }
                }

                switch (triggerSplit[2]) {
                    case "rbg":
                        if (!NullOrEmptyCheck(triggerVal)) {
                            if (!NullOrEmptyCheck(triggerSecondVal)) {
                                var newDualRG = DualRadioAccordionController(
                                    LabelController(
                                        "",
                                        "question-label",
                                        requiredIcon + " " + ModalSwitchChecker(triggerVal)
                                    ),
                                    ParagraphController(
                                        "",
                                        "question-info",
                                        ModalSwitchChecker(triggerSecondVal)
                                    ),
                                    answer,
                                    true,
                                    id,
                                    "question-radio-form",
                                    "radio-container",
                                    "question-radio-option",
                                    isRequired,
                                    isEnabled,
                                    responses,
                                    triggerSeqVals,
                                    childElBody,
                                    ReturnPureContextValue(triggerVal),
                                    rulesMsg,
                                    gridCount
                                );

                                return CreateElement(newDualRG);
                            }
                            else {
                                var newDualRG = DualRadioAccordionController(
                                    LabelController(
                                        "",
                                        "question-label",
                                        requiredIcon + " " + ModalSwitchChecker(triggerVal)
                                    ),
                                    "",
                                    answer,
                                    true,
                                    id,
                                    "question-radio-form",
                                    "radio-container",
                                    "question-radio-option",
                                    isRequired,
                                    isEnabled,
                                    responses,
                                    triggerSeqVals,
                                    childElBody,
                                    ReturnPureContextValue(triggerVal),
                                    rulesMsg,
                                    gridCount
                                );

                                return CreateElement(newDualRG);
                            }
                        }
                        break;
                    case "ddl":
                        if (!NullOrEmptyCheck(triggerVal)) {
                            if (!NullOrEmptyCheck(triggerSecondVal)) {
                                var newDualDDL = DualDropDownAccordionController(
                                    LabelController(
                                        "",
                                        "question-label",
                                        requiredIcon + " " + ModalSwitchChecker(triggerVal)
                                    ),
                                    ParagraphController(
                                        "",
                                        "question-info",
                                        ModalSwitchChecker(triggerSecondVal)
                                    ),
                                    answer,
                                    id,
                                    "question-dropdown-main",
                                    "question-dropdown-option",
                                    isRequired,
                                    isEnabled,
                                    responses,
                                    triggerSeqVals,
                                    childElBody,
                                    ReturnPureContextValue(triggerVal),
                                    rulesMsg,
                                    gridCount
                                );

                                return CreateElement(newDualDDL);
                            } else {
                                var newDualDDL = DualDropDownAccordionController(
                                    LabelController(
                                        "",
                                        "question-label",
                                        requiredIcon + " " + ModalSwitchChecker(triggerVal)
                                    ),
                                    "",
                                    answer,
                                    id,
                                    "question-dropdown-main",
                                    "question-dropdown-option",
                                    isRequired,
                                    isEnabled,
                                    responses,
                                    triggerSeqVals,
                                    childElBody,
                                    ReturnPureContextValue(triggerVal),
                                    rulesMsg,
                                    gridCount
                                );

                                return CreateElement(newDualDDL);
                            }
                        }
                        break;
                }
                break;
            case "radio":
                var childEls = [];
                //Since CCG components will use objects, we need to pass it into array
                for (var i = 0; i < childElBody.length; i++) {
                    childEls.push(childElBody[i]);
                }


                var secondVal;
                if (!NullOrEmptyCheck(triggerSecondVal)) {
                    secondVal = ParagraphController(
                        "",
                        "question-info",
                        ModalSwitchChecker(triggerSecondVal)
                    );
                }
                else {
                    secondVal = "";
                }

                var newCBAccord = AccordionRadioGroupController(
                    LabelController(
                        "",
                        "question-label",
                        requiredIcon + " " + ModalSwitchChecker(triggerVal)
                    ),
                    secondVal,
                    true,
                    id,
                    "question-radio-form",
                    "radio-container",
                    "question-radio-option",
                    isRequired,
                    isEnabled,
                    responses,
                    childEls,
                    answer,
                    rulesMsg,
                    false
                );

                return CreateElement(newCBAccord);
            case "cb":
                var pref = id.substring(0, 3);

                console.log(pref);

                /*
                 * var counterObj = siteItemStorage.signingCount.find(d => d.signID === pref);
                 * siteItemStorage.signingCount.push({ signID: pref, ids: [] });
                 * */
                

                var childEls = [];
                //Since CCG components will use objects, we need to pass it into array
                for (var i = 0; i < childElBody.length; i++) {

                    childEls.push(childElBody[i]);
                    //siteItemStorage.signingCount.find(d => d.signID === pref).ids.push(childElBody[i].id);
                }

                var newCBAccord = AccordionCheckboxController(
                    id,
                    triggerVal,
                    triggerSecondVal,
                    isRequired,
                    isEnabled,
                    answer === true ? true : false,
                    childEls,
                    rulesMsg
                );

                return CreateElement(newCBAccord);
            case "fraudbox":
                var pref = id.substring(0, 3);

                console.log(pref);

                /*
                var counterObj = siteItemStorage.signingCount.find(d => d.signID === pref);

                if (!isJSONObjEmpty(counterObj)) {
                    siteItemStorage.signingCount.find(d => d.signID === pref).ids.push(id);
                }
                else {
                    siteItemStorage.signingCount.push({ signID: pref, ids: [] });

                    siteItemStorage.signingCount.find(d => d.signID === pref).ids.push(id);
                }
                */

                var revDocObj = revDocStorer.countList.find(c => c.pref === pref);

                if (!isJSONObjEmpty(revDocObj)) {
                    currDocCountObj = revDocObj.counter;
                }

                var currDocCountObj = revDocStorer.countList.find(c => c.pref === pref);

                if (typeof currDocCountObj !== 'undefined') {
                    if (currDocCountObj.counter === 0) {
                        isEnabled = true;
                    }
                    else {
                        isEnabled = false;
                    }
                }
                else {
                    isEnabled = false;
                }

                var childEls = [];

                //Since CCG components will use objects, we need to pass it into array
                for (var i = 0; i < childElBody.length; i++) {
                    childEls.push(childElBody[i]);
                }

                var newCBAccord = FraudAccordionCheckboxController(
                    id,
                    triggerVal,
                    triggerSecondVal,
                    isRequired,
                    isEnabled,
                    answer === "true" ? true : false,
                    childEls,
                    rulesMsg
                );

                return CreateElement(newCBAccord);
            case "consent":
                var childEls = [];

                //Since CCG components will use objects, we need to pass it into array
                for (var i = 0; i < childElBody.length; i++) {
                    childEls.push(childElBody[i]);
                }

                var newCBAccord = AccordionCheckboxController(
                    id,
                    triggerVal,
                    triggerSecondVal,
                    isRequired,
                    isEnabled,
                    answer === "true" ? true : false,
                    childEls,
                    rulesMsg
                );

                return CreateElement(newCBAccord);
            case "emailbox":
                var pref = id.substring(0, 3);

                console.log(pref);

                /*
                var counterObj = siteItemStorage.signingCount.find(d => d.signID === pref);
                
                if (!isJSONObjEmpty(counterObj)) {
                    siteItemStorage.signingCount.find(d => d.signID === pref).ids.push(id);
                }
                else {
                    siteItemStorage.signingCount.push({ signID: pref, ids: [] });

                    siteItemStorage.signingCount.find(d => d.signID === pref).ids.push(id);
                }
                */

                var currDocCountObj = 0;

                var revDocObj = revDocStorer.countList.find(c => c.pref === pref);

                if (!isJSONObjEmpty(revDocObj)) {
                    if (!NullOrEmptyCheck(revDocObj.counter)) {
                        currDocCountObj = revDocObj.counter;
                    }
                    else {
                        currDocCountObj = 1; //We're doing this cause 1+ will disable this control (Which is what we need if no docs are avail)
                    }
                }

                var childEls = [];

                //Since CCG components will use objects, we need to pass it into array
                for (var i = 0; i < childElBody.length; i++) {
                    childEls.push(childElBody[i]);
                }

                if (currDocCountObj > 0) {
                    isEnabled = false;
                }
                else {
                    isEnabled = true;
                }

                var newCBAccord = AccordionEMailCheckboxController(
                    id,
                    triggerVal,
                    triggerSecondVal,
                    isRequired,
                    isEnabled,
                    answer === "true" ? true : false,
                    childEls,
                    rulesMsg,
                    gridCount
                );

                return CreateElement(newCBAccord);
        }
    }
    else {
        //Else, check if it's a dual accordion group, or a normal one
        if (triggerSplit[1] === "dual") {

            //If it's a dual accordion group, figure out what kind and go from there
            var triggerSeqVals = [];

            for (var r = 0; r < responses.length; r++) {
                if (responses[r].isTrigger) {
                    triggerSeqVals.push(responses[r].seqNum);
                }
            }

            switch (triggerSplit[2]) {
                case "rbg":
                    if (!NullOrEmptyCheck(triggerVal)) {
                        if (!NullOrEmptyCheck(triggerSecondVal)) {
                            var newDualRG = DualRadioAccordionController(
                                LabelController(
                                    "",
                                    "question-label",
                                    requiredIcon + " " + ModalSwitchChecker(triggerVal)
                                ),
                                ParagraphController(
                                    "",
                                    "question-info",
                                    ModalSwitchChecker(triggerSecondVal)
                                ),
                                answer,
                                true,
                                id,
                                "question-radio-form",
                                "radio-container",
                                "question-radio-option",
                                isRequired,
                                isEnabled,
                                responses,
                                triggerSeqVals,
                                childElBody,
                                ReturnPureContextValue(triggerVal),
                                rulesMsg,
                                gridCount
                            );

                            return CreateElement(newDualRG);
                        }
                        else {
                            var newDualRG = DualRadioAccordionController(
                                LabelController(
                                    "",
                                    "question-label",
                                    requiredIcon + " " + ModalSwitchChecker(triggerVal)
                                ),
                                "",
                                answer,
                                true,
                                id,
                                "question-radio-form",
                                "radio-container",
                                "question-radio-option",
                                isRequired,
                                isEnabled,
                                responses,
                                triggerSeqVals,
                                childElBody,
                                ReturnPureContextValue(triggerVal),
                                rulesMsg,
                                gridCount
                            );

                            return CreateElement(newDualRG);
                        }
                    }
                    break;
                case "ddl":
                    if (!NullOrEmptyCheck(triggerVal)) {
                        if (!NullOrEmptyCheck(triggerSecondVal)) {
                            var newDualDDL = DualDropDownAccordionController(
                                LabelController(
                                    "",
                                    "question-label",
                                    requiredIcon + " " + ModalSwitchChecker(triggerVal)
                                ),
                                ParagraphController(
                                    "",
                                    "question-info",
                                    ModalSwitchChecker(triggerSecondVal)
                                ),
                                answer,
                                id,
                                "question-dropdown-main",
                                "question-dropdown-option",
                                isRequired,
                                isEnabled,
                                responses,
                                triggerSeqVals,
                                childElBody,
                                ReturnPureContextValue(triggerVal),
                                rulesMsg,
                                gridCount
                            );

                            return CreateElement(newDualDDL);
                        } else {
                            var newDualDDL = DualDropDownAccordionController(
                                LabelController(
                                    "",
                                    "question-label",
                                    requiredIcon + " " + ModalSwitchChecker(triggerVal)
                                ),
                                "",
                                answer,
                                id,
                                "question-dropdown-main",
                                "question-dropdown-option",
                                isRequired,
                                isEnabled,
                                responses,
                                triggerSeqVals,
                                childElBody,
                                ReturnPureContextValue(triggerVal),
                                rulesMsg,
                                gridCount
                            );

                            return CreateElement(newDualDDL);
                        }
                    }
                    break;
            }
        }
        else {
            var arrA = [];
            var triggerNum;
            arrA.push({ 'seqNum': 0, 'value': 'Please Choose a Selection' });

            for (var a = 0; a < responses.length; a++) {
                arrA.push(responses[a]);
            }

            //If it is, create the normal Accordion groups
            switch (triggerSplit[1]) {
                case "dropdownList":
                    for (var r = 0; r < responses.length; r++) {
                        if (responses[r].isTrigger) {
                            triggerNum = responses[r].seqNum;
                        }
                    }

                    if (!NullOrEmptyCheck(triggerVal)) {
                        if (!NullOrEmptyCheck(triggerSecondVal)) {
                            var newADDG = AccordionDropDownGroupController(
                                LabelController(
                                    "",
                                    "question-label",
                                    requiredIcon + " " + ModalSwitchChecker(triggerVal)
                                ),
                                ParagraphController(
                                    "",
                                    "question-info",
                                    ModalSwitchChecker(triggerSecondVal)
                                ),
                                id + "-AccorDDLSel",
                                "question-dropdown-main",
                                "question-dropdown-option",
                                isRequired,
                                isEnabled,
                                arrA,
                                triggerNum,
                                childElBody,
                                answer,
                                triggerVal,
                                rulesMsg,
                                gridCount
                            );

                            return CreateElement(newADDG);
                        }
                        else {
                            var newADDG = AccordionDropDownGroupController(
                                LabelController(
                                    "",
                                    "question-label",
                                    requiredIcon + " " +  ModalSwitchChecker(triggerVal)
                                ),
                                "",
                                id + "-AccorDDLSel",
                                "question-dropdown-main",
                                "question-dropdown-option",
                                isRequired,
                                isEnabled,
                                arrA,
                                triggerNum,
                                childElBody,
                                answer,
                                triggerVal,
                                rulesMsg,
                                gridCount
                            );

                            return CreateElement(newADDG);
                        }
                    }
                    break;
                case "radio":
                    for (var r = 0; r < responses.length; r++) {
                        if (responses[r].isTrigger) {
                            triggerNum = responses[r].seqNum;
                        }
                    }

                    if (!NullOrEmptyCheck(triggerVal)) {
                        if (!NullOrEmptyCheck(triggerSecondVal)) {
                            var newARG = AccordionRadioGroupController(
                                LabelController(
                                    "",
                                    "question-label",
                                    requiredIcon + " " + ModalSwitchChecker(triggerVal)
                                ),
                                ParagraphController(
                                    "",
                                    "question-info",
                                    ModalSwitchChecker(triggerSecondVal)
                                ),
                                true,
                                id,
                                "question-radio-form",
                                "radio-container",
                                "question-radio-option",
                                isRequired,
                                isEnabled,
                                responses,
                                childEls,
                                answer,
                                rulesMsg,
                                false
                            );

                            return CreateElement(newARG);
                        }
                        else {
                            var newARG = AccordionRadioGroupController(
                                LabelController(
                                    "",
                                    "question-label",
                                    requiredIcon + " " + ModalSwitchChecker(triggerVal)
                                ),
                                "",
                                true,
                                id,
                                "question-radio-form",
                                "radio-container",
                                "question-radio-option",
                                isRequired,
                                isEnabled,
                                responses,
                                childEls,
                                answer,
                                rulesMsg,
                                false
                            );

                            return CreateElement(newARG);
                        }
                    }
                    break;
                case "info":
                    if (!NullOrEmptyCheck(triggerVal)) {
                        var newINFO = CollapsibleInfoGroupController(
                            id,
                            ModalSwitchChecker(triggerVal),
                            childElBody,
                            false
                        );

                        return CreateElement(newINFO);
                    }
                    break;
            }
        }
    }
};

//This will take in the passed array element and output any Trigger elements for the page
function CreateTriggerEls(currEl){
    //console.log(currElID);
    var splitType = currEl.triggerObj.triggerType.split('_');

    //If the trigger prefix is an Opening event
    if (splitType[0] === "opens") {
        console.log(currEl.triggerObj.id);
        
        return outputControl(currEl.triggerObj);
    }
    //Else, it's an Accordion event
    else {

        //Create an array that will house the child elements
        var childElArr = [];
        //If there are child elements within this child element, we need to create it's own special array
        var subChildrenArr = [];
        //console.log(currEl.childElsArr);
        var childtrigger, trigger;

        //Go through the children for the immediate children
        for (var c = 0; c < currEl.childElsArr.length; c++) {
            //Then check to see if any child elements is also a Trigger event
            if (!NullOrEmptyCheck(currEl.childElsArr[c].triggerObj)) {
                //If so, then find out what kind of Trigger event it is
                var triggerSplit = currEl.childElsArr[c].triggerObj.triggerType.split("_");
                //Use the above to output the correct sub-child Trigger event
                switch (triggerSplit[0]) {
                    case "ccg":
                        for (var ce = 0; ce < currEl.childElsArr[c].childElsArr.length; ce++) {
                            //Since an Accordion needs to have all children created, we loop through and create the sub child controls
                            subChildrenArr.push(currEl.childElsArr[c].childElsArr[ce]);
                            //Turn the elements into a HTML output (otherwise we get random commas, and other junk, in our output)

                            //Use the helper method to output the trigger element
                            childtrigger = AccordionGenerator(
                                currEl.childElsArr[c].triggerObj.dataType,
                                currEl.childElsArr[c].triggerObj.value,
                                currEl.childElsArr[c].triggerObj.secondaryVal,
                                currEl.childElsArr[c].triggerObj.id,
                                currEl.childElsArr[c].triggerObj.responses,
                                currEl.childElsArr[c].triggerObj.answer,
                                subChildrenArr,
                                currEl.childElsArr[c].triggerObj.gridCount,
                                currEl.childElsArr[c].triggerObj.isRequired,
                                currEl.childElsArr[c].triggerObj.isEnabled,
                                currEl.childElsArr[c].triggerObj.RuleMessage
                            );
                        }

                        //Now add the child trigger element to the child array
                        childElArr.push(childtrigger);
                    case "accordion":
                        switch (triggerSplit[1]) {
                            case "dual":
                            case "revdoc":
                                console.log(currEl.childElsArr[c].triggerObj.id);

                                for (var ce = 0; ce < currEl.childElsArr[c].childElsArr.length; ce++) {
                                    //Since an Accordion needs to have all children created, we loop through and create the sub child controls
                                    subChildrenArr.push(currEl.childElsArr[c].childElsArr[ce]);
                                }

                                //Use the helper method to output the trigger element
                                childtrigger = AccordionGenerator(
                                    currEl.childElsArr[c].triggerObj.triggerType,
                                    currEl.childElsArr[c].triggerObj.value,
                                    currEl.childElsArr[c].triggerObj.secondaryVal,
                                    currEl.childElsArr[c].triggerObj.id,
                                    currEl.childElsArr[c].triggerObj.responses,
                                    currEl.childElsArr[c].triggerObj.answer,
                                    subChildrenArr,
                                    currEl.childElsArr[c].triggerObj.gridCount,
                                    currEl.childElsArr[c].triggerObj.isRequired,
                                    currEl.childElsArr[c].triggerObj.isEnabled,
                                    currEl.childElsArr[c].triggerObj.RuleMessage
                                );

                                //Now add the child trigger element to the child array
                                childElArr.push(childtrigger);
                                break;
                            case "radio":
                                console.log(currEl.childElsArr[c].triggerObj.id);

                                for (var ce = 0; ce < currEl.childElsArr[c].childElsArr.length; ce++) {
                                    //Since an Accordion needs to have all children created, we loop through and create the sub child controls
                                    subChildrenArr.push(outputControl(currEl.childElsArr[c].childElsArr[ce]));
                                }

                                //Turn the elements into a HTML output (otherwise we get random commas, and other junk, in our output)
                                var subChildElBody = CreateElement(subChildrenArr);

                                //Use the helper method to output the trigger element
                                childtrigger = AccordionGenerator(
                                    currEl.childElsArr[c].triggerObj.triggerType,
                                    currEl.childElsArr[c].triggerObj.value,
                                    currEl.childElsArr[c].triggerObj.secondaryVal,
                                    currEl.childElsArr[c].triggerObj.id,
                                    currEl.childElsArr[c].triggerObj.responses,
                                    currEl.childElsArr[c].triggerObj.answer,
                                    subChildElBody,
                                    currEl.childElsArr[c].triggerObj.gridCount,
                                    currEl.childElsArr[c].triggerObj.isRequired,
                                    currEl.childElsArr[c].triggerObj.isEnabled,
                                    currEl.childElsArr[c].triggerObj.RuleMessage
                                );

                                //Now add the child trigger element to the child array
                                childElArr.push(childtrigger);
                                break;
                            default:
                                for (var ce = 0; ce < currEl.childElsArr[c].childElsArr.length; ce++) {
                                    //Since an Accordion needs to have all children created, we loop through and create the sub child controls
                                    subChildrenArr.push(outputControl(currEl.childElsArr[c].childElsArr[ce]));
                                }

                                //Turn the elements into a HTML output (otherwise we get random commas, and other junk, in our output)
                                var subChildElBody = CreateElement(subChildrenArr);

                                //Use the helper method to output the trigger element
                                childtrigger = AccordionGenerator(
                                    currEl.childElsArr[c].triggerObj.triggerType,
                                    currEl.childElsArr[c].triggerObj.value,
                                    currEl.childElsArr[c].triggerObj.secondaryVal,
                                    currEl.childElsArr[c].triggerObj.id,
                                    currEl.childElsArr[c].triggerObj.responses,
                                    currEl.childElsArr[c].triggerObj.answer,
                                    subChildElBody,
                                    currEl.childElsArr[c].triggerObj.gridCount,
                                    currEl.childElsArr[c].triggerObj.isRequired,
                                    currEl.childElsArr[c].triggerObj.isEnabled,
                                    currEl.childElsArr[c].triggerObj.RuleMessage
                                );

                                //Now add the child trigger element to the child array
                                childElArr.push(childtrigger);
                                break;
                        }
                        break;
                    case "opens":
                        //For future implementation (if needed)
                        break;
                }
            }
            else {
                //If the above turns up negative, then there are no children Trigger events
                //Now check if the accordion is a dual one
                if (splitType[1] === "dual") {
                    //Otherwise, we have a Dual Accordion
                    switch (splitType[2]) {
                        case "rbg":
                            //Use the helper method to output the trigger element
                            trigger = AccordionGenerator(
                                currEl.triggerObj.triggerType,
                                currEl.triggerObj.value,
                                currEl.triggerObj.secondaryVal,
                                currEl.triggerObj.id,
                                currEl.triggerObj.responses,
                                currEl.triggerObj.answer,
                                currEl.childElsArr,
                                currEl.triggerObj.gridCount,
                                currEl.triggerObj.isRequired,
                                currEl.triggerObj.isEnabled,
                                currEl.triggerObj.RuleMessage
                            );

                            return trigger;
                            break;
                        case "ddl":
                            //Use the helper method to output the trigger element
                            trigger = AccordionGenerator(
                                currEl.triggerObj.triggerType,
                                currEl.triggerObj.value,
                                currEl.triggerObj.secondaryVal,
                                currEl.triggerObj.id,
                                currEl.triggerObj.responses,
                                currEl.triggerObj.answer,
                                currEl.childElsArr,
                                currEl.triggerObj.gridCount,
                                currEl.triggerObj.isRequired,
                                currEl.triggerObj.isEnabled,
                                currEl.triggerObj.RuleMessage
                            );

                            return trigger;
                            break;
                    }
                }
                else {
                    //If so, Create the controls as normal
                    switch (splitType[0]) {
                        case "ccg":
                            //TODO: Implement Recursive Child Trigger elements for CCG items

                            childElArr.push(currEl.childElsArr[c]);

                            //Use the helper method to output the trigger element
                            trigger = AccordionGenerator(
                                currEl.triggerObj.triggerType,
                                currEl.triggerObj.value,
                                currEl.triggerObj.secondaryVal,
                                currEl.triggerObj.id,
                                currEl.triggerObj.responses,
                                currEl.triggerObj.answer,
                                currEl.childElsArr,
                                currEl.triggerObj.gridCount,
                                currEl.triggerObj.isRequired,
                                currEl.triggerObj.isEnabled,
                                currEl.triggerObj.RuleMessage
                            );

                            return trigger;
                            break;
                        case "accordion":
                            //Use the helper method to output the trigger element
                            trigger = AccordionGenerator(
                                currEl.triggerObj.triggerType,
                                currEl.triggerObj.value,
                                currEl.triggerObj.secondaryVal,
                                currEl.triggerObj.id,
                                currEl.triggerObj.responses,
                                currEl.triggerObj.answer,
                                currEl.childElsArr,
                                currEl.triggerObj.gridCount,
                                currEl.triggerObj.isRequired,
                                currEl.triggerObj.isEnabled,
                                currEl.triggerObj.RuleMessage
                            );

                            return trigger;
                            break;
                        case "opens":
                            break;
                    }
                }
            }
        }
    }
};

function CreateChildTriggerObjs(parentTrigObj, childEl){

    var tempObjStorer = [];
    var newTriggerObj, idx;

    if (typeof childEl.childElsArr !== 'undefined' && childEl.childElsArr.length > 0) {
        //Run through parent Trigger Obj childElsArr and obj's childElIDsArr, if match, make new Trigger Obj
        for (var c = 0; c < childEl.triggerObj.childElIDsArr.length; c++) {
            for (var p = 0; p < parentTrigObj.childElsArr.length; p++) {
                if (parentTrigObj.childElsArr[p].id == childEl.triggerObj.childElIDsArr[c]) {
                    tempObjStorer.push(parentTrigObj.childElIDsArr[p]);
                }
            }

            if (tempObjStorer.length > 0) {
                newTriggerObj = new TriggerObject(parentTrigObj.childElIDsArr[p], tempObjStorer);
                idx = parentTrigObj.childElIDsArr.indexOf(parentTrigObj.childElIDsArr[p]);
                //Remove old obj in childElsArr from parent Trigger Obj childElsArr, and store new Trigger Obj in that arr
                parentTrigObj.childElsArr.splice(idx, 1);

                parentTrigObj.childElsArr.push(newTriggerObj);
            }
        }

        return parentTrigObj;
    }
    else {
        return parentTrigObj;
    }

};

function TriggerChildrenSeparator(trigObj) {
    //Only run through if we have more than 1 item in the childElsArr (the fn() only removes from WITHIN the child els)
    if (trigObj.childElsArr.length > 1) {
        var output;

        for (var to = 0; to < trigObj.childElsArr.length; to++) {
            output = CreateChildTriggerObjs(trigObj, trigObj.childElsArr[to]);
        }

        return output;
    }
    else {
        return trigObj;
    }
};

// This function will create the triggers, then join them with the body elements
function CreateBodyEls(elArr, appID) {
    console.log("CreateBodyEls");

    for (var e = 0; e < elArr.length; e++) {
        //Create an array to house the HTML
        var bodyElArr = [];

        if (typeof elArr[e].triggerObj === "object") {
            if (elArr[e].triggerObj.triggerType.localeCompare("opens_enable") === 0) {
                switch (elArr[e].triggerObj.controlType) {
                    case "email":
                        if (!NullOrEmptyCheck(elArr[e].triggerObj.answer)) {

                            for (var c = 0; c < elArr[e].childElsArr.length; c++) {
                                elArr[e].childElsArr[c].isEnabled = true;
                            }

                            var control = outputControl(elArr[e].triggerObj, appID);

                            bodyElArr.push("<li id='" + elArr[e].triggerObj.id + "-div' class='" + elArr[e].triggerObj.gridCount + "'>");
                            bodyElArr.push(control);
                            bodyElArr.push("</li>");
                        }
                        else {

                            for (var c = 0; c < elArr[e].childElsArr.length; c++) {
                                elArr[e].childElsArr[c].isEnabled = false;

                                if (elArr[e].childElsArr[c].controlType.localeCompare("radio") === 0) {
                                    if (elArr[e].childElsArr[c].answer.localeCompare("Paper/Mail") === 0 || 
                                        elArr[e].childElsArr[c].answer.localeCompare("Electronically") === 0
                                    ) {
                                        elArr[e].childElsArr[0].responses[1].isTrigger = true;
                                    }
                                    else {
                                        elArr[e].childElsArr[0].responses[0].isTrigger = true;
                                    }
                                }
                            }

                            var control = outputControl(elArr[e].triggerObj, appID);

                            bodyElArr.push("<li id='" + elArr[e].triggerObj.id + "-div' class='" + elArr[e].triggerObj.gridCount + "'>");
                            bodyElArr.push(control);
                            bodyElArr.push("</li>");

                        }
                        break;
                    case "checkbox":
                        if ($("#" + elArr[e].id).is(":checked")) {
                            for (var c = 0; c < elArr[e].childElsArr.length; c++) {
                                elArr[e].childElsArr[c].isEnabled = true;
                            }

                            var control = outputControl(elArr[e].triggerObj, appID);

                            bodyElArr.push("<li id='" + elArr[e].triggerObj.id + "-div' class='" + elArr[e].triggerObj.gridCount + "'>");
                            bodyElArr.push(control);
                            bodyElArr.push("</li>");
                        }
                        else {
                            for (var c = 0; c < elArr[e].childElsArr.length; c++) {
                                elArr[e].childElsArr[c].isEnabled = false;
                            }

                            var control = outputControl(elArr[e].triggerObj, appID);

                            bodyElArr.push("<li id='" + elArr[e].triggerObj.id + "-div' class='" + elArr[e].triggerObj.gridCount + "'>");
                            bodyElArr.push(control);
                            bodyElArr.push("</li>");
                        }
                        break;
                }
            }
            else {
                var tempObj = TriggerChildrenSeparator(elArr[e]);

                bodyElArr.push(CreateTriggerEls(tempObj));
            }
        }
        else {
            var control = outputControl(elArr[e], appID);

            if (elArr[e].id !== undefined && elArr[e].id.indexOf("PAG") !== -1) {
                if (control !== undefined) {
                    bodyElArr.push("<li id='" + elArr[e].id + "-div' class='" + elArr[e].gridCount + "'>");
                    bodyElArr.push(control);
                    bodyElArr.push("</li>");
                }
            }
            else {
                if (control !== undefined) {
                    bodyElArr.push("<li id='" + elArr[e].id + "-div' class='" + elArr[e].gridCount + "'>");
                    bodyElArr.push(control);
                    bodyElArr.push("</li>");
                }
            }
        }

        //Create an HTML from the above array
        var bodyElHTML = CreateElement(bodyElArr);

        //Save it to the htmlData body array for future use
        data.htmlData.push(bodyElHTML);
    }
};

const RemoveFromChildTriggerList = (trigObj, ids) =>{
    //pretty much check if the ids match, if they do, remove them from the child array
    trigObj.childElsArr.forEach(c => {
        for(i in ids){
            if(typeof c.id !== "undefined"){
                if(i === c.id){
                    trigObj.childElsArr.splice(c, 1);
                }
            }
        }
    });
};

const CreateChildTriggerEls = (child, trigObj, indx) => {
    
    let trigEl = new TriggerObject(child);
    let trigElArr = [];
    let currChildArr = data.childElArr;

    //merge the old childelarr data + the new childelarr data
    data.childElArr = [
            ...currChildArr, 
            ...child.childElIDsArr.map(cid => {
            // also populate the trigElArr 
            trigElArr = cid.childElsArr.map((c, i) => {
                trigObj.childElsArr.splice(i, 1, trigEl);
                RemoveFromChildTriggerList(trigObj, cid.childElIDsArr);
                return c;
            })

            return cid;
        })
    ];

    //Finally, attach trigElArr array to the trigger's childelsarr value
    trigEl.childElsArr = trigElArr;
};

const RemoveFromArray = (childIDs, arr) => {
    var count = 0;
    do {
        //childIds are an array of ids, so an id > id comparison is good
        if (typeof childIDs[count] !== 'undefined') {
            for (var i = 0; i < arr.length; i++) {
                if (childIDs[count] === arr[i].id) {
                    arr.splice(i, 1);
                }
            }
        }

        count++;

    } while (count < childIDs.length);
}

const CheckChildTriggersOutput = (fullArray) => {
    data.childElArr = []; //Clear child array

    //Then map through and output a new childID array
    data.childElArr = fullArray.map(el => {
         //if childElsArr is undefined, it's a trigger obj (ignore it), if the childElsArr only has 1 item in it, not enough children (ignore as well)
        if(typeof el.childElsArr !== 'undefined' && el.childElsArr.length > 0){ //First check for normal nested trigger objs (accord drop downs, radio groups, etc.)
            let splitTypeNorm = el.triggerObj.triggerType.toString().split('_');
            
            if (splitTypeNorm[0].localeCompare("opens") !== 0 || splitTypeNorm[0].localeCompare("cbg") !== 0) {
                //loop through child els, recursive check if sub-child then return ids to save
                el.childElsArr.forEach((ce, i) => {
                    let triggerSplitNorm = ce.triggerType.split('_');
                    //if accordion or collapsable card group, check for if a fraud accordion, if not, return child ids
                    if(triggerSplitNorm[0].localeCompare("accordion") === 0 || triggerSplitNorm[0].localeCompare("ccg") === 0){
                        if(triggerSplitNorm[0].localeCompare("fraudbox") !== 0){
                            CreateChildTriggerEls(ce, el, i)
                        }
                    }
                    data.childElArr.push(el.id);
                });
            }
            else if(el.childElIDsArr.length > 0){ //then check for special trigger objs (open/enables, collapsible card groups, etc.)
                let splitTypeSpec = el.triggerType.split("_");
                let dataTypeSpec = el.dataType.split("_");
                
                //first check for opens/enables (which is only decyphered from trigger type value)
                if(splitTypeSpec[0].localeCompare("opens") === 0){
                    if(NullOrEmptyCheck(el.answer)){
                        //if we don't have an answer, then all child items are disabled
                        el.childElIDsArr.forEach(ch => {
                            //find the child obj and disable it
                            let child = data.dataList.find(i => i.id === ch);
                            child.isEnabled = false;
                        });
                    }
                    else {
                        //else we have an answer, enable the child items
                        el.childElIDsArr.forEach(ch => {
                            let child = data.dataList.find(i => i.id === ch);
                            child.isEnabled = true;
                        });
                    }
                }

                //then for perscription (which is only through data type value)
                if(dataTypeSpec[0].localeCompare("prescription") !== 0){
                    //in this case, auto set to disabled and return the child el ids
                    el.childElIDsArr.forEach(ch => {
                        let chidId = ch.childElIDsArr[c3].trim();
                        let child = data.dataList.find(i => i.id === chidId);
                        child.isEnabled = false;

                        return ch;
                    });
                }
            }
        }
    });

    //Finally remove all child els in the childelarr from the output data (to prevent duplicates)
    if (data.childElArr.length > 0) {
        RemoveFromArray(data.childElArr, data.outputData);
    }
}

//Main Data Manipulation functions
const setTriggerEls = (item) =>{
    //This will create the overall list of Trigger Elements
    //We'll use this to tenporaryily store the children elements 
    let tempTriggerChildrenArr = [];
    //Create a Trigger Object by passing the current Control Object
    let NewTriggerObj = new TriggerObject(item);
    //Since the Trigger Object is a Control Object, it should have access to Control Object children IDs, assign it to this variable
    let childArr = NewTriggerObj.triggerObj.childElIDsArr;
    let count = 0;

    //Go through the output Arr and if the ids match child ids, store it as a child element of the parent element
    do {
        for(c in data.controlList){
            if (childArr[count] === c.id) {
                tempTriggerChildrenArr.push(c.id);
            }
        }
        count++;
    } while (count < childArr.length);

    NewTriggerObj.childElsArr = tempTriggerChildrenArr;

    data.outputData.push(NewTriggerObj);
};

const RemoveTriggerElsFromBodyEls = (trigEl) =>{

    //Get the trigger type and only check if it's an accordion event
    let splitType = trigEl.triggerType.split('_');
    let count = 0;

    if (splitType[0] === "accordion" || splitType[0] === "ccg" || splitType[0] === "cbg") {
        //if the obj is a trigger obj, save it to compare with other objs in the body
        let triggerObj = trigEl;

        do {
            let currID = triggerObj.childElIDsArr[count];

            for(el in data.controlList){
                if (currID === el.id) {
                    data.controlList.splice(el, 1);
                }
            }

            count++;
        } while (count < triggerObj.childElIDsArr.length);
    }
};

const CreateBodyList = (arrItem) =>{
    let splitType = arrItem.triggerType.toString().split('_');

    if (splitType[0] === "accordion" || splitType[0] === "ccg" || splitType[0] === "cbg") {
        setTriggerEls(arrItem);
        RemoveTriggerElsFromBodyEls(arrItem);
    }
    else {
        data.outputData.push(arrItem);
    }
};

const InitializeElements = (arr) => {
    arr.map(a => {
        return CreateBodyList(a);
    })
};

const setControlList = (dataList) => {
    data.controlList = [];

    var sortedDataList = dataList.sort(function (a, b) {
        return parseInt(a.sequence) - parseInt(b.sequence);
    });

    console.log(sortedDataList);

    //Since I want to return an array of ids, map will work best here
    let allSPDIDs = sortedDataList.map(sdl => {
        let childElIds = []; //Sub storage array for childIDs

        //For SignPad, if SPD001, then we need to also keep track of child IDs, run through and return those 
        if(sdl.id.toString().trim().localeCompare("SPD001") === 0){
            childElIds = sdl.childElementIDs.map(sdlch => { //Save for functionality to this array
                return sdlch.trim();
            });
            sdl.childElementIDs.map(sdlch => { //Save for the overall list of IDs
                return sdlch.trim();
            });
        }

        //Since we're already iterating through this array, if it's a control type, create the control obj for it
        if(!NullOrEmptyCheck(sdl.controlType)){
            //Perscription check (as a Perscription is different structurally than normal control)
            if(sdl.dataType.localeCompare("prescription") === 0){
                //Run through things ONLY if there are childEls that are nested (to avoid needless calculations)
                if(sdl.childElementIDs.length > 0){
                    //For perscriptions, the actual perscription data is a strigifyed JSON, so it needs to be parsed
                    let parsedPrescs = JSON.parse(sdl.childElementIDs); 
                    parsedPrescs.map(per => {
                        return per.id.trim();
                    });
                }
            }
           else{
               //Normal controls
               if(sdl.childElementIDs.length > 0){
                    sdl.childElementID.map(sdlc => {
                        return sdlc.id.trim();
                    });
               }
           }
        }
        data.controlList.push(
            new ControlObject(
                sdl.suffix,
                sdl.id.replace(/\s/g, ""),
                sdl.controlType,
                sdl.dataType,
                sdl.contextValue,
                sdl.contextSecondaryValue,
                sdl.responses,
                sdl.sequence,
                sdl.answer,
                sdl.triggerType,
                childElIds,
                !NullOrEmptyCheck(sdl.accordian_Option) ? sdl.accordian_Option : "",
                sdl.isEnabled === true ? true : false,
                sdl.isRequired === true ? true : false,
                sdl.rulesMsg,
                !NullOrEmptyCheck(sdl.colGrid) ? sdl.colGrid : "col-md-12"
            )
        );

        //Then return the parent id 
        return sdl.id;
    });

    //Save in session storage for functionality usage
    sessionStorage.setItem("SPDCntrlIDs", allSPDIDs); //For all items on the signing page
    sessionStorage.setItem("SPDChildIDs", savedSPDIDs); //For functionality enabling for child elements on the page
  
};

const CreatePage = (bodyID) => {
    $(document).ready(function () {
        for(h in data.htmlData){
            $('#' + bodyID).append(h);
        }
    });
};

const initalizePage = (dataList, bodyID, appID) => {  //TODO: Once the requirements package is complete, find a way to implement the clientCode var 

    //These need to be cleared per creation (otherwise it would add artifact items from the last selection)
    data.outputData = [];

    //These need to be cleared per creation (otherwise it would add artifact items from the last selection)
    data.htmlData = [];
    siteItemStorage.signatureBlocks = [];
    siteItemStorage.selectionObjs = [];
    siteItemStorage.dualRBGStore = [];
    siteItemStorage.dualRBGOpenedIDs = [];
    siteItemStorage.signingCount = [];

    //Set the ControlsList
    ///1D
    setControlList(dataList);
    InitializeElements(data.controlList);
    CheckChildTriggers(data.controlList);
    CheckChildTriggersOutput(data.outputData);

    CreateBodyEls(data.outputData, appID);
    //console.log(data.controlList);
    console.log(data.outputData);
    //console.log(data.htmlData);

    CreatePage(bodyID);
};

const ControlObjectsMainController = (dataInput, bodyID, appID) => {
    if (NullOrEmptyCheck(bodyID)) {
        console.log("ERROR! You need to pass a Body ID! Please check your code!");
    }
    else {
        //Clear the dataList and input the new to make sure we have the true data for that arr
        data.dataList = [];
        data.dataList = dataInput;
        initalizePage(data.dataList, bodyID, appID);
    }
};

const LoadingSpinnerStart = () => {
    $(document).ready(function () {
        
        var loadingContainer = $('#loading-meter-container');
        var loadingMeter = $('#loading-spinner');

        var overlay = $('#overlay');
        overlay.show();

        var h3 = $('#loading-meter-container h3');
        h3.css("color", "black");
        h3.text("Loading...");

        loadingContainer.show();
        loadingMeter.show();
    });
}

const LoadingSpinnerClose = () => {
    $(document).ready(function () {
        var loadingContainer = $('#loading-meter-container');
        var loadingMeter = $('#loading-spinner');

        var overlay = $('#overlay');
        overlay.hide();

        loadingContainer.hide();
        loadingMeter.hide();
    });
}


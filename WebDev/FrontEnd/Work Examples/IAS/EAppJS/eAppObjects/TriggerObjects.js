/*
    Future Implementation, slightly tested, probably needs more work depending on future business-side projects
*/

class TriggerObject {
    constructor(
        obj,
        childElsArr
    ){
        this.triggerObj = obj;
        this.childElsArr = childElsArr;
    };
};

const AccordionGenerator = (
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
) => {
    let triggerSplit = triggerType.split("_");

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

            //Since CCG components will use objects, we need to pass it into array
            let childEls = childElBody.map(c => {
                return c;
            });

            //Store it for future use
            sessionStorage.setItem("ccgData", JSON.stringify({ parentID: id, children: childEls }));

            //Create the control on the page
            return CollapsibleGroupCardController(
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
        }
    }
    else if (triggerSplit[0] === "accordion") {
        switch (triggerSplit[1]) {
            case "dual":
                //If it's a dual accordion group, figure out what kind and go from there
                let triggerSeqVals = responses.map(r => {
                    if(r.isTrigger){
                        return r.seqNum;
                    }
                });

                switch (triggerSplit[2]) {
                    case "rbg":
                        if (!NullOrEmptyCheck(triggerVal)) {
                            if (!NullOrEmptyCheck(triggerSecondVal)) {
                                return DualRadioAccordionController(
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
                            }
                            else {
                                return DualRadioAccordionController(
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
                            }
                        }
                    case "ddl":
                        if (!NullOrEmptyCheck(triggerVal)) {
                            if (!NullOrEmptyCheck(triggerSecondVal)) {
                                return DualDropDownAccordionController(
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
                            } else {
                                return DualDropDownAccordionController(
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
                            }
                        }
                }
            case "radio":
                //Since CCG components will use objects, we need to pass it into array
                let childEls = childElBody.map(c => {
                    return c;
                });

                let secondVal;
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

                return AccordionRadioGroupController(
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
            case "cb":
                //Since CCG components will use objects, we need to pass it into array
                let childEls = childElBody.map(c => {
                    return c;
                });
                
                return AccordionCheckboxController(
                    id,
                    triggerVal,
                    triggerSecondVal,
                    isRequired,
                    isEnabled,
                    answer === true ? true : false,
                    childEls,
                    rulesMsg
                );
            case "fraudbox":
                let pref = id.substring(0, 3);

                let revDocObj = revDocStorer.countList.find(c => c.pref === pref);

                if (!isJSONObjEmpty(revDocObj)) {
                    currDocCountObj = revDocObj.counter;
                }

                let currDocCountObj = revDocStorer.countList.find(c => c.pref === pref);

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

                let childEls = childElBody.map(c => {
                    return c;
                });

                return FraudAccordionCheckboxController(
                    id,
                    triggerVal,
                    triggerSecondVal,
                    isRequired,
                    isEnabled,
                    answer === "true" ? true : false,
                    childEls,
                    rulesMsg
                );
            case "consent":
                //Since CCG components will use objects, we need to pass it into array
                let childEls = childElBody.map(c => {
                    return c;
                });

                return AccordionCheckboxController(
                    id,
                    triggerVal,
                    triggerSecondVal,
                    isRequired,
                    isEnabled,
                    answer === "true" ? true : false,
                    childEls,
                    rulesMsg
                );
            case "emailbox":
                let pref = id.substring(0, 3);

                let currDocCountObj = 0;

                let revDocObj = revDocStorer.countList.find(c => c.pref === pref);

                if (!isJSONObjEmpty(revDocObj)) {
                    if (!NullOrEmptyCheck(revDocObj.counter)) {
                        currDocCountObj = revDocObj.counter;
                    }
                    else {
                        currDocCountObj = 1; //We're doing this cause 1+ will disable this control (Which is what we need if no docs are avail)
                    }
                }
                
                //Since CCG components will use objects, we need to pass it into array
                let childEls = childElBody.map(c => {
                    return c;
                });

                if (currDocCountObj > 0) {
                    isEnabled = false;
                }
                else {
                    isEnabled = true;
                }

                return AccordionEMailCheckboxController(
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
        }
    }
    else {
        //Else, check if it's a dual accordion group, or a normal one
        if (triggerSplit[1] === "dual") {

            //If it's a dual accordion group, figure out what kind and go from there
            let triggerSeqVals = responses.map(r => {
                if(r.isTrigger){
                    return r.seqNum;
                }
            });

            switch (triggerSplit[2]) {
                case "rbg":
                    if (!NullOrEmptyCheck(triggerVal)) {
                        if (!NullOrEmptyCheck(triggerSecondVal)) {
                            return DualRadioAccordionController(
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
                        }
                        else {
                            return DualRadioAccordionController(
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
                        }
                    }
                    break;
                case "ddl":
                    if (!NullOrEmptyCheck(triggerVal)) {
                        if (!NullOrEmptyCheck(triggerSecondVal)) {
                            return DualDropDownAccordionController(
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
                        } else {
                            return DualDropDownAccordionController(
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
                        }
                    }
            }
        }
        else {
            let arrA = [
                ...{ 'seqNum': 0, 'value': 'Please Choose a Selection' }, 
                ...responses.map(r => {
                    return r;
                })
            ]; 

            let triggerNum;

            //If it is, create the normal Accordion groups
            switch (triggerSplit[1]) {
                case "dropdownList":

                    responses.forEach(r => {
                        if(r.isTrigger){
                            triggerNum = r.seqNum;
                        }
                    });

                    if (!NullOrEmptyCheck(triggerVal)) {
                        if (!NullOrEmptyCheck(triggerSecondVal)) {
                            return AccordionDropDownGroupController(
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
                        }
                        else {
                            return AccordionDropDownGroupController(
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
                        }
                    }
                    break;
                case "radio":
                    responses.forEach(r => {
                        if(r.isTrigger){
                            triggerNum = r.seqNum;
                        }
                    });

                    if (!NullOrEmptyCheck(triggerVal)) {
                        if (!NullOrEmptyCheck(triggerSecondVal)) {
                            return AccordionRadioGroupController(
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
                        }
                        else {
                            return AccordionRadioGroupController(
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
                        }
                    }
                case "info":
                    if (!NullOrEmptyCheck(triggerVal)) {
                        return CollapsibleInfoGroupController(
                            id,
                            ModalSwitchChecker(triggerVal),
                            childElBody,
                            false
                        );
                    }
            }
        }
    }
};

//This will take in the passed array element and output any Trigger elements for the page
const CreateTriggerEls = (currEl) => {
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
        //Go through the children for the immediate children
        return currEl.childElsArr.map(c => {
            //Then check to see if any child elements is also a Trigger event
            if(!NullOrEmptyCheck(c.triggerObj)){
                let triggerSplit = c.triggerObj.triggerType.trim();
                switch(triggerSplit[0]){
                    case "ccg": //If Collapsable Card Group...
                        //If there are child elements within this child element, we need to create it's own special array
                        let subChildrenArr = c.childElsArr.map(sc => {
                            return sc;
                        });

                        return AccordionGenerator(
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
                    case "accordion":
                        switch (triggerSplit[1]) {
                           case "radio": //Radio or Default
                                default:
                                let subChildrenArr = c.childElsArr.map(sc => {
                                    return sc;
                                });

                                let subChildElBody = CreateElement(subChildrenArr);

                                return AccordionGenerator(
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
                        }
                }
            } else {
                //If the above turns up negative, then there are no children Trigger events
                //Now check if the accordion is a dual one
                if (splitType[1] === "dual") {
                    //Otherwise, we have a Dual Accordion
                    switch (splitType[2]) {
                        case "rbg":
                            return AccordionGenerator(
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
                        case "ddl":
                            return AccordionGenerator(
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
                    }
                }
            }
        });
    }
};

const CreateChildTriggerObjs = (parentTrigObj, childEl) => {

    let newTriggerObj, idx;

    if (typeof childEl.childElsArr !== 'undefined' && childEl.childElsArr.length > 0) {
        //Run through parent Trigger Obj childElsArr and obj's childElIDsArr, if match, make new Trigger Obj
        let tempObjStorer = childEl.triggerObj.childElIDsArr.map(c => {
            parentTrigObj.childElIDsArr.forEach(p => {
                if(p.id === c){
                    return c;
                }
            });
        });

        if (tempObjStorer.length > 0) {
            return parentTrigObj.childElIDsArr.map((p, indx) => {
                newTriggerObj = new TriggerObject(p, tempObjStorer);
                p.childElsArr.splice(indx, 1);
                p.childElsArr.push(newTriggerObj)
            });
        }
        else{
            return parentTrigObj;
        }
    }
};

const TriggerChildrenSeparator = (trigObj) => {
    //Only run through if we have more than 1 item in the childElsArr (the fn() only removes from WITHIN the child els)
    if (trigObj.childElsArr.length > 1) {
        return trigObj.childElsArr.map(to => {
            return CreateChildTriggerObjs(trigObj, to);
        })
    }
    else {
        return trigObj;
    }
};
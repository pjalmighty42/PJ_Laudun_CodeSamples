const getParameterByName = (name, url) => {
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

class ControlObject {
    constructor(
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
};

// This function will create the triggers, then join them with the body elements
const CreateBodyEls = (elArr, appID) => {
    
    //Create an array to house the HTML
    let bodyElArr = elArr.map(e => {
        if (typeof e.triggerObj === "object"){
            if (e.triggerObj.triggerType.localeCompare("opens_enable") === 0){
                switch(e.triggerObj.controlType){
                    case "email":
                        if (!NullOrEmptyCheck(e.triggerObj.answer)){
                            e.childElsArr.forEach(c => {
                                c.isEnabled = true;
                            });
                            
                            let control = outputControl(e.triggerObj, appID);

                            return `<li id='${e.triggerObj.id}-div' class='${e.triggerObj.gridCount}'>
                                    ${control}
                                    </li>`;
                        }
                        else {
                            e.childElsArr.forEach(c => {
                                c.isEnabled = false;

                                if(c.controlType.localeCompare("radio") === 0){
                                    if(c.answer.localeCompare("Paper/Mail") === 0 ||
                                        c.answer.localeCompare("Electronically") === 0){
                                        c.responses[1].isTrigger = true;
                                    }
                                    else{
                                        c.responses[0].isTrigger = true;
                                    }
                                }
                            });

                            let control = outputControl(e.triggerObj, appID);

                            return `<li id='${e.triggerObj.id}-div' class='${e.triggerObj.gridCount}'>
                                    ${control}
                                    </li>`;
                        }
                    case "checkbox":
                        if ($("#" + e.id).is(":checked")){
                            e.childElsArr.forEach(c => {
                                c.isEnabled = true;
                            });

                            let control = outputControl(e.triggerObj, appID);

                            return `<li id='${e.triggerObj.id}-div' class='${e.triggerObj.gridCount}'>
                                    ${control}
                                    </li>`;
                        }
                        else {
                            e.childElsArr.forEach(c => {
                                c.isEnabled = false;
                            });

                            let control = outputControl(e.triggerObj, appID);

                            return `<li id='${e.triggerObj.id}-div' class='${e.triggerObj.gridCount}'>
                                    ${control}
                                    </li>`;
                        }
                }
            } else {
               return CreateTriggerEls(TriggerChildrenSeparator(e));
            }
        }
        else{
            var control = outputControl(e, appID);

            if (e.id !== undefined && e.id.indexOf("PAG") !== -1){
                if (control !== undefined) {
                    return `<li id='${e.triggerObj.id}-div' class='${e.triggerObj.gridCount}'>
                            ${control}
                            </li>`;
                }
                else{
                    return `<li id='${e.triggerObj.id}-div' class='${e.triggerObj.gridCount}'>
                            ${control}
                            </li>`;
                }
            }
        }
    });

    //Save it to the htmlData body array for future use
    data.htmlData.push(bodyElArr);
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


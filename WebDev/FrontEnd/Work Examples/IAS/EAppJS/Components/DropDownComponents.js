class DropDownObj {
    constructor(
        labelComp = "",
        noteComp = "",
        selectIdName = "",
        selectClassName = "",
        optionsClassName = "",
        isRequired = false,
        isEnabled = "",
        ddType = "",
        options = [],
        selectedOption = "",
        contextValue = "",
        rulesmsg = "",
        checkFunction = ""
    ) {
        this.labelComp = labelComp;
        this.noteComp = noteComp;
        this.selectIdName = selectIdName;
        this.selectClassName = selectClassName;
        this.optionsClassName = optionsClassName;
        this.isRequired = isRequired === true ? true : false;
        this.isEnabled = isEnabled === true ? true : false;
        this.ddType = ddType;
        this.options = options;
        this.selectedOption = selectedOption;
        this.contextValue = contextValue;
        this.rulseMsg = !NullOrEmptyCheck(rulesmsg) ? rulesmsg.split("|") : "";
        this.checkFunction = checkFunction;
    }
}

function DropDownController(
    labelComp,
    noteComp,
    selectIdName,
    selectClassName,
    optionsClassName,
    isRequired,
    isEnabled,
    ddType,
    options,
    selectedOption,
    contextValue,
    rulesMessage,
    checkFunction
){
    //This will create the actual dropdown element (basic format) from the passed in dropdown object
    function CreateDropDownElement(dropDownObj){
        let dropdownobject = [];

        let erOutput = EnableAndRequiredCheck(dropDownObj.isEnabled, dropDownObj.isRequired);

        dropdownobject.push("<select id='" + dropDownObj.selectIdName + "-select' class='" + dropDownObj.selectClassName + " col-md-12' " + dropDownObj.checkFunction + " " + erOutput +">");

        let tempOptsOut = [];

        tempOptsOut.push({ seqNum: 0, value: "Please Choose a Selection", isTrigger: false });
        tempOptsOut.push(...dropDownObj.options);

        for (let i = 0; i < tempOptsOut.length; i++) {
            if (tempOptsOut[i].value.localeCompare(dropDownObj.selectedOption) === 0) {
                dropdownobject.push("<option class='" + dropDownObj.optionsClassName + "' selected>" + tempOptsOut[i].value + "</option>");
            }
            else {
                dropdownobject.push("<option class='" + dropDownObj.optionsClassName + "'>" + tempOptsOut[i].value + "</option>");
            }
        }

        //Close off the <select> element, thus creating the dropdown element
        dropdownobject.push("</select>");

        return dropdownobject;
    };

     //This will create the prescription dropdown elements from the passed in dropdown object
    function CreateDropDownElementPrescr(dropDownObj) {
        let dropdownobjectPre = [];

        let erOutput = EnableAndRequiredCheck(dropDownObj.isEnabled, dropDownObj.isRequired);

        dropdownobjectPre.push("<select id='" + dropDownObj.selectIdName + "-select' class='" + dropDownObj.selectClassName + " col-md-12' " + dropDownObj.checkFunction + " " + dropDownObj.isEnabled + " " + erOutput + ">");
        
        let arrNewArray = [];
        arrNewArray.push({ 'ndc': '00000000000', 'strength': 'Please Choose a Selection' });
        for (let a = 0; a < dropDownObj.options.length; a++) {
            arrNewArray.push(dropDownObj.options[a]);
        }

        for (let i = 0; i < arrNewArray.length; i++) {
            if (i === dropDownObj.selectedOption) {
                dropdownobjectPre.push("<option class='" + dropDownObj.optionsClassName + "' selected>" + arrNewArray[i].strength + "</option>");
            }
            else {
                dropdownobjectPre.push("<option class='" + dropDownObj.optionsClassName + "'>" + arrNewArray[i].strength + "</option>");
            }
        }

        //Close off the <select> element, thus creating the dropdown element
        dropdownobjectPre.push("</select>");

        return dropdownobjectPre;
    };

    //This will create the actual dropdown element (specially for Height) from the passed in dropdown object
    function CreateHeightDropDownList(dropDownObj){
        let dropdownobjectH = [];

        //We need to find out what is the computed Height in Feet and Inches for this dropdown
        //These vars will go to the selectOptionHeightFt() & selectOptionHeightIn() in the HelperFunctions.js file to do this
        let heightFt = parseInt(selectOptionHeightFt(dropDownObj.selectedOption));
        let heightIn = parseInt(selectOptionHeightIn(dropDownObj.selectedOption));

        //Just a console check to make sure everything is good. Comment this out on Production builds
        //console.log("Height = " + heightFt + " " + heightIn);

        //Since we are doing 2 separate dropdowns (1 for Feet, 1 for Inches), we need a function to encapsulate the <select> creation in this function so we can just internally call this function
        //This function works exactly like the CreateDropDownElement() with the only changes being that since both Feet and Inches <select> must be next to each other, their col-md size is 5
        //Refference CreateDropDownElement() if you need a breakdown of what's basically going on in this function
        function CreateSelectTop(count) {
            let erOutput = EnableAndRequiredCheck(dropDownObj.isEnabled, dropDownObj.isRequired);

            if (count === 1) {
                dropdownobjectH.push("<select id='" + dropDownObj.selectIdName + "-select' class='" + dropDownObj.selectClassName + " col-md-5 m-1' " + dropDownObj.checkFunction + " " + erOutput + ">");
            }
            else {
                dropdownobjectH.push("<select id='" + dropDownObj.selectIdName + "-select' class='" + dropDownObj.selectClassName + " col-md-6' " + dropDownObj.checkFunction + " " + erOutput + ">");
            }
        }

        //Height in Feet first, simply change the selectIdName (it will automatically create a <select> with this ID to separate the <select> elements)
        //dropDownObj.selectIdName = "ddl-height-ft";
        //Creates the <select> element with the new ID name
        CreateSelectTop(1);

        dropdownobjectH.push("<option value='Please Select Feet' selected>Please Select Feet</option>");
        //Height in Feet is from 3ft to 8ft, create the <options> for that
        for (let groupTop = 3; groupTop <= 8; groupTop++) {
            if (heightFt !== 0) {
                //If the index is equal to the computed Feet, then select it
                if (groupTop === heightFt) {
                    dropdownobjectH.push("<option value='" + groupTop + "' selected>" + groupTop + "</option>");
                }
                else {
                    dropdownobjectH.push("<option value='" + groupTop + "'>" + groupTop + "</option>");
                }
            }
            else {
                dropdownobjectH.push("<option value='" + groupTop + "'>" + groupTop + "</option>");
            }
        }
        //This will close out the Feet <select> part
        dropdownobjectH.push("</select>");

        //Next we will get the Inches, again change the selectIdName then create the <select> element with the new ID name
        //dropDownObj.selectIdName = "ddl-height-in";

        CreateSelectTop(2);

        let optsArr = [];

        optsArr.push("Please Select Inches");
        //Height in Inches is from 0 to 12, create the <options> for that
        for (let i = 0; i <= 11; i++) {
            optsArr.push(i.toString());
        }

        for (let opts = 0; opts < optsArr.length; opts++) {
            if (optsArr[opts].localeCompare(heightIn.toString()) === 0) {
                dropdownobjectH.push("<option value='" + optsArr[opts] + "' selected>" + optsArr[opts] + "</option>");
            }
            else {
                dropdownobjectH.push("<option value='" + optsArr[opts] + "'>" + optsArr[opts] + "</option>");
            }
        }
        //This will close out the Inches <select> part
        dropdownobjectH.push("</select>");

        //Return the new Height dropdown object
        return CreateElement(dropdownobjectH);
    };

    function CreateHeightDropDownCCG(dropDownObj) {
        let dropdownobjectCCG = [];

        let erOutput = EnableAndRequiredCheck(dropDownObj.isEnabled, dropDownObj.isRequired);

        dropdownobjectCCG.push("<select id='" + dropDownObj.selectIdName + "-select' class='" + dropDownObj.selectClassName + " col-md-12' " + dropDownObj.checkFunction + " " + erOutput + ">");

        for (let i = 0; i < dropDownObj.options.length; i++) {
            if (dropDownObj.options[i] === dropDownObj.selectedOption) {
                dropdownobjectCCG.push("<option class='" + dropDownObj.optionsClassName + "' var-name='" + dropDownObj.varName + "' selected>" + dropDownObj.options[i] + "</option>");
            }
            else {
                dropdownobjectCCG.push("<option class='" + dropDownObj.optionsClassName + "' var-name='" + dropDownObj.varName + "'>" + dropDownObj.options[i] + "</option>");
            }
        }

        //Close off the <select> element, thus creating the dropdown element
        dropdownobjectCCG.push("</select>");

        return dropdownobjectCCG;
    };

    function CreateDropDownNormal(dropDownObj) {
        let dropdownobject = [];

        let erOutput = EnableAndRequiredCheck(dropDownObj.isEnabled, dropDownObj.isRequired);

        dropdownobject.push("<select id='" + dropDownObj.selectIdName + "-select' class='" + dropDownObj.selectClassName + " col-md-12' " + dropDownObj.checkFunction + " " + erOutput + ">");

        for (let i = 0; i < dropDownObj.options.length; i++) {
            if (dropDownObj.options[i].localeCompare(dropDownObj.selectedOption) === 0) {
                dropdownobject.push("<option class='" + dropDownObj.optionsClassName + "' value='" + dropDownObj.options[i] + "' selected>" + dropDownObj.options[i] + "</option>");
            }
            else {
                dropdownobject.push("<option class='" + dropDownObj.optionsClassName + "' value='" + dropDownObj.options[i] + "'>" + dropDownObj.options[i] + "</option>");
            }
        }

        //Close off the <select> element, thus creating the dropdown element
        dropdownobject.push("</select>");

        return dropdownobject;
    };

    //This will take in the passed in Label and Note and create the full Dropdown element 
    function CreateDropDownContainer(
        dropDownObj
    ){
        let fullDDElement = [];
        let ddOutput = "";
        let reqText = "";
        if (dropDownObj.rulseMsg.length > 0) {
            reqText = AlertController(dropDownObj.rulseMsg[0], dropDownObj.rulseMsg[1]);
        }
        
        fullDDElement.push("<div id='" + dropDownObj.selectIdName + "'>");
        fullDDElement.push(dropDownObj.labelComp);
        fullDDElement.push(dropDownObj.noteComp);
        fullDDElement.push("<div id='" + dropDownObj.selectIdName + "-alertDiv'>" + reqText + "</div>");
     
        switch (dropDownObj.ddType) {
            case "Height":
                fullDDElement.push(CreateHeightDropDownList(dropDownObj));
                break;
            case "pre":
                fullDDElement.push(CreateDropDownElementPrescr(dropDownObj));
                break;
            case "normal":
            case "state":
                fullDDElement.push(CreateDropDownNormal(dropDownObj));
                break;
            case "ccg":
                fullDDElement.push(CreateHeightDropDownCCG(dropDownObj));
                break;
            default:
                fullDDElement.push(CreateDropDownElement(dropDownObj));
                break;
        }

        fullDDElement.push("</div>");

        ddOutput = CreateElement(fullDDElement);

        return ddOutput;
    };

    //let labelCompVar = labelComp !== "" ? labelComp : "";
    //let noteCompVar = noteComp !== "" ? noteComp : "";
    
    return CreateDropDownContainer(
        new DropDownObj(
            labelComp,
            noteComp,
            selectIdName,
            selectClassName,
            optionsClassName,
            isRequired,
            isEnabled,
            ddType,
            options,
            selectedOption,
            contextValue,
            rulesMessage,
            checkFunction
        )
    );
}
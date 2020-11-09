
const rulesCheckDropdown = (item) => {
    $(document).ready(function () {
        let id = item.split("-")[0];

        let selOptionText = "";

        let containerID = sessionStorage.getItem("contID");

        let control = $("#" + id + " option:selected");

        if (!NullOrEmptyCheck(control.val())) {
            let jqItem = data.dataList.find(c => c.id === id);

            selOptionText = "";
            let selOpt;
            let optSplit;

            if (!NullOrEmptyCheck(control.text())) {
                selOptionText = control.text();
                optSplit = selOptionText.split(" ");
            }

            if (optSplit[0].localeCompare("Please") === 0) {
                selOpt = selOptionText;
            }
            else {
                if (!NullOrEmptyCheck(jqItem.responses)) {
                    selOpt = jqItem.responses.find(r => r.value === selOptionText);
                }
            }

            //Post: UpdateContainerData
            console.log("Checking Rules for Issues! Current ID is: " + id);
            console.log("Current Selected Option: " + selOptionText);
            console.log("Current Container ID: " + containerID);
            console.log("Current CVID: " + jqItem.cvid);

            let containerData =
            {
                id: containerID,
                contextID: id,
                cvID: jqItem.cvid,
                controlType: jqItem.controlType,
                value: selOptionText,
                variableName: jqItem.variableName,
                sector: jqItem.pageSuffix,
                legacyValue: selOpt.legacyValue,
                formQuestionNum: jqItem.formQuestionNum,
                kcId: jqItem.kcId,
                formField: jqItem.formField,
                effDate: jqItem.effDate,
                dataType: jqItem.dataType
            };

            let alertDiv = $("#" + id + "-alertDiv");

            while (alertDiv.children().length > 0) {
                $("#" + id + "-alertDiv").empty();
            }

            PostData("Application/UpdateContainerData", containerData);
        }
        else {
            $("#" + id + "-alertDiv").empty();
            $("#" + id + "-alertDiv").append(AlertController("danger", "Please select a response!"));
        }
    });
}

const rulesCheckHeight = (item) => {
    $(document).ready(function () {

        let id = item.split("-")[0];

        let contextVal = "";
        let containerID = sessionStorage.getItem("contID");

        let selEls = $("#" + id).find('select');

        if (selEls.length > 0) {
            if (selEls[0].selectedIndex > 0 && selEls[1].selectedIndex > 0) {
                let heightVal = (parseInt(selEls[0].value * 12) + parseInt(selEls[1].value));
                contextVal = "Height";

                if (!NullOrEmptyCheck(contextVal)) {
                    let jqItem = data.dataList.find(c => c.id === id);

                    console.log("Checking Rules for Issues! Current ID is: " + id);
                    console.log("Current Value: " + heightVal);
                    console.log("Current Container ID: " + containerID);
                    console.log("Current CVID: " + jqItem.cvid);

                    let alertDiv = $("#" + id).find("div");

                    while (alertDiv.children().length > 0) {
                        alertDiv.empty();
                    }

                    //Post: UpdateContainerData
                    let containerData =
                    {
                        id: containerID,
                        contextID: id,
                        cvID: jqItem.cvid,
                        controlType: jqItem.controlType,
                        value: heightVal.toString(),
                        variableName: jqItem.variableName,
                        sector: jqItem.pageSuffix,
                        legacyValue: jqItem.legacyValue,
                        formQuestionNum: jqItem.formQuestionNum,
                        kcId: jqItem.kcId,
                        formField: jqItem.formField,
                        effDate: jqItem.effDate,
                        dataType: jqItem.dataType
                    };

                    PostData("Application/UpdateContainerData", containerData);

                }
                else {
                    $("#" + id + "-alertDiv").empty();
                    $("#" + id + "-alertDiv").append(AlertController("danger", "Please select a response!"));
                }
            }
            else {
                $("#" + id + "-alertDiv").empty();
                $("#" + id + "-alertDiv").append(AlertController("danger", "Please select a response!"));
            }
        }
        else {
            var heightVal = 0;
            var jqItem = data.dataList.find(c => c.id === id);

            //Post: UpdateContainerData
            var containerData =
            {
                id: containerID,
                contextID: id,
                cvID: jqItem.cvid,
                controlType: jqItem.controlType,
                value: heightVal.toString(),
                variableName: jqItem.variableName,
                sector: jqItem.pageSuffix,
                legacyValue: jqItem.legacyValue,
                formQuestionNum: jqItem.formQuestionNum,
                kcId: jqItem.kcId,
                formField: jqItem.formField,
                effDate: jqItem.effDate,
                dataType: jqItem.dataType
            };

            PostData("Application/UpdateContainerData", containerData);
        }
    });
}

const rulesCheckDropdownTriggerEl = (item) => {
    $(document).ready(function () {
        let contextID, isTrigger, isDual = "";

        let isHTMLColl = item.id !== undefined ? item.id : item[0].id;

        if (item.id.split("-").length > 0) {
            contextID = item.id.split("-")[0];
        }
        else {
            contextID = isHTMLColl;
        }

        let containerID = sessionStorage.getItem("contID");

        let control = $("#" + String(isHTMLColl) + " option:selected");

        let baseId = isHTMLColl.substring(0, 6);
        let jqItem = data.dataList.find(c => c.id === baseId);

        isTrigger = control.attr('is-trigger') === 'true' ? true : false;

        let trigSplit = jqItem.triggerType.split("_");
        isDual = trigSplit[1].localeCompare("dual") === 0 ? true : false;

        //Post: UpdateContainerData
        console.log("Context ID: " + contextID);
        console.log("Checking Rules for Issues! Current ID is: " + baseId);
        console.log("Current Context Value: " + control.text());
        console.log("Current CVID: " + jqItem.cvid);

        let containerData =
        {
            id: containerID,
            contextID: baseId,
            cvID: jqItem.cvid,
            controlType: jqItem.controlType,
            value: control.text(),
            variableName: jqItem.variableName,
            sector: jqItem.pageSuffix,
            legacyValue: jqItem.legacyValue,
            formQuestionNum: jqItem.formQuestionNum,
            kcId: jqItem.kcId,
            formField: jqItem.formField,
            effDate: jqItem.effDate,
            dataType: jqItem.dataType
        };

        let prefix = baseId.substring(0, 3);

        console.log("#" + prefix + "Btn");

        $("#" + prefix + "Btn #btnIcon").empty();
        $("#" + prefix + "Btn #btnIcon").append("<i class='fa fa-exclamation'></i>");

        PostData("Application/UpdateContainerData", containerData);

        let alertDiv = $("#" + baseId + "-alertDiv");

        while (alertDiv.children().length > 0) {
            alertDiv.removeChild(alertDiv.firstChild);
        }

        if (isTrigger) {
            if (isDual) {
                AccordionCardDDLSwitcher(item);
            }
            else {
                let baseID = isHTMLColl.split("-")[0];

                $("#" + baseID + "-AccorDDLSel-DDAccordID").collapse("show");
            }
        }
        else {
            if (isDual) {
                AccordionCardDDLSwitcher(item);
            }
            else {
                let baseID = isHTMLColl.split("-")[0];

                $("#" + baseID + "-AccorDDLSel-DDAccordID").collapse("hide");
            }
        }
    });
}

const editRulesCheckInput = (item) => {
    $(document).ready(function () {

        const CallPostBack = (itemID, type, cvid) => {

            let containerID, control, itemID, dlItem, optSel, outputVal, inputVal;

            containerID = sessionStorage.getItem("contID");
            control = $("#" + itemID);

            let alertDiv, containerData;
            if (NullOrEmptyCheck(type)) {

                dlItem = data.dataList.find(d => d.id === itemID);
                outputVal = control.val();

                //This is so that all changes could be reflected on the front end (Post back does not change data.datalist vals)
                dlItem.answer = outputVal;

                //Post: UpdateContainerData
                containerData =
                {
                    id: containerID,
                    contextID: itemID,
                    cvID: cvid,
                    controlType: dlItem.controlType,
                    value: outputVal,
                    variableName: dlItem.variableName,
                    sector: dlItem.pageSuffix,
                    legacyValue: null,
                    formQuestionNum: dlItem.formQuestionNum,
                    kcId: dlItem.kcId,
                    formField: dlItem.formField,
                    effDate: dlItem.effDate,
                    dataType: dlItem.dataType
                };

                alertDiv = $("#" + itemID + "-alertDiv");

                if (alertDiv.children().length > 0) {
                    alertDiv.empty();
                }

                PostData("Application/UpdateContainerData", containerData);
            }
            else {
                
                switch (type) {
                    case "radio":
                        //case "prescription":
                        itemID = item.length > 6 ? item.substring(0, item.length - 1) : item;
                        dlItem = data.dataList.find(d => d.id === itemID);
                        optSel = dlItem.responses.find(v => v.value === control.val());

                        //This is so that all changes could be reflected on the front end (Post back does not change data.datalist vals)
                        dlItem.answer = control.val();

                        if ($("#" + item).length) {
                            console.log("Checking Rules for Issues! Current ID is: " + itemID);
                            console.log("Current Value: " + control.val());
                            console.log("Current Container ID: " + containerID);
                            console.log("Current CVID: " + cvid);

                            containerData =
                            {
                                id: containerID,
                                contextID: itemID,
                                cvID: cvid,
                                controlType: dlItem.controlType,
                                value: control.val(),
                                variableName: dlItem.variableName,
                                sector: dlItem.pageSuffix,
                                legacyValue: optSel.legacyValue,
                                formQuestionNum: dlItem.formQuestionNum,
                                kcId: dlItem.kcId,
                                formField: dlItem.formField,
                                effDate: dlItem.effDate,
                                dataType: dlItem.dataType
                            };

                            let trueID = item.substring(0, item.length - 1);
                            let alertDiv = $("#" + trueID + "-alertDiv");
                            alertDiv.empty();
                        }
                        else {
                            let cntrl = data.dataList.find(d => d.id === itemID);

                            containerData =
                            {
                                id: containerID,
                                contextID: itemID,
                                cvID: cntrl.cvid,
                                controlType: cntrl.controlType,
                                value: cntrl.answer,
                                variableName: cntrl.variableName,
                                sector: cntrl.pageSuffix,
                                legacyValue: cntrl.responses.find(v => v.value === cntrl.answer).legacyValue,
                                formQuestionNum: cntrl.formQuestionNum,
                                kcId: dlItem.kcId,
                                formField: cntrl.formField,
                                effDate: cntrl.effDate,
                                dataType: cntrl.dataType
                            };

                            let trueID = item.substring(0, item.length - 1);
                            let alertDiv = $("#" + trueID + "-alertDiv");
                            alertDiv.empty();
                        }

                        PostData("Application/UpdateContainerData", containerData);
                        break;
                    case "date":
                        let tempVal = control.val().replace(/\//g, "").toString();

                        let m, d, y = "";
                        let errors = [];

                        if (tempVal.length === 8) {
                            m = tempVal.substring(0, 2);
                            d = tempVal.substring(2, 4);
                            y = tempVal.substring(4, control.val().length);

                            if (isCorrectDateRange(m, d, y).length > 0) {
                                errors.push(isCorrectDateRange(m, d, y));
                            }

                        }
                        else {
                            errors.push("Date is Invalid! Please input a valid date in 'XX/XX/XXXX' format!");
                        }

                        if (errors.length === 0) {
                            dlItem = data.dataList.find(d => d.id === itemID);

                            //This is so that all changes could be reflected on the front end (Post back does not change data.datalist vals)
                            dlItem.answer = control.val();

                            //Post: UpdateContainerData
                            containerData =
                            {
                                id: containerID,
                                contextID: itemID,
                                cvID: cvid,
                                controlType: dlItem.controlType,
                                value: control.val(),
                                variableName: dlItem.variableName,
                                sector: dlItem.pageSuffix,
                                legacyValue: null,
                                formQuestionNum: dlItem.formQuestionNum,
                                kcId: dlItem.kcId,
                                formField: dlItem.formField,
                                effDate: dlItem.effDate,
                                dataType: dlItem.dataType
                            };

                            alertDiv = $("#" + itemID + "-alertDiv");
                            alertDiv.empty();

                            data.dataList.find(d => d.id === itemID).answer = control.val();

                            PostData("Application/UpdateContainerData", containerData);
                        }
                        break;
                    case "phone":
                        let tempVal = control.val().replace(/\//g, "()-").replace(/\s/g, '').toString();

                        //Post: UpdateContainerData
                        dlItem = data.dataList.find(d => d.id === itemID);

                        //This is so that all changes could be reflected on the front end (Post back does not change data.datalist vals)
                        dlItem.answer = control.val();

                        //Post: UpdateContainerData
                        containerData =
                        {
                            id: containerID,
                            contextID: itemID,
                            cvID: cvid,
                            controlType: dlItem.controlType,
                            value: tempVal,
                            variableName: dlItem.variableName,
                            sector: dlItem.pageSuffix,
                            legacyValue: null,
                            formQuestionNum: dlItem.formQuestionNum,
                            kcId: dlItem.kcId,
                            formField: dlItem.formField,
                            effDate: dlItem.effDate,
                            dataType: dlItem.dataType
                        };

                        alertDiv = $("#" + itemID + "-alertDiv");
                        alertDiv.empty();

                        ApplyPhoneMask(itemID);

                        PostData("Application/UpdateContainerData", containerData);
                        break;
                    case "ssn":
                        let tempVal = control.val().replace(/[-]/g, "").toString();

                        //Post: UpdateContainerData
                        dlItem = data.dataList.find(d => d.id === itemID);

                        //This is so that all changes could be reflected on the front end (Post back does not change data.datalist vals)
                        dlItem.answer = control.val();

                        //Post: UpdateContainerData
                        containerData =
                        {
                            id: containerID,
                            contextID: itemID,
                            cvID: cvid,
                            controlType: dlItem.controlType,
                            value: tempVal,
                            variableName: dlItem.variableName,
                            sector: dlItem.pageSuffix,
                            legacyValue: null,
                            formQuestionNum: dlItem.formQuestionNum,
                            kcId: dlItem.kcId,
                            formField: dlItem.formField,
                            effDate: dlItem.effDate,
                            dataType: dlItem.dataType
                        };

                        alertDiv = $("#" + itemID + "-alertDiv");
                        alertDiv.empty();

                        ApplySSNMask(itemID);

                        PostData("Application/UpdateContainerData", containerData);
                        break;
                    case "email":
                        //Post: UpdateContainerData
                        dlItem = data.dataList.find(d => d.id === itemID);

                        //This is so that all changes could be reflected on the front end (Post back does not change data.datalist vals)
                        dlItem.answer = control.val();

                        //Post: UpdateContainerData
                        containerData =
                        {
                            id: containerID,
                            contextID: itemID,
                            cvID: cvid,
                            controlType: dlItem.controlType,
                            value: control.val(),
                            variableName: dlItem.variableName,
                            sector: dlItem.pageSuffix,
                            legacyValue: null,
                            formQuestionNum: dlItem.formQuestionNum,
                            kcId: dlItem.kcId,
                            formField: dlItem.formField,
                            effDate: dlItem.effDate,
                            dataType: dlItem.dataType
                        };

                        alertDiv = $("#" + itemID + "-alertDiv");
                        alertDiv.empty();

                        PostData("Application/UpdateContainerData", containerData);
                        break;
                    case "prescription":
                        itemID = item.length > 6 ? item.substring(0, item.length - 1) : item;

                        if ($("#" + item).length) {

                            dlItem = data.dataList.find(d => d.id === itemID);

                            //Post: UpdateContainerData
                            containerData =
                            {
                                id: containerID,
                                contextID: itemID,
                                cvID: cvid,
                                controlType: dlItem.controlType,
                                value: control.val(),
                                variableName: dlItem.variableName,
                                sector: dlItem.pageSuffix,
                                legacyValue: dlItem.responses.find(v => v.value === control.val()).legacyValue,
                                formQuestionNum: dlItem.formQuestionNum,
                                kcId: dlItem.kcId,
                                formField: dlItem.formField,
                                effDate: dlItem.effDate,
                                dataType: dlItem.dataType
                            };

                            let alertDiv = $("#" + itemID + "-alertDiv")
                            alertDiv.empty();

                            if (control.val().localeCompare("No") === 0) {
                                let thisPresc = siteItemStorage.prescriptionStore.prescriptionsList.find(p => p.id === itemID);
                                thisPresc.perscribedDrugs = [];
                            }
                        }
                        else {
                            let dlItem = data.dataList.find(d => d.id === itemID);
                            let optSel = dlItem.responses.find(v => v.value === dlItem.answer);

                            //Post: UpdateContainerData
                            containerData =
                            {
                                id: containerID,
                                contextID: itemID,
                                cvID: dlItem.cvid,
                                controlType: dlItem.controlType,
                                value: dlItem.answer,
                                variableName: dlItem.variableName,
                                sector: dlItem.pageSuffix,
                                legacyValue: optSel.legacyValue,
                                formQuestionNum: dlItem.formQuestionNum,
                                kcId: dlItem.kcId,
                                formField: dlItem.formField,
                                effDate: dlItem.effDate,
                                dataType: dlItem.dataType
                            };

                            let alertDiv = $("#" + itemID + "-alertDiv")
                            alertDiv.empty();
                        }

                        PostData("Application/UpdateContainerData", containerData);
                        break
                    case "company":
                        inputVal = control.val();

                        dlItem = data.dataList.find(d => d.id === itemID);
                        optSel = dlItem.responses.find(v => v.value === inputVal);

                        if (NullOrEmptyCheck(optSel)) {
                            //Company is not a company within the Response list, inputted val + 999
                            containerData =
                            {
                                id: containerID,
                                contextID: itemID,
                                cvID: dlItem.cvid,
                                controlType: dlItem.controlType,
                                value: control.val(),
                                value2: "999",
                                variableName: dlItem.variableName,
                                sector: dlItem.pageSuffix,
                                legacyValue: null,
                                formQuestionNum: dlItem.formQuestionNum,
                                kcId: dlItem.kcId,
                                formField: dlItem.formField,
                                effDate: dlItem.effDate,
                                dataType: dlItem.dataType
                            };
                        }
                        else {
                            //Else Company is in the Response list, inputted val + seqNum as Value2
                            containerData =
                            {
                                id: containerID,
                                contextID: itemID,
                                cvID: dlItem.cvid,
                                controlType: dlItem.controlType,
                                value: control.val(),
                                value2: optSel.seqNum.toString(),
                                variableName: dlItem.variableName,
                                sector: dlItem.pageSuffix,
                                legacyValue: optSel.legacyValue,
                                formQuestionNum: dlItem.formQuestionNum,
                                kcId: dlItem.kcId,
                                formField: dlItem.formField,
                                effDate: dlItem.effDate,
                                dataType: dlItem.dataType
                            };
                        }

                        var alertDiv = $("#" + itemID + "-alertDiv")
                        alertDiv.empty();

                        PostData("Application/UpdateContainerData", containerData);
                        break;
                    case "pay":
                        inputVal = control.prop('checked') ? "Yes" : "No";

                        dlItem = data.dataList.find(d => d.id === itemID);

                        containerData =
                        {
                            id: containerID,
                            contextID: itemID,
                            cvID: dlItem.cvid,
                            controlType: dlItem.controlType,
                            value: inputVal,
                            variableName: dlItem.variableName,
                            sector: dlItem.pageSuffix,
                            legacyValue: null,
                            formQuestionNum: dlItem.formQuestionNum,
                            kcId: dlItem.kcId,
                            formField: dlItem.formField,
                            effDate: dlItem.effDate,
                            dataType: dlItem.dataType
                        };

                        var alertDiv = $("#" + itemID + "-alertDiv")
                        alertDiv.empty();

                        PostData("Application/UpdateContainerData", containerData);
                        break;
                    case "cb":
                        inputVal = control.prop('checked');

                        dlItem = data.dataList.find(d => d.id === itemID);

                        containerData =
                        {
                            id: containerID,
                            contextID: itemID,
                            cvID: dlItem.cvid,
                            controlType: dlItem.controlType,
                            value: inputVal,
                            variableName: dlItem.variableName,
                            sector: dlItem.pageSuffix,
                            legacyValue: null,
                            formQuestionNum: dlItem.formQuestionNum,
                            kcId: dlItem.kcId,
                            formField: dlItem.formField,
                            effDate: dlItem.effDate,
                            dataType: dlItem.dataType
                        };

                        var alertDiv = $("#" + itemID + "-alertDiv")
                        alertDiv.empty();

                        PostData("Application/UpdateContainerData", containerData);
                        break;
                }
            }
        };

         //Now use the true id to get the actual control ID to get the control type
         let jqItem = data.dataList.find(c => c.id === item.id);
         let controlType = jqItem.controlType;
         let trueID = item.id;

         if (!NullOrEmptyCheck(controlType)) {
            switch (controlType) {
                case "date":
                    if (DateYearQuickCheck(trueID)) {
                        if (window.innerWidth < 1024) {
                            RemovePopper(trueID);
                        }

                        CallPostBack(trueID, "date", jqItem.cvid);
                    }
                    else {
                        if (jqItem.isRequired === true) {
                            if (window.innerWidth > 1024) {
                                $("#" + trueID + "-alertDiv").empty();
                                $("#" + trueID + "-alertDiv").append(AlertController("danger", "Date is Invalid! Please input a valid date in 'XX/XX/XXXX' format!"));
                            }
                            else {
                                PopperAlert(trueID, "Please input a valid date in 'XX/XX/XXXX' format!", "top", "Date is Invalid!");
                            }
                        }
                    }
                    break;
                case "phone":
                    if (phoneChecker($("#" + trueID).val())) {
                        if (window.innerWidth < 1024) {
                            RemovePopper(trueID);
                        }

                        CallPostBack(trueID, "phone", jqItem.cvid);
                    }
                    else {
                        if (jqItem.isRequired === true) {
                            if (window.innerWidth > 1024) {
                                $("#" + trueID + "-alertDiv").empty();
                                $("#" + trueID + "-alertDiv").append(AlertController("danger", "Phone Number is Invalid! Please input a valid phone number."));
                            }
                            else {
                                PopperAlert(trueID, "Please input a valid phone number.", "top", "Phone Number is Invalid!");
                            }
                        }
                    }
                    break;
                case "ssn":
                    if (ssnChecker($("#" + trueID).val())) {
                        if (window.innerWidth < 1024) {
                            RemovePopper(trueID);
                        }

                        CallPostBack(trueID, "ssn", jqItem.cvid);
                    }
                    else {
                        if (jqItem.isRequired === true) {
                            if (window.innerWidth > 1024) {
                                $("#" + trueID + "-alertDiv").empty();
                                $("#" + trueID + "-alertDiv").append(AlertController("danger", "SSN is Required! Please input a valid SSN."));
                            }
                            else {
                                PopperAlert(trueID, "Please input a valid SSN.", "top", "SSN is Required!");
                            }
                        }
                    }
                    break;
                case "ssn4":
                    if (ssn4Checker($("#" + trueID).val())) {
                        if (window.innerWidth < 1024) {
                            RemovePopper(trueID);
                        }

                        CallPostBack(trueID, "ssn4", jqItem.cvid);
                    }
                    else {
                        if (jqItem.isRequired === true) {
                            if (window.innerWidth > 1024) {
                                $("#" + trueID + "-alertDiv").empty();
                                $("#" + trueID + "-alertDiv").append(AlertController("danger", "SSN is Required! Please input a valid SSN."));
                            }
                            else {
                                PopperAlert(trueID, "Please input a valid SSN.", "top", "SSN is Required!");
                            }
                        }
                    }
                    break;
                case "zip":
                    if (zipChecker($("#" + trueID).val())) {
                        if (window.innerWidth < 1024) {
                            RemovePopper(trueID);
                        }

                        CallPostBack(trueID, "zip", jqItem.cvid);
                    }
                    else {
                        if (jqItem.isRequired === true) {
                            if (window.innerWidth > 1024) {
                                $("#" + trueID + "-alertDiv").empty();
                                $("#" + trueID + "-alertDiv").append(AlertController("danger", "Zip code is Invalid! Please input a valid Zip code."));
                            }
                            else {
                                PopperAlert(trueID, "Please input a valid Zip code.", "top", "Zip code is Invalid!");
                            }
                        }
                    }
                    break;

                case "textbox":
                    if (textChecker($("#" + trueID).val())) {
                        if (window.innerWidth < 1024) {
                            RemovePopper(trueID);
                        }

                        CallPostBack(trueID, "", jqItem.cvid);
                    }
                    else {
                        if (jqItem.isRequired === true) {
                            if (window.innerWidth > 1024) {
                                $("#" + trueID + "-alertDiv").empty();
                                $("#" + trueID + "-alertDiv").append(AlertController("danger", "Input is Required! Please make a valid input."));
                            }
                            else {
                                PopperAlert(trueID, "Please make a valid input.", "top", "Input is Required!");
                            }
                        }
                    }
                    break;
                case "checkbox":
                    if (window.innerWidth < 1024) {
                        RemovePopper(trueID);
                    }

                    CallPostBack(trueID, "cb", jqItem.cvid);
                    break;
                case "email":
                    if (NullOrEmptyCheck(!hasEmailError($("#" + trueID).val()))) {
                        if (window.innerWidth < 1024) {
                            RemovePopper(trueID);
                        }
                        CallPostBack(trueID, "email", jqItem.cvid);
                    }
                    else {
                        if (jqItem.isRequired === true) {
                            if (window.innerWidth > 1024) {
                                document.getElementById(String(trueID) + "-alertDiv").innerHTML = "";
                                document.getElementById(String(trueID) + "-alertDiv").innerHTML = AlertController("danger", "E-Mail is Invalid! Please input a valid e-mail address.");
                            }
                            else {
                                PopperAlert(trueID, "Please input a valid e-mail address.", "top", "E-Mail is Invalid!");
                            }
                        }
                    }
                    break;
                case "radio":
                    CallPostBack(trueID, "radio", jqItem.cvid);
                    break;
                case "prescription":
                    CallPostBack(trueID, "prescription", jqItem.cvid);
                    break;
                case "text":
                    if (textChecker($("#" + trueID).val())) {
                        if (window.innerWidth < 1024) {
                            RemovePopper(trueID);
                        }

                        CallPostBack(trueID, "text", jqItem.cvid);
                    }
                    else {
                        if (jqItem.isRequired === true) {
                            if (window.innerWidth > 1024) {
                                document.getElementById(String(trueID) + "-alertDiv").innerHTML = "";
                                document.getElementById(String(trueID) + "-alertDiv").innerHTML = AlertController("danger", "Number value is Required! Please input a valid number!");
                            }
                            else {
                                PopperAlert(trueID, "Please make a valid input.", "top", "Input is Required!");
                            }
                        }
                    }
                    break;
                case "number":
                    if (numberInputChecker(parseInt($("#" + trueID).val()))) {
                        if (window.innerWidth < 1024) {
                            RemovePopper(trueID);
                        }

                        CallPostBack(trueID, "number", jqItem.cvid);
                    }
                    else {
                        if (jqItem.isRequired === true) {
                            if (window.innerWidth > 1024) {
                                document.getElementById(String(trueID) + "-alertDiv").innerHTML = "";
                                document.getElementById(String(trueID) + "-alertDiv").innerHTML = AlertController("danger", "Number value is Required! Please input a valid number!");
                            }
                            else {
                                PopperAlert(trueID, "Please input a valid number!", "top", "Number value is Required!");
                            }
                        }
                    }
                    break;
                case "company":
                    if (!NullOrEmptyCheck($("#" + trueID).val())) {

                        if (window.innerWidth < 1024) {
                            RemovePopper(trueID);
                        }

                        CallPostBack(trueID, "company", jqItem.cvid);
                    }
                    else {
                        if (jqItem.isRequired === true) {
                            if (window.innerWidth > 1024) {
                                document.getElementById(String(trueID) + "-alertDiv").innerHTML = "";
                                document.getElementById(String(trueID) + "-alertDiv").innerHTML = AlertController("danger", "Input is Required! Please make a valid input!");
                            }
                            else {
                                PopperAlert(trueID, "Please make a valid input!", "top", "Input is Required!");
                            }
                        }
                    }
                    break;
                default:
                    if (!NullOrEmptyCheck($("#" + trueID).val())) {

                        if (window.innerWidth < 1024) {
                            RemovePopper(trueID);
                        }

                        CallPostBack(trueID, "", jqItem.cvid);
                    }
                    else {
                        if (jqItem.isRequired === true) {
                            if (window.innerWidth > 1024) {
                                document.getElementById(String(trueID) + "-alertDiv").innerHTML = "";
                                document.getElementById(String(trueID) + "-alertDiv").innerHTML = AlertController("danger", "Input is Required! Please make a valid input!");
                            }
                            else {
                                PopperAlert(trueID, "Please make a valid input!", "top", "Input is Required!");
                            }
                        }
                    }
                    break;
            }
        }
    });
}

const CheckSearchInputs = () => {
    $(document).ready(function () {
        console.log("In Check Inputs!");
        $('#dateTo').attr('disabled', 'disabled');
        $('.search-submit-btn').attr('disabled', 'disabled');

        var lastInput = $('#lastName').val();
        var firstInput = $('#firstName').val();
        var emailInput = $('#emailAdd').val();
        var phoneInput = $('#phoneNum').val();
        var dfInput = $('#dateFrom').val();
        var dtInput = $('#dateTo').val();
        var statusInput = $('#status :selected').val();
        var policyNumber = $('#policyNumber').val();

        console.log(statusInput);

        if (lastInput === '' &&
            firstInput === '' &&
            emailInput === '' &&
            phoneInput === '' &&
            dfInput === '' &&
            policyNumber ==='' &&
            statusInput === '') {
            $('.warning').html("");
            $('.warning').append("Please fill out at least one search item.");
        } else {
            $('#dateTo').removeAttr('disabled');
            if (dfInput !== '' && dtInput === '') {
                $('.warning').html("");
                $('.warning').append("Date Range MUST have a Beginning and Ending date.");
            } else {
                if (Date.parse(dtInput) <= Date.parse(dfInput)) {
                    $('.warning').html("");
                    $('.warning').append("To Date must be AFTER the From Date. Pleae adjust the dates.");
                } else {
                    $('.warning').html("");
                    $('.search-submit-btn').removeAttr('disabled');
                }
            }
        }
    });
}

const isCorrectYearRange = (year) => {
    if (parseInt(year) > 3000) {
        return "Year is greater than the max allowed. Please reinput the correct year.";
    }
    else if (parseInt(year) < 0) {
        return "Year is less than 0. Please reinput the correct year.";
    }
    else {
        return "";
    }
}

const isCorrectMonthRange = (month) => {
    if (parseInt(month) > 12) {
        return "Month is greater than 12. Please reinput the correct month.";
    }
    else if (parseInt(month) < 0) {
        return "Month is less than 0. Please reinput the correct month.";
    }
    else {
        return "";
    }
}

const isCorrectDateRange = (month, day, year) => {
    let totalOut = [];

    let mthCheck = isCorrectMonthRange(month);
    let yrCheck = isCorrectYearRange(year);

    if (NullOrEmptyCheck(mthCheck) && NullOrEmptyCheck(yrCheck)) {
        let date = new Date(parseInt(year), parseInt(month), 0).getDate();

        if (parseInt(day) > date) {
            totalOut.push("Current date is past the maximum for the given month and year combination. Please reinput the correct date.");
        }
        else if (parseInt(day) < 0) {
            totalOut.push("Current date is 0, or below. Please reinput the correct date.");
        }
    }
    else {
        !NullOrEmptyCheck(mthCheck) ? totalOut.push(mthCheck) : "";
        !NullOrEmptyCheck(yrCheck) ? totalOut.push(yrCheck) : "";
    }

    return totalOut;
}

const DateYearQuickCheck = (el) => {
    let item = $("#" + el);

    let errMsg = [];

    let date = item.val();

    if (NullOrEmptyCheck(date)) {
        errMsg.push("No date is inputted! Please input a date.");
    }
    else {
        let dateSplit = date.split("/");
        let parsedDate = [];
        let mth, dt, yr;

        if (dateSplit.length === 3) {
            mth = dateSplit[0];
            dt = dateSplit[1];
            yr = dateSplit[2];

            parsedDate.push(parseInt(mth));
            parsedDate.push(parseInt(dt));
            parsedDate.push(parseInt(yr));

            console.log(parsedDate);

            errMsg = isCorrectDateRange(parsedDate[0], parsedDate[1], parsedDate[2]);
        }
        else if (dateSplit[0].length === 8) {
            mth = (date[0] + date[1]);
            dt = (date[2] + date[3]);
            yr = (date[4] + date[5] + date[6] + date[7]);

            parsedDate.push(parseInt(mth));
            parsedDate.push(parseInt(dt));
            parsedDate.push(parseInt(yr));

            console.log(parsedDate);

            errMsg = isCorrectDateRange(parsedDate[0], parsedDate[1], parsedDate[2]);
        }
        else {
            errMsg.push("Incorrect Year Format! Please input a 4-digit year.");
        }
    }

    if (errMsg.length > 0) {
        $("#" + el + "-alertDiv").empty();
        for (var e = 0; e < errMsg.length; e++) {
            $("#" + el + "-alertDiv").append(AlertController("danger", errMsg[e]));
        }

        return false;
    }
    else {
        $("#" + el + "-alertDiv").empty();
        return true;
    }

};

//TODO: Call an AJAX Post that the fraud check has been done
const AcceptFraudWarning = () => {
    $("#fraudModal").remove();
    $(".modal-backdrop").remove();
}

const isJSONObjEmpty = (obj) => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const IsPtBDateGreater = (ptAVal, ptBVal) => {
    let dateASplit = ptAVal.split("/");
    let dateBSplit = ptBVal.split("/");

    //Start with a year check
    if (parseInt(dateBSplit[2]) > parseInt(dateASplit[2])) {
        //If Pt B Year greater or equal to Pt A Year, we're auto good
        return true;
    }
    else {
        //else check if opposite
        if (parseInt(dateASplit[2]) > parseInt(dateBSplit[2])) {
            //If Pt A Year greater than Pt B Year, we're auto bad
            return false;
        }
        else if (parseInt(dateASplit[2]) === parseInt(dateBSplit[2])) {
            //If Pt A and Pt B Year are equal, check month first
            if (parseInt(dateBSplit[0]) > parseInt(dateASplit[0])) {
                //If PtB Month is greater than PtA month, we're good
                return true;
            }
            else if (parseInt(dateASplit[0]) === parseInt(dateBSplit[0])) {
                //else, if equal, then check days
                if (parseInt(dateBSplit[1]) >= parseInt(dateASplit[1])) {
                    //if ptB day is bigger or equal than ptA day, we're good
                    return true;
                }
                else if (parseInt(dateASplit[1]) > parseInt(dateBSplit[1])) {
                    //else if PtA day is bigger than ptB day, we're bad
                    return false;
                }
            }
        }
    }
}
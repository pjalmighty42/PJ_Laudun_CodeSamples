/// <reference path="../components/accordiondropdowngroup.js" />
/// <reference path="~/wwwroot/src/js/EAppJS/HelperFunctions/HelperFunctions.js" />
var eAppRulesStorage = {
    reqiresPageReload: false,
    parID: ""
};

function rulesCheckDropdown(item) {
    $(document).ready(function () {
        var id = item.split("-")[0];

        var selOptionText, control = "";

        var containerID = sessionStorage.getItem("contID");

        control = $("#" + id + " option:selected");

        if (!NullOrEmptyCheck(control.val())) {
            var jqItem = data.dataList.find(c => c.id === id);

            selOptionText = "";
            var selOpt;
            var optSplit;

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

            var containerData =
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

            var alertDiv = $("#" + id + "-alertDiv");

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

function rulesCheckHeight(item) {
    $(document).ready(function () {

        var id = item.split("-")[0];

        var contextVal = "";
        var containerID = sessionStorage.getItem("contID");

        var selEls = $("#" + id).find('select');

        if (selEls.length > 0) {
            if (selEls[0].selectedIndex > 0 && selEls[1].selectedIndex > 0) {
                var heightVal = (parseInt(selEls[0].value * 12) + parseInt(selEls[1].value));
                contextVal = "Height";

                if (!NullOrEmptyCheck(contextVal)) {
                    var jqItem = data.dataList.find(c => c.id === id);

                    console.log("Checking Rules for Issues! Current ID is: " + id);
                    console.log("Current Value: " + heightVal);
                    console.log("Current Container ID: " + containerID);
                    console.log("Current CVID: " + jqItem.cvid);

                    var alertDiv = $("#" + id).find("div");

                    while (alertDiv.children().length > 0) {
                        alertDiv.empty();
                    }

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

function rulesCheckDropdownTriggerEl(item) {
    $(document).ready(function () {
        var contextID, isTrigger, isDual = "";

        var isHTMLColl = item.id !== undefined ? item.id : item[0].id;

        if (item.id.split("-").length > 0) {
            contextID = item.id.split("-")[0];
        }
        else {
            contextID = isHTMLColl;
        }

        var containerID = sessionStorage.getItem("contID");

        var control = $("#" + String(isHTMLColl) + " option:selected");

        var baseId = isHTMLColl.substring(0, 6);
        var jqItem = data.dataList.find(c => c.id === baseId);

        isTrigger = control.attr('is-trigger') === 'true' ? true : false;

        var trigSplit = jqItem.triggerType.split("_");
        isDual = trigSplit[1].localeCompare("dual") === 0 ? true : false;

        //Post: UpdateContainerData
        console.log("Context ID: " + contextID);
        console.log("Checking Rules for Issues! Current ID is: " + baseId);
        console.log("Current Context Value: " + control.text());
        console.log("Current CVID: " + jqItem.cvid);

        var containerData =
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

        var prefix = baseId.substring(0, 3);

        console.log("#" + prefix + "Btn");

        $("#" + prefix + "Btn #btnIcon").empty();
        $("#" + prefix + "Btn #btnIcon").append("<i class='fa fa-exclamation'></i>");

        PostData("Application/UpdateContainerData", containerData);

        var alertDiv = $("#" + baseId + "-alertDiv");

        while (alertDiv.children().length > 0) {
            alertDiv.removeChild(alertDiv.firstChild);
        }

        if (isTrigger) {
            if (isDual) {
                AccordionCardDDLSwitcher(item);
            }
            else {
                var baseID = isHTMLColl.split("-")[0];

                $("#" + baseID + "-AccorDDLSel-DDAccordID").collapse("show");
            }
        }
        else {
            if (isDual) {
                AccordionCardDDLSwitcher(item);
            }
            else {
                var baseID = isHTMLColl.split("-")[0];

                $("#" + baseID + "-AccorDDLSel-DDAccordID").collapse("hide");
            }
        }

    });
}

//Edit Application Rules Functions
function editRulesOpensEnables(arr) {
    //TODO: Call new URL Action
    PostData("Application/UpdateContainerData", arr);
}

function editRulesCheckInput(item, hasError) {
    $(document).ready(function () {

        function CallPostBack(itemID, type, cvid) {

            var containerID, control = "";

            containerID = sessionStorage.getItem("contID");
            control = $("#" + String(itemID));

            var alertDiv, containerData;
            if (NullOrEmptyCheck(type)) {

                var dlItem = data.dataList.find(d => d.id === itemID);
                var outputVal = control.val();

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
                        var itemID = item.length > 6 ? item.substring(0, item.length - 1) : item;
                        var dlItem = data.dataList.find(d => d.id === itemID);
                        var optSel = dlItem.responses.find(v => v.value === control.val());

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

                            var trueID = item.substring(0, item.length - 1);
                            var alertDiv = $("#" + trueID + "-alertDiv");
                            alertDiv.empty();
                        }
                        else {
                            var cntrl = data.dataList.find(d => d.id === itemID);

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

                            var trueID = item.substring(0, item.length - 1);
                            var alertDiv = $("#" + trueID + "-alertDiv");
                            alertDiv.empty();
                        }

                        PostData("Application/UpdateContainerData", containerData);
                        break;
                    case "date":
                        console.log(control.val());

                        var tempVal = control.val().replace(/\//g, "").toString();

                        var m, d, y = "";
                        var errors = [];

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
                            console.log("Checking Rules for Issues! Current ID is: " + itemID);
                            console.log("Current Value: " + control.val());
                            console.log("Current Container ID: " + containerID);
                            console.log("Current CVID: " + cvid);

                            var dlItem = data.dataList.find(d => d.id === itemID);

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

                            //if (dlItem.pageSuffix.localeCompare("COV") === 0) {
                            //    if (
                            //        dlItem.variableName.localeCompare("parta_date") === 0 ||
                            //        dlItem.variableName.localeCompare("partb_date") === 0
                            //    ) {
                            //        var dateObj = JSON.parse(sessionStorage.getItem("PartDateIDObj"));
                            //        var dateA = $("#" + dateObj.PartAID).val();
                            //        var dateB = $("#" + dateObj.PartBID).val();

                            //        if (!IsPtBDateGreater(dateA, dateB)) {
                            //            $("#" + dateObj.PartAID + "-alertDiv").empty();
                            //            $("#" + dateObj.PartBID + "-alertDiv").empty();

                            //            $("#" + dateObj.PartAID + "-alertDiv").append(AlertController("danger", "Part A Date cannot be greater than Part B date"));
                            //            $("#" + dateObj.PartBID + "-alertDiv").append(AlertController("danger", "Part A Date cannot be greater than Part B date"));
                            //        }
                            //        else {
                            //            $("#" + dateObj.PartAID + "-alertDiv").empty();
                            //            $("#" + dateObj.PartBID + "-alertDiv").empty();

                            //            PostData("Application/UpdateContainerData", containerData, "");
                            //        }
                            //    }
                            //} else {
                                PostData("Application/UpdateContainerData", containerData);
                            //}
                        }
                        break;
                    case "phone":
                        console.log(control.val());

                        var tempVal = control.val().replace(/\//g, "()-").replace(/\s/g, '').toString();

                        console.log("Checking Rules for Issues! Current ID is: " + itemID);
                        console.log("Current Value: " + tempVal);
                        console.log("Current Container ID: " + containerID);
                        console.log("Current CVID: " + cvid);

                        //Post: UpdateContainerData
                        var dlItem = data.dataList.find(d => d.id === itemID);

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
                        console.log(control.val());

                        var tempVal = control.val().replace(/[-]/g, "").toString();

                        console.log("Checking Rules for Issues! Current ID is: " + itemID);
                        console.log("Current Value: " + tempVal);
                        console.log("Current Container ID: " + containerID);
                        console.log("Current CVID: " + cvid);

                        //Post: UpdateContainerData
                        var dlItem = data.dataList.find(d => d.id === itemID);

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
                        console.log(control.val());

                        console.log("Checking Rules for Issues! Current ID is: " + itemID);
                        console.log("Current Value: " + control.val());
                        console.log("Current Container ID: " + containerID);
                        console.log("Current CVID: " + cvid);

                        //Post: UpdateContainerData
                        var dlItem = data.dataList.find(d => d.id === itemID);

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
                        var itemID = item.length > 6 ? item.substring(0, item.length - 1) : item;

                        if ($("#" + item).length) {
                            console.log("Checking Rules for Issues! Current ID is: " + itemID);
                            console.log("Current Value: " + control.val());
                            console.log("Current Container ID: " + containerID);
                            console.log("Current CVID: " + cvid);

                            var dlItem = data.dataList.find(d => d.id === itemID);

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

                            var alertDiv = $("#" + itemID + "-alertDiv")
                            alertDiv.empty();

                            if (control.val().localeCompare("No") === 0) {
                                var thisPresc = siteItemStorage.prescriptionStore.prescriptionsList.find(p => p.id === itemID);
                                thisPresc.perscribedDrugs = [];
                            }
                        }
                        else {
                            var dlItem = data.dataList.find(d => d.id === itemID);
                            var optSel = dlItem.responses.find(v => v.value === dlItem.answer);

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

                            var alertDiv = $("#" + itemID + "-alertDiv")
                            alertDiv.empty();
                        }

                        PostData("Application/UpdateContainerData", containerData);
                        break
                    case "company":
                        console.log(control.val());
                        var inputVal = control.val();

                        var dlItem = data.dataList.find(d => d.id === itemID);
                        var optSel = dlItem.responses.find(v => v.value === inputVal);

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
                        console.log(control.val());
                        var inputVal = control.prop('checked') ? "Yes" : "No";

                        var dlItem = data.dataList.find(d => d.id === itemID);

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
                        console.log(control.val());
                        var inputVal = control.prop('checked');

                        var dlItem = data.dataList.find(d => d.id === itemID);

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

        function CallPostBackDualTriggerEls(itemID, selChildID, cvid) {

            var containerID, control, selControl = "";

            containerID = sessionStorage.getItem("contID");
            control = document.getElementById(String(itemID));
            selControl = document.getElementById(String(selChildID));

            if (!NullOrEmptyCheck(selControl)) {
                if (selControl.classList.contains("prescription")) {
                    var getParById = siteItemStorage.prescriptionStore.prescriptionsList.find(i => i.id.toLowerCase() === control.id.toLowerCase());
                    getParById.perscribedDrugs = [];
                }
            }
            else {
                selControl = control.value;
            }

            console.log("Checking Rules for Issues! Current ID is: " + control.id);
            console.log("Current Value: " + selControl.value);
            console.log("Current Container ID: " + containerID);
            console.log("Current CVID: " + cvid);

            var alertDiv = document.getElementById(String(control.id) + "-alertDiv");

            while (alertDiv.hasChildNodes()) {
                alertDiv.removeChild(alertDiv.firstChild);
            }

            var rbgstoreItem = siteItemStorage.dualRBGStore.find(r => r.id === itemID);

            console.log(rbgstoreItem);

            var dlItem = data.dataList.find(d => d.id === itemID);
            var optSel = dlItem.responses.find(v => v.value === selControl.value);

            var notSelChildren = [];
            var notSelIDs = [];

            for (var i = 0; i < rbgstoreItem.answerList.length; i++) {
                if (rbgstoreItem.answerList[i].seqNum !== optSel.seqNum) {

                    if (!NullOrEmptyCheck(rbgstoreItem.answerList[i].triggerType)) {
                        notSelChildren.push(rbgstoreItem.answerList[i].variableName);
                        notSelIDs.push(rbgstoreItem.answerList[i].id);

                        var triggerItem = data.dataList.find(t => t.id === rbgstoreItem.answerList[i].id)

                        for (var c = 0; c < triggerItem.childElementIDs.length; c++) {
                            let childID = triggerItem.childElementIDs[c].replace(/\s/g, '');
                            let triggerChildEl = data.dataList.find(c => c.id === childID);

                            if (typeof triggerChildEl !== 'undefined') {
                                notSelChildren.push(triggerChildEl.variableName);
                                notSelIDs.push(triggerChildEl.id);

                                var isChildIDs = ChildIDsTriggerCheck(triggerItem.childElementIDs[c].replace(/\s/g, ''));
                                var isChildTrigger = ChildTriggerCheck(triggerItem.childElementIDs[c].replace(/\s/g, ''));

                                if (isChildTrigger.length > 0) {
                                    for (var ce = 0; ce < isChildTrigger.length; ce++) {
                                        notSelChildren.push(isChildTrigger[ce].replace(/\s/g, ''));
                                    }
                                }
                                if (isChildIDs.length > 0) {
                                    for (var cid = 0; cid < isChildIDs.length; cid++) {
                                        notSelIDs.push(isChildIDs[cid].replace(/\s/g, ''));
                                    }
                                }
                            }
                        }
                    }
                    else {
                        notSelChildren.push(rbgstoreItem.answerList[i].variableName);
                        notSelIDs.push(rbgstoreItem.answerList[i].id);

                        var isChildIDs = ChildIDsTriggerCheck(rbgstoreItem.answerList[i].id.replace(/\s/g, ''));
                        var isChildTrigger = ChildTriggerCheck(rbgstoreItem.answerList[i].id.replace(/\s/g, ''));

                        if (isChildTrigger.length > 0) {
                            for (var ce = 0; ce < isChildTrigger.length; ce++) {
                                notSelChildren.push(isChildTrigger[ce].replace(/\s/g, ''));
                            }
                        }

                        if (isChildIDs.length > 0) {
                            for (var cid = 0; cid < isChildIDs.length; cid++) {
                                notSelIDs.push(isChildIDs[cid].replace(/\s/g, ''));
                            }
                        }
                    }
                }
            }

            console.log(notSelChildren);

            if (notSelChildren.length > 0) {
                eAppRulesStorage.reqiresPageReload = true;
                eAppRulesStorage.parID = itemID;

                if (!optSel.isTrigger) {
                    dlItem.answer = "";
                }
            }

            if (notSelIDs.length > 0) {
                for (var ch = 0; ch < notSelIDs.length; ch++) {
                    data.dataList.find(d => d.id === notSelIDs[ch]).answer = "";
                }
            }

            //Post: UpdateContainerData
            var containerData =
            {
                id: containerID,
                contextID: itemID,
                cvID: cvid,
                controlType: dlItem.controlType,
                value: selControl.value,
                value3: notSelChildren.length > 0 ? JSON.stringify(notSelChildren) : "",
                variableName: dlItem.variableName,
                sector: dlItem.pageSuffix,
                legacyValue: optSel.legacyValue,
                formQuestionNum: dlItem.formQuestionNum,
                kcId: dlItem.kcId,
                formField: dlItem.formField,
                effDate: dlItem.effDate,
                dataType: dlItem.dataType
            };

            if (optSel.isTrigger) {
                ApplyTriggersPostLoadList(dlItem.childElementIDs);
            }
            else {
                for (var ch = 0; ch < notSelIDs.length; ch++) {
                    ResetChildControls(notSelIDs[ch]);
                }
            }

            PostData("Application/UpdateContainerData", containerData);
        };

        function CallPostBackTriggerEls(itemID, selChildID, cvid) {

            var containerID, control, selControl = "";

            containerID = sessionStorage.getItem("contID");
            control = document.getElementById(String(itemID));
            selControl = document.getElementById(String(selChildID));

            if (!NullOrEmptyCheck(selControl)) {
                if (selControl.classList.contains("prescription")) {
                    var getParById = siteItemStorage.prescriptionStore.prescriptionsList.find(i => i.id.toLowerCase() === control.id.toLowerCase());
                    getParById.perscribedDrugs = [];
                }
            }
            else {
                selControl = control.value;
            }

            console.log("Checking Rules for Issues! Current ID is: " + control.id);
            console.log("Current Value: " + selControl.value);
            console.log("Current Container ID: " + containerID);
            console.log("Current CVID: " + cvid);

            var alertDiv = document.getElementById(String(control.id) + "-alertDiv");

            while (alertDiv.hasChildNodes()) {
                alertDiv.removeChild(alertDiv.firstChild);
            }

            var rbgstoreItem = siteItemStorage.dualRBGStore.find(r => r.id === itemID);

            console.log(rbgstoreItem);

            var dlItem = data.dataList.find(d => d.id === itemID);
            var optSel = dlItem.responses.find(v => v.value === selControl.value);

            var childVars = [];
            var childIds = [];
            //If isTrigger === false, then it's a closing option, get the child IDs for Elias
            if (!optSel.isTrigger) {
                for (var c = 0; c < dlItem.childElementIDs.length; c++) {
                    let dlEl = data.dataList.find(l => l.id === dlItem.childElementIDs[c].replace(/\s/g, ''));

                    childIds.push(dlEl.id);
                    childVars.push(dlEl.variableName);

                    var isChildIDs = ChildIDsTriggerCheck(dlItem.childElementIDs[c].replace(/\s/g, ''));
                    var isChildTrigger = ChildTriggerCheck(dlItem.childElementIDs[c].replace(/\s/g, ''));

                    if (isChildTrigger.length > 0) {
                        for (var ce = 0; ce < isChildTrigger.length; ce++) {
                            childVars.push(isChildTrigger[ce].replace(/\s/g, ''));
                        }
                    }

                    if (isChildIDs.length > 0) {
                        for (var cid = 0; cid < isChildIDs.length; cid++) {
                            childIds.push(isChildIDs[cid].replace(/\s/g, ''));
                        }
                    }
                }
            }
            console.log(childVars);

            if (childVars.length > 0) {
                eAppRulesStorage.reqiresPageReload = true;
                eAppRulesStorage.parID = itemID;
            }

            if (childIds.length > 0) {
                dlItem.answer = "";

                for (var ch = 0; ch < childIds.length; ch++) {
                    data.dataList.find(d => d.id === childIds[ch]).answer = "";
                }
            }

            //Post: UpdateContainerData
            var containerData =
            {
                id: containerID,
                contextID: itemID,
                cvID: cvid,
                controlType: dlItem.controlType,
                value: selControl.value,
                value3: childVars.length > 0 ? JSON.stringify(childVars) : "",
                variableName: dlItem.variableName,
                sector: dlItem.pageSuffix,
                legacyValue: optSel.legacyValue,
                formQuestionNum: dlItem.formQuestionNum,
                kcId: dlItem.kcId,
                formField: dlItem.formField,
                effDate: dlItem.effDate,
                dataType: dlItem.dataType
            };

            if (optSel.isTrigger) {
                ApplyTriggersPostLoadList(dlItem.childElementIDs);
            }
            else {
                for (var ch = 0; ch < childIds.length; ch++) {
                    ResetChildControls(childIds[ch]);
                }
            }

            PostData("Application/UpdateContainerData", containerData);
        };

        function CallSigningPostBack(itemID, type, cvid) {

            var containerID, control = "";

            containerID = sessionStorage.getItem("contID");
            control = $("#" + String(itemID));

            var alertDiv, containerData;
            if (NullOrEmptyCheck(type)) {

                var dlItem = data.dataList.find(d => d.id === itemID);

                if (type.localeCompare("email") === 0) {
                    var outputVal = control.val();


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


                    var pref = itemID.substring(0, 3);
                    var signObj = siteItemStorage.signingCount.find(o => o.signID === pref);
                    var childIndx = 0;

                    for (var i = 0; i < signObj.ids.length; i++) {
                        if (signObj.ids[i].localeCompare(itemID) === 0) {
                            childIndx = i;
                        }
                    }

                    signObj.ids.splice(childIndx, 1);

                    PostData("Application/UpdateContainerData", containerData, itemID);
                }
                else {
                    var outputVal = control.val();

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

                    var pref = itemID.substring(0, 3);
                    var signObj = siteItemStorage.signingCount.find(o => o.signID === pref);
                    var childIndx = 0;

                    for (var i = 0; i < signObj.ids.length; i++) {
                        if (signObj.ids[i].localeCompare(itemID) === 0) {
                            childIndx = i;
                        }
                    }

                    signObj.ids.splice(childIndx, 1);

                    PostData("Application/UpdateContainerData", containerData, itemID);
                }
            }
            else {
                switch (type) {
                    case "radio":
                        //case "prescription":
                        var itemID = item.length > 6 ? item.substring(0, item.length - 1) : item;
                        var dlItem = data.dataList.find(d => d.id === itemID);
                        var optSel = dlItem.responses.find(v => v.value === control.val());

                        if ($("#" + item).length) {
                            console.log("Checking Rules for Issues! Current ID is: " + itemID);
                            console.log("Current Value: " + control.val());
                            console.log("Current Container ID: " + containerID);
                            console.log("Current CVID: " + cvid);

                            containerData =
                            {
                                id: containerID,
                                contextID: itemID,
                                cvID: cntrl.cvid,
                                controlType: dlItem.controlType,
                                value: cntrl.answer,
                                variableName: cntrl.variableName,
                                sector: cntrl.pageSuffix,
                                legacyValue: cntrl.responses.find(v => v.value === cntrl.answer).legacyValue,
                                formQuestionNum: cntrl.formQuestionNum,
                                kcId: cntrl.kcId,
                                formField: cntrl.formField,
                                effDate: cntrl.effDate,
                                dataType: cntrl.dataType
                            };

                            var topPar = control.parent().parent().parent();
                            alertDiv = topPar.children().eq(1);

                            if (alertDiv.children().length > 0) {
                                alertDiv.empty();
                            }
                        }
                        else {
                            var cntrl = data.dataList.find(d => d.id === itemID);

                            containerData =
                            {
                                id: containerID,
                                contextID: itemID,
                                cvID: cntrl.cvid,
                                controlType: dlItem.controlType,
                                value: cntrl.answer,
                                variableName: cntrl.variableName,
                                sector: cntrl.pageSuffix,
                                legacyValue: cntrl.responses.find(v => v.value === cntrl.answer).legacyValue,
                                formQuestionNum: cntrl.formQuestionNum,
                                kcId: cntrl.kcId,
                                formField: cntrl.formField,
                                effDate: cntrl.effDate,
                                dataType: cntrl.dataType
                            };

                            var topPar = control.parent().parent().parent();
                            alertDiv = topPar.children().eq(1);

                            if (alertDiv.children().length > 0) {
                                alertDiv.empty();
                            }
                        }

                        PostData("Application/UpdateContainerData", containerData, "");
                        break;
                    case "date":
                        console.log(control.val());

                        var tempVal = control.val().replace(/\//g, "").toString();

                        var m, d, y = "";
                        var errors = [];

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

                        if (errors.length > 0) {
                            document.getElementById(String(item.id) + "-alertDiv").innerHTML = "";
                            for (var e = 0; e < errors.length; e++) {
                                document.getElementById(String(item.id) + "-alertDiv").innerHTML = AlertController("danger", errors[e] + "\n");
                            }
                        }
                        else {
                            console.log("Checking Rules for Issues! Current ID is: " + itemID);
                            console.log("Current Value: " + control.val());
                            console.log("Current Container ID: " + containerID);
                            console.log("Current CVID: " + cvid);

                            var dlItem = data.dataList.find(d => d.id === itemID);

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

                            //if (dlItem.pageSuffix.localeCompare("COV") === 0) {
                            //    if (
                            //        dlItem.variableName.localeCompare("parta_date") === 0 ||
                            //        dlItem.variableName.localeCompare("partb_date") === 0
                            //    ) {
                            //        var dateObj = JSON.parse(sessionStorage.getItem("PartDateIDObj"));
                            //        var dateA = $("#" + dateObj.PartAID).val();
                            //        var dateB = $("#" + dateObj.PartBID).val();

                            //        if (!IsPtBDateGreater(dateA, dateB)) {
                            //            $("#" + dateObj.PartAID + "-alertDiv").empty();
                            //            $("#" + dateObj.PartBID + "-alertDiv").empty();

                            //            $("#" + dateObj.PartAID + "-alertDiv").append(AlertController("danger", "Part A Date cannot be greater than Part B date"));
                            //            $("#" + dateObj.PartBID + "-alertDiv").append(AlertController("danger", "Part A Date cannot be greater than Part B date"));
                            //        }
                            //        else {
                            //            $("#" + dateObj.PartAID + "-alertDiv").empty();
                            //            $("#" + dateObj.PartBID + "-alertDiv").empty();

                            //            PostData("Application/UpdateContainerData", containerData, "");
                            //        }
                            //    }
                            //}
                            //else {
                                PostData("Application/UpdateContainerData", containerData, "");
                            //}
                        }
                        break;
                    case "phone":
                        console.log(control.val());

                        var tempVal = control.val().replace(/\//g, "()-").replace(/\s/g, '').toString();

                        console.log("Checking Rules for Issues! Current ID is: " + itemID);
                        console.log("Current Value: " + tempVal);
                        console.log("Current Container ID: " + containerID);
                        console.log("Current CVID: " + cvid);

                        //Post: UpdateContainerData
                        var dlItem = data.dataList.find(d => d.id === itemID);

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

                        PostData("Application/UpdateContainerData", containerData, "");
                        break;
                    case "ssn":
                        console.log(control.val());

                        var tempVal = control.val().replace("-", "").toString();

                        console.log("Checking Rules for Issues! Current ID is: " + itemID);
                        console.log("Current Value: " + tempVal);
                        console.log("Current Container ID: " + containerID);
                        console.log("Current CVID: " + cvid);

                        //Post: UpdateContainerData
                        var dlItem = data.dataList.find(d => d.id === itemID);

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

                        PostData("Application/UpdateContainerData", containerData, "");
                        break;
                    case "email":
                        console.log(control.val());

                        console.log("Checking Rules for Issues! Current ID is: " + itemID);
                        console.log("Current Value: " + control.val());
                        console.log("Current Container ID: " + containerID);
                        console.log("Current CVID: " + cvid);

                        //Post: UpdateContainerData
                        var dlItem = data.dataList.find(d => d.id === itemID);

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

                        PostData("Application/UpdateContainerData", containerData, "");
                        break;
                    case "prescription":
                        var itemID = item.length > 6 ? item.substring(0, item.length - 1) : item;

                        if ($("#" + item).length) {
                            console.log("Checking Rules for Issues! Current ID is: " + itemID);
                            console.log("Current Value: " + control.val());
                            console.log("Current Container ID: " + containerID);
                            console.log("Current CVID: " + cvid);

                            var dlItem = data.dataList.find(d => d.id === itemID);

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

                            var topPar = control.parent().parent().parent();
                            alertDiv = topPar.children().eq(1);

                            if (alertDiv.children().length > 0) {
                                alertDiv.empty();
                            }

                            if (control.val().localeCompare("No") === 0) {
                                var thisPresc = siteItemStorage.prescriptionStore.prescriptionsList.find(p => p.id === itemID);
                                thisPresc.perscribedDrugs = [];
                            }
                        }
                        else {
                            var dlItem = data.dataList.find(d => d.id === itemID);
                            var optSel = dlItem.responses.find(v => v.value === dlItem.answer);

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

                            var topPar = control.parent().parent().parent();
                            alertDiv = topPar.children().eq(1);

                            if (alertDiv.children().length > 0) {
                                alertDiv.empty();
                            }
                        }

                        PostData("Application/UpdateContainerData", containerData, "");
                        break
                }
            }
        };

        var trueID = "";

        if (!NullOrEmptyCheck(item)) {
            if (item.length > 6) {
                var splitID = item.split("_");

                if (splitID.length > 1) {
                    //If the splitID > 1 then we have a id with a descriptor (i.e. - "VSN004-checkbox"), take the item at [0] as the id
                    trueID = splitID[0];
                }
                else {
                    //If the length > 6, we're dealing with a radio button selection, trim the last char so we get the actual base id of the control (i.e. - "PER001")
                    trueID = item.substring(0, item.length - 1);
                    console.log(trueID);
                }
            }
            else {
                trueID = item;
            }
        }
        else if (!NullOrEmptyCheck(item.id)) {
            if (item.id.length > 6) {
                var splitID = item.id.split("_");

                if (splitID.length > 1) {
                    //If the splitID > 1 then we have a id with a descriptor (i.e. - "VSN004-checkbox"), take the item at [0] as the id
                    trueID = splitID[0];
                }
                else {
                    //If the length > 6, we're dealing with a radio button selection, trim the last char so we get the actual base id of the control (i.e. - "PER001")
                    trueID = item.id.substring(0, item.id.length - 1);
                    console.log(trueID);
                }
            }
            else {
                //else it's the true base id, just store that
                trueID = item.id;
            }
        }
        else {
            var cntrlID = $(item).attr("id");

            if (typeof cntrlID === 'undefined') {
                trueID = item;
            }
            else {
                if (cntrlID.length > 6) {
                    var splitID = cntrlID.split("_");

                    if (splitID.length > 0) {
                        //If the splitID > 1 then we have a id with a descriptor (i.e. - "VSN004-checkbox"), take the item at [0] as the id
                        trueID = splitID[0];
                    }
                    else {
                        //If the length > 6, we're dealing with a radio button selection, trim the last char so we get the actual base id of the control (i.e. - "PER001")
                        trueID = cntrlID.substring(0, cntrlID.length - 1);
                        console.log(trueID);
                    }
                }
                else {
                    //else it's the true base id, just store that
                    trueID = cntrlID;
                }
            }
        }

        var idSplit = trueID.substring(0, 3);

        if (
            idSplit.localeCompare("ESN") === 0 ||
            idSplit.localeCompare("SPD") === 0
        ) {
            //Now use the true id to get the actual control ID to get the control type
            var jqItem = data.dataList.find(c => c.id === trueID);
            var controlType = jqItem.controlType;
            var dataType = jqItem.dataType;

            if (!NullOrEmptyCheck(controlType)) {
                switch (controlType) {
                    case "date":
                        if (DateYearQuickCheck(trueID)) {

                            if (window.innerWidth < 1024) {
                                RemovePopper(trueID);
                            }

                            var currVal = $("#" + trueID).val();

                            if (currVal.localeCompare(jqItem.answer) !== 0) {
                                CallSigningPostBack(trueID, "date", jqItem.cvid);
                            }
                            
                        }
                        else {
                            if (jqItem.isRequired === true) {
                                if (window.innerWidth > 1024) {
                                    document.getElementById(String(trueID) + "-alertDiv").innerHTML = "";
                                    document.getElementById(String(trueID) + "-alertDiv").innerHTML = AlertController("danger", "Date is Invalid! Please input a valid date in 'XX/XX/XXXX' format!");
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

                            var currVal = $("#" + trueID).val();

                            if (currVal.localeCompare(jqItem.answer) !== 0) {
                                CallSigningPostBack(trueID, "date", jqItem.cvid);
                            }
                        }
                        else {
                            if (jqItem.isRequired === true) {
                                if (window.innerWidth > 1024) {
                                    document.getElementById(String(trueID) + "-alertDiv").innerHTML = "";
                                    document.getElementById(String(trueID) + "-alertDiv").innerHTML = AlertController("danger", "Phone Number is Required! Please input a valid phone number.");
                                }
                                else {
                                    PopperAlert(trueID, "Phone Number is Required!", "top", "Please input a valid phone number.");
                                }
                            }
                        }
                        break;
                    case "ssn":
                        if (ssnChecker($("#" + trueID).val())) {
                            if (window.innerWidth < 1024) {
                                RemovePopper(trueID);
                            }

                            var currVal = $("#" + trueID).val();

                            if (currVal.localeCompare(jqItem.answer) !== 0) {
                                CallSigningPostBack(trueID, "date", jqItem.cvid);
                            }
                        }
                        else {
                            if (jqItem.isRequired === true) {
                                if (window.innerWidth > 1024) {
                                    document.getElementById(String(trueID) + "-alertDiv").innerHTML = "";
                                    document.getElementById(String(trueID) + "-alertDiv").innerHTML = AlertController("danger", "SSN is Required! Please input a valid SSN.");
                                }
                                else {
                                    PopperAlert(trueID, "Please input a valid SSN.", "top", "SSN is Invalid!");
                                }
                            }
                        }
                        break;
                    case "ssn4":
                        if (ssn4Checker($("#" + trueID).val())) {
                            if (window.innerWidth < 1024) {
                                RemovePopper(trueID);
                            }

                            var currVal = $("#" + trueID).val();

                            if (currVal.localeCompare(jqItem.answer) !== 0) {
                                CallSigningPostBack(trueID, "date", jqItem.cvid);
                            }
                        }
                        else {
                            if (jqItem.isRequired === true) {
                                if (window.innerWidth > 1024) {
                                    document.getElementById(String(trueID) + "-alertDiv").innerHTML = "";
                                    document.getElementById(String(trueID) + "-alertDiv").innerHTML = AlertController("danger", "SSN is Required! Please input a valid SSN.");
                                }
                                else {
                                    PopperAlert(trueID, "Please input a valid SSN.", "top", "SSN is Invalid!");
                                }
                            }
                        }
                        break;
                    case "zip":
                        if (zipChecker($("#" + trueID).val())) {
                            if (window.innerWidth < 1024) {
                                RemovePopper(trueID);
                            }

                            var currVal = $("#" + trueID).val();

                            if (currVal.localeCompare(jqItem.answer) !== 0) {
                                CallSigningPostBack(trueID, "date", jqItem.cvid);
                            }
                        }
                        else {
                            if (jqItem.isRequired === true) {
                                if (window.innerWidth > 1024) {
                                    document.getElementById(String(trueID) + "-alertDiv").innerHTML = "";
                                    document.getElementById(String(trueID) + "-alertDiv").innerHTML = AlertController("danger", "Zip code is Required! Please input a valid Zip code.");
                                }
                                else {
                                    PopperAlert(trueID, "Please input a valid Zip code.", "top", "Zip Code is Invalid!");
                                }
                            }
                        }
                        break;

                    case "textbox":
                        if (textChecker($("#" + trueID).val())) {

                            if (window.innerWidth < 1024) {
                                RemovePopper(trueID);
                            }

                            var currVal = $("#" + trueID).val();

                            if (currVal.localeCompare(jqItem.answer) !== 0) {
                                CallSigningPostBack(trueID, "date", jqItem.cvid);
                            }
                        }
                        else {
                            if (jqItem.isRequired === true) {
                                if (window.innerWidth > 1024) {
                                    document.getElementById(String(trueID) + "-alertDiv").innerHTML = "";
                                    document.getElementById(String(trueID) + "-alertDiv").innerHTML = AlertController("danger", "Input is Required! Please make a valid input.");
                                }
                                else {
                                    PopperAlert(trueID, "Please make a valid input.", "top", "Input is Required!");
                                }
                            }

                            if (jqItem.isRequired === true) {
                                document.getElementById(String(trueID) + "-alertDiv").innerHTML = "";
                                document.getElementById(String(trueID) + "-alertDiv").innerHTML = AlertController("danger", "Input is Required! Please make a valid input.");
                            }
                        }
                        break;
                    case "email":
                        var email = $("#" + trueID);

                        if (xssText(email)) {
                            if (window.innerWidth < 1024) {
                                RemovePopper(trueID);
                            }

                            var currVal = $("#" + trueID).val();

                            if (currVal.localeCompare(jqItem.answer) !== 0) {
                                CallSigningPostBack(trueID, "date", jqItem.cvid);
                            }
                        }
                        break;
                    case "radio":
                        CallSigningPostBack(item, "radio", jqItem.cvid);
                        break;
                    case "prescription":
                        CallSigningPostBack(item, "prescription", jqItem.cvid);
                        break;
                    case "text":
                        if (textChecker($("#" + trueID).val())) {
                            if (window.innerWidth < 1024) {
                                RemovePopper(trueID);
                            }

                            var currVal = $("#" + trueID).val();

                            if (currVal.localeCompare(jqItem.answer) !== 0) {
                                CallSigningPostBack(trueID, "text", jqItem.cvid);
                            }
                            
                        }
                        else {
                            if (jqItem.isRequired === true) {
                                if (window.innerWidth > 1024) {
                                    document.getElementById(String(trueID) + "-alertDiv").innerHTML = "";
                                    document.getElementById(String(trueID) + "-alertDiv").innerHTML = AlertController("danger", "Input is Required! Please make a valid input.");
                                }
                                else {
                                    PopperAlert(trueID, "Please make a valid input.", "top", "Input is Required!");
                                }
                            }

                            if (jqItem.isRequired === true) {
                                document.getElementById(String(trueID) + "-alertDiv").innerHTML = "";
                                document.getElementById(String(trueID) + "-alertDiv").innerHTML = AlertController("danger", "Input is Required! Please make a valid input.");
                            }
                        }
                        break;
                    case "number":
                        if (numberInputChecker(parseInt($("#" + trueID).val()))) {
                            if (window.innerWidth < 1024) {
                                RemovePopper(trueID);
                            }

                            var currVal = $("#" + trueID).val();

                            if (currVal.localeCompare(jqItem.answer) !== 0) {
                                CallSigningPostBack(trueID, "text", jqItem.cvid);
                            }
                        }
                        else {
                            if (jqItem.isRequired === true) {
                                if (window.innerWidth > 1024) {
                                    document.getElementById(String(trueID) + "-alertDiv").innerHTML = "";
                                    document.getElementById(String(trueID) + "-alertDiv").innerHTML = AlertController("danger", "Number value is Required! Please input a valid number value.");
                                }
                                else {
                                    PopperAlert(trueID, "Please input a valid number value.", "top", "Number value is Required!");
                                }
                            }
                        }
                        break;
                    default:
                        if (!NullOrEmptyCheck($("#" + trueID).val())) {
                            if (window.innerWidth < 1024) {
                                RemovePopper(trueID);
                            }

                            var currVal = $("#" + trueID).val();

                            if (currVal.localeCompare(jqItem.answer) !== 0) {
                                CallSigningPostBack(trueID, "text", jqItem.cvid);
                            }
                        }
                        else {
                            if (jqItem.isRequired === true) {
                                if (window.innerWidth > 1024) {
                                    document.getElementById(String(trueID) + "-alertDiv").innerHTML = "";
                                    document.getElementById(String(trueID) + "-alertDiv").innerHTML = AlertController("danger", "Input is Required! Please make a valid input!");
                                }
                                else {
                                    $("#" + trueID).tooltip();
                                    $("#" + trueID).tooltip(
                                        { content: "Date is Required! Please input a valid date in 'XX/XX/XXXX' format!" }
                                    );
                                }
                            }
                        }
                        break;
                }
            }
        }
        else {
            //Now use the true id to get the actual control ID to get the control type
            var jqItem = data.dataList.find(c => c.id === trueID);
            var controlType = jqItem.controlType;
            var dataType = jqItem.dataType;

            if (dataType.localeCompare("accordion") === 0) {
                var triggerType = jqItem.triggerType.split("_");

                switch (controlType) {
                    case "radio":
                        if (triggerType[1].localeCompare("dual") === 0) {
                            CallPostBackDualTriggerEls(trueID, item, jqItem.cvid);
                        }
                        else {
                            ApplyRBGAccord(jqItem);
                            CallPostBackTriggerEls(trueID, item, jqItem.cvid);
                        }
                        break;
                    case "dropdown":
                        if (triggerType[1].localeCompare("dual") === 0) {
                            CallPostBackDualTriggerEls(trueID, item, jqItem.cvid);
                        }
                        else {
                            CallPostBackTriggerEls(trueID, item, jqItem.cvid);
                        }
                        break;
                    case "ccg":
                        if (!NullOrEmptyCheck(trueID)) {
                            CallPostBackTriggerEls(trueID, item, jqItem.cvid);
                        }
                        break;
                }
            }
            else {
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
                                        document.getElementById(String(trueID) + "-alertDiv").innerHTML = "";
                                        document.getElementById(String(trueID) + "-alertDiv").innerHTML = AlertController("danger", "Date is Invalid! Please input a valid date in 'XX/XX/XXXX' format!");
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
                                        document.getElementById(String(trueID) + "-alertDiv").innerHTML = "";
                                        document.getElementById(String(trueID) + "-alertDiv").innerHTML = AlertController("danger", "Phone Number is Invalid! Please input a valid phone number.");
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
                                        document.getElementById(String(trueID) + "-alertDiv").innerHTML = "";
                                        document.getElementById(String(trueID) + "-alertDiv").innerHTML = AlertController("danger", "SSN is Required! Please input a valid SSN.");
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
                                        document.getElementById(String(trueID) + "-alertDiv").innerHTML = "";
                                        document.getElementById(String(trueID) + "-alertDiv").innerHTML = AlertController("danger", "SSN is Required! Please input a valid SSN.");
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
                                        document.getElementById(String(trueID) + "-alertDiv").innerHTML = "";
                                        document.getElementById(String(trueID) + "-alertDiv").innerHTML = AlertController("danger", "Zip code is Invalid! Please input a valid Zip code.");
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
                                        document.getElementById(String(trueID) + "-alertDiv").innerHTML = "";
                                        document.getElementById(String(trueID) + "-alertDiv").innerHTML = AlertController("danger", "Input is Required! Please make a valid input.");
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

                            let thisDLItem = data.dataList.find(d => d.id === trueID);

                            //If this is a payment Checkbox, we need to save it differently than normal checkboxes
                            if (thisDLItem.contextValue.includes("Payment")) {
                                CallPostBack(trueID, "pay", jqItem.cvid);
                            }
                            else {
                                CallPostBack(trueID, "cb", jqItem.cvid);
                            }
                            break;
                        case "email":
                            if (NullOrEmptyCheck(!hasEmailError($("#" + trueID).val()))) {
                                if (window.innerWidth < 1024) {
                                    RemovePopper(trueID);
                                }

                                document.getElementById(String(trueID) + "-alertDiv").innerHTML = "";
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
                                CallPostBack(trueID, "email", jqItem.cvid);
                            }
                            break;
                        case "radio":
                            CallPostBack(item, "radio", jqItem.cvid);
                            break;
                        case "prescription":
                            CallPostBack(item, "prescription", jqItem.cvid);
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
            }
        }
    });
}

function ModalQuickCheck(id) {
    $(document).ready(function () {

        function PerscriptionInputQuickCheck(id) {
            var item = $("#" + id);

            if (!NullOrEmptyCheck(item.val())) {
                $("#" + id + "-alertDiv").empty();
            }
            else {
                $("#" + id + "-alertDiv").empty();
                $("#" + id + "-alertDiv").append(AlertController("danger", "Nothing inputted! Please make an input!"));
            }
        }

        function PerscriptionDateQuickCheck(id) {
            DateYearQuickCheck(id);
        }

        function PerscriptionRGBQuickChecker(id) {
            var val = "";

            $("input[type='radio'][name='" + id + "-question-radio-option']").each(function () {
                if ($(this).is(":checked")) {
                    val = parseInt($(this).attr("data-sequence-number"));
                }
            });

            if (!NullOrEmptyCheck(val)) {
                $("#" + id + "-alertDiv").empty();
            }
            else {
                $("#" + id + "-alertDiv").empty();
                $("#" + id + "-alertDiv").append(AlertController("danger", "Nothing was selected! Please make a selection!"));
            }
        }

        function PerscriptionDDLQuickChekcer(id) {
            var item = $("#" + id).find("select");

            if (parseInt(item.prop('selectedIndex')) > 0) {
                if (item !== null || item !== undefined || item !== "undefined") {
                    $("#" + id + "-alertDiv").empty();
                }
                else {
                    $("#" + id + "-alertDiv").empty();
                    $("#" + id + "-alertDiv").append(AlertController("danger", "Nothing was selected! Please make a selection!"));
                }
            }
            else {
                $("#" + id + "-alertDiv").empty();
                $("#" + id + "-alertDiv").append(AlertController("danger", "Nothing was selected! Please make a selection!"));
            }
        }


        function AlertChecks(id) {
            console.log($("#" + id + "-alertDiv").children().length);

            if ($("#" + id + "-alertDiv").children().length > 0) {
                return false;
            }
            else {
                return true;
            }
        }

        var canSave = true;

        var idSplit = id.split("_");

        var isGood = [];

        if (idSplit.length === 3) {
            //var hasRBPhysician = $("#" + idSplit[0] + "_physicianRB").length ? idSplit[0] + "_physicianRB" : null;
            //var hasRB2Yrs = $("#" + idSplit[0] + "_2YearsRB").length ? idSplit[0] + "_2YearsRB" : null;

            //!NullOrEmptyCheck(hasRBPhysician) ? PerscriptionRGBQuickChecker(hasRBPhysician) : "";
            //!NullOrEmptyCheck(hasRB2Yrs) ? PerscriptionRGBQuickChecker(hasRB2Yrs) : "";

            PerscriptionInputQuickCheck(idSplit[0] + "_" + idSplit[1] + "_perscInput");
            PerscriptionDateQuickCheck(idSplit[0] + "_" + idSplit[1] + "_date");
            PerscriptionDDLQuickChekcer(idSplit[0] + "_" + idSplit[1] + "_dosageDDL");
            PerscriptionDDLQuickChekcer(idSplit[0] + "_" + idSplit[1] + "_freqDDL");
            PerscriptionInputQuickCheck(idSplit[0] + "_" + idSplit[1] + "_diagCond");

            isGood.push(
                AlertChecks(idSplit[0] + "_" + idSplit[1] + "_perscInput"),
                AlertChecks(idSplit[0] + "_" + idSplit[1] + "_date"),
                AlertChecks(idSplit[0] + "_" + idSplit[1] + "_dosageDDL"),
                AlertChecks(idSplit[0] + "_" + idSplit[1] + "_freqDDL"),
                AlertChecks(idSplit[0] + "_" + idSplit[1] + "_diagCond")
            );
        }
        else {
            //var hasRBPhysician = $("#" + idSplit[0] + "_physicianRB").length ? idSplit[0] + "_physicianRB" : null;
            //var hasRB2Yrs = $("#" + idSplit[0] + "_2YearsRB").length ? idSplit[0] + "_2YearsRB" : null;

            //!NullOrEmptyCheck(hasRBPhysician) ? PerscriptionRGBQuickChecker(hasRBPhysician) : "";
            //!NullOrEmptyCheck(hasRB2Yrs) ? PerscriptionRGBQuickChecker(hasRB2Yrs) : "";

            PerscriptionInputQuickCheck(idSplit[0] + "_perscInput");
            PerscriptionDateQuickCheck(idSplit[0] + "_date");
            PerscriptionDDLQuickChekcer(idSplit[0] + "_dosageDDL");
            PerscriptionDDLQuickChekcer(idSplit[0] + "_freqDDL");
            PerscriptionInputQuickCheck(idSplit[0] + "_diagCond");

            isGood.push(
                AlertChecks(idSplit[0] + "_perscInput"),
                AlertChecks(idSplit[0] + "_date"),
                AlertChecks(idSplit[0] + "_dosageDDL"),
                AlertChecks(idSplit[0] + "_freqDDL"),
                AlertChecks(idSplit[0] + "_diagCond")
            );
        }



        for (var g = 0; g < isGood.length; g++) {
            if (isGood[g] === false) {
                canSave = false;
            }
        }

        if (canSave) {
            if (idSplit[0] === "SaveNew") {
                $("#" + idSplit[0] + "_preSave").prop("disabled", false);
            }
            else {
                var dateInput = $("#" + idSplit[0] + "_" + idSplit[1] + "_date").datepicker('getDate')

                console.log(dateInput);

                $("#" + idSplit[0] + "_" + idSplit[1] + "_preSave").prop("disabled", false);
            }
        }
        else {
            if (idSplit[0] === "SaveNew") {
                $("#" + idSplit[0] + "_preSave").prop("disabled", true);
            }
            else {
                $("#" + idSplit[0] + "_" + idSplit[1] + "_preSave").prop("disabled", true);
            }
        }
    });
}

function savePrescription(item) {
    $(document).ready(function () {

        var editId, dataID, datIdx, rxType;

        var id = !NullOrEmptyCheck(item.id) ? item.id : item; //item by itself === id (just had to reword things to avoid id.id confusion)

        var btn = $("#" + id);
        var type = btn.attr("data-btn-type"); //If type === "New" new pre, otherwise it's an Edit

        if (type === "Edit") {
            editId = !NullOrEmptyCheck(btn.attr("data-edit-id")) ? btn.attr("data-edit-id") : null;
            dataID = !NullOrEmptyCheck(btn.attr("data-id")) ? btn.attr("data-id") : null;
            datIdx = !NullOrEmptyCheck(parseInt(btn.attr("data-pre-idx"))) ? parseInt(btn.attr("data-pre-idx")) : null;

            rxType = dataID.substring(0, 3);
        }
        else {
            dataID = !NullOrEmptyCheck(btn.attr("data-id")) ? btn.attr("data-id") : null;

            rxType = dataID.substring(0, 3);
        }

        if (type === "Edit") {
            //Ran checks..Both not null...Editing current Prescription
            console.log("Save Edit...Validation...");

            var getPreDrugsById = siteItemStorage.prescriptionStore.prescriptionsList.find(d => d.id.toLowerCase() === dataID.toLowerCase());
            var getPreDrugByIdx = getPreDrugsById.perscribedDrugs[datIdx];

            var physician, twoYears = "";

            var dosList = [];
            var dataId = btn.attr("data-id");
            var dosageOpts = $("#" + editId + "_dosageDDL").find("select").children();

            for (var i = 1; i < dosageOpts.length; i++) {
                dosList.push({ "strength": dosageOpts[i].text, "ndc": dosageOpts[i].value });
            }

            var containerID = sessionStorage.getItem("contID");

            $("input[type='radio'][name='" + editId + "_physicianRB-question-radio-option']").each(function () {
                if ($(this).is(":checked")) {
                    physician = parseInt($(this).attr("data-sequence-number"));
                }
            });

            $("input[type='radio'][name='" + editId + "_2YearsRB-question-radio-option']").each(function () {
                if ($(this).is(":checked")) {
                    twoYears = parseInt($(this).attr("data-sequence-number"));
                }
            });

            getPreDrugByIdx.drug = $("#" + editId + "_perscInput").val();
            getPreDrugByIdx.date = $("#" + editId + "_date").val();
            getPreDrugByIdx.dosage = $("#" + editId + "_dosageDDL").find("select").find(":selected").text().replace(/\s/g, '');
            getPreDrugByIdx.frequency = $("#" + editId + "_freqDDL").find("select").find(":selected").text();
            getPreDrugByIdx.diagnosis = $("#" + editId + "_diagCond").val();
            getPreDrugByIdx.isprescribed = !NullOrEmptyCheck(physician) ? psysician : null;
            getPreDrugByIdx.morethan2years = !NullOrEmptyCheck(twoYears) ? twoYears : null;
            getPreDrugByIdx.ndc = $("#" + editId + "_dosageDDL").find("select").find(":selected").val();

            getPreDrugByIdx.dosageList = [];
            getPreDrugByIdx.dosageList = dosList;

            //getPreDrugByIdx.notes = notes;

            let isGood = true;

            if (NullOrEmptyCheck($("#" + editId + "_perscInput").val())) {
                isGood = false;
                $("#" + editId + "-alertDiv").empty();
                $("#" + editId + "-alertDiv").append(AlertController("danger", "Nothing inputted! Please make an input!"));
            }
            if (NullOrEmptyCheck($("#" + editId + "_date").val())) {
                isGood = false;
                $("#" + editId + "_date-alertDiv").empty();
                $("#" + editId + "_date-alertDiv").append(AlertController("danger", "No date was selected! Please select a date!"));
            }

            if ($("#" + editId + "_dosageDDL").find("select").prop('selectedIndex') === 0) {
                isGood = false;
                $("#" + editId + "_dosageDDL-alertDiv").empty();
                $("#" + editId + "_dosageDDL-alertDiv").append(AlertController("danger", "No dosage was selected! Please select a selection!"));
            }
            if ($("#" + editId + "_freqDDL").find("select").prop('selectedIndex') === 0) {
                isGood = false;
                $("#" + editId + "_freqDDL-alertDiv").empty();
                $("#" + editId + "_freqDDL-alertDiv").append(AlertController("danger", "No frequency was selected! Please select a selection!"));
            }
            if (NullOrEmptyCheck($("#" + editId + "_diagCond").val())) {
                isGood = false;
                $("#" + editId + "_diagCond-alertDiv").empty();
                $("#" + editId + "_diagCond-alertDiv").append(AlertController("danger", "Nothing inputted! Please make an input!"));
            }

            if (isGood) {

                console.log("All gud! Edit Obj = " + getPreDrugByIdx);

                //When the Controller is good to go, then this will need to go off to an AJAX call and page update
                console.log("Stored in sitedata!");

                var perscriptionStore = {
                    "prescriptions": getPreDrugsById.perscribedDrugs
                };

                var thisPerc = data.dataList.find(d => d.id === dataID);

                var containerData = {
                    id: containerID,
                    cvID: thisPerc.cvid,
                    value: "Yes",
                    value2: JSON.stringify(perscriptionStore),
                    variableName: thisPerc.variableName,
                    sector: thisPerc.pageSuffix,
                    legacyValue: null,
                    formQuestionNum: thisPerc.formQuestionNum,
                    kcId: thisPerc.kcId,
                    formField: thisPerc.formField,
                    effDate: thisPerc.effDate,
                    dataType: thisPerc.dataType
                };

                PostData("Application/UpdateContainerData", containerData);

                UpdatePrescriptionTable(dataID);

                $("#" + editId + "_modal").modal("hide");
                $(".modal-backdrop").remove();
                $("#" + editId + "_modal").remove();
            }
        }
        else {
            //Ran checks..Both null...Creating new Prescription
            console.log("Save New...Validation...");
            var psysician, twoYears = "";

            var btn = $("#" + id);
            var dataId = btn.attr("data-id").split("_");

            var dosList = [];
            var dosageOpts = $("#" + dataId[1] + "_dosageDDL").find("select").children();
            for (var i = 1; i < dosageOpts.length; i++) {
                dosList.push({ "strength": dosageOpts[i].text, "ndc": dosageOpts[i].value });
            }

            var containerID = sessionStorage.getItem("contID");

            $("input[type='radio'][name='SaveNewBtn_physicianRB-question-radio-option']").each(function () {
                if ($(this).is(":checked")) {
                    physician = parseInt($(this).attr("data-sequence-number"));
                }
            });

            $("input[type='radio'][name='SaveNewBtn_2YearsRB-question-radio-option']").each(function () {
                if ($(this).is(":checked")) {
                    physician = parseInt($(this).attr("data-sequence-number"));
                }
            });

            let isGood = true;

            if (NullOrEmptyCheck($("#SaveNew_perscInput").val())) {
                isGood = false;
                $("#SaveNew_perscInput-alertDiv").empty();
                $("#SaveNew_perscInput-alertDiv").append(AlertController("danger", "Nothing inputted! Please make an input!"));
            }
            if (NullOrEmptyCheck($("#SaveNew_date").val())) {
                isGood = false;
                $("#SaveNew_date-alertDiv").empty();
                $("#SaveNew_date-alertDiv").append(AlertController("danger", "No date was selected! Please select a date!"));
            }

            if ($("#SaveNew_dosageDDL").find("select").prop('selectedIndex') === 0) {
                isGood = false;
                $("#SaveNew_dosageDDL-alertDiv").empty();
                $("#SaveNew_dosageDDL-alertDiv").append(AlertController("danger", "No dosage was selected! Please select a selection!"));
            }
            if ($("#SaveNew_freqDDL").find("select").prop('selectedIndex') === 0) {
                isGood = false;
                $("#SaveNew_freqDDL-alertDiv").empty();
                $("#SaveNew_freqDDL-alertDiv").append(AlertController("danger", "No frequency was selected! Please select a selection!"));
            }
            if (NullOrEmptyCheck($("#SaveNew_diagCond").val())) {
                isGood = false;
                $("#SaveNew_diagCond-alertDiv").empty();
                $("#SaveNew_diagCond-alertDiv").append(AlertController("danger", "Nothing inputted! Please make an input!"));
            }

            if (isGood) {
                var preData = {
                    "drug": $("#SaveNew_perscInput").val(),
                    "date": $("#SaveNew_date").val(),
                    "dosage": $("#SaveNew_dosageDDL").find("select").find(":selected").text().replace(/\s/g, ''),
                    "frequency": $("#SaveNew_freqDDL").find("select").find(":selected").text(),
                    "diagnosis": $("#SaveNew_diagCond").val(),
                    "isprescribed": !NullOrEmptyCheck(psysician) ? psysician : null,
                    "morethan2years": !NullOrEmptyCheck(twoYears) ? twoYears : null,
                    "ndc": $("#SaveNew_dosageDDL").find("select").find(":selected").val(),
                    "dosageList": dosList
                    //"notes": notes
                };

                console.log("All gud! New Obj = " + preData);

                //When the Controller is good to go, then this will need to go off to an AJAX call and page update
                var findControlById = siteItemStorage.prescriptionStore.prescriptionsList.find(pre => pre.id.toLowerCase() === dataId[0].toLowerCase());

                findControlById.perscribedDrugs.push(preData);

                console.log("Stored in sitedata!");

                var perscriptionStore = {
                    "prescriptions": findControlById.perscribedDrugs
                };

                var thisPerc = data.dataList.find(d => d.id === dataId[0]);

                var containerData = {
                    id: containerID,
                    cvID: thisPerc.cvid,
                    value: "Yes",
                    value2: JSON.stringify(perscriptionStore),
                    variableName: thisPerc.variableName,
                    sector: thisPerc.pageSuffix,
                    legacyValue: null,
                    formQuestionNum: thisPerc.formQuestionNum,
                    kcId: thisPerc.kcId,
                    formField: thisPerc.formField,
                    effDate: thisPerc.effDate,
                    dataType: thisPerc.dataType

                };

                PostData("Application/UpdateContainerData", containerData);

                UpdatePrescriptionTable(dataId[0]);

                $("#" + dataId[1] + "_modal").modal("hide");
                $(".modal-backdrop").remove();
                $("#" + dataId[1] + "_modal").remove();
            }
        }
    });
}

function CheckInputs() {
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

function isCorrectYearRange(year) {
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

function isCorrectMonthRange(month) {
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

function isCorrectDateRange(month, day, year) {
    var totalOut = [];

    var mthCheck = isCorrectMonthRange(month);
    var yrCheck = isCorrectYearRange(year);

    if (NullOrEmptyCheck(mthCheck) && NullOrEmptyCheck(yrCheck)) {
        var date = new Date(parseInt(year), parseInt(month), 0).getDate();

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

function DateYearQuickCheck(el) {
    var item = $("#" + el);

    var errMsg = [];

    var date = item.val();
    if (NullOrEmptyCheck(date)) {
        errMsg.push("No date is inputted! Please input a date.");
    }
    else {
        var dateSplit = date.split("/");
        console.log(date);
        console.log(dateSplit);
        var parsedDate = [];

        if (dateSplit.length === 3) {
            var mth = dateSplit[0];
            var dt = dateSplit[1];
            var yr = dateSplit[2];

            parsedDate.push(parseInt(mth));
            parsedDate.push(parseInt(dt));
            parsedDate.push(parseInt(yr));

            console.log(parsedDate);

            errMsg = isCorrectDateRange(parsedDate[0], parsedDate[1], parsedDate[2]);
        }
        else if (dateSplit[0].length === 8) {
            var mth = (date[0] + date[1]);
            var dt = (date[2] + date[3]);
            var yr = (date[4] + date[5] + date[6] + date[7]);

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

function SaveSignature(spdID, type) {
    var sig = sessionStorage.getItem("savedSig");

    if (!NullOrEmptyCheck(sig)) {
        sessionStorage.setItem("currSPadID", spdID);

        var appObj = {
            appId: sessionStorage.getItem("contID"),
            signature: sig,
            signer: type
        };

        StartLoadingMeter("Please Wait...Saving Signature...");

        $.ajax({
            contentType: "application/json; charset=utf-8",
            url: baseUrl + "Application/SaveSignature",
            type: "POST",
            data: JSON.stringify(appObj),
            success: function (result) {
                console.log(result);

                //SignatureButtonCheck(pref);

                var currSpdID = sessionStorage.getItem("currSPadID");
                console.log(currSpdID + "_Div_Main");

                var childIDObj = JSON.parse(sessionStorage.getItem("SPDChildIDs"));
                

                console.log(childIDObj.childIds);
                

                $("#" + currSpdID + "_Div_Main").find(".signature-pad").hide();

                var savedSig = sessionStorage.getItem("savedSig");

                var image = new Image();
                image.src = savedSig;

                if (window.innerWidth <= 1024) {
                    image.width = 500;
                    image.height = 100;
                } else {
                    image.width = 900;
                    image.height = 200;
                }

                image.alt = "Current Signpad Signature";

                $("#" + currSpdID + "_Div_Main").find(".sig-pad-saved").find(".sig-pad-img").empty();
                $("#" + currSpdID + "_Div_Main").find(".sig-pad-saved").find(".sig-pad-img").append(image);
                $("#" + currSpdID + "_Div_Main").find(".sig-pad-saved").show();

                var nextChildEl = childIDObj.childIds[parseInt(childIDObj.currEl)];
                var nextChildObj = data.dataList.find(c => c.id === nextChildEl);

                if (typeof nextChildObj !== 'undefined') {
                    EnableDocRevChildEl(nextChildObj.id);
                }

                SignaturAccepted("Signature Saved!");
            },
            error: function (error) {
                console.log(error);

                ErrorMessage("Error Saving Signature!");
            }
        });
    }
    else {
        $("#" + spdID + "-alertDiv").empty();
        $("#" + spdID + "-alertDiv").append(AlertController("danger", "No Signature was inputted! Please input a signature."));
    }
}

//TODO: Call an AJAX Post that the fraud check has been done
function AcceptFraudWarning() {
    $("#fraudModal").remove();
    $(".modal-backdrop").remove();
}

function isJSONObjEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function IsPtBDateGreater(ptAVal, ptBVal) {
    var dateASplit = ptAVal.split("/");
    var dateBSplit = ptBVal.split("/");

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
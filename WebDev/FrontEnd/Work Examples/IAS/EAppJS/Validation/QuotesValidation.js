//Print Quotes Modal Checks
function TempSavePDFInfo(id) {
    $(document).ready(function () {
        console.log("Temp Input Save!");

        if (id.localeCompare("AppFirstName") === 0) {
            var el = $("#" + id);
            var elVal = el.val();

            if (!NullOrEmptyCheck(elVal)) {
                if (textChecker(elVal)) {
                    siteItemStorage.tempPDFStorage.AppFirstName = elVal;
                    $("#" + id + "-alertDiv").empty();

                    SavePDFInfoCheck();
                }
                else {
                    $("#" + id + "-alertDiv").empty();
                    $("#" + id + "-alertDiv").append(AlertController("danger", "Input is Invalid! Please make a valid input!"));
                }
            }
            else {
                $("#" + id + "-alertDiv").empty();
                $("#" + id + "-alertDiv").append(AlertController("danger", "Input is Empty! Please make a valid input!"));
            }
        }
        else if (id.localeCompare("AppLastName") === 0) {
            var el = $("#" + id);
            var elVal = el.val();

            if (!NullOrEmptyCheck(elVal)) {
                if (textChecker(elVal)) {
                    siteItemStorage.tempPDFStorage.AppLastName = elVal;
                    $("#" + id + "-alertDiv").empty();

                    SavePDFInfoCheck();
                }
                else {
                    $("#" + id + "-alertDiv").empty();
                    $("#" + id + "-alertDiv").append(AlertController("danger", "Input is Invalid! Please make a valid input!"));
                }
            }
            else {
                $("#" + id + "-alertDiv").empty();
                $("#" + id + "-alertDiv").append(AlertController("danger", "Input is Empty! Please make a valid input!"));
            }
        }
    });
}

function TempSavePDFInfoDDL(id) {
    $(document).ready(function () {
        console.log("Temp DDL Save!");

        var control = $("#" + id + " option:selected");

        if (parseInt(control.val()) > 0) {

            var selAgent;

            for (var a = 0; a < siteItemStorage.writingAgentsArray.length; a++) {
                if (siteItemStorage.writingAgentsArray[a].agentNumber.localeCompare(control.text()) === 0) {
                    selAgent = siteItemStorage.writingAgentsArray[a];
                }
            }

            siteItemStorage.tempPDFStorage.WANumber = selAgent;

            SavePDFInfoCheck();

            var alertDiv = $("#" + id + "-alertDiv");

            while (alertDiv.children().length > 0) {
                alertDiv.removeChild(alertDiv.firstChild);
            }
        }
        else {
            $("#" + id + "-alertDiv").empty();
            $("#" + id + "-alertDiv").append(AlertController("danger", "Please select a Writing Agent!"));
        }
    });
}

function SavePDFInfoCheck() {
    $(document).ready(function () {
        var tempPDFObj = siteItemStorage.tempPDFStorage;

        if (!NullOrEmptyCheck(tempPDFObj.AppFirstName) &&
            !NullOrEmptyCheck(tempPDFObj.AppLastName) &&
            !NullOrEmptyCheck(tempPDFObj.WANumber)
        ) {
            $("#PrintQuoteBtn").prop("disabled", false);
        }
        else {
            $("#PrintQuoteBtn").prop("disabled", true);
        }
    });
}

//Quotes Page Validation
function newInputEmptyCheck(item) {
    $(document).ready(function () {
        var elId = item;
        var el = $("#" + item);
        var inType = el.attr('input-type') !== NullOrEmptyCheck(el.attr('input-type')) ? el.attr('input-type') : null;
        var type = el.attr('type') !== NullOrEmptyCheck(el.attr('type')) ? el.attr('type') : null;

        if (!NullOrEmptyCheck(inType)) {
            switch (inType) {
                case "date":
                    if (!dateChecker(el.val()) && NullOrEmptyCheck(el.val())) {
                        RemoveFromAppDataList(elId, "");
                        $("#" + elId + "-alertDiv").empty();
                        $("#" + elId + "-alertDiv").append(AlertController("danger", "Date is invalid! Please input a valid date in format: 'XX/XX/XXXX' "));
                    }
                    break;
                case "email":
                    let email = $("#" + elId).val();

                    if (NullOrEmptyCheck(el.val()) && hasEmailError(el.val())) {
                        RemoveFromAppDataList(elId, "");
                        $("#" + elId + "-alertDiv").empty();
                        $("#" + elId + "-alertDiv").append(AlertController("danger", "E-Mail is Invalid! Please input a valid e-mail address."));
                    }
                    break;
                case "zip":
                    if (!zipChecker(el.val()) || NullOrEmptyCheck(el.val())) {
                        RemoveFromAppDataList(elId, "");
                        $("#" + elId + "-alertDiv").empty();
                        $("#" + elId + "-alertDiv").append(AlertController("danger", "Zip code is Invalid! Please input a valid Zip code."));
                    }
                    else {
                        RemoveFromAppDataList(elId, el.val());
                        $("#" + elId + "-alertDiv").empty();
                    }
                    break;
                case "phone":
                    if (!phoneChecker(el.val()) && NullOrEmptyCheck(el.val())) {
                        RemoveFromAppDataList(elId, "");
                        $("#" + elId + "-alertDiv").empty();
                        $("#" + elId + "-alertDiv").append(AlertController("danger", "Phone Number is Invalid! Please input a valid phone number."));
                    }
                    break;
            }
        }
        else if (!NullOrEmptyCheck(type)) {
            switch (type) {
                case "text":
                    if (!textChecker(el.val()) && NullOrEmptyCheck(el.val())) {
                        RemoveFromAppDataList(elId, "");
                        $("#" + elId + "-alertDiv").empty();
                        $("#" + elId + "-alertDiv").append(AlertController("danger", "Input is Invalid! Please input a valid input."));
                    }
                    break;
                case "number":
                    if (!textChecker(el.val()) && NullOrEmptyCheck(el.val())) {
                        RemoveFromAppDataList(elId, "");
                        $("#" + elId + "-alertDiv").empty();
                        $("#" + elId + "-alertDiv").append(AlertController("danger", "Input is Invalid! Please input a valid input."));
                    }
                    break;
            }
        }
    });
}

function newRulesCheckInput(item) {
    $(document).ready(function () {
        console.log(item);
        var elId = item;
        var el = $("#" + item);
        var inType = el.attr('input-type') !== NullOrEmptyCheck(el.attr('input-type')) ? el.attr('input-type') : null;
        var type = el.attr('type') !== NullOrEmptyCheck(el.attr('type')) ? el.attr('type') : null;

        if (!NullOrEmptyCheck(inType)) {
            switch (inType) {
                case "date":
                    if (dateChecker(el.val()) && !NullOrEmptyCheck(el.val())) {
                        RemoveFromAppDataList(elId, el.val());

                        $("#" + elId + "-alertDiv").empty();
                    }
                    else {
                        RemoveFromAppDataList(elId, "");
                        $("#" + elId + "-alertDiv").empty();
                        $("#" + elId + "-alertDiv").append(AlertController("danger", "Date is invalid! Please input a valid date in format: 'XX/XX/XXXX' "));
                    }
                    break;
                case "email":
                    if (NullOrEmptyCheck(hasEmailError(el.val())) && !NullOrEmptyCheck(el.val())) {
                        RemoveFromAppDataList(elId, el.val());

                        $("#" + elId + "-alertDiv").empty();
                    }
                    else {
                        RemoveFromAppDataList(elId, "");
                        $("#" + elId + "-alertDiv").empty();
                        $("#" + elId + "-alertDiv").append(AlertController("danger", "E-Mail is Invalid! Please input a valid e-mail address."));
                    }
                    break;
                case "zip":
                    if (zipChecker(el.val()) && !NullOrEmptyCheck(el.val())) {
                        let trueVal;

                        if (el.val().length === 5) {
                            trueVal = el.val();
                            newCallPostBack(elId, parseInt(trueVal));

                            $("#" + elId + "-alertDiv").empty();
                        }
                        else if (el.val().length < 5 || el.val().length > 5) {
                            RemoveFromAppDataList(elId, "");
                            $("#" + elId + "-alertDiv").empty();
                            $("#" + elId + "-alertDiv").append(AlertController("danger", "Zip code is Invalid! Please input a valid Zip code."));
                        }
                    }
                    else {
                        RemoveFromAppDataList(elId, "");
                        $("#" + elId + "-alertDiv").empty();
                        $("#" + elId + "-alertDiv").append(AlertController("danger", "Zip code is Invalid! Please input a valid Zip code."));
                    }
                    break;
                case "phone":
                    if (phoneChecker(el.val()) && !NullOrEmptyCheck(el.val())) {
                        RemoveFromAppDataList(elId, el.val());

                        $("#" + elId + "-alertDiv").empty();
                    }
                    else {
                        RemoveFromAppDataList(elId, "");
                        $("#" + elId + "-alertDiv").empty();
                        $("#" + elId + "-alertDiv").append(AlertController("danger", "Phone Number is Invalid! Please input a valid phone number."));
                    }
                    break;
            }
        }
        else if (!NullOrEmptyCheck(type)) {
            switch (type) {
                case "text":
                    if (textChecker(el.val()) && !NullOrEmptyCheck(el.val())) {
                        RemoveFromAppDataList(elId, el.val());

                        $("#" + elId + "-alertDiv").empty();
                    }
                    else {
                        RemoveFromAppDataList(elId, "");
                        $("#" + elId + "-alertDiv").empty();
                        $("#" + elId + "-alertDiv").append(AlertController("danger", "Input is Invalid! Please input a valid input."));
                    }
                    break;
                case "number":
                    if (textChecker(el.val()) && !NullOrEmptyCheck(el.val())) {
                        RemoveFromAppDataList(elId, el.val());

                        $("#" + elId + "-alertDiv").empty();
                    }
                    else {
                        RemoveFromAppDataList(elId, "");
                        $("#" + elId + "-alertDiv").empty();
                        $("#" + elId + "-alertDiv").append(AlertController("danger", "Input is Invalid! Please input a valid input."));
                    }
                    break;
            }
        }
    });
}

function newRulesCheckType(item) {
    $(document).ready(function () {
        var el = $("#" + item);

        if (textChecker(el.val()) && !NullOrEmptyCheck(el.val())) {
            var id = item.slice(0, -1);
            RemoveFromAppDataList(id, el.val());

            var topPar = el.parent().parent().parent()[0].id;
            var alertDiv = topPar + "-alertDiv";

            $("#" + alertDiv).empty();
        }
        else {
            var topPar = el.parent().parent().parent();
            RemoveFromAppDataList(topPar.id, "");
            $("#" + topPar.id + "-alertDiv").empty();
            $("#" + topPar.id + "-alertDiv").append(AlertController("danger", "Nothing was selected! Please make a selection."));
        }
    });
}

function newCallPostBack(itemID) {
    $(document).ready(function () {
        var control, controlType = "";

        control = $("#" + String(itemID));
        controlType = control.attr('data-context-type') !== NullOrEmptyCheck(control.attr('data-context-type')) ? control.attr('data-context-type') : null;

        var alertDiv;
        if (controlType === "radio") {
            itemID = itemID.substring(0, itemID.length - 1);

            console.log("Checking Rules for Issues! Current ID is: " + itemID);
            console.log("Current Value: " + control.val());

            var topPar = control.parent().parent().parent();
            alertDiv = topPar.children().eq(1);

            if (alertDiv.children().length > 0) {
                alertDiv.empty();
            }
        }
        else {
            control = $("#" + String(itemID));

            console.log("Checking Rules for Issues! Current ID is: " + itemID);
            console.log("Current Value: " + control.val());

            alertDiv = $("#" + itemID + "-alertDiv");

            if (alertDiv.children().length > 0) {
                alertDiv.empty();
            }
        }

        RemoveFromAppDataList(itemID, control.val());
    });
}

function RemoveFromAppDataList(elID, val) {
    siteItemStorage.planAppSelection[elID] = "";

    siteItemStorage.planAppSelection[elID] = val;

    console.log(siteItemStorage.planAppSelection);
}

function newRulesWeightCheck(itemID) {
    $(document).ready(function () {
        let weightVal = $("#" + itemID).val();

        if (numberInputChecker(weightVal)) {
            if (parseInt(weightVal) >= 1 && parseInt(weightVal) <= 999) {
                $("#" + itemID + "-alertDiv").empty();
            }
            else {
                $("#" + itemID + "-alertDiv").empty();
                $("#" + itemID + "-alertDiv").append(AlertController("danger", "Weight is invalid! Please input a valid Weight."));
            }
        }
        else {
            $("#" + itemID + "-alertDiv").empty();
            $("#" + itemID + "-alertDiv").append(AlertController("danger", "Weight is invalid! Please input a valid Weight."));
        }
    });
}


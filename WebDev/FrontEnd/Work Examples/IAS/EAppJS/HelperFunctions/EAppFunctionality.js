
function OpensEnableListener(parID, childIDArr) {
    $(document).ready(function () {

        var enablesCheck = sessionStorage.getItem("enabled").toLowerCase().localeCompare("true") === 0 ? true : false;

        if (enablesCheck === true) {
            if (!NullOrEmptyCheck($("#" + parID).val())) {
                console.log($("#" + parID).val());

                for (var c = 0; c < childIDArr.length; c++) {
                    switch (childIDArr[c].controlType) {
                        case "input":
                            $("#" + childIDArr[c].id).prop("disabled", false);
                            break;
                        case "radio":
                            for (var opts = 0; opts < childIDArr[c].responses.length; opts++) {
                                console.log("#" + childIDArr[c].id + "-radio-label" + childIDArr[c].responses[opts].seqNum);
                                $("#" + childIDArr[c].id + "-radio-label" + childIDArr[c].responses[opts].seqNum).find("span").removeClass("radiomark-disabled");
                                $("#" + childIDArr[c].id + "-radio-label" + childIDArr[c].responses[opts].seqNum).find("span").addClass("radiomark");
                                console.log("#" + childIDArr[c].id + (opts + 1));
                                $("#" + childIDArr[c].id + (opts + 1)).attr("disabled", false);
                            }
                            break;
                    }
                }
            }
            else {
                for (var c = 0; c < childIDArr.length; c++) {
                    switch (childIDArr[c].controlType) {
                        case "input":
                            $("#" + childIDArr[c].id).prop("disabled", true);
                            break;
                        case "radio":
                            for (var opts = 0; opts < childIDArr[c].responses.length; opts++) {
                                console.log("#" + childIDArr[c].id + "-radio-label" + childIDArr[c].responses[opts].seqNum);

                                $("#" + childIDArr[c].id + "-radio-label" + childIDArr[c].responses[opts].seqNum).find("span").removeClass("radiomark");
                                $("#" + childIDArr[c].id + "-radio-label" + childIDArr[c].responses[opts].seqNum).find("span").addClass("radiomark-disabled");

                                console.log("#" + childIDArr[c].id + (opts + 1));
                                $("#" + childIDArr[c].id + (opts + 1)).attr("disabled", true);
                            }
                            break;
                    }
                }
            }

            $("#" + parID).on("focusout", function () {
                console.log($("#" + parID).val());

                if (!NullOrEmptyCheck($("#" + parID).val())) {
                    for (var c = 0; c < childIDArr.length; c++) {
                        switch (childIDArr[c].controlType) {
                            case "input":
                                $("#" + childIDArr[c].id).prop("disabled", false);
                                break;
                            case "radio":
                                for (var r = 0; r < childIDArr[c].responses.length; r++) {
                                    $("#" + childIDArr[c].id + (r + 1)).prop("disabled", false);
                                    $("#" + childIDArr[c].id + "-radio-label" + (r + 1)).find(".radiomark").removeClass("disabled");
                                }
                                break;
                        }
                    }
                }
                else {
                    for (var c = 0; c < childIDArr.length; c++) {
                        switch (childIDArr[c].controlType) {
                            case "input":
                                $("#" + childIDArr[c].id).prop("disabled", true);
                                break;
                            case "radio":
                                for (var r = 0; r < childIDArr[c].responses.length; r++) {
                                    $("#" + childIDArr[c].id + (r + 1)).prop("disabled", true);
                                    $("#" + childIDArr[c].id + "-radio-label" + (r + 1)).find(".radiomark").addClass("disabled");
                                }
                                break;
                        }
                    }
                }
            });
        }
        else {
            for (var c = 0; c < childIDArr.length; c++) {
                switch (childIDArr[c].controlType) {
                    case "input":
                        $("#" + childIDArr[c].id).prop("disabled", true);
                        break;
                    case "radio":
                        for (var opts = 0; opts < childIDArr[c].responses.length; opts++) {
                            console.log("#" + childIDArr[c].id + "-radio-label" + childIDArr[c].responses[opts].seqNum);
                            $("#" + childIDArr[c].id + "-radio-label" + childIDArr[c].responses[opts].seqNum).find("span").removeClass("radiomark");
                            $("#" + childIDArr[c].id + "-radio-label" + childIDArr[c].responses[opts].seqNum).find("span").addClass("radiomark-disabled");
                            console.log("#" + childIDArr[c].id + (opts + 1));
                            $("#" + childIDArr[c].id + (opts + 1)).attr("disabled", true);
                        }
                        break;
                }
            }
        }
    });
}

function openEnableChildEl(id) {
    $(document).ready(function () {
        var jqItem = data.dataList.find(c => c.id === id);
        var jqControlType = jqItem.controlType;

        var jqValue = "";

        var opensEnablesArr = [];

        switch (jqControlType) {
            case "input":
            case "email":
                jqValue = $("#" + jqItem.id).val();
                break;
        }

        if (NullOrEmptyCheck(jqValue) && !hasEmailError(jqValue)) {
            $("#" + id + "-alertDiv").empty();

            var children = jqItem.childElementIDs;

            for (var c = 0; c < children.length; c++) {
                var chId = children[c].replace(/\s/g, '');

                var chItem = data.dataList.find(d => d.id === chId);
                var childControlType = chItem.controlType;

                switch (childControlType) {
                    case "input":
                        $("#" + children[c]).attr("disabled", false);
                        break;
                    case "radio":
                        for (var opts = 0; opts < chItem.responses.length; opts++) {
                            console.log("#" + chId + "-radio-label" + chItem.responses[opts].seqNum);
                            $("#" + chId + "-radio-label" + chItem.responses[opts].seqNum).find("span").removeClass("radiomark-disabled");
                            $("#" + chId + "-radio-label" + chItem.responses[opts].seqNum).find("span").addClass("radiomark")

                            console.log("#" + chId + (opts + 1));
                            $("#" + chId + (opts + 1)).attr("disabled", false);
                        }
                        break;
                    case "checkbox":
                        console.log("#" + chId);
                        $("#" + chId + "-div").find("label").find("span").removeClass("checkmark-disabled");
                        $("#" + chId + "-div").find("label").find("span").addClass("checkmark")

                        $("#" + chId).attr("disabled", false);
                        break;
                    case "dropdown":
                        $("#" + chId).attr("disabled", false);
                        break;
                }
            }

            editRulesCheckInput(id);
        }
        else {
            $("#" + id + "-alertDiv").empty();

            var children = jqItem.childElementIDs;

            for (var c = 0; c < children.length; c++) {
                var chId = children[c].replace(/\s/g, '');

                var chItem = data.dataList.find(d => d.id === chId);
                var childControlType = chItem.controlType;

                switch (childControlType) {
                    case "input":
                        $("#" + children[c]).attr("disabled", false);
                        break;
                    case "radio":
                        for (var opts = 0; opts < chItem.responses.length; opts++) {
                            console.log("#" + chId + "-radio-label" + chItem.responses[opts].seqNum);
                            $("#" + chId + "-radio-label" + chItem.responses[opts].seqNum).find("span").removeClass("radiomark");
                            $("#" + chId + "-radio-label" + chItem.responses[opts].seqNum).find("span").addClass("radiomark-disabled")

                            console.log("#" + chId + (opts + 1));
                            $("#" + chId + (opts + 1)).attr("disabled", true);
                        }
                        break;
                    case "checkbox":
                        console.log("#" + chId);
                        $("#" + chId + "-div").find("label").find("span").removeClass("checkmark");
                        $("#" + chId + "-div").find("label").find("span").addClass("checkmark-disabled");

                        $("#" + chId).prop("checked", false);
                        $("#" + chId).attr("disabled", true);
                        break;
                    case "dropdown":
                        break;
                }
            }

            editRulesCheckInput(id);
            $("#" + id + "-alertDiv").append(AlertController("danger", "Invalid e-mail inputted. Please input a valid e-mail."));
        }
    });
}

function updateTopInfoFirstName(id) {
    $(document).ready(function () {
        var val = $("#" + id).val();

        if (!NullOrEmptyCheck(val)) {
            console.log(val);

            $("#app-first-name").text();
            $("#app-first-name").text(val);
        }

    });
}

function updateTopInfoMiddleInitial(id) {
    $(document).ready(function () {
        var val = $("#" + id).val();

        $("#app-mid-init").text();
        $("#app-mid-init").text(val);
    });
}

function updateTopInfoLastName(id) {
    $(document).ready(function () {
        var val = $("#" + id).val();

        if (!NullOrEmptyCheck(val)) {
            console.log(val);

            $("#app-last-name").text();
            $("#app-last-name").text(val);
        }
    });
}

function mask(o, f) {
    setTimeout(function () {
        var v = f(o.value);
        if (v !== o.value) {
            o.value = v;
        }
    }, 1);
};

function medNum(v) {
    var r = v.replace(/\W/g, "");

    if (r.length === 10) {
        r = r.replace(/^(\w{3})(\w{2})(\w{0,4})(\w).*/, "$1-$2-$3-$4");
        return r.toUpperCase();
    }
    else if (r.length === 11) {
        r = r.replace(/^(\w{0,4})(\w{3})(\w{0,4}).*/, "$1-$2-$3");
        return r.toUpperCase();
    }
    else {
        return r.toUpperCase();
    }
}

function unmaskmedNum(control) {
    $(document).ready(function () {
        console.log(control.id);
        var idval = $('#' + control.id).val();
        var r = idval.replace(/[- )(]/g, "");
        console.log(r);
        $('#' + control.id).val(r);
    });
}

function unmaskssn(control) {
    $(document).ready(function () {
        console.log(control.id);
        var idval = $('#' + control.id).val();
        var r = idval.replace(/[- )(]/g, "");
        console.log(r);
        $('#' + control.id).val(r);
    });
}

function AutoCompleteChecker(id) {
    $(document).ready(function () {
        ApplyAutocomplete(id);
    })
};

function ApplyDateMask(id) {
    $('document').ready(function () {
        $("#" + id).mask('00/00/0000');
    });
}

function ApplyPhoneMask(id) {
    $(document).ready(function () {
        $('#' + id).mask('(000) 000-0000');
    });
}

function ApplySSNMask(id) {
    $(document).ready(function () {
        $('#' + id).mask('000-00-0000');
    });
}

function ApplyMedNumMask(id, val) {
    if (!NullOrEmptyCheck(val)) {
        console.log(medNum(val));
        $('#' + id).val(medNum(val));
    }
}

//This is for inital load, to apply to controls that are right after the page is loaded 
//(I.E.- The trigger element was selected "Yes" when the page was created)
function ApplyTriggersPostLoad(result) {
    $(document).ready(function () {
        console.log("ApplyTriggersPostLoad");

        for (var d = 0; d < result.length; d++) {
            switch (result[d].controlType) {
                case "date":
                    ApplyDateMask(result[d].id);
                    break;
                case "ssn":
                    ApplySSNMask(result[d].id);
                    break;
                case "phone":
                    ApplyPhoneMask(result[d].id);
                    break;
                case "company":
                    AutoCompleteChecker(result[d].id);
                    break;
                case "fraudbox":
                    if (parseInt(sessionStorage.getItem("spdSignCount")) > 0) {
                        result[d].answer = "";
                        $("#" + result[d].id + "-DDAccordID").collapse('hide');
                    }
                    break;
                case "dropdown":
                    switch (result[d].triggerType) {
                        case "accordion_dropdownList":
                            ApplyDDLAccord(result[d]);
                            break;
                        case "accordion_dual_ddl":
                            ApplyDualDDLAccord(result[d]);
                            break;
                        case "none":
                            break;
                    }
                    break;
                case "radio":
                    switch (result[d].triggerType) {
                        case "accordion_radio":
                            ApplyRBGAccord(result[d]);
                            break;
                        case "accordion_dual_rbg":
                            ApplyDualRBGAccord(result[d]);
                            break;
                        case "none":
                            break;
                    }
                    break;
                case "ccg":
                    ApplyCCG(result[d]);
                    break;
                case "table":
                case "doc_pre":
                case "doc_wet":
                    LoadDocRevCounterCheck(result[d].id);
                    break;
            }
        }
    });
}

//This is for after the page is loaded and the user makes a selection on a trigger element
function ApplyTriggersPostLoadList(childIDs) {
    console.log("ApplyTriggersPostLoad");

    for (var d = 0; d < childIDs.length; d++) {
        var childID = childIDs[d].replace(/\s+/g, '');

        var result = data.dataList.find(i => i.id === childID);

        switch (result.controlType) {
            case "date":
                ApplyDateMask(result.id);
                break;
            case "ssn":
                ApplySSNMask(result.id);
                break;
            case "phone":
                ApplyPhoneMask(result.id);
                break;
            case "company":
                AutoCompleteChecker(result.id);
                break;
            case "dropdown":
                switch (result.triggerType) {
                    case "accordion_dropdownList":
                        ApplyDDLAccord(result);
                        break;
                    case "accordion_dual_ddl":
                        ApplyDualDDLAccord(result);
                        break;
                    case "none":
                        break;
                }
                break;
            case "radio":
                switch (result.triggerType) {
                    case "accordion_radio":
                        ApplyRBGAccord(result);
                        break;
                    case "accordion_dual_rbg":
                        ApplyDualRBGAccord(result);
                        break;
                    case "none":
                        break;
                }
                break;
            case "ccg":
                ApplyCCG(result);
                break;
            case "table":
            case "doc_pre":
            case "doc_wet":
                LoadDocRevCounterCheck(result.id);
                break;
        }
    }

}

//This just applies to top-level (parent) controls after the page was created
function ApplyControlsPostLoad(result) {

    console.log("ApplyControlsPostLoad");

    for (var d = 0; d < result.length; d++) {
        switch (result[d].controlType) {
            case "date":
                ApplyDateMask(result[d].id);
                break;
            case "ssn":
                ApplySSNMask(result[d].id);
                break;
            case "phone":
                ApplyPhoneMask(result[d].id);
                break;
            case "company":
                AutoCompleteChecker(result[d].id);
                break;
            case "prescription":
                ApplyRBGAccord(result[d]);

                var perID = siteItemStorage.prescriptionStore.prescriptionsList.find(p => p.id.toLowerCase() === result[d].id.toLowerCase());

                if (perID !== null || perID !== 'undefined') {
                    PerscriptionCollapseSwitchRadio(perID.id, perID.id + "-RadioAccordID", 1);
                }
                break;
            case "signpad":
                if (result[d].isEnabled) {
                    var savedPenColor = siteItemStorage.signatureBlocks.find(p => p.id === result[d].id);

                    InitalizeSignaturePad(result[d].id + "_SigPad", result[d].id + "_SigPad_saveBtnID", result[d].id + "_SigPad_resetBtnID", savedPenColor);
                }
                break;
            case "medNum":
                ApplyMedNumMask(result[d].id, result[d].answer);
                break;
            case "fraudmodal":
                $("#" + result[d].id).modal("show");
                $("#" + result[d].id).modal({
                    backdrop: 'static',
                    keyboard: false
                });
                break;
        }

        var triggerSplit = result[d].triggerType;

        switch (triggerSplit) {
            case "none":
                break;
            case "opens_enable":
                var childObjArr = [];

                for (var c = 0; c < result[d].childElementIDs.length; c++) {
                    var childID = result[d].childElementIDs[c].replace(/\s/g, '');

                    for (var i = 0; i < result.length; i++) {
                        var resID = result[i].id;

                        if (resID.localeCompare(childID) === 0) {
                            childObjArr.push(result[i]);
                        }
                    }
                }

                OpensEnableListener(result[d].id, childObjArr);
                break;
            //case "accordion_dual_rbg":
            //    var drgSelAnswer = 0;

            //    for (var o = 0; o < result[d].responses.length; o++) {
            //        if (result[d].responses[o].value.localeCompare(result[d].answer) === 0) {
            //            drgSelAnswer = result[d].responses[o].seqNum;
            //        }
            //    }

            //    AutoOpenRGB(result[d].id, drgSelAnswer);
            //    break;
        }
    }

    /*
    if (!isJSONObjEmpty(siteItemStorage.signingCount.find(d => d.signID === pref))) {
        if (siteItemStorage.signingCount.ids.length === 0) {

        }
    }*/
    //ApplyTriggersPostLoad(result);
}

function ButtonBackgroundSwitcher(id, newTitle) {
    $(document).ready(function () {

        var pageTitle = $('.page-title');

        pageTitle.empty();

        if (id.localeCompare("SIG") !== 0) {
            if (
                id.localeCompare("ESN") === 0 ||
                id.localeCompare("SPD") === 0 ||
                id.localeCompare("VSN") === 0 ||
                id.localeCompare("PRT") === 0
            ) {
                pageTitle.html(newTitle);
                $("#sign-opts-cont").addClass('show');
            }
            else {
                pageTitle.html(newTitle);
                $("#sign-opts-cont").removeClass('show');
            }
        }
        else if (id.localeCompare("SIG") === 0) {
            pageTitle.html(newTitle);
            $("#sign-opts-cont").addClass('show');

        }
    });
};

function ApplyAutocomplete(item) {
    $(document).ready(function () {
        if (!NullOrEmptyCheck(item)) {
            var idName = !NullOrEmptyCheck(item.id) ? item.id : item;
            var currEl = $("#" + idName);

            var currVal = currEl.val();
            if (currVal.length > 0) {
                var currEl = data.dataList.find(d => d.id === idName);
                console.log("curr item: " + currEl);
                console.log("curr val: " + currVal);
                var siteCOList = currEl.responses;

                $("#" + idName).autocomplete({
                    dataType: "json",
                    source: siteCOList,
                    minLength: 2,
                    search: function (oEvent, oUi) {
                        // get current input value
                        var sValue = $(oEvent.target).val();
                        // init new search array
                        var aSearch = [];

                        if (sValue.length >= 2) {
                            for (var c = 0; c < siteCOList.length; c++) {
                                console.log(siteCOList[c].value.substring(0, sValue.length).localeCompare(sValue));

                                if (siteCOList[c].value.substring(0, sValue.length).toUpperCase() === sValue.toUpperCase()) {
                                    // ... add element
                                    aSearch.push(siteCOList[c].value);
                                }
                            }

                            // change search array
                            $(this).autocomplete('option', 'source', aSearch);
                        }
                    },
                    position: { my: "center top", at: "center bottom", collision: "flip" },
                    open: function (event, ui) { },
                    focus: function (event, ui) {
                        $("#" + idName).val(ui.item.value);
                        return false;
                    },
                    select: function (eventm, ui) {
                        editRulesCheckInput(idName);
                    }
                });
            }
        }
    });
};

function AccordionCardDDLSwitcher(item) {
    $(document).ready(function () {

        var seqNum = parseInt(item[item.selectedIndex].getAttribute('sequence-number'));
        var accordID = item[item.selectedIndex].getAttribute('accord-id');

        var cardBodyArr = [];
        var cardBody = "";

        var ddlItems = siteItemStorage.dualDDLStore.answerList;

        for (var a = 0; a < ddlItems.length; a++) {
            if (ddlItems[a].seqNum === seqNum) {
                cardBodyArr.push(ddlItems[a]);
            }
        }

        if (cardBodyArr.length > 0) {
            $('#' + accordID).collapse('show');

            $('#' + accordID + " .card-body").fadeOut("fast");

            $('#' + accordID + " .card-body").empty();

            var bodyArrOut = [];

            for (var cbc = 0; cbc < cardBodyArr.length; cbc++) {
                bodyArrOut.push(cardBodyArr[cbc].control);
            }

            cardBody = CreateElement(bodyArrOut);

            console.log("Showing Accordion");
            $('#' + accordID + " .card-body").append(cardBody);


            UpdateDualAccordionElements(cardBodyArr);

            $('#' + accordID + " .card-body").fadeIn("fast");


        }
        else {
            $('#' + accordID).collapse('hide');
            $('#' + accordID + ".card-body").empty();
        }
    });
};

function UpdateDualAccordionElements(arr) {
    for (var cbc = 0; cbc < arr.length; cbc++) {
        switch (arr[cbc].controlType) {
            case "date":
                console.log("Applying Date! for " + arr[cbc].id);
                DatePicker(arr[cbc].id, "", arr[cbc].answer);
                break;
            case "phone":
                console.log("Applying Phone Mask! for " + arr[cbc].id);
                ApplyPhoneMask(arr[cbc]);
                break;
            case "ssn":
                console.log("Applying SSN Mask! for " + arr[cbc].id);
                ApplySSNMask(arr[cbc]);
                break;
        }

        switch (arr[cbc].triggerType) {
            case "accordion_radio":
                console.log("Applying Radio Accordion! for " + arr[cbc].id);
                ApplyRBGAccord(arr[cbc]);
                break;
        }
    }
}

function OpenSessionIndicatior(currEnv) {
    $("#env-container").hide();

    switch (currEnv) {
        case "LOCAL":
            $("#env-container").css({ "background-color": "aqua", "border": "2px solid darkcyan" });
            $("#env-container p").text("ENVIRONMENT: LOCAL");
            $("#env-container").show();
            break;
        case "TEST":
            $("#env-container").css({ "background-color": "orange", "border": "2px solid darkorange" });
            $("#env-container p").text("ENVIRONMENT: TEST");
            $("#env-container").show();
            break;
        case "DEVELOPMENT":
            $("#env-container").css({ "background-color": "yellow", "border": "2px solid goldenrod" });
            $("#env-container p").text("ENVIRONMENT: DEVELOPMENT");
            $("#env-container").show();
            break;
        case "STAGING":
            $("#env-container").css({ "background-color": "green", "border": "2px solid darkgreen" });
            $("#env-container p").text("ENVIRONMENT: STAGING");
            $("#env-container").show();
            break;
        default:
            break;
    }
};

function removeModal(el) {
    $("#" + el.id).modal("hide");

    $(".modal-backdrop").remove();
    $("#" + el.id).remove();
}

function adjustSlider(el) {
    $(document).ready(function () {
        var control = $(el)
        var val = control.val();

        if (control.hasClass("range-slider")) {
            $('.range-slider-input').val(val);
        }
        else {
            $('.range-slider').val(val);
        }
    });
}

function UpdateAppFirstName(name) {
    $(document).ready(function () {
        console.log("Changing First Name!");

        $("#app-first-name").text(name);
    });
}

function UpdateAppLastName(name) {
    $(document).ready(function () {
        console.log("Changing Last Name!");

        $("#app-last-name").text(name);
    });
}

function OpenModalComp(modalId) {
    var selMObj = modalContainerData.find(m => m.id === modalId);

    $('body').append(
        CreateModalComponent(
            selMObj.modalObj
        )
    );

    $("#" + modalId).modal('show');
}

function OpenFraudModalComp(modalId) {
    var selMObj = fraudModalContainerData.find(m => m.id === modalId);

    $('body').append(
        CreateModalComponent(
            selMObj
        )
    );

    $("#" + modalId).modal({ backdrop: 'static', keyboard: false });
    $("#" + modalId).modal('show');
}

function CheckboxEnableSwitcher(cId) {

    var cEl = data.dataList.find(d => d.id === cId);

    switch (cEl.controlType) {
        case "checkbox":
        case "fraudbox":
            var cID = cEl.id.replace(/\s/g, '');
            var tType = cEl.triggerType.split("_");

            if (tType.length > 1) {
                switch (tType[0]) {
                    case "accordion":
                        $("#" + cID).removeAttr('disabled');
                        $("#" + cID + "_label").removeClass("accordCB-container-disabled");
                        $("#" + cID + "_label").addClass("accordCB-container");

                        $("#" + cID + "-accordCB-span").removeClass("accordCB-disabled");
                        $("#" + cID + "-accordCB-span").addClass("accordCB");

                        var accordCEl = [];

                        for (var e = 0; e < cEl.childElementIDs.length; e++) {
                            var child = data.dataList.find(d => d.id = cEl.childElementIDs[e]);

                            accordCEl.push(child);
                        }

                        ApplyControlsPostLoad(accordCEl)
                        break;
                }
            }
            else {
                $("#" + cID).removeAttr('disabled');
                $("#" + cID + "_label").find("span").removeClass("checkmark-disabled");
                $("#" + cID + "_label").find("span").addClass("checkmark");
            }
            break;
        case "input":
            $("#" + cID).removeAttr('disabled');
            break;
        case "signpad":
            $("#" + cId + "_SigPad_Div_Main").removeClass("signpad-disabled");

            $("#" + cEl.id + "_SigPad").removeAttr("style");

            $("#" + cEl.id + "_SigPad_saveBtnID").attr("disabled", false);
            $("#" + cEl.id + "_SigPad_saveBtnID").removeClass("signin-btn-form-diabled");
            $("#" + cEl.id + "_SigPad_saveBtnID").addClass("signin-btn-form");

            $("#" + cEl.id + "_SigPad_resetBtnID").attr("disabled", false);
            $("#" + cEl.id + "_SigPad_resetBtnID").removeClass("reset-btn-form-diabled");
            $("#" + cEl.id + "_SigPad_resetBtnID").addClass("reset-btn-form");

            var childIDObj = JSON.parse(sessionStorage.getItem("SPDChildIDs"));

            if (parseInt(childIDObj.currEl) !== childIDObj.childIds.length) {
                childIDObj.currEl = parseInt(childIDObj.currEl) + 1;
            }
            else {
                childIDObj.currEl = childIDObj.childIds.length;
            }

            sessionStorage.setItem("SPDChildIDs", JSON.stringify(childIDObj));
            break;
    }
}

function CheckApplicantInfo() {
    $(document).ready(function () {
        var incorrectCount = parseInt(sessionStorage.getItem("incorrectCount"));

        var dob = $("#appDoB").datepicker().val();
        var last4 = $("#appLast4").val();

        var errorArr = [];

        var dobcheck = CheckDOB(dob);
        var last4check = CheckLast4(last4);

        if (!NullOrEmptyCheck(dobcheck)) {
            errorArr.push(dobcheck);
        }
        if (!NullOrEmptyCheck(last4check)) {
            errorArr.push(last4check);
        }

        if (errorArr.length > 0) {
            if (incorrectCount !== 0) {
                incorrectCount -= 1;
                var errOut = [];
                errOut.push("<ul>")
                for (var e = 0; e < errorArr.length; e++) {
                    errOut.push("<li>" + errorArr[e] + "</li>");
                }
                errOut.push("</ul>")
                $("#appErrorDiv").empty();
                $("#appErrorDiv").append(AlertController("danger", CreateElement(errOut) + " <div>You have: " + incorrectCount + " attempts left!</div>"));

                sessionStorage.setItem("incorrectCount", incorrectCount);
            }
            else if (incorrectCount === 0) {

                $("#appModal").find(".modal-body").empty();
                $("#appModal").find(".modal-body").append(AlertController("danger", "You have failed to sign in and have been locked out. Please contact the Agent for your application to retry."))
                $(".signin-btn").attr("disabled", true).unbind('mouseenter mouseleave');
            }
        }
        else {
            $("#appModal").modal("hide");
        }
    });
}

function LimitCheck(id) {
    $(document).ready(function () {
        var val = $("#" + id).val();

        if (val.length > 4) {
            var newVal = val.slice(0, 4);

            $("#" + id).val(newVal);
        }
    });
}

function SigPadResetPad(signpadID) {
    $(document).ready(function () {
        sessionStorage.setItem("currSPadID", signpadID);
        var type = $("#" + signpadID).data("signer");

        var appObj = {
            appId: sessionStorage.getItem("contID"),
            signature: "",
            signer: type
        };

        StartLoadingMeter("Please Wait...Clearing Signature...");

        $.ajax({
            contentType: "application/json; charset=utf-8",
            url: baseUrl + "Application/SaveSignature",
            type: "POST",
            data: JSON.stringify(appObj),
            success: function (result) {
                console.log(result);

                var currCount = parseInt(sessionStorage.getItem("spdSignCount"));

                //SignatureButtonCheck(pref);
                var currSpdID = sessionStorage.getItem("currSPadID");
                console.log(currSpdID + "_Div_Main");

                var childIDObj = JSON.parse(sessionStorage.getItem("SPDChildIDs"));

                console.log(childIDObj.childIds);

                var idSplit = signpadID.split("_");

                var canvas = document.getElementById(idSplit[0] + "_SigPad");
                var signaturePad = new SignaturePad(canvas);

                signaturePad.clear();

                console.log(childIDObj.childIds[childIDObj.childIds.length - 1]);

                if (currCount > 0) {
                    $("#" + childIDObj.childIds[childIDObj.childIds.length - 1]).prop("disabled", true);

                    $("#" + childIDObj.childIds[childIDObj.childIds.length - 1] + "_label").removeClass("accordCB-container");
                    $("#" + childIDObj.childIds[childIDObj.childIds.length - 1] + "_label").addClass("accordCB-container-disabled");

                    $("#" + childIDObj.childIds[childIDObj.childIds.length - 1] + "-accordCB-span").removeClass("accordCB");
                    $("#" + childIDObj.childIds[childIDObj.childIds.length - 1] + "-accordCB-span").addClass("accordCB-disabled");
                }

                SignaturAccepted("Signature Cleared!");
            },
            error: function (error) {
                console.log(error);

                ErrorMessage("Error Resetting Signature!");
            }
        });
    });
}

function SigPadRedo(signpadID) {
    $(document).ready(function () {
        sessionStorage.setItem("currSPadID", signpadID);
        var type = $("#" + signpadID).data("signer");

        var appObj = {
            appId: sessionStorage.getItem("contID"),
            signature: "",
            signer: type
        };

        StartLoadingMeter("Clearing Signature...");

        $.ajax({
            contentType: "application/json; charset=utf-8",
            url: baseUrl + "Application/SaveSignature",
            type: "POST",
            data: JSON.stringify(appObj),
            success: function (result) {
                console.log(result);

                //SignatureButtonCheck(pref);
                var currCount = parseInt(sessionStorage.getItem("spdSignCount"));
                console.log(currCount);
                currCount += 1;
                sessionStorage.setItem("spdSignCount", currCount);
                console.log(currCount);
                var idSplit = signpadID.split("_");

                var currSpdID = sessionStorage.getItem("currSPadID");
                console.log(currSpdID + "_Div_Main");

                var childIDObj = JSON.parse(sessionStorage.getItem("SPDChildIDs"));

                console.log(childIDObj.childIds);

                var idSplit = signpadID.split("_");

                var canvas = document.getElementById(idSplit[0] + "_SigPad");
                var signaturePad = new SignaturePad(canvas);

                signaturePad.clear();

                $("#" + idSplit[0] + "_SigPad_Div_Main").find(".sig-pad-saved").hide();
                $("#" + idSplit[0] + "_SigPad_Div_Main").find(".signature-pad").show();

                console.log(childIDObj.childIds[childIDObj.childIds.length - 1]);

                if (currCount > 0) {
                    $("#" + childIDObj.childIds[childIDObj.childIds.length - 1]).prop("disabled", true);

                    $("#" + childIDObj.childIds[childIDObj.childIds.length - 1] + "_label").removeClass("accordCB-container");
                    $("#" + childIDObj.childIds[childIDObj.childIds.length - 1] + "_label").addClass("accordCB-container-disabled");

                    $("#" + childIDObj.childIds[childIDObj.childIds.length - 1] + "-accordCB-span").removeClass("accordCB");
                    $("#" + childIDObj.childIds[childIDObj.childIds.length - 1] + "-accordCB-span").addClass("accordCB-disabled");
                }

                SignaturAccepted("Signature Cleared!");
            },
            error: function (error) {
                console.log(error);

                ErrorMessage("Error Resetting Signature!");
            }
        });
    });
}

function UpdateProgressBar(val, text) {
    $(document).ready(function () {
        var h3 = $('#progressbar-container h3');
        $('#progressbar-container h3').fadeOut("slow").empty();
        h3.css("color", "black");
        h3.text(text);
        $('#progressbar-container h3').fadeIn("slow");

        $('#progressbar-div .progress-bar').css('width', val + '%').attr('aria-valuenow', val);
    });
}

function HideProgressBar() {
    $(document).ready(function () {
        var pbContainer = $('#progressbar-container');
        var pbMeter = $('#progressbar-div');

        pbContainer.hide();
        pbMeter.hide();
        $('#progressbar-container h3').empty();
        $('#progressbar-div .progress-bar').css('width', 0 + '%').attr('aria-valuenow', 0);
    });
}

function CloseModal(id) {
    $(document).ready(function () {
        $(".modal-backdrop").hide();
        $("#" + id).modal('toggle');
        $("#" + id).remove();
        $('body').removeClass("modal-open");
        $(".modal-backdrop").remove();
    });
}

function CloseSubModal(id) {
    $(document).ready(function () {
        $(".modal-backdrop").hide();
        $("#" + id).modal('toggle');
        $("#" + id).remove();
        $('body').removeClass("modal-open");
        $(".modal-backdrop").remove();
    });
}

function GetData(pageSuffix, stateCode, appContainerId, gridCount, isEdit, isTraining = false) {
    $(document).ready(function () {
        siteItemStorage.loadedControls = [];

        function GetContainerData(pageSuffix, stateCode, appContainerId) {
            $("body").block({
                message: "",
                overlayCSS: {
                    opacity: 0.7
                }
            });


            StartLoadingMeter("Loading...\nPlease wait...");

            return $.ajax({
                contentType: "application/json; charset=utf-8",
                url: baseUrl + "Application/GetContainerData",
                type: "GET",
                data: {
                    currentPage: pageSuffix,
                    stateCode: stateCode,
                    id: appContainerId
                }
            });
        }

        GetContainerData(pageSuffix, stateCode, appContainerId).then(
            function (result) {
                console.log("GetData");

                console.log(result);

                for (var r = 0; r < result.length; r++) {
                    siteItemStorage.loadedControls[result[r].id]

                    switch (result[r].contextValue) {
                        case "First Name":
                            sessionStorage.setItem("FirstName", result[r].answer);
                            break;
                        case "Middle Initial":
                            sessionStorage.setItem("MidInital", result[r].answer);
                            break;
                        case "Last Name":
                            sessionStorage.setItem("LastName", result[r].answer);
                            break;
                    }
                }

                $('#page-header').empty();
                $('#page-body').empty();

                console.log(sessionStorage.getItem("FirstName") + " " + sessionStorage.getItem("MidInital") + " " + sessionStorage.getItem("LastName"))

                $('.body-header').append(
                    ApplicaitonTopInfoBarController(
                        pageSuffix,
                        sessionStorage.getItem("FirstName"),
                        sessionStorage.getItem("MidInital"),
                        sessionStorage.getItem("LastName")
                    )
                );
                if (pageSuffix.localeCompare("SIG") === 0) {
                    var svgPaths = [];

                    if (!NullOrEmptyCheck(sessionStorage.getItem("ESN_Norm"))) {
                        svgPaths.push({
                            id: "ESN_Norm",
                            value: sessionStorage.getItem("ESN_Norm"),
                            toolspy: "Electronic signature , client will receive an email link and sign."
                        });
                        svgPaths.push({
                            id: "ESN_Hov",
                            value: sessionStorage.getItem("ESN_Hov"),
                            toolspy: "Electronic signature , client will receive an email link and sign."
                        });
                    }
                    if (!NullOrEmptyCheck(sessionStorage.getItem("SPD_Norm"))) {
                        svgPaths.push({
                            id: "SPD_Norm",
                            value: sessionStorage.getItem("SPD_Norm"),
                            toolspy: "Signpad, client is with you and you will both sign electronically on screen."
                        });
                        svgPaths.push({
                            id: "SPD_Hov",
                            value: sessionStorage.getItem("SPD_Hov"),
                            toolspy: "Signpad, client is with you and you will both sign electronically on screen."
                        });
                    }
                    if (!NullOrEmptyCheck(sessionStorage.getItem("VSN_Norm"))) {
                        svgPaths.push({
                            id: "VSN_Norm",
                            value: sessionStorage.getItem("VSN_Norm"),
                            toolspy: "Voice sign, Client will receive a voice call to sign from an underwriter."
                        });
                        svgPaths.push({
                            id: "VSN_Hov",
                            value: sessionStorage.getItem("VSN_Hov"),
                            toolspy: "Voice sign, Client will receive a voice call to sign from an underwritert."
                        });
                    }
                    if (!NullOrEmptyCheck(sessionStorage.getItem("PRT_Norm"))) {
                        svgPaths.push({
                            id: "PRT_Norm",
                            value: sessionStorage.getItem("PRT_Norm"),
                            toolspy: "Print and wet sign documents for fax/upload/guaranteed issue."
                        });
                        svgPaths.push({
                            id: "PRT_Hov",
                            value: sessionStorage.getItem("PRT_Hov"),
                            toolspy: "Print and wet sign documents for fax/upload/guaranteed issue."
                        });
                    }

                    console.log(svgPaths);

                    $("#page-body").append(
                        SignatureButtonController(svgPaths)
                    );
                }
                else {

                    var output = JSON.parse(JSON.stringify(result));

                    ControlObjectsMainController(output, 'page-body', gridCount, isEdit, appContainerId);

                }

                ApplyControlsPostLoad(data.dataList);
                ApplyTriggersPostLoad(data.dataList);
                for (var a = 0; a < siteItemStorage.dualRBGStore.length; a++) {
                    var thisDualRBG = siteItemStorage.dualRBGStore[a];

                    if ($('#' + thisDualRBG.id + "-RadioAccordID").length) {
                        ApplyControlsPostLoad(data.dataList);
                    }
                }

                HideProgressBar();
                clearOverlays();
                $("#sign-overlay").unblock();
                $("#sign-overlay").remove();
            },
            function (response) {
                console.log(response);

                var overlay = $('#overlay');
                var loadingContainer = $('#loading-meter-container');
                var loadingMeter = $('#loading-spinner');
                var error = $('#error-div');
                loadingMeter.hide();

                var h3 = $('#loading-meter-container h3');
                h3.css("color", "red");
                h3.text("Error Loading Content!");

                overlay.show();
                error.empty();
                error.append("<i class='fa fa-exclamation-triangle text-danger' aria-hidden='true' style='font-size:5em; margin:.25em;'></i>");
                error.show();

                setTimeout(function () {
                    loadingContainer.hide();
                    error.hide();
                    error.empty();
                    clearOverlays();
                    $("#sign-overlay").unblock();
                    $("#sign-overlay").remove();
                }, 3000);
            }
        );
    });
};

function ResetChildControls(id) {
    var chlidEl = data.dataList.find(c => c.id === id);

    switch (chlidEl.controlType) {
        case "input":
        case "phone":
        case "company":
        case "date":
        case "textbox":
            $("#" + id).val('');
            break;
        case "radio":
            for (var cb = 0; cb < chlidEl.responses.length; cb++) {
                var cbID = id + chlidEl.responses[cb].seqNum;
                $('#' + cbID).prop('checked', false);
            }
            break;
        case "dropdown":
            $('#' + cbID).prop("selectedIndex", 0);
            break;
    }
}
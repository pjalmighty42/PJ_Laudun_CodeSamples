
function PHIController(
    phiId,
    labelComp,
    noteComp,
    phiDateResponses,
    primaryPhoneNum,
    rulesMessage,
    isRequired
) {

    function CreatePHIObject(id, label, note, dateResp, priPN, rulesmsg, req) {
        let phiObject = [];
        let reqText = "";

        if (!NullOrEmptyCheck(rulesmsg) && rulesmsg.length > 0) {
            reqText = AlertController(rulesmsg[0], rulesmsg[1]);
        }

        let phoneVal = "(" + priPN.substring(0, 3) + ")" + priPN.substring(3, 6) + "-" + priPN.substring(6, priPN.length);

        phiObject.push("<div id='" + id + "-ParentID'>");
        phiObject.push("<div class='card'>");
        phiObject.push("<div class='card-header'>");
        phiObject.push(label);
        phiObject.push(note);
        phiObject.push("<div id='" + id + "-alertDiv'>" + reqText + "</div>");
        phiObject.push("</div>");
        phiObject.push("<div class='card-body'>");
        phiObject.push(DropDownController(
            LabelController(
                "",
                "question-label",
                "Date"
            ),
            "",
            "PHIDate",
            "question-dropdown-main",
            "question-dropdown-option",
            false,
            true,
            "string",
            dateResp,
            "",
            "",
            "",
            "onchange='phiDateSelect(this.id)'"
            )
        );
        phiObject.push(DropDownController(
            LabelController(
                "",
                "question-label",
                "Time"
            ),
            "",
            "PHITime",
            "question-dropdown-main",
            "question-dropdown-option",
            false,
            false,
            "string",
            [],
            "",
            "",
            "",
            "onchange='phiOpenSubmitBtn()'"
            )
        );
        phiObject.push(InputComponentController(
            LabelController(
                "",
                "question-label",
                "Primary Phone Number"
            ),
            "",
            "phone",
            "PHIPhone",
            "form-control question-input",
            "PHIPhone-PhoneName",
            "", "",
            0, 250,
            phoneVal,
            phoneVal,
            false,
            false,
            "",
            ""
        ));
        phiObject.push(InputComponentController(
            LabelController(
                "",
                "question-label",
                "Alternative Phone Number (if preferable)"
            ),
            "",
            "phone",
            "PHIAltPhone",
            "form-control question-input",
            "PHIAltPhone-PhoneName",
            "", "",
            0, 250,
            "",
            "",
            false,
            true,
            "",
            "onchange='updateAltPhone()'"
        ));
        phiObject.push(ParagraphController(
            "",
            "",
            "Please Note: you will receive an email from no-reply@iasadmin.com with information regarding the scheduled phone interview."
        ));
        phiObject.push(ParagraphController(
            "",
            "",
            "Please check your SPAM or JUNK MAIL folders if you do not see that email in your inbox."
        ));
        phiObject.push("</div>");
        phiObject.push("<div class='card-footer'>");
        phiObject.push("<button id='PHISubmit' class='btn btn-lg signin-btn-form' onclick='PHISubmitSchedule()' disabled>Finish</button>");
        phiObject.push("</div>");

        return CreateElement(phiObject);
    }

    let labelCompVar = labelComp !== "" ? labelComp : "";
    let noteCompVar = noteComp !== "" ? noteComp : "";

    return CreatePHIObject(
        phiId,
        labelCompVar,
        noteCompVar,
        phiDateResponses,
        primaryPhoneNum,
        rulesMessage,
        isRequired
    );
}

function phiDateSelect(id) {
    var selOptionText, control = "";

    control = $("#" + id + " option:selected");

    if (!NullOrEmptyCheck(control.val())) {
        var containerID = sessionStorage.getItem("contID");

        selOptionText = control.text();

        //Post: UpdateContainerData
        console.log("Checking Rules for Issues! Current ID is: " + id);
        console.log("Current Selected Option: " + selOptionText);
        console.log("Current Container ID: " + containerID);

        var alertDiv = $("#" + id + "-alertDiv");

        while (alertDiv.children().length > 0) {
            alertDiv.removeChild(alertDiv.firstChild);
        }

        $.ajax({
            contentType: "application/json; charset=utf-8",
            url: baseUrl + "Application/PhiTimeCallback",
            type: "GET",
            data: {
                id: containerID,
                phidate: selOptionText
            }
        }).done(function (result) {
            console.log(result);

            for (var i = 0; i < result.length; i++) {
                $("#PHITime select").append("<option class='question-dropdown-option' value='" + result[i].legacyValue + "'>" + result[i].value + "</option>")
            }

            $("#PHITime select").attr("disabled", false);

        }).fail(function (response) {
            console.log(response);
        });
    }
}

function updateAltPhone() {
    $('#' + data.id).mask('(000) 000-0000');
}

function phiOpenSubmitBtn() {
    $("#PHISubmit").attr("disabled", false);
}

function PHISubmitSchedule() {
    $(".card-footer").empty();
    $(".card-footer").append("<div class='phi-submitted-div'><i class='fa fa-lock'> Submitting Appointment...Please Wait... <i class='fa fa-spinner fa-pulse'></i></div>");

    let dateSel = $("#PHIDate option:selected")[0].value;
    let timeSel = $("#PHITime option:selected")[0].value;
    let priPN = $("#PHIPhone").val();
    let altPN = $("#PHIAltPhone").val();

    let isGud = true;

    if (NullOrEmptyCheck(dateSel)
        || NullOrEmptyCheck(timeSel)
        || NullOrEmptyCheck(priPN)
    ) {
        isGud = false;
    }

    if (isGud) {
        let containerID = sessionStorage.getItem("contID");
        let currState = sessionStorage.getItem("currentState");

        let contData = {
            id: containerID,
            selecteddate: dateSel,
            timecode: timeSel,
            phone: priPN,
            altPhone: altPN
        };

        $.ajax({
            contentType: "application/json; charset=utf-8",
            url: baseUrl + "Application/SubmitPhi",
            type: "POST",
            data:  JSON.stringify(contData)
        }).done(function (result) {
            console.log(result);

            GetData("SUM", currState, containerID, "col-12", true);
        }).fail(function (response) {
            console.log(response);
            $(".card-footer").append("<div class='phi-error-div'><i class='fa fa-exclamation-triangle'></i> Error Submitting Appointment! Please contact support for assistance... <i class='fa fa-exclamation-triangle'></i></div>");
        });
    }
} 



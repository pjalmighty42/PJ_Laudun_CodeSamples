
function SummaryProcessCheckController() {
    let output = [];

    output.push("<div class='process-footer col-md-12'>");
    output.push("<div class='row'>");
    output.push("<p>If you'd like to recheck the status of this application, please click the button below:</p>");
    output.push("</div>");
    output.push("<div class='row'>");
    output.push("<button id='RecheckApp class='btn btn-lg signin-btn-form' onclick='RecheckApp()'>Recheck Status</button>")
    output.push("</div>");
    output.push("</div>");

    return CreateElement(output);
};

function RecheckApp() {
    $(document).ready(function () {
        let contId = sessionStorage.getItem("containerId");

        $("#status-txt").empty();
        $("#status-txt").append("REPLACE ME WITH NEW STATUS!!!");
    });
}
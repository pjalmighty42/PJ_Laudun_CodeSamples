
function PlanControlObjectWaiverController(
    controlId,
    labelComp,
    plansObj
){
    function PlanControlObj(
        controlId,
        plansObj
    ) {
        this.controlId = !NullOrEmptyCheck(controlId) ? controlId : "";
        this.plansObj = !NullOrEmptyCheck(plansObj) ? plansObj : "error";

        if (plansObj === "error") {
            this.hasCredientals = false;
        }
        else {
            this.hasCredientals = true;
        }
    };

    function PlansTable(plansTHArr, quotesArr){
        let colCount = quotesArr.length;
        let y = 0;
        let x = 0;

        let planTHs = ["Monthly Premium", "Quarterly Premium", "Semi-Annual Premium", "Annual Premium"];
        let tableArr = [];

        tableArr.push("<table class='table table-striped'>");

        tableArr.push("<thead>");
        tableArr.push("<tr class='plan-tr'>");
        tableArr.push("<th>Benefit Premiums</th>");
        for (let c = 0; c < colCount; c++) {
            tableArr.push("<th class='plan-header'>" + quotesArr[c].plan + "</th>");
        }
        tableArr.push("</tr>");
        tableArr.push("</thead>");
        tableArr.push("<tbody>");

        tableArr.push("<tr>");
        tableArr.push("<th colspan='" + (colCount + 1) + "'><h5>Current Rates</h5></th>");
        tableArr.push("</tr>");

        for (var col = 0; col < 4; col++) {
            tableArr.push("<tr class='plan-tr'>");
            tableArr.push("<th>" + String(planTHs[col]) + "</th>");

            for (var row = 0; row < quotesArr.length; row++) {
                tableArr.push("<td>" + quotesArr[row].planPrems[col] + "</td>");
            }
        }

        tableArr.push("<tr>");
        tableArr.push("<th colspan='" + (colCount + 1) + "'><h5>Plan Inclusions</h5></th>");
        tableArr.push("</tr>");

        y = 0;
        x = 0;

        do {
            tableArr.push("<tr class='plan-tr'>");
            tableArr.push("<th>" + ModalComponentController("PlanBenefit_" + x, "", plansTHArr[x].name, plansTHArr[x].name, plansTHArr[x].description, true, false, "") + "</th>");

            do {
                let checkSwitch = quotesArr[y].inclusionVals[x] === true ? "<i class='fa fa-check-square plan-check'></i>" : "<i class='fa fa-square plan-uncheck'></i>";
                tableArr.push("<td>" + checkSwitch + "</td>");
                y += 1;

            } while (y < colCount);

            tableArr.push("</tr>");

            y = 0;
            x += 1;

        } while (x < plansTHArr.length);

        tableArr.push("<tr>");
        tableArr.push("<th></th>");
        for (let i = 0; i < quotesArr.length; i++) {
            tableArr.push("<td><button type='button' class='btn btn-block btn-info plan-sel-btn' onclick='applyPlan(" + i + ")'>Select Plan " + quotesArr[i].plan + "?</button></td>");
        }
        tableArr.push("</tr>");

        tableArr.push("</tbody>");

        tableArr.push("</table>");

        return CreateElement(tableArr);
    };

    function CreatePlansModalBody(
        appInfoObj,
        plansTHArr,
        quotesArr
    ){
        let plansModalArr = [];

        plansModalArr.push("<div class='modal-body'>");
        plansModalArr.push("<h4 class='modal-title'>Medicare Supplement Insurance Plans and Rates</h3>");
        plansModalArr.push("<h5 class='modal-title'>Based on your responses, these are your available Medicare supplement plans and monthly rates.</h5>");
        plansModalArr.push("<div class='applicant-info'>");

        let tobaccoQuest = appInfoObj.tobacco === "Y" ? "Yes" : "No";

        plansModalArr.push("<p>Current Applicant's Information - Age: " + appInfoObj.age + ", Gender: " + appInfoObj.gender + ", Issue State: " + appInfoObj.state + ", Tobacco Use: " + tobaccoQuest + ", Zip Code: " + appInfoObj.zip + "</p>");
        plansModalArr.push("<hr>");

        plansModalArr.push("<div class='planModalTable'>" + PlansTable(plansTHArr, quotesArr) + "</div>");

        plansModalArr.push("</div>");
        plansModalArr.push("</div>");

        return CreateElement(plansModalArr);
    };

    function CreatePlansPageUI(
        label,
        planObj
    ) {
        let uiArr = [];

        let labelCompVar = !NullOrEmptyCheck(label) ? label : "";

        uiArr.push("<div class='planControl'>")
        uiArr.push(labelCompVar);

        uiArr.push(CreatePlansModalBody(planObj.plansObj.applicantInfo, planObj.plansObj.plansTHs, planObj.plansObj.quotesArr));

        uiArr.push("</div>")

        return CreateElement(uiArr);
    };

    return CreatePlansPageUI(
        labelComp,
        new PlanControlObj(
            controlId,
            plansObj
        )
    );
};


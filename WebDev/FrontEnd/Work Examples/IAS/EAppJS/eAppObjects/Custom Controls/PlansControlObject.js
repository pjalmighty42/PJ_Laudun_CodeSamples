


function PlanControlObjectController(
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

    function PlansTableObj(plansTHArr, quotesArr) {
        let tableArr = [];
        let colCount = quotesArr.length;
        let y = 0;
        let x = 0;

        let planTHs = ["Monthly Premium", "Quarterly Premium", "Semi-Annual Premium", "Annual Premium"];

        tableArr.push("<table class='table table-striped'>");

        tableArr.push("<thead>");
        tableArr.push("<tr class='plan-tr'>");
        tableArr.push("<th>Benefits</th>");
        for (let c = 0; c < colCount; c++) {
            tableArr.push("<th class='plan-header'>Plan " + quotesArr[c].planDisplay + "</th>");
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
            tableArr.push("<th>" + ModalComponentController("PlanBenefit_" + x, "plan-modal-link", plansTHArr[x].name, plansTHArr[x].name, plansTHArr[x].description, true, false) + "</th>");

            do {
                let checkSwitch = quotesArr[y].inclusionVals[x] === true ? "<i class='fa fa-check-square plan-check'></i>" : "<i class='fa fa-square plan-uncheck'></i>";
                tableArr.push("<td>" + checkSwitch + "</td>");
                y += 1;

            } while (y < colCount);

            tableArr.push("</tr>");

            y = 0;
            x += 1;

        } while (x < plansTHArr.length);

        tableArr.push("<tr class='startOverDiv'>");
        tableArr.push("<th><button type='button' class='btn btn-block back-quote-btn' onclick='startOver()'><i class='fa fa-undo'></i> Start Over</button></td></th>");
        for (let i = 0; i < quotesArr.length; i++) {
            tableArr.push("<td><button type='button' class='btn btn-block plan-obj-btn' onclick='applyPlanObj(" + i + ")'>Apply for Plan " + quotesArr[i].planDisplay + "?</button></td>");
        }
        tableArr.push("</tr>");

        tableArr.push("</tbody>");

        tableArr.push("</table>");

        return CreateElement(tableArr);
    };

    function CreatePlansModalBodyObj(
        appInfoObj,
        plansTHArr,
        quotesArr
    ){
        let plansModalArr = [];

        plansModalArr.push("<div class='modal-body'>");
        plansModalArr.push("<h4 class='modal-title'>Medicare Supplement Insurance Plans and Rates</h3>");
        plansModalArr.push("<h4 class='modal-title'>If you qualify for Guaranteed Issue, some plans listed below may not be available.</h4>");
        plansModalArr.push("<h5 class='modal-title'>These are your available Medicare supplement plans and monthly fees.</h5>");
        plansModalArr.push("<div class='applicant-info'>");

        let tobaccoQuest = appInfoObj.tobacco === "Y" ? "Yes" : "No";

        plansModalArr.push("<p class='app-info'>Current Applicant's Information - Age: " + appInfoObj.age + ", Gender: " + appInfoObj.gender + ", Issue State: " + appInfoObj.state + ", Tobacco Use: " + tobaccoQuest + ", Zip Code: " + appInfoObj.zip + "</p>");
        plansModalArr.push("<hr>");

        plansModalArr.push("<div class='planModalTable'>" + PlansTableObj(plansTHArr, quotesArr) + "</div>");

        plansModalArr.push("</div>");
        plansModalArr.push("</div>");

        return CreateElement(plansModalArr);
    };

    function CreatePlansPageUI(
        label,
        planObj
    ) {
        let uiArr = [];

        if (planObj.plansObj.quotesArr.length === 0) {
            $("#print-btn-div").hide();
            uiArr.push(QuoteResponseMessageController("Sorry, there were no Plans given for the information provided. Please try again."));
        }
        else {
            let labelCompVar = !NullOrEmptyCheck(label) ? label : "";

            uiArr.push("<div class='planControl'>");
            uiArr.push(labelCompVar);

            for (var q = 0; q < planObj.plansObj.quotesArr.length; q++) {
                planObj.plansObj.quotesArr[q].planPrems = planObj.plansObj.quotesArr[q].planPrems.reverse();
            }

            uiArr.push(CreatePlansModalBodyObj(planObj.plansObj.applicantInfo, planObj.plansObj.plansTHs, planObj.plansObj.quotesArr));

            uiArr.push("</div>");
        }
        
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

function applyPlanObj(planNum) {
    $(document).ready(function () {
        var iD, state = "";

        var selNum = parseInt(planNum);
        var quotesArr = siteItemStorage.quotesTempStore.listStorage[0].quotesArray;
        var selPlan = quotesArr[selNum];

        iD = sessionStorage.getItem("appID");
        state = sessionStorage.getItem("currentState");

        var plan = {
            planDisplay: selPlan.planDisplay,
            plan: selPlan.plan,
            planType: selPlan.planType,
            planCode: selPlan.planCode,
            annualGrossPremium: selPlan.annualGrossPremium,
            annualPremium: selPlan.planPrems[3],
            monthlyPremium: selPlan.planPrems[0],
            discountCode: selPlan.discountCode,
            quarterlyPremium: selPlan.planPrems[1],
            semiAnnualPremium: selPlan.planPrems[2],
            policyFee: selPlan.policyFee,
            underwritingCode: !NullOrEmptyCheck(selPlan.underwritingCode) ? selPlan.underwritingCode : null,
            sequenceNumber: !NullOrEmptyCheck(selPlan.sequenceNumber) ? selPlan.sequenceNumber : null,
            rateIncreaseAnnualPremium: selPlan.rateIncreaseAnnualPremium,
            rateIncreaseCutOffDate: selPlan.rateIncreaseCutOffDate,
            rateIncreaseMonthlyPremium: selPlan.rateIncreaseMonthlyPremium,
            rateIncreaseQuarterlyPremium: selPlan.rateIncreaseQuarterlyPremium,
            rateIncreaseSemiAnnualPremium: selPlan.rateIncreaseSemiAnnualPremium,
            rateIncreaseSequenceNumber: selPlan.rateIncreaseSequenceNumber
        };
           
        siteItemStorage.planAppSelection["id"] = iD;
        siteItemStorage.planAppSelection["state"] = state;
        siteItemStorage.planAppSelection["selectedPlan"] = plan;
        siteItemStorage.planAppSelection["onlineQuote"] = JSON.stringify(siteItemStorage.quotesTempStore.onlineQuote);


        NewAppSwitcher("CreateApp", "POST");
    
    });
}

function startOver() {

    siteItemStorage.planAppSelection = {};

    NewAppSwitcher("QuoteParams");
}
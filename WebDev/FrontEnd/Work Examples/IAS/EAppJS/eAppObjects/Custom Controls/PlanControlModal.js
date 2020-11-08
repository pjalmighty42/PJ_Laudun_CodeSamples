siteItemStorage.planModalInfo = {
    appID: "",
    plansModalHasCredentials: true,
    planControlID: "",
    plansStorage: []
};

class PlanControlObj {
    constructor(
        controlId = "",
        buttonTextVal = "",
        answer = "",
        appID = "",
        isEnabled = "",
        isRequired = false,
        rulesmsg = ""
    ) {
        this.controlId = !NullOrEmptyCheck(controlId) ? controlId : "";
        this.buttonTextVal = !NullOrEmptyCheck(buttonTextVal) ? buttonTextVal : "Change Plan?";
        this.answer = !NullOrEmptyCheck(answer) ? answer : "";
        this.AppID = !NullOrEmptyCheck(appID) ? appID : "";
        this.enabled = isEnabled === true ? true : false;
        this.required = isRequired === true ? true : false;
        this.rulseMsg = !NullOrEmptyCheck(rulesmsg) ? rulesmsg.split("|") : "";

        this.hasCredientals = answer.toLowerCase().localeCompare("none") === 0 ? false : true;
    }
}

function PlanControlModalController(
    controlId,
    labelComp,
    buttonTextVal,
    answer,
    appID,
    isEnabled,
    isRequired,
    rulesMessage
){
    function CreatePlansPageUI(
        label,
        pageObj
    ) {

        siteItemStorage.planModalInfo.appID = "";
        siteItemStorage.planModalInfo.appID = pageObj.AppID;

        let rulesText = "";

        if (pageObj.rulseMsg.length > 1) {
            rulesText = AlertController(pageObj.rulseMsg[0], pageObj.rulseMsg[1]);
        }

        let uiArr = [];
        let labelCompVar = !NullOrEmptyCheck(label) ? label : "";

        uiArr.push("<div class='planControl'>");
        uiArr.push("<div class='plan-cont'>");
        if (!NullOrEmptyCheck(answer)) {
            if (answer.localeCompare("None") === 0) {
                uiArr.push(labelCompVar);
                uiArr.push(LabelController(pageObj.controlId + "-label", "planLabel", "-"));
                uiArr.push("<button type='button' class='plan-modal-btn btn btn-info' onclick='ApplyChangePlan()'>Select a Plan!</button>");
            }
            else {
                uiArr.push(labelCompVar);
                uiArr.push(LabelController(pageObj.controlId + "-label", "planLabel", pageObj.answer));
                uiArr.push("<button type='button' class='plan-modal-btn btn btn-info' onclick='ApplyChangePlan()'>" + pageObj.buttonTextVal + "</button>");
                
            }
            
        }
        uiArr.push("</div>");
        uiArr.push("<div class='plan-rulesTxt-cont'>");
        uiArr.push("<div id='" + pageObj.controlId + "-alertDiv'>" + rulesText + "</div>");
        uiArr.push("</div>");
        uiArr.push("</div>");
        
        return CreateElement(uiArr);
    };

    siteItemStorage.planModalInfo.planControlID = controlId;

    return CreatePlansPageUI(
        labelComp,
        new PlanControlObj(
            controlId,
            buttonTextVal,
            answer,
            appID,
            isEnabled,
            isRequired,
            rulesMessage
        )
    );  
};

function PlansTable(plansTHArr, quotesArr) {
    let colCount = quotesArr.length;
    let y = 0;
    let x = 0;

    let planTHs = ["Monthly Premium", "Quarterly Premium", "Semi-Annual Premium", "Annual Premium"]
    let tableArr = [];

    tableArr.push("<table class='table table-striped'>");

    tableArr.push("<thead>");
    tableArr.push("<tr class='plan-tr'>");
    tableArr.push("<th>Benefit Premiums</th>");
    for (let c = 0; c < colCount; c++) {

        tableArr.push("<th class='plan-header'>" + quotesArr[c].planDisplay + "</th>");
    }
    tableArr.push("</tr>");
    tableArr.push("</thead>");
    tableArr.push("<tbody>");

    tableArr.push("<tr>");
    tableArr.push("<th colspan='" + (colCount + 1) + "'><h5>Current Rates</h5></th>");
    tableArr.push("</tr>");

    let rowCnt = 0;

    do {
        tableArr.push("<tr class='plan-tr'>");
        tableArr.push("<th>" + String(planTHs[rowCnt]) + "</th>");

        switch (rowCnt) {
            case 0:
                for (let col = 0; col < quotesArr.length; col++) {
                    tableArr.push("<td>" + quotesArr[col].monthlyPremium + "</td>");
                }
                break;
            case 1:
                for (let col = 0; col < quotesArr.length; col++) {
                    tableArr.push("<td>" + quotesArr[col].quarterlyPremium + "</td>");
                }
                break;
            case 2:
                for (let col = 0; col < quotesArr.length; col++) {
                    tableArr.push("<td>" + quotesArr[col].semiAnnualPremium + "</td>");
                }
                break;
            case 3:
                for (let col = 0; col < quotesArr.length; col++) {
                    tableArr.push("<td>" + quotesArr[col].annualPremium + "</td>");
                }
                break;
        }

        rowCnt++;
    } while (rowCnt < 4);

    tableArr.push("<tr>");
    tableArr.push("<th colspan='" + (colCount + 1) + "'><h5>Plan Inclusions</h5></th>");
    tableArr.push("</tr>");

    y = 0;
    x = 0;

    do {
        tableArr.push("<tr class='plan-tr'>");
        tableArr.push("<th>" + ModalComponentController("PlanBenefit_" + x + "-inner", "plan-modal-link", plansTHArr[x].name, plansTHArr[x].name, plansTHArr[x].description, true, false, "CloseSubModal(this.id)") + "</th>");

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
        tableArr.push("<td><button type='button' class='btn btn-block btn-info plan-sel-btn' onclick='applyModalPlan(" + i + ")'>Select Plan " + quotesArr[i].planDisplay + "?</button></td>");
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
) {
    let modalLinkVal = siteItemStorage.planModalInfo.planControlID;

    let plansModalArr = [];

    plansModalArr.push("<div class='modal-body'>");
    plansModalArr.push("<h4 class='modal-title'>Medicare Supplement Insurance Plans and Rates</h3>");
    plansModalArr.push("<h5 class='modal-title'>Based on your responses, these are your available Medicare supplement plans and monthly rates.</h5>");
    plansModalArr.push("<div class='applicant-info'>");

    let tobaccoQ = appInfoObj.tobaccoQuest === "Y" ? "Yes" : "No";

    plansModalArr.push("<p>Current Applicant's Information - Age: " + appInfoObj.age + ", Gender: " + appInfoObj.gender + ", Issue State: " + appInfoObj.state + ", Tobacco Use: " + tobaccoQ + "</p>");
    plansModalArr.push("<hr>");
    if (quotesArr.length === 0) {
        plansModalArr.push("<div class='planModalTable-alt'>" + AlertController('danger', 'Sorry, there were no Plans given for the information provided. Please try again.') + "</div>");
        plansModalArr.push("<div class='modal-footer'>");
        plansModalArr.push("<button id=" + modalLinkVal + " class='btn btn-danger' onclick='CloseModal(this.id)'>Close</button>");
        plansModalArr.push("</div>");
        plansModalArr.push("</div>");
    } else {
        plansModalArr.push("<div class='planModalTable'>" + PlansTable(plansTHArr, quotesArr) + "</div>");
        plansModalArr.push("</div>");
    }
    

    
    plansModalArr.push("</div>");

    return CreateElement(plansModalArr);
};

function CreatePlansModal() {

    let modalLinkVal = siteItemStorage.planModalInfo.planControlID;
    let appInfoObj = siteItemStorage.planModalInfo.plansStorage[0].plansObj.applicantInfo;
    let plansObjArr = siteItemStorage.planModalInfo.plansStorage[0].plansObj.plansTHs;
    let quotesArr = siteItemStorage.planModalInfo.plansStorage[0].plansObj.quotesArr;

    let plansModalArr = [];

    plansModalArr.push("<div class='modal fade info-modal plan-modal-container' id='" + modalLinkVal + "'>");
    plansModalArr.push("<div class='modal-dialog modal-plan'>");
    plansModalArr.push("<div class='modal-content'>");

    plansModalArr.push("<div class='modal-header'>");
    plansModalArr.push("<h3 class='modal-title'>Medicare Supplement Insurance Plans and Rates</h3>");
    plansModalArr.push("<button id='" + modalLinkVal + "' type='button' class='close' onclick='CloseModal(this.id)'>&times;</button>");
    plansModalArr.push("</div>");

    plansModalArr.push(CreatePlansModalBody(appInfoObj, plansObjArr, quotesArr));

    plansModalArr.push("</div>");
    plansModalArr.push("</div>");
    plansModalArr.push("</div>");

    return CreateElement(plansModalArr);
};

function ApplyChangePlan() {
    $(document).ready(function () { 

        StartLoadingMeter("Please Wait...Getting Plans..");

        let contID = siteItemStorage.planModalInfo.appID;

        $(document).ready(function () {
            let containerID = contID;
            $.ajaxSetup({ cache: false });

            $.ajax({
                url: baseUrl + 'Application/ChangePlanSelection/',
                type: "GET",
                data: {
                    id: containerID
                }
            }).done(function (result) {

                console.log(JSON.parse(result));
                let jsonRes = JSON.parse(result);

                let params = jsonRes.Parameters;
                let benefits = jsonRes.QuoteResponseEx.Benefits;
                let quotes = jsonRes.QuoteResponseEx.Quotes;

                let quotesArr = [];
                let plansTHs = [];

                let IssueDate = new Date(params.EffectiveDate);

                let applicantInfo = {
                    "age": params.Age,
                    "gender": params.Gender,
                    "issueDate": IssueDate.getMonth() + "/" + IssueDate.getDate() + "/" + IssueDate.getFullYear(),
                    "tobaccoQuest": params.Tobacco,
                    "state": params.State
                };

                for (let pth = 0; pth < benefits.length; pth++) {
                    let newTH = { "name": benefits[pth].Name, "description": benefits[pth].Description };

                    plansTHs.push(newTH);
                }

                for (let q = 0; q < quotes.length; q++) {
                    let planInclusions = [];

                    let currPlan = quotes[q].Plan;
                    let isIncl = false;

                    for (let ben = 0; ben < benefits.length; ben++) {
                        for (let n = 0; n < benefits[ben].PlanNames.length; n++) {
                            let currName = benefits[ben].PlanNames[n].Name;

                            if (currName === currPlan) {
                                isIncl = true;
                            }
                        }
                        planInclusions.push(isIncl);
                        isIncl = false;
                    }

                    let newQuote = {
                        "planDisplay": quotes[q].PlanDisplay,
                        "plan": quotes[q].Plan,
                        "planType": quotes[q].PlanType,
                        "planCode": quotes[q].PlanCode,
                        "annualGrossPremium": quotes[q].AnnualGrossPremium,
                        "discountCode": quotes[q].DiscountCode,
                        "policyFee": quotes[q].PolicyFee,
                        "underwritingCode": quotes[q].UnderwritingCode,
                        "sequenceNumber": quotes[q].SequenceNumber,
                        "monthlyPremium": quotes[q].MonthlyPremium,
                        "quarterlyPremium": quotes[q].QuarterlyPremium,
                        "semiAnnualPremium": quotes[q].SemiAnnualPremium,
                        "annualPremium": quotes[q].AnnualPremium,
                        "inclusionVals": planInclusions,
                        "rateIncreaseAnnualPremium": quotes[q].RateIncreaseAnnualPremium,
                        "rateIncreaseCutOffDate": quotes[q].RateIncreaseCutOffDate,
                        "rateIncreaseMonthlyPremium": quotes[q].RateIncreaseMonthlyPremium,
                        "rateIncreaseQuarterlyPremium": quotes[q].RateIncreaseQuarterlyPremium,
                        "rateIncreaseSemiAnnualPremium": quotes[q].RateIncreaseSemiAnnualPremium,
                        "rateIncreaseSequenceNumber": quotes[q].RateIncreaseSequenceNumber
                    };

                    quotesArr.push(newQuote);
                }

                let fullJsonObj = {
                    applicantInfo,
                    plansTHs,
                    quotesArr
                };

                console.log(fullJsonObj);

                siteItemStorage.planModalInfo.plansStorage = [];

                siteItemStorage.planModalInfo.plansStorage.push({ "plansObj": fullJsonObj });

                console.log(siteItemStorage.planModalInfo.plansStorage);

                $("#edit-body").append(
                    CreatePlansModal()
                );

                let controlModalLink = siteItemStorage.planModalInfo.planControlID;

                $("#" + controlModalLink).modal('toggle');

                CloseLoadingMeter();
            }).fail(function (response) {
                console.log(response);

                ErrorMessage("Error! Unable to load Plans!");
            });
        });
    });
}

function applyModalPlan(planNum) {
    $(document).ready(function () {
        let iD, val, containerData = "";
        let modalID = siteItemStorage.planModalInfo.planControlID;

        let jqItem = data.dataList.find(c => c.id === modalID);
        let selNum = parseInt(planNum);
        let quoteObj = siteItemStorage.planModalInfo.plansStorage[0].plansObj;
        let quotesArr = siteItemStorage.planModalInfo.plansStorage[0].plansObj.quotesArr[selNum];

        iD = sessionStorage.getItem("contID");

        val = {
            planDisplay: quotesArr.planDisplay,
            plan: quotesArr.plan,
            planType: quotesArr.planType,
            planCode: quotesArr.planCode,
            annualGrossPremium: quotesArr.annualGrossPremium,
            annualPremium: quotesArr.annualPremium,
            monthlyPremium: quotesArr.monthlyPremium,
            discountCode: quotesArr.discountCode,
            quarterlyPremium: quotesArr.quarterlyPremium,
            semiAnnualPremium: quotesArr.semiAnnualPremium,
            policyFee: quotesArr.policyFee,
            underwritingCode: !NullOrEmptyCheck(quotesArr.underwritingCode) ? quotesArr.underwritingCode : "",
            sequenceNumber: !NullOrEmptyCheck(quotesArr.SequenceNumber) ? quotesArr.SequenceNumber : "",
            rateIncreaseAnnualPremium: quotesArr.rateIncreaseAnnualPremium,
            rateIncreaseCutOffDate: quotesArr.rateIncreaseCutOffDate,
            rateIncreaseMonthlyPremium: quotesArr.rateIncreaseMonthlyPremium,
            rateIncreaseQuarterlyPremium: quotesArr.rateIncreaseQuarterlyPremium,
            rateIncreaseSemiAnnualPremium: quotesArr.rateIncreaseSemiAnnualPremium,
            rateIncreaseSequenceNumber: quotesArr.rateIncreaseSequenceNumber
        };

        containerData = {
            id: iD,
            contextID: modalID,
            cvid: jqItem.cvid,
            value: JSON.stringify(val),
            value2: JSON.stringify(quoteObj),
            variableName: jqItem.variableName,
            sector: jqItem.pageSuffix,
            legacyValue: null,
            formQuestionNum: jqItem.formQuestionNum,
            kcId: jqItem.kcId,
            formField: jqItem.formField,
            effDate: jqItem.effDate,
            dataType: jqItem.dataType
        };

        console.log(JSON.stringify(containerData));

        $("#" + modalID + "-alertDiv").empty();

        PostData("Application/UpdateContainerData", containerData);

        CloseModal(modalID);

        $("#" + modalID + "-label").empty().text(val.planDisplay);
    });
}
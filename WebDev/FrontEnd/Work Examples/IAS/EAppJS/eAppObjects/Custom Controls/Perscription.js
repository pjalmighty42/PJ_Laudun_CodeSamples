class PerscriptionObj {
    constructor(
        perID = "",
        radVal = "",
        radSecVal = "",
        opts = [],
        ans = "",
        dosages = [],
        enabled = "",
        rulesmsg = "",
        required = false
    ) {
        this.id = !NullOrEmptyCheck(perID) ? perID : "";
        this.radioValue = !NullOrEmptyCheck(radVal) ? radVal : "";
        this.radioSecondaryValue = !NullOrEmptyCheck(radSecVal) ? radSecVal : "";
        this.options = opts;
        this.answer = !NullOrEmptyCheck(ans) ? ans : "";
        this.dosageList = dosages;
        this.enabled = enabled === true ? true : false;
        this.required = required === true ? true : false;
        this.rulseMsg = !NullOrEmptyCheck(rulesmsg) ? rulesmsg.split("|") : "";
    }
};

class PrescriptionInputObj {
    constructor(
        inputId = "",
        inputClass = "",
        inputName = "",
        inputValue = "",
        placeholderValue = "",
        isRequired = false,
        isEnabled = "",
        rulesmsg = "",
        responses = []
    ) {
        this.inputId = !NullOrEmptyCheck(inputId) ? inputId : "";
        this.inputClass = !NullOrEmptyCheck(inputClass) ? inputClass : "";
        this.inputName = !NullOrEmptyCheck(inputName) ? inputName : "";
        this.inputValue = !NullOrEmptyCheck(String(inputValue)) ? inputValue : "";
        this.placeholderValue = !NullOrEmptyCheck(placeholderValue) ? ReturnPureContextValue(placeholderValue) : "";
        this.isRequired = !NullOrEmptyCheck(isRequired) && isRequired === true ? true : false;
        this.isEnabled = !NullOrEmptyCheck(isEnabled) && isEnabled === true ? "" : "disabled";
        this.responses = responses !== null || responses.length > 0 ? responses : "";
        this.rulseMsg = !NullOrEmptyCheck(rulesmsg) ? rulesmsg.split("|") : "";
        this.contextValue = placeholderValue;
    }
};

function PerscriptionController(
    perscID,
    radioValue,
    radioSecondaryValue,
    options,
    contextAnswer,
    dosList,
    isEnabled,
    rulesMessage,
    isRequired
) {
    function CreatePerscription(
        perscObj
    ) {
        function CreatePerscriptionContainer(
            perscObj
        ) {
            console.log("Creating Prescription!");

            let perscriptionOut = [];

            function CreatePersriptionTable(
                parentObj
            ) {
                function InsertTableItems(
                    rxType,
                    id,
                    perscriptionObj,
                    indx,
                    isEnabled
                ) {
                    let tableRow = [];
                    
                    let currTR = "";
                    let editBtnID = "EditBtn_" + indx;
                    let delBtnID = "DelBtn_" + indx;

                    //TODO: Future ref: If you need to add more RX table row types, add it here 
                    switch (rxType) {
                        case "RXI":
                            currTR = "RXI_" + indx;

                            tableRow.push("<tr class='presc-tr'>");
                            tableRow.push("<td class='" + currTR + " td-drug-info'>" + perscriptionObj.drug + "</td>");
                            tableRow.push("<td class='" + currTR + " td-date-info'>" + perscriptionObj.date + "</td>");
                            tableRow.push("<td class='" + currTR + " td-dosage-info'>" + perscriptionObj.dosage + " - " + perscriptionObj.frequency + "</td>");
                            tableRow.push("<td class='" + currTR + " td-diag-info'>" + perscriptionObj.diagnosis + "</td>");
                            tableRow.push("<td>");

                            if (isEnabled) {
                                tableRow.push("<button type='button' id='" + editBtnID + "'  class='persc-modal-btn btn btn-warning' data-toggle='modal' data-btn-type='RXI_Edit' data-pre-idx='" + indx + "' data-id='" + id + "' data-target='#" + id + "_modal' onclick='openModalPersc(this.id)'>Edit</button>");
                                tableRow.push("<button type='button' id='" + delBtnID + "' class='persc-modal-btn btn btn-danger' data-id='" + id + "' data-pre-idx='" + indx + "' onclick='delPersc(this.id)'>Delete</button>");
                            }
                           
                            tableRow.push("</td>");
                            tableRow.push("</tr>");
                            break;
                        case "RXR":
                            currTR = "RXR_" + indx;

                            tableRow.push("<tr class='presc-tr'>");
                            tableRow.push("<td class=" + currTR + ">" + perscriptionObj.drug + "</td>");
                            {
                                let preOut = perscriptionObj.isprescribed === 0 ? "<i class='fa fa-check fa-lg text-success'></i>" : "<i class='fa fa-times fa-lg text-danger'></i>";
                                tableRow.push("<td class=" + currTR + ">" + preOut + "</td>");
                            }

                            {
                                let twoYears = perscriptionObj.morethan2years === 0 ? "<i class='fa fa-check fa-lg text-success'></i>" : "<i class='fa fa-times fa-lg text-danger'></i>";
                                tableRow.push("<td class=" + currTR + ">" + twoYears + "</td>");
                            }

                           
                            tableRow.push("<td class=" + currTR + ">" + perscriptionObj.dosage + " - " + perscriptionObj.frequency + "</td>");
                            tableRow.push("<td class=" + currTR + ">" + perscriptionObj.diagnosis + "</td>");
                            tableRow.push("<td>");
                            if (isEnabled) {
                                tableRow.push("<button type='button' id='" + editBtnID + "' class='persc-modal-btn btn btn-warning' data-toggle='modal' data-btn-type='RXR_Edit' data-pre-idx='" + indx + "' data-id='" + id + "' data-target='#" + id + "_modal' onclick='openModalPersc(this.id)'>Edit</button>");
                                tableRow.push("<button type='button' id='" + delBtnID + "' class='persc-modal-btn btn btn-danger' data-id='" + id + "' data-pre-idx='" + indx + "' onclick='delPersc(this.id)'>Delete</button>");
                            }
                            tableRow.push("</td>");
                            tableRow.push("</tr>");
                            break;
                    }

                    return CreateElement(tableRow);
                };

                let tableTHs, tableOut = [];

                let rxType = parentObj.id.substring(0, 3);

                //TODO: Future ref: If you need to add more RX table types, set up the tables and containers here
                let pers;
                switch (rxType) {
                    case "RXI":
                        tableTHs = ["Medication Name", "Start Date", "Dosage & Freqency", "Diagnosis", "Modify?"];

                        tableOut.push("<div id='perscTable-container'>");
                        tableOut.push(HeaderController(5, "Currently Perscribed Drugs", "", ""));
                        tableOut.push("<div id='perscTable'>");
                        tableOut.push("<table class='table table-striped table-hover'>");
                        tableOut.push("<thead>");
                        tableOut.push("<tr class='perscTable-tr'>");
                        for (let ths = 0; ths < tableTHs.length; ths++) {
                            tableOut.push("<th class='perscTable-header'>" + tableTHs[ths] + "</th>");
                        }
                        tableOut.push("</tr>");
                        tableOut.push("</thead>");
                        tableOut.push("<tbody>");
                        if (parentObj.dosageList.length > 0) {
                            for (pers = 0; pers < parentObj.dosageList.length; pers++) {
                                tableOut.push(InsertTableItems(rxType, parentObj.id, parentObj.dosageList[pers], pers, perscObj.enabled));
                            }
                        }
                        else {
                            tableOut.push("<tr class='presc-tr'>");
                            tableOut.push("<td class='No Prescriptions' colspan='" + tableTHs.length + "'>No Perscriptions Found!</td>");
                            tableOut.push("</tr>");
                        }
                        tableOut.push("</tbody>");
                        tableOut.push("</table>")
                        tableOut.push("</div>");
                        tableOut.push("</div>");
                        break;
                    case "RXR":
                        tableTHs = ["Medication Name", "Prescribed by Physician?", "Prescribed More than 2 Years?", "Dosage & Freqency", "Diagnosis", "Modify?"];

                        tableOut.push("<div id='perscTable-container'>");
                        tableOut.push(HeaderController(5, "Currently Perscribed Drugs", "", ""));
                        tableOut.push("<div id='perscTable2'>");
                        tableOut.push("<table class='table table-striped table-hover'>");
                        tableOut.push("<thead>");
                        tableOut.push("<tr class='perscTable-tr'>");
                        for (let ths = 0; ths < tableTHs.length; ths++) {
                            tableOut.push("<th class='perscTable-header'>" + tableTHs[ths] + "</th>");
                        }
                        tableOut.push("</tr>");
                        tableOut.push("</thead>");
                        tableOut.push("<tbody>");
                        if (parentObj.dosageList.length > 0) {
                            for (pers = 0; pers < parentObj.dosageList.length; pers++) {
                                tableOut.push(InsertTableItems(rxType, parentObj.id, parentObj.dosageList[pers], pers, perscObj.enabled));
                            }
                        }
                        else {
                            tableOut.push("<tr class='presc-tr'>");
                            tableOut.push("<td class='No Prescriptions' colspan='" + tableTHs.length + "'>No Perscriptions Found!</td>");
                            tableOut.push("</tr>");
                        }
                        tableOut.push("</tbody>");
                        tableOut.push("</table>");
                        tableOut.push("</div>");
                        tableOut.push("</div>");
                        break;
                }

                return CreateElement(tableOut);
            };

            function CreateRadioTrigger(
                persObj
            ) {
                let grid = "col-md-12";
                let childEls = [];

                let idSplit = perscObj.id.substring(0, 3);
                let type = idSplit + "_New";

                let triggerVal = 0;

                if (perscObj.enabled) {
                    childEls.push("<button type='button' id='NewBtn' class='persc-btn btn btn-info' data-toggle='modal' data-btn-type='" + type + "' data-id='" + persObj.id + "' data-target='#" + persObj.id + "_modal' onclick='openModalPersc(this.id)'>New</button>");
                }
                
                childEls.push("<hr />");

                for (let opts = 0; opts < perscObj.options.length; opts++) {
                    if (perscObj.options[opts].isTrigger === true) {
                        triggerVal = parseInt(perscObj.options[opts].seqNum);
                    }
                }

                childEls.push(CreatePersriptionTable(persObj));

                let childOut = CreateElement(childEls);

                return AccordionRadioGroupController(
                    perscObj.radioValue,
                    perscObj.radioSecondaryValue,
                    true,
                    persObj.id,
                    "question-radio-form",
                    "radio-container",
                    "question-radio-option prescription",
                    true,
                    perscObj.enabled,
                    perscObj.options,
                    childOut,
                    persObj.answer,
                    perscObj.rulseMsg,
                    true
                );
            };

            let grid = "col-md-12";
            let reqText = "";

            if (perscObj.rulseMsg.length > 0) {
                reqText = AlertController(perscObj.rulseMsg[0], perscObj.rulseMsg[1]);
            }

            perscriptionOut.push("<div id='perscription-container' class='" + grid + "'>");
            perscriptionOut.push("<hr />");
            perscriptionOut.push(CreateRadioTrigger(perscObj));
            perscriptionOut.push("<div id='" + perscObj.id + "-alertDiv'>" + reqText + "</div>");
            perscriptionOut.push("</div>");

            return CreateElement(perscriptionOut);
        };

        return CreatePerscriptionContainer(perscObj);
    };

    return CreatePerscription(
        new PerscriptionObj(
            perscID,
            radioValue,
            radioSecondaryValue,
            options,
            contextAnswer,
            dosList,
            isEnabled,
            rulesMessage,
            isRequired
        )
    );
};

function PrescriptionInputController(
    labelComp,
    noteComp,
    inputId,
    inputClass,
    inputName,
    inputValue,
    placeholderValue,
    isRequired,
    isEnabled,
    rulesMessage,
    responses
) {
    function CreatePrescriptionInput(
        label,
        note,
        inputObj
    ){
        let inputArr = [];
        let reqText = "";

        if (inputObj.rulseMsg.length > 0) {
            reqText = AlertController(inputObj.rulseMsg[0], inputObj.rulseMsg[1]);
        }

        inputArr.push("<div id='" + inputObj.inputId + "-div'>");

        inputArr.push(label);
        inputArr.push(note);

        inputArr.push("<div id='" + inputObj.inputId + "-alertDiv'>" + reqText + "</div>");

        if (inputObj.isRequired) {
            inputArr.push("<div class='company-input-container ui-widget'>");
            inputArr.push("<input type='text' id='" + inputObj.inputId + "' class='" + inputObj.inputClass + "' name='" + inputObj.inputName + "' placeholder='" + inputObj.placeholderValue + "' value='" + inputObj.inputValue + "' data-context-value='" + inputObj.contextValue + "' data-context-type='text' required>");
            inputArr.push("<div id='" + inputObj.inputId + "-alertDiv'></div>");
            inputArr.push("</div>");
        }
        else {
            inputArr.push("<div class='company-input-container ui-widget'>");
            inputArr.push("<input type='text' id='" + inputObj.inputId + "' class='" + inputObj.inputClass + "' name='" + inputObj.inputName + "' placeholder='" + inputObj.placeholderValue + "' value='" + inputObj.inputValue + "' data-context-value='" + inputObj.contextValue + "' data-context-type='text' " + inputObj.isEnabled + ">");
            inputArr.push("<div id='" + inputObj.inputId + "-alertDiv'></div>");
            inputArr.push("</div>");
        }

        inputArr.push("</div>");

        return CreateElement(inputArr);
    };

    let labelCompVar = !NullOrEmptyCheck(labelComp) ? labelComp : "";
    let noteCompVar = !NullOrEmptyCheck(noteComp) ? noteComp : "";

    return CreatePrescriptionInput(
        labelCompVar,
        noteCompVar,
        new PrescriptionInputObj(
            inputId,
            inputClass,
            inputName,
            inputValue,
            placeholderValue,
            isRequired,
            isEnabled,
            rulesMessage,
            responses
        )
    );
};

function openModalPersc(id) {
    $(document).ready(function () {

        console.log("Hit OpenModalPre()!"); 

        function CreatePrescriptionModal(
            id,
            type,
            rxType
        ) {
            let modal = [];
            let checkType = type;

            switch (checkType) {
                case "New":
                    modal = [];
                    var newNoteID = id + "_notes";
                    var requiredIcon = EAppIconController(id, "Response is Required!");

                    var newBody = [];

                    //TODO: Future ref: If there are any new rx types, the New body for that new rx must be created here
                    switch (rxType) {
                        case "RXI":
                            newBody = [
                                ParagraphController(
                                    "",
                                    "question-info",
                                    "You must select a Medication Name from the list provided below"
                                ),
                                PrescriptionInputController(
                                    LabelController(
                                        "",
                                        "question-label",
                                        requiredIcon + " Medication Name (copy off of pharmacy label):"
                                    ),
                                    "",
                                    id + "_perscInput",
                                    "form-control question-input",
                                    "", "",
                                    "Please input a Medication Name...",
                                    true,
                                    true,
                                    "",
                                    ""
                                ),
                                InputComponentController(
                                    LabelController(
                                        "",
                                        "question-label",
                                        requiredIcon + " Date Originally Perscribed (or best approximation):"
                                    ),
                                    "",
                                    "date",
                                    id + "_date",
                                    "form-control question-input",
                                    id + "_DateName",
                                    "", "",
                                    0, 250,
                                    "",
                                    "",
                                    true,
                                    false,
                                    "",
                                    "data-id='RXI001' onblur='ModalQuickCheck(this.id)'"
                                ),
                                DropDownController(
                                    LabelController(
                                        "",
                                        "question-label",
                                        requiredIcon + " Dosage:"
                                    ),
                                    "",
                                    id + "_dosageDDL",
                                    "question-dropdown-main",
                                    "question-dropdown-option",
                                    true,
                                    false,
                                    "normal",
                                    ["Select a Medication Dosage..."],
                                    0,
                                    "",
                                    "",
                                    "data-id='RXI001' onchange='ModalQuickCheck(this.id)'"
                                ),
                                DropDownController(
                                    LabelController(
                                        "",
                                        "question-label",
                                        requiredIcon + " Frequency:"
                                    ),
                                    "",
                                    id + "_freqDDL",
                                    "question-dropdown-main",
                                    "question-dropdown-option",
                                    true,
                                    false,
                                    "normal",
                                    PrescriptionFreqList(),
                                    0,
                                    "",
                                    "",
                                    "data-id='RXI001' onchange='ModalQuickCheck(this.id)'"
                                ),
                                InputComponentController(
                                    LabelController(
                                        "",
                                        "question-label",
                                        requiredIcon + " Diagnosis/Condition:"
                                    ),
                                    "",
                                    "text",
                                    id + "_diagCond",
                                    "form-control question-input",
                                    id + "_diagCond",
                                    "", "",
                                    0, 250,
                                    "",
                                    "Please input a Diagnosis...",
                                    true,
                                    false,
                                    "",
                                    "data-id='RXI001' onblur='ModalQuickCheck(this.id)'"
                                ),
                                TextBoxController(
                                    LabelController(
                                        "",
                                        "question-label",
                                        "Notes:"
                                    ),
                                    "",
                                    newNoteID,
                                    "form-control question-input",
                                    "",
                                    "",
                                    "Please input any notes for this prescription...",
                                    3,
                                    1024,
                                    false,
                                    "",
                                    false
                                )
                            ];
                            break;
                        case "RXR":
                            newBody = [
                                ParagraphController(
                                    "",
                                    "question-info",
                                    "You must select a Medication Name from the list provided below"
                                ),
                                PrescriptionInputController(
                                    LabelController(
                                        "",
                                        "question-label",
                                        requiredIcon + " Medication Name (copy off of pharmacy label):"
                                    ),
                                    "",
                                    id + "_perscInput",
                                    "form-control question-input",
                                    "", "",
                                    "Please input a Medication Name...",
                                    true,
                                    true,
                                    "",
                                    ""
                                ),
                                RadioButtonGroupContainerController(
                                    true,
                                    id + "_physicianRB",
                                    LabelController(
                                        "",
                                        "question-label",
                                        requiredIcon + " Prescribed by Physician?"
                                    ),
                                    "",
                                    "question-radio-form",
                                    "radio-container",
                                    "question-radio-option",
                                    true,
                                    false,
                                    [
                                        { seqNum: 0, value: "Yes" },
                                        { seqNum: 1, value: "No" }
                                    ],
                                    0,
                                    "",
                                    "",
                                    false
                                ),
                                RadioButtonGroupContainerController(
                                    true,
                                    id + "_2YearsRB",
                                    LabelController(
                                        "",
                                        "question-label",
                                        requiredIcon + " Have you taken this medication for more than two (2) years?"
                                    ),
                                    "",
                                    "question-radio-form",
                                    "radio-container",
                                    "question-radio-option",
                                    true,
                                    false,
                                    [
                                        { seqNum: 0, value: "Yes" },
                                        { seqNum: 1, value: "No" }
                                    ],
                                    0,
                                    "",
                                    "",
                                    false
                                ),
                                DropDownController(
                                    LabelController(
                                        "",
                                        "question-label",
                                        requiredIcon + " Dosage:"
                                    ),
                                    "",
                                    id + "_dosageDDL",
                                    "question-dropdown-main",
                                    "question-dropdown-option",
                                    true,
                                    false,
                                    "",
                                    ["Select a Medication Dosage..."],
                                    0,
                                    "",
                                    "",
                                    "onblur='ModalQuickCheck(this.id)'"
                                ),
                                DropDownController(
                                    LabelController(
                                        "",
                                        "question-label",
                                        requiredIcon + " Frequency:"
                                    ),
                                    "",
                                    id + "_freqDDL",
                                    "question-dropdown-main",
                                    "question-dropdown-option",
                                    true,
                                    false,
                                    "normal",
                                    PrescriptionFreqList(),
                                    0,
                                    "",
                                    "",
                                    "onblur='ModalQuickCheck(this.id)'"
                                ),
                                InputComponentController(
                                    LabelController(
                                        "",
                                        "question-label",
                                        requiredIcon + " Diagnosis/Condition:"
                                    ),
                                    "",
                                    "text",
                                    id + "_diagCond",
                                    "form-control question-input",
                                    id + "_diagCond",
                                    "", "",
                                    0, 250,
                                    "",
                                    "Please input a Diagnosis...",
                                    true,
                                    false,
                                    "",
                                    "onblur='ModalQuickCheck(this.id)'"
                                ),
                                TextBoxController(
                                    LabelController(
                                        "",
                                        "question-label",
                                        "Notes:"
                                    ),
                                    "",
                                    newNoteID,
                                    "form-control question-input",
                                    "",
                                    "",
                                    "Please input any notes for this prescription...",
                                    3,
                                    1024,
                                    false,
                                    "",
                                    false
                                )
                            ];
                            break;
                    }

                    var type = control.attr("data-id").substring(0, 3);
                    var num = control.attr("data-id").substring(3);

                    var newItemID = (type + num).toString();

                    var newBodyOut = CreateElement(newBody);

                    var newModalID = (id + "_modal").toString();

                    modal.push("<div class='modal fade perscription-modal-container' id='" + newModalID + "'>");
                    modal.push("<div class='modal-dialog'>");
                    modal.push("<div class='modal-content'>");

                    modal.push("<div class='modal-header'>");
                    modal.push("<h3 class='modal-title'>Add a Prescription</h3>");
                    modal.push("<button type='button' class='close' onclick='removeModal(" + newModalID + ")'>&times;</button>");
                    modal.push("</div>");

                    modal.push("<div class='modal-body'>");
                    modal.push(newBodyOut);
                    modal.push("</div>");


                    modal.push("<div class='modal-footer'>");
                    modal.push("<div class='footer-reset'>");
                    modal.push("<button type='button' id='" + id + "' class='btn btn-info' onclick='resetPrescription(this.id)'>Reset</button>");
                    modal.push("</div>");
                    modal.push("<div class='footer-save-cancel'>");
                    modal.push("<button type='button' id='SaveNew_preSave' data-btn-type='New' data-id='" + newItemID + "_SaveNew' class='btn btn-success' onclick='savePrescription(this.id)'>Save</button>");
                    modal.push("<button type='button' id='SaveNew' class='btn btn-danger' onclick='removeModal(" + newModalID + ")'>Cancel</button>");
                    modal.push("</div>");
                    modal.push("</div>");

                    return CreateElement(modal);
                case "Edit":
                    modal = [];

                    siteItemStorage.prescriptionStore.selectedPrescription = {};

                    var dataTypeArr = control.attr("data-btn-type").split("_");

                    var editItemID = control.attr("data-id");

                    var getPreDrugsById; 

                    for (let perItem = 0; perItem < siteItemStorage.prescriptionStore.prescriptionsList.length; perItem++) {
                        if (siteItemStorage.prescriptionStore.prescriptionsList[perItem].id.toLowerCase() === editItemID.toLowerCase()) {
                            getPreDrugsById = siteItemStorage.prescriptionStore.prescriptionsList[perItem];
                        }
                    }

                    siteItemStorage.prescriptionStore.selectedPrescription = getPreDrugsById;

                    var idx = parseInt(control.attr("data-pre-idx"));
                    var currClass = dataTypeArr[0] + "_" + idx;

                    var thisVals = [];
                    var currVals = $("." + currClass);

                    for (let i = 0; i < currVals.length; i++) {
                        if (i === 2) {
                            let dosFreq = $(currVals[i]).text().split("-");
                            for (let d = 0; d < dosFreq.length; d++) {
                                thisVals.push(dosFreq[d]);
                            }
                        }
                        else {
                            thisVals.push($(currVals[i]).text());
                        }
                    }

                    console.log(thisVals);

                    var getDrugByName;

                    for (let perDrug = 0; perDrug < getPreDrugsById.perscribedDrugs.length; perDrug++) {
                        if (getPreDrugsById.perscribedDrugs[perDrug].drug.toLowerCase() === thisVals[0].toLowerCase()) {
                            getDrugByName = getPreDrugsById.perscribedDrugs[perDrug];
                        }
                    }

                    var dosages = getDrugByName.dosageList;

                    var dosageOut = [];

                    for (let d = 0; d < dosages.length; d++) {
                        dosageOut.push({ "strength": dosages[d].strength, "ndc": dosages[d].ndc });
                    }

                    var selDosIndx;

                    for (let d = 0; d < dosageOut.length; d++) {
                        if (dosageOut[d].strength.replace(/\s+/g, '').toLowerCase() === getDrugByName.dosage.replace(/\s+/g, '').toLowerCase()) {
                            selDosIndx = d;
                        }
                    }

                    selDosIndx === 0 ? selDosIndx = 1 : selDosIndx = selDosIndx;

                    var editFreqList = PrescriptionFreqList();

                    var selFreq;
                    var selDosageFreq = getDrugByName.frequency.replace(/\s+/g, '').toLowerCase();

                    for (let f = 0; f < editFreqList.length; f++) {
                        let currVal = editFreqList[f].replace(/\s+/g, '').toLowerCase();

                        if (currVal === selDosageFreq) {
                            selFreq = editFreqList[f];
                        }
                    }

                    var editNoteID = id + "_notes";

                    var editBody = [];

                    var editRequiredIcon = EAppIconController("warning", "Response is Required!");

                    //TODO: Future ref: If there are any new rx types, the Edit body for that new rx must be created here
                    switch (rxType) {
                        case "RXI":
                            editBody = [
                                ParagraphController(
                                    "",
                                    "question-info",
                                    "You must select a Medication Name from the list provided below"
                                ),
                                PrescriptionInputController(
                                    LabelController(
                                        "",
                                        "question-label",
                                        editRequiredIcon + " Medication Name (copy off of pharmacy label):"
                                    ),
                                    "",
                                    id+ "_perscInput",
                                    "form-control question-input",
                                    "",
                                    thisVals[0],
                                    "Please input a Medication Name...",
                                    true,
                                    true,
                                    "",
                                    "onblur='ModalQuickCheck(this.id)'"
                                ),
                                InputComponentController(
                                    LabelController(
                                        "",
                                        "question-label",
                                        editRequiredIcon + " Date Originally Perscribed (or best approximation):"
                                    ),
                                    "",
                                    "date",
                                    id+ "_date",
                                    "form-control question-input",
                                    id+ "_DateName",
                                    "", "",
                                    0, 250,
                                    "",
                                    "",
                                    false,
                                    true,
                                    "",
                                    "onblur='ModalQuickCheck(this.id)'" 
                                ),
                                DropDownController(
                                    LabelController(
                                        "",
                                        "question-label",
                                        editRequiredIcon + " Dosage:"
                                    ),
                                    "",
                                    id+ "_dosageDDL",
                                    "question-dropdown-main",
                                    "question-dropdown-option",
                                    false,
                                    true,
                                    "pre",
                                    dosageOut,
                                    selDosIndx + 1,
                                    "",
                                    "",
                                    "onchange='ModalQuickCheck(this.id)'"
                                ),
                                DropDownController(
                                    LabelController(
                                        "",
                                        "question-label",
                                        editRequiredIcon + " Frequency:"
                                    ),
                                    "",
                                    id+ "_freqDDL",
                                    "question-dropdown-main",
                                    "question-dropdown-option",
                                    false,
                                    true,
                                    "normal",
                                    editFreqList,
                                    selFreq,
                                    "",
                                    "",
                                    "onchange='ModalQuickCheck(this.id)'"
                                ),
                                InputComponentController(
                                    LabelController(
                                        "",
                                        "question-label",
                                        editRequiredIcon + " Diagnosis/Condition:"
                                    ),
                                    "",
                                    "text",
                                    id+ "_diagCond",
                                    "form-control question-input",
                                    id+ "_diagCond",
                                    "", "",
                                    0, 250,
                                    thisVals[thisVals.length - 1],
                                    "Please input a Diagnosis...",
                                    false,
                                    true,
                                    "",
                                    "onblur='ModalQuickCheck(this.id)'"
                                ),
                                TextBoxController(
                                    LabelController(
                                        "",
                                        "question-label",
                                        "Notes:"
                                    ),
                                    "",
                                    editNoteID,
                                    "form-control question-input",
                                    "",
                                    getDrugByName.notes,
                                    "Please input any notes for this prescription...",
                                    3,
                                    1024,
                                    true,
                                    "",
                                    false
                                )
                            ];
                            break;
                        case "RXR":
                            editBody = [
                                ParagraphController(
                                    "",
                                    "question-info",
                                    "You must select a Medication Name from the list provided below"
                                ),
                                PrescriptionInputController(
                                    LabelController(
                                        "",
                                        "question-label",
                                        editRequiredIcon + " Medication Name (copy off of pharmacy label):"
                                    ),
                                    "",
                                    id+ "_perscInput",
                                    "form-control question-input",
                                    "",
                                    thisVals[0],
                                    "Please input a Medication Name...",
                                    true,
                                    true,
                                    "",
                                    ""
                                ),
                                RadioButtonGroupContainerController(
                                    true,
                                    id+ "_physicianRB",
                                    LabelController(
                                        "",
                                        "question-label",
                                        editRequiredIcon + " Prescribed by Physician?"
                                    ),
                                    "",
                                    "question-radio-form",
                                    "radio-container",
                                    "question-radio-option",
                                    false,
                                    false,
                                    [
                                        { seqNum: 0, value: "Yes" },
                                        { seqNum: 1, value: "No" }
                                    ],
                                    getDrugByName.isprescribed,
                                    "",
                                    "",
                                    false
                                ),
                                RadioButtonGroupContainerController(
                                    true,
                                    id+ "_2YearsRB",
                                    LabelController(
                                        "",
                                        "question-label",
                                        editRequiredIcon + " Have you taken this medication for more than two (2) years?"
                                    ),
                                    "",
                                    "question-radio-form",
                                    "radio-container",
                                    "question-radio-option",
                                    false,
                                    false,
                                    [
                                        { seqNum: 0, value: "Yes" },
                                        { seqNum: 1, value: "No" }
                                    ],
                                    getDrugByName.morethan2years,
                                    "",
                                    "",
                                    false
                                ),
                                DropDownController(
                                    LabelController(
                                        "",
                                        "question-label",
                                        editRequiredIcon + " Dosage:"
                                    ),
                                    "",
                                    id+ "_dosageDDL",
                                    "question-dropdown-main",
                                    "question-dropdown-option",
                                    false,
                                    true,
                                    "prescription",
                                    dosageOut,
                                    selDosIndx,
                                    "",
                                    "",
                                    ""
                                ),
                                DropDownController(
                                    LabelController(
                                        "",
                                        "question-label",
                                        editRequiredIcon + " Frequency:"
                                    ),
                                    "",
                                    id+ "_freqDDL",
                                    "question-dropdown-main",
                                    "question-dropdown-option",
                                    false,
                                    true,
                                    "",
                                    editFreqList,
                                    selFreq,
                                    "",
                                    "",
                                    ""
                                ),
                                InputComponentController(
                                    LabelController(
                                        "",
                                        "question-label",
                                        editRequiredIcon + " Diagnosis/Condition:"
                                    ),
                                    "",
                                    "text",
                                    id+ "_diagCond",
                                    "form-control question-input",
                                    id+ "_diagCond",
                                    "", "",
                                    0, 250,
                                    thisVals[thisVals.length - 1],
                                    "Please input a Diagnosis...",
                                    false,
                                    true,
                                    "",
                                    "onblur='ModalQuickCheck(this.id)'"
                                ),
                                TextBoxController(
                                    LabelController(
                                        "",
                                        "question-label",
                                        "Notes:"
                                    ),
                                    "",
                                    editNoteID,
                                    "form-control question-input",
                                    "",
                                    getDrugByName.notes,
                                    "Please input any notes for this prescription...",
                                    3,
                                    1024,
                                    true,
                                    "",
                                    false
                                )
                            ];
                            break;
                    }

                    var editBodyOut = CreateElement(editBody);
                    var editModalID = (id + "_modal").toString();
                    var editSaveId = (id).toString();

                    modal.push("<div class='modal fade perscription-modal-container' id='" + editModalID + "'>");
                    modal.push("<div class='modal-dialog'>");
                    modal.push("<div class='modal-content'>");

                    modal.push("<div class='modal-header'>");
                    modal.push("<h3 class='modal-title'>Edit a Prescription</h3>");
                    modal.push("<button type='button' class='close' onclick='removeModal(" + editModalID + ")'>&times;</button>");
                    modal.push("</div>");

                    modal.push("<div class='modal-body'>");
                    modal.push(editBodyOut);
                    modal.push("</div>");

                    modal.push("<div class='modal-footer'>");
                    modal.push("<div class='footer-reset'>");
                    modal.push("<button type='button' id='" + id+ "' class='btn btn-info' onclick='resetPrescription(this.id)'>Reset</button>");
                    modal.push("</div>");
                    modal.push("<div class='footer-save-cancel'>");
                    modal.push("<button type='button' id='" + editSaveId + "_preSave' data-edit-id='" + editSaveId + "' data-btn-type='Edit' data-id='" + editItemID + "' data-pre-idx='" + idx + "' class='btn btn-success' onclick='savePrescription(this.id)'>Save</button>");
                    modal.push("<button type='button' class='btn btn-danger'  onclick='removeModal(" + editModalID + ")'>Cancel</button>");
                    modal.push("</div>");
                    modal.push("</div>");

                    return CreateElement(modal);
            }
        };

        let control = $("#" + id);

        //Modals live outside any structure and is attached to the <body>, this will attach the newly created modal there
        let type = [];
        let rxType, newEditType, currID;

        type = control.attr('data-btn-type').split("_");
        rxType = type[0];
        newEditType = type[1];

        if (newEditType === "New") {
            currID = "SaveNew";
        } else {
            currID = id;
        }
        
        $('body').append(
            CreatePrescriptionModal(
                currID,
                newEditType,
                rxType
            )
        );

        if (newEditType === "Edit") {
            console.log("Edit Modal Opened!");

            let idx = parseInt(control.attr("data-pre-idx"));
            let selPerDrug = siteItemStorage.prescriptionStore.selectedPrescription.perscribedDrugs[idx];

            $("#" + id + "_date").datepicker();
            //DatePicker(id + "_date", "", selPerDrug.date, true);

            $("#" + id + "_date")
                .datepicker("setDate", selPerDrug.date)
                .datepicker("option", "changeYear", true)
                .datepicker("option", "changeMonth", true)
                .datepicker("option", "yearRange", "1910:2050");

            $("#" + id + "_date").datepicker()
                .on("input change", function (e) {
                    console.log("Date changed: ", e.target.value);
                    DateYearQuickCheck(id + "_date");
                    ModalQuickCheck(id + "_date");
                }
            );
            
            $('#' + id + '_modal').modal('show');

            $("#" + id + "_perscInput").autocomplete({
                delay: 100,
                source: function (request, response) {
                    $.ajax({
                        contentType: "application/json; charset=utf-8",
                        url: baseUrl + "Application/GetDrugsAndDosages",
                        type: "GET",
                        dataType: 'JSON',
                        data: {
                            drugname: request.term
                        },
                        success: function (data) {
                            let keys = data.drugNames;
                            console.log(keys);

                            response($.map(keys, function (i) {
                                return {
                                    label: i
                                };
                            }));
                        },
                        select: function (event, ui) {
                            console.log(event, ui);
                        }
                    });
                }
            });

            if ($("#" + id + "_perscInput").val().length > 0) {
                PrescriptionModalDisabledChecker(id, false);
            }

            $("#" + id + "_perscInput").on("focus focusout keyup", function () {
                if ($("#" + id + "_perscInput").val().length > 0) {
                    PrescriptionModalDisabledChecker(id, false);
                    PrescriptionAutocomplete("#" + id, $("#" + id + "_perscInput").val(), false); 
                }
                else {
                    PrescriptionModalDisabledChecker(id, true);
                }
            });
        }
        else {

            console.log("New Modal Opened!");

            $("#SaveNew_perscInput").autocomplete({
                delay: 100,
                source: function (request, response) {
                    $.ajax({
                        contentType: "application/json; charset=utf-8",
                        url: baseUrl + "Application/GetDrugsAndDosages",
                        type: "GET",
                        dataType: 'JSON',
                        data: {
                            drugname: request.term
                        },
                        success: function (data) {
                            let keys = data.drugNames;
                            console.log(keys);

                            response($.map(keys, function (i) {
                                return {
                                    label: i
                                };
                            }));
                        }
                    });
                }
            });

            $('#SaveNew_modal').find(".btn-success").prop("disabled", true);

            $('#SaveNew_modal').modal('show');

            $("#SaveNew_perscInput").on("focus focusout keyup autocomplete", function () {
                if ($("#SaveNew_perscInput").val().length > 0) {

                    $("#SaveNew_date").datepicker();

                    $("#SaveNew_date")
                        .datepicker("option", "changeYear", true)
                        .datepicker("option", "changeMonth", true)
                        .datepicker("option", "yearRange", "1910:2050");

                    $("#SaveNew_date").datepicker()
                        .on("input change", function (e) {
                            console.log("Date changed: ", e.target.value);
                            DateYearQuickCheck(id + "_date");
                            ModalQuickCheck("SaveNew_date");
                        }
                    );

                    PrescriptionModalDisabledChecker("SaveNew", false);
                    PrescriptionAutocomplete("#SaveNew", $("#SaveNew_perscInput").val(), false);
                }
                else {
                    PrescriptionModalDisabledChecker("SaveNew", true);
                }
            });
        }
    });
};

function PrescriptionModalDisabledChecker(id, isDisabled) {
    $("#" + id + "_date").prop("disabled", isDisabled);

    if ($("#" + id + "_physicianRB-radio-group").length > 0) {
        let rgbBtnsPhy = $("#" + id + "_physicianRB-radio-group");

        if (!isDisabled) {
            rgbBtnsPhy.find(".radiomark").each(function () {
                $(this).removeClass("disabled");
            });
        }
        else {
            rgbBtnsPhy.find(".radiomark").each(function () {
                $(this).addClass("disabled");
            });
        }

        rgbBtnsPhy.find(".question-radio-option").prop("disabled", isDisabled);
    }

    if ($("#" + id + "_2YearsRB-radio-group").length > 0) {
        let rgbBtns2Y = $("#" + id + "_2YearsRB-radio-group");

        if (!isDisabled) {
            rgbBtns2Y.find(".radiomark").each(function () {
                $(this).removeClass("disabled");
            });
        }
        else {
            rgbBtns2Y.find(".radiomark").each(function () {
                $(this).addClass("disabled");
            });
        }

        rgbBtns2Y.find(".question-radio-option").prop("disabled", isDisabled);
    }

    $("#" + id + "_dosageDDL").find("select").prop("disabled", isDisabled);
    $("#" + id + "_freqDDL").find("select").prop("disabled", isDisabled);

    $("#" + id + "_diagCond").prop("disabled", isDisabled);
    $("#" + id + "_notes").prop("disabled", isDisabled);
}

function PrescriptionAutocomplete(id, val, isEdit) {
    $(document).ready(function () {
        if (isEdit) {
            $.ajax({
                contentType: "application/json; charset=utf-8",
                url: baseUrl + "Application/GetDrugsAndDosages",
                type: "GET",
                data: {
                    drugname: val
                }
            }).done(function (response) {
                console.log(response);

                if (response.dosages.length > 0) {
                    let dosDDL = $(id + "_dosageDDL").find("select");
                    dosDDL.empty();
                    dosDDL.append("<option value='0' selected>Select a Medication Dosage...</option>");

                    for (let d = 0; d < response.dosages.length; d++) {
                        dosDDL.append($('<option/>', {
                            value: response.dosages[d].ndc,
                            text: response.dosages[d].strength
                        }));
                    }
                }
            }).fail(function (response) {
                console.log(response);
            });
        }
        else {
            $.ajax({
                contentType: "application/json; charset=utf-8",
                url: baseUrl + "Application/GetDrugsAndDosages",
                type: "GET",
                data: {
                    drugname: val
                }
            }).done(function (response) {
                console.log(response);
                
                if (response.dosages.length > 0) {
                    let dosDDL = $(id + "_dosageDDL").find("select");
                    dosDDL.empty();
                    dosDDL.append("<option value='0' selected>Select a Medication Dosage...</option>");


                    for (let d = 0; d < response.dosages.length; d++) {
                        dosDDL.append($('<option/>', {
                            value: response.dosages[d].ndc,
                            text: response.dosages[d].strength
                        }));
                    }
                }
            }).fail(function (response) {
                console.log(response);
            });
        }
    });
}

function UpdatePrescriptionTable(id) {
    $(document).ready(function () {
        let idSplit = id.substring(0, 3);

        switch (idSplit) {
            case "RXI":
                var getRXIPreById = siteItemStorage.prescriptionStore.prescriptionsList.find(i => i.id.toLowerCase() === id.toLowerCase()).perscribedDrugs;

                var tableBodyRXI = $("#" + id + "-div #perscTable-container #perscTable").find("table").find("tbody");
                tableBodyRXI.empty();

                for (let per = 0; per < getRXIPreById.length; per++) {
                    let newTR = [];

                    let currTR = "Edit_" + per;
                    let editBtnID = "EditBtn_" + per;
                    let delBtnID = "DelBtn_" + per;

                    let thisDos = getRXIPreById[per].dosage;
                    let thisFreq = getRXIPreById[per].frequency;

                    newTR.push("<tr class='presc-tr'>");
                    newTR.push("<td class='RXI_" + per + " td-drug-info'>" + getRXIPreById[per].drug + "</td>");
                    newTR.push("<td class='RXI_" + per + " td-date-info'>" + getRXIPreById[per].date + "</td>");
                    newTR.push("<td class='RXI_" + per + " td-dosage-info'>" + thisDos + " - " + thisFreq.toUpperCase() + "</td>");
                    newTR.push("<td class='RXI_" + per + " td-diag-info'>" + getRXIPreById[per].diagnosis + "</td>");
                    newTR.push("<td>");
                    newTR.push("<button type='button' id='" + editBtnID + "' class='persc-modal-btn btn btn-warning' data-toggle='modal' data-btn-type='RXI_Edit' data-pre-idx='" + per + "' data-id='" + id + "' data-target='#" + currTR + "_modal' onclick='openModalPersc(this.id)'>Edit</button>");
                    newTR.push("<button type='button' id='" + delBtnID + "' class='persc-modal-btn btn btn-danger' data-id='" + id + "' data-pre-idx='" + per + "' onclick='delPersc(this.id)'>Delete</button>");
                    newTR.push("</td>");
                    newTR.push("</tr>");

                    tableBodyRXI.append(CreateElement(newTR));
                }
                break;
            case "RXR":
                var getRXRPreById = siteItemStorage.prescriptionStore.prescriptionsList.find(i => i.id.toLowerCase() === id.toLowerCase()).perscribedDrugs;

                var tableBodyRXR = $("#" + id + "-div #perscTable-container #perscTable2").find("table").find("tbody");
                tableBodyRXR.empty();

                var freqList = PrescriptionFreqList();

                for (let per = 0; per < getRXRPreById.length; per++) {
                    let newTR = [];

                    currTR = "Edit_" + per;
                    let editBtnID = "EditBtn_" + per;
                    let delBtnID = "DelBtn_" + per;

                    let selDos = getRXRPreById.prescriptions[per].dosageList[parseInt(getRXRPreById.prescriptions[per].dosage)];
                    let selFreq = freqList[parseInt(getRXRPreById.prescriptions[per].frequency) + 1];

                    let preOut = getRXRPreById.prescriptions[per].isprescribed === 0 ? "<i class='fa fa-check fa-lg text-success'></i>" : "<i class='fa fa-times fa-lg text-danger'></i>";
                    let twoYears = getRXRPreById.prescriptions[per].morethan2years === 0 ? "<i class='fa fa-check fa-lg text-success'></i>" : "<i class='fa fa-times fa-lg text-danger'></i>";

                    newTR.push("<tr class='presc-tr'>");
                    newTR.push("<td class='RXR_" + per + "'>" + getRXRPreById.prescriptions[per].drug + "</td>");
                    newTR.push("<td class='RXR_" + per + "'>" + preOut + "</td>");
                    newTR.push("<td class='RXR_" + per + "'>" + twoYears + "</td>");
                    newTR.push("<td class='RXR_" + per + "'>" + selDos.strength + " - " + selFreq + "</td>");
                    newTR.push("<td class='RXR_" + per + "'>" + getRXRPreById.prescriptions[per].diagnosis + "</td>");
                    newTR.push("<td>");
                    newTR.push("<button type='button' id='" + editBtnID + "' class='persc-modal-btn btn btn-warning' data-toggle='modal' data-btn-type='RXR_Edit' data-pre-idx='" + per + "' data-id='" + id + "' data-target='#" + currTR + "_modal' onclick='openModalPersc(this.id)'>Edit</button>");
                    newTR.push("<button type='button' id='" + delBtnID + "' class='persc-modal-btn btn btn-danger' data-id='" + id + "' data-pre-idx='" + per + "' onclick='delPersc(this.id)'>Delete</button>");
                    newTR.push("</td>");
                    newTR.push("</tr>");

                    tableBodyRXR.append(CreateElement(newTR));
                }
                break;
        }
    });
}

function resetPrescription(
    id
) {
    $(document).ready(function () {
        console.log(id);

        let rgbBtnsPhy = $("#" + id + "_physicianRB-radio-group");
        let rgbBtns2Y = $("#" + id + "_2YearsRB-radio-group");

        $("#" + id + "_perscInput").val("");
        $("#" + id + "_date").val("");
        $("#" + id + "_dosageDDL").find("select").val(0);
        $("#" + id + "_freqDDL").find("select").val(0);
        $("#" + id + "_diagCond").val("");
        $("#" + id + "_notes").val("");

        $("#" + id + "_perscInput-alertDiv").empty();
        $("#" + id + "_date-alertDiv").empty();
        $("#" + id + "_dosageDDL-alertDiv").empty();
        $("#" + id + "_freqDDL-alertDiv").empty();
        $("#" + id + "_diagCond-alertDiv").empty();
        $("#" + id + "_notes-alertDiv").empty();

        $("#" + id + "_date").prop("disabled", true);
        $("#" + id + "_dosageDDL").find("select").prop("disabled", true);
        $("#" + id + "_freqDDL").find("select").prop("disabled", true);
        $("#" + id + "_diagCond").prop("disabled", true);
        $("#" + id + "_notes").prop("disabled", true);

        if (rgbBtnsPhy.length > 0) {
            rgbBtnsPhy.find("input")[0].checked = true;

            rgbBtnsPhy.find(".radiomark").each(function () {
                $(this).addClass("disabled");
            });

            rgbBtnsPhy.find(".question-radio-option").prop("disabled", true);
        }

        if (rgbBtns2Y.length > 0) {
            rgbBtns2Y.find("input")[0].checked = true;

            rgbBtns2Y.find(".radiomark").each(function () {
                $(this).addClass("disabled");
            });

            rgbBtns2Y.find(".question-radio-option").prop("disabled", true);
        }

        $('#' + id + '_modal').find(".btn-success").prop("disabled", true);
    });
};

function PerscriptionCollapseSwitchRadio(
    optionPrefix,
    accordionID,
    switchElNum
) {
    $(document).ready(function () {
        console.log("DropDown Accordion Created! Current params: OptPrefix= " + optionPrefix + " AccordID=" + accordionID + " SwitchNum=" + switchElNum);
        //This will combine the prefix and the trigger number for the <input> 
        //(E.g. - Prefix = Radio and Trigger Number = 1, will end up being "Radio1" being the triggering element)
        let triggerElement = optionPrefix + switchElNum;

        //If the trigger element ID matches the trigger element, show the accordion
        console.log("Trigger El = " + triggerElement);

        if ($('#' + triggerElement).is(':checked')) {
            console.log("Showing Accordion");
            $('#' + accordionID).collapse('show');
        }
        else {
            console.log("Hiding Accordion");
            $('#' + accordionID).collapse('hide');
        }

        $("input[name~='" + optionPrefix + "-name']").change(function (e) {
            if (e.target.id === triggerElement) {

                console.log("DropDown Accordion On! Current params: TarID=" + e.target.id + " TriggerEl= " + triggerElement + " ElementID=" + e.target.id + " AccordionID=" + accordionID);
                console.log("Showing Accordion");
                $('#' + accordionID).collapse('show');
            }
            else {
                console.log("DropDown Accordion Off! Current params: TarID=" + e.target.id + " TriggerEl= " + triggerElement + " ElementID=" + e.target.id + " AccordionID=" + accordionID);
                console.log("Hiding Accordion");
                $('#' + accordionID).collapse('hide');
            }
        });
    });
};

function GetPerscriptionData(id) {
    $(document).ready(function () {

        function CallDrugInfo(elVal) {
            $.ajax({
                contentType: "application/json; charset=utf-8",
                url: baseUrl + "Application/GetDrugsAndDosages",
                type: "GET",
                data: {
                    drugname: elVal
                }
            }).done(function (result) {
                console.log(result);

                $("#" + id).autocomplete({
                    source: result.drugNames,
                    select: function (event, ui) {
                        CallDosageInfo(ui.item.value);
                    }
                });

            }).fail(function (response) {
                console.log(response);
            });
        }
        if (!NullOrEmptyCheck(id)) {
            $("#" + id).on('input', function () {
                let elVal = $("#" + id).val();

                console.log(elVal);

                if (!NullOrEmptyCheck(elVal)) {
                    CallDrugInfo(elVal);
                }
            });
        }
        else {
            console.log("Hey idiot! You need an ID if you want to use Autocomplete!");
        }
    });
}

function delPersc(item) {
    $(document).ready(function () {
        console.log("Prescription is marked...FOR DELETION~!!");

        let btnItem = $("#" + item);
        //Having this here because when the Controller is gud, this will probably need to be an AJAX call
        let currID = btnItem.attr('data-id');

        let preItem = data.dataList.find(p => p.id === currID);
        let rbSel;

        $("#" + currID + " input[type=radio]:checked").each(function () {
            if (this.checked === true) {
                rbSel = $(this).val();
            }
        });

        let perIdx = parseInt(btnItem.attr('data-pre-idx'));

        let getDelParById = siteItemStorage.prescriptionStore.prescriptionsList.find(i => i.id.toLowerCase() === currID.toLowerCase());
        let getPreById = getDelParById.perscribedDrugs;

        let newArr = [];

        for (let p = 0; p < getPreById.length; p++) {
            if (p !== perIdx) {
                newArr.push(getPreById[p]);
            }
        }

        let containerID = sessionStorage.getItem("contID");

        getDelParById.perscribedDrugs = [];
        getDelParById.perscribedDrugs = newArr;

        let perscriptionStore = {
            "prescriptions": getDelParById.perscribedDrugs
        };

        let dataObj = data.dataList.find(i => i.id.toLowerCase() === currID.toLowerCase());

        let containerData = {
            id: containerID,
            contextID: currID,
            cvID: preItem.cvid,
            value: rbSel,
            value2: JSON.stringify(perscriptionStore),
            variableName: dataObj.variableName,
            sector: dataObj.pageSuffix,
            legacyValue: null,
            formQuestionNum: dataObj.formQuestionNum,
            kcId: dataObj.kcId,
            formField: dataObj.formField,
            effDate: dataObj.effDate,
            dataType: dataObj.dataType
        };

        PostData("Application/UpdateContainerData", containerData);

        UpdatePrescriptionTable(currID);
    });
}


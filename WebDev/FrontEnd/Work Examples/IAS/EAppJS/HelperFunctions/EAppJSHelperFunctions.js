

var siteItemStorage = {
    currClientCode: "",
    companyList: [],
    dualRBGStore: [],
    dualRBGOpenedIDs: [],
    dualDDLStore: {
        answerList: []
    },
    ccgData: {
        baseCardChildItems: [],
        cardGroupItems: []
    },
    quotesTempStore: {
        listStorage: [],
        onlineQuote: {},
        ErrorMsg: ""
    },
    planAppSelection: {},
    prescriptionStore: {
        prescriptionsList: [],
        selectedPrescription: {}
    },
    printableQuoteInfo: {
        page1Info: {},
        page2Info: {},
        checkboxes: {}
    },
    tempPDFStorage: {
        AppFirstName: "",
        AppLastName: "",
        WritingAgent: ""
    },
    writingAgentsArray: [],
    signatureBlocks: [],
    loadedControls: [],
    selectionObjs: [],
    signingCount: []
};

function NullOrEmptyCheck(stringInput) {
    if (
        stringInput === "" ||
        stringInput === null ||
        stringInput === 'null' ||
        stringInput === "null" ||
        stringInput === undefined ||
        stringInput === 'undefined' ||
        stringInput === "undefined" ||
        typeof stringInput === "undefined" ||
        stringInput.length === 0 ||
        stringInput === false ||
        stringInput.toString().replace(/\s/g, "") === "" ||
        (!/[^\s]/.test(stringInput)) ||
        (/^\s*$/.test(stringInput)) ||
        stringInput.toLowerCase === "none" 
    ) {
        return true;
    }
    else {
        return false;
    }
};

function outputControl(item, appID) {

    //This will take the passed array and output the header page elements
    function CreateHeaderEls(el) {
        if (!NullOrEmptyCheck(el.value)) {
            //List check. First Split the dataType
            var split = el.dataType.split("_");
            //If it has more than one item, it's a list, create the component
            if (split.length > 1) {
                if (!NullOrEmptyCheck(el.secondaryVal)) {
                    return ListComponentController(
                        HeaderController(
                            6,
                            ModalSwitchChecker(el.value),
                            "",
                            ""
                        ),
                        ParagraphController(
                            "",
                            "question-info",
                            ModalSwitchChecker(el.secondaryVal)
                        ),
                        el.responses,
                        true,
                        "",
                        el.id + "-List",
                        ""
                    );
                }
                {
                    return ListComponentController(
                        HeaderController(
                            6,
                            ModalSwitchChecker(el.value),
                            "",
                            ""
                        ),
                        "",
                        el.responses,
                        true,
                        "",
                        el.id + "-List",
                        ""
                    );
                }

            }
            else {
                switch (el.controlType) {
                    //attach each object to the given parent id
                    case "header":
                        return HeaderController(
                            2,
                            ModalSwitchChecker(el.value),
                            "",
                            ""
                        );
                    case "sub-header":
                        return HeaderController(
                            4,
                            ModalSwitchChecker(el.value),
                            "",
                            ""
                        );
                    case "info":
                    case "string":
                        return HeaderController(
                            6,
                            ModalSwitchChecker(el.value),
                            "",
                            ""
                        );
                }
            }
        }
    };

    let requiredIcon = "";

    if (item.isRequired === true) {
        if (item.answer.localeCompare("None") === 0 || NullOrEmptyCheck(item.answer) ) {
            requiredIcon = EAppIconController(item.id, "Response is Required!");
        }
    }

    var ApplicantInfo;
    switch (item.controlType) {
        case "header":
        case "sub-header":
        case "info":
        case "string":
        case "text":
            if (!NullOrEmptyCheck(item.value)) {
                return CreateHeaderEls(item);
            }
            break;
        case "html":
            return BlankController(item.value);
            break;
        case "input":
            switch (item.dataType) {
                case "int":
                    if (item.value.indexOf("Weight") !== -1) {
                        if (!NullOrEmptyCheck(item.secondaryVal)) {
                            return InputComponentController(
                                LabelController(
                                    "",
                                    "question-label",
                                    requiredIcon + " " + ModalSwitchChecker(item.value)
                                ),
                                ParagraphController(
                                    "",
                                    "question-info",
                                    ModalSwitchChecker(item.secondaryVal)
                                ),
                                "int",
                                item.id,
                                "form-control question-input",
                                item.id + "-Name",
                                "", "",
                                0, 500,
                                item.answer,
                                NewValPlaceholderChecker(item.value),
                                item.isRequired,
                                item.isEnabled,
                                item.RuleMessage,
                                "onblur='editRulesCheckInput(this.id)'"
                            );
                        }
                        else {
                            return InputComponentController(
                                LabelController(
                                    "",
                                    "question-label",
                                    requiredIcon + " " + ModalSwitchChecker(item.value)
                                ),
                                "",
                                "int",
                                item.id,
                                "form-control question-input",
                                item.id + "-Name",
                                "", "",
                                0, 500,
                                item.answer,
                                NewValPlaceholderChecker(item.value),
                                item.isRequired,
                                item.isEnabled,
                                item.RuleMessage,
                                "onblur='editRulesCheckInput(this.id)'"
                            );
                        }
                    }
                    else {
                        if (!NullOrEmptyCheck(item.secondaryVal)) {
                            return InputComponentController(
                                LabelController(
                                    "",
                                    "question-label",
                                    requiredIcon + " " + ModalSwitchChecker(item.value)
                                ),
                                ParagraphController(
                                    "",
                                    "question-info",
                                    ModalSwitchChecker(item.secondaryVal)
                                ),
                                "int",
                                item.id,
                                "form-control question-input",
                                item.id + "-Name",
                                "", "",
                                0, 200,
                                item.answer,
                                NewValPlaceholderChecker(item.value),
                                item.isRequired,
                                item.isEnabled,
                                item.RuleMessage,
                                "onblur='editRulesCheckInput(this.id)'"
                            );
                        }
                        else {
                            return InputComponentController(
                                LabelController(
                                    "",
                                    "question-label",
                                    requiredIcon + " " + ModalSwitchChecker(item.value)
                                ),
                                "",
                                "int",
                                item.id,
                                "form-control question-input",
                                item.id + "-" + item.value + "Name",
                                "", "",
                                0, 200,
                                item.answer,
                                NewValPlaceholderChecker(item.value),
                                item.isRequired,
                                item.isEnabled,
                                item.RuleMessage,
                                "onblur='editRulesCheckInput(this.id)'"
                            );
                        }
                    }
                    break;
                case "zip":
                    if (!NullOrEmptyCheck(item.secondaryVal)) {
                        return InputComponentController(
                            LabelController(
                                "",
                                "question-label",
                                requiredIcon + " " + ModalSwitchChecker(item.value)
                            ),
                            ParagraphController(
                                "",
                                "question-info",
                                ModalSwitchChecker(item.secondaryVal)
                            ),
                            "zip",
                            item.id,
                            "form-control question-input",
                            item.id + "-ZipCodeName",
                            "", "",
                            "", "",
                            item.answer,
                            NewValPlaceholderChecker(item.value),
                            item.isRequired,
                            item.isEnabled,
                            item.RuleMessage,
                            "onblur='editRulesCheckInput(this.id)'"
                        );
                    }
                    else {
                        return InputComponentController(
                            LabelController(
                                "",
                                "question-label",
                                requiredIcon + " " + ModalSwitchChecker(item.value)
                            ),
                            "",
                            "zip",
                            item.id,
                            "form-control question-input",
                            item.id + "-ZipCodeName",
                            "", "",
                            "", "",
                            item.answer,
                            NewValPlaceholderChecker(item.value),
                            item.isRequired,
                            item.isEnabled,
                            item.RuleMessage,
                            "onblur='editRulesCheckInput(this.id)'"
                        );
                    }
                    break;
                case "range":
                    if (!NullOrEmptyCheck(item.secondaryVal)) {
                        return InputComponentController(
                            LabelController(
                                "",
                                "question-label",
                                requiredIcon + " " + ModalSwitchChecker(item.value)
                            ),
                            ParagraphController(
                                "",
                                "question-info",
                                ModalSwitchChecker(item.secondaryVal)
                            ),
                            "range",
                            item.id,
                            "form-control question-input",
                            item.id + "-RangeSlider",
                            "", "",
                            "", "",
                            item.answer,
                            NewValPlaceholderChecker(item.value),
                            item.isRequired,
                            item.isEnabled,
                            item.RuleMessage,
                            ""
                        );
                    }
                    else {
                        return InputComponentController(
                            LabelController(
                                "",
                                "question-label",
                                requiredIcon + " " +  ModalSwitchChecker(item.value)
                            ),
                            "",
                            "range",
                            item.id,
                            "form-control question-input",
                            item.id + "-RangeSlider",
                            "", "",
                            "", "",
                            item.answer,
                            NewValPlaceholderChecker(item.value),
                            item.isRequired,
                            item.isEnabled,
                            item.RuleMessage,
                            ""
                        );
                    }
                    break;

                default:
                    if (!NullOrEmptyCheck(item.value)) {
                        let oninputFn = "";
                        let maxLength = 500;

                        switch (item.value) {
                            case "First Name":
                                oninputFn = "oninput='updateFirstName(this.id)'";
                                break;
                            case "Middle Initial":
                                oninputFn = "oninput='updateMiddleInitial(this.id)'";
                                maxLength = 1;
                                break;
                            case "Last Name":
                                oninputFn = "oninput='updateLastName(this.id)'";
                                break;
                        }

                        if (!NullOrEmptyCheck(item.secondaryVal)) {
                            return InputComponentController(
                                LabelController(
                                    "",
                                    "question-label",
                                    requiredIcon + " " +  ModalSwitchChecker(item.value)
                                ),
                                ParagraphController(
                                    "",
                                    "question-info",
                                    ModalSwitchChecker(item.secondaryVal)
                                ),
                                "text",
                                item.id,
                                "form-control question-input",
                                item.id + "Name",
                                "", "",
                                0, maxLength,
                                item.answer,
                                NewValPlaceholderChecker(item.value),
                                item.isRequired,
                                item.isEnabled,
                                item.RuleMessage,
                                oninputFn + " onblur='editRulesCheckInput(this.id)'"
                            );
                        }
                        else {
                            return InputComponentController(
                                LabelController(
                                    "",
                                    "question-label",
                                    requiredIcon + " " + ModalSwitchChecker(item.value)
                                ),
                                "",
                                "text",
                                item.id,
                                "form-control question-input",
                                item.id + "Name",
                                "", "",
                                0, maxLength,
                                item.answer,
                                NewValPlaceholderChecker(item.value),
                                item.isRequired,
                                item.isEnabled,
                                item.RuleMessage,
                                oninputFn + " onblur='editRulesCheckInput(this.id)'"
                            );
                        }
                    }
                    break;
            }
            break;
        case "banking":
            switch (item.dataType) {
                case "routing":
                    if (!NullOrEmptyCheck(item.secondaryVal)) {
                        return BankRoutingController(
                            LabelController(
                                "",
                                "question-label",
                                requiredIcon + " " + ModalSwitchChecker(item.value)
                            ),
                            ParagraphController(
                                "",
                                "question-info",
                                ModalSwitchChecker(item.secondaryVal)
                            ),
                            item.id,
                            "form-control question-input",
                            item.id,
                            item.answer,
                            NewValPlaceholderChecker(item.value),
                            item.isRequired,
                            item.isEnabled,
                            item.RuleMessage,
                            true
                        );
                    }
                    else {
                        return BankRoutingController(
                            LabelController(
                                "",
                                "question-label",
                                requiredIcon + " " + ModalSwitchChecker(item.value)
                            ),
                            "",
                            item.id,
                            "form-control question-input",
                            item.id,
                            item.answer,
                            NewValPlaceholderChecker(item.value),
                            item.isRequired,
                            item.isEnabled,
                            item.RuleMessage,
                            true
                        );
                    }
                    break;
                case "account":
                    if (!NullOrEmptyCheck(item.secondaryVal)) {
                        return BankRoutingController(
                            LabelController(
                                "",
                                "question-label",
                                requiredIcon + " " + ModalSwitchChecker(item.value)
                            ),
                            ParagraphController(
                                "",
                                "question-info",
                                ModalSwitchChecker(item.secondaryVal)
                            ),
                            item.id,
                            "form-control question-input",
                            item.id,
                            item.answer,
                            NewValPlaceholderChecker(item.value),
                            item.isRequired,
                            item.isEnabled,
                            item.RuleMessage,
                            false
                        );
                    }
                    else {
                        return BankRoutingController(
                            LabelController(
                                "",
                                "question-label",
                                requiredIcon + " " + ModalSwitchChecker(item.value)
                            ),
                            "",
                            item.id,
                            "form-control question-input",
                            item.id,
                            item.answer,
                            NewValPlaceholderChecker(item.value),
                            item.isRequired,
                            item.isEnabled,
                            item.RuleMessage,
                            false
                        );
                    }
                    break
            }
            break;
        case "medNum":
            if (!NullOrEmptyCheck(item.value)) {
                if (!NullOrEmptyCheck(item.secondaryVal)) {
                    return MedicareNumberController(
                        LabelController(
                            "",
                            "question-label",
                            requiredIcon + " " + ModalSwitchChecker(item.value)
                        ),
                        ParagraphController(
                            "",
                            "question-info",
                            ModalSwitchChecker(item.secondaryVal)
                        ),
                        item.id,
                        "form-control question-input",
                        item.id,
                        item.answer,
                        NewValPlaceholderChecker(item.value),
                        item.isRequired,
                        item.RuleMessage,
                        item.isEnabled
                    );
                }
                else {
                    return MedicareNumberController(
                        LabelController(
                            "",
                            "question-label",
                            requiredIcon + " " + ModalSwitchChecker(item.value)
                        ),
                        "",
                        item.id,
                        "form-control question-input",
                        item.id,
                        item.answer,
                        NewValPlaceholderChecker(item.value),
                        item.isRequired,
                        item.RuleMessage,
                        item.isEnabled
                    );
                }
            }
            break;
        case "ssn":
            if (!NullOrEmptyCheck(item.value)) {
                if (!NullOrEmptyCheck(item.secondaryVal)) {
                    return InputComponentController(
                        LabelController(
                            "",
                            "question-label",
                            requiredIcon + " " + ModalSwitchChecker(item.value)
                        ),
                        ParagraphController(
                            "",
                            "question-info",
                            ModalSwitchChecker(item.secondaryVal)
                        ),
                        "ssn",
                        item.id,
                        "form-control question-input",
                        item.id + "-SSN",
                        "", "",
                        "", "",
                        item.answer,
                        NewValPlaceholderChecker(item.value),
                        item.isRequired,
                        item.isEnabled,
                        item.RuleMessage,
                        "onblur='editRulesCheckInput(this.id)'"
                    );
                }
                else {
                    return InputComponentController(
                        LabelController(
                            "",
                            "question-label",
                            requiredIcon + " " +  ModalSwitchChecker(item.value)
                        ),
                        "",
                        "ssn",
                        item.id,
                        "form-control question-input",
                        item.id + "-SSN",
                        "", "",
                        "", "",
                        item.answer,
                        NewValPlaceholderChecker(item.value),
                        item.isRequired,
                        item.isEnabled,
                        item.RuleMessage,
                        "onblur='editRulesCheckInput(this.id)'"
                    );
                }
            }
            break;
        case "ssn4":
            if (!NullOrEmptyCheck(item.value)) {
                if (!NullOrEmptyCheck(item.secondaryVal)) {
                    return InputComponentController(
                        LabelController(
                            "",
                            "question-label",
                            requiredIcon + " " + ModalSwitchChecker(item.value)
                        ),
                        ParagraphController(
                            "",
                            "question-info",
                            ModalSwitchChecker(item.secondaryVal)
                        ),
                        "ssn4",
                        item.id,
                        "form-control question-input",
                        item.id,
                        "", "",
                        "", "",
                        item.answer,
                        NewValPlaceholderChecker(item.value),
                        item.isRequired,
                        item.isEnabled,
                        item.RuleMessage,
                        "onblur='editRulesCheckInput(this.id)'"
                    );
                }
                else {
                    return InputComponentController(
                        LabelController(
                            "",
                            "question-label",
                            requiredIcon + " " +  ModalSwitchChecker(item.value)
                        ),
                        "",
                        "ssn4",
                        item.id,
                        "form-control question-input",
                        item.id,
                        "", "",
                        "", "",
                        item.answer,
                        NewValPlaceholderChecker(item.value),
                        item.isRequired,
                        item.isEnabled,
                        item.RuleMessage,
                        "onblur='editRulesCheckInput(this.id)'"
                    );
                }
            }
            break;
        case "phone":
            if (!NullOrEmptyCheck(item.value)) {
                if (!NullOrEmptyCheck(item.secondaryVal)) {
                    return InputComponentController(
                        LabelController(
                            "",
                            "question-label",
                            requiredIcon + " " +  ModalSwitchChecker(item.value)
                        ),
                        ParagraphController(
                            "",
                            "question-info",
                            ModalSwitchChecker(item.secondaryVal)
                        ),
                        "phone",
                        item.id,
                        "form-control question-input",
                        item.id + "-PhoneName",
                        "", "",
                        0, 250,
                        item.answer,
                        NewValPlaceholderChecker(item.value),
                        item.isRequired,
                        item.isEnabled,
                        item.RuleMessage,
                        "onblur='editRulesCheckInput(this.id)'"
                    );
                }
                else {
                    return InputComponentController(
                        LabelController(
                            "",
                            "question-label",
                            requiredIcon + " " +  ModalSwitchChecker(item.value)
                        ),
                        "",
                        "phone",
                        item.id,
                        "form-control question-input",
                        item.id + "-PhoneName",
                        "", "",
                        0, 250,
                        item.answer,
                        NewValPlaceholderChecker(item.value),
                        item.isRequired,
                        item.isEnabled,
                        item.RuleMessage,
                        "onblur='editRulesCheckInput(this.id)'"
                    );
                }
            }
            break;
        case "email":
            if (item.triggerType.localeCompare("opens_enable") === 0) {
                if (!NullOrEmptyCheck(item.value)) {
                    if (!NullOrEmptyCheck(item.secondaryVal)) {
                        return InputComponentController(
                            LabelController(
                                "",
                                "question-label",
                                requiredIcon + " " +  ModalSwitchChecker(item.value)
                            ),
                            ParagraphController(
                                "",
                                "question-info",
                                item.secondaryVal
                            ),
                            "email",
                            item.id,
                            "form-control question-input",
                            item.id + "EmailName",
                            "", "",
                            0, 250,
                            item.answer,
                            NewValPlaceholderChecker(item.value),
                            item.isRequired,
                            item.isEnabled,
                            item.RuleMessage,
                            "onblur='openEnableChildEl(this.id)'"
                        );
                    }
                    else {
                        return InputComponentController(
                            LabelController(
                                "",
                                "question-label",
                                requiredIcon + " " + ModalSwitchChecker(item.value)
                            ),
                            "",
                            "email",
                            item.id,
                            "form-control question-input",
                            item.id + "EmailName",
                            "", "",
                            0, 250,
                            item.answer,
                            NewValPlaceholderChecker(item.value),
                            item.isRequired,
                            item.isEnabled,
                            item.RuleMessage,
                            "onblur='openEnableChildEl(this.id)'"
                        );
                    }
                }
            }
            else {
                if (!NullOrEmptyCheck(item.value)) {
                    if (!NullOrEmptyCheck(item.secondaryVal)) {
                        return InputComponentController(
                            LabelController(
                                "",
                                "question-label",
                                requiredIcon + " " + ModalSwitchChecker(item.value)
                            ),
                            ParagraphController(
                                "",
                                "question-info",
                                item.secondaryVal
                            ),
                            "email",
                            item.id,
                            "form-control question-input",
                            item.id + "EmailName",
                            "", "",
                            0, 250,
                            item.answer,
                            NewValPlaceholderChecker(item.value),
                            item.isRequired,
                            item.isEnabled,
                            item.RuleMessage,
                            "onblur='editRulesCheckInput(this.id)'"
                        );
                    }
                    else {
                        return InputComponentController(
                            LabelController(
                                "",
                                "question-label",
                                requiredIcon + " " + ModalSwitchChecker(item.value)
                            ),
                            "",
                            "email",
                            item.id,
                            "form-control question-input",
                            item.id + "EmailName",
                            "", "",
                            0, 250,
                            item.answer,
                            NewValPlaceholderChecker(item.value),
                            item.isRequired,
                            item.isEnabled,
                            item.RuleMessage,
                            "onblur='editRulesCheckInput(this.id)'"
                        );
                    }
                }
            }
            break;
        case "date":
            if (!NullOrEmptyCheck(item.value)) {
                if (!NullOrEmptyCheck(item.secondaryVal)) {
                    return InputComponentController(
                        LabelController(
                            "",
                            "question-label",
                            requiredIcon + " " + ModalSwitchChecker(item.value)
                        ),
                        ParagraphController(
                            "",
                            "question-info",
                            item.secondaryVal
                        ),
                        "date",
                        item.id,
                        "form-control question-input date-cntrl",
                        item.id + "-DateName",
                        "", "",
                        0, 250,
                        item.answer,
                        ReturnPureContextValue(item.value),
                        item.isRequired,
                        item.isEnabled,
                        item.RuleMessage,
                        "onblur='editRulesCheckInput(this.id)'"
                    );
                }
                else {
                    return InputComponentController(
                        LabelController(
                            "",
                            "question-label",
                            requiredIcon + " " + ModalSwitchChecker(item.value)
                        ),
                        "",
                        "date",
                        item.id,
                        "form-control question-input date-cntrl",
                        item.id + "-DateName",
                        "", "",
                        0, 250,
                        item.answer,
                        ReturnPureContextValue(item.value),
                        item.isRequired,
                        item.isEnabled,
                        item.RuleMessage,
                        "onblur='editRulesCheckInput(this.id)'"
                    );
                }
            }
            break;
        case "dropdown":
            if (!NullOrEmptyCheck(item.value)) {
                switch (item.dataType) {
                    case "height":
                        if (!NullOrEmptyCheck(item.secondaryVal)) {
                            return DropDownController(
                                LabelController(
                                    "",
                                    "question-label",
                                    requiredIcon + " " + ModalSwitchChecker(item.value)
                                ),
                                ParagraphController(
                                    "",
                                    "question-info",
                                    ModalSwitchChecker(item.secondaryVal)
                                ),
                                item.id,
                                "question-dropdown-main",
                                "question-dropdown-option",
                                item.isRequired,
                                item.isEnabled,
                                "Height",
                                "",
                                item.answer,
                                item.value,
                                item.RuleMessage,
                                "onchange='rulesCheckHeight(this.id)'"
                            );
                        }
                        else {
                            return DropDownController(
                                LabelController(
                                    "",
                                    "question-label",
                                    requiredIcon + " " + ModalSwitchChecker(item.value)
                                ),
                                "",
                                item.id,
                                "question-dropdown-main",
                                "question-dropdown-option",
                                item.isRequired,
                                item.isEnabled,
                                "Height",
                                "",
                                item.answer,
                                item.value,
                                item.RuleMessage,
                                "onchange='rulesCheckHeight(this.id)'"
                            );
                        }
                    case "state":
                        if (!NullOrEmptyCheck(item.secondaryVal)) {
                            return DropDownController(
                                LabelController(
                                    "",
                                    "question-label",
                                    requiredIcon + " " + ModalSwitchChecker(item.value)
                                ),
                                ParagraphController(
                                    "",
                                    "question-info",
                                    ModalSwitchChecker(item.secondaryVal)
                                ),
                                item.id,
                                "question-dropdown-main",
                                "question-dropdown-option",
                                item.isRequired,
                                item.isEnabled,
                                item.dataType,
                                StateList(),
                                item.answer,
                                item.value,
                                item.RuleMessage,
                                "onchange='rulesCheckDropdown(this.id)'"
                            );
                        }
                        else {
                            return DropDownController(
                                LabelController(
                                    "",
                                    "question-label",
                                    requiredIcon + " " + ModalSwitchChecker(item.value)
                                ),
                                "",
                                item.id,
                                "question-dropdown-main",
                                "question-dropdown-option",
                                item.isRequired,
                                item.isEnabled,
                                item.dataType,
                                StateList(),
                                item.answer,
                                item.value,
                                item.RuleMessage,
                                "onchange='rulesCheckDropdown(this.id)'"
                            );
                        }
                    default:
                        if (!NullOrEmptyCheck(item.secondaryVal)) {
                            return DropDownController(
                                LabelController(
                                    "",
                                    "question-label",
                                    requiredIcon + " " +  ModalSwitchChecker(item.value)
                                ),
                                ParagraphController(
                                    "",
                                    "question-info",
                                    ModalSwitchChecker(item.secondaryVal)
                                ),
                                item.id,
                                "question-dropdown-main",
                                "question-dropdown-option",
                                item.isRequired,
                                item.isEnabled,
                                item.dataType,
                                item.responses,
                                item.answer,
                                item.value,
                                item.RuleMessage,
                                "onchange='rulesCheckDropdown(this.id)'"
                            );
                        }
                        else {
                            return DropDownController(
                                LabelController(
                                    "",
                                    "question-label",
                                    requiredIcon + " " + ModalSwitchChecker(item.value)
                                ),
                                "",
                                item.id,
                                "question-dropdown-main",
                                "question-dropdown-option",
                                item.isRequired,
                                item.isEnabled,
                                item.dataType,
                                item.responses,
                                item.answer,
                                item.value,
                                item.RuleMessage,
                                "onchange='rulesCheckDropdown(this.id)'"
                            );
                        }
                }
            }
            break;
        case "radio":
            if (!NullOrEmptyCheck(item.value)) {
                if (!NullOrEmptyCheck(item.secondaryVal)) {
                    return RadioButtonGroupContainerController(
                        true,
                        item.id,
                        LabelController(
                            item.id + "-label",
                            "question-label",
                            requiredIcon + " " +  ModalSwitchChecker(item.value)
                        ),
                        ParagraphController(
                            "",
                            "question-info",
                            ModalSwitchChecker(item.secondaryVal)
                        ),
                        "question-radio-form",
                        "radio-container",
                        "question-radio-option",
                        item.isRequired,
                        item.isEnabled,
                        item.responses,
                        item.answer,
                        ReturnPureContextValue(item.value),
                        item.RuleMessage,
                        true
                    );
                }
                else {
                    return RadioButtonGroupContainerController(
                        true,
                        item.id,
                        LabelController(
                            item.id + "-label",
                            "question-label",
                            requiredIcon + " " + ModalSwitchChecker(item.value)
                        ),
                        "",
                        "question-radio-form",
                        "radio-container",
                        "question-radio-option",
                        item.isRequired,
                        item.isEnabled,
                        item.responses,
                        item.answer,
                        ReturnPureContextValue(item.value),
                        item.RuleMessage,
                        true
                    );
                }
            }
            break;
        case "checkbox":
            if (item.triggerType.localeCompare("opens_enable") === 0) {
                if (item.answer) {
                    return CheckboxController(
                        true,
                        "",
                        "question-label",
                        item.id,
                        "question-radio-option",
                        requiredIcon + " " + item.value,
                        item.isRequired,
                        item.isEnabled,
                        true,
                        item.RuleMessage,
                        "onchange='openEnableCBChildEl(this.id)'"
                    );
                }
                else {
                    return CheckboxController(
                        true,
                        "",
                        "question-label",
                        item.id,
                        "question-radio-option",
                        requiredIcon + " " + item.value,
                        item.isRequired,
                        item.isEnabled,
                        false,
                        item.RuleMessage,
                        "onchange='openEnableCBChildEl(this.id)'"
                    );
                }
            }
            else { 
                let isChecked = item.answer.localeCompare("Yes") === 0 || item.answer === true ? true : false;
                let paymenetLabelClass = item.value.includes("Payment") ? "question-label-payment" : "question-label";

                return CheckboxController(
                    true,
                    "",
                    paymenetLabelClass,
                    item.id,
                    "question-radio-option",
                    item.value,
                    item.isRequired,
                    item.isEnabled,
                    isChecked,
                    item.RuleMessage,
                    "onchange='editRulesCheckInput(this.id)'"
                );
            }
            break;
        case "pdf":
            return PDFViewerController(
                item.id,
                item.responses[0]
            );
        case "signpad":
            if (!NullOrEmptyCheck(item.value)) {
                var valSplit = item.value.split(" ");

               

                if (!NullOrEmptyCheck(item.id)) {
                    if (valSplit[0].localeCompare("Agent") === 0) {
                        sessionStorage.setItem("spdSignCount", 2);
                        return SignaturePadController(
                            item.id,
                            "sign-pad",
                            baseUrl + "resources/eApp/img/PleaseSignHereBGAgent.png",
                            item.value,
                            'rgb(0, 0, 51)',
                            item.isEnabled,
                            item.isRequired,
                            true,
                            item.RuleMessage,
                            item.answer
                        );
                    }
                    else {
                        sessionStorage.setItem("spdSignCount", 1);

                        return SignaturePadController(
                            item.id,
                            "sign-pad",
                            baseUrl + "resources/eApp/img/PleaseSignHereBGApplicant.png",
                            item.value,
                            'rgb(0,0,0)',
                            false,
                            item.isRequired,
                            false,
                            item.RuleMessage,
                            item.answer
                        );
                    }
                }
            }


            $("#" + id + "_resetBtnID").on('click', function () {
                signaturePad.clear();
            });
            break;
        case "plan_modal":
            if (item.isEnabled) {
                if (!NullOrEmptyCheck(item.id)) {
                    return PlanControlModalController(
                        item.id,
                        LabelController(
                            "",
                            "question-label",
                            requiredIcon + " " + ModalSwitchChecker(item.value)
                        ),
                        "Change Plan?",
                        item.answer,
                        appID,
                        item.isEnabled,
                        item.isRequired,
                        item.RuleMessage
                    );
                }
            }
            else {
                if (!NullOrEmptyCheck(item.id)) {
                    return PlanControlModalController(
                        item.id,
                        LabelController(
                            "",
                            "question-label",
                            requiredIcon + " " +  ModalSwitchChecker(item.value + " " + item.answer)
                        ),
                        "Change Plan?",
                        item.answer,
                        appID,
                        item.isEnabled,
                        item.isRequired,
                        item.RuleMessage
                    );
                }
            }
            break;
        case "plan_obj":
            if (!NullOrEmptyCheck(item.id)) {
                return PlanControlObjectController(
                    item.id,
                    LabelController(
                        "",
                        "question-label",
                        requiredIcon + " " + ModalSwitchChecker(item.value)
                    ),
                    "Change Plan?",
                    item.responses, //TODO: Replace with an actual list of plans
                    item.childElIDsArr, //For this control, make the childElIDsArr the Applicant's Info
                    item.answer,
                    appID
                );
            }
            break;
        case "company":
            if (!NullOrEmptyCheck(item.value)) {
                if (!NullOrEmptyCheck(item.secondaryVal)) {
                    return CompanyInputController(
                        LabelController(
                            item.id + "-label",
                            "question-label",
                            requiredIcon + " " + ModalSwitchChecker(item.value)
                        ),
                        ParagraphController(
                            "",
                            "question-info",
                            ModalSwitchChecker(item.secondaryVal)
                        ),
                        item.id,
                        "form-control question-input",
                        item.id + "Name",
                        item.answer,
                        ReturnPureContextValue(item.value),
                        item.isRequired,
                        item.isEnabled,
                        item.RuleMessage,
                        item.responses
                    );
                }
                return CompanyInputController(
                    LabelController(
                        item.id + "-label",
                        "question-label",
                        requiredIcon + " " + ModalSwitchChecker(item.value)
                    ),
                    "",
                    item.id,
                    "form-control question-input",
                    item.id + "Name",
                    item.answer,
                    ReturnPureContextValue(item.value),
                    item.isRequired,
                    item.isEnabled,
                    item.RuleMessage,
                    item.responses
                );
            }
            break;
        case "prescription":
            if (item.responses.length > 0) {

                var idCheck = siteItemStorage.prescriptionStore.prescriptionsList.find(d => d.id.toLowerCase() === item.id.toLowerCase());

                if (!NullOrEmptyCheck(idCheck)) {
                    idCheck["perscribedDrugs"] = item.childElIDsArr;
                }
                else {

                    var newObj = {
                        "id": item.id,
                        "perscribedDrugs": item.childElIDsArr
                    };

                    siteItemStorage.prescriptionStore.prescriptionsList.push(newObj);
                }

                console.log(siteItemStorage.prescriptionStore.prescriptionsList);

                if (!NullOrEmptyCheck(item.value)) {
                    if (!NullOrEmptyCheck(item.secondaryVal)) {
                        return PerscriptionController(
                            item.id,
                            item.value,
                            item.secondaryVal,
                            item.responses,
                            item.answer,
                            item.childElIDsArr,
                            item.isEnabled,
                            item.RuleMessage,
                            item.isRequired
                        );
                    }
                    else {
                        return PerscriptionController(
                            item.id,
                            item.value,
                            "",
                            item.responses,
                            item.answer,
                            item.childElIDsArr,
                            item.isEnabled,
                            item.RuleMessage,
                            item.isRequired
                        );
                    }
                }
            }
            else {
                console.log("Prescription control error! No options!");
                return;
            }
            break;
        case "textbox":
            if (!NullOrEmptyCheck(item.value)) {
                if (!NullOrEmptyCheck(item.secondaryVal)) {
                    return TextBoxController(
                        LabelController(
                            item.id + "-label",
                            "question-label",
                            requiredIcon + " " +  ModalSwitchChecker(item.value)
                        ),
                        ParagraphController(
                            "",
                            "question-info",
                            ModalSwitchChecker(item.secondaryVal)
                        ),
                        item.id,
                        "form-control question-input",
                        item.id + "Name",
                        item.answer,
                        "",
                        5,
                        256,
                        item.isEnabled,
                        item.RuleMessage,
                        item.isRequired
                    );
                }
                else {
                    return TextBoxController(
                        LabelController(
                            item.id + "-label",
                            "question-label",
                            requiredIcon + " " + ModalSwitchChecker(item.value)
                        ),
                        "",
                        item.id,
                        "form-control question-input",
                        item.id + "Name",
                        item.answer,
                        "",
                        5,
                        256,
                        item.isEnabled,
                        item.RuleMessage,
                        item.isRequired
                    );
                }
            }
            break;
        case "sub_sig":
            let suffix;

            if (typeof item.pageSuffix !== 'undefined') {
                suffix = item.pageSuffix;
            }
            else {
                suffix = item.id.substring(0, 3);
            }

            return SubmitSignatureController(
                item.id,
                suffix,
                item.value,
                true
            );
            break;
        case "fraudmodal":
            return FraudModalController(
                item.id,
                item.value,
                item.secondaryVal
            )
            break;
        case "table":
            switch (item.dataType) {
                case "doc_pre":
                    revDocStorer.countList = [];
                    var childElementIDs = [];


                    for (var cids = 0; cids < item.childElIDsArr.length; cids++) {
                        var ch = data.dataList.find(c => c.id === item.childElIDsArr[cids]);

                        childElementIDs.push(ch.id.replace(/\s/g, ""));
                    }

                    var docObj = {
                        parID: item.id,
                        childIds: childElementIDs,
                        currEl: 0
                    };

                    sessionStorage.setItem("SPDChildIDs", JSON.stringify(docObj));

                    return DocumentReviewController(
                        item.id,
                        item.value,
                        item.responses,
                        "pre",
                        false
                    );
                case "doc_sum":
                    return DocumentReviewController(
                        item.id,
                        item.value,
                        item.responses,
                        "sum",
                        false
                    );
                case "doc_wet":
                    revDocStorer.countList = [];
                    return DocumentReviewController(
                        item.id,
                        item.value,
                        item.responses,
                        "wet",
                        false
                    );
                case "doc_sign":
                    revDocStorer.countList = [];
                    return DocumentReviewController(
                        item.id,
                        item.value,
                        item.responses,
                        "sign",
                        false
                    );
                case "phi":
                    if (!NullOrEmptyCheck(item.answer)) {
                        return PHITableController(
                            item.value,
                            item.answer
                        );
                    }
            }
            break;
        case "phi":
            if (!NullOrEmptyCheck(item.value)) {
                if (!NullOrEmptyCheck(item.secondaryVal)) {
                    return PHIController(
                        item.id,
                        LabelController(
                            item.id + "-label",
                            "question-label",
                            requiredIcon + " " + ModalSwitchChecker(item.value)
                        ),
                        ParagraphController(
                            "",
                            "question-info",
                            ModalSwitchChecker(item.secondaryVal)
                        ),
                        item.responses,
                        item.answer
                    )
                }
                else {
                    return PHIController(
                        item.id,
                        LabelController(
                            item.id + "-label",
                            "question-label",
                            ModalSwitchChecker(item.value)
                        ),
                        "",
                        item.responses,
                        item.answer
                    )
                }
            }
            break;
        case "phi-table":
            if (!NullOrEmptyCheck(item.answer)) {
                return PHITableController(
                    item.value,
                    item.answer
                )
            }
            break;
    }
};

function CreateElement(rawElArray) {
    let finishedEl = "";

    for (let i = 0; i < rawElArray.length; i++) {
        finishedEl += rawElArray[i];
    }

    return finishedEl;
};

function ModalSwitchChecker(value) {
    //First take in the value, then check if there is a '+' in it (this will always proceed the ModalSwitch function), and find the index of where it's located
    let plusIndex = value.indexOf('+');

    if (plusIndex !== -1) {
        //If there is a plus sign, use the above to create a substring of just the function (removing the '+' and spaces)
        let fn = value.substring(plusIndex, value.length).replace(/[+ \s]/g, "");
        //Output for debugging purposes
        //console.log(value + " " + plusIndex + " " + fn);

        //If there is a function in the fn var
        if (!NullOrEmptyCheck(fn)) {
            let newVal = String(value.substring(0, plusIndex).replace(/["]/g, ""));
            //console.log(newVal);

            //Get the parameter in the function call
            let paramStart = fn.indexOf('(');
            let newParam = String(fn.substring(paramStart + 1, fn.length - 1).replace(/[' " \\]/g, ""));
            //console.log(newParam);
            //Then return a Modal call to the Modal Switch
            let modal = CreateElement(ModalSwitch(String(newParam)));

            return newVal.toString() + " " + modal;
        }
    }
    else {
        return value;
    }
};

function ModalSwitch(type) {

    if (type === "") {
        console.log("ERROR! The Modal needs a type! Please include one!");
    }
    else {
        //if a type is givem, create the modal
        switch (type) {
            case "medA":
                var medANote = [
                    ImageComponentController(
                        baseUrl + "resources/eApp/img/MMC_PtA.png",
                        "Medicare Card: Part A Date"
                    )
                ];

                var medAOut = CreateElement(medANote);

                return ModalComponentController(
                    "medAInfoModal",
                    "modal-link-text",
                    "Where can I find this?",
                    "Medicare Part A Coverage Date Location",
                    medAOut,
                    true,
                    false,
                    "CloseModal(this.id)"
                );
                break;
            case "medB":
                var medBNote = [
                    ImageComponentController(
                        baseUrl + "resources/eApp/img/MMC_PtB.png",
                        "Medicare Card: Part B Date"
                    )
                ];

                var medBOut = CreateElement(medBNote);

                return ModalComponentController(
                    "medBInfoModal",
                    "modal-link-text",
                    "Where can I find this?",
                    "Medicare Part B Coverage Date Location",
                    medBOut,
                    true,
                    false,
                    "CloseModal(this.id)"
                );
            case "mCla":
                var medClaimNote = [
                    ImageComponentController(
                        baseUrl + "resources/eApp/img/MMC_MedNum.png",
                        "Medicare Card: Claim Number"
                    )
                ];

                var medClaimOut = CreateElement(medClaimNote);

                return ModalComponentController(
                    "medClaimInfoModal",
                    "modal-link-text",
                    "Where can I find this?",
                    "Medicare Claim Number Location",
                    medClaimOut,
                    true,
                    false,
                    "CloseModal(this.id)"
                );
                break;
            case "ssn":
                var ssnNote = [
                    ParagraphController(
                        "",
                        "question-info",
                        "This website is protected under the highest level of security available using DigiCert EV SSL. This is the most trusted and secure choice for Web site security. Not only is your information secure in transit, our company has completed a thorough documentation process, and our licensing and incorporation has been verified. In addition, your information is protected in our environment under the Federal laws of HIPAA, GLB, and HITECH."
                    ),
                    ParagraphController(
                        "",
                        "question-info",
                        "<a href='https://seal.digicert.com/seals/popup/?tag=P0CYERoT&url=test-ext.iasadmin.com&lang=en_US&cbr=1548347705705' target='_blank'><img border='0' alt='DigiCert Seal' src='" + baseUrl + "resources/eApp/img/digicert_logo.png' width='100' height='75'></a>"
                    )
                ];

                var ssnOut = CreateElement(ssnNote);

                return ModalComponentController(
                    "ssnInfoModal",
                    "modal-link-text",
                    "Is my information Secure?",
                    "Is my information Secure?",
                    ssnOut,
                    true,
                    false,
                    "CloseModal(this.id)"
                );
                break;
            case "chck":
                var checkNote = [
                    ImageComponentController(
                        baseUrl + "resources/eApp/img/accountno.gif",
                        "Check Information"
                    )
                ];

                var checkOut = CreateElement(checkNote);

                return ModalComponentController(
                    "checkModal",
                    "modal-link-text",
                    "Where can I find this?",
                    "Check Information Location",
                    checkOut,
                    true,
                    true,
                    "CloseModal(this.id)"
                );
                break;
            case "BnkD":
                var bnkDNote = [
                    HeaderController(
                        5,
                        "Issue Date",
                        "",
                        ""
                    ),
                    ListComponentController(
                        "",
                        ParagraphController(
                            "",
                            "question-info",
                            "We will draft your inital premium on the date you are approved."
                        ),
                        ["If your application is approved on a weekend, or holiday, the draft will occur on the following business day."],
                        false,
                        "circle",
                        "", ""
                    ),
                    ParagraphController(
                        "",
                        "question-info",
                        "*For Example: If you select draft on issue date and you are approved today, we will draft your premium today. If today is Saturday, then we will draft on the following Monday."
                    ),
                    HeaderController(
                        5,
                        "Effective Date",
                        "",
                        ""
                    ),
                    ListComponentController(
                        "",
                        ParagraphController(
                            "",
                            "question-info",
                            "We will draft your inital premium on the draft day selected in the month your policy becomes effective."
                        ),
                        ["If your draft day is on a weekend, or holiday, the draft will occur on the following business day."],
                        false,
                        "circle",
                        "", ""
                    ),
                    ParagraphController(
                        "",
                        "question-info",
                        "*For Example: If you select draft on effective date and you are approved with an effective date of the 5th of the month, and selected on the 8th of the month as a day. We will draft your premium on t he 8th. If the 8th is on a Saturday, then we will draft on Monday the 10th."
                    ),
                ];

                var bnkDOut = CreateElement(bnkDNote);

                return ModalComponentController(
                    "bankDraftModal",
                    "modal-link-text",
                    "What does this mean?",
                    "Bank Draft Timing Definitions",
                    bnkDOut,
                    true,
                    true,
                    "CloseModal(this.id)"
                );

                break;
        }
    }
};

function PrescriptionFreqList() {
    return [
        "Select a Frequency...",
        "1 time a day (1 x day)",
        "2 times a day (2 x day)",
        "3 times a day (3 x day) every 8 hours",
        "4 times a day (4 x day) every 6 hours",
        "5 times a day (5 x day)",
        "6 times a day (6 x day) every 4 hours",
        "1 time a week",
        "1 time every two weeks",
        "1 time a month",
        "As Needed"
    ];
}

function StateList() {
    var stateList = [
        "Please Choose a Selection",
        "AK",
        "AL",
        "AR",
        "AZ",
        "CA",
        "CO",
        "CT",
        "DC",
        "DE",
        "FL",
        "GA",
        "HI",
        "IA",
        "ID",
        "IL",
        "IN",
        "KS",
        "KY",
        "LA",
        "MA",
        "MD",
        "ME",
        "MI",
        "MN",
        "MO",
        "MS",
        "MT",
        "NC",
        "ND",
        "NE",
        "NH",
        "NJ",
        "NM",
        "NV",
        "NY",
        "OH",
        "OK",
        "OR",
        "PA",
        "RI",
        "SC",
        "SD",
        "TN",
        "TX",
        "UT",
        "VA",
        "VT",
        "WA",
        "WI",
        "WV",
        "WY"
    ];

    return stateList;
};

function YesNo() {
    var selections = [
        "Please Choose a Selection",
        "Yes",
        "No"
    ];

    return selections;
};

function Sex() {
    var selections = [
        "Please Choose a Selection",
        "Male",
        "Female"
    ];

    return selections;
};

function ReturnPureContextValue(value) {
    if (!NullOrEmptyCheck(value)) {
        //This function will take in any value, and remove function calls so that we have the base question:
        //Eg: "Medicare Claim Number (do not include dashes):" + ModalSwitch("medClaim")  should remove "+ ModalSwitch("medClaim"), only leaving the base question
        let plusIndex = value.indexOf('+');

        if (plusIndex !== -1) {
            return value.split('+')[0];
        }
        else {
            //If there are no function calls, just return the question
            return value;
        }
    }
    else {
        return value;
    }
};

function NewValPlaceholderChecker(value) {
    //First take in the value, then check if there is a '+' in it (this will always proceed the ModalSwitch function), and find the index of where it's located
    var plusIndex = value.indexOf('+');

    if (plusIndex !== -1) {
        //If there is a plus sign, use the above to create a substring of just the function (removing the '+' and spaces)
        var fn = value.substring(plusIndex, value.length).replace(/[+ \s]/g, "");

        if (!NullOrEmptyCheck(fn)) {
            var newVal = String(value.substring(0, plusIndex).replace(/["]/g, ""));

            return String(SanitizePlaceholder(newVal));
        }
    }
    else {
        return SanitizePlaceholder(value);
    }
};

function NewAppAJAXCall(urlIn, ajaxType, appObj) {
    StartLoadingMeter("Please Wait...");

    if (ajaxType === "GET") {
        $.ajax({
            contentType: "application/json; charset=utf-8",
            url: urlIn,
            type: ajaxType,
            data: appObj,
            success: function (result) {
                $("#newAppContentContainer").empty();
                $("#newAppContentContainer").append(result);

                CloseLoadingMeter();
            },
            error: function (error) {
                console.log(error);

                ErrorMessage("Error Returning Information!");
            }
        });
    }
    else {
        console.log(appObj);
        $.ajax({
            contentType: "application/json; charset=utf-8",
            url: urlIn,
            type: ajaxType,
            data: JSON.stringify(appObj),
            success: function (result) {
                //if (NullOrEmptyCheck(appObj.FirstName)) {
                //    $("#newAppContentContainer").empty();
                //    $("#newAppContentContainer").append(result);
                //}
                //else {
                    window.location.href = baseUrl + 'Application/Edit?id=' + result.id + "&isEditable=true";
                //}

                CloseLoadingMeter();
            },
            error: function (error) {
                console.log(error);

                ErrorMessage("Error Saving Information!");
            }
        });
    }
}

function NewAppSwitcher(currPage, type = "GET") {
    var obj = siteItemStorage.planAppSelection;
    obj["currentPage"] = currPage;
    obj["isEditable"] = true; 
    switch (currPage) {
        case "PlanSelection":
            //GetAgentInformation(type, obj)
            NewAppAJAXCall(baseUrl + "Application/NewAppPlanSelection", type, obj);
            break;
        case "ApplicantInfo":
            NewAppAJAXCall(baseUrl + "Application/ApplicantInfo", type, obj);
            break;
        case "QuoteParams":
            NewAppAJAXCall(baseUrl + "Application/NewAppQuoteParams", type, obj);
            break;
        case "CreateApp":
            NewAppAJAXCall(baseUrl + "Application/NewApplication", type, obj);
            break;
        //TODO: Needs to have this implemented to go to the new Print Quotes partial page
        case "PrintQuote":
            //putting this here just to have it for when we implement this proper
            var printObj = siteItemStorage.printableQuoteInfo;
            //passing an empty object for right now
            NewAppAJAXCall(baseUrl + "Application/PrintQuote", type, printObj);
            break;
    }
}

function PostData(urlAction, containerData) {
    $(document).ready(function () {
        function SendPostData(url, containerData) {
            $("#edit-sideNav").block({
                message: "",
                overlayCSS: { opacity: 0 }
            });

            if (
                !NullOrEmptyCheck(containerData.controlType) &&
                containerData.controlType.localeCompare("email") === 0)
            {
                var emailConnObj = JSON.parse(sessionStorage.getItem("emailConnObj"));

                var emailVal = $("#" + emailConnObj.emailID).val();
                
                //Empty email + selected ddl > 0
                if (NullOrEmptyCheck(emailVal)) {
                    var ddlSelIdx = $("#" + emailConnObj.ddlID + "-select").prop('selectedIndex');
                    //If yes, errors
                    if (ddlSelIdx > 0) {
                        var ddlVal = $("#" + emailConnObj.ddlID + "-select option:selected").text();
                        $("#" + emailConnObj.ddlID + "-alertDiv").empty();
                        $("#" + emailConnObj.emailID + "-alertDiv").empty();

                        $("#" + emailConnObj.ddlID + "-alertDiv").append(AlertController("danger", ddlVal + " not valid without email"));
                        $("#" + emailConnObj.emailID + "-alertDiv").append(AlertController("danger", ddlVal + " not valid without email"));
                    }
                    //If no, remove
                    else if (ddlSelIdx === 0){
                        $("#" + emailConnObj.ddlID + "-alertDiv").empty();
                        $("#" + emailConnObj.emailID + "-alertDiv").empty();
                    }
                }
                else {
                    $("#" + emailConnObj.ddlID + "-alertDiv").empty();
                    $("#" + emailConnObj.emailID + "-alertDiv").empty();
                }
            }

            if (
                !NullOrEmptyCheck(containerData.variableName) &&
                containerData.variableName.localeCompare("delivery_recipient") === 0
            ) {
                var emailConnObj = JSON.parse(sessionStorage.getItem("emailConnObj"));

                var emailVal = $("#" + emailConnObj.emailID).val();

                //Empty email + selected ddl > 0
                if (NullOrEmptyCheck(emailVal)) {
                    var ddlSelIdx = $("#" + emailConnObj.ddlID + "-select").prop('selectedIndex');
                    //If yes, errors
                    if (ddlSelIdx > 0) {
                        var ddlVal = $("#" + emailConnObj.ddlID + "-select option:selected").text();
                        $("#" + emailConnObj.ddlID + "-alertDiv").empty();
                        $("#" + emailConnObj.emailID + "-alertDiv").empty();

                        $("#" + emailConnObj.ddlID + "-alertDiv").append(AlertController("danger", ddlVal + " not valid without email"));
                        $("#" + emailConnObj.emailID + "-alertDiv").append(AlertController("danger", ddlVal + " not valid without email"));
                    }
                    //If no, remove
                    else if (ddlSelIdx === 0) {
                        $("#" + emailConnObj.ddlID + "-alertDiv").empty();
                        $("#" + emailConnObj.emailID + "-alertDiv").empty();
                    }
                }
                else {
                    $("#" + emailConnObj.ddlID + "-alertDiv").empty();
                    $("#" + emailConnObj.emailID + "-alertDiv").empty();
                }
            }

            return $.ajax({
                contentType: "application/json; charset=utf-8",
                url: baseUrl + url,
                type: "POST",
                data: JSON.stringify(containerData)
            });
        };

        SendPostData(urlAction, containerData).then(
            function (result) {
                console.log(result);

                var showRules = sessionStorage.getItem("showRulesAlerts").localeCompare("true") === 0 ? true : false;

                //TODO: Wait until Elias is passing back something in the response. Split it, and use an Alert Control to output on screen 
                if (showRules) {
                    //ex: results = "[id]|dange|mSG... this is just a test of the idea of what I would need to output a rules message
                    //Remvode thus aster u pet tis n teh dz
                    //var result = "PER017|warning|Test Rules warning message!";
                    var rulesSplit = result.value.split("|");

                    if (rulesSplit.length > 1) {
                        $("#" + rulesSplit[0] + "-alertDiv").empty();
                        $("#" + rulesSplit[0] + "-alertDiv").append(AlertController(rulesSplit[1], rulesSplit[2]));
                    }

                }

                if (
                    containerData.sector.localeCompare("ESN") === 0 ||
                    containerData.sector.localeCompare("SPD") === 0 ||
                    containerData.sector.localeCompare("VSN") === 0 ||
                    containerData.sector.localeCompare("PRT") === 0
                )
                {
                    //Clear overlays, as for Signing pages, we don't need to update TopNav/SideNav
                    clearOverlays();
                }
                else {
                    UpdateTopNav(
                        sessionStorage.getItem("currentState"),
                        sessionStorage.getItem('currPage'),
                        sessionStorage.getItem('contID'),
                        sessionStorage.getItem("currIsEdit"),
                        sessionStorage.getItem("currIsTrain"),
                    );
                }

            },
            function (response) {
                console.log(response);

                ErrorMessage("Error Saving Input!");

                $.unblockUI({ message: null });
            }
        );
    });
};

function AddToControlList(obj) {
    siteItemStorage.prescriptionStore.prescriptionControlList.push(obj);

    console.log(siteItemStorage.prescriptionStore.prescriptionControlList);
}

function AssignDosageLists(id, drugName, idx, dIndx) {
    $.ajax({
        contentType: "application/json; charset=utf-8",
        url: baseUrl + "Application/GetDrugsAndDosages",
        type: "GET",
        data: {
            drugname: drugName
        }
    }).done(function (result) {
        console.log(result.dosages);

        var currObj = siteItemStorage.prescriptionStore.prescriptionsList[idx].currPreDrugsList[dIndx];
        var dosageList = result.dosages;

        var newObj = {
            "parentID": id,
            "drug": currObj.drug,
            "date": currObj.date,
            "dosage": currObj.dosage,
            "frequency": currObj.frequency,
            "diagonsis": currObj.diagnosis,
            "dosageList": dosageList
        };

        console.log(newObj);

        AddToControlList(newObj);

    }).fail(function (response) {
        console.log(response);
    });
}

function IncrmentPage(currPage) {
    //SetCurrentButton(currPage + 1);
    CallAJAX(currPage);
};

function DecrementPage(currPage) {
    //SetCurrentButton(currPage - 1);
    CallAJAX(currPage);
};

function SetPageTitle(pagePre) {
    $(document).ready(function () {
        switch (pagePre) {
            case "PER":
                return ButtonBackgroundSwitcher(pagePre, "Personal Information");
            case "COV":
                return ButtonBackgroundSwitcher(pagePre, "Coverage");
            case "ISS":
                return ButtonBackgroundSwitcher(pagePre, "Guarantee Issue");
            case "PRM":
                return ButtonBackgroundSwitcher(pagePre, "Premium Discount");
            case "HAM":
                return ButtonBackgroundSwitcher(pagePre, "Health and Medical");
            case "CHK":
                return ButtonBackgroundSwitcher(pagePre, "Checklists");
            case "REP":
                return ButtonBackgroundSwitcher(pagePre, "Replacement");
            case "AGE":
                return ButtonBackgroundSwitcher(pagePre, "Agent Certification");
            case "PRD":
                return ButtonBackgroundSwitcher(pagePre, "Producers Statement");
            case "PAY":
                return ButtonBackgroundSwitcher(pagePre, "Payment");
            case "ATH":
                return ButtonBackgroundSwitcher(pagePre, "Authorizations");
            case "ASN":
                return ButtonBackgroundSwitcher(pagePre, "Assignees");
            case "SIG":
                return ButtonBackgroundSwitcher(pagePre, "Signing Options"); //Auto select Signature Pad if the user selects the Parent Signature Accordion object
            case "ESN":                                
                return ButtonBackgroundSwitcher(pagePre, "Signing Options - Electronic Signature");
            case "SPD":                                
                return ButtonBackgroundSwitcher(pagePre, "Signing Options - Signature Pad");
            case "VSN":                                
                return ButtonBackgroundSwitcher(pagePre, "Signing Options - Voice Signature");
            case "PRT":                                
                return ButtonBackgroundSwitcher(pagePre, "Signing Options - Print Documents");
            case "DOC":                                
                return ButtonBackgroundSwitcher(pagePre, "Documents References");
            case "HHD":
                return ButtonBackgroundSwitcher(pagePre, "Household Discount");
            case "SUM":
                return ButtonBackgroundSwitcher(pagePre, "Summary");
        };
    });
}

function maxLengthCheck(o) {
    if (o.value.length > o.max.length) {
        o.value = o.value.slice(0, o.max.length)
    }
}

function isInputNumeric(e) {
    var theEvent = e || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

function StartLoadingMeter(text) {
    $(document).ready(function () {
        var overlay = $('#overlay');
        var loadingContainer = $('#loading-meter-container');
        var loadingMeter = $('#loading-spinner');

        var sig = $('#sig-accepted-container');
        sig.hide();

        var h3 = $('#loading-meter-container h3');
        h3.css("color", "black");
        h3.text(text);

        overlay.show();
        loadingContainer.show();
        loadingMeter.show();
    });
}

function SigningDocumentsMeter(text) {
    $(document).ready(function () {
        var overlay = $('#overlay');
        var loadingContainer = $('#signing-meter-container');
        var loadingMeter = $('#signing-meter');

        var sig = $('#sig-accepted-container');
        sig.hide();

        var h3 = $('#signing-meter-container h3');
        h3.css("color", "black");
        h3.text(text);

        overlay.show();
        loadingContainer.show();
        loadingMeter.show();
    });
}

function CloseLoadingMeter() {
    $(document).ready(function () {
        var overlay = $('#overlay');
        var loadingContainer = $('#loading-meter-container');
        var loadingMeter = $('#loading-spinner');

        loadingContainer.hide();
        loadingMeter.hide();
        overlay.hide();

    });
}

function SignaturAccepted(text) {
    $(document).ready(function () {
        var overlay = $('#overlay');
        var loadingContainer = $('#loading-meter-container');
        var sigContainer = $("#sig-accepted-container"); 

        $("#accepted-text").empty();
        $("#accepted-text").text(text);

        loadingContainer.hide();
        sigContainer.show();

        setTimeout(function () {
            sigContainer.hide();
            overlay.hide();
        }, 3000);
    });
}

function ErrorMessage(errMsg) {
    $(document).ready(function () {
        var overlay = $('#overlay');
        var loadingContainer = $('#loading-meter-container');
        var loadingMeter = $('#loading-spinner');
        var error = $('#error-div');
        loadingMeter.hide();

        var h3 = $('#loading-meter-container h3');
        h3.css("color", "red");
        h3.text(errMsg);

        overlay.show();
        error.empty();
        error.append("<i class='fa fa-exclamation-triangle text-danger' aria-hidden='true' style='font-size:5em; margin:.25em;'></i>");
        error.show();

        setTimeout(function () {
            loadingContainer.hide();
            error.hide();
            error.empty();
            overlay.hide();
            clearOverlays();
        }, 3000);
    });
}

//$(document).ajaxStart(function () {
//    var overlay = $('#overlay');

//    var loadingContainer = $('#loading-meter-container');
//    var loadingMeter = $('#loading-spinner');

//    var h3 = $('#loading-meter-container h3');
//    h3.css("color", "black");
//    h3.text("Loading...");

//    overlay.show();
//    loadingContainer.show();
//    loadingMeter.show();

//}).ajaxSuccess(function () {
//    var overlay = $('#overlay');
//    var loadingContainer = $('#loading-meter-container');
//    var loadingMeter = $('#loading-spinner');

//    loadingContainer.hide();
//    loadingMeter.hide();
//    overlay.hide();

//}).ajaxError(function (error) {
//    var overlay = $('#overlay');
//    var loadingContainer = $('#loading-meter-container');
//    var loadingMeter = $('#loading-spinner');
//    var error = $('#error-div');
//    loadingMeter.hide();

//    var h3 = $('#loading-meter-container h3');
//    h3.css("color", "red");
//    h3.text("Error!");

//    overlay.show();
//    error.empty();
//    error.append("<i class='fa fa-exclamation-triangle text-danger' aria-hidden='true' style='font-size:5em; margin:.25em;'></i>");
//    error.show();

//    setTimeout(function () {
//        loadingContainer.hide();
//        error.hide();
//        error.empty();
//        overlay.hide();
//    }, 3000);
//});

function applyPlan(planNum) {

    $(document).ready(function () {
        var selNum = parseInt(planNum);
        var quotesArr = siteItemStorage.quotesTempStore.listStorage.find(item => item.id === "quotesArray");

        var selQuote = quotesArr.array[selNum];

        var selPlanOut = {
            "Plan": selQuote.plan,
            "PlanType": selQuote.planType,
            "PlanCode": selQuote.planCode,
            "AnnualGrossPremium": selQuote.annualGrossPremium,
            "DiscountCode": selQuote.discountCode,
            "AnnualPremium": selQuote.planPrems[0],
            "SemiAnnualPremium": selQuote.planPrems[1],
            "QuarterlyPremium": selQuote.planPrems[2],
            "MonthlyPremium": selQuote.planPrems[3],
            "PolicyFee": selQuote.policyFee,
            "UnderwritingCode": selQuote.underwritingCode,
            "SequenceNumber": selQuote.SequenceNumber
        };
        siteItemStorage.planAppSelection["SelectedPlan"] = selPlanOut;
        ////console.log(siteItemStorage.planAppSelection);

        //if (NullOrEmptyCheck(siteItemStorage.planAppSelection["FirstName"])) {
        //    NewAppSwitcher("ApplicantInfo", "GET", siteItemStorage.planAppSelection);
        //}
        //else {
            console.log("Going to Edit!");
            siteItemStorage.planAppSelection["ID"] = siteItemStorage.quotesTempStore.onlineQuote.Id;
            siteItemStorage.planAppSelection["onlineQuote"] = JSON.stringify(siteItemStorage.quotesTempStore.onlineQuote);

            NewAppSwitcher("CreateApp", "POST", siteItemStorage.planAppSelection).promise().done(function (result) {
                console.log(result);

                CallAJAXList(result.id);
            }).fail(function (response) {
                console.log(response);
            });
        //}
    });
}

function InitalizePlanSelectionPage(quote, zip) {
    $(document).ready(function () {
        var jsonObj = JSON.parse(quote);
        console.log(jsonObj);

        if (NullOrEmptyCheck(jsonObj.QuoteResponseEx.Message)) {
            siteItemStorage.quotesTempStore.onlineQuote = jsonObj;

            var params = jsonObj.Parameters;
            var benefits = jsonObj.QuoteResponseEx.Benefits;
            var quotes = jsonObj.QuoteResponseEx.Quotes;

            sessionStorage.setItem("appID", jsonObj.Id);
            sessionStorage.setItem("currentState", params.State);

            var quotesArr = [];
            var plansTHs = [];

            var applicantInfo = {
                "state": params.State,
                "zip": zip,
                "gender": params.Gender,
                "age": params.Age,
                "tobacco": params.Tobacco
            };

            for (var pth = 0; pth < benefits.length; pth++) {
                var newTH = { "name": benefits[pth].Name, "description": benefits[pth].Description };

                plansTHs.push(newTH);
            }

            for (var q = 0; q < quotes.length; q++) {
                var planInclusions = [];

                var currPlan = quotes[q].Plan;
                var isIncl = false;

                for (var ben = 0; ben < benefits.length; ben++) {
                    for (var n = 0; n < benefits[ben].PlanNames.length; n++) {
                        var currName = benefits[ben].PlanNames[n].Name;

                        if (currName === currPlan) {
                            isIncl = true;
                        }
                    }
                    planInclusions.push(isIncl);
                    isIncl = false;
                }

                var newQuote = {
                    "planDisplay": quotes[q].PlanDisplay,
                    "plan": quotes[q].Plan,
                    "planType": quotes[q].PlanType,
                    "planCode": quotes[q].PlanCode,
                    "annualGrossPremium": quotes[q].AnnualGrossPremium,
                    "discountCode": quotes[q].DiscountCode,
                    "policyFee": quotes[q].PolicyFee,
                    "underwritingCode": quotes[q].UnderwritingCode,
                    "SequenceNumber": quotes[q].SequenceNumber,
                    "planPrems": [
                        quotes[q].AnnualPremium,
                        quotes[q].SemiAnnualPremium,
                        quotes[q].QuarterlyPremium,
                        quotes[q].MonthlyPremium
                    ],
                    "inclusionVals": planInclusions,
                    "rateIncreaseAnnualPremium": quotes[q].RateIncreaseAnnualPremium,
                    "rateIncreaseCutOffDate": quotes[q].RateIncreaseCutOffDate,
                    "rateIncreaseMonthlyPremium": quotes[q].RateIncreaseMonthlyPremium,
                    "rateIncreaseQuarterlyPremium": quotes[q].RateIncreaseQuarterlyPremium,
                    "rateIncreaseSemiAnnualPremium": quotes[q].RateIncreaseSemiAnnualPremium,
                    "rateIncreaseSequenceNumber": quotes[q].RateIncreaseSequenceNumber
                };

                quotesArr.push(newQuote);
            };

            siteItemStorage.quotesTempStore.listStorage.push({ quotesArray: quotesArr });
            console.log(siteItemStorage.quotesTempStore);

            var fullJsonObj = {
                applicantInfo,
                plansTHs,
                quotesArr
            };

            console.log(fullJsonObj);

            $('#page-body').append(
                PlanControlObjectController(
                    "plan-sel",
                    "",
                    fullJsonObj
                )
            );
        }
        else {
            $('#print-btn-div').addClass('hide-div');
            $('#page-body').append(QuoteResponseMessageController(jsonObj.QuoteResponseEx.Message));
        }
    });
};

function formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [month, day, year].join('/');
}

function GetPrintQuote() {

    var tempAppStore = siteItemStorage.tempPDFStorage;
    var newAppObj = siteItemStorage.planAppSelection;
    var quotesObj = siteItemStorage.quotesTempStore.listStorage;
    var applicantInfoObj = siteItemStorage.quotesTempStore.onlineQuote.Parameters;

    console.log(newAppObj.AgentInfo["AgentName"]);

    var currYear = new Date().getFullYear();

    var agedate = newAppObj["DateOfBirth"].split("/");
    var ageYear = parseInt(agedate[2]);
    var roughBDay = (currYear - ageYear);

    siteItemStorage.printableQuoteInfo.page1Info = {};
    siteItemStorage.printableQuoteInfo.page2Info = {};
    siteItemStorage.printableQuoteInfo.checkboxes = {};

    siteItemStorage.printableQuoteInfo.page1Info =
    {
        Page1_InsuredName: tempAppStore.AppFirstName + " " + tempAppStore.AppLastName,

        Page1_AgentName_1: newAppObj.AgentInfo[0].value,

        Page1_AgentName_2: newAppObj.AgentInfo[0].value,

        Page1_AgentFullAddress: newAppObj.AgentInfo[1].value + ", " + newAppObj.AgentInfo[2].value + ", " + newAppObj.AgentInfo[3].value + ", " + newAppObj.AgentInfo[4].value + ", " + newAppObj.AgentInfo[5].value,

        Page1_AgentEmail: newAppObj.AgentInfo[6].value ,

        Page1_State: newAppObj.AgentInfo[4].value,

        Page1_Date: formatDate()
    };

    siteItemStorage.printableQuoteInfo.page2Info = [];
    siteItemStorage.printableQuoteInfo.checkboxes = [];

    siteItemStorage.printableQuoteInfo.page2Info.push({ Page2_CompanyName: tempAppStore.WritingAgent.agentCompany });
    siteItemStorage.printableQuoteInfo.page2Info.push({ Page2_InsuredName: tempAppStore.AppFirstName + " " + tempAppStore.AppLastName });
    siteItemStorage.printableQuoteInfo.page2Info.push({ Page2_EffectiveDate: applicantInfoObj.EffectiveDate });
    siteItemStorage.printableQuoteInfo.page2Info.push({ Page2_Sex_and_Age: newAppObj.Gender + " - " + roughBDay });
    siteItemStorage.printableQuoteInfo.page2Info.push({ Page2_QuoteDate: formatDate() });
    siteItemStorage.printableQuoteInfo.page2Info.push({ Page2_Tobacco: !NullOrEmptyCheck(newAppObj.TobaccoUse) ? newAppObj.TobaccoUse : "No" });
    siteItemStorage.printableQuoteInfo.page2Info.push({ Page2_State_1: applicantInfoObj.State });
    siteItemStorage.printableQuoteInfo.page2Info.push({ Page2_DiscountApplied: !NullOrEmptyCheck(newAppObj.HouseHoldDiscount) ? newAppObj.HouseHoldDiscount : "No" });
    siteItemStorage.printableQuoteInfo.page2Info.push({ Page2_ZipCode: newAppObj.ZipCode });

    for (var p = 0; p < quotesObj[0].quotesArray.length; p++) {
        siteItemStorage.printableQuoteInfo.page2Info.push({ ["Page2_Plan" + (p + 1)]: quotesObj[0].quotesArray[p].plan });
    }

    for (var m = 0; m < quotesObj[0].quotesArray.length; m++) {
        siteItemStorage.printableQuoteInfo.page2Info.push({ ["Page2_Plan" + (m + 1) + "MonthlyPrem"]: quotesObj[0].quotesArray[m].planPrems[0] });
    }

    for (var q = 0; q < quotesObj[0].quotesArray.length; q++) {
        siteItemStorage.printableQuoteInfo.page2Info.push({ ["Page2_Plan" + (q + 1) + "QuarterlyPrem"]: quotesObj[0].quotesArray[q].planPrems[1] });
    }

    for (var sa = 0; sa < quotesObj[0].quotesArray.length; sa++) {
        siteItemStorage.printableQuoteInfo.page2Info.push({ ["Page2_Plan" + (sa + 1) + "SemiAnnualPrem"]: quotesObj[0].quotesArray[sa].planPrems[2] });
    }

    for (var a = 0; a < quotesObj[0].quotesArray.length; a++) {
        siteItemStorage.printableQuoteInfo.page2Info.push({ ["Page2_Plan" + (a + 1) + "AnnualPrem"]: quotesObj[0].quotesArray[a].planPrems[3] });
    }

    for (var bb = 0; bb < quotesObj[0].quotesArray.length; bb++) {
        siteItemStorage.printableQuoteInfo.checkboxes.push({ ["Page2_Plan" + (bb + 1) + "_BB"]: quotesObj[0].quotesArray[bb].inclusionVals[0] === true ? "Yes" : "No" });
        
    }

    for (var bbwc = 0; bbwc < quotesObj[0].quotesArray.length; bbwc++) {
        siteItemStorage.printableQuoteInfo.checkboxes.push({ ["Page2_Plan" + (bbwc + 1) + "_BBwCo"]: quotesObj[0].quotesArray[bbwc].inclusionVals[1] === true ? "Yes" : "No" });
    }

    for (var pad = 0; pad < quotesObj[0].quotesArray.length; pad++) {
        siteItemStorage.printableQuoteInfo.checkboxes.push({ ["Page2_Plan" + (pad + 1) + "_PartADed"]: quotesObj[0].quotesArray[pad].inclusionVals[2] === true ? "Yes" : "No" });
    }

    for (var pbd = 0; pbd < quotesObj[0].quotesArray.length; pbd++) {
        siteItemStorage.printableQuoteInfo.checkboxes.push({ ["Page2_Plan" + (pbd + 1) + "_PartBDed"]: quotesObj[0].quotesArray[pbd].inclusionVals[3] === true ? "Yes" : "No" });
    }

    for (var pbe = 0; pbe < quotesObj[0].quotesArray.length; pbe++) {
        siteItemStorage.printableQuoteInfo.checkboxes.push({ ["Page2_Plan" + (pbe + 1) + "_PartBExcess"]: quotesObj[0].quotesArray[pbe].inclusionVals[4] === true ? "Yes" : "No" });
    }

    for (var sk = 0; sk < quotesObj[0].quotesArray.length; sk++) {
        siteItemStorage.printableQuoteInfo.checkboxes.push({ ["Page2_Plan" + (sk + 1) +"_Skilled"]: quotesObj[0].quotesArray[sk].inclusionVals[5] === true ? "Yes" : "No" });
    }

    for (var fgn = 0; fgn < quotesObj[0].quotesArray.length; fgn++) {
        siteItemStorage.printableQuoteInfo.checkboxes.push({ ["Page2_Plan" + (fgn+1) + "_Foreign"]: quotesObj[0].quotesArray[fgn].inclusionVals[6] === true ? "Yes" : "No" });
    }

    siteItemStorage.printableQuoteInfo.checkboxes.push({ Page2_AgentName: newAppObj.AgentInfo[0].value });
    siteItemStorage.printableQuoteInfo.checkboxes.push({ Page2_State_2: applicantInfoObj.State });
    siteItemStorage.printableQuoteInfo.checkboxes.push({ Page2_Date: formatDate() });
}

function UpdateTopNav(stCode, sec, contId, enabled, training) {
    $(document).ready(function () {
        function TopNavCheck() {
            var containerId = sessionStorage.getItem("contID");

            $("#edit-sideNav").block({
                message: "",
                overlayCSS: { opacity: 0 }
            });

            return $.ajax({
                url: baseUrl + "Application/RefreshEditTopNav",
                type: "GET",
                data: { id: containerId }
            });
        }

        TopNavCheck().then(
            function (result) {
                console.log(result)

                $("#topNav").empty();
                $("#topNav").append(
                    TopNavigationController(
                        result["agentName"],
                        result["planName"],
                        result["monthlyPremium"],
                        result["annualPremium"],
                        result["stateName"],
                        result["effectiveDate"]
                    )
                );

                RefreshSideNav(stCode, sec, contId, enabled, training);
            },
            function (response) {
                console.log(response);
            }
        );
    });
};

function RefreshSideNav(stCode, sec, contId, training) {
    $(document).ready(function () {
        function SideNavCheck(stCode, sec, contId) {
            return $.ajax({
                url: baseUrl + "Application/RefreshEditSideNav",
                type: "GET",
                data: {
                    stateCode: stCode,
                    section: sec,
                    id: contId
                }
            });
        }

        SideNavCheck(stCode, sec, contId).then(
            function (result) {
                $.ajaxSetup({ cache: false });

                $.blockUI.defaults.overlayCSS.zIndex = 10001;

                ////siteItemStorage.currClientCode = '@clientCode';
                console.log(result);
                SetPageTitle(sec);

                let availSignOpts = [];

                for (var r = 0; r < result.length; r++) {
                    result[r].isLocked === "true" ? true : false;

                    if (result[r].prefix.localeCompare("SIG") === 0) {
                        for (var c = 0; c < result[r].childNavButtons.length; c++) {
                            switch (result[r].childNavButtons[c].prefix) {
                                case "ESN":
                                    if (result[r].childNavButtons[c].isVisible === true) {
                                        availSignOpts.push("ESN");
                                    }
                                    break;
                                case "SPD":
                                    if (result[r].childNavButtons[c].isVisible === true) {
                                        availSignOpts.push("SPD");
                                    }
                                    break;
                                case "VSN":
                                    if (result[r].childNavButtons[c].isVisible === true) {
                                        availSignOpts.push("VSN");
                                    }
                                    break;
                                case "PRT":
                                    if (result[r].childNavButtons[c].isVisible === true) {
                                        availSignOpts.push("PRT");
                                    }
                                    break;
                            }
                        }
                    }
                }

                sessionStorage.setItem("sOpts", JSON.stringify(availSignOpts));
                sessionStorage.setItem("btnsArr", JSON.stringify(result))


                //console.log(result);
                $("#edit-sideNav").empty();
                $("#edit-sideNav").append(
                    EditSideNavicationController(sec, result, training === "true" ? true : false)
                );

                $("#edit-sideNav").unblock();
                clearOverlays();
            },
            function (response) {
                console.log(response);

                ErrorMessage("Error Loading Content!");
                $("#edit-sideNav").unblock({ message: null });
            }
        );
    });
}

function SanitizePlaceholder(val) {
    $(document).ready(function () {
        var check = val.indexOf("<");

        if (check !== -1) {
            return val.substring(check, val.length - 1);
        }
        else {
            return val;
        }
    });
}

function SubmitSignatures(id) {
    $(document).ready(function () {
        var progressConnection;
        var progressConnectionId;
        sessionStorage.setItem("connID", "");

        function NavSetSummaryPage(stCode, contId) {
            $("body").block({
                message: "",
                overlayCSS: {
                    opacity: 0.7
                }
            });

            return $.ajax({
                url: baseUrl + "Application/RefreshEditSideNav",
                type: "GET",
                data: {
                    stateCode: stCode,
                    section: "SUM",
                    id: contId
                }
            });
        }

        function SendToSummary() {
            progressConnection
                .stop()
                .then(() => {
                    HideProgressBar();
                    progressConnectionId = "";
                    sessionStorage.setItem("connID", "");

                    var contID = sessionStorage.getItem("contID");
                    var currState = sessionStorage.getItem("currentState").replace(/\s/g, '');
                    var isEdit = sessionStorage.getItem("currIsEdit") === "true" ? true : false;
                    var isTrain = sessionStorage.getItem("currIsTrain") === "true" ? true : false;

                    console.log("Success! Documents Signed!");

                    $("#sign-overlay").block({
                        message: "",
                        overlayCSS: {
                            opacity: 0.7
                        }
                    });
                    SignaturAccepted("Application Processed,\nThank you!");

                    NavSetSummaryPage(currState, contID).then(
                        function (result) {
                            $.ajaxSetup({ cache: false });

                            $.blockUI.defaults.overlayCSS.zIndex = 10001;

                            ////siteItemStorage.currClientCode = '@clientCode';
                            console.log(result);
                            SetPageTitle("SUM");

                            let availSignOpts = [];

                            for (var r = 0; r < result.length; r++) {
                                if (result[r].prefix.localeCompare("SIG") === 0) {
                                    for (var c = 0; c < result[r].childNavButtons.length; c++) {
                                        switch (result[r].childNavButtons[c].prefix) {
                                            case "ESN":
                                                if (result[r].childNavButtons[c].isVisible === true) {
                                                    availSignOpts.push("ESN");
                                                }
                                                break;
                                            case "SPD":
                                                if (result[r].childNavButtons[c].isVisible === true) {
                                                    availSignOpts.push("SPD");
                                                }
                                                break;
                                            case "VSN":
                                                if (result[r].childNavButtons[c].isVisible === true) {
                                                    availSignOpts.push("VSN");
                                                }
                                                break;
                                            case "PRT":
                                                if (result[r].childNavButtons[c].isVisible === true) {
                                                    availSignOpts.push("PRT");
                                                }
                                                break;
                                        }
                                    }
                                }
                            }

                            sessionStorage.setItem("sOpts", JSON.stringify(availSignOpts));
                            sessionStorage.setItem("btnsArr", JSON.stringify(result))
                            sessionStorage.setItem("currIsEdit", false);

                            //console.log(result);
                            $("#edit-sideNav").empty();
                            $("#edit-sideNav").append(
                                EditSideNavicationController("SUM", result, isTrain)
                            );

                            UpdateTopNav(
                                sessionStorage.getItem("currentState"),
                                sessionStorage.getItem('currPage'),
                                sessionStorage.getItem('contID'),
                                sessionStorage.getItem("currIsEdit"),
                                sessionStorage.getItem("currIsTrain"),
                            );
                            GetData("SUM", currState, contID, "col-md-12", isEdit, isTrain);
                        },
                        function (response) {
                            console.log(response);

                            ErrorMessage("Error Signing Documents!");
                            $("#edit-sideNav").unblock({ message: null });
                        }
                    )
                }).catch((response) => {
                    console.log(response);
                    ErrorMessage(response);
                });
        }

        function SignDocsAJAX() {
            $("#" + id).prop('disabled', true);

            var contID = sessionStorage.getItem("contID");
            var pref = id.substring(0, 3);

            $("body").block({
                message: "",
                overlayCSS: {
                    opacity: 0.7
                }
            });
            var pbContainer = $('#progressbar-container');
            var pbMeter = $('#progressbar-div');
            pbContainer.show();
            pbMeter.show();

            var dataOut = {
                id: contID,
                signtype: pref,
                pbconnid: sessionStorage.getItem("connID")
            };

            return $.ajax({
                contentType: "application/json; charset=utf-8",
                url: baseUrl + "Application/SignDocument",
                type: "POST",
                data: JSON.stringify(dataOut)
            });
        }

        function openConnection() {
            //progressConnection = new signalR.HubConnection(baseUrl +"postSigningProgress")
            //    .withUrl("/chatHub")
            //    .configureLogging(signalR.LogLevel.Information)
            //    .build();
            //;

            progressConnection = new signalR.HubConnectionBuilder()
                .withUrl(baseUrl + "postSigningProgress")
                .configureLogging(signalR.LogLevel.Information)
                .build();



            /*
            progressConnection = new signalR.HubConnectionBuilder()
                .withUrl(baseUrl + "/postSigningProgress/")
                .configureLogging(signalR.LogLevel.Information)
                .build();
                */
            progressConnection.connection.serverTimeoutInMilliseconds = 600000;

            progressConnection
                .start()
                .then(
                    function () {
                        progressConnectionId = progressConnection.connection.connectionId;

                        sessionStorage.setItem("connID", progressConnectionId);

                        SignDocsAJAX().then(
                            function (result) {
                                console.log(result);
                            },
                            function (response) {
                                console.log(response);
                                ErrorMessage("Error! Signing Error!");
                            }
                        );
                    },
                    function (response) {
                        console.log(response);
                        ErrorMessage(response);
                    }
                )
                .then(() => {

                    progressConnection.on("step1", (title, perc) => {
                        UpdateProgressBar(perc, title);
                    });
                    progressConnection.on("step2", (title, perc) => {
                        UpdateProgressBar(perc, title);
                    });
                    progressConnection.on("step3", (title, perc) => {
                        UpdateProgressBar(perc, title);
                    });
                    progressConnection.on("step4", (title, perc) => {
                        UpdateProgressBar(perc, title);
                    });
                    progressConnection.on("step5", (title, perc) => {
                        UpdateProgressBar(perc, title);
                    });
                    progressConnection.on("step6", (title, perc) => {
                        UpdateProgressBar(perc, title);
                    });
                    progressConnection.on("step7", (title, perc) => {
                        UpdateProgressBar(perc, title);
                    });
                    progressConnection.on("step8", (title, perc) => {
                        UpdateProgressBar(perc, title);
                    });
                    progressConnection.on("step9", (title, perc) => {
                        UpdateProgressBar(perc, title);
                        SendToSummary();
                    });
                })
                .catch((response) => {
                    console.log(response);
                    ErrorMessage(response);
                });
        }

        openConnection();
    });
}

function SendEmailToApplicant(id) {

    StartLoadingMeter("Sending E-Mail...");
    
    var contID = sessionStorage.getItem("contID");
    var controlID = id.substring(0, 6);

    var control = data.dataList.find(c => c.id === controlID);

    var emailID = control.childElementIDs[0].replace(/\s/g, "");

    var emailVal = $("#" + emailID).val();
    var pref = id.substring(0, 3);

    var dataOut = {
        id: contID,
        email: emailVal,
        page: pref
    };

    $.ajax({
        contentType: "application/json; charset=utf-8",
        url: baseUrl + "Application/SendEsnEmail",
        type: "POST",
        data: JSON.stringify(dataOut)
    }).done(function (result) {
        console.log(result);
    }).promise().done(function () {
        var contID = sessionStorage.getItem("contID");
        var currState = sessionStorage.getItem("currentState").replace(/\s/g, '');

        GetData("SUM", currState, contID, "col-12", true);
    }).fail(function (response) {
        console.log(response);
    });
}

function SetApplicantStorageVariables(dob, ssn) {
    console.log(dob);
    sessionStorage.setItem("appDoB", dob);
    sessionStorage.setItem("appLast4", ssn);
}

function CheckDOB(val) {
    var savedDoB = sessionStorage.getItem("appDoB");

    var output = "";

    if (NullOrEmptyCheck(val) || val.localeCompare(savedDoB) !== 0) {
        output = "Date of Birth is incorrect!";
    }

    return output;
}

function CheckLast4(val) {
    var savedLast4 = parseInt(sessionStorage.getItem("appLast4"));

    var output = "";

    if (NullOrEmptyCheck(parseInt(val)) || parseInt(val) !== savedLast4) {
        output = "Last-4 is incorrect!";
    }

    return output;
}

function SignPadEnableCheck(signpadID) {
    $(document).ready(function () {
        var idSplit = signpadID.split("_");

        var type = document.getElementById(idSplit[0] + "_SigPad_saveBtnID").getAttribute("data-signer");

        var currCount = parseInt(sessionStorage.getItem("spdSignCount"));
        console.log(currCount);

        if (currCount > 0) {
            currCount -= 1;

            sessionStorage.setItem("spdSignCount", currCount);
        } else if (currCount < 0 || currCount == 0) {
            currCount = 0;

            sessionStorage.setItem("spdSignCount", currCount);
        }

        console.log(currCount);

        if (currCount === 0) {
            var childIDObj = JSON.parse(sessionStorage.getItem("SPDChildIDs"));

            $("#" + childIDObj.childIds[childIDObj.childIds.length - 1]).prop("disabled", false);

            $("#" + childIDObj.childIds[childIDObj.childIds.length - 1] + "_label").removeClass("accordCB-container-disabled");
            $("#" + childIDObj.childIds[childIDObj.childIds.length - 1] + "_label").addClass("accordCB-container");

            $("#" + childIDObj.childIds[childIDObj.childIds.length - 1] + "-accordCB-span").removeClass("accordCB-disabled");
            $("#" + childIDObj.childIds[childIDObj.childIds.length - 1] + "-accordCB-span").addClass("accordCB");
        }

        SaveSignature(idSplit[0] + "_SigPad", type);
    });
}

function ResendEmail() {
    var contID = sessionStorage.getItem("contID");

    var dataOut = {
        id: contID,
        email: "",
        page: "SUM"
    };

    $.ajax({
        contentType: "application/json; charset=utf-8",
        url: baseUrl + "Application/SendEsnEmail",
        type: "POST",
        data: JSON.stringify(dataOut)
    }).done(function (result) {
        console.log(result);

        SignaturAccepted("E-Mail Re-Sent!");
    }).fail(function (response) {
        console.log(response);
    });
}

function ActivatePolicy() {
    console.log("ACTIVATE POLICY...");

    var contID = sessionStorage.getItem("contID");
    var jData = {
        id: contID
    };

    $.ajax({
        contentType: "application/json; charset=utf-8",
        url: baseUrl + "Application/ActivatePolicy",
        type: "POST",
        data: JSON.stringify(jData)
    }).done(function (result) {
        console.log(result);

        var overlay = $('#overlay');
        var loadingContainer = $('#loading-meter-container');
        var sigContainer = $("#sig-accepted-container");

        $("#accepted-text").empty();
        $("#accepted-text").text("Thank you for activating your Application! Have a good day!");

        loadingContainer.hide();
        overlay.show();

        $("#sig-accepted-container").show().delay(3000).fadeOut("slow").promise().then(function () {
            sigContainer.hide();
            overlay.hide();
            var contID = sessionStorage.getItem("contID");
            var currState = sessionStorage.getItem("currentState").replace(/\s/g, '');

            GetData("SUM", currState, contID, "col-12", true);
        });
       
    }).fail(function (response) {
        console.log(response);

        ErrorMessage("Error Activating Application!");
    });
}

function RefreshSummaryPage() {
    $.blockUI({
        message: '',
        css: {
            backgroundColor: '#676767',
            opacity: 0.7
        }
    });

    StartLoadingMeter("Checking Application...\nPlease Wait...");

    let containerID = sessionStorage.getItem("contID");
    let currState = sessionStorage.getItem("currentState");

    GetData("SUM", currState, containerID, "col-12", true);
}

function SubmitPhi() {
    var contID = sessionStorage.getItem("contID");

    $.ajax({
        contentType: "application/json; charset=utf-8",
        url: baseUrl + "Application/SubmitPhi",
        type: "POST",
        data: JSON.stringify(contID)
    }).done(function (result) {
        console.log(result);

        var overlay = $('#overlay');
        var loadingContainer = $('#loading-meter-container');
        var sigContainer = $("#sig-accepted-container");

        $("#accepted-text").empty();
        $("#accepted-text").text("Thank you for activating your Application! Have a good day!");

        loadingContainer.hide();
        overlay.show();

        $("#sig-accepted-container").show().delay(3000).fadeOut("slow").promise().then(function () {
            sigContainer.hide();
            overlay.hide();
            var contID = sessionStorage.getItem("contID");
            var currState = sessionStorage.getItem("currentState").replace(/\s/g, '');

            GetData("SUM", currState, contID, "col-12", true);
        });

    }).fail(function (response) {
        console.log(response);

        ErrorMessage("Error Activating Application!");
    });
}

function PopperAlert(id, alertTxt, pos, title) {
    $("#" + id).popover({
        content: alertTxt,
        placement: pos,
        title: title
    });

    $("#" + id).popover('show');

    setTimeout(function () {
        $("#" + id).popover('hide');
    }, 3000);
}

function RemovePopper(id) {
    $("#" + id).popover('dispose');
}

function ChildIDsTriggerCheck(cID) {
    var childIDs = [];
    var subChildIds = [];

    function subChildrenTriggerCheck(scID) {

        let subChildObj = data.dataList.find(c => c.id === scID.replace(/\s/g, ''));

        if (!NullOrEmptyCheck(subChildObj.triggerType)) {
            for (var i = 0; i < subChildObj.childElementIDs.length; i++) {
                let subChildEl = data.dataList.find(s => s.id === subChildObj.childElementIDs[i].replace(/\s/g, ''));
                subChildIds.push(subChildEl.id, ...subChildrenTriggerCheck(subChildObj.childElementIDs[i].replace(/\s/g, '')));
            }
        }

        return subChildIds;
    }

    let childObj = data.dataList.find(c => c.id === cID.replace(/\s/g, ''));

    if (!NullOrEmptyCheck(childObj.triggerType)) {
        for (var i = 0; i < childObj.childElementIDs.length; i++) {
            let childEl = data.dataList.find(c => c.id === childObj.childElementIDs[i].replace(/\s/g, ''));
            childIDs.push(childEl.id, ...subChildrenTriggerCheck(childObj.childElementIDs[i].replace(/\s/g, '')));
        }
    }

    return childIDs;
}

function ChildTriggerCheck(cId) {
    var childIDs = [];
    var subChildIds = [];

    function subChildrenTriggerCheck(scID) {
        
        let subChildObj = data.dataList.find(c => c.id === scID.replace(/\s/g, ''));
        
        if (!NullOrEmptyCheck(subChildObj.triggerType)) {
            for (var i = 0; i < subChildObj.childElementIDs.length; i++) {
                let subChildEl = data.dataList.find(s => s.id === subChildObj.childElementIDs[i].replace(/\s/g, ''));
                subChildIds.push(subChildEl.variableName, ...subChildrenTriggerCheck(subChildObj.childElementIDs[i].replace(/\s/g, '')));
            }
        }

        return subChildIds;
    }

    let childObj = data.dataList.find(c => c.id === cId.replace(/\s/g, ''));

    if (!NullOrEmptyCheck(childObj.triggerType)) {
        for (var i = 0; i < childObj.childElementIDs.length; i++) {
            let childEl = data.dataList.find(c => c.id === childObj.childElementIDs[i].replace(/\s/g, ''));
            childIDs.push(childEl.variableName, ...subChildrenTriggerCheck(childObj.childElementIDs[i].replace(/\s/g, '')));
        }
    }

    return childIDs;
}

function FAQPageSwitch() {
    $(document).ready(function () {
        $('.body-header').empty();
        $('.body-header').append(
            ApplicaitonTopInfoBarController(
                "FAQ",
                sessionStorage.getItem("FirstName"),
                sessionStorage.getItem("MidInital"),
                sessionStorage.getItem("LastName")
            )
        );

        $("#page-body").css("display", "none");
        $("#faq-body").css("display", "flex");

        var btns = JSON.parse(sessionStorage.getItem("btnsArr"));

        for (var b = 0; b < btns.length; b++) {
            $("#" + btns[b].prefix + "Btn").removeClass("current");
        }
    });
}

function ReloadBodyAJAX() {
    $(document).ready(function () {

        function ClearControls(controlList) {
            for (var cl = 0; cl < controlList.length; cl++) {
                let control = data.dataList.find(c => c.id === controlList[cl].replace(/\s/g, ''));

                switch (control.controlType) {
                    case "radio":
                        if (control.dataType.localeCompare("accordion") !== 0) {
                            //if norm radio button, just uncheck
                            for (var r = 0; r < control.responses.length; r++) {
                                $("#" + control.id + control.responses[r].seqNum).prop('checked', false);
                            }
                        }
                        else {
                            //Else it's an accordion...Clear it's children...
                            ClearControls(control.childElementIDs);
                            //Then Clear the parent
                            for (var r = 0; r < control.responses.length; r++) {
                                $("#" + control.id + control.responses[r].seqNum).prop('checked', false);
                            }
                        }
                        break;
                    case "dropdown":
                        $("#" + control.id + " option:selected").prop("selected", false);
                        $("#" + control.id + " option:first").prop("selected", "selected");
                        break;
                    default:
                        $("#" + control.id).val('');
                        break;
                }
            }
        }

        if (eAppRulesStorage.reqiresPageReload) {

            let selParID = data.dataList.find(d => d.id === eAppRulesStorage.parID);

            for (var c = 0; c < selParID.childElementIDs.length; c++) {
                let childEl = data.dataList.find(d => d.id === selParID.childElementIDs[c].replace(/\s/g, ''));
                childEl.answer = "";
            }

            ClearControls(selParID.childElementIDs);

            eAppRulesStorage.reqiresPageReload = false;
            eAppRulesStorage.parID = "";
        }
    });
}

function clearOverlays() {
    var overlay = $('#overlay');
    var loadingContainer = $('#loading-meter-container');
    var loadingMeter = $('#loading-spinner');

    $("#edit-sideNav").unblock();
    $("body").unblock();
    $.unblockUI();

    loadingContainer.hide();
    loadingMeter.hide();
    overlay.hide();
}
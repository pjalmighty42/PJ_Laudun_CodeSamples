function ApplicaitonTopInfoBarController(
    page,
    first,
    mid,
    last
) {
    function PageOutFull(pre) {
        switch (pre) {
            case "PER":
                return "Personal";
            case "COV":
                return "Coverage";
            case "ISS":
                return "Guarantee Issue";
            case "PRM":
                return "Premium Discount";
            case "HAM":
                return "Health and Medical";
            case "REP":
                return "Replacement";
            case "AGE":
                return "Agent Certification";
            case "PRO":
                return "Producers Statement";
            case "PAY":
                return "Payment";
            case "ATH":
                return "Authorization";
            case "ASN":
                return "Assignees";
            case "ESN":
                return "Electronic Signature";
            case "SPD":
                return "Signature Pad";
            case "VSN":
                return "Voice Signature";
            case "PRT":
                return "Print Signature";
            case "DOC":
                return "Documents Review";
            case "SIG":
                return "Signature";
            case "UPL":
                return "Upload Documents";
            case "FAQ":
                return "Frequently Asked Questions";
        }
    }

    function AppTopInfoBar(
        currPg,
        fName,
        mInit,
        lName
    ) {
        var output = [];

        output.push("<aside class='page-title col-md-4'>")
        output.push("<p>" + PageOutFull(currPg) + "</p>");
        output.push("</aside>");
        output.push("<span class='col-md-2'></span>");
        output.push("<aside class='applicant-name col-md-6'>");
        output.push("<p>Applicant's Name: </p>");
        output.push("<p id='app-first-name'>" + fName + "</p>");
        output.push("<p id='app-mid-init'>" + mInit + "</p>");
        output.push("<p id='app-last-name'>" + lName + "</p>");
        output.push("</aside>");

        return CreateElement(output);
    }

    return AppTopInfoBar(
        page,
        first,
        mid,
        last
    );
}
const ApplicaitonTopInfoBarController = (
    page,
    first,
    mid,
    last
) => {
    const PageOutFull = (pre) => {
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
        };
    }

    const AppTopInfoBar = (
        currPg,
        fName,
        mInit,
        lName
    ) => {

        let currPgOut = PageOutFull(currPg);

        return `<aside class='page-title col-md-4'>
                <p>${currPgOut}</p>
                </aside>
                <span class='col-md-2'></span>
                <aside class='applicant-name col-md-6'>
                <p>Applicant's Name: </p>
                <p id='app-first-name'>${fName}</p>
                <p id='app-mid-init'>${mInit}</p>
                <p id='app-last-name'>${lName}</p>
                </aside>`;
    }

    return AppTopInfoBar(
        page,
        first,
        mid,
        last
    );
}
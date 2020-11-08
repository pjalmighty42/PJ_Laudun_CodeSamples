var revDocStorer = {
    revDocObjList: [],
    childElIds: [],
    countList: [],
    appBindingTitles: []
};

function DocumentReviewController(
    parentID,
    docRevTitle,
    docRevObjList,
    devRevType,
    reload
){

    function DocRevObj(
        pID,
        drTitle,
        documentPDFObjList,
        docType
    ) {
        this.parentID = !NullOrEmptyCheck(pID) ? pID : "";
        this.title = !NullOrEmptyCheck(drTitle) ? drTitle : "Documents to Review";
        this.documentPDFObjList = documentPDFObjList !== null && documentPDFObjList.length > 0 ? documentPDFObjList : [];
        this.type = !NullOrEmptyCheck(docType) ? docType : "ERR! No documents!";
    };

    function CategorizeDocuments(storer) {
        var requiredDocs = [];
        var nonReqDocs = [];

        var output = [];

        var revCounter = 0;
        revDocStorer.appBindingTitles = [];

        switch (storer.type) {
            case "pre":
                for (var sr = 0; sr < storer.docVals.length; sr++) {
                    if (storer.docVals[sr].reviewed === false) {
                        if (storer.docVals[sr].reviewRequired === true) {
                            revCounter += 1;

                            requiredDocs.push(storer.docVals[sr]);
                        }
                        else {
                            nonReqDocs.push(storer.docVals[sr]);
                        }
                    } else {
                        if (storer.docVals[sr].reviewRequired === true) {
                            requiredDocs.push(storer.docVals[sr]);
                        }
                        else {
                            nonReqDocs.push(storer.docVals[sr]);
                        }
                    }
                }

                for (var req = 0; req < requiredDocs.length; req++) {
                        output.push(requiredDocs[req]);
                        revDocStorer.appBindingTitles.push(requiredDocs[req].name)
                    }

                for (var nr = 0; nr < nonReqDocs.length; nr++) {
                    output.push(nonReqDocs[nr]);
                }
                break;
            case "wet":
                var reqSig = [];
                var reqNtSig = [];

                for (var sr = 0; sr < storer.docVals.length; sr++) {
                    if (storer.docVals[sr].reviewRequired === true) {
                        requiredDocs.push(storer.docVals[sr]);
                        revDocStorer.appBindingTitles.push(requiredDocs[req].name)
                    }
                    else {
                        nonReqDocs.push(storer.docVals[sr]);
                    }
                }

                for (var r = 0; r < requiredDocs.length; r++) {
                    if (requiredDocs[r].signed !== true) {
                        revCounter += 1;

                        reqNtSig.push(requiredDocs[r]);
                    }
                    else {
                        reqSig.push(requiredDocs[r]);
                    }
                }

                for (var rntsig = 0; rntsig < reqNtSig.length; rntsig++) {
                    output.push(reqNtSig[rntsig]);
                }

                for (var rsig = 0; rsig < reqSig.length; rsig++) {
                    output.push(reqSig[rsig]);
                }

                for (var nr = 0; nr < nonReqDocs.length; nr++) {
                    output.push(nonReqDocs[nr]);
                }
                break;
        }

        revDocStorer.countList.push({ id: parentID, counter: revCounter, pref: parentID.substring(0, 3) });

        return output; 
    }

    function CategorizeDocumentsReload(storer) {
        var requiredDocs = [];
        var nonReqDocs = [];

        var output = [];

        switch (storer.type) {
            case "pre":
                for (var sr = 0; sr < storer.docVals.length; sr++) {
                    if (storer.docVals[sr].reviewRequired === true) {
                        requiredDocs.push(storer.docVals[sr]);
                    }
                    else {
                        nonReqDocs.push(storer.docVals[sr]);
                    }
                }

                for (var req = 0; req < requiredDocs.length; req++) {
                    output.push(requiredDocs[req]);
                }

                for (var nr = 0; nr < nonReqDocs.length; nr++) {
                    output.push(nonReqDocs[nr]);
                }
                break;
            case "wet":
                var reqSig = [];
                var reqNtSig = [];

                for (var sr = 0; sr < storer.docVals.length; sr++) {
                    if (storer.docVals[sr].reviewRequired === true) {
                        requiredDocs.push(storer.docVals[sr]);
                    }
                    else {
                        nonReqDocs.push(storer.docVals[sr]);
                    }
                }

                for (var r = 0; r < requiredDocs.length; r++) {
                    if (requiredDocs[r].signed !== true) {
                        reqNtSig.push(requiredDocs[r]);
                    }
                    else {
                        reqSig.push(requiredDocs[r]);
                    }
                }

                for (var rntsig = 0; rntsig < reqNtSig.length; rntsig++) {
                    output.push(reqNtSig[rntsig]);
                }

                for (var rsig = 0; rsig < reqSig.length; rsig++) {
                    output.push(reqSig[rsig]);
                }

                for (var nr = 0; nr < nonReqDocs.length; nr++) {
                    output.push(nonReqDocs[nr]);
                }
                break;
        }

        return output;
    }

    function CreateTableContainer(
        docRevObj,
        isReload
    ) {
        var docChecker = revDocStorer.revDocObjList.find(d => d.id === docRevObj.parentID);
        var currDocStorer;

        if (typeof docChecker === "undefined") {
            revDocStorer.revDocObjList.push({ id: docRevObj.parentID, docVals: [] });

            currDocStorer = revDocStorer.revDocObjList.find(d => d.id === docRevObj.parentID);
        }
        else {
            currDocStorer = docChecker;
        }

        if (docRevObj.documentPDFObjList.length > 0) {
            if (isReload === true) {
                for (var r = 0; r < docRevObj.documentPDFObjList.length; r++) {
                    currDocStorer.docVals.push(docRevObj.documentPDFObjList[r]);
                }
            }
            else {
                for (var r = 0; r < docRevObj.documentPDFObjList.length; r++) {
                    currDocStorer.docVals.push(JSON.parse(docRevObj.documentPDFObjList[r].value));
                }
            }
        }
        
        //This function will create the rows for the amount of documents in the documents review list
        function CreateTableList(sortedArr){
            let trOut = (
                docType,
                docObj,
                index,
                parID,
                revObj
            ) => {

                let currType = (type) => {
                    switch (type) {
                        case "pre":
                            return "RevDoc_";
                        case "wet":
                            return "WetSig_";
                        case "sum":
                        default:
                            return "SignDoc_";
                    }
                };

                return `<tr class='revDocs-tr'>
                        <td>
                        <button type='button' id='${currType(docType) + index}' class='revDocs-modal-btn btn' data-toggle='modal' data-target='${currType(docType) + index}-modal' onclick='openModalRevDoc(this.id, "${docObj.sequence}", "${parID}")'> ${docObj.name} </button>
                        </td>
                        <td class='font-weight-bold ${revObj.color}'>${revObj.text}</td>
                        <td>${revObj.icon}</td>
                        </tr>`;
            };
            
            if (sortedArr.length > 0) {
                return sortedArr.map((rev, index) => {
                    let reqObj = {
                        color: rev.reviewRequired === true ? "text-danger" : "",
                        text: rev.reviewRequired === true ? "Yes" : "No",
                        icon: rev.reviewRequired === true ?
                            !NullOrEmptyCheck(rev.reviewCompleteDate) ? "<i class='fa fa-check text-success'></i>" : "<i class='fa fa-exclamation text-danger'></i>"
                            : "<i class='fa fa-minus-square'></i>"
                    };

                    return trOut(docRevObj.type, rev, index, docRevObj.parentID, reqObj);

                }).join(''); 
            }
            else {
                var colspanAmt = 0;

                switch (docObj.type) {
                    case "pre":
                        colspanAmt = 3;
                        break;
                    case "wet":
                        colspanAmt = 4;
                        break;
                    case "sum":
                        colspanAmt = 1;
                        break;
                }

                revDocStorer.countList.push({ id: docRevObj.parentID, counter: null, pref: docRevObj.parentID.substring(0, 3) });

                return `<tr class='revDocs-tr'>
                    <td colspan='${colspanAmt}'>No Documents to Review. Please fully complete this Application to get a full list of Documents to Review.</td>
                    </tr>`;

            }
        };

        //Create the table header
        let tableTHs = [];

        var thisDocStorer = revDocStorer.revDocObjList.find(d => d.id === docRevObj.parentID);
        thisDocStorer.type = docRevObj.type;

        var sortedArr = [];

        if (thisDocStorer.docVals.length > 0) {
            switch (docRevObj.type) {
                case "pre":
                case "wet":
                    if (isReload === false) {
                        sortedArr = CategorizeDocuments(thisDocStorer);
                    }
                    else {
                        sortedArr = CategorizeDocumentsReload(thisDocStorer);
                    }
                    break;
                case "sum":
                    sortedArr = thisDocStorer.docVals;
                    break;
            }
        }

        switch (docRevObj.type) {
            case "pre":
                tableTHs.push("Document Name");
                tableTHs.push("Required?");
                tableTHs.push("Reviewed?");
                break;
            case "wet":
                tableTHs.push("Document Name");
                tableTHs.push("Required Signature?");
                tableTHs.push("In Signing?");
                tableTHs.push("Date");
                break;
            case "sum":
                tableTHs.push("Document Name");
                break;
        }

        let docRevTR = (input) => { return `<th class='revDocs-header'>${input}</th>`; };

        let trOut = tableTHs.map(tr => {
            return docRevTR(tr);
        }).join('');

        let docRevTemplate = (tabListObj) => {
            return `<div id='${docRevObj.parentID}-docRevTable' class='docRevTable-container'>
                    <h3>Documents to Review</h3>
                    <div class='docRevTable'>
                    <table class='table table-striped table-hover'>
                    <thead>
                    <tr class='revDocs-tr'> 
                    ${trOut}
                    </tr>
                    </thead>
                    <tbody>
                    ${tabListObj}
                    </tbody>
                    </table>
                    </div>
                    </div>`;
        };

        return CreateElement(docRevTemplate(CreateTableList(sortedArr)));
    };

    revDocStorer.revDocObjList = [];
    revDocStorer.childElIds = [];

    return CreateTableContainer(
        new DocRevObj(
            parentID,
            docRevTitle,
            docRevObjList,
            devRevType
        ),
        reload
    );

}

//TODO: This will probably need to be an AJAX callback to save and adjust the info on the screen
function closeDocRevModal(id) {
    $(document).ready(function () {
        $('#' + id + '-modal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $("#" + id + "-modal").remove();
    });
}

//This is the On-The-Fly modal creation function
//Since we are dealing with a scenario of controls not initally being a part of the DOM at the time of creation, we need a way to; a) create the modal, then b) open it
//This is what this function call should do
function openModalRevDoc(id, seqNum, parID) {
    $(document).ready(function () {
        console.log("Hit OpenModalDoc()!");

        var selObj = revDocStorer.revDocObjList.find(d => d.id === parID);
        var selDoc = selObj.docVals.find(d => parseInt(d.sequence) === parseInt(seqNum));

        var countObj = revDocStorer.countList.find(c => c.id === parID);
        var count = 0;

        if (typeof countObj !== "undefined") {
            count = countObj.counter;
        }

        StartLoadingMeter("Please Wait...Creating Document...");

        $.ajax({
            url: baseUrl + 'Application/GetDocumentImage',
            type: "GET",
            data: {
                id: selDoc.id
            }
        }).done(function (result) {

            function CreateModal(
                pId,
                docId,
                docName,
                docSrc,
                docRevDate,
                isReq,
                seqNum
            ) {
                $('#' + id + '-modal').modal('hide');

                let modalObj = {
                    parentId: pId,
                    documentId: docId,
                    documentName: docName,
                    documentSrc: docSrc,
                    documentRevDate: docRevDate,
                    isRequired: isReq,
                    sequenceNum: seqNum
                };

                let modalTemplate = (mobj) => {
                    let date = new Date();

                    if (!NullOrEmptyCheck(mobj.documentRevDate)) {
                        date = new Date(mobj.documentRevDate);
                    }
                    else {
                        date = new Date();
                    }

                    let today = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

                    let pdfOut = "";

                    //For IE using atob convert base64 encoded data to byte array
                    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                        var byteCharacters = atob(docSrc);
                        var byteNumbers = new Array(byteCharacters.length);
                        for (var i = 0; i < byteCharacters.length; i++) {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        var byteArray = new Uint8Array(byteNumbers);
                        var blob = new Blob([byteArray], {
                            type: 'application/pdf'
                        });

                        pdfOut = PDFViewerController(window.navigator.msSaveOrOpenBlob(blob, docName));
                        //window.navigator.msSaveOrOpenBlob(blob, docName);
                    } else {
                        // Directly use base 64 encoded data for rest browsers (not IE)
                        var base64EncodedPDF = docSrc;
                        var dataURI = "data:application/pdf;base64," + base64EncodedPDF;
                        pdfOut = PDFViewerController(dataURI);
                    }

                    let fnObj = {
                        parID: pId,
                        docID: docId,
                        seqNUM: seqNum,
                        Type: "pre"
                    };

                    let cbOut = "";

                    if (count != 0) {
                        if (!NullOrEmptyCheck(mobj.documentRevDate)) {
                            cbOut = CheckboxController(
                                true,
                                mobj.documentId,
                                "question-label",
                                mobj.documentId + "-checkbox",
                                "question-radio-option",
                                "I attest that this document is complete and accurate to the best of my abilities today, " + today,
                                mobj.isRequired,
                                false,
                                true,
                                "",
                                fnObj
                            );
                        }
                        else {
                            cbOut = CheckboxController(
                                true,
                                mobj.documentId,
                                "question-label",
                                mobj.documentId + "-checkbox",
                                "question-radio-option",
                                "I attest that this document is complete and accurate to the best of my abilities today, " + today,
                                mobj.isRequired,
                                true,
                                false,
                                "",
                                fnObj
                            );
                        }
                    }
                    else {
                        cbOut = CheckboxController(
                            true,
                            mobj.documentId,
                            "question-label",
                            mobj.documentId + "-checkbox",
                            "question-radio-option",
                            "I attest that this document is complete and accurate to the best of my abilities today, " + today,
                            false,
                            false,
                            true,
                            "",
                            ""
                        );
                    }


                    let reqOutReq = `<h4 class='modal-title'>Please review this document for completeness and accuracy, and check the box below.</h4>
                                <div class='question-block col-12'>
                                    ${cbOut}
                                </div>`;

                    let reqOutNorm = `
                                <div class='question-block col-12'>
                                    ${cbOut}
                                </div>`;

                    return `<div class='modal fade revDocs-modal-container' id='${mobj.documentId}-modal'>
                        <div class='modal-dialog'>
                        <div class='modal-content'>
                        <div class='modal-header'>
                        <h3 class='modal-title'>${mobj.documentName}</h3>
                        <button id='${mobj.documentId}' type='button' class='close' onclick='closeDocRevModal(this.id)'>&times;</button>
                        </div>
                        <div class='modal-body'>
                        ${pdfOut}
                        ${!NullOrEmptyCheck(mobj.documentRevDate) ? reqOutNorm : reqOutReq}
                        </div>
                        </div>
                        </div>
                        </div>`;
                };
                
                
                return modalTemplate(modalObj);
            };

            $('.revDocs-modal-container').remove();

            //Modals live outside any structure and is attached to the <body>, this will attach the newly created modal there
            $('body').append(
                CreateModal(
                    parID,
                    id,
                    selDoc.name,
                    result,
                    selDoc.reviewCompleteDate,
                    selDoc.reviewRequired,
                    seqNum
                )
            );

            $('#' + id + '-modal').modal('show');

            CloseLoadingMeter();

        }).fail(function (response) {
            console.log(response);

            ErrorMessage("Error Loading Document!");
        });

    });
};

function openModalWetSig(id, seqNum, parID) {
    $(document).ready(function () {

        console.log("Hit OpenModalDoc()!");

        var selObj = revDocStorer.revDocObjList.find(d => d.id === parID);
        var selDoc = selObj.docVals.find(d => parseInt(d.sequence) === parseInt(seqNum));

        StartLoadingMeter("Please Wait...Creating Document...");

        $.ajax({
            url: baseUrl + 'Application/GetDocumentImage',
            type: "GET",
            data: {
                id: selDoc.id
            }
        }).done(function (result) {

            function CreateModal(
                pId,
                docId,
                docName,
                docSrc,
                req,
                seqNum
            ) {
                $('#' + id + '-modal').modal('hide');

                var modal = [];

                modal.push("<div class='modal fade revDocs-modal-container' id='" + docId + "-modal'>");
                modal.push("<div class='modal-dialog'>");
                modal.push("<div class='modal-content'>");

                modal.push("<div class='modal-header'>");
                modal.push("<h3 class='modal-title'>" + docName + "</h3>");
                modal.push("<button id='" + docId + "' type='button' class='close' onclick='DocumentAccept(\"" + pId + "\", \"" + docId + "-modal\"," + seqNum + ", \"wet\")'>&times;</button>");
                modal.push("</div>");

                modal.push("<div class='modal-body'>");
                modal.push(PDFViewerController("data:application/pdf;base64," + docSrc));
                if (req === true) {
                    modal.push("<button id='" + docId + "' type='button' class='btn btn-success pull-right' onclick='DocumentAccept(\"" + pId + "\", \"" + docId + "-modal\"," + seqNum + ", \"wet\")'><i class= 'fa fa-check' ></i > Close Document</button>");
                }
                modal.push("</div>");

                return CreateElement(modal);
            };

            $('.revDocs-modal-container').remove();

            //Modals live outside any structure and is attached to the <body>, this will attach the newly created modal there
            $('body').append(
                CreateModal(
                    parID,
                    id,
                    selDoc.name,
                    result,
                    selDoc.reviewRequired,
                    seqNum
                )
            );

            $('#' + id + '-modal').modal('show');

            CloseLoadingMeter();

        }).fail(function (response) {
            console.log(response);

            ErrorMessage("Error Loading Document!");
        });

    });
};

function openModalSumDoc(id, seqNum, parID) {
    $(document).ready(function () {

        console.log("Hit OpenModalDoc()!");

        var selObj = revDocStorer.revDocObjList.find(d => d.id === parID);
        var selDoc = selObj.docVals.find(d => parseInt(d.sequence) === parseInt(seqNum));

        StartLoadingMeter("Please Wait...Creating Document...");

        $.ajax({
            url: baseUrl + 'Application/GetDocumentImage',
            type: "GET",
            data: {
                id: selDoc.id
            }
        }).done(function (result) {

            function CreateModal(
                docId,
                docName,
                docSrc
            ) {
                $('#' + id + '-modal').modal('hide');

                var modal = [];
                modal.push("<div class='modal fade revDocs-modal-container' id='" + docId + "-modal'>");
                modal.push("<div class='modal-dialog'>");
                modal.push("<div class='modal-content'>");

                modal.push("<div class='modal-header'>");
                modal.push("<h3 class='modal-title'>" + docName + "</h3>");
                modal.push("<button id='" + docId + "' type='button' class='close' onclick='closeDocRevModal(this.id)'>&times;</button>");
                modal.push("</div>");

                modal.push("<div class='modal-body'>");
                modal.push(PDFViewerController("data:application/pdf;base64," + docSrc));
                modal.push("</div>");

                return CreateElement(modal);
            };

            $('.revDocs-modal-container').remove();

            //Modals live outside any structure and is attached to the <body>, this will attach the newly created modal there
            $('body').append(
                CreateModal(
                    id,
                    selDoc.name,
                    result
                )
            );

            $('#' + id + '-modal').modal('show');

            CloseLoadingMeter();

        }).fail(function (response) {
            console.log(response);

            ErrorMessage("Error Loading Document!");
        });

    });
};

function DocumentAccept(parID, modalID, seqNum, type) {
    $(document).ready(function () {
        var selObj = revDocStorer.revDocObjList.find(d => d.id === parID);
        var selDoc = selObj.docVals.find(d => parseInt(d.sequence) === parseInt(seqNum));

        var thisCounter = parseInt(revDocStorer.countList.find(d => d.id === parID).counter);

        revDocStorer.countList.find(d => d.id === parID).counter = thisCounter - 1;

        switch (type) {
            case "pre":
                var date = new Date();
                var today = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
                var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

                selDoc.reviewed = true;
                selDoc.reviewCompleteDate = today + " " + time;

                var docObj = {
                    id: selDoc.id,
                    appID: selDoc.appId,
                    reviewCompleteDate: selDoc.reviewCompleteDate,
                    reviewed: true
                };

                SaveDocToDB(parID, modalID, docObj, "pre");
                break;
            case "wet":
                var date = new Date();
                var today = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
                var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

                selDoc.reviewed = true;
                selDoc.reviewCompleteDate = today + " " + time;

                var docObj = {
                    id: selDoc.id,
                    appID: selDoc.appId,
                    reviewCompleteDate: selDoc.reviewCompleteDate,
                    reviewed: true
                };

                SaveDocToDB(parID, modalID, docObj, "wet");
                break;
        }
    });
}

function SaveDocToDB(parID, mID, docData, type) {
    $(document).ready(function () {
        StartLoadingMeter("Please Wait...Saving Document...");

        $.ajax({
            contentType: "application/json; charset=utf-8",
            url: baseUrl + "Application/DocumentReview",
            type: "POST",
            data: JSON.stringify(docData)
        }).done(function () {
            //console.log(result);

            var revDocs = revDocStorer.revDocObjList.find(d => d.id === parID);

            var thisObj = data.dataList.find(d => d.id === parID);

            $("#" + parID + "-docRevTable").empty();
            $("#" + parID + "-docRevTable").append(
                DocumentReviewController(
                    parID,
                    thisObj.contextValue,
                    revDocs.docVals,
                    type,
                    true
                )
            );

            var trueModalID = mID.split("-");

            var thisCounter = parseInt(revDocStorer.countList.find(d => d.pref === parID.substring(0,3)).counter);

            if (thisCounter === 0) {
                var childIdObj = JSON.parse(sessionStorage.getItem("SPDChildIDs"));

                console.log(childIdObj);

                var cID = childIdObj.childIds[0];
                var cEl = data.dataList.find(d => d.id === cID);

                CheckboxEnableSwitcher(cEl.id);
                
            }

            closeDocRevModal(trueModalID[0]);

            CloseLoadingMeter();
        }).fail(function (response) {
            console.log(response);

            ErrorMessage("Error Saving Document!");
        });
    })
}

function EnableDocRevChildEl(id) {
    $(document).ready(function () {

        var cEl = data.dataList.find(c => c.id === id);

        switch (cEl.controlType) {
            case "checkbox":
            case "fraudbox":
                var tType = cEl.triggerType.split("_");

                if (tType.length > 1) {
                    switch (tType[0]) {
                        case "accordion":
                            $("#" + cEl.id).attr('disabled', false);
                            $("#" + cEl.id + "_label").removeClass("accordCB-container-disabled");
                            $("#" + cEl.id + "_label").addClass("accordCB-container");

                            $("#" + cEl.id + "_label").find("span").removeClass("accordCB-disabled");
                            $("#" + cEl.id + "_label").find("span").addClass("accordCB");
                            break;
                    }
                }
                else {
                    $("#" + cEl.id).attr('disabled', true);
                    $("#" + cEl.id + "_label").find("span").removeClass("checkmark-disabled");
                    $("#" + cEl.id + "_label").find("span").addClass("checkmark");
                }

                var childIDObj = JSON.parse(sessionStorage.getItem("SPDChildIDs"));
                if (parseInt(childIDObj.currEl) !== childIDObj.childIds.length) {
                    childIDObj.currEl = parseInt(childIDObj.currEl) + 1;
                }
                else {
                    childIDObj.currEl = childIDObj.childIds.length;
                }
                sessionStorage.setItem("SPDChildIDs", JSON.stringify(childIDObj));
                break;
            case "signpad":
                $("#" + cEl.id + "_SigPad_Div_Main").removeClass("signpad-disabled");

                $("#" + cEl.id + "_SigPad").removeAttr('style');

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
    });
}

function DisableDocRevChildEls(arr) {
    $(document).ready(function () {
        for (var c = 0; c < arr.length; c++) {
            var thisEl = data.dataList.find(d => d.id === arr[c]);

            switch (thisEl.controlType) {
                case "checkbox":
                case "fraudbox":
                    var tType = thisEl.triggerType.split("_");

                    if (tType.length > 1) {
                        switch (tType[0]) {
                            case "accordion":
                                $("#" + thisEl.id).attr('disabled', true);
                                $("#" + thisEl.id + "_label").removeClass("accordCB-container");
                                $("#" + thisEl.id + "_label").addClass("accordCB-container-disabled");
                                break;
                        }
                    }
                    else {
                        $("#" + thisEl.id).attr('disabled', true);
                        $("#" + thisEl.id + "_label").find("span").removeClass("checkmark");
                        $("#" + thisEl.id + "_label").find("span").addClass("checkmark-disabled");
                    }
                    break;
                case "signpad":
                    $("#" + thisEl.id + "_SigPad_Div_Main").addClass("signpad-disabled");

                    $("#" + thisEl.id + "_SigPad_saveBtnID").attr("disabled", true);
                    $("#" + thisEl.id + "_SigPad_saveBtnID").removeClass("signin-btn-form");
                    $("#" + thisEl.id + "_SigPad_saveBtnID").addClass("signin-btn-form-diabled");

                    $("#" + thisEl.id + "_SigPad_resetBtnID").attr("disabled", true);
                    $("#" + thisEl.id + "_SigPad_resetBtnID").removeClass("reset-btn-form");
                    $("#" + thisEl.id + "_SigPad_resetBtnID").addClass("reset-btn-form-diabled");
                    break;
            }
        }
    });
}

function LoadDocRevCounterCheck(parID) {
    $(document).ready(function () {

        var thisDataObj = data.dataList.find(d => d.id === parID);

        var pre = parID.substring(0, 3);
        var dtSplit = thisDataObj.dataType.split("_");

        if (pre.localeCompare("SUM") !== 0 && dtSplit[1].localeCompare("sum") !== 0) {
            var thisRevObj = revDocStorer.countList.find(d => d.id === parID);
            var thisCounter = 0;
            if (!isJSONObjEmpty(thisRevObj)) {
                thisCounter = parseInt(thisRevObj.counter);
            }

            var childIDObj = JSON.parse(sessionStorage.getItem("SPDChildIDs"));

            if (thisCounter === 0) {
                if (isJSONObjEmpty(childIDObj)) {
                    var childIDObj = sessionStorage.getItem("SPDChildIDs").split(",");

                    if (parID.localeCompare(childIDObj.parID) === 0) {
                        if (childIDObj.childIds.length !== 0) {
                            var get1stChildID = childIDObj.childIds[parseInt(childIDObj.currEl)];
                            var thisEl = data.dataList.find(d => d.id === get1stChildID);

                            DisableDocRevChildEls(childIDObj.childIds);
                            EnableDocRevChildEl(thisEl.id);
                        }
                    }
                } else {
                    var childIDObj = JSON.parse(sessionStorage.getItem("SPDChildIDs"));

                    if (parID.localeCompare(childIDObj.parID) === 0) {
                        if (childIDObj.childIds.length !== 0) {
                            var get1stChildID = childIDObj.childIds[parseInt(childIDObj.currEl)];
                            var thisEl = data.dataList.find(d => d.id === get1stChildID);

                            DisableDocRevChildEls(childIDObj.childIds);
                            EnableDocRevChildEl(thisEl.id);
                        }
                    }
                }
            } else {
                DisableDocRevChildEls(childIDObj.childIds);
            }
        }
    });
}
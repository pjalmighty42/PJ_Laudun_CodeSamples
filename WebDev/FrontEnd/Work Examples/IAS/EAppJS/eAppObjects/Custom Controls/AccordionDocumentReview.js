var revDocStorer = {
    revDocObjList: [],
    childElIds: [],
    countList: []
};

function AccordionDocumentReviewController(
    parentID,
    docRevObjList,
    devRevType,
    reload,
    accordionPanelObject
) {

    function DocRevObj(
        pID,
        documentPDFObjList,
        docType
    ) {
        this.parentID = !NullOrEmptyCheck(pID) ? pID : "";
        this.documentPDFObjList = documentPDFObjList !== null && documentPDFObjList.length > 0 ? documentPDFObjList : [];
        this.type = !NullOrEmptyCheck(docType) ? docType : "ERR! No documents!";
    };

    function CategorizeDocuments(storer) {
        var requiredDocs = [];
        var nonReqDocs = [];

        var output = [];

        var revCounter = 0;

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
        function CreateTableList(docObj) {
            let tableListArr = [];

            var thisDocStorer = revDocStorer.revDocObjList.find(d => d.id === docRevObj.parentID);
            thisDocStorer.type = docObj.type;

            var sortedArr;

            switch (docObj.type) {
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


            if (sortedArr.length > 0) {
                //Iterate through the list
                switch (docObj.type) {
                    case "pre":
                        for (let revObj = 0; revObj < sortedArr.length; revObj++) {

                            var thisRevItem = sortedArr[revObj];

                            if (thisRevItem.reviewRequired === true) {

                                //Create the button for the OTF (On-The-Fly) modal creation button
                                tableListArr.push("<tr class='revDocs-tr'>");
                                tableListArr.push("<td><button type='button' id='RevDoc_" + revObj + "' class= 'revDocs-modal-btn btn btn-info btn-block' data-toggle='modal' data-target='#RevDoc_" + revObj + "-modal' onclick='openModalRevDoc(this.id, " + thisRevItem.sequence + ", \"" + docRevObj.parentID + "\")' > " + thisRevItem.name + "</button ></td > ");

                                //If the document is required, apply a color to alert the user
                                let isReqColor = thisRevItem.reviewRequired === true ? "text-danger" : "";
                                let isReqText = thisRevItem.reviewRequired === true ? "Yes" : "No";
                                tableListArr.push("<td class='font-weight-bold " + isReqColor + "'>" + isReqText + "</td>");

                                let isReviewdIcon = !NullOrEmptyCheck(thisRevItem.reviewCompleteDate) ? "<i class='fa fa-check text-success'></i>" : "<i class='fa fa-exclamation text-danger'></i>";
                                tableListArr.push("<td>" + isReviewdIcon + "</td>");

                                //If the document has been signed, include the date here
                                tableListArr.push("</tr>");
                            }
                            else {
                                //Create the button for the OTF (On-The-Fly) modal creation button
                                tableListArr.push("<tr class='revDocs-tr'>");
                                tableListArr.push("<td><button type='button' id='RevDoc_" + revObj + "' class= 'revDocs-modal-btn btn btn-info btn-block' data-toggle='modal' data-target='#RevDoc_" + revObj + "-modal' onclick='openModalRevDoc(this.id, " + thisRevItem.sequence + ", \"" + docRevObj.parentID + "\")' > " + thisRevItem.name + "</button ></td > ");

                                //If the document is required, apply a color to alert the user
                                tableListArr.push("<td class='font-weight-bold'>No</td>");
                                tableListArr.push("<td><i class='fa fa-minus-square'></i></td>");

                                tableListArr.push("</tr>");
                            }
                        }
                        break;
                    case "wet":
                        for (let revObj = 0; revObj < sortedArr.length; revObj++) {

                            var thisRevItem = sortedArr[revObj];

                            if (thisRevItem.reviewRequired === true) {

                                //Create the button for the OTF (On-The-Fly) modal creation button
                                tableListArr.push("<tr class='revDocs-tr'>");
                                tableListArr.push("<td><button type='button' id='WetSig_" + revObj + "' class= 'revDocs-modal-btn btn btn-info btn-block' data-toggle='modal' data-target='#WetSig_" + revObj + "-modal' onclick='openModalWetSig(this.id, " + thisRevItem.sequence + ", \"" + docRevObj.parentID + "\")' > " + thisRevItem.name + "</button ></td > ");

                                //If the document is required, apply a color to alert the user
                                let isReqColor = thisRevItem.signatureRequired === true ? "text-danger" : "";
                                let isReqText = thisRevItem.signatureRequired === true ? "Yes" : "No";
                                tableListArr.push("<td class='font-weight-bold " + isReqColor + "'>" + isReqText + "</td>");

                                let revDate = thisRevItem.reviewCompleteDate.split(" ");
                                let date = !NullOrEmptyCheck(revDate[0]) ? revDate[0] : "";

                                let issignedIcon = !NullOrEmptyCheck(date) ? "<i class='fa fa-check text-success'></i>" : "<i class='fa fa-exclamation text-danger'></i>";
                                tableListArr.push("<td>" + issignedIcon + "</td>");
                                tableListArr.push("<td>" + date + "</td>");
                                //If the document has been signed, include the date here
                                tableListArr.push("</tr>");
                            }
                            else {
                                //Create the button for the OTF (On-The-Fly) modal creation button
                                tableListArr.push("<tr class='revDocs-tr'>");
                                tableListArr.push("<td><button type='button' id='WetSig_" + revObj + "' class= 'revDocs-modal-btn btn btn-info btn-block' data-toggle='modal' data-backdrop='static' data-keyboard='false' data-target='#WetSig_" + revObj + "-modal' onclick='openModalWetSig(this.id, " + thisRevItem.sequence + ", \"" + docRevObj.parentID + "\")' > " + thisRevItem.name + "</button ></td > ");

                                //If the document is required, apply a color to alert the user
                                tableListArr.push("<td class='font-weight-bold'>No</td>");
                                tableListArr.push("<td><i class='fa fa-minus-square'></i></td>");
                                tableListArr.push("<td></td>");
                                tableListArr.push("</tr>");
                            }
                        }
                        break;
                    case "sum":
                        for (let revObj = 0; revObj < sortedArr.length; revObj++) {
                            var thisRevItem = sortedArr[revObj];

                            tableListArr.push("<tr class='revDocs-tr'>");
                            tableListArr.push("<td><button type='button' id='SignDoc_" + revObj + "' class= 'revDocs-modal-btn btn btn-info btn-block' data-toggle='modal' data-target='#RevDoc_" + revObj + "-modal' onclick='openModalSumDoc(this.id, " + thisRevItem.sequence + ", \"" + docRevObj.parentID + "\")' > " + thisRevItem.name + "</button ></td > ");
                            tableListArr.push("</tr>");
                        }

                        revDocStorer.countList.push({ id: docObj.parentID, counter: 0, pref: docObj.parentID.substring(0, 3) });

                        break;
                }
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

                tableListArr.push("<tr class='revDocs-tr'>");
                tableListArr.push("<td colspan='" + colspanAmt + "'>No Documents to Review. Please fully complete this Application to get a full list of Documents to Review.</td>");
                tableListArr.push("</tr>");
            }

            return CreateElement(tableListArr);
        };

        //Create the table header
        let tableContArr = [];
        let tableTHs = [];

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

        let docRevTR = (input) => { return `<th class='revDocs-header'>${input}</th>`  };

        let trOut = tableTHs.map(tr => {
            return docRevTR(tr);
        });

        let docRevTemplate = (tabListObj) => {
            return `<div id="${docRevObj.parentID}"-docRevTable' class='docRevTable-container'>
                    <h3>Documents to Review</h3>
                    <div class="docRevTable">
                    <table class="table table-striped table-hover">
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
                    </div>`
        };

        /*

        tableContArr.push("<div id='" + docRevObj.parentID + "-docRevTable' class='docRevTable-container'>");
        tableContArr.push("<h3>Documents to Review</h3>");
        tableContArr.push("<div class='docRevTable'>");
        tableContArr.push("<table class='table table-striped table-hover'>");
        tableContArr.push("<thead>");
        tableContArr.push("<tr class='revDocs-tr'>");
        for (let ths = 0; ths < tableTHs.length; ths++) {
            tableContArr.push("<th class='revDocs-header'>" + tableTHs[ths] + "</th>");
        }
        tableContArr.push("</tr>");
        tableContArr.push("</thead>");

        //Call and include the body
        tableContArr.push("<tbody>");
        tableContArr.push(CreateTableList(docRevObj));
        tableContArr.push("</tbody>");

        tableContArr.push("</table>");
        tableContArr.push("</div>");
        tableContArr.push("</div>");
        */

        return CreateElement(docRevTemplate(CreateTableList(docRevObj)));
    };

    revDocStorer.revDocObjList = [];
    revDocStorer.childElIds = [];

    let accordionObject = [];

    //Else create the Accordion
    accordionObject.push("<div id='" + parentID + "-div' class='col-md-12'>");
    
    let accrdPanObjs = [];

    for (var apo = 0; apo < accordionPanelObject.length; apo++) {
        if (typeof accordionPanelObject[apo].childElsArr !== 'undefined') {
            accrdPanObjs.push(CreateTriggerEls(accordionPanelObject[apo]));
        }
        else {
            accrdPanObjs.push(outputControl(accordionPanelObject[apo]));
        }
    }

    accordionObject.push("<div id='" + parentID + "-ParentID'>");
    accordionObject.push("<div class='card'>");
    accordionObject.push("<div class='card-header'>");
    accordionObject.push(CreateTableContainer(
        new DocRevObj(
            parentID,
            docRevObjList,
            devRevType
        ),
        reload
    ));
    accordionObject.push("</div>");
    accordionObject.push("<div id='" + parentID + "-DDAccordID' class ='collapse show' data-parent='#" + parentID + "-ParentID'>");
    accordionObject.push("<div class='card-body'>");
    accordionObject.push(CreateElement(accrdPanObjs));
    accordionObject.push("</div>");
    accordionObject.push("</div>");
    accordionObject.push("</div>");
    accordionObject.push("</div>");

    accordionObject.push("</div>");

    return accordionObject;

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

                var modal = [];

                var date = new Date();

                if (!NullOrEmptyCheck(docRevDate)) {
                    date = new Date(docRevDate);
                }
                else {
                    date = new Date();
                }
                var today = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

                modal.push("<div class='modal fade revDocs-modal-container' id='" + docId + "-modal'>");
                modal.push("<div class='modal-dialog'>");
                modal.push("<div class='modal-content'>");

                modal.push("<div class='modal-header'>");
                modal.push("<h3 class='modal-title'>" + docName + "</h3>");
                modal.push("<button id='" + docId + "' type='button' class='close' onclick='closeDocRevModal(this.id)'>&times;</button>");
                modal.push("</div>");

                modal.push("<div class='modal-body'>");
                if (isReq === true) {
                    modal.push("<h4 class='modal-title'>Please review this document for completeness and accuracy, and check the box below.</h4>");
                }

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

                    modal.push(PDFViewerController(window.navigator.msSaveOrOpenBlob(blob, docName)));
                    //window.navigator.msSaveOrOpenBlob(blob, docName);
                } else {
                    // Directly use base 64 encoded data for rest browsers (not IE)
                    var base64EncodedPDF = docSrc;
                    var dataURI = "data:application/pdf;base64," + base64EncodedPDF;
                    modal.push(PDFViewerController(dataURI));
                }

                if (isReq === true) {
                    modal.push("<div class='question-block col-12'>");

                    if (count > 0) {
                        if (!NullOrEmptyCheck(docRevDate)) {
                            modal.push(CheckboxController(
                                true,
                                docId,
                                "question-label",
                                docId + "-checkbox",
                                "question-radio-option",
                                "I attest that this document is complete and accurate to the best of my abilities today, " + today,
                                isReq,
                                false,
                                true,
                                "onchange='DocumentAccept(\"" + pId + "\", \"" + docId + "-modal\"," + seqNum + ", \"pre\")'"
                            )
                            );
                        }
                        else {
                            modal.push(CheckboxController(
                                true,
                                docId,
                                "question-label",
                                docId + "-checkbox",
                                "question-radio-option",
                                "I attest that this document is complete and accurate to the best of my abilities today, " + today,
                                isReq,
                                true,
                                false,
                                "onchange='DocumentAccept(\"" + pId + "\", \"" + docId + "-modal\"," + seqNum + ", \"pre\")'"
                            )
                            );
                        }
                    }
                    else {
                        modal.push(CheckboxController(
                            true,
                            docId,
                            "question-label",
                            docId + "-checkbox",
                            "question-radio-option",
                            "I attest that this document is complete and accurate to the best of my abilities today, " + today,
                            false,
                            false,
                            true,
                            ""
                        )
                        );
                    }

                    modal.push("</div>");
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
                    selDoc.reviewCompleteDate,
                    selDoc.reviewRequired,
                    selDoc.review,
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

            $("#" + parID + "-docRevTable").empty();
            $("#" + parID + "-docRevTable").append(
                DocumentReviewController(
                    parID,
                    revDocs.docVals,
                    type,
                    true
                )
            );

            var trueModalID = mID.split("-");

            var thisCounter = parseInt(revDocStorer.countList.find(d => d.pref === parID.substring(0, 3)).counter);

            if (thisCounter === 0) {
                //var pre = parID.substring(0, 3);

                //if (pre.localeCompare("SPD") === 0) {
                //    var childIds = sessionStorage.getItem("SPDChildIDs").split(",");

                //    var cID = childIds[0];
                //    var cEl = data.dataList.find(d => d.id === cID);

                //    for (var c = 0; c < cEl.childElementIDs.length; c++) {
                //        revDocStorer.childElIds.push(cEl.childElementIDs[c].replace(/\s/g, ''));
                //    }

                //    CheckboxEnableSwitcher(cEl.id);
                //}
                //else {
                //    var childIds = sessionStorage.getItem("SPDChildIDs").split(",");

                //    CheckboxEnableSwitcher(childIds[0]);

                //}
                var childIds = sessionStorage.getItem("SPDChildIDs").split(",");

                var cID = childIds[0];
                var cEl = data.dataList.find(d => d.id === cID);

                for (var c = 0; c < cEl.childElementIDs.length; c++) {
                    revDocStorer.childElIds.push(cEl.childElementIDs[c].replace(/\s/g, ''));
                }

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

function LoadCounterCheck(parID) {
    $(document).ready(function () {
        var pre = parID.substring(0, 3);

        var thisRevObj = revDocStorer.countList.find(d => d.id === parID);
        var thisCounter = 0;
        if (!isJSONObjEmpty(thisRevObj)) {
            thisCounter = parseInt(thisRevObj.counter);
        }

        if (pre.localeCompare("SPD") === 0) {
            if (thisCounter === 0) {
                var childIDs = sessionStorage.getItem("SPDChildIDs").split(",");

                var thisEl = data.dataList.find(d => d.id === childIDs[0]);

                for (var c = 0; c < thisEl.childElementIDs.length; c++) {
                    var cID = thisEl.childElementIDs[c].replace(/\s/g, '');
                    var cEl = data.dataList.find(d => d.id === cID);

                    switch (cEl.controlType) {
                        case "checkbox":
                            var tType = cEl.triggerType.split("_");

                            if (tType.length > 1) {
                                switch (tType[0]) {
                                    case "accordion":
                                        $("#" + cID).attr('disabled', false);
                                        $("#" + cID + "_label").removeClass("accordCB-container-disabled");
                                        $("#" + cID + "_label").addClass("accordCB-container");
                                        break;
                                }
                            }
                            else {
                                $("#" + cID).attr('disabled', false);
                                $("#" + cID + "_label").find("span").removeClass("checkmark-disabled");
                                $("#" + cID + "_label").find("span").addClass("checkmark");
                            }
                            break;
                        case "input":
                            $("#" + cID).attr('disabled', false);
                            break;
                        case "signpad":
                            var savedPenColor = siteItemStorage.signatureBlocks.find(p => p.id === cID);
                            var valSplit = cEl.contextValue.split(" ");

                            $("#" + cID + "-div").empty();
                            if (valSplit[0].localeCompare("Agent") === 0) {
                                $("#" + cID + "-div").append(
                                    SignaturePadController(
                                        cID,
                                        "sign-pad",
                                        baseUrl + "resources/eApp/img/PleaseSignHereBGAgent.png",
                                        cEl.contextValue,
                                        savedPenColor,
                                        true,
                                        true,
                                        cEl.answer
                                    )
                                );
                            }
                            else {
                                $("#" + cID + "-div").append(
                                    SignaturePadController(
                                        cID,
                                        "sign-pad",
                                        baseUrl + "resources/eApp/img/PleaseSignHereBGApplicant.png",
                                        cEl.contextValue,
                                        savedPenColor,
                                        true,
                                        false,
                                        cEl.answer
                                    )
                                );
                            }
                            sessionStorage.setItem("CurrParID", thisEl.id);

                            InitalizeSignaturePad(cID + "_SigPad", cID + "_SigPad_saveBtnID", cID + "_SigPad_resetBtnID", savedPenColor);
                            break;
                    }
                }

            }
            else {
                var childIDs = sessionStorage.getItem("SPDChildIDs").split(",");

                for (var c = 0; c < childIDs.length; c++) {
                    var cData = data.dataList.find(d => d.id === childIDs[c]);
                    cData.answer = "";

                    $("#" + cData.id).attr('disabled', true);
                    $("#" + cData.id + "_label").find("span").removeClass("checkmark");
                    $("#" + cData.id + "_label").find("span").addClass("checkmark-disabled");

                    $("#" + cData.id + "-DDAccordID").removeClass("show");
                }
            }
        }
        else {
            if (thisCounter === 0) {
                var thisEl = data.dataList.find(d => d.id === parID);

                for (var c = 0; c < thisEl.childElementIDs.length; c++) {
                    var cID = thisEl.childElementIDs[c].replace(/\s/g, '');
                    var cEl = data.dataList.find(d => d.id === cID);

                    switch (cEl.controlType) {
                        case "checkbox":
                            var tType = cEl.triggerType.split("_");

                            if (tType.length > 1) {
                                switch (tType[0]) {
                                    case "accordion":
                                        $("#" + cID).attr('disabled', false);
                                        $("#" + cID + "_label").removeClass("accordCB-container-disabled");
                                        $("#" + cID + "_label").addClass("accordCB-container");
                                        break;
                                }
                            }
                            else {
                                $("#" + cID).attr('disabled', false);
                                $("#" + cID + "_label").find("span").removeClass("checkmark-disabled");
                                $("#" + cID + "_label").find("span").addClass("checkmark");
                            }
                            break;
                        case "input":
                            $("#" + cID).attr('disabled', false);
                            break;
                        case "signpad":
                            var savedPenColor = siteItemStorage.signatureBlocks.find(p => p.id === cID);
                            var valSplit = cEl.contextValue.split(" ");

                            $("#" + cID + "-div").empty();
                            if (valSplit[0].localeCompare("Agent") === 0) {
                                $("#" + cID + "-div").append(
                                    SignaturePadController(
                                        cID,
                                        "sign-pad",
                                        baseUrl + "resources/eApp/img/PleaseSignHereBGAgent.png",
                                        cEl.contextValue,
                                        savedPenColor,
                                        true,
                                        true,
                                        cEl.answer
                                    )
                                );
                            }
                            else {
                                $("#" + cID + "-div").append(
                                    SignaturePadController(
                                        cID,
                                        "sign-pad",
                                        baseUrl + "resources/eApp/img/PleaseSignHereBGApplicant.png",
                                        cEl.contextValue,
                                        savedPenColor,
                                        true,
                                        false,
                                        cEl.answer
                                    )
                                );
                            }
                            sessionStorage.setItem("CurrParID", thisEl.id);

                            InitalizeSignaturePad(cID + "_SigPad", cID + "_SigPad_saveBtnID", cID + "_SigPad_resetBtnID", savedPenColor);
                            break;
                    }
                }

                revDocStorer.countList.splice(revDocStorer.countList.findIndex(c => c.id === parID, 1));
            }
            else {
                var childIDs = sessionStorage.getItem("SPDChildIDs").split(",");

                for (var c = 0; c < childIDs.length; c++) {
                    var cData = data.dataList.find(d => d.id === childIDs[c]);
                    cData.answer = "";

                    $("#" + cData.id).attr('disabled', true);
                    $("#" + cData.id + "_label").find("span").removeClass("checkmark");
                    $("#" + cData.id + "_label").find("span").addClass("checkmark-disabled");

                    $("#" + cData.id + "-DDAccordID").removeClass("show");
                }
            }
        }

    });
}
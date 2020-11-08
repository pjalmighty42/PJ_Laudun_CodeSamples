function FraudModalController(
    modalLinkId,
    modalLinkVal,
    modalSecondaryVal
) {

    //Objects
    function ModalObj(
        modalLinkId,
        modalLinkVal,
        modalSecondaryVal
    ) {
        this.modalLinkId = modalLinkId;
        this.modalLinkVal = modalLinkVal;
        this.modalSecondVal = modalSecondaryVal;
    };


    function CreateModalComponent(modalObj) {
        let modalObjArr = [];

        modalObjArr.push("<div id='" + modalObj.modalLinkId + "' class='modal fade info-modal'>");
        modalObjArr.push("<div class='modal-dialog modal-dialog-centered modal-lg'>");
        modalObjArr.push("<div class='modal-content'>");
        modalObjArr.push("<div class='modal-header'>");
        modalObjArr.push("<h3 class='modal-title'>" + modalObj.modalLinkVal + "</h3>");
        modalObjArr.push("</div>");
        modalObjArr.push("<div class='modal-body'>");
        modalObjArr.push(modalObj.modalSecondVal);
        modalObjArr.push("</div>");
        modalObjArr.push("<div class='modal-footer'>");
        modalObjArr.push("<button class='btn btn-lg signin-btn-form' size=28 data-toggle='modal' onclick='AcceptFraudCheck(this.id)'><i class='fa fa-check'></i> I Accept!</button>");
        modalObjArr.push("</div>");
        modalObjArr.push("</div>");
        modalObjArr.push("</div>");
        modalObjArr.push("</div>");

        return CreateElement(modalObjArr);
    };

    return CreateModalComponent(
        new ModalObj(
            modalLinkId,
            modalLinkVal,
            modalSecondaryVal
        )
    );
}
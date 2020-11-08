var fraudModalContainerData = [];

//The controller function to create the actual modal link
function FraudModalComponentController(
    modalLinkId,
    modalLinkHeaderVal,
    modalBodyItem,
    isModalLarge
) {
    //Objects
    function ModalObj(
        modalLinkId,
        modalLinkHeaderVal,
        modalBodyItem,
        isModalLarge
    ) {
        this.modalLinkId = modalLinkId;
        this.modalLinkHeaderVal = !NullOrEmptyCheck(modalLinkHeaderVal) ? modalLinkHeaderVal : "";
        this.modalBodyItem = modalBodyItem;
        this.isModalLarge = !NullOrEmptyCheck(isModalLarge) && isModalLarge === true ? 'class="modal-dialog modal-dialog-centered modal-lg"' : 'class="modal-dialog modal-dialog-centered"';
    };

    fraudModalContainerData.push({
        id: modalLinkId,
        modalObj: new ModalObj(
            modalLinkId,
            modalLinkHeaderVal,
            modalBodyItem,
            isModalLarge
        )
    });

    return CreateModalComponent(
        new ModalObj(
            modalLinkId,
            modalLinkHeaderVal,
            modalBodyItem,
            isModalLarge
        )
    );
};

function CreateFraudModalComponent(modalObj) {
    let modalObjArr = [];

    modalObjArr.push("<div id='" + modalObj.modalLinkId + "' class='modal fade info-modal' role='dialog'>");
    modalObjArr.push("<div " + modalObj.isModalLarge + " role='document'>");
    modalObjArr.push("<div class='modal-content'>");
    modalObjArr.push("<div class='modal-header'>");
    modalObjArr.push("<h3 class='modal-title'><i class='fa fa-exclamation-triangle fa-2x'></i>" + modalObj.modalLinkHeaderVal + "</h3>");
    modalObjArr.push("</div>");
    modalObjArr.push("<div class='modal-body'>");
    modalObjArr.push(modalObj.modalBodyItem);
    modalObjArr.push("</div>");
    modalObjArr.push("<div class='modal-footer'>");
    modalObjArr.push("<button type='button' class='btn btn-primary' onclick='AcceptFraudWarning();'>I Agree</button>");
    modalObjArr.push("</div>");
    modalObjArr.push("</div>");
    modalObjArr.push("</div>");
    modalObjArr.push("</div>");

    return CreateElement(modalObjArr);
};

function OpenFraudModalComp(modalId) {
    $("#" + modalId).modal({ backdrop: 'static', keyboard: false });
    $("#" + modalId).modal('show');
}
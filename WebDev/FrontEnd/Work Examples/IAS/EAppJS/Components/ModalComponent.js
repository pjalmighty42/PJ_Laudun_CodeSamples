class ModalObj {
    constructor(
        modalLinkId = "",
        modalLinkClass = "",
        modalLinkVal = "",
        modalLinkHeaderVal = "",
        modalBodyItem = "",
        hasCloseButton = true,
        isModalLarge = false,
        callBack = "",
        isFAQ = false
    ) {
        this.callBackFn = !NullOrEmptyCheck(callBack) ? callBack : "CloseModal(this.id)";

        this.modalLinkId = modalLinkId;
        this.modalLinkClass = !NullOrEmptyCheck(modalLinkClass) ? modalLinkClass : "";
        this.modalLinkVal = modalLinkVal;
        this.modalLinkHeaderVal = !NullOrEmptyCheck(modalLinkHeaderVal) ? modalLinkHeaderVal : "";
        this.modalBodyItem = modalBodyItem;
        this.hasCloseButton = !NullOrEmptyCheck(hasCloseButton) && hasCloseButton === true ? "<button id='" + modalLinkId + "' type='button' class='btn btn-danger' onclick='" + this.callBackFn + "'>Close</button>" : "";
        this.isModalLarge = !NullOrEmptyCheck(isModalLarge) && isModalLarge === true ? 'class="modal-dialog modal-dialog-centered modal-lrg"' : 'class="modal-dialog modal-dialog-centered"';

        this.IsFAQ = isFAQ;
    }
}

var modalContainerData = [];

//The controller function to create the actual modal link
function ModalComponentController(
    modalLinkId,
    modalLinkClass,
    modalLinkVal,
    modalLinkHeaderVal,
    modalBodyItem,
    hasCloseButton,
    isModalLarge,
    callBackFn,
    isFaq
) {
    function CreateCreateModalContainer(modalObj) {
        let modalObjArr = [];

        if (modalObj.IsFAQ) {
            modalObjArr.push("<div id='" + modalObj.modalLinkId + "-faq' class='faq-question-container'>");
            modalObjArr.push("<div class='faq-question' data-toggle='modal' onclick='OpenModalComp(\"" + modalObj.modalLinkId + "\")'>Q</div>");
            modalObjArr.push("<button class='" + modalObj.modalLinkClass + "' data-toggle='modal' onclick='OpenModalComp(\"" + modalObj.modalLinkId + "\")'>" + modalObj.modalLinkVal + "</button>");
            modalObjArr.push("</div>");
        }
        else {
            modalObjArr.push("<button class='" + modalObj.modalLinkClass + "' data-toggle='modal' onclick='OpenModalComp(\"" + modalObj.modalLinkId + "\")'>" + modalObj.modalLinkVal + "</button>");
        }

        return CreateElement(modalObjArr);
    };

    modalContainerData.push({
        id: modalLinkId,
        modalObj: new ModalObj(
            modalLinkId,
            modalLinkClass,
            modalLinkVal,
            modalLinkHeaderVal,
            modalBodyItem,
            hasCloseButton,
            isModalLarge,
            callBackFn,
            isFaq
        )
    });

    return CreateCreateModalContainer(
        new ModalObj(
            modalLinkId,
            modalLinkClass,
            modalLinkVal,
            modalLinkHeaderVal,
            modalBodyItem,
            hasCloseButton,
            isModalLarge,
            callBackFn,
            isFaq
        )
    ); 
};

function CreateModalComponent(modalObj) {
    let modalObjArr = [];

    modalObjArr.push("<div id='" + modalObj.modalLinkId + "' class='modal fade info-modal'>");
    modalObjArr.push("<div " + modalObj.isModalLarge + ">");
    modalObjArr.push("<div class='modal-content'>");
    modalObjArr.push("<div class='modal-header'>");
    modalObjArr.push("<h3 class='modal-title'>" + modalObj.modalLinkHeaderVal + "</h3>");
    modalObjArr.push("<button id='" + modalObj.modalLinkId + "' type='button' class='close' onclick='" + modalObj.callBackFn + "'>&times;</button>");
    modalObjArr.push("</div>");
    modalObjArr.push("<div class='modal-body'>");
    modalObjArr.push(modalObj.modalBodyItem);
    modalObjArr.push("</div>");
    modalObjArr.push("<div class='modal-footer'>");
    modalObjArr.push(modalObj.hasCloseButton);
    modalObjArr.push("</div>");
    modalObjArr.push("</div>");
    modalObjArr.push("</div>");
    modalObjArr.push("</div>");

    return CreateElement(modalObjArr);
};

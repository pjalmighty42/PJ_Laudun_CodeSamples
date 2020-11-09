class CIGObject {
    constructor(
        id = "",
        buttonValue = "",
        cardBodyItems = [],
        autoShow = false
    ) {
        this.id = !NullOrEmptyCheck(id) ? id : "";
        this.buttonValue = buttonValue;
        this.cardBodyItems = cardBodyItems;
        this.autoShow = !NullOrEmptyCheck(autoShow) && autoShow === true ? "show" : "";
    }
}

const CollapsibleInfoGroupController = (id, buttonValue, cardBodyItems, autoShow) => {
    const CollapsibleInfoGroup = (colInfoObj) => {

        let parentID = colInfoObj.id + "-Parent";
        let accordionID = colInfoObj.id + "-Accordion";

        return `<div id='${parentID}' class='info-card'>
                <div class='card'>
                <div class='card-header'>
                <h5 class='mb-0'>
                <a class='card-link popover-info' data-toggle='collapse' href='#${accordionID}' aria-expanded='false'> <i class='fa fa-question-circle'></i> ${buttonValue}</a>
                </h5>
                <div id='${colInfoObj.id}-alertDiv'></div>
                </div>
                <div id='${accordionID}' class ='collapse ${colInfoObj.autoShow}' data-parent='#${parentID}'>
                <div class='card-body'>
                ${colInfoObj.cardBodyItems}
                </div>
                </div>
                </div>
                </div>`;
    };

    return CollapsibleInfoGroup(
        new CIGObject(
            id,
            buttonValue,
            cardBodyItems,
            autoShow,
            isRequired
        )
    );
};

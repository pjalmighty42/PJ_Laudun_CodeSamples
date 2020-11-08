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

function CollapsibleInfoGroupController(
    id,
    buttonValue,
    cardBodyItems,
    autoShow
){
    function CollapsibleInfoGroup(colInfoObj){
        let collapsibleCardObject = [];

        let parentID = colInfoObj.id + "-Parent";
        let accordionID = colInfoObj.id + "-Accordion";

        collapsibleCardObject.push("<div id='" + parentID + "' class='info-card'>");
        collapsibleCardObject.push("<div class='card'>");
        collapsibleCardObject.push("<div class='card-header'>");
        collapsibleCardObject.push("<h5 class='mb-0'>");
        collapsibleCardObject.push("<a class='card-link popover-info' data-toggle='collapse' href='#" + accordionID + "' aria-expanded='false'> <i class='fa fa-question-circle'></i> " + buttonValue + "</a>");
        collapsibleCardObject.push("</h5>");
        collapsibleCardObject.push("<div id='" + colInfoObj.id + "-alertDiv'></div>");
        collapsibleCardObject.push("</div>");
        collapsibleCardObject.push("<div id='" + accordionID + "' class ='collapse " + colInfoObj.autoShow + "' data-parent='#" + parentID + "'>");
        collapsibleCardObject.push("<div class='card-body'>");
        collapsibleCardObject.push(colInfoObj.cardBodyItems);
        collapsibleCardObject.push("</div>");
        collapsibleCardObject.push("</div>");
        collapsibleCardObject.push("</div>");
        collapsibleCardObject.push("</div>");

        return CreateElement(collapsibleCardObject);
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

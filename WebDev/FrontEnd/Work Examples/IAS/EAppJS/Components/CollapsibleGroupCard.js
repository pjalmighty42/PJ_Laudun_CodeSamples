//Objects
function CollapsibleCardObj(
    divID,
    parentID,
    accordionID,
    buttonClass,
    buttonValue,
    autoShow,
    cardBodyItems,
    enabled,
    required
) {
    this.divID = divID;
    this.parentID = parentID;
    this.accordionID = accordionID;
    this.buttonClass = buttonClass;
    this.buttonValue = buttonValue;
    this.autoShow = autoShow;
    this.cardBodyItems = cardBodyItems;
    this.IsEnabled = enabled === true ? true : false;
    this.IsRequired = required === true ? true : false; 
};

function ModifyCardObj(
    collapsibleCardObj,
    index
) {
    collapsibleCardObj.id = collapsibleCardObj.id + "_" + index;

    siteItemStorage.ccgData.cardGroupItems.push(collapsibleCardObj);
};

// This will create the Collapsible Card item that will be inputed into the container 
function CreateCollapsibleGroupCard(
    cardItem,
    index
) {
    let collapsibleCardObject = [];
    let collCardOutput = "";

    let ccgItems = siteItemStorage.ccgData.cardGroupItems;

    collapsibleCardObject.push("<div class='card'>");
    collapsibleCardObject.push("<div class='card-header'>");
    collapsibleCardObject.push("<h5 class='mb-0'>");
    collapsibleCardObject.push("<a class='card-link " + cardItem.buttonClass + "' data-toggle='collapse' href='#" + cardItem.accordionID + "_" + index + "' aria-expanded='false'>" + cardItem.value + "</a>");
    collapsibleCardObject.push("</h5>");
    collapsibleCardObject.push("</div>");
    collapsibleCardObject.push("<div id='" + cardItem.accordionID + "_" + index + "' class ='collapse " + cardItem.autoShow + "' data-parent='#" + cardItem.parentID + "'>");
    collapsibleCardObject.push("<div class='card-body'>");
    for (let cgi = 0; cgi < ccgItems.length; cgi++) {
        collapsibleCardObject.push(outputControl(ccgItems[cgi]));
    }
    collapsibleCardObject.push("</div>");
    collapsibleCardObject.push("</div>");
    collapsibleCardObject.push("</div>");

    collCardOutput = CreateElement(collapsibleCardObject);

    siteItemStorage.ccgData.cardGroupItems = [];

    return collCardOutput;
};


function CreateCollapsibleGroupCardSelection(
    parentID,
    cardArr,
    index
) {
    let collapsibleCardObject = [];
    let collCardOutput = "";

    collapsibleCardObject.push("<div class='card'>");
    collapsibleCardObject.push("<div class='card-header'>");
    collapsibleCardObject.push("<h5 class='mb-0'>");
    collapsibleCardObject.push("<a class='card-link' data-toggle='collapse' href='#" + parentID + "_" + index + "' aria-expanded='false'>Item " + (index + 1) + "</a>");
    collapsibleCardObject.push("</h5>");
    collapsibleCardObject.push("</div>");
    collapsibleCardObject.push("<div id='" + parentID + "_" + index + "' class ='collapse data-parent='#" + parentID + "-Parent'>");
    collapsibleCardObject.push("<div class='card-body'>");

    for (let cgi = 0; cgi < cardArr.length; cgi++) {
        
        collapsibleCardObject.push(outputControl(cardArr[cgi]));
    }

    collapsibleCardObject.push("</div>");
    collapsibleCardObject.push("</div>");
    collapsibleCardObject.push("</div>");

    collCardOutput = CreateElement(collapsibleCardObject);

    siteItemStorage.ccgData.cardGroupItems = [];

    return collCardOutput;
};

//This will take any Collapsible Card item and marry it to the Parent ID (both are manditory)
function CollapsibleGroupContainer(
    parentID,
    cardItem
) {
    if (cardItem === null) {
        console.log("ERROR! A Card Item is needed! Please check your code and input both a Parent ID and Card Item!");
    }
    else {
        let collapsibleGroupObject = [];
        let collapsibleGroup = "";

        collapsibleGroupObject.push("<div id='" + parentID + "'>");
        collapsibleGroupObject.push(cardItem);
        collapsibleGroupObject.push("</div>");

        collapsibleGroup = CreateElement(collapsibleGroupObject);
        return collapsibleGroup;
    }
};


//Controller Function that will pass in all the information and output the full Collapsible Card Group element for the page (+9 params)
function CollapsibleGroupCardController(
    divID,
    buttonClass,
    buttonValue,
    autoShow,
    dropdownObj,
    dropdownSelectID,
    gridCount,
    isEnabled,
    isRequired
) {
    //Both a dropdown and it's ID are needed to not also piece together the actual card, but to also for the event listener needed to add/remove Card objects
    if (dropdownObj === "" || dropdownSelectID === "") {
        console.log("ERROR! In order to use the Collapsible Card Group, a Dropdown element is needed! Please add one and try again!");
    }
    else {
        let cgc = [];
        let cgcOutput = "";
        //console.log(JSON.parse(cardBodyItems));

        //Initalize the Card Object so we could store information
        let newCard = new CollapsibleCardObj(
            divID + "-cardContainer",
            divID + "-Parent",
            divID + "-AccordID",
            buttonClass,
            buttonValue,
            autoShow,
            siteItemStorage.ccgData.baseCardChildItems,
            isEnabled,
            isRequired
        );

        var gridOut = NullOrEmptyCheck(gridCount) ? "col-sm-12 col-md-12 col-lg-12" : gridCount;

        // Every check is good, create the base container
        cgc.push("<div id='" + divID + "-cgcContainer' class='ccg-divs " + gridOut + "'>");
        cgc.push("<div id='" + divID + "-alertDiv'></div>");
        // Then the dropdown container that will house the dropdown element we need for events
        cgc.push("<div id='" + divID + "-ddContainer'>");
        cgc.push(dropdownObj);
        cgc.push("</div>");
        cgc.push("<hr />");
        //If you look at the actual function, this will create the container for all cards, the 1st param will create the ID needed for events
        //Initally the passed in array will be empty, it will only add cards if a dropdown number value is selected
        cgc.push(
            CollapsibleGroupContainer(
                newCard.parentID,
                []
            )
        );
        cgc.push("</div>");

        //Create and output the INITAL element (an event listener will take it from here, but we need a blank HTML element to start)
        cgcOutput = CreateElement(cgc);

        return cgcOutput;
    }
};

function ApplyCCG(data) {

    if (data.responses > 0) {
        if (!NullOrEmptyCheck(data.responses[0].value)) {
            CollapsibleCardAddCards(data.id, data.responses[0].value);
        }
        else {
            CollapsibleCardAddCards(data.id);
        }
    }
}

function AutoAssignCCG(id, val) {
    $(document).ready(function () {
        function deepFreeze(object) {
            return Object.freeze(object);
        };

        var cards = [];
        var cardArr = [];
        var cardItems;

        var trueID = id.split("_")[0];

        for (var ci = 0; ci < siteItemStorage.ccgData.baseCardChildItems.length; ci++) {
            if (siteItemStorage.ccgData.baseCardChildItems[ci].parentID.toLowerCase() === trueID.toLowerCase()) {
                cardItems = siteItemStorage.ccgData.baseCardChildItems[ci];
            }
        }

        // Get the card container ID and remove the contents in it
        $("#" + trueID + "-Parent").empty();

        if (parseInt(val) > 0) {
            //Because the base card Items will be our reference items
            //We will clear out our modifiedChildItems array
            var baseChildItems = [];

            for (var i = 0; i < cardItems.children.length; i++) {
                baseChildItems.push(deepFreeze(cardItems.children[i]));
            }

            for (var i = 0; i < amt; i++) {

                var modifiedChildItems = [];

                var newObj = $.extend(modifiedChildItems, baseChildItems);

                for (var n = 0; n < newObj.length; n++) {
                    ModifyCardObj(
                        JSON.parse(JSON.stringify(newObj[n])),
                        i
                    );
                }
            }

            var count = 0;

            while (count !== parseInt(val)) {
                var temp = siteItemStorage.ccgData.cardGroupItems.filter(cg => parseInt(cg.id.split("_")[1]) === count);

                cardArr.push(temp);

                count = count + 1;
            }
        }

        if (cardArr.length > 0) {
            for (var card = 0; card < cardArr.length; card++) {
                cards.push(
                    CreateCollapsibleGroupCardSelection(
                        trueID,
                        cardArr[card],
                        card
                    )
                );
            }

            var cardsOutput = CreateElement(cards);

            //Finally, create a card container with the added cards and insert it into the card container 
            $("#" + trueID + "-Parent").append(
                cardsOutput
            );
        }
    });
}

function CollapsibleCardAddCards(id) {
    $(document).ready(function () {
        function deepFreeze(object) {
            return Object.freeze(object);
        };

        var cards = [];
        var cardArr = [];
        var cardItems;

        var trueID = id.split("_")[0];

        for (var ci = 0; ci < siteItemStorage.ccgData.baseCardChildItems.length; ci++) {
            if (siteItemStorage.ccgData.baseCardChildItems[ci].parentID.toLowerCase() === trueID.toLowerCase()) {
                cardItems = siteItemStorage.ccgData.baseCardChildItems[ci];
            }
        }

        // Get the card container ID and remove the contents in it
        $("#" + trueID + "-Parent").empty();

        //Find out the value of what was selected (this will be the amount of cards produced)
        var dd = $("#" + id + " :selected");
        var amt = parseInt(dd.val());

        //If the amount is greater than 0, loop through and add cards
        if (amt > 0) {
            //Because the base card Items will be our reference items
            //We will clear out our modifiedChildItems array
            var baseChildItems = [];

            for (var i = 0; i < cardItems.children.length; i++) {
                baseChildItems.push(deepFreeze(cardItems.children[i]));
            }

            for (var i = 0; i < amt; i++) {

                var modifiedChildItems = [];

                var newObj = $.extend(modifiedChildItems, baseChildItems);

                for (var n = 0; n < newObj.length; n++) {
                    ModifyCardObj(
                        JSON.parse(JSON.stringify(newObj[n])),
                        i
                    );
                }
            }

            var count = 0;

            while (count !== amt) {
                var temp = siteItemStorage.ccgData.cardGroupItems.filter(cg => parseInt(cg.id.split("_")[1]) === count);

                cardArr.push(temp);

                count = count + 1;
            }
        }

        if (cardArr.length > 0) {
            for (var card = 0; card < cardArr.length; card++) {
                cards.push(
                    CreateCollapsibleGroupCardSelection(
                        trueID,
                        cardArr[card],
                        card
                    )
                );
            }

            var cardsOutput = CreateElement(cards);

            //Finally, create a card container with the added cards and insert it into the card container 
            $("#" + trueID + "-Parent").append(
                cardsOutput
            );
        }
    });
};
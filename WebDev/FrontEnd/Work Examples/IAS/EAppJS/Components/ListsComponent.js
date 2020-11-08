class ListCompObj {
    constructor(
        listObjects = [],
        isOrderedList = false,
        listStyleType = "circle",
        listID = "",
        listClass = ""
    ) {
        this.listObjects = listObjects !== null && listObjects.length > 0 ? listObjects : "Error: No list items!";
        this.isOrderedList = !NullOrEmptyCheck(isOrderedList) && isOrderedList === true ? true : false;
        this.listStyleType = listStyleType !== NullOrEmptyCheck(listStyleType) ? listStyleType : "circle";
        this.listID = listID !== NullOrEmptyCheck(listID) ? listID : "";
        this.listClass = listClass !== NullOrEmptyCheck(listClass) ? listClass : "";
    }
}

function ListComponentController(
    labelComp,
    noteComp,
    listObjects,
    isOrderedList,
    listStyleType,
    listID,
    listClass
) {
    function CreateListsComponent(
        label,
        note,
        listCompObj
    ) {
        if (listCompObj.isOrderedList) {
            let olOut = listCompObj.listObjects.map(o => {
                return `<li>${o}</li>`;
            }).join('');
            return `${label}
                ${note}
                <ol id='${listCompObj.listID}' class='${listCompObj.listClass}'>
                ${olOut}
                </ol>`;
        }
        else {
            let ulOut;
            switch (listCompObj.listStyleType) {
                case "circle":
                    ulOut = listCompObj.listObjects.map(u => {
                        return `<li>${u}</li>`;
                    }).join('');

                    return `${label}
                        ${note}
                        <ul id='${listCompObj.listID}' class='circle ${listCompObj.listClass} ${listCompObj.listStyleType}'>
                        ${ulOut}
                        </ul>`;
                case "disc":
                    ulOut = listCompObj.listObjects.map(u => {
                        return `<li>${u}</li>`;
                    }).join('');

                    return `${label}
                        ${note}
                        <ul id='${listCompObj.listID}' class='disc ${listCompObj.listClass} ${listCompObj.listStyleType}'>
                        ${ulOut}
                        </ul>`;
                case "squared":
                    ulOut = listCompObj.listObjects.map(u => {
                        return `<li>${u}</li>`;
                    }).join('');

                    return `${label}
                        ${note}
                        <ul id='${listCompObj.listID}' class='squared ${listCompObj.listClass} ${listCompObj.listStyleType}'>
                        ${ulOut}
                        </ul>`;
            }
        }
    }

    let labelCompVar = !NullOrEmptyCheck(labelComp) ? labelComp : "";
    let noteCompVar = !NullOrEmptyCheck(noteComp) ? noteComp : "";

    return CreateListsComponent(
        labelCompVar,
        noteCompVar,
        new ListCompObj(
            listObjects,
            isOrderedList,
            listStyleType,
            listID,
            listClass
        )
    );
};

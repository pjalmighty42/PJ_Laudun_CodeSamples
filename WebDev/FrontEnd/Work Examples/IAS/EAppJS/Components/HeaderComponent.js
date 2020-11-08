class HeaderObj {
    constructor(
        size = 3,
        value = "",
        headerID = "",
        headerClasses = ""
    ) {
        this.size = size;
        this.value = value;
        this.headerID = !NullOrEmptyCheck(headerID) ? "id='" + headerID + "'" : "";
        this.headerClasses = !NullOrEmptyCheck(headerClasses) ? "class='" + headerClasses + "'" : "";
    }
}

function HeaderController(
    size,
    value,
    headerID,
    headerClasses
) {
    function HeaderComponent(headerObject){
        if (!NullOrEmptyCheck(headerObject.value)) {
            switch (headerObject.size) {
                case 1:
                    return `<h1 ${headerObject.headerID} ${headerObject.headerClasses}>${headerObject.value}</h1>`;
                case 2:
                    return `<h2 ${headerObject.headerID} ${headerObject.headerClasses}>${headerObject.value}</h2>`;
                case 3:
                    return `<h3 ${headerObject.headerID} ${headerObject.headerClasses}>${headerObject.value}</h3>`;
                case 4:
                    return `<h4 ${headerObject.headerID} ${headerObject.headerClasses}>${headerObject.value}</h4>`;
                case 5:
                    return `<h5 ${headerObject.headerID} ${headerObject.headerClasses}>${headerObject.value}</h5>`;
                case 6:
                    return `<h6 ${headerObject.headerID} ${headerObject.headerClasses}>${headerObject.value}</h6>`;
            }
        }
    };
        
    return HeaderComponent(
        new HeaderObj(
            size,
            value,
            headerID,
            headerClasses
        )
    );
};
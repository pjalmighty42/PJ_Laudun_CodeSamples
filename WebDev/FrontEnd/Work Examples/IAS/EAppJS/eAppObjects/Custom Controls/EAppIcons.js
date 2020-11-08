class IconObj {
    constructor(
        id = "",
        toolmsg = ""
    ) {
        this.ID = id + "-icon";
        this.ToolMsg = toolmsg;
    }
};

function EAppIconController(
    id,
    toolmsg
) {
    function CreateEAppIcon(iconObj) {
        return `<i id='${iconObj.ID}' class='fa fa-exclamation-triangle icon-warning' title='${iconObj.ToolMsg}'></i> `;
    }

    return CreateEAppIcon(
        new IconObj(
            id,
            toolmsg
        )
    );
    
}
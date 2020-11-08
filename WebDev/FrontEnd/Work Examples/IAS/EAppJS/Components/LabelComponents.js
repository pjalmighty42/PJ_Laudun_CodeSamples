class LabelObject {
    constructor(
        labelIdName = "",
        labelClassName = "",
        labelValue = ""
    ) {
        this.labelIdName = !NullOrEmptyCheck(labelIdName) ? "id='" + labelIdName + "'" : "";
        this.labelClassName = !NullOrEmptyCheck(labelClassName) ? "class='" + labelClassName + "'" : "";
        this.labelValue = !NullOrEmptyCheck(labelValue) ? labelValue : "";
    }
}

function LabelController(
    labelIdName,
    labelClassName,
    labelValue
){
    function CreateLabel(labelObj) {
        if (!NullOrEmptyCheck(labelObj.labelValue)) {
            return `<label ${labelObj.labelIdName} ${labelObj.labelClassName}> ${labelObj.labelValue}</label>`;
        }
        else {
            return `<label ${labelObj.labelIdName} ${labelObj.labelClassName}></label>`;
        }
    };

    return CreateLabel(
        new LabelObject(
            labelIdName,
            labelClassName,
            labelValue
        )
    );
};
//This will take in any Labels and Notes, and create the full textbox controll with the passed in values (+10 parameters)
class TextBoxObject {
    constructor (
        tbIDName = "",
        tbClassName = "",
        tbName = "",
        tbVal = "",
        placeholderValue = "",
        rows = 1,
        maxLength = 100,
        isEnabled = "",
        rulesmsg = "",
        isRequired = false
    ) {
        this.tbIDName = !NullOrEmptyCheck(tbIDName) ? tbIDName : "";
        this.tbClassName = !NullOrEmptyCheck(tbClassName) ? tbClassName : "";
        this.tbName = !NullOrEmptyCheck(tbName) ? tbName : "";
        this.tbValue = !NullOrEmptyCheck(tbVal) ? tbVal : "";
        this.placeholderValue = !NullOrEmptyCheck(placeholderValue) ? placeholderValue : "";
        this.rows = rows;
        this.maxLength = maxLength > 100 ? maxLength : 100;
        this.isRequired = isRequired === true ? true : false;
        this.isEnabled = isEnabled === true ? true : false;
        this.rulseMsg = !NullOrEmptyCheck(rulesmsg) ? rulesmsg.split("|") : "";
        this.contextValue = placeholderValue;
    };
};

function TextBoxController(
    labelComp,
    noteComp,
    tbIDName,
    tbClassName,
    tbName,
    tbValue,
    placeholderValue,
    rows,
    maxLength,
    isEnabled,
    rulesMessage,
    isRequired
){
    function CreateTextBox(
        label,
        note,
        tbObj
    ){
        let tbObject = [];
        let reqText = "";
        let erOutput = EnableAndRequiredCheck(tbObj.isEnabled, tbObj.isRequired);

        if (tbObj.rulseMsg.length > 0) {
            reqText = AlertController(tbObj.rulseMsg[0], tbObj.rulseMsg[1]);
        }

        tbObject.push("<div id='" + tbObj.tbIDName + "-div' >");

        tbObject.push(label);
        tbObject.push(note);
        tbObject.push("<div id='" + tbObj.tbIDName + "-alertDiv'>" + reqText + "</div>");
        tbObject.push("<textarea id='" + tbObj.tbIDName + "' class='" + tbObj.tbClassName + "' name='" + tbObj.tbName + "' rows='" + tbObj.rows + "' maxLength='" + tbObj.maxLength + "' placeholder='" + tbObj.placeholderValue + "' onchange='editRulesCheckInput(this.id)' " + erOutput + ">" + tbObj.tbValue + "</textarea>");
        tbObject.push("<div id='" + tbObj.tbIDName + "-alertDiv'></div>");
        tbObject.push("</div>");

        return CreateElement(tbObject);
    };

    return CreateTextBox(
        labelComp,
        noteComp,
        new TextBoxObject(
            tbIDName,
            tbClassName,
            tbName,
            tbValue,
            placeholderValue,
            rows,
            maxLength,
            isEnabled,
            rulesMessage,
            isRequired
        )
    );
};
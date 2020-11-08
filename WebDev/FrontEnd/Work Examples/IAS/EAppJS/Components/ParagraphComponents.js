class ParagraphObject {
    constructor(
        noteIdName = "",
        noteClassName = "",
        noteValue = ""
    ) {
        this.noteIdName = !NullOrEmptyCheck(noteIdName) ? "id='" + noteIdName + "'" : "";
        this.noteClassName = !NullOrEmptyCheck(noteClassName) ? "class='" + noteIdName + "'" : "";
        this.noteValue = noteValue;
    }
}

function ParagraphController(
    noteIdName,
    noteClassName,
    noteValue
) {
    function CreateParagraph(paragraphObj){
        if (!NullOrEmptyCheck(paragraphObj.noteValue)) {
            return `<p ${paragraphObj.noteIdName} ${paragraphObj.noteClassName}">${paragraphObj.noteValue}</p>`;
        }
    };

    return CreateElement(
        CreateParagraph(
            new ParagraphObject(
                noteIdName,
                noteClassName,
                noteValue
            )
        )
    );
};
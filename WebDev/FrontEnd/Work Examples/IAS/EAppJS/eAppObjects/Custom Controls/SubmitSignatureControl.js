

function SubmitSignatureController(
    id,
    pref,
    btnText
) {

    function CreateSubmitSigContainer(id, pref, text) {
        var cont = [];

        cont.push("<div class='signature-agreement'>");
        cont.push(ListComponentController(
            LabelController("", "", "BINDING AGREEMENT DISCLOSURE"),
            ParagraphController("", "", "The following are documents you are about to sign electronically:"),
            revDocStorer.appBindingTitles
        )
        );
        cont.push("</div>");

        cont.push("<button id='" + id + "_saveSig' class='btn btn-lg signin-btn-form' data-prefix='" + pref + "' onclick='SubmitSignatures(this.id)'>" + text + "</button>");

        return CreateElement(cont);
    }

    return CreateSubmitSigContainer(
        id,
        pref,
        btnText
    );
};
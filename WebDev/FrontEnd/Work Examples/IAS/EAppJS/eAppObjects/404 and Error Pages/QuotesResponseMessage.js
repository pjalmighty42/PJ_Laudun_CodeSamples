function QuoteResponseMessageController(
    message,
    bodyObj
) {
    function CreateQuotesMessage(
        msg
    ) {
        var output = [];

        output.push("<div id='quotesMsg-div' class='col-12'>");
        output.push("<div id='quotesMsg-container-div' class='col-12'>");
        output.push("<div id='icon-div'><i class='fa fa-exclamation-triangle'></i></div>");
        output.push("<div id='msg-div'><h2>" + msg + "</h2></div>");
        if (!NullOrEmptyCheck(bodyObj)) {
            output.push("<div id='msg-body'>" + bodyObj + "</div>");
        }
        output.push("</div>");
        output.push("</div>");

        return CreateElement(output);
    }

    return CreateQuotesMessage(message);
}
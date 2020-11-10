const QuoteResponseMessageController = (
    message,
    bodyObj
) => {
    let msgBodOut = "<div id='msg-body'>" + bodyObj + "</div>";

    return `<div id='quotesMsg-div' class='col-12'>
            <div id='quotesMsg-container-div' class='col-12'>
            <div id='icon-div'><i class='fa fa-exclamation-triangle'></i></div>
            <div id='msg-div'><h2>${message}</h2></div>
            ${msgBodOut}
            </div>
            </div>`;
}
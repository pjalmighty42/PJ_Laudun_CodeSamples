function PHITableController(
    phiheader,
    phiResponses
) {

    function CreatePHITableContainer(
        phiHead,
        phiResp
    ) {
        //Create the table header
        let tableContArr = [];

        tableContArr.push("<div id='phiTable' class='docRevTable-container'>");
        tableContArr.push("<h3>" + phiHead + "</h3>");
        tableContArr.push("<div class='phiTable'>");
        tableContArr.push("<table class='table table-striped table-hover'>");
        tableContArr.push("<thead>");
        tableContArr.push("<tr class='revDocs-tr'>");
        tableContArr.push("<th class='revDocs-header'>Selected Date</th>");
        tableContArr.push("<th class='revDocs-header'>Selected Time</th>");
        tableContArr.push("</tr>");
        tableContArr.push("</thead>");

        //Call and include the body
        tableContArr.push("<tbody>");
        tableContArr.push("<tr class='revDocs-tr'>")
        var phiArr = phiResp.split("|");

        if (phiArr.length === 1) {
            tableContArr.push("<td colspan=2>" + phiArr[0] + "</td>");
        }
        else if (phiArr.length > 1) {
            for (var i = 0; i < phiArr.length; i++) {
                tableContArr.push("<td>" + phiArr[i] + "</td>");
            }
        }
        
        tableContArr.push("</tr>");
        tableContArr.push("</tbody>");

        tableContArr.push("</table>");
        tableContArr.push("</div>");
        tableContArr.push("</div>");

        return CreateElement(tableContArr);
    };

    revDocStorer.revDocObjList = [];
    revDocStorer.childElIds = [];

    return CreatePHITableContainer(
        phiheader,
        phiResponses
    );

}

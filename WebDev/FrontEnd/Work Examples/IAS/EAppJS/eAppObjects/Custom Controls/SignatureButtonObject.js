var HoverbuttonStoreage = {
    NormBtnImgs: [],
    HoverBtnImgs: []
};

function SignatureButtonController(
    btnSVGPaths,
    isAppSign
) {
    function SigBtnObj(
        paths,
        appSign
    ) {
        this.SVGPathArr = paths;
        this.isAgentSign = appSign === "true" ? true : false;
    }

    function CreateSigBlock(
        sigBlockObj
    ) {
        HoverbuttonStoreage.NormBtnImgs = [];
        HoverbuttonStoreage.HoverBtnImgs = [];

        var sigBlockOut = [];
        var sigOpts = JSON.parse(sessionStorage.getItem("sOpts"));
        console.log(sigOpts);

        sigBlockOut.push("<div class='sig-buttons-container col-12' align='center'>");

        if (sigOpts.length > 0) {
            if (sigBlockObj.isAgentSign) {
                sigBlockOut.push("<div class='upload-button-container col-12'>");
                sigBlockOut.push("<h2>Upload Supporting Documents</h2>");
                sigBlockOut.push(AlertController("danger", "Do not use this option if you are uploading an application. If you need to upload an application, please use the documents upload feature on the agent portal homepage."));
                sigBlockOut.push("<button id='UPLBtn' onclick='UploadPageSwitch()' class='btn btn-block btn-lg alert-info current' title='Click here to Upload any documents'>");
                sigBlockOut.push("<span id='btnIcon'></span>");
                sigBlockOut.push("<span>Upload</span>");
                sigBlockOut.push("</div>");
            }
            
            sigBlockOut.push("<h2>Please Select a Sigining Option:</h2>");

            for (var s = 0; s < sigOpts.length; s++) {
                for (var p = 0; p < sigBlockObj.SVGPathArr.length; p++) {
                    var id = sigBlockObj.SVGPathArr[p].id.split("_")[0];

                    if (id.localeCompare(sigOpts[s]) === 0) {
                        var svgUrl = baseUrl + sigBlockObj.SVGPathArr[p].value;

                        if (sigBlockObj.SVGPathArr[p].id.split("_")[1].localeCompare("Norm") === 0) {

                            HoverbuttonStoreage.NormBtnImgs.push({ id: id, value: sigBlockObj.SVGPathArr[p].value });

                            sigBlockOut.push("<button id='" + id + "' class='btn btn-block btn-lg sig-button' title='" + sigBlockObj.SVGPathArr[p].toolspy + "' onmouseenter='SigBtnHoverOn(this.id)' onmouseleave='SigBtnHoverOff(this.id)' onclick='UpdatePage(this.id)'>");
                            sigBlockOut.push("<img class='sig-btn-img' src='" + svgUrl + "' />");
                            sigBlockOut.push("</button>");
                        }
                        else {
                            HoverbuttonStoreage.HoverBtnImgs.push({ id: id, value: sigBlockObj.SVGPathArr[p].value });
                        }
                    }
                    
                }
            }
        }
        else {
            sigBlockOut.push("<div class='alert alert-danger' role='alert'><i class='fa fa-exclamation fa-10x'></i><h2>No Sigining Methods Available!</h2></div>");
            sigBlockOut.push("<hr />");
            sigBlockOut.push("<div class='alert alert-danger' role='alert'>Please go back through the application and fill it out correctly. Thank you.</div>");
        }
        

        sigBlockOut.push("</div>");

        return CreateElement(sigBlockOut);
    }

    return CreateSigBlock(
        new SigBtnObj(
            btnSVGPaths,
            isAppSign
        )
    );
}

function SigBtnHoverOn(id) {
    $(document).ready(function () {
        console.log("Entered Button area!");

        var hoverImg = HoverbuttonStoreage.HoverBtnImgs.find(h => h.id === id);

        $("#" + id).find(".sig-btn-img").fadeOut(100, function () {
            $("#" + id).find(".sig-btn-img").attr("src", baseUrl + hoverImg.value);
        }).fadeIn(100);
    });
}

function SigBtnHoverOff(id) {
    $(document).ready(function () {
        console.log("Exited Button area!");

        var normImg = HoverbuttonStoreage.NormBtnImgs.find(h => h.id === id);

        $("#" + id).find(".sig-btn-img").fadeOut(150, function () {
            $("#" + id).find(".sig-btn-img").attr("src", baseUrl + normImg.value);
        }).fadeIn(150);
    });
}

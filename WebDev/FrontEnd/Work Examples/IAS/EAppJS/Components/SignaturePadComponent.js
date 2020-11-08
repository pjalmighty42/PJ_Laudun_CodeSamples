

var SignaturePadController = (
    id,
    canvasClass,
    bgImg,
    bgImgAlt,
    penColor,
    enabled,
    required,
    isAgent,
    rulesMessage,
    sigImg
) => {

    function SigPadObj(
        canvasID,
        canvasClass,
        bgImg,
        bgImgAlt,
        pColor,
        enabled,
        required,
        agent,
        rulesmsg,
        sig
    ) {
        this.canvasID = !NullOrEmptyCheck(canvasID) ? canvasID : "";
        this.canvasClass = !NullOrEmptyCheck(canvasClass) ? canvasClass : "";
        this.bgImg = !NullOrEmptyCheck(bgImg) ? bgImg : "";
        this.bgImgAlt = !NullOrEmptyCheck(bgImgAlt) ? bgImgAlt : "";
        this.isAgent = agent === true ? true : false;
        this.signatureImg = !NullOrEmptyCheck(sig) ? sig : "";

        //Auto-populated fields
        this.saveID = canvasID + "-saveBtnID";
        this.resetBtnID = canvasID + "-resetBtnID";
        this.isEnabled = enabled === true ? true : false;
        this.isRequired = required === true ? true : false;
        this.rulseMsg = !NullOrEmptyCheck(rulesmsg) ? rulesmsg.split("|") : "";
        var trueID = canvasID.split("_")[0];
        siteItemStorage.signatureBlocks.push({ "id": trueID, "value": pColor });

        if (window.innerWidth <= 1024) {
            this.sigPadWidth = 500;
            this.sigPadHeight = 100;
        }
        else {
            this.sigPadWidth = 900;
            this.sigPadHeight = 200;
        }
    }
    
    let CreateSignaturePad = (sPadObj) => {
        let sigBlockObj = [];
        let reqText = "";
        let requiredIcon = "";


        let signPadOut, isEnabledOut, isAgentOut, sigBlockOut, spadImgOut, base64Img, imgOut, imgCanvasOut, listOut;

        if (sPadObj.rulseMsg.length > 0) {
            reqText = AlertController(sPadObj.rulseMsg[0], sPadObj.rulseMsg[1]);
        }

        if (sPadObj.isRequired === true && NullOrEmptyCheck(sPadObj.signatureImg)) {
            requiredIcon = EAppIconController(sPadObj.id, "Response is Required!");
        }

        if (sPadObj.isEnabled === true) {
            isEnabledOut = `<div id='${sPadObj.canvasID}_Div_Main' class='signpad-base'>`;
           // sigBlockObj.push("<div id='" + sPadObj.canvasID + "_Div_Main' class='signpad-base'>");
        }
        else {
            isEnabledOut = `<div id='${sPadObj.canvasID}_Div_Main' class='signpad-base signpad-disabled'>`;
            //sigBlockObj.push("<div id='" + sPadObj.canvasID + "_Div_Main' class='signpad-base signpad-disabled'>");
        }

        if (sPadObj.isAgent) {
            isAgentOut = `<h3>${requiredIcon} Agent Signature Block:</h3>
            <hr/>`;
            /*
            sigBlockObj.push("<h3>" + requiredIcon + " Agent Signature Block:</h3>");
            sigBlockObj.push("<hr/>");
            */
        }
        else {
            isAgentOut = `<h3>${requiredIcon} Applicant Signature Block:</h3>
            <hr/>`;
            /*
            sigBlockObj.push("<h3>" + requiredIcon + " Applicant Signature Block:</h3>");
            sigBlockObj.push("<hr/>");
            */
        }

        //sigBlockObj.push("<div id='" + sPadObj.canvasID + "-alertDiv'>" + reqText + "</div>");
        if (!sPadObj.isAgent) {
            listOut = ListComponentController(
                LabelController("", "", "BINDING AGREEMENT DISCLOSURE"),
                ParagraphController("", "", "The following are documents you are about to sign electronically:"),
                revDocStorer.appBindingTitles
            );

            sigBlockOut = `<div id='${sPadObj.canvasID}-alertDiv'>${reqText}</div>
                            <div class='signature-agreement'>
                            ${listOut}
                            </div>`;
            /*
            sigBlockObj.push("<div class='signature-agreement'>");
            sigBlockObj.push(ListComponentController(
                LabelController("", "", "BINDING AGREEMENT DISCLOSURE"),
                ParagraphController("", "", "The following are documents you are about to sign electronically:"),
                revDocStorer.appBindingTitles
            )
            );
            sigBlockObj.push("</div>");
            */
        }
        else {
            sigBlockOut = `<div id='${sPadObj.canvasID}-alertDiv'>${reqText}</div>`;
        }

        //sigBlockObj.push("<div class='signature-pad'>");

        if (!NullOrEmptyCheck(sPadObj.signatureImg)) {
            base64Img = "data:application/png;base64," + sPadObj.signatureImg;

            /*
            sigBlockObj.push("<div class='sig-pad-wrapper'>");
            sigBlockObj.push("<img src='" + base64Img + "' alt='" + sPadObj.bgImgAlt + "' width='" + sPadObj.sigPadWidth + "' height='" + sPadObj.sigPadHeight + "' />");
            sigBlockObj.push("</div>");
            */

            imgOut = `<div class='sig-pad-wrapper'>
                            <img src='${base64Img}' alt='${sPadObj.bgImgAlt}' width='${sPadObj.sigPadWidth}' height='${sPadObj.sigPadHeight}' />
                            </div>`;

            if (sPadObj.isEnabled) {
               // sigBlockObj.push("<div class='signin-btn-container'>");
                if (sPadObj.isAgent) {
                    spadImgOut = `<div class='signature-pad'>
                                    ${imgOut}
                                    <div class='signin-btn-container'>
                                    <button id='${sPadObj.canvasID}_saveBtnID' data-signer='agent' class='btn btn-lg signin-btn-form' size=28 type='submit' onclick='SignPadEnableCheck(this.id)'>Save Signature</button>
                                    <button id='${sPadObj.canvasID}_resetBtnID' data-signer='agent' class='btn btn-lg reset-btn-form' size=28 type='reset' onclick='SigPadResetPad(this.id)'>Clear Signature</button>
                                    </div>
                                    </div>`;

                    /*
                    sigBlockObj.push("<button id='" + sPadObj.canvasID + "_saveBtnID' data-signer='agent' class='btn btn-lg signin-btn-form' size=28 type='submit' onclick='SignPadEnableCheck(this.id)'>Save Signature</button>");
                    sigBlockObj.push("<button id='" + sPadObj.canvasID + "_resetBtnID' data-signer='agent' class='btn btn-lg reset-btn-form' size=28 type='reset' onclick='SigPadResetPad(this.id)'>Clear Signature</button>");
                    */
                }
                else {
                    spadImgOut = `<div class='signature-pad'>
                                    ${imgOut}
                                    <div class='signin-btn-container'>
                                    <button id='${sPadObj.canvasID}_saveBtnID' data-signer='applicant' class='btn btn-lg signin-btn-form' size=28 type='submit' onclick='SignPadEnableCheck(this.id)'>Save Signature</button>
                                    <button id='${sPadObj.canvasID}_resetBtnID' data-signer='applicant' class='btn btn-lg reset-btn-form' size=28 type='reset' onclick='SigPadResetPad(this.id)'>Clear Signature</button>
                                    </div>
                                    </div>`;
                    //sigBlockObj.push("<button id='" + sPadObj.canvasID + "_saveBtnID' data-signer='applicant' class='btn btn-lg signin-btn-form' size=28 onclick='SignPadEnableCheck(this.id)'>Save Signature</button>");
                    //sigBlockObj.push("<button id='" + sPadObj.canvasID + "_resetBtnID' data-signer='applicant' class='btn btn-lg reset-btn-form' size=28 onclick='SigPadResetPad(this.id)'>Clear Signature</button>");
                }

                //sigBlockObj.push("</div>");
            }
            else {
                //sigBlockObj.push("<div class='signin-btn-container'>");
                if (sPadObj.isAgent) {
                    spadImgOut = `<div class='signature-pad'>
                                    <div class='signin-btn-container'>
                                    <button id='${sPadObj.canvasID}_saveBtnID' data-signer='applicant' class='btn btn-lg signin-btn-form' size=28 type='submit' onclick='SignPadEnableCheck(this.id)'>Save Signature</button>
                                    <button id='${sPadObj.canvasID}_resetBtnID' data-signer='applicant' class='btn btn-lg reset-btn-form' size=28 type='reset' onclick='SigPadResetPad(this.id)'>Clear Signature</button>
                                    </div>
                                    </div>`;
                    //sigBlockObj.push("<button id='" + sPadObj.canvasID + "_saveBtnID' data-signer='agent' class='btn btn-lg signin-btn-form-diabled' size=28 onclick='SignPadEnableCheck(this.id)' disabled>Save Signature</button>");
                    //sigBlockObj.push("<button id='" + sPadObj.canvasID + "_resetBtnID' data-signer='agent' class='btn btn-lg reset-btn-form-diabled' size=28 onclick='SigPadResetPad(this.id)' disabled>Clear Signature</button>");
                }
                else {
                    spadImgOut = `<div class='signature-pad'>
                                    <div class='signin-btn-container'>
                                    <button id='${sPadObj.canvasID}_saveBtnID' data-signer='applicant' class='btn btn-lg signin-btn-form' size=28 type='submit' onclick='SignPadEnableCheck(this.id)'>Save Signature</button>
                                    <button id='${sPadObj.canvasID}_resetBtnID' data-signer='applicant' class='btn btn-lg reset-btn-form' size=28 type='reset' onclick='SigPadResetPad(this.id)'>Clear Signature</button>
                                    </div>
                                </div>`;
                    //sigBlockObj.push("<button id='" + sPadObj.canvasID + "_saveBtnID' data-signer='applicant' class='btn btn-lg signin-btn-form-diabled' size=28 onclick='SignPadEnableCheck(this.id)' disabled>Save Signature</button>");
                    //sigBlockObj.push("<button id='" + sPadObj.canvasID + "_resetBtnID' data-signer='applicant' class='btn btn-lg reset-btn-form-diabled' size=28 onclick='SigPadResetPad(this.id)' disabled>Clear Signature</button>");
                }

                //sigBlockObj.push("</div>");
            }
        }
        else {
            //sigBlockObj.push("<div class='sig-pad-wrapper'>");

            imgCanvasOut = "";

            if (!NullOrEmptyCheck(sPadObj.bgImg)) {
                //sigBlockObj.push("<img src='" + sPadObj.bgImg + "' alt='" + sPadObj.bgImgAlt + "' width='" + sPadObj.sigPadWidth + "' height='" + sPadObj.sigPadHeight + "' />");
                imgCanvasOut = `<div class='sig-pad-wrapper'>
                            <img src='${base64Img}' alt='${sPadObj.bgImgAlt}' width='${sPadObj.sigPadWidth}' height='${sPadObj.sigPadHeight}' />
                            <canvas id='${sPadObj.canvasID}' class='${sPadObj.canvasClass}'  width='${sPadObj.sigPadWidth}' height='${sPadObj.sigPadHeight}' style='pointer-events: none;'></canvas>
                          </div>`;
            }
            //sigBlockObj.push("<canvas id='" + sPadObj.canvasID + "' class='" + sPadObj.canvasClass + "'  width='" + sPadObj.sigPadWidth + "' height='" + sPadObj.sigPadHeight + "' style='pointer-events: none;'></canvas>");
            //sigBlockObj.push("</div>");


            signPadOut = `

            `;

        //    if (sPadObj.isEnabled) {

        //        sigBlockObj.push("<div class='signin-btn-container'>");
        //        if (sPadObj.isAgent) {
        //            sigBlockObj.push("<button id='" + sPadObj.canvasID + "_saveBtnID' data-signer='agent' class='btn btn-lg signin-btn-form' size=28 onclick='SignPadEnableCheck(this.id)'>Save Signature</button>");
        //            sigBlockObj.push("<button id='" + sPadObj.canvasID + "_resetBtnID' data-signer='agent' class='btn btn-lg reset-btn-form' size=28 onclick='SigPadResetPad(this.id)'>Clear Signature</button>");
        //        }
        //        else {
        //            sigBlockObj.push("<button id='" + sPadObj.canvasID + "_saveBtnID' data-signer='applicant' class='btn btn-lg signin-btn-form' size=28 onclick='SignPadEnableCheck(this.id)'>Save Signature</button>");
        //            sigBlockObj.push("<button id='" + sPadObj.canvasID + "_resetBtnID' data-signer='applicant' class='btn btn-lg reset-btn-form' size=28 onclick='SigPadResetPad(this.id)'>Clear Signature</button>");
        //        }
        //        sigBlockObj.push("</div>");
        //    }
        //    else {
        //        sigBlockObj.push("<div class='signin-btn-container'>");
        //        if (sPadObj.isAgent) {
        //            sigBlockObj.push("<button id='" + sPadObj.canvasID + "_saveBtnID' data-signer='agent' class='btn btn-lg signin-btn-form-diabled' size=28 onclick='SignPadEnableCheck(this.id)' disabled>Save Signature</button>");
        //            sigBlockObj.push("<button id='" + sPadObj.canvasID + "_resetBtnID' data-signer='agent' class='btn btn-lg reset-btn-form-diabled' size=28 onclick='SigPadResetPad(this.id)' disabled>Clear Signature</button>");
        //        }
        //        else {
        //            sigBlockObj.push("<button id='" + sPadObj.canvasID + "_saveBtnID' data-signer='applicant' class='btn btn-lg signin-btn-form-diabled' size=28 onclick='SignPadEnableCheck(this.id)' disabled>Save Signature</button>");
        //            sigBlockObj.push("<button id='" + sPadObj.canvasID + "_resetBtnID' data-signer='applicant' class='btn btn-lg reset-btn-form-diabled' size=28 onclick='SigPadResetPad(this.id)' disabled>Clear Signature</button>");
        //        }

        //        sigBlockObj.push("</div>");
        //    }
        //}

        //sigBlockObj.push("</div>");

        sigBlockObj.push("<div class='sig-pad-saved' style='display: none;'>");
        sigBlockObj.push("<div class='sig-pad-img'></div>");
        sigBlockObj.push("<div class='sig-pad-btns-cont'>");
        if (sPadObj.isAgent) {
            sigBlockObj.push("<button id='" + sPadObj.canvasID + "_redoBtnID' data-signer='agent' class='btn btn-lg reset-btn-form' size=28 onclick='SigPadRedo(this.id)'>Redo Signature</button>");
        }
        else {
            sigBlockObj.push("<button id='" + sPadObj.canvasID + "_redoBtnID' data-signer='applicant' class='btn btn-lg reset-btn-form' size=28 onclick='SigPadRedo(this.id)'>Redo Signature</button>");
        }
        sigBlockObj.push("</div>");
        sigBlockObj.push("</div>");
        sigBlockObj.push("</div>");

        return `
        `;
        return CreateElement(sigBlockObj);
    };

    //console.log(SignaturePadComp);
    return CreateSignaturePad(
        new SigPadObj(
            id + "_SigPad",
            canvasClass,
            bgImg,
            bgImgAlt,
            penColor,
            enabled,
            required,
            isAgent,
            rulesMessage,
            sigImg
        )
    );
};
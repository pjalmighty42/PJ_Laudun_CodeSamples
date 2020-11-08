function EditSideNavicationController(
    currPrefix,
    sideNavObjArr,
    isTraining,
    isAppSign
) {
    function ButtonIconCheck(validNum) {
        switch (parseInt(validNum)) {
            case 0:
            default:
                return "";
            case 1:
                return "<i class='fa fa-check'></i>";
            case 2:
                return "<i class='fa fa-exclamation'></i>";
        }
    }

    function CreateEditSideNav(
        btnsArr,
        prefix,
        training
    ) {
        let normalBtnOut = (pre, display, isLocked, isValid, toolTip) => {
            let btnID = pre + "Btn";
            let btnTxt = display;
            let icon;

            if (isLocked) {
                icon = "<i class='fa fa-lock'></i>";
            }
            else {
                icon = ButtonIconCheck(parseInt(isValid));
            }

            return `<li>
                <button id='${btnID}' onclick='UpdatePage("${pre}")' class='btn btn-block btn-lg alert-info'  title='${toolTip}'>
                <span id='btnIcon'>${icon}</span>
                <span>${btnTxt}</span>
                </button>
                </li>`;
        };

        let activeBtnOut = (pre, display, isLocked, isValid, toolTip) => {
            let btnID = pre + "Btn";
            let btnTxt = display;
            let icon;

            if (isLocked) {
                icon = "<i class='fa fa-lock'></i>";
            }
            else {
                icon = ButtonIconCheck(parseInt(isValid));
            }

            return `<li>
                <button id='${btnID}' onclick='UpdatePage("${pre}")' class='btn btn-block btn-lg alert-info current'  title='${toolTip}'>
                <span id='btnIcon'>${icon}</span>
                <span>${btnTxt}</span>
                </button>
                </li>`;
        };

        return btnsArr.map(b => {
            if (b.isVisible) { //If Visible
                if (b.prefix.localeCompare("SIG") !== 0) { //and not a Signature Button
                    if (b.prefix.localeCompare(prefix) === 0) { //check for current button
                        return activeBtnOut(b.prefix, b.displayName, b.isLocked, b.isValid, b.toolTip); //if is, return an active button
                    }
                    else {
                        return normalBtnOut(b.prefix, b.displayName, b.isLocked, b.isValid, b.toolTip); //Else return a normal one
                    }
                }
                else { //Else we're dealing with a Signature Button and Grouping
                    if (training) { //if in Training Mode, we don't output Signing modes, so output the Training FAQ button instead
                        return `<li>
                                <button id='FAQBtn' onclick='FAQPageSwitch()' class='btn btn-block btn-lg alert-info' title='Training FAQ Page'>
                                <span>Signature</span>
                                </button>
                                </li>`;
                    }
                    else { //else we're in an actual appication and with Signatures open
                        if (b.prefix.localeCompare(prefix) === 0 ||
                            prefix.localeCompare("ESN") === 0 ||
                            prefix.localeCompare("SPD") === 0 ||
                            prefix.localeCompare("VSN") === 0 ||
                            prefix.localeCompare("PRT") === 0)
                        { //Signature button if Current btn
                            let icon = "";
                            let uploadBtnOut = "";

                            if (b.isLocked) {
                                icon = "<i class='fa fa-lock'></i>";
                            }
                            else {
                                icon = ButtonIconCheck(parseInt(b.isValid));

                                if (!isAppSign) {
                                    uploadBtnOut = `<button id='UPLBtn' onclick='UploadPageSwitch()' class='btn btn-block btn-lg alert-info'  title='Click here to Upload any documents'>
                                                    <span id='btnIcon'></span>
                                                    <span>Upload</span>
                                                    </button`;
                                }
                            }

                            //Then create the children Sig Btns
                            let childSigBtns = b.childNavButtons.map(cb => {
                                if (cb.isVisible) {
                                    if (cb.prefix.localeCompare(prefix) === 0) {
                                        return activeBtnOut(cb.prefix, cb.displayName, cb.isLocked, cb.isValid, cb.toolTip);
                                    }
                                    else {
                                        return normalBtnOut(cb.prefix, cb.displayName, cb.isLocked, cb.isValid, cb.toolTip);
                                    }
                                }
                                    
                            }).join('');

                            return `<section id='signBtns-container'>
                                        ${uploadBtnOut}
                                        <button id='SIGBtn' onclick='UpdatePage("${b.prefix}")' class='btn btn-block btn-lg alert-info current collapsible' data-toggle='collapse' data-target='.collapsible-content-sign'  title='${b.toolTip}'>
                                        <span id='btnIcon'>${icon}</span>
                                        <span>Signature</span>
                                    </button>
                                        <section id='sign-opts-cont' class='collapsible-content-sign'>
                                            <ul>
                                            ${childSigBtns}
                                            </ul>
                                        </section>
                                    </section>`;
                        }
                        else {
                            //Signature button if not Current btn

                            let icon = "";
                            let uploadBtnOut = "";

                            if (b.isLocked) {
                                icon = "<i class='fa fa-lock'></i>";
                            }
                            else {
                                icon = ButtonIconCheck(parseInt(b.isValid));

                                if (!isAppSign) {
                                    uploadBtnOut = `<button id='UPLBtn' onclick='UploadPageSwitch()' class='btn btn-block btn-lg alert-info'  title='Click here to Upload any documents'>
                                                    <span id='btnIcon'></span>
                                                    <span>Upload</span>
                                                    </button`;
                                }
                            }

                            //Then create the children Sig Btns
                            let childSigBtns = b.childNavButtons.map(cb => {
                                if (cb.isVisible) {
                                    if (cb.prefix.localeCompare(prefix) === 0) {
                                        return activeBtnOut(cb.prefix, cb.displayName, cb.isLocked, cb.isVisible, cb.toolTip);
                                    }
                                    else {
                                        return normalBtnOut(cb.prefix, cb.displayName, cb.isLocked, cb.isVisible, cb.toolTip);
                                    }
                                }

                            }).join('');

                            return `<section id='signBtns-container'>
                                    ${uploadBtnOut}
                                    <button id='SIGBtn' onclick='UpdatePage("${b.prefix}")' class='btn btn-block btn-lg alert-info collapsible' data-toggle='collapse' data-target='.collapsible-content-sign'  title='${b.toolTip}'>
                                    <span id='btnIcon'>${icon}</span>
                                    <span>Signature</span>
                                    </button>
                                    <section id='sign-opts-cont' class='collapsible-content-sign'>
                                    <ul>
                                    ${childSigBtns}
                                    </ul>
                                    </section>
                                    </section>`;
                        }
                    }
                }
            }
        }).join('');
    }

    function CreateEditSideNavContainer(
        buttonsObjArr,
        pre,
        training
    ) {

        let sideNavOut = CreateEditSideNav(buttonsObjArr, pre, training);
        let digiCerOut = DigiCertModalComponentController();

        return `<nav class='edit-nav-sidebar editSidenav'>
            <section id='btn-group' class='btn-group-vertical'>
            <ul>
            ${sideNavOut}
            </ul>
            <section id='digicert-cont' class='col-md-12'>${digiCerOut}</section>
            </section>
            </nav>`;
        
    }

    //sideNavObjArr needs to be 
    //[{
        //"displayName": null,
        //"prefix": null,
        //"isVisible": false,
        //"isValid": false,
        //"isEnabled: true,
        //"childNavButtons": null,
        //"tooltip: ""
    //}]

    return CreateEditSideNavContainer(sideNavObjArr, currPrefix, isTraining);
}
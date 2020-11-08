function CBGroupController(
    contID,
    contClass,
    cbGroupType,
    objectArr
) {
    function CBGroupObj(
        cID,
        type,
        objArr
    ) {
        this.ContainerID = cID;
        this.CBGroupType = type;
        this.ChildrenArr = objArr;
    }

    function CreateCBGroupContainer(
        cClass,
        objArr
    ) {
        var cbgOut = [];

        //Clear and instantiate new vals
        var spiltType = objArr.CBGroupType.split("_");

        siteItemStorage.selectionObjs.push(objArr);

        cbgOut.push("<div id='" + objArr.ContainerID + "' class='" + cClass + "'>");

        //Figure the type of CBG, if "seq" it's a sequential CBG, otherwise 
        if (spiltType[1].localeCompare("seq") === 0) {
            for (var o = 0; o < objArr.ChildrenArr.length; o++) {
                objArr.ChildrenArr[o].isEnabled = false;

                cbgOut.push("<div id='" + objArr.ChildrenArr[o].id + "-div' class='" + cClass + "'>");
                cbgOut.push(outputControl(CreateElement(objArr.ChildrenArr[o])));
                cbgOut.push("</div>");
            }
        }
        else {
            for (var o = 1; o < objArr.ChildrenArr.length; o++) {
                objArr.ChildrenArr[o].isEnabled = true;

                cbgOut.push("<div id='" + objArr.ChildrenArr[o].id + "-div' class='" + cClass + "'>");
                cbgOut.push(outputControl(CreateElement(objArr.ChildrenArr[o])));
                cbgOut.push("</div>");
            }
        }

        cbgOut.push("</div>");

        return CreateElement(cbgOut);
    }

    return CreateCBGroupContainer(
        contClass,
        new CBGroupObj(
            contID,
            cbGroupType,
            objectArr
        )
    );
}

function openEnableCBChildEl(id) {
    $(document).ready(function () {
        var jqItem = "";
        var is1stChild = false;

        //Get the family via the passed in ID
        for (var p = 0; p < siteItemStorage.selectionObjs.length; p++) {
            for (var c = 0; c < siteItemStorage.selectionObjs[p].ChildrenArr.length; c++) {
                if (siteItemStorage.selectionObjs[p].ChildrenArr[c].id.localeCompare(id) === 0) {
                    jqItem = siteItemStorage.selectionObjs[p];

                    //Then find out if it's the 1st child of the children objects, if it's 0-index, the it is
                    if (c === 0) {
                        is1stChild = true;
                    }
                }
            }
        }

        //if 1st Child is true, then it's been triggered (selected, etc)
        if (is1stChild) {
            //Get it's control type
            var jqControlType = jqItem.ChildrenArr[0].controlType;

            var jqValue = "";

            //So we can check it's value
            switch (jqControlType) {
                case "input":
                case "email":
                    jqValue = $("#" + jqItem.id).val();
                    break;
                case "checkbox":
                    jqValue = $("#" + id).prop("checked");
                    break;
            }

            //If the jqValue is false or null, it was deselected
            if (jqValue === false || NullOrEmptyCheck(jqValue)) {
                //Disable all items except the 1st one
                for (var i = 1; i < jqItem.ChildrenArr.length; i++) {
                    switch (jqItem.ChildrenArr[i].controlType) {
                        case "input":
                            $("#" + jqItem.ChildrenArr[i].id).val("");
                            $("#" + jqItem.ChildrenArr[i].id).attr("disabled", false);
                            break;
                        case "radio":
                            for (var opts = 0; opts < jqItem.ChildrenArr[i].responses.length; opts++) {
                                console.log("#" + jqItem.ChildrenArr[i].i + "-radio-label" + (opts + 1));
                                $("#" + jqItem.ChildrenArr[i].id + "-radio-label" + chItem.responses[opts].seqNum).find("span").removeClass("radiomark");
                                $("#" + jqItem.ChildrenArr[i].id + "-radio-label" + chItem.responses[opts].seqNum).find("span").addClass("radiomark-disabled")

                                console.log("#" + jqItem.ChildrenArr[i].id + (opts + 1));
                                $("#" + jqItem.ChildrenArr[i].id + (opts + 1)).prop("checked", false)
                                $("#" + jqItem.ChildrenArr[i].id + (opts + 1)).attr("disabled", true);
                            }
                            break;
                        case "checkbox":
                            console.log("#" + jqItem.ChildrenArr[i].id);
                            $("#" + jqItem.ChildrenArr[i].id + "-div").find("label").find("span").removeClass("checkmark");
                            $("#" + jqItem.ChildrenArr[i].id + "-div").find("label").find("span").addClass("checkmark-disabled")

                            $("#" + jqItem.ChildrenArr[i].id).prop("checked", false)
                            $("#" + jqItem.ChildrenArr[i].id).attr("disabled", true);
                            break;
                        case "dropdown":
                            console.log("#" + jqItem.ChildrenArr[i].id);
                            $("#" + jqItem.ChildrenArr[i].id)[0].selectedIndex = 0;
                            $("#" + jqItem.ChildrenArr[i].id).attr("disabled", true);
                            break;
                    }

                    //This needs to also be reflected in the DB
                    jqItem.ChildrenArr[i].isEnabled = false;
                    editRulesCheckInput(jqItem.ChildrenArr[i]);
                }

                //Save it to the DB
                jqItem.ChildrenArr[0].isEnabled = true;
                editRulesCheckInput(jqItem.ChildrenArr[0]);
            }
            else {
                //else it is true or not null, just flip the next element's enabled state
                switch (jqItem.ChildrenArr[1].controlType) {
                    case "input":
                        $("#" + jqItem.ChildrenArr[1].id).val("");
                        $("#" + jqItem.ChildrenArr[1].id).attr("disabled", false);
                        break;
                    case "radio":
                        for (var opts = 0; opts < jqItem.ChildrenArr[1].responses.length; opts++) {
                            console.log("#" + jqItem.ChildrenArr[1].i + "-radio-label" + (opts + 1));
                            $("#" + jqItem.ChildrenArr[1].id + "-radio-label" + chItem.responses[opts].seqNum).find("span").removeClass("radiomark");
                            $("#" + jqItem.ChildrenArr[1].id + "-radio-label" + chItem.responses[opts].seqNum).find("span").addClass("radiomark-disabled")

                            console.log("#" + jqItem.ChildrenArr[1].id + (opts + 1));
                            $("#" + jqItem.ChildrenArr[1].id + (opts + 1)).prop("checked", false)
                            $("#" + jqItem.ChildrenArr[1].id + (opts + 1)).attr("disabled", true);
                        }
                        break;
                    case "checkbox":
                        console.log("#" + jqItem.ChildrenArr[1].id);
                        $("#" + jqItem.ChildrenArr[1].id + "-div").find("label").find("span").removeClass("checkmark");
                        $("#" + jqItem.ChildrenArr[1].id + "-div").find("label").find("span").addClass("checkmark-disabled")

                        $("#" + jqItem.ChildrenArr[1].id).prop("checked", false)
                        $("#" + jqItem.ChildrenArr[1].id).attr("disabled", true);
                        break;
                    case "dropdown":
                        console.log("#" + jqItem.ChildrenArr[1].id);
                        $("#" + jqItem.ChildrenArr[1].id)[0].selectedIndex = 0;
                        $("#" + jqItem.ChildrenArr[1].id).attr("disabled", true);
                        break;
                }

                //This needs to also be reflected in the DB
                jqItem.ChildrenArr[1].isEnabled = true;
                editRulesCheckInput(jqItem.ChildrenArr[1]);

                //Save it to the DB
                jqItem.ChildrenArr[0].isEnabled = true;
                editRulesCheckInput(jqItem.ChildrenArr[0]);
            }
        }
        else {
            
            //Get it's control type
            var jqIndx = jqItem.ChildrenArr.indexOf(id);
            var currItem = jqItem.ChildrenArr.find(c => c.id === id);

            var jqValue = "";

            //So we can check it's value
            switch (jqControlType) {
                case "input":
                case "email":
                    jqValue = $("#" + currItem.id).val();
                    break;
                case "checkbox":
                    jqValue = $("#" + id).prop("checked");
                    break;
            }

            //If the jqValue is false or null, it was deselected
            if (jqValue === false || NullOrEmptyCheck(jqValue)) {
                //First check if the next element is the last one
                if (jqIndx + 1 === jqItem.ChildrenArr.length) {
                    //if it is, then just update the last child element
                    switch (jqItem.ChildrenArr[jqItem.ChildrenArr.length].controlType) {
                        case "input":
                            $("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id).val("");
                            $("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id).attr("disabled", true);
                            break;
                        case "radio":
                            for (var opts = 0; opts < jqItem.ChildrenArr[jqItem.ChildrenArr.length].responses.length; opts++) {
                                console.log("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].i + "-radio-label" + (opts + 1));
                                $("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id + "-radio-label" + chItem.responses[opts].seqNum).find("span").removeClass("radiomark");
                                $("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id + "-radio-label" + chItem.responses[opts].seqNum).find("span").addClass("radiomark-disabled")

                                console.log("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id + (opts + 1));
                                $("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id + (opts + 1)).prop("checked", false)
                                $("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id + (opts + 1)).attr("disabled", true);
                            }
                            break;
                        case "checkbox":
                            console.log("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id);
                            $("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id + "-div").find("label").find("span").removeClass("checkmark");
                            $("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id + "-div").find("label").find("span").addClass("checkmark-disabled")

                            $("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id).prop("checked", false)
                            $("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id).attr("disabled", true);
                            break;
                        case "dropdown":
                            console.log("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id);
                            $("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id)[0].selectedIndex = 0;
                            $("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id).attr("disabled", true);
                            break;
                    }
                    //Save it to the DB
                    jqItem.ChildrenArr[jqItem.ChildrenArr.length].isEnabled = false;

                    editRulesCheckInput(jqItem.ChildrenArr[jqItem.ChildrenArr.length]);
                    editRulesCheckInput(jqItem.ChildrenArr[jqIndx]);
                }
                else {
                    //Else update the next element
                    switch (jqItem.ChildrenArr[jqIndx + 1].controlType) {
                        case "input":
                            $("#" + jqItem.ChildrenArr[jqIndx + 1].id).val("");
                            $("#" + jqItem.ChildrenArr[jqIndx + 1].id).attr("disabled", true);
                            break;
                        case "radio":
                            for (var opts = 0; opts < jqItem.ChildrenArr[jqIndx + 1].responses.length; opts++) {
                                console.log("#" + jqItem.ChildrenArr[jqIndx + 1].i + "-radio-label" + (opts + 1));
                                $("#" + jqItem.ChildrenArr[jqIndx + 1].id + "-radio-label" + chItem.responses[opts].seqNum).find("span").removeClass("radiomark");
                                $("#" + jqItem.ChildrenArr[jqIndx + 1].id + "-radio-label" + chItem.responses[opts].seqNum).find("span").addClass("radiomark-disabled")

                                console.log("#" + jqItem.ChildrenArr[jqIndx + 1].id + (opts + 1));
                                $("#" + jqItem.ChildrenArr[jqIndx + 1].id + (opts + 1)).prop("checked", false)
                                $("#" + jqItem.ChildrenArr[jqIndx + 1].id + (opts + 1)).attr("disabled", true);
                            }
                            break;
                        case "checkbox":
                            console.log("#" + jqItem.ChildrenArr[jqIndx + 1].id);
                            $("#" + jqItem.ChildrenArr[jqIndx + 1].id + "-div").find("label").find("span").removeClass("checkmark");
                            $("#" + jqItem.ChildrenArr[jqIndx + 1].id + "-div").find("label").find("span").addClass("checkmark-disabled")

                            $("#" + jqItem.ChildrenArr[jqIndx + 1].id).prop("checked", false)
                            $("#" + jqItem.ChildrenArr[jqIndx + 1].id).attr("disabled", true);
                            break;
                        case "dropdown":
                            console.log("#" + jqItem.ChildrenArr[jqIndx + 1].id);
                            $("#" + jqItem.ChildrenArr[jqIndx + 1].id)[0].selectedIndex = 0;
                            $("#" + jqItem.ChildrenArr[jqIndx + 1].id).attr("disabled", true);
                            break;
                    }
                    //Save it to the DB
                    jqItem.ChildrenArr[jqIndx + 1].isEnabled = false;

                    editRulesCheckInput(jqItem.ChildrenArr[jqIndx + 1]);
                    editRulesCheckInput(currItem);
                }
            }
            else {
                //First check if the next element is the last one
                if (jqIndx + 1 === jqItem.ChildrenArr.length) {
                    //if it is, then just update the last child element
                    switch (jqItem.ChildrenArr[jqItem.ChildrenArr.length].controlType) {
                        case "input":
                            $("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id).val("");
                            $("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id).attr("disabled", false);
                            break;
                        case "radio":
                            for (var opts = 0; opts < jqItem.ChildrenArr[jqItem.ChildrenArr.length].responses.length; opts++) {
                                console.log("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].i + "-radio-label" + (opts + 1));
                                $("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id + "-radio-label" + chItem.responses[opts].seqNum).find("span").removeClass("radiomark-disabled");
                                $("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id + "-radio-label" + chItem.responses[opts].seqNum).find("span").addClass("radiomark");

                                console.log("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id + (opts + 1));
                                $("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id + (opts + 1)).prop("checked", false)
                                $("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id + (opts + 1)).attr("disabled", false);
                            }
                            break;
                        case "checkbox":
                            console.log("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id);
                            $("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id + "-div").find("label").find("span").removeClass("checkmark-disabled");
                            $("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id + "-div").find("label").find("span").addClass("checkmark");

                            $("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id).prop("checked", false)
                            $("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id).attr("disabled", false);
                            break;
                        case "dropdown":
                            console.log("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id);
                            $("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id)[0].selectedIndex = 0;
                            $("#" + jqItem.ChildrenArr[jqItem.ChildrenArr.length].id).attr("disabled", false);
                            break;
                    }
                    //Save it to the DB
                    jqItem.ChildrenArr[jqItem.ChildrenArr.length].isEnabled = true;

                    editRulesCheckInput(jqItem.ChildrenArr[jqItem.ChildrenArr.length]);
                    editRulesCheckInput(jqItem.ChildrenArr[jqIndx]);
                }
                else {
                    //Else update the next element
                    switch (jqItem.ChildrenArr[jqIndx + 1].controlType) {
                        case "input":
                            $("#" + jqItem.ChildrenArr[jqIndx + 1].id).val("");
                            $("#" + jqItem.ChildrenArr[jqIndx + 1].id).attr("disabled", false);
                            break;
                        case "radio":
                            for (var opts = 0; opts < jqItem.ChildrenArr[jqIndx + 1].responses.length; opts++) {
                                console.log("#" + jqItem.ChildrenArr[jqIndx + 1].i + "-radio-label" + (opts + 1));
                                $("#" + jqItem.ChildrenArr[jqIndx + 1].id + "-radio-label" + chItem.responses[opts].seqNum).find("span").removeClass("radiomark-disabled");
                                $("#" + jqItem.ChildrenArr[jqIndx + 1].id + "-radio-label" + chItem.responses[opts].seqNum).find("span").addClass("radiomark")

                                console.log("#" + jqItem.ChildrenArr[jqIndx + 1].id + (opts + 1));
                                $("#" + jqItem.ChildrenArr[jqIndx + 1].id + (opts + 1)).prop("checked", false)
                                $("#" + jqItem.ChildrenArr[jqIndx + 1].id + (opts + 1)).attr("disabled", false);
                            }
                            break;
                        case "checkbox":
                            console.log("#" + jqItem.ChildrenArr[jqIndx + 1].id);
                            $("#" + jqItem.ChildrenArr[jqIndx + 1].id + "-div").find("label").find("span").removeClass("checkmark");
                            $("#" + jqItem.ChildrenArr[jqIndx + 1].id + "-div").find("label").find("span").addClass("checkmark-disabled")

                            $("#" + jqItem.ChildrenArr[jqIndx + 1].id).prop("checked", false)
                            $("#" + jqItem.ChildrenArr[jqIndx + 1].id).attr("disabled", false);
                            break;
                        case "dropdown":
                            console.log("#" + jqItem.ChildrenArr[jqIndx + 1].id);
                            $("#" + jqItem.ChildrenArr[jqIndx + 1].id)[0].selectedIndex = 0;
                            $("#" + jqItem.ChildrenArr[jqIndx + 1].id).attr("disabled", false);
                            break;
                    }
                    //Save it to the DB
                    jqItem.ChildrenArr[jqIndx + 1].isEnabled = false;

                    editRulesCheckInput(jqItem.ChildrenArr[jqIndx + 1]);
                    editRulesCheckInput(currItem);
                }
            }
        }
    });
}
const baseUrl = (document.querySelector('base') || {}).href;

Array.prototype.forEach.call(document.body.querySelectorAll("*[data-mask]"), applyDataMask);

function applyDataMask(field) {
    var mask = field.dataset.mask.split('');

    // For now, this just strips everything that's not a number
    function stripMask(maskedData) {
        function isDigit(char) {
            return /\d/.test(char);
        }
        return maskedData.split('').filter(isDigit);
    }

    // Replace `_` characters with characters from `data`
    function applyMask(data) {
        return mask.map(function (char) {
            if (char !== '_') return char;
            if (data.length === 0) return char;
            return data.shift();
        }).join('');
    }

    function reapplyMask(data) {
        return applyMask(stripMask(data));
    }

    function changed() {
        var oldStart = field.selectionStart;
        var oldEnd = field.selectionEnd;

        field.value = reapplyMask(field.value);

        field.selectionStart = oldStart;
        field.selectionEnd = oldEnd;
    }

    field.addEventListener('click', changed);
    field.addEventListener('keyup', changed);
}

function numberInputChecker(num) {

    if (NullOrEmptyCheck(num)) {
         return false;
    }
    if (!isNotaNumberChecker(num)) {
        return false;
    } 
    if (xssText(num)) {
        console.log("You are trying to be a naughty boi, aren't you?...");
        return false;
    }
    return true;
}

function zipChecker(zip) {
    if (!numberInputChecker(zip)) {
        return false;
    }

    return true;
}

function ssnChecker(ssn) {
    if (NullOrEmptyCheck(ssn) ||
        ssn.replace(/[-]/g, "").length < 9 ||
        !isNotaNumberChecker(ssn.replace(/[-]/g, ""))
    ) {
        return false;
    }
    return true;
}

function ssn4Checker(ssn) {
    if (NullOrEmptyCheck(ssn) ||
        ssn.replace(/[-]/g, "").length < 4 ||
        !isNotaNumberChecker(ssn)
    ) {
        return false;
    }
    return true;
}

function phoneChecker(phone) {
    
    if (NullOrEmptyCheck(phone)){
        return false;
    }
    if (phone.replace(/[()-\s]/g, "").length < 10) {
        return false;
    }
    if (!isNotaNumberChecker(phone.replace(/[()-\s]/g, ""))) {
        return false;
    }
    return true;
}

function dateChecker(date) {
    if (NullOrEmptyCheck(date) ||
        date.length < 10
     ) {
        return false;
    }
    return true;
}

function textChecker(text) {
    if (NullOrEmptyCheck(text) ||
        text.length > 128
    ) {
        return false;
    } else if (xssText(text)) {
        console.log("You are trying to be a naughty boi, aren't you?...");
        return false;
    }
    else {
        return true;
    }
}

function hasEmailError(email) {
    let isError = false;

    if (email.length < 7) {
        isError = true;
    }

    if (NullOrEmptyCheck(email)) {
        isError = true;
    }

    if (xssText(email)) {
        console.log("You are trying to be a naughty boi, aren't you?...");
        isError = true;
    }

    return isError;
}

function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
}

function isEmpty(str) {
    return !str.replace(/^\s+/g, '').length; // boolean (`true` if field is empty)
}

function isNotaNumberChecker(value) {
    let input = value.split("");
    let reg = /^[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    let isNumber = true;

    for (var n = 0; n < input.length; n++) {
        if (reg.test(input[n])) {
            isNumber = false;
        }
    }

    return isNumber;
}

function xssText(str) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;'
    };
    const regEx = /[&<>"'/]/ig;
    return regEx.test(str);
}

function GetDays() {

    var dayArr = [];
    const maxDays = 27;

    console.log(maxDays);

    for (var i = 0; i < maxDays; i++) {
        dayArr.push(i + 1);
    }

    return dayArr;
}

function VariableChecker(variable) {
    var isGud = true;

    if (variable === "" || variable === NaN || variable === undefined || typeof variable === 'undefined' || variable === void 0) {
        isGud = false;
    }

    return isGud;
}

function selectOption(selObj, selItem) {
    var selObj = document.getElementById(selObj);
    var passedVal = selItem.trim();
    for (var i = 0; i < selObj.options.length; i++) {
        var item = selObj[i].value;
        if (item === passedVal) {
            selObj.value = passedVal;
        }
    }
}

function selectOptionHeightFt(selHeight) {
    var translatedHeight;
    translatedHeight = Math.floor(selHeight / 12);

    return translatedHeight;
}

function selectOptionHeightIn(selHeight) {
    var translatedHeight;
    translatedHeight = Math.abs((Math.floor(selHeight / 12) * 12) - selHeight);

    return translatedHeight;
}


function InitalizeSignaturePad(padID, saveID, resetID, penColor) {
    $(document).ready(function () {
        console.log(padID + " " + penColor);

        var canvas = document.getElementById(padID);

        if (typeof (canvas) !== 'undefined' && canvas !== null) {
            var signaturePad = new SignaturePad(canvas, {
                backgroundColor: 'rgba(255, 255, 255, 0)',
                penColor: penColor.value
            });

            var saveButton = document.getElementById(saveID);
            var cancelButton = document.getElementById(resetID);

            saveButton.addEventListener('click', function (event) {

                var isEmpty = signaturePad.isEmpty();

                if (isEmpty) {
                    var dataPNG = "";

                    //Show the signature in different formats to test that everything's working
                    sessionStorage.setItem("savedSig", dataPNG);
                }
                else {
                    var dataPNG = signaturePad.toDataURL('image/png');

                    //Show the signature in different formats to test that everything's working
                    sessionStorage.setItem("savedSig", dataPNG);

                    $("#" + padID + "-alertDiv").empty();
                }
                
            });

            cancelButton.addEventListener('click', function (event) {
                signaturePad.clear();
            });
        }
    });
}

function ObjectCheck(obj) {
    if (obj === null) {
        return false;
    }

    return ((typeof obj === 'function') || (typeof obj === 'object'));
}

function EnableAndRequiredCheck(enabled, required) {
    let output = "";

    if (enabled === false) {
        output += " disabled ";
    }
    if (required === true) {
        output += " required ";
    }

    return output;
}

function DigitInputLimiter(id, max) {
    $(document).ready(function () {

        let controlVal = $("#" + id).val();

        if (!NullOrEmptyCheck(controlVal)) {
            if (numberInputChecker(controlVal)) {
                if (controlVal.length > max) {
                    $("#" + id).val(controlVal.substring(0, max));
                }
            }
        }
    });
}

function randomNumberWhole(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}  

function randomNumberFloat(min, max) {
    return Math.random() * (max - min) + min;
}  
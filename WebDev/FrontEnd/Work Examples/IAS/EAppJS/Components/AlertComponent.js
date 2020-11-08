
function AlertController(
    alertType,
    alertVal
){

    function AlertTypeSwitch(type){
        switch (type) {
            case "danger":
                return `<div class='alert alert-danger' role='alert'>`;
            case "warning":
                return `<div class='alert alert-warning' role='alert'>`;
            case "info":
                return `<div class='alert ' role='alert'>`;
        }
    };

    function AlertIconSwitch(type){
        switch (type) {
            case "danger":
                return `<i class='fa fa-exclamation'></i> `;
            case "warning":
                return `<i class='fa fa-exclamation-triangle'></i> `;
            case "info":
                return `<i class='fa fa-question-circle'></i> `;
        }
    };

    return `${AlertTypeSwitch(alertType)} ${AlertIconSwitch(alertType)} ${alertVal} </div>`;
}
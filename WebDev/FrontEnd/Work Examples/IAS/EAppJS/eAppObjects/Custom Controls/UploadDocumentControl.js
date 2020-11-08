class UploadForm {
    constructor(
        val,
        secondaryVal
    ) {
        this.value = val;
        this.secondaryValue = secondaryVal;
    }
}

class UploadTable {
    constructor(
        val,
        secondaryVal,
        uploadedDocsArr
    ) {
        this.value = val;
        this.secondaryValue = secondaryVal;
        this.uploadedDocuments = uploadedDocsArr;
    }
}

function UploadFormController(
    formVal,
    formSecondVal
) {

}
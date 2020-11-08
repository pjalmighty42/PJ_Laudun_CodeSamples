//The controller function to create the actual modal link
function DigiCertModalComponentController() {

    let digiCertImg = baseUrl + sessionStorage.getItem("digiCertImg");

    return `<button class='digiModalButton' data-toggle='modal' onclick='OpenDigiCertModalComp("DigiCertModal")'>
                <img border='0' alt='DigiCert Seal' src='${digiCertImg}' width='125' height='75' title='EApp DigiCert Information'>
                </button>`;
};

function CreateDigiCertModalComponent() {
    let certHeader = HeaderController(
        3,
        "Is my information Secure?",
        "",
        ""
    );
    let CertPara1 = ParagraphController(
        "",
        "question-info",
        "This website is protected under the highest level of security available using DigiCert EV SSL. This is the most trusted and secure choice for Web site security. Not only is your information secure in transit, our company has completed a thorough documentation process, and our licensing and incorporation has been verified. In addition, your information is protected in our environment under the Federal laws of HIPAA, GLB, and HITECH."
    );

    let CertPara2 = ParagraphController(
        "",
        "question-info",
        "<a href='https://seal.digicert.com/seals/popup/?tag=P0CYERoT&url=test-ext.iasadmin.com&lang=en_US&cbr=1548347705705' target='_blank'><img border='0' alt='DigiCert Seal' src='" + baseUrl + "resources/eApp/img/digicert_logo.png' width='100' height='75'></a>"
    );

    return `<div id='DigiCertModal' class='modal fade info-modal'>
        <div class='modal-dialog modal-dialog-centered modal-lg'>
        <div class='modal-content'>
        <div class='modal-header'>
        <h3 class='modal-title'>EApp DigiCert Certification</h3>
        <button id='DigiCertModal' type='button' class='close' onclick='CloseModal(this.id)'>&times;</button>
        </div>
        <div class='modal-body'>
        ${certHeader}
        ${CertPara1}
        ${CertPara2}
        </div>
        <div class='modal-footer'>
        <button id='DigiCertModal' type='button' class='btn btn-danger' onclick='CloseModal(this.id)'>Close</button>
        </div>
        </div>
        </div>
        </div>`;
};


function OpenDigiCertModalComp(id) {
    $('body').append(CreateDigiCertModalComponent());
    $("#" + id).modal("show");
}

function PDFViewerController(
    pdfSrc
) {
    return `
        <div class='pdf-container question-block col-12'>
        <iframe id='pdf-viewer' src='${pdfSrc}'>If you are seeing this, the 'iframe' tag is not supported by your browser.</iframe>
        </div>
    `;
};
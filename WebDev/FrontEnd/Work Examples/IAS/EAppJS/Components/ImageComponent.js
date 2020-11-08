class ImageObj {
    constructor(
        imgSrc = "",
        imgAlt = ""
    ) {
        this.imgSrc = !NullOrEmptyCheck(imgSrc) ? imgSrc : "";
        this.imgAlt = !NullOrEmptyCheck(imgAlt) ? imgAlt : "Error: No Image!";
    }
}


function ImageComponentController(
    imgSrc,
    imgAlt
){
    function CreateImgComponent(imgObj){
        let imgObject = [];

        imgObject.push("<div>");
        imgObject.push("<img class='mx-auto d-block img-fluid' src='" + imgObj.imgSrc + "' alt='" + imgObj.imgAlt + "'>");
        imgObject.push("</div>");

        return CreateElement(imgObject);
    };

    return CreateImgComponent(
        new ImageObj(
            imgSrc,
            imgAlt
        )
    );
};

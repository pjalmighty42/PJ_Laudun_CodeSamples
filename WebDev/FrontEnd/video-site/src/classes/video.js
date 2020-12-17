class Video {
    assocAuthorID = "";
    videoID = "";
    favUserIds = [];

    videoURL = "";
    videoSrcShot = "";
    videoTitle= "";
    videoSubtitle = "";
    datePosted = "";
    videoTags = [];
    supportLogoIDs = [];
    supportText = "";
    videoInfo = "";
    videoCat = "";
    videoSensitivity = "";
    views = 0;
    likes = 0;
    dislikes = 0;
    reported = false;
    reportedMsgs = [];
    
    setVideoInfo (
        videoObj
    ){
        this.assocAuthorID = videoObj.authId;
        this.videoID = videoObj.vidId;
        this.favUserIds = videoObj.favUserIds;
        this.videoURL = videoObj.url;
        this.videoSrcShot = videoObj.screenShot;
        this.videoTitle= videoObj.title;
        this.videoSubtitle = videoObj.subTitle;
        this.datePosted = videoObj.datePosted;
        this.videoTags = videoObj.tags;
        this.supportLogoIDs = videoObj.logoIds;
        this.supportText = videoObj.spptText;
        this.videoInfo = videoObj.vidInfo;
        this.videoCat = videoObj.vidCat;
        this.videoSensitivity = videoObj.vidSens;
        this.views = videoObj.views;
        this.likes = videoObj.likes;
        this.dislikes = videoObj.dislikes;
        this.reported = videoObj.reported;
        this.reportedMsgs = videoObj.reportedMsgs;
    };

    getVideoInfo(){
        return {
            authId: this.assocAuthorID,
            vidId: this.videoID,
            favUserIds: this.favUserIds,
            url: this.videoURL,
            screenShot: this.videoSrcShot,
            title: this.videoTitle,
            subtitle: this.videoSubtitle,
            datePosted: this.datePosted,
            tags: this.videoTags,
            logoIds: this.supportLogoIDs,
            spptText: this.supportLogoText,
            vidInfo: this.videoInfo,
            vidCat: this.videoCat,
            vidSens: this.videoSensitivity,
            views: this.views,
            likes: this.likes,
            dislikes: this.dislikes,
            reported: this.reported,
            reportedMsgs: this.reportedMsgs
        };
    }
}

class Message{
    assocVidID = "";
    msgUserName = "";
    userAvatarImg = "";
    comment = "";
    likes = 0;
    reported = false;
    reportedMsgs = [];
    replied = false;
    repliedMsgs = [];
}
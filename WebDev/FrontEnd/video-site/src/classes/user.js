class User {
    userID = '';
    userName = '';
    userImg = "";
    userColorSel = 'light';
    selectedVideoId = 0;
    last5VidIDs = [];

    setUserInfo(
        id, 
        name, 
        img,
        color, 
        selVidID
    ){
        this.userID = id;
        this.userName = name;
        this.userImg = img;
        this.userColorSel = color;
        this.selectedVideoId = selVidID;

        if(this.last5VidIDs.length > 5){
            this.last5VidIDs.push(selVidID);
            this.last5VidIDs.splice(0, 1);
        }
        else{
            this.last5VidIDs.push(selVidID);
        }
    };

    getUserInfo (){
        return {
            id: this.userID,
            name: this.userName,
            img: this.userImg,
            color: this.userColorSel,
            lastVidID: this.selectedVideoId,
            last5Vids: this.last5VidIDs
        };
    }
}

class UserList {
    userList = [];

    setUserList (
        userObj
    ){
        let newUser = new User();

        this.userList.push(newUser.setUserInfo(
            userObj.id,
            userObj.name,
            userObj.userImg,
            userObj.selColor,
            ""
        ));
    };

    Add
}
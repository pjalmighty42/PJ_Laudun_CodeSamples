import { makeAutoObservable } from "mobx";

export default class User {
    userID = '';
    userName = '';
    userColorSel = 'light';

    constructor(){
        makeAutoObservable(this);
    }

    setUserInfo(id, name, color){
        this.userID = id;
        this.userName = name;
        this.userColorSel = color;
    }
}
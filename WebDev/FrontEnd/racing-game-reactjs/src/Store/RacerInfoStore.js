import { createContext } from 'react';
import { decorate, observable, computed } from 'mobx';

export class RaceInfo{
    raceInfo = [
        {id: "Amount", value: 0},
        {id: "RacerExpLevels", value: [0, 0]},
        {id: "Difficulty", value: 0},
    ];

    setAmount = val => {
        let amtLS = parseInt(JSON.parse(window.localStorage.getItem("amt")));
        this.raceInfo[0].value = val > 0 ? val : amtLS;
    };

    setRacerLevels = (val1, val2) => {
        let lvlsLS =  [parseInt(JSON.parse(window.localStorage.getItem("lvl1"))), parseInt(JSON.parse(window.localStorage.getItem("lvl2")))];
        this.raceInfo[1].value = val2 > 0 ? [val1, val2] : lvlsLS;
    };

    setDiffLevel = val => {
        let diff = parseInt(JSON.parse(window.localStorage.getItem("diff")));
        this.raceInfo[2].value = val > 0 ? val : diff;
    };

    get returnRaceInfo(){
        return this.raceInfo;
    };
}

decorate(RaceInfo, {
    raceInfo: observable,
    returnRaceInfo: computed
});

export default createContext(new RaceInfo());
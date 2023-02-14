import { autorun, makeObservable } from 'mobx';

export default class DynamicStore{

    dataSets = [];

    constructor(){
        makeObservable(this, {
            dataSets: observable,
            addDataSet: action,
            getDataSetByName: action
        });
    };

    addDataSet(name, dataObject){
      
        let newDsObj = {
         "name": name,
         "dSet": dataObject
       };
       this.dataSets.push(newDsObj);
   };

   getDataSetByName(name){
       return this.dataSets.filter(d => d.name === name);
   };
};
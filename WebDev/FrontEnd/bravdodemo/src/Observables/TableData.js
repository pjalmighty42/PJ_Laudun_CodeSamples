import React, {useState, useContext, createContext} from 'react';

import moment from 'moment';

import tableData from '../JSONfiles/appointments.json';

const TableListContext = createContext();
const TableOutContext = createContext();
const RemoveItemContext = createContext();
const EditItemContext = createContext();
const AddItemContext = createContext();
const ItemByKeyContext = createContext();

function UseTableData(){
    return useContext(TableListContext);
}

function UserTableDataOut(){
    return useContext(TableOutContext);
}

function RemoveTableData(){
    return useContext(RemoveItemContext);
}

function EditTableData(){
    return useContext(EditItemContext);
}

function AddTableData(){
    return useContext(AddItemContext);
}

function GetItemByKey(){
    return useContext(ItemByKeyContext);
}

function TableProvider ({children}) {

    const tableOut = tableData.map((d, i) => {
        let timeOut = (time) => {
            let amPm = "AM";
            let timeSplit = time.split(":");

            if(parseInt(timeSplit[0]) > 12){
                amPm = "PM";
                return (parseInt(timeSplit[0]) - 12) + ":" + timeSplit[1] + " " + amPm;
            }
            else if(parseInt(timeSplit[0]) === 12){
                amPm = "PM";
                return time + " " + amPm;
            }
            else{
                return time + " " + amPm;
            }
        }

        return {
            key: d.id,
            date: moment(d.date).format("MM/DD/YYYY"),
            time: timeOut(d.time),
            whom: d.whom,
            location: d.location,
            notes: d.notes
        }
    });

    const [currTableList, setTableList] = useState(tableOut);

    const RemItemFromTable = (key) => {
        //Remove the item from table list
        let remArr = currTableList.filter((item) => parseInt(item.key) !== key);
        //Reset the key numbers (because of the table)
        remArr.map((r, i) => {
            return r.key = i
        });

        console.log(remArr);
        setTableList(remArr);
    }

    const EditItemFromTable = (item) => {
        let changedArr = currTableList.map((t, i) => {
            if(t.key === item.key){
                return t = item;
            }
            return t;
        });

        console.log(changedArr);
        setTableList(changedArr);
    }

    const AddItemToTable = (item) => {
        setTableList([...currTableList, item]);
    }

    const GetItemByKey = (key) => {
        return currTableList.find(c => parseInt(c.key)  === key);
    }

    const dataOut = currTableList.map((c, i) => {
        let locOut = c.location.city + ", " + c.location.state;

        return {
            key: i,
            date: c.date,
            time: c.time,
            whom: c.whom,
            location: locOut,
            notes: ""
        }
    })

    return(
        <TableListContext.Provider value={currTableList}>
            <TableOutContext.Provider value={dataOut}>
                <RemoveItemContext.Provider value={RemItemFromTable}>
                    <EditItemContext.Provider value={EditItemFromTable}>
                        <AddItemContext.Provider value={AddItemToTable}>
                            <ItemByKeyContext.Provider value={GetItemByKey}>
                                {children}
                            </ItemByKeyContext.Provider>
                        </AddItemContext.Provider>
                    </EditItemContext.Provider>
                </RemoveItemContext.Provider>
            </TableOutContext.Provider>
        </TableListContext.Provider>
    );
};

export {TableProvider, UseTableData, UserTableDataOut, EditTableData, AddTableData, RemoveTableData, GetItemByKey};
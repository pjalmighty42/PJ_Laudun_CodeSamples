import React, {useState} from 'react'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePageination from '@material-ui/core/TablePagination';

import '../../Styles/Table.css';

export default function OutputTable(props) {

    const [currPage, setCurrPage] = useState(0);
    const [pageRows, setPageRows] = useState(12);

    let tableOutput = [];
    let pagerOutput = [];

    const handlPageChange = val => {
        setCurrPage(val);
    };

    if(props.racerAmt > 0){
        const data = require('../../Assets/racer-names.json');

        let racerList = [];
        let finalList = [];
        let timedList = [];
        
        const createFullRacersList = () => {
            const racers = [...data];

            for(let r = 0; r < racers.length; r++){
                racerList.push({
                    id: racers[r].id,
                    fName: racers[r].first_name,
                    exp: createRandomExp(0, 100)
                });
            }
        }

        const createRandomExp = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const calculateFinishTime = (diffLvl) => {
            const returnLapTime = (diff) => {
                switch(diff){
                    case 0:
                        return createRandomExp(54, 60);
                    case 25:
                        return createRandomExp(61, 90);
                    case 50:
                        return createRandomExp(91, 120);
                    case 75:
                        return createRandomExp(121, 150);
                    case 100:
                        return createRandomExp(151, 180);
                    default:
                        return 0;
                };
            };

            const computeRacerLapTime = (diffTime, racerExp, ovrDiffLvl) => {
                if(racerExp > 0 && racerExp <= (ovrDiffLvl - 15)){
                    return createRandomExp(diffTime, (diffTime + 25));
                }
                else if(racerExp > (ovrDiffLvl - 15) && racerExp <= (ovrDiffLvl - 5)){
                    return createRandomExp(diffTime, (diffTime + 10));
                }
                else{
                    return createRandomExp(diffTime, (diffTime - 5));
                }
            };

            let diffLapTime = returnLapTime(props.diffLvl);

            for(let r = 0; r < finalList.length; r++){
                let time = computeRacerLapTime(diffLapTime, finalList[r].exp, props.diffLvl);

                timedList.push({
                    id: finalList[r].id,
                    fName: finalList[r].fName,
                    exp: finalList[r].exp,
                    finishTime: time
                });
            }

            console.log(timedList);
            timedList.sort((a, b) => a.finishTime - b.finishTime);

            for(let t = 0; t < timedList.length; t++){
                timedList[t].id = t + 1;
            }
        };
        
        const createRacersData = (numberOfRacers, expLevels, diff) => {
            
            if(expLevels[1] > 0){
                createFullRacersList();

                let tempList = [];
    
                for(let r = 0; r < racerList.length; r++){
                    if(racerList[r].exp > expLevels[0] && racerList[r].exp < expLevels[1]){
                        tempList.push(racerList[r]);
                    }
                }
    
                for(let t = 0; t < tempList.length; t++){
                    if(finalList.length < numberOfRacers){
                        finalList.push(tempList[t]);
                    }
                }
    
                console.log(finalList);
    
                calculateFinishTime(finalList);
            }
        }; 

        createRacersData(
            parseInt(props.racerAmt), 
            props.expLvl !== '' ? [parseInt(props.expLvl[0]), parseInt(props.expLvl[1])] : [0, 0], 
            parseInt(props.diffLvl)
        );

        if(timedList.length > 0){
            let outList = timedList.slice(currPage * pageRows, currPage * pageRows + pageRows);
            tableOutput = outList.map((racer, idx) => (
                <TableRow key={(racer.fName + "_" + idx)}>
                    <TableCell component="th" scope="row">{racer.id}</TableCell>
                    <TableCell align="center">{racer.fName}</TableCell>
                    <TableCell align="center">{racer.exp}</TableCell>
                    <TableCell align="center">{racer.finishTime}</TableCell>
                </TableRow>
            ));

            pagerOutput =
                <TableRow>
                    <TablePageination 
                        colSpan={4}
                        count={timedList.length}
                        rowsPerPage={pageRows}
                        page={currPage}
                        SelectProps={{
                            inputProps: { "aria-label": "rows per page" },
                            native: true
                        }}
                        onChangePage={(e, val) => handlPageChange(val)}
                        rowsPerPageOptions={[]} 
                    />
                </TableRow>;
        }
        else{
            tableOutput = <TableRow key={0}>
                <TableCell component="th" scope="row" colSpan={4}>No Racers Selected!</TableCell>
            </TableRow>;
            pagerOutput = <TableRow key={0}>
                <TableCell component="th" scope="row" colSpan={4} />;
            </TableRow>;
        }
    }
    else{
        tableOutput = <TableRow key={0}>
            <TableCell component="th" scope="row" colSpan={4}>No Racers Selected!</TableCell>
        </TableRow>;
        pagerOutput = <TableRow key={0}>
            <TableCell component="th" scope="row" colSpan={4} />;
        </TableRow>;
    }
   
    return (
        <Container fixed className="table-container">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className="Output-Table-Container">
                        <Table className="Output-Table-Main">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Pos</TableCell>
                                    <TableCell align="center">Racer Name</TableCell>
                                    <TableCell align="center">EXP Level</TableCell>
                                    <TableCell align="center">Finish Time</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableOutput}
                            </TableBody>
                            <TableFooter>
                                {pagerOutput}
                            </TableFooter>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
};

import React, { Component } from 'react';
import './App.css';
import TableBody from '../Components/Table/TableBody/TableBody';

class App extends Component {

  state = {
    fizz: [],
    buzz: [],
    fizzbuzz:[]
  };

  CreateNumberList = () => {

    let fizzList = [];
    let buzzList = [];
    let fizzBuzzList = [];

    for(let i = 0; i <= 100; i++){
      if(i%3 === 0 && i%5 === 0){
          fizzBuzzList.push({
            id: i,
            val: i,
            fbRes: 'FizzBuzz'
        })
      }
      else if(i%3 === 0){
        fizzList.push({
            id: i,
            val: i,
            fbRes: 'Fizz'
          })
      }
      else if(i%5 === 0){
        buzzList.push({
            id: i,
            val: i,
            fbRes: 'Buzz'
        })
      }
    }

    this.setState(
      {
        fizz: fizzList,
        buzz: buzzList,
        fizzbuzz: fizzBuzzList
      }
    )
  }

  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome...To...FIZZBUZZ!!</h1>
        </header>
        <div className="btnContainer">
          <p className="App-intro">
            Prepared to see my swag-MLG-React SKILLZ, yo!
          </p>
          <button onClick={this.CreateNumberList}>Click TIS!</button>
        </div>
        <div className="tablediv">
          <TableBody items = {this.state.fizz} />
          <TableBody items = {this.state.buzz} />
          <TableBody items = {this.state.fizzbuzz} />
        </div>
      </div>
    );
  }
}

export default App;

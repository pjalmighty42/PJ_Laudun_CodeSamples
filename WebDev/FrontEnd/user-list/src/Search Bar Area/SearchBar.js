import React, { Component } from 'react';

import ResultsTable from '../Results Table/ResultsTable';

import '../styles/css/templates/searchbartemplate.min.css';
import '../styles/css/organisms/searchbarorganism.min.css';

/*
  SearchBar.js will need to be a Component Class as this class will need to store various state 
  variables to pass down to the Table Results Component for filtering purposes.
 */

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      _PEOPLE: [], //Constant var, will always have the original person objects to reference
      filteredList: [], //Mutatable, will always change depending on the search being done
      filterName: ""
    };
  }

  /*
    Why here? Was thinking of posting it in the App.js, but then that would mean that I would be populating two 
    lists, twice. One in the App.js and another here, and that would just be redundant and expensive, so I just 
    moved it here to avoid the middle man.
  */
  componentDidMount = () =>{
    let state = this;
    let personListURL = 'https://randomuser.me/api/?results=25&?inc=name,location,email,id,picture&?nat=us';

    fetch(personListURL)
    //Error check
    .then(function(response){
        if(response.status >= 400){
          throw new Error("400 Server Error!");
        }
      return response.json();
    })
    //If no errors, populate people array
    .then(function(data){
        let peopleList = [];
        //Info obj > Results actually returns a total count of items in the array
        for(let p = 0; p < data["info"].results; p++){ 
          /*
            Break apart the Results objects, to create more useable objects for the peopleList array, 
            and only use the items needed (to reduce overhead from having the login information, so we're only
            dealing with information that is needed).
          */
          peopleList.push({
              id: p,
              pic: data.results[p].picture.thumbnail,
              firstName: data.results[p].name.first,
              lastName: data.results[p].name.last,
              fullName: data.results[p].name.first + ' ' + data.results[p].name.last,
              location: data.results[p].location.state,
              email: data.results[p].email
            }
          )};

          console.log(peopleList);

          //We will keep a stored copy, in case we need to go back to have everyone
          state.setState({_PEOPLE: peopleList});
          state.setState({filteredList: peopleList});
      });
  }

  /*
    This is actually a revisoned version of w3school's search bar.
    Basically, since event is async in React, it constantly is updating, so I just need to make sure 
    that everything is in lower case (to avoid false positives/negatives), then compared it with a lower case
    version of the person at n. If the indexOf > -1 (it shows up more than null), then find the 
    Person with the full name that matches the event value. And since the event updates async, that
    means that the list will automatically update with a newer array of objects (the find is actually
    drawing the objects it found and storing that into an updated list).
  */
  handleChange = (event) => {

    let newFilteredList = [];

    //Check so that I could get the actual value of the inputted search text
    let eventValLowerCase = event.target.value.toLowerCase();
    console.log(eventValLowerCase);
    
    for(let n = 0; n < this.state._PEOPLE.length; n++){
        let person = this.state._PEOPLE[n].fullName.toLowerCase();
        if(person !== null){
            if(person.indexOf(eventValLowerCase) > -1){
                newFilteredList.push(this.state._PEOPLE.find(p => p.fullName === person));
            }
        }
    }

    //console.log(newFilteredList);

    this.setState({filteredList: newFilteredList});
  }

  /*
    This handleClickSort-thingy actually started out as multiple sort functions. Then I smacked myself
    (not literally) when I realized that I should DRY it out, then I abstracted it with a switch statement. 
    Now it sorts via an onClick event handler, and passes a thing to sort lots of things by! This clues everything else to
    run a simple sort method and return a filtered list on if nameA is > nameB (again lower cased to avoid false 
    positives/negatives).
  */
  handleClickSort = (sortBy) => {

    let sortedList = [];

    switch(sortBy){
        case 'first':
            sortedList = this.state.filteredList.sort(function(a, b){
                let nameA = a.firstName.toLowerCase();
                let nameB = b.firstName.toLowerCase();
                
                return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
            });
        break;
        case 'last':
            sortedList = this.state.filteredList.sort(function(a, b){
                let nameA = a.lastName.toLowerCase();
                let nameB = b.lastName.toLowerCase();
                
                return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
            });
        break;
        case 'email':
            sortedList = this.state.filteredList.sort(function(a, b){
                let nameA = a.email.toLowerCase();
                let nameB = b.email.toLowerCase();
                
                return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
            });
        break;
        case 'loc':
            sortedList = this.state.filteredList.sort(function(a, b){
                let nameA = a.location.toLowerCase();
                let nameB = b.location.toLowerCase();
                
                return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
            });
        break;
        default:
        break;
    }

    

    console.log(sortedList);

    this.setState({filteredList: sortedList});
  }

  render(){
    return(
      <div className="searchbar-container">
        <div className="searchbar-filter-header row">
            <div className="searchbar-filter-container col-sm-12">
                {/* Searchbar Area */}
                <div className="searchbar-div col-sm-8">
                  <i className="fa fa-search"></i>
                  <input className="searchbar" placeholder="Type to search..." onChange={this.handleChange.bind(this)} />
                </div>

                {/* Filter Area */}
                <div className="filter-div col-sm-4">
                  <div className="filter-dropdown col-sm-6">
                    <button type="button" 
                      className="filter-btn-dropdown btn-block">
                        Filter <i className="fa fa-filter"></i>
                    </button>
                    <div className="dropdown-content">
                      <ul>
                          <li>
                            <a className="sort-area" onClick={() => this.handleClickSort('first')}>First Name</a>
                          </li>
                          <li>
                            <a className="sort-area" onClick={() => this.handleClickSort('last')}>Last Name</a>
                          </li>
                          <li>
                            <a className="sort-area" onClick={() => this.handleClickSort('email')}>E-Mail</a>
                          </li>
                          <li>
                            <a className="sort-area" onClick={() => this.handleClickSort('loc')}>Location</a>
                          </li>
                      </ul>
                    </div>
                  </div>
                  <div className="add-btn-span col-sm-6">
                    <button type="button" 
                      className="add-btn btn-block">
                        <i className="fa fa-user"></i><span> Add Contact</span>
                    </button>
                  </div>
                </div>
            </div>
        </div>
        <div className="results-output row">
          <div className="results-container col-sm-12">

              <ResultsTable 
                items ={this.state.filteredList}
              />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
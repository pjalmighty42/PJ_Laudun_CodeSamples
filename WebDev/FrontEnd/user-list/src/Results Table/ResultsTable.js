import React, { Fragment } from 'react';
import '../styles/css/templates/resultstabletemplate.min.css';
import '../styles/css/organisms/resultstableorganism.min.css';

/*
  Actually figured out this issue a while ago. I realized that 16.2's update of React
  actually allows the Fragment call. This actually helps anytime I need to reiterate 
  output of items. So I used the new Fragment feature to output table rows that have the 
  various person's information. 
*/
const ResultsTable = (props) => {
  return (
    props.items.map(item => (
      <Fragment key={item.id}>
        <div className="results-div">
          <div className="pic-name-area row">
            <figure className="pic-container col-sm-3">
              <img className="pic" src={item.pic} alt="img" />
            </figure>
            <div className="info-container col-sm-6">
              <p className="person-name">{item.firstName} {item.lastName}</p>
              <p className="person-email">{item.email}</p>
              <p className="person-loc">{item.location}</p>
            </div> 
            <div className="dropdown-container col-sm-3">
              <div className="results-ddl">
                <button className="dropdown-btn"><i className="fa fa-ellipsis-h"></i></button>
                <div className="dropdown-content">
                <ul>
                    <li>
                      <a><i className="fa fa-pencil" aria-hidden="true"></i> Edit</a>
                    </li>
                    <li>
                      <a><i className="fa fa-trash" aria-hidden="true"></i> Remove</a>
                    </li>
                    <li>
                      <a><i className="fa fa-files-o" aria-hidden="true"></i> Duplicate</a>
                    </li>
                </ul>
                </div>
              </div>
            </div>
            
          </div>
          <div className="tags-sel-area row">
            <div className="tags-container col-sm-9">
              <span className="tags">Example Tag</span>
              <span className="tags">Example Tag</span>
              <span className="tags">Example Tag</span>
            </div>
            <div className="cb-container col-sm-2">
              <input type="checkbox" />
            </div>
          </div>
        </div>
      </Fragment>
    ))
  )
};

export default ResultsTable;
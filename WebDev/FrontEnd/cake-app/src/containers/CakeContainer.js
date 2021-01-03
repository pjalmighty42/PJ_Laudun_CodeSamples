import React from 'react';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
    return {
        numOfCakes: state.cake.numOfCakes
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        buyCake: () => dispatch(buyCake())
    };
};

const CakeContainer = (props) => {
    return (
        <div>
            <h2>Number of Cakes: {props.numOfCakes}</h2>
            <button onClick={props.buyCake}>Buy Cake</button>
        </div>
    );
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(CakeContainer);
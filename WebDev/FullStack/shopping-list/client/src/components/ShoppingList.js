import React, { useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap';
import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group';

import { connect } from 'react-redux';
import { 
    getItems,
    deleteItems
 } from '../redux/Item/ItemActions';

const ShoppingList = (props) => {

    useEffect(()=> {
        getItems();
    }, []);

    console.log(props.items);
    const { items } = props.items;

    let ShoppingList = () => {
        let DeleteItem = (id) => {
            deleteItems(id);
        };

        return (
            <Fragment>
                {
                    items.map(item => {
                        return(
                            <CSSTransition 
                                key={item.id} 
                                timeout={500} 
                                classNames="fade">
                                <ListGroupItem key={item.id}>
                                    <Button 
                                        className="removeBtn"
                                        color="danger"
                                        size="sm"
                                        onClick={() => DeleteItem(item.id)}
                                    >&times;</Button>
                                    {item.name}
                                </ListGroupItem>
                            </CSSTransition> 
                        );
                    })
                }
            </Fragment>
        );
    }
    
    return (
        <Container>
            <ListGroup>
                <TransitionGroup className="shopping-list">
                    <ShoppingList></ShoppingList>
                </TransitionGroup>
            </ListGroup>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    items: state.items
});

ShoppingList.protoTypes = {
    getItems: PropTypes.func.isRequired,
    items: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {
     getItems,
     deleteItems
    })(ShoppingList);
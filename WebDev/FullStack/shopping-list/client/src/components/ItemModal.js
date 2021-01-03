import React, {useState} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import {connect} from 'react-redux';
import { addItem } from '../redux/Item/ItemActions';

const AddBtnStyle = {
    marginBottom: '2rem'
};

const SubmitBtnStyle = {
    marginTop: '2rem'
}

const ItemModal = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [getItemName, setItemName] = useState("");

    const toggle = () => {
        setModalOpen(!isModalOpen);
    };

    const onInputChange = (e) => {
        setItemName(e.target.value);
    };

    const onItemSubmit = (e) => {
        e.preventDefault();
        //Leaving it like this as when we connect to the DB the ID will auto populate
        const newItem = {
            id: 1,
            mame: getItemName
        };
        //Add item via addItem Action
        addItem(newItem);

        //Close Modal
        toggle();
    }

    return (
        <div>
            <Button
                color="dark"
                style={AddBtnStyle}
                onClick={toggle}
            >Add Item</Button>
            <Modal
                isOpen={isModalOpen}
                toggle={toggle}
            >
                <ModalHeader
                    toggle={toggle}
                >
                    Add to Shopping List
                </ModalHeader>
                <ModalBody>
                    <Form
                        onSubmit={onItemSubmit}
                    >
                        <FormGroup>
                            <Label for="item">Item</Label>
                            <Input 
                                type="text"
                                name="getItemName"
                                id="item"
                                placeholder="Add Shopping Item..."
                                onChange={onInputChange}
                            />
                            <Button
                                color="dark"
                                style={SubmitBtnStyle}
                                block
                            >
                                Add Item
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
};

const mapStateToProps = (state) => ({
    items: state.items
});

export default connect(
    mapStateToProps, 
    { addItem }
)(ItemModal);

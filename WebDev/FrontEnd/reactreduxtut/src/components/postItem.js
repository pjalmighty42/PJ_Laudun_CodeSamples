import React, {Fragment, useState} from 'react';
import { useDispatch } from 'react-redux';

import { editPost } from '../actions/postActions';

const btnDiv = {
    display: 'flex',
    justifyContent: 'end'
}

const btn = {
    marginRight: '15px'
}

const PostItems = (props) => {
    const dispatch = useDispatch();

    const [isEdit, setIsEdit] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [currID, setCurrID] = useState(0);

    const onChangeTitle = (e) => {
        console.log(e.target.value)
        setTitle(e.target.value);
    };
    const onChangeBody= (e) => {
        console.log(e.target.value)
        setBody(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        console.log({ 
            title: title,
            body: body
        });

        let post = { 
            id: currID,
            title: title,
            body: body
        };

        dispatch(editPost(post));
        setIsEdit(false);
    };

    const editThisPost = (e) => {
        const editID = e.target.getAttribute("data-edit");
        setCurrID(editID);
        setIsEdit(true);
    }

    return(
        <div key={props.id}>
            {
                isEdit ? 
                <Fragment>
                    <div>
                        <label>Title</label><br />
                        <input type="text" name="title" value={title} onChange={onChangeTitle} />
                    </div>
                    <div>
                        <label>Body</label><br />
                        <textarea name="body" value={body} onChange={onChangeBody} />
                    </div>
                    <div style={btnDiv}>
                        <button type="submit" onClick={onSubmit}>Submit</button>
                    </div> 
                </Fragment>
                :
                <Fragment>
                    <h3>{props.title}</h3>
                    <p>{props.body}</p>
                    <div style={btnDiv}>
                        <button style={btn} data-edit={props.id} onClick={editThisPost}>Edit</button>
                        <button>Delete</button>
                    </div>
                </Fragment>
                
            }
        </div>
    ) 
};

export default PostItems;
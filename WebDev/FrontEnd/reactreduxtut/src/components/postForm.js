import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

import { addPost } from '../actions/postActions';

const PostForm = () => {

    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

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
            title: title,
            body: body
        };

        dispatch(addPost(post));
    };

    return(
        <div>
            <h1>Add Post</h1>
            <form>
                <div>
                    <label>Title</label><br />
                    <input type="text" name="title" value={title} onChange={onChangeTitle} />
                </div>
                <div>
                    <label>Body</label><br />
                    <textarea name="body" value={body} onChange={onChangeBody} />
                </div>
                <br />
                <button type="submit" onClick={onSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default PostForm;
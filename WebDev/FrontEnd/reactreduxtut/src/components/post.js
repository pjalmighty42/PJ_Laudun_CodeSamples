import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';

import {getPosts} from '../actions/postActions';

import PostItem from './postItem';

const Post = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.post.posts);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch])


    console.log(posts);

    return (
        <div>
            <h1>Post</h1>
            {
                posts.map(p => 
                    <PostItem 
                        id={p.id}
                        title={p.title}
                        body={p.body}
                    />
                )
            }
        </div>
    );
};

export default Post;
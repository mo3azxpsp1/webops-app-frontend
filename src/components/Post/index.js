import React, { Component } from 'react';
import './index.css';
import {Link} from 'react-router-dom';
import moment from 'moment';

export default class Post extends Component {

    render(){
        const {post, remove} = this.props;
        var timeAgo = moment(post.time).fromNow()
        return (
            <div className="one-post">
            	<p>{post.user ?  post.user : localStorage.UserFullName} wrote:</p>
            	{timeAgo} <br/>
                {post.body} <br/>
                comments ({post.comments ? post.comments : 0}) <br/>
                <button onClick = {() =>remove(post, post.id)}>X</button> <br/>
                <Link to={`/details/${post.id}`}>Post details</Link> <br/>
            </div>
        )
    }
}
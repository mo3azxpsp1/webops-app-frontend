import React, { Component } from 'react';
import Axios from 'axios';
import moment from 'moment';
import './index.css';

export default class PostDetails extends Component {
    constructor() {
        super();
        this.state = {
            post: '',
            comments: [],
            newComment: '',
            loadingPost: false
        }
    }

      _handleNewComment(event){
        this.setState({newComment: event.target.value});
    }
    _handleAddComment(){
      if (this.state.newComment.length == 0) {
        alert('Please enter your comment')
      }
      else {
        const {newComment, comments} = this.state;
        this.setState({
            comments: [
                {   userId: localStorage.UserId,
                    body: newComment
                },
                ...comments
            ],
            newComment: ''
        })
        Axios.post('http://localhost:3000/comments', {
        body: newComment,
        post_id: this.state.post.id
        })
      }
    }

    fetchPost() {
        const {id} = this.props.match.params;
        this.setState({ loadingPost: true });
        Axios.get(`http://localhost:3000/posts/${id}.json`)
            .then((response) => {
                this.setState({ post: response.data, loadingPost: false });
            })
            .catch(function(error) {
                console.log(error);
            });

    }
    componentWillMount() {
        this.fetchPost();
    }
    render() {
        const {post, comments} = this.state
        const post_comments = this.state.post.comments || [ ]
        var timeAgo = moment(post.created_at).fromNow()
        return (
            <div> 
            {post.user} wrote:<br/>
            {timeAgo} <br/>
            {post.body} <br/>
            Comments ({post.comments_count}) <br/>
            <input id= 'comment-input' type="text" value={this.state.newComment} placeholder="Write a comment" onChange={this._handleNewComment.bind(this)}/>
            <button onClick={this._handleAddComment.bind(this)}>Add Comment</button>
            {comments.map((comment) => {
              return (
                    <div>
                    {localStorage.UserFullName} wrote: <br/>
                    {comment.body}
                    </div>
                    )
              } 
            )}
             {
              post_comments.map(post_comment => {
                return (
                    <div className='one-comment'>
                    {post_comment.user} wrote:<br/>
                    {moment(post_comment.time).fromNow()}<br/>
                    {post_comment.body} <br/>
                    </div>
                    )
              })
            }
            </div>
            )
        }
    }

 


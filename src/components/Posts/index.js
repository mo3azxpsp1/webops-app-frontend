import React, { Component } from 'react';
import Post from '../Post';
import Axios from 'axios';
import './index.css';

export default class Todos extends Component {
    constructor(){
        super();
        this.state = {
            newPost: '',
            posts: [],
            loadingPosts: false
        }
    }

    remove(post, id) {
        var newPosts = [...this.state.posts]
            if (post.userId == parseInt(localStorage.UserId)) {
                if (newPosts.indexOf(post) !== -1) {
                newPosts.splice(newPosts.indexOf(post), 1)
                this.setState({ posts: newPosts })
            }
            Axios.delete(`http://localhost:3000/posts/${id}`)
            }
            else {
                alert("You cannot delete other users' posts")
            }
    }

    _handleNewPost(event){
        this.setState({newPost: event.target.value});
    }

    _handleAddPost(){
        if (this.state.newPost.length == 0) {
        alert('Please enter your post.')
        }
        else {
        const {newPost, posts} = this.state;
        this.setState({
            posts: [
                {   userId: localStorage.UserId,
                    body: newPost
                },
                ...posts
            ],
            newPost: ''
        })
        Axios.post('http://localhost:3000/posts', {
        body: newPost
        })
      }
    }

    _fetchPosts(){
        this.setState({loadingPosts: true});

            Axios.get('http://localhost:3000/posts.json')
            .then((response) => {
                this.setState({posts: response.data, loadingPosts: false})
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentWillMount(){
        this._fetchPosts();
    }

    render(){
        return (
            <div>
                <input id='post-input' type="text" value={this.state.newPost} placeholder="What's in your mind?" onChange={this._handleNewPost.bind(this)}/>
                <button id='add-post-button' onClick={this._handleAddPost.bind(this)}>Add Post</button>
                {
                    this.state.loadingPosts
                    ? (<div>Is Loading</div>)
                    : this.state.posts.map((post) => {
                        return  (
                            <Post post={post} remove = { this.remove.bind(this) }/>
                        )
                    })
                }
            </div>
        )
    }
}
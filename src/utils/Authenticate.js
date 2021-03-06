import React, {Component} from 'react';
import history from '../history'

export default function(ComposedComponent){
  class Authenticate extends Component{
    componentWillMount(){
      if(localStorage.getItem('clientAuth') !== "true"){
        history.push('/')
      }
    }

    render(){
      return(
        <ComposedComponent {...this.props}/>
      )
    }
  }

  return Authenticate;
}
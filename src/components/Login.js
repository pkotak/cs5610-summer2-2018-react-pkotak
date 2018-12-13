/**
 * Created by Akshay on 12/10/2018.
 */
import React from 'react'
import {Link} from 'react-router-dom'

export default class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username : "abc",
            password : 'as'
        }
    }

    render(){
        return(
            <div className="container">
        <input  className="form-control"
                type="text"
                name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={(e)=>{
                    this.setState({username:e.target.value})
                }}
                id="username"/>

        <input  className = "form-control"
        type="password"
        name="password"
        placeholder="Password"
        value={this.state.password}
                onChange={(e)=>{
                    this.setState({password:e.target.value})
                }}
        id="password"/>

        <Link to="/courses" className="btn btn-block btn-success"
        role="button">
            Login</Link>

        <a className="btn btn-block btn-danger"
        role="button">Register</a>

         </div>
        )
    }

}
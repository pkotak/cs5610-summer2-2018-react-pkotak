/**
 * Created by Akshay on 12/10/2018.
 */
import React from 'react'
import {Link} from 'react-router-dom'
import {getUser} from '../services/UserService'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

 class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
                username: '',
                password: '',
            errorMsg : false
        }
        this.checkLogin = this.checkLogin.bind(this)

        /*getUser().then((user)=>{
            this.props.dispatch(setUser(user))
        })*/

    }

    checkLogin=()=>{
        getUser({username : this.state.username, password : this.state.password}).then((user)=>{
           if(user===400){
                console.log("Invalid Login")
               this.setState({errorMsg:true})
           }
           else{
               this.props.dispatch(setUser(user))
               this.props.history.push('/courses')
           }
        })
    }

    render(){
        return(
            <div className="container">

                <h2 className="alert-danger" hidden={!this.state.errorMsg}> Invalid Credentials </h2>

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

        <button className="btn btn-block btn-success"
         onClick={this.checkLogin} >Login</button>

                <button className="btn btn-block btn-danger">Register</button>

         </div>
        )
    }

}

const setUser =(user)=>{
    return{
        type:"SET_USER",
        payload : user
    }
}


export default withRouter (connect()(Login))
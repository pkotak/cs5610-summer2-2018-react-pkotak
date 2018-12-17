/**
 * Created by Akshay on 12/15/2018.
 */

import React from 'react'
import * as constants from '../constants/constants'

export default class UserRole extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user : [],
            courses : [],
            roles : [],
            selectedCourse : 0,
            selectedRole : "STUDENT",
            selectedUser : 0
        }

        this.deleteRole = this.deleteRole.bind(this)
        this.addRole = this.addRole.bind(this)
    }

    componentDidMount(){
        fetch(constants.BASE_URL+'/api/user/roles')
            .then((role)=> {
                return role.json()
        }).then(role=>{
                this.setState({roles : role})
        });

        fetch(constants.BASE_URL+'/api/course')
            .then((course)=>{
                return course.json()
            }).then((course)=>{
                this.setState({courses : course })
        });

        fetch(constants.BASE_URL+'/api/user')
            .then((user)=> {
                return user.json()
            }).then(user=>{
            this.setState({user : user})
        })

    }

    deleteRole(role){

            return fetch(constants.BASE_URL + '/api/user/role/' + role.id, {
                method: 'delete'
            }).then(function (response) {
                return response;
            }).then(()=>{
                fetch(constants.BASE_URL+'/api/user/roles')
                    .then((role)=> {
                        return role.json()
                    }).then(role=>{
                    console.log(role)
                    this.setState({roles : role})
                });
            })
        }

     addRole1(){
        let role = {
            //user : this.state.user[this.state.selectedUser],
            course : this.state.courses[this.state.selectedCourse],
            roleType : this.state.selectedRole
        }

        this.state.user[this.state.selectedUser].role.push(role)
        console.log(this.state.user[this.state.selectedUser])
         return fetch(constants.BASE_URL+'/api/user/'+this.state.user[this.state.selectedUser].id, {
             method : 'put',
             body : JSON.stringify(this.state.user[this.state.selectedUser]),
             headers : {
                 'Content-Type': 'application/json'
             }
         }).then(function (response) {
             return response.json();
         }).then(function (user) {
             console.log(user)
         })
     }

     addRole(){
         let role = {
             user : this.state.user[this.state.selectedUser],
             //course : this.state.courses[this.state.selectedCourse],
             roleType : this.state.selectedRole
         }
         this.state.courses[this.state.selectedCourse].roles.push(role)

         return fetch(constants.BASE_URL+'/api/course/'+this.state.courses[this.state.selectedCourse].id, {
             method : 'put',
             body : JSON.stringify(this.state.courses[this.state.selectedCourse]),
             headers : {
                 'Content-Type': 'application/json'
             }
         }).then(function (response) {
             return response.json();
         }).then(function (user) {
             console.log(user)
         })
     }




    render(){
        {console.log(this.state)}
        return(
            <div className="container">
                <h1 align="center">  </h1>
                <div className="input-group row">
                    <select className="input-group-lg col-lg-4" onChange={(e)=>{this.setState({selectedUser:e.target.value}) }}>
                        {this.state.user.map((user,key)=>(
                            <option className="" value={key} key={key}>{user.firstName+" "+user.lastName} </option>
                        ))}
                    </select>

                <select className="input-group-lg col-lg-4" onChange={(e)=>{this.setState({selectedCourse:e.target.value}) }}>
                    {this.state.courses.map((course,key)=>(
                        <option className="" value={key} key={key}>{course.title} </option>
                        ))}
                </select>

                    <select className="input-group-lg col-lg-3" onChange={(e)=>{this.setState({selectedRole:e.target.value})}}>
                        <option value="STUDENT">
                            Student
                        </option >
                        <option value="FACULTY">
                            Faculty
                        </option>
                    </select>
                    <button className='btn btn-success float-right lg-2'
                            onClick={(e)=>{
                                console.log(this.state.user[this.state.selectedUser]);
                                console.log(this.state.courses[this.state.selectedCourse])
                                this.addRole()
                            }}>
                        <i className='fa fa-plus-circle'/>
                    </button>

            </div>
                <h3 align="center"> Current Roles:</h3>
                <div>
                    {this.state.roles.map((role,index)=>(
                        <div className="row input-group" key={index}>
                            <div className="input-group-prepend col-lg-4">
                                {role.user.firstName+" "+role.user.lastName}
                            </div>
                            <div className="input-group-append col-lg-4">
                                {role.course.title}
                            </div>
                            <div className="input-group-append col-lg-3">
                                {role.roleType}
                            </div>

                            <button className='btn btn-danger float-right lg-2'
                                    onClick={()=>{
                                        this.deleteRole(role)
                                    }}>
                                <i className='fa fa-trash'/>
                            </button>

                        </div>
                    ))}
                </div>


            </div>
        )
    }

}
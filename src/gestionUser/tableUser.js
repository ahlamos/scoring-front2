import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Service from "./Service";

class GestionUser extends Component {
    constructor(props){
        super(props);
        this.state={
            debut:"",
            fin:"",
            notation:"",
            description:"",
            segments:[],
            utilisateurs:[],
            role:[],
            options:[]
        }
    }

    componentDidMount() {
        var url="https://heroku-keycloak.herokuapp.com/auth/admin/realms/plateforme-scoring/users";
        fetch(url, {
            method: "GET",
            headers: {
                Authorization: "Bearer "+localStorage.getItem("token")
            },
        })
            .then(response => response.json())
            .then(responseJson =>{
                this.setState({utilisateurs: responseJson})

            }
            )
            .catch(()=>{
                this.setState({ message: 'erreur'})
            })
        console.log(this.state.options)


    }
    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log("name= "+event.target.name);
        console.log("value= "+event.target.value);
        this.setState({
            [name]: value
        })
        console.log(value)


    }


    handleUpdate = (key) =>{
        console.log(key)
        fetch('https://heroku-keycloak.herokuapp.com/auth/admin/realms/plateforme-scoring/users/'+key , {
            method: "PUT",
            body: JSON.stringify(
                {

                    firstName:this.refs["firstName"+key].value,
                    lastName:this.refs["lastName"+key].value,
                    email:this.refs["email"+key].value,
                }),
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("token")
            },
        }).then(() => {
            console.log('removed');})
            .catch(err => {
                console.error(err)
            });
        console.log(JSON.stringify(
            {
                firstName:this.refs["firstName"+key].value,
                lastName:this.refs["lastName"+key].value,
                email:this.refs["email"+key].value,
            }))

        alert("la règle a été modifie");
    }

        handleUpdateRole = (key) =>{

            fetch('https://heroku-keycloak.herokuapp.com/auth/admin/realms/plateforme-scoring/users/'+key+'/role-mappings/realm' , {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    Authorization: "Bearer "+localStorage.getItem("token")
                },
            }).then(() => {
                console.log('removed');})
                .catch(err => {
                    console.error(err)
                });

        var data=sessionStorage.getItem("role-mappings");
        var roles=JSON.parse(data);
        var resultat="";
        var tableau=[]
        for(var index in roles){
            if(roles[index].name == this.state.role) {
                resultat=roles[index];
            }
        }
        fetch('https://heroku-keycloak.herokuapp.com/auth/admin/realms/plateforme-scoring/users/'+key+'/role-mappings/realm' , {
            method: "POST",
            body:JSON.stringify([
                {
                    id: resultat.id,
                    name: resultat.name,
                    composite: resultat.composite,
                    clientRole: resultat.clientRole,
                    containerId: resultat.containerId,
                }]),
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("token")
            },
        }).then(() => {
            console.log('removed');})
            .catch(err => {
                console.error(err)
            });

        alert("le role de l'utilisateur est modifié");
    }


    handleDelete = (key) =>{
        fetch('https://heroku-keycloak.herokuapp.com/auth/admin/realms/plateforme-scoring/users/'+key , {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("token")
            },
        }).then(() => {
            console.log('removed');})
            .catch(err => {
                console.error(err)
            });
        alert("l'utilisateur est supprimé");
        window.location.reload();
    }

    addUser = () => {
        fetch('https://heroku-keycloak.herokuapp.com/auth/admin/realms/plateforme-scoring/users' , {
            method: "POST",
            body: JSON.stringify(
                {

                    username:this.state.username,
                    firstName:this.state.firstName,
                    lastName:this.state.lastName,
                    email:this.state.email,
                    requiredActions: [
                        "UPDATE_PASSWORD","UPDATE_PROFILE"
                    ],
                    credentials:[
                        {
                            type:"password",
                            value:this.state.username
                        }
                    ]
                }),
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("token")
            },
        }).then(() => {
            console.log('removed');})
            .catch(err => {
                console.error(err)
            });

        alert("utilisateur ajouté");


    }

    delete = (username,id) =>{
        confirmAlert({
            title: 'Confirm to delete',
            message: 'êtes-vous sûre de supprimer l utilisateur : " '+username+'".',
            buttons: [
                {
                    label: 'Oui',
                    onClick: () => this.handleDelete(id)},
                {
                    label: 'No',
                    onClick: () => null
                }
            ]
        });
    }

    getRoleOfUser = (key) =>{
        var url="https://heroku-keycloak.herokuapp.com/auth/admin/realms/plateforme-scoring/users/"+key+"/role-mappings/realm";
        fetch(url, {
            method: "GET",
            headers: {
                Authorization: "Bearer "+localStorage.getItem("token")
            },
        })
            .then(response => response.json())
            .then(responseJson => this.setState({role: responseJson}))
            .catch(()=>{
                this.setState({ message: 'erreur'})
            })

    }




    render(){

        var roleUser=""
        var elements=["admin","directeur-agence","charge-instruction","charge-decision"]
        var selected=false
        var options=[]
        var data =this.state.role
        for(var index in data){
            if(data[index].name !="uma_authorization" && data[index].name !="offline_access" ) {
                roleUser=data[index].name
                selected=true
            }
        }
        for(var index in elements){
            if(elements[index] !=roleUser ) {
                options.push({value: elements[index], selected: false})
            }
        }
        options.push({value:roleUser,selected: selected})


        return(
            <div className="content">
                <section className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">Liste des utilisateurs:</h3>
                                    <div className="box-tools">
                                        <div className="input-group input-group-sm hidden-xs" style={{width: "150px"}} >
                                            <input type="text" className="forrm-control pull-right" placeholder="Chercher" onChange={this.handleSubmitChercher} />
                                        </div>
                                    </div>
                                </div>
                                <div className="box-body table-responsive no-padding">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>Username</th>
                                            <th>Prenom</th>
                                            <th>Nom</th>
                                            <th>Email</th>
                                            <th>modifier/supprimer</th>

                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.utilisateurs.map(
                                                user =>
                                                    <tr key={user.id}>
                                                        <td>{user.username}</td>
                                                        <td>{user.firstName}</td>
                                                        <td>{user.lastName}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.action}</td>
                                                        <td>

                                                            <i className="fa fa-fw fa-edit" data-toggle="modal" data-target={"#modal-edit"+user.id}></i>
                                                            <div className="modal modal-info fade" id={"modal-edit"+user.id}>
                                                                <div className="modal-dialog">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                                <span aria-hidden="true">&times;</span></button>
                                                                            <h4 className="modal-title">modifier les informations de l'utilisateur:</h4>
                                                                        </div>
                                                                        <div className="modal-body">

                                                                            <form onSubmit={() => this.handleUpdate(user.id)}>
                                                                                <div className="row">
                                                                                    <div className="col-md-6">
                                                                                        <div className="group">
                                                                                            <input type="text" id="cin" name="firstName" ref={"firstName" + user.id}
                                                                                                   onChange={this.handleChange} defaultValue={user.firstName}/><span className="highlight" ></span><span
                                                                                                    className="bar"></span>
                                                                                            <label htmlFor="cin">Prenom</label>
                                                                                        </div>
                                                                                        <div className="group">
                                                                                            <input type="text" id="cin" name="lastName" ref={"lastName" + user.id}
                                                                                                   onChange={this.handleChange} defaultValue={user.lastName}/><span className="highlight" ></span><span
                                                                                            className="bar"></span>
                                                                                            <label htmlFor="cin">Nom</label>
                                                                                        </div>
                                                                                        <div className="group">
                                                                                            <input type="text" id="cin" name="email" ref={"email" + user.id}
                                                                                                   onChange={this.handleChange} defaultValue={user.email}/><span className="highlight" ></span><span
                                                                                            className="bar"></span>
                                                                                            <label htmlFor="cin">Email</label>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                                <button className="btn btn-submit" >Modifier</button>
                                                                            </form>


                                                                        </div>

                                                                        <div className="modal-footer">
                                                                            <button type="button" className="btn btn-outline pull-left" data-dismiss="modal">Fermer</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <i className="fa fa-fw fa-trash" onClick={() => this.delete(user.username,user.id)}></i>
                                                        </td>
                                                        <td>

                                                                <a onClick={() => this.getRoleOfUser(user.id)} data-toggle="modal" data-target={"#modal-update"+user.id}>Role de l'utilisateur</a>

                                                                <div className="modal modal-info fade" id={"modal-update"+user.id}>
                                                                    <div className="modal-dialog">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                                    <span aria-hidden="true">&times;</span></button>
                                                                                <h4 className="modal-title">Modifier Role :</h4>
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                <form onSubmit={() => this.handleUpdateRole(user.id)}>
                                                                                    <div className="row">
                                                                                        <div className="box box-primary">
                                                                                            <div className="box-header with-border">
                                                                                                <h3 className="box-title">Role de l'utilisateur</h3>
                                                                                            </div>
                                                                                            <div className="box-body">
                                                                                                <div className="form-group">
                                                                                                    <select className="forrm-control" name="role" onChange={this.handleChange} required>
                                                                                                        {
                                                                                                            options.map(
                                                                                                                element => <option value={element.value} selected={element.selected}>{element.value}</option>
                                                                                                            )
                                                                                                        }
                                                                                                    </select>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    <button className="btn btn-submit">Modifier Role</button>
                                                                                </form>

                                                                            </div>
                                                                            <div className="modal-footer">
                                                                                <button type="button" className="btn btn-outline pull-left" data-dismiss="modal">Fermer</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>






                                                        </td>
                                                    </tr>
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </div>

                                <div className="box-footer">
                                    <button className="btn btn-submit" data-toggle="modal" data-target={"#modal-add"}>Nouvel utilisateur</button>

                                    <div className="modal modal-info fade" id={"modal-add"}>
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span></button>
                                                    <h4 className="modal-title">Ajouter un utilisateur:</h4>
                                                </div>
                                                <div className="modal-body">
                                                <form>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="group">
                                                                <input type="text" id="username" name="username"
                                                                       onChange={this.handleChange} /><span className="highlight" ></span><span
                                                                className="bar"></span>
                                                                <label htmlFor="cin">Username</label>
                                                            </div>
                                                            <div className="group">
                                                                <input type="text" id="firstName" name="firstName"
                                                                       onChange={this.handleChange} /><span className="highlight" ></span><span
                                                                className="bar"></span>
                                                                <label htmlFor="cin">Prenom</label>
                                                            </div>
                                                            <div className="group">
                                                                <input type="text" id="lastName" name="lastName"
                                                                       onChange={this.handleChange} /><span className="highlight" ></span><span
                                                                className="bar"></span>
                                                                <label htmlFor="cin">Nom</label>
                                                            </div>
                                                            <div className="group">
                                                                <input type="text" id="email" name="email"
                                                                       onChange={this.handleChange} /><span className="highlight" ></span><span
                                                                className="bar"></span>
                                                                <label htmlFor="cin">Email</label>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <button className="btn btn-submit" onClick={() => this.addUser()}>Ajouter</button>
                                                </form>
                                                </div>

                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-outline pull-left" data-dismiss="modal">Fermer</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>






        )
    }
}
export default GestionUser

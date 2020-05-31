import React, { Component } from 'react'
import {Link} from "react-router-dom";
import PageAccueil from "../PageAccueil";

class GererProfil extends Component {
    constructor(props){
        super(props);
        this.state={
            updated:false


        }
    }




    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }


    handleSubmit = () => {
        const token=localStorage.getItem("token")
        const id=localStorage.getItem("id")
        console.log(this.state.motdepasse)
        console.log(this.state.confirmation)
        console.log(this.refs["motdepasse"].value != this.refs["confirmation"].value)
        console.log(this.state.password == this.state.confirmation)

        if(this.refs["motdepasse"].value != this.refs["confirmation"].value){
            alert("Les deux passwords sont différents")
        }
        else {
            fetch('http://localhost:9098/auth/admin/realms/plateforme-scoring/users/'+id+'/reset-password', {
                method: 'PUT',
                body: JSON.stringify(
                    {
                        type: "password",
                        temporary: false,
                        value:this.refs["motdepasse"].value
                    }
                ),
                headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer "+localStorage.getItem("token"),
                }
            }).then(() => {
                alert("Mot de passe modifié")
                window.location.assign("/gererProfil")

            })
                .catch(err => {
                    console.error(err)
                })
        }




    }




    render() {
        var required="required"

        if(this.state.updated){
            return <PageAccueil/>
        }
        else

            return (


                <section className="container">
                    <div className="wrapper">
                        <form onSubmit={() => this.handleSubmit()}>
                            <h1>Modifier Password</h1>




                            <div  className="group">
                                <input  id="motdepasse" name="motdepasse" type="password"onChange={this.handleChange}
                                        ref={"motdepasse"} required={required}/>
                                <span className="highlight"></span><span
                                className="bar"></span>
                                <label htmlFor="cin" >Nouveau Mot de Passe</label>
                            </div>

                            <div className="group">
                                <input id="confirmation" name="confirmation" type="password"
                                       onChange={this.handleChange} ref={"confirmation"} required={required}/>
                                <span className="highlight"></span><span
                                className="bar"></span>
                                <label htmlFor="cin">Confirmer Mot de Passe</label>
                            </div>



                            <div className="btn-box">
                                <button className="btn btn-submit" type="submit">Modifier</button>
                                <Link to="/">
                                    <button className="btn btn-cancel" type="button">Retour</button>

                                </Link>
                            </div>


                        </form>
                    </div>
                </section>

            )
        }
}

export default GererProfil;

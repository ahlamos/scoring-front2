import React, { Component } from 'react'
import './formulaire.css'


class AjouterClient extends Component {
    constructor(props){
        super(props);
        this.state={
        }
    }
    handleSubmit = (event) => {
        fetch('https://scoring-back-heroku.herokuapp.com/ajouterClient/', {
            method: 'POST',
            body: JSON.stringify(
                {
                    
                email:this.refs["email"].value,
                telephone:this.refs["telephone"].value,
                dateNaissance:this.refs["dateNaissance"].value,
                cin:this.refs["cin"].value,
                civilite:this.refs["civilite"].value,
                nom:this.refs["nom"].value,
                adresse:this.refs["adresse"].value,

                }),
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("token")
            }
        })
        alert("le client a été ajoutée avec succès")
        window.location.reload();
    }

    render() {
            return (

                <section className="container">
                    <div className="wrapper">
                        <form onSubmit={this.handleSubmit}>
                            <h1>Ajouter Client</h1>
                            <div className="group">
                                <input className="form-control" id="cin" name="cin" type="text" ref={"cin"} required/>
                                <span className="highlight"></span><span
                                className="bar"></span>
                                <label htmlFor="cin">CIN</label>
                            </div>
                            <div className="group">
                                <input className="form-control" id="civilite" name="civilite" type="text" ref={"civilite"} required/>
                                <span className="highlight"></span><span
                                className="bar"></span>
                                <label htmlFor="cin">Civilité</label>
                            </div>
                            <div className="group">
                                <input className="form-control" id="nom" name="nom" type="text" ref={"nom"} required/>
                                <span className="highlight"></span><span
                                className="bar"></span>
                                <label htmlFor="cin">Nom</label>
                            </div>
                            <div className="group">
                                <input className="form-control" id="dateNaissance" name="dateNaissance" type="date" ref={"dateNaissance"} required/>
                                <span className="highlight"></span><span
                                className="bar"></span>
                                <label htmlFor="cin">Date De Naissance</label>
                            </div>
                            <div className="group">
                                <input className="form-control" id="email" name="email" type="text" ref={"email"} required/>
                                <span className="highlight"></span><span
                                className="bar"></span>
                                <label htmlFor="cin">Email</label>
                            </div>
                            <div className="group">
                                <input className="form-control" id="telephone" name="telephone" type="number" ref={"telephone"} required/>
                                <span className="highlight"></span><span
                                className="bar"></span>
                                <label htmlFor="cin">Telephone</label>
                            </div>
                            <div className="group">
                                <input className="form-control" id="adresse" name="adresse" type="text"  ref={"adresse"} />
                                <span className="highlight"></span><span
                                className="bar"></span>
                                <label htmlFor="adresse">Adresse</label>
                            </div>



                            <div className="btn-box">
                                <button className="btn btn-submit" type="submit">Ajouter</button>
                            </div>

                        </form>
                    </div>


                </section>


            )
        }


}
export default AjouterClient;

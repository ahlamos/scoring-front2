import React, { Component } from 'react'
import '../formulaire.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Statistiques from "../statistiques/Statistiques";
import InfoPerso2 from "./InfoPerso2";
import Chart from "../components/Chart";
import NavbarCharge from "../navbars/navbarCharge";
import Login from "../Login";
import Stepper from '../Stepper'
class InfoPerso extends Component {
    constructor(props){
        super(props);
        this.state={
            score:0,
            statistiques:false,
            clients:'',
            test:false,
            notations:'',
            data:"",
            infoPerso:"",
            chartData:{},
            client:""

        }
    }





    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        })


    }
    handleSubmit = key => {
        const token=localStorage.getItem("token")
        fetch('http://localhost:9099/clients/'+key, {
            method: 'PATCH',
            body: JSON.stringify(
                {

                    email:this.refs["email"+key].value,
                    telephone:this.refs["telephone"+key].value,
                }),
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("token"),
            }
        }).then(() => {
            console.log('updated');
        })
            .catch(err => {
                console.error(err)
            });

        this.setState({test:true})


    }
    componentDidMount() {
        this.setState({client:JSON.parse(sessionStorage.getItem("client"))})

    }


    render() {
        var required="required"

        if (this.state.test) {
            return <InfoPerso2 />
        } else {

            return (


                <section className="container">
                    <div className="wrapper">
                        <center><Stepper level="2" /></center>

                        <form onSubmit={() => this.handleSubmit(this.state.client.id)}>
                            <h1>Informations Personnelles</h1>
                            <div className="group">
                                <input  id="civilite" name="civilite" type="text"
                                       onChange={this.handleChange} defaultValue={this.state.client.civilite} ref={"civilite" + this.state.client.id}
                                required={required}/>
                                <span className="highlight"></span><span
                                className="bar"></span>
                                <label htmlFor="cin">Civilité</label>
                            </div>
                            <div className="group">
                                <input id="nom" name="nom" type="text"
                                       onChange={this.handleChange} defaultValue={this.state.client.nom} ref={"nom" + this.state.client.id}
                                required={required}/>
                                <span className="highlight"></span><span
                                className="bar"></span>
                                <label htmlFor="cin">Nom</label>
                            </div>
                            <div className="group">
                                <input  id="dateNaissance" name="dateNaissance" type="text"
                                       onChange={this.handleChange} defaultValue={this.state.client.dateNaissance} ref={"dateNaissance" + this.state.client.id}
                                required={required}/>
                                <span className="highlight"></span><span
                                className="bar"></span>
                                <label htmlFor="cin">Date De Naissance</label>
                            </div>
                            <div className="group">
                                <input id="email" name="email" type="text"
                                       onChange={this.handleChange} defaultValue={this.state.client.email} ref={"email" + this.state.client.id}
                                required={required}/>
                                <span className="highlight"></span><span
                                className="bar"></span>
                                <label htmlFor="cin">Email</label>
                            </div>
                            <div className="group">
                                <input  id="telephone" name="telephone" type="text"
                                       onChange={this.handleChange} defaultValue={this.state.client.telephone} ref={"telephone" + this.state.client.id}
                                required={required}/>
                                <span className="highlight"></span><span
                                className="bar"></span>
                                <label htmlFor="cin">Telephone</label>
                            </div>
                            <div className="group">
                                <input  id="cin" name="cin" type="text"
                                       onChange={this.handleChange} defaultValue={this.state.client.cin} ref={"cin" + this.state.client.id}
                                required={required}/>
                                <span className="highlight"></span><span
                                className="bar"></span>
                                <label htmlFor="cin">CIN</label>
                            </div>


                            <div className="btn-box">
                                <button className="btn btn-submit" type="submit">Suivant
                                </button>
                                <Link to="/projet">
                                    <button className="btn btn-cancel" type="button">Retour</button>

                                </Link>
                            </div>

                        </form>
                    </div>


                </section>


            )
        }
    }

}
export default InfoPerso;

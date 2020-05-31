import React, { Component } from 'react'
import '../formulaire.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Projet from "./Projet";
import SituationFinanciere from './SituationFinanciere'
import InfoPerso from "./InfoPerso";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Recapitulatif from "./Recapitulatif";
import serviceName from '../Shared';
import Stepper from '../Stepper'
class ChargeMensuel extends Component {
    constructor(props){
        super(props);
        this.state={
            client:"",
            infoClient:"",
            test:false,
            sommeChargeMensuelle:0,
            checkedPension: false, indeterminatePension: false,
            checkedCredit: false, indeterminateCredit: false,
            tauxEndettement:0,
            montantRemboursement:0,
            notation:"",
            information:"",
            data:"",
            key:""


        }
    }



    handleChange3 = event => {
        const target = event.target;
        this.setState({checkedPension:target.checked})
        this.setState({indeterminatePension:target.indeterminate})
        console.log(target)
    }
    handleChange4 = event => {
        const target = event.target;
        this.setState({checkedCredit:target.checked})
        this.setState({indeterminateCredit:target.indeterminate})
        console.log(target)
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
        var chargeMensuelle=parseFloat(this.refs["chargeMensuelle"+key].value)
        var montantVersement=parseFloat(this.refs["montantVersement"+key].value)
        var montantRemboursement=parseFloat(this.refs["montantRemboursement"+key].value)
        var somme=chargeMensuelle+montantVersement+montantRemboursement
        var revenuMensuelTotal=sessionStorage.getItem("revenuMensuelTotal")
        this.setState({sommeChargeMensuelle:somme,
            montantRemboursement:montantRemboursement,
            tauxEndettement:(somme*100)/parseFloat(revenuMensuelTotal)
        })
        var tauxEndettement=(somme*100)/parseFloat(revenuMensuelTotal)

        console.log(tauxEndettement)
        fetch('http://localhost:9099/calculerScore/'+key, {
            method: 'PATCH',
            body: tauxEndettement,
            headers: {
              "content-type": "application/json",
              "Authorization": "Bearer "+localStorage.getItem("token")},

        }).then(response => response.json())
            .then(responseJson => {
                this.setState({data: responseJson})
                var data=this.state.data.demandeCredits;
                var date=new Date(data[0].dateDemande)
                var maxData=date;
                var indexDate=0
                for(var index in data){
                    date=new Date(data[index].dateDemande)
                    if(date >= maxData){
                        maxData=date
                        indexDate=index;
                    }
                }
                var key=this.state.data.demandeCredits[indexDate].identificateur
                this.setState({key:key})
                this.setState({notation:this.state.data.notation.notation})
                sessionStorage.setItem("key","")
                sessionStorage.setItem("key",key)
                sessionStorage.setItem("notation","")
                sessionStorage.setItem("notation",this.state.data.notation.notation)
            })
            .catch(err => {
                console.error(err)
            })
        console.log(chargeMensuelle)
        console.log(montantVersement)
        console.log(this.state.notation)
        console.log(somme)
        this.setState({test:true})



    }
    componentDidMount() {
        var client=JSON.parse(sessionStorage.getItem("client"))
        this.setState({client:JSON.parse(sessionStorage.getItem("client"))})
        this.setState({infoClient:client.infoClient})
    }

    render() {
        var required="required"
        if(this.state.test){


            return <Recapitulatif notation={this.state.notation}   sommeChargeMensuelle={this.state.sommeChargeMensuelle} sommeCredit={this.state.montantRemboursement} tauxEndettement={this.state.tauxEndettement} />
        }
        else {


            return (

                <section className="container">
                    <div className="wrapper">
                        <center><Stepper level="5" /></center>

                        <form>
                            <h1>Charges Mensuelles</h1>
                            <div className="group">
                                <input  id="chargeMensuelle" name="chargeMensuelle" type="text"
                                       onChange={this.handleChange} ref={"chargeMensuelle" + this.state.client.id} required={required}/>
                                <span className="highlight"></span><span
                                className="bar"></span>
                                <label htmlFor="cin">Estimation des charges mensuelles net (factures, courses ..)</label>
                            </div>

                            <div className="group">
                                <p>vous versez une pension à l'un de vos proches?
                                    <Checkbox
                                    checked={this.state.checkedPension}
                                    indeterminate={this.state.indeterminatePension}
                                    onChange={this.handleChange3}
                                />
                                </p>
                            </div>


                            <div className="group" hidden={!this.state.checkedPension}>
                                <input  id="montantVersement" name="montantVersement" type="text"
                                       onChange={this.handleChange} ref={"montantVersement" + this.state.client.id} required={required}/>
                                <span className="highlight"></span><span
                                className="bar"></span>
                                <label htmlFor="cin">Montant mensuel du versement </label>
                            </div>



                            <div className="group">
                                <p>Le client, a-t-il des crédits en cours ?
                                    <Checkbox
                                    checked={this.state.checkedCredit}
                                    indeterminate={this.state.indeterminateCredut}
                                    onChange={this.handleChange4}
                                />
                                </p>
                            </div>

                            <div className="group" hidden={!this.state.checkedCredit}>
                                <input  id="montantRemboursement" name="montantRemboursement" type="text"
                                       onChange={this.handleChange}  ref={"montantRemboursement" + this.state.client.id} required={required}/>
                                <span className="highlight"></span><span
                                className="bar"></span>
                                <label htmlFor="cin">Montant mensuel du remboursement</label>
                            </div>



                            <div className="btn-box">
                                <button className="btn btn-submit" type="submit"
                                        onClick={() => this.handleSubmit(this.state.client.id)}>Suivant
                                </button>
                                <Link to="/situationFinanciere">
                                    <button className="btn btn-cancel" type="button">Retour</button>

                                </Link>
                            </div>


                        </form>
                    </div>

                </section>


            )
        }



    }}
export default ChargeMensuel;

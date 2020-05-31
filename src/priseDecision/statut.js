import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Checkbox from '@material-ui/core/Checkbox';
class Statut extends Component {
    constructor(props){
        super(props);
        this.state={
            demandesaChercher:[],
            demandes:[],
            demandesResultat:[],
            demandeCredits:[]




        }
    }

    componentDidMount() {

    }


    render() {
        return (

            <div className="wrapper">
                <form>
                    <h1>Statut Demande</h1>

                    <hr className="sep"/>
                    <div className="group">
                        <input type="text" defaultValue={this.props.location.query[0]} required="required"/><span className="highlight"></span><span
                        className="bar"></span>
                        <label>Identificateur</label>
                    </div>
                    <div className="group">
                        <input type="text" defaultValue={this.props.location.query[1]} required="required"/><span className="highlight"></span><span
                        className="bar"></span>
                        <label>Date Demande</label>
                    </div>
                    <div className="group">
                        <input type="text" defaultValue={this.props.location.query[2]} required="required"/><span className="highlight"></span><span
                        className="bar"></span>
                        <label>Statut</label>
                    </div>

                    <div className="btn-box">
                        <Link to={{pathname:"/demandeCredit"}}><button className="btn btn-cancel" type="button">Retour</button></Link>

                    </div>
                </form>
            </div>









        )
    }



}
export default Statut;

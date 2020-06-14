import React, { Component } from 'react'
import '../formulaire.css'
import {BrowserRouter as Router,withRouter, Route, Link} from "react-router-dom";
import "antd/dist/antd.css"
import {Button,DatePicker,version} from "antd";
import Chart from '../components/Chart';

class Statistiques extends Component {
    constructor(props){
        super(props);
        this.state={
            chartData:{},
            test:[

            ],
        }
    }


    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log(value)
        this.setState({
            [name]: value
        })

    }
    componentWillUnmount() {

    }

    componentWillMount(){
        this.setState({
            chartData:{
                labels: this.props.location.notations,
                datasets:[
                    {
                        label:'Notation',
                        data:this.props.location.query,
                        backgroundColor:[
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(255, 99, 132, 0.6)'
                        ]

                    }
                ]
            }
        });
    }

    onSubmit=(e)=>{
        e.preventDefault();
        console.log(this.props.location.query)

    }

    render(){

            return (

                <section className="container">



                    <Chart chartData={this.state.chartData} location="Massachusetts" legendPosition="bottom"/>


                </section>

            );
        }

}
export default Statistiques;

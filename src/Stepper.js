import React, { Component } from 'react'
import './formulaire.css'


class Stepper extends Component {
    constructor(props){
        super(props);
        this.state={
        }
    }

    render() {
        if(this.props.level==1) return (
            <img src="stepper/1.bmp" />
        )

        if(this.props.level==2) return (
            <img src="stepper/2.bmp" />
        )

        if(this.props.level==3) return (
            <img src="stepper/3.bmp" />
        )
        if(this.props.level==4) return (
            <img src="stepper/4.bmp" />
        )
        if(this.props.level==5) return (
            <img src="stepper/5.bmp" />
        )

    }

}

export default Stepper
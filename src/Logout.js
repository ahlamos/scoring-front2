import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class Logout extends Component {


    logout() {
        localStorage.setItem("keycloak","")
        localStorage.setItem("roles","")
        this.props.keycloak.logout();
    }


    render() {
        return (
            <button onClick={ () => this.logout() }>
                Logout
            </button>
        );
    }
}
export default withRouter(Logout);

import { withKeycloak } from "@react-keycloak/web";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Logout from "./Logout";

class Login extends Component {
    constructor(props) {
        super(props);
        //const {keycloak} = this.props;

        // alert("okkc:"+JSON.stringify(keycloak))
        this.state = { username: "" };
    }

    componentWillReceiveProps() {
        const { keycloak, history } = this.props;
        //alert(JSON.stringify(keycloak))
        if (keycloak.authenticated) {
            this.setState({ username: keycloak.idTokenParsed.name });
        }
        //alert("kcLogin:"+JSON.stringify(keycloak))m
        localStorage.setItem("token", keycloak.token);
        // alert("rec")
        if (!keycloak.authenticated) {
            this.handleLogInOut();
        }
        console.log(keycloak)
    }

    handleLogInOut = () => {
        const { keycloak, history } = this.props;
        //  alert("kcc"+JSON.stringify(keycloak))

        if (keycloak.authenticated) {
            //  alert("out"+JSON.stringify(keycloak.idTokenParsed.preferred_username))
            console.log(
                "data:" + JSON.stringify(keycloak.idTokenParsed.preferred_username)
            );
            history.push("/");
            keycloak.logout();
            //console.log("data:"+JSON.stringify(keycloak))
        } else {
            keycloak.login();
        }
    };
    handleLogInOutt = () => {
        const { keycloak, history } = this.props;
        keycloak.register();
    };

    checkAuthenticated = () => {
        const { keycloak } = this.props;
        if (!keycloak.authenticated) {
            this.handleLogInOut();
        }
    };

    render() {
        return (
            <div>
                <Logout
                    name={this.state.username}
                    logout={this.handleLogInOut}
                ></Logout>
            </div>
        );
    }
}

export default withRouter(withKeycloak(Login));

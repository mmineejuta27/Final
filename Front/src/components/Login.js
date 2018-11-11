import React, { Component } from "react";
import 'bulma/css/bulma.css'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import axios from 'axios'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' }
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangePass = this.handleChangePass.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.responseFacebook = this.responseFacebook.bind(this)

    }

    handleChangeEmail(event) {
        this.setState({ email: event.target.value })
    }

    handleChangePass(event) {
        this.setState({ password: event.target.value })
    }

    responseFacebook(response) {
        console.log(response)

        var data1 = {
            email: response.email,
            id: response.id
        }
        console.log(data1.id)

        axios.post("http://localhost:3001/Loginf", data1).then((res) => {
            console.log(res.data.message)
            var email = res.data.message
            this.props.history.push(`/home/${res.data.message}`, email)
        }).catch(err => {
            alert("กรุณาตรวจสอบข้อมูลให้ถูกต้อง")
            console.log(err);
        })

    }

    handleClick(event) {
        var data = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(this.state.email)
        console.log(this.state.password)
        //axios install
        //call api post
        if (this.state.email != '' && this.state.password != '') {
            axios.post("http://localhost:3001/login", data).then((res) => {
                console.log(res.data.message)
                var email = res.data.message
                this.props.history.push(`/home/${res.data.message}`, email)
            }).catch(err => {
                alert("กรุณาตรวจสอบข้อมูลให้ถูกต้อง")
                console.log(err);
            })
        } else {
            alert("กรุณากรอกข้อมูล")
        }
    }
    render() {
        return (
            <div id="root">
                <section class="section hero is-fullheight has-background-white-ter">
                    <div class="hero-body">
                        <div class="container">
                            <div class="columns is-mobile is-centered">
                                <div class="column is-two-fifths">
                                    <div class="box">
                                        <div class="media-content">
                                            <h1 class="title">Welcome</h1>

                                            <div class="field">
                                                <div class="control">
                                                    <input class="input is-large" type="text" onChange={this.handleChangeEmail} placeholder="Email" />
                                                </div>
                                            </div>
                                            <div class="field">
                                                <div class="control">
                                                    <input class="input is-large" type="password" onChange={this.handleChangePass} placeholder="Password" />
                                                </div>
                                            </div>
                                            <div class="field">
                                                <div class="control">
                                                    <button class="button is-fullwidth is-primary is-large" type="button" onClick={this.handleClick}> Login </button>
                                                </div>
                                            </div>
                                            <div class="field">
                                                <div class="control">
                                                    <FacebookLogin
                                                        appId='326667274550037'
                                                        fields="email,id"
                                                        callback={this.responseFacebook}
                                                        render={(renderProps) => (
                                                            <button className='button is-info is-medium is-fullwidth' onClick={renderProps.onClick}>Login With Facebook</button>
                                                        )}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <a class="button is-danger is-rounded is-fullwidth is-large is-hovered" href="/register"> Register </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
export default Login;
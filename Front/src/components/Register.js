import React, { Component } from "react";
import 'bulma/css/bulma.css'
import axios from 'axios'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' }
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangePass = this.handleChangePass.bind(this)
        this.handleChangePass2 = this.handleChangePass2.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    handleChangeEmail(event) {
        this.setState({ email: event.target.value })
    }

    handleChangePass(event) {
        this.setState({ password: event.target.value })
    }

    handleChangePass2(event) {
        this.setState({ password2: event.target.value })
    }

    handleClick(event) {
        var data = {
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        //axios install
        //call api post
        if (this.state.email != '' && this.state.password != '' && this.state.password2 != '') {
            axios.post("http://localhost:3001/register", data).then((res) => {
                alert("สมัครสมาชิกสำเร็จ")
                this.props.history.push(`/`)
            }).catch(err => {
                alert("อีเมลนี้ถูกใช้งานแล้วหรือพาสเวิดไม่ตรงกัน")
                console.log(err);
            })
        } else {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน")
        }
    }

    render() {
        return (
            <div className="Container ">
                <div className="section" >

                    <div className='columns is-mobile '>
                        <div className='column'></div>

                        <div className='column'>

                            <div className="notification ">
                                <h1 className="title is-1">Register</h1>
                                <div className="notification ">
                                </div>
                                <input
                                    className="input is-info"
                                    type='text'
                                    placeholder="E-mail"
                                    onChange={this.handleChangeEmail}>
                                </input>
                                <br />
                                <br />

                                <input
                                    className="input is-info"
                                    type='password'
                                    placeholder="Password"
                                    onChange={this.handleChangePass}>
                                </input>
                                <br />
                                <br />

                                <input
                                    className="input is-info"
                                    type='password'
                                    placeholder="Password Confirm"
                                    onChange={this.handleChangePass2}>
                                </input>
                                <br />
                                <br />

                                <button className='button is-success is-medium is-fullwidth' id='login' onClick={this.handleClick}>Register</button>
                                <br />

                            </div>

                        </div>

                        <div className='column'></div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Register;
import React from 'react';
import './Login.scss';
import { withRouter } from "react-router-dom";
import { Row, Col, Card, Image, Form, Button } from "react-bootstrap";
import Logo from "../../assets/logo.png";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatchLogin } from './dispatcher';


class Login extends React.Component {
    state = {
        username: '',
        password: '',
    }

    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }
    async componentDidMount() {
        // const r = await axios.get(`/api/method/login?usr=Administrator&pwd=ntex@123`);
        // console.log("respone--", r)
    }

    handleInput(name: string, value: string) {
        this.setState({ [name]: value })
    }

    render() {
        console.log("login--", this.props)
        return (
            <div className='login-card-container'>
                <Card className='login-card'>
                    <Row className='log-in-row'>
                        <Col md={1} xs={2} sm={2} className="logo-img-col">
                            <Image src={Logo} className="logo-img"></Image>
                        </Col>
                        <Col md={11} xs={10} sm={10} className='log-heading-container'>
                            <h1 className='log-in-heading'>Log-in to your account
            </h1>
                        </Col>
                    </Row>
                    <Form className='log-in-form'>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className='form-labels'>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => this.handleInput("username", e.target.value)} />
                            {this.props?.devLogin?.emailError ? <Form.Text className='error-text' id="emailHelpBlock"> {this.props?.devLogin?.emailError}</Form.Text> : null}
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label className='form-labels'>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"
                                onChange={(e) => this.handleInput("password", e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        this.props.dispatchLogin(this.state.username, this.state.password,this)
                                    }
                                }} />
                            {this.props?.devLogin?.passwordError ? <Form.Text className='error-text' id="passwordHelpBlock">{this.props?.devLogin?.passwordError}</Form.Text> : null}
                        </Form.Group>
                        <Button className='log-in-btn' onClick={() => this.props.dispatchLogin(this.state.username, this.state.password,this)}>Login</Button>
                    </Form>
                </Card>
            </div>
        )
    }

}
const mapStateToProps = (state: any, ownProps: any) => {
    return { login: state.login }
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return bindActionCreators({ dispatchLogin }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))

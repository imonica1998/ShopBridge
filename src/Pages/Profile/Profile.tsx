import React from 'react';
import './Profile.scss';
import FontAwesome from 'react-fontawesome'
import { withRouter } from "react-router-dom";
import { Row, Col, Container, Card, Image, Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatchGetProfile, dispatchUpdateProfile } from './dispatcher';

class Profile extends React.Component {
    constructor(props: any) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            gender: "",
            mobileNumber: "",
            editPassword: false,
            password: "",
            confirmPassword: ""
        }

    }
    async componentDidMount() {
        await this.props.dispatchGetProfile()
        this.setState({
            firstName: this.props.profileData.profile?.first_name ? this.props.profileData.profile?.first_name : "",
            lastName: this.props.profileData.profile?.last_name ? this.props.profileData.profile?.last_name : "",
            gender: this.props.profileData.profile?.gender ? this.props.profileData.profile?.gender : "",
            mobileNumber: this.props.profileData.profile?.mobile_no ? this.props.profileData.profile?.mobile_no : "",
        })
    }
    handleChange(field: any, value: any) {
        this.setState({ [field]: value })
    }
    clearForm() {
        this.setState({
            firstName: "",
            LastName: "",
            gender: "",
            mobileNumber: "",
            editPassword: false,
            password: "",
            confirmPassword: ""
        });
    }

    submitForm() {

    }
    render() {
        console.log("props--", this.props)
        return (
            <div className="profile-container">
                <div className='heading'>My Profile</div>
                <Row style={{ margin: 0 }}>
                    <Col xs={12} md={3} lg={3} className='h-100 profile-card-col'>
                        <Card className="profile-info-card">
                            <Row>
                                <Col xs={2} sm={1} lg={3} className='icon-col'>
                                    <div>
                                        <div className='person-icon-holder'  >
                                            <FontAwesome
                                                name="user"
                                                size="2x"
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col className="info-small-card">
                                    <Row style={{ margin: 0 }}>
                                        <div className='fullname-header'>Full Name</div>
                                    </Row>
                                    <Row style={{ margin: 0 }}>
                                        <div className='name'>{this.state.firstName}</div>
                                        <div className='name'>{this.state.lastName}</div>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col xs={12} md={6} lg={6} className="form-col">
                        <Card className="profile-info-card">
                            <Form className='updateprofile-form'>
                                <FormControl
                                    aria-label="first_name"
                                    className='updateprofile-input'
                                    type='text'
                                    placeholder='First Name *'
                                    required
                                    value={this.state.firstName}
                                    onChange={(e: any) => this.handleChange('firstName', e.target.value)}
                                />
                                {this.state.firstName ? <div className='error'>FirstName Missing</div> : null}
                                <FormControl
                                    aria-label="last_name"
                                    className='updateprofile-input'
                                    type='text'
                                    placeholder='Last Name'
                                    required
                                    value={this.state.lastName}
                                    onChange={(e: any) => this.handleChange('lastName', e.target.value)}
                                />

                                <div className="mb-1 gender-container">
                                    <label className='gender-label'>Gender</label>
                                    <Form.Check inline label="Female" type={"radio"} id={'female'} />
                                    <Form.Check inline label="Male" type={'radio'} id={'male'} />
                                    <Form.Check
                                        inline
                                        label="Other"
                                        type={'radio'}
                                        id={'other'}
                                    />
                                </div>
                                <FormControl
                                    aria-label="mobile-number"
                                    className='updateprofile-input'
                                    type='number'
                                    maxLength={10}
                                    placeholder="Mobile Number *"
                                    min="0"
                                    required
                                    value={this.state.mobileNumber}
                                    onKeyDown={(e: any) => {
                                        let checkIfNum;
                                        if (e.key !== undefined) {
                                            checkIfNum = e.key === "e" || e.key === "." || e.key === "+" || e.key === "-";
                                        }
                                        else if (e.keyCode !== undefined) {
                                            checkIfNum = e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187 || e.keyCode === 189;
                                        }
                                        return checkIfNum && e.preventDefault();
                                    }}
                                    onChange={(e: any) => {
                                        if (e.keyCode !== 69) {
                                            this.handleChange('mobileNumber', e.target.value)
                                        }
                                    }}

                                />

                                <Form.Group controlId="formBasicCheckbox" className='editPassword-checkbox'>
                                    <Form.Check type="checkbox" label="Yes I want to edit Password" />
                                </Form.Group>
                                <FormControl
                                    aria-label="password"
                                    className='updateprofile-input'
                                    type='password'
                                    placeholder='Password'
                                    required
                                    value={this.state.password}
                                    onChange={(e: any) => this.handleChange('password', e.target.value)}
                                />
                                <InputGroup className="confirm-password-inputgroup">
                                    <FormControl
                                        aria-label="confirm_password"
                                        className='updateprofile-input'
                                        type='password'
                                        placeholder='Confirm Password'
                                        required
                                        value={this.state.confirmPassword}
                                        onChange={(e: any) => this.handleChange('confirmPassword', e.target.value)}
                                    />
                                    <InputGroup.Append>
                                        <InputGroup.Text className="password-visiblity">
                                            <FontAwesome
                                                name="eye"

                                            />
                                        </InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                                <Row className='bottom-btns-container'>
                                    <Col xs={6}>
                                        <Button className='clear-btn' onClick={() => this.clearForm()}>Clear</Button>
                                    </Col>
                                    <Col xs={6}>
                                        <Button className='submit-btn' onClick={() => this.submitForm()}>Submit</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    return { profileData: state.profileData }
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return bindActionCreators({ dispatchGetProfile, dispatchUpdateProfile }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))
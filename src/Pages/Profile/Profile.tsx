import React from 'react';
import './Profile.scss';
import FontAwesome from 'react-fontawesome'
import { withRouter } from "react-router-dom";
import { Row, Col, Card, Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatchGetProfile, dispatchUpdateProfile } from './dispatcher';
import { actionProfileUpdateSuccess } from "./action";
import { toast } from 'react-toastify';
import Utility from "../../Utils/Utility";
import SuccessModal from "../../Components/SuccessModal/SuccessModal";

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
            confirmPassword: "",
            firstNameError: false,
            genderError: false,
            mobileNumberError: false,
            passwordsNotMatchingError: false,
            showPassword: false,
            showSuccessModal: false,
        }
        this.hideSuccessModal = this.hideSuccessModal.bind(this);

    }
    async setProfileData() {
        await this.props.dispatchGetProfile()
        this.setState({
            firstName: this.props.profileData.profile?.first_name ? this.props.profileData.profile?.first_name : "",
            lastName: this.props.profileData.profile?.last_name ? this.props.profileData.profile?.last_name : "",
            gender: this.props.profileData.profile?.gender ? this.props.profileData.profile?.gender : "",
            mobileNumber: this.props.profileData.profile?.mobile_no ? this.props.profileData.profile?.mobile_no : "",
        })
    }
    async componentDidMount() {
        console.log("inside did mount profilee")
        if (Utility.getCookie("user_id") === "Guest" || Utility.getCookie("full_name") === "Guest") {
            toast.error("Please Login before coming to Dashboard!")
            Utility.navigateToScreen("/login", this, {});
            return;
        }
        this.setProfileData();
    }
    handleChange(field: any, value: any) {
        console.log("value", value)
        this.setState({ [field]: value })
        switch (field) {
            case "firstName":
                !value ?
                    this.setState({ firstNameError: true })
                    : this.setState({ firstNameError: false })
                break;
            case "gender":
                value === "Select Gender" ?
                    this.setState({ genderError: true })
                    : this.setState({ genderError: false })
                break;
            case "mobileNumber":
                !value ?
                    this.setState({ mobileNumberError: true })
                    : this.setState({ mobileNumberError: false })
                break;
            case "editPassword":
                if (!value) {
                    this.setState({ passwordsNotMatchingError: false })
                }
                break;
        }
    }
    clearForm() {
        this.setState({
            firstName: "",
            LastName: "",
            gender: "",
            mobileNumber: "",
            editPassword: false,
            password: "",
            confirmPassword: "",
            firstNameError: false,
            genderError: false,
            mobileNumberError: false,
            passwordsNotMatchingError: false,
            showPassword: false,
            showSucessModal: false,
        })
    }
    showConfirmPassword() {
        this.setState({ showPassword: !this.state.showPassword })
    }
    async submitForm() {
        if (!this.state.firstName) {
            this.setState({ firstNameError: true })
            return
        }
        if (!this.state.gender) {
            this.setState({ genderError: true })
            return
        }
        if (!this.state.mobileNumber) {
            this.setState({ mobileNumberError: true })
            return
        }
        if (this.state.mobileNumber.length !== 10) {
            toast.error("Please Enter 10 digit mobile number!")
            return
        }
        if (this.state.editPassword && this.state.password !== this.state.confirmPassword) {
            this.setState({ passwordsNotMatchingError: true })
            return
        }
        if (!this.state.editPassword) {
            await this.props.dispatchUpdateProfile({
                "first_name": this.state.firstName,
                "last_name": this.state.lastName,
                "gender": this.state.gender,
                "mobile_no": this.state.mobileNumber,
            })
        } else {
            await this.props.dispatchUpdateProfile({
                "first_name": this.state.firstName,
                "last_name": this.state.lastName,
                "gender": this.state.gender,
                "mobile_no": this.state.mobileNumber,
                "password": this.state.confirmPassword
            })
        }
        this.setProfileData();
        this.setState({ showSuccessModal: this.props.profileData?.updateSuccess })

    }

    hideSuccessModal() {
        this.setState({ showSuccessModal: false })
        this.props.actionProfileUpdateSuccess(false)
    }

    render() {
        console.log("props--", this.props)
        // console.log("state--", this.state)
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
                                        <div className='name'>{this.props.profileData.profile?.full_name}</div>
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
                                {this.state.firstNameError ? <div className='error'>Please Enter First name!</div> : null}
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
                                    <Form.Control as="select" value={this.state.gender} onChange={(e: any) => this.handleChange('gender', e.target.value)}>
                                        <option>Select Gender</option>
                                        <option>Female</option>
                                        <option>Male</option>
                                        <option>Other</option>
                                    </Form.Control>
                                </div>
                                {this.state.genderError ? <div className='error'>Choose your gender!</div> : null}
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
                                {this.state.mobileNumberError ? <div className='error'>Please Enter Mobile Number!</div> : null}

                                <Form.Group controlId="formBasicCheckbox" className='editPassword-checkbox'>
                                    <Form.Check type="checkbox" label="Yes I want to edit Password"
                                        value={this.state.editPassword}
                                        onChange={(e: any) => this.handleChange('editPassword', !this.state.editPassword)} />
                                </Form.Group>
                                {this.state.editPassword ?
                                    <FormControl
                                        aria-label="password"
                                        className='updateprofile-input'
                                        type='password'
                                        placeholder='Password'
                                        required
                                        value={this.state.password}
                                        onChange={(e: any) => this.handleChange('password', e.target.value)}
                                    />
                                    : null}
                                {this.state.editPassword ?
                                    <InputGroup className="confirm-password-inputgroup">
                                        <FormControl
                                            aria-label="confirm_password"
                                            className='updateprofile-input'
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            placeholder='Confirm Password'
                                            required
                                            value={this.state.confirmPassword}
                                            onChange={(e: any) => this.handleChange('confirmPassword', e.target.value)}
                                        />
                                        <InputGroup.Append>
                                            <InputGroup.Text className="password-visiblity" onClick={() => this.showConfirmPassword()}>
                                                <FontAwesome
                                                    name={this.state.showPassword ? "eye-slash" : "eye"}

                                                />
                                            </InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    : null}
                                {this.state.passwordsNotMatchingError ? <div className='error'>Passwords not matching!</div> : null}
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
                {this.state.showSuccessModal ? <SuccessModal modalTitle="Profile Updated Successfully!" visible={this.state.showSuccessModal} onHide={() => this.hideSuccessModal()} /> : null}

            </div>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    return { profileData: state.profileData }
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return bindActionCreators({ dispatchGetProfile, dispatchUpdateProfile, actionProfileUpdateSuccess }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))
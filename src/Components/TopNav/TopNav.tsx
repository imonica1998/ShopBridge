import React from 'react';
import { Navbar, Row, Col, Image } from "react-bootstrap";
import Home from "../../assets/home.svg";
import User from "../../assets/user.svg";
import "./TopNav.scss";
import { navigationRef } from "../../index";
import Utility from "../../Utils/Utility";
class TopNav extends React.Component {
    navigateToHome() {
        navigationRef.current.history.push("/dashboard", {})
    }
    navigateToProfile() {
        console.log("this.props--", this.props)
        navigationRef.current.history.push("/profile", {})
    }
    render() {
        return (
            <Navbar className={"top-navbar pl-0 pr-0"}>
                <Row className="w-100 m-0 align-items-center">
                    <Col xs={2} md={2} className="pr-0 d-flex align-items-start cursor-pointer" onClick={() => this.navigateToHome()}>
                        <Image src={Home} />
                    </Col>
                    <Col xs={8} md={8}>
                        Welcome {Utility.getCookie("full_name").split(" ")[0]},
                    </Col>
                    <Col xs={2} md={2} className="justify-content-end d-flex align-items-end">
                        <div className="cursor-pointer user-img-container" onClick={() => this.navigateToProfile()}>
                            <Image src={User} />
                        </div>
                    </Col>
                </Row>
            </Navbar>
        )
    }
}
export default TopNav;
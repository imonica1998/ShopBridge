import React from 'react';
import { Navbar, Row, Col, Image } from "react-bootstrap";
import Menu from "../../assets/menu.svg";
import User from "../../assets/user.svg";
import "./TopNav.scss";
class TopNav extends React.Component {
    render() {
        return (
            <Navbar className={"top-navbar pl-0 pr-0"}>
                <Row className="w-100 m-0 align-items-center">
                    <Col xs={2} md={2} className="pr-0 d-flex align-items-start cursor-pointer">
                        <Image src={Menu} />
                    </Col>
                    <Col xs={8} md={8}>
                        Welcome Admin,
                    </Col>
                    <Col xs={2} md={2} className="justify-content-end d-flex align-items-end">
                        <div className="cursor-pointer user-img-container">
                            <Image src={User} />
                        </div>
                    </Col>
                </Row>
            </Navbar>
        )
    }
}
export default TopNav;
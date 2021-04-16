import React from 'react';
import './Dashboard.scss';
import { withRouter } from "react-router-dom";
import FontAwesome from 'react-fontawesome'
import { Row, Col, Container, Card } from "react-bootstrap";
import ItemsList from "../../Components/ItemsList/ItemsList";

class Dashboard extends React.Component {
    render() {
        return (
            <div className="dashboard-container">
                <Container>
                    <h3 className='text-blue text-left'>Have a look at Interventory!</h3>
                    <Row>
                        <Col xs={12} md={4}>
                            <Card className="widget-card">
                                <Row className="align-items-center">
                                    <Col xs={2} md={2}>
                                        <FontAwesome
                                            className="text-yellow"
                                            name="industry"
                                            size="2x"
                                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                        />
                                    </Col>
                                    <Col xs={10} md={10}>
                                        <Row>
                                            <h4 className="widget-card-title">Inventory Stock</h4>
                                        </Row>
                                        <Row>
                                            <Col xs={9} md={9} className="text-left">
                                                Total Items
                                    </Col>
                                            <Col xs={3} md={3}>
                                                <div>
                                                    200
                                        </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={9} md={9} className="text-left">
                                                Available Items
                                    </Col>
                                            <Col xs={3} md={3}>
                                                <div>
                                                    190
                                        </div>
                                            </Col>
                                        </Row>

                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col xs={12} md={4}>
                            <Card className="widget-card">
                                <Row className="align-items-center">
                                    <Col xs={2} md={2}>
                                        <FontAwesome
                                            className="text-green"
                                            name="edit"
                                            size="2x"
                                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                        />
                                    </Col>
                                    <Col xs={10} md={10}>
                                        <Row>
                                            <h4 className="widget-card-title">Add/Modify Item</h4>
                                        </Row>
                                        <Row>
                                            <Col xs={9} md={9} className="text-left">
                                                Newly Added Items
                                            </Col>
                                            <Col xs={3} md={3}>
                                                <div>
                                                    3
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={9} md={9} className="text-left">
                                                Last Modified Items
                                            </Col>
                                            <Col xs={3} md={3}>
                                                <div>
                                                    3
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col xs={12} md={4}>
                            <Card className="widget-card">
                                <Row className="align-items-center">
                                    <Col xs={2} md={2}>
                                        <FontAwesome
                                            className="text-red"
                                            name="trash"
                                            size="2x"
                                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                        />
                                    </Col>
                                    <Col xs={10} md={10}>
                                        <Row>
                                            <h4 className="widget-card-title">Remove Item</h4>
                                        </Row>
                                        <Row>
                                            <Col xs={9} md={9} className="text-left">
                                                Deleted Items
                                            </Col>
                                            <Col xs={3} md={3}>
                                                <div>
                                                    3
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                    <div className="itemlist-container">
                        <h2 className="text-blue text-left">Items in the Inventory</h2>
                        <ItemsList />
                    </div>
                </Container>
            </div>
        )
    }
}

export default withRouter(Dashboard);
import React from 'react';
import './Dashboard.scss';
import { withRouter } from "react-router-dom";
import FontAwesome from 'react-fontawesome'
import { Row, Col, Container, Card } from "react-bootstrap";
import ItemsList from "../../Components/ItemsList/ItemsList";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatchGetDashboardItems, dispatchGetInventoryItemsList } from "./dispatcher";
import Utility from "../../Utils/Utility";
import { toast } from "react-toastify";

class Dashboard extends React.Component {
    componentDidMount() {
        if (Utility.getCookie("user_id") === "Guest" || Utility.getCookie("full_name") === "Guest") {
            toast.error("Please Login before coming to Dashboard!")
            Utility.navigateToScreen("/login", this, {});
            return;
        }
        this.props.dispatchGetInventoryItemsList();
    }
    navigateToEditScreen() {
        Utility.navigateToScreen(`/edit-item?item_name=New Item`, this, { editItem: false });
    }
    render() {
        console.log("dashboard-", this.props)
        return (
            <div className="dashboard-container">
                <Container>
                    <h3 className='text-blue text-left'>Have a look at Interventory!</h3>
                    <Row>
                        <Col xs={12} md={4}>
                            <Card className="widget-card">
                                <Row className="align-items-center">
                                    <Col xs={2} md={2} className="widget-icon-col">
                                        <FontAwesome
                                            className="text-yellow"
                                            name="industry"
                                            size="2x"
                                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                        />
                                    </Col>
                                    <Col xs={10} md={10}>
                                        <Row>
                                            <h4 className="widget-card-title text-yellow">Inventory Stock</h4>
                                        </Row>
                                        <Row>
                                            <Col xs={9} md={9} className="text-left">
                                                Total Items
                                    </Col>
                                            <Col xs={3} md={3}>
                                                <div className="items-count">
                                                {this.props.dashboard.dashboardData?.totalItems}
                                        </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={9} md={9} className="text-left">
                                                Available Items
                                    </Col>
                                            <Col xs={3} md={3}>
                                                <div className="items-count">
                                                {this.props.dashboard.dashboardData?.availableItems}
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
                                    <Col xs={2} md={2} className="widget-icon-col cursor-pointer" onClick={()=>this.navigateToEditScreen()}>
                                        <FontAwesome
                                            className="text-green"
                                            name="plus-square"
                                            size="2x"
                                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                        />
                                    </Col>
                                    <Col xs={10} md={10}>
                                        <Row>
                                            <h4 className="widget-card-title text-green">Add New Item</h4>
                                        </Row>
                                        <Row>
                                            <Col xs={9} md={9} className="text-left">
                                                Newly Added Items
                                            </Col>
                                            <Col xs={3} md={3}>
                                                <div className="items-count">
                                                {this.props.dashboard.dashboardData?.newItems}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={9} md={9} className="text-left">
                                                Last Modified Items
                                            </Col>
                                            <Col xs={3} md={3}>
                                                <div className="items-count">
                                                {this.props.dashboard.dashboardData?.modifiedItems}
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
                                    <Col xs={2} md={2} className="widget-icon-col">
                                        <FontAwesome
                                            className="text-red"
                                            name="trash"
                                            size="2x"
                                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                        />
                                    </Col>
                                    <Col xs={10} md={10}>
                                        <Row>
                                            <h4 className="widget-card-title text-red">Remove Item</h4>
                                        </Row>
                                        <Row>
                                            <Col xs={9} md={9} className="text-left">
                                                Deleted Items
                                            </Col>
                                            <Col xs={3} md={3}>
                                                <div className="items-count">
                                                {this.props.dashboard.dashboardData?.deletedItems}
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
                        <ItemsList items={this.props.dashboard.inventoryItems} />
                    </div>

                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    return { dashboard: state.dashboard }
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return bindActionCreators({ dispatchGetDashboardItems, dispatchGetInventoryItemsList }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
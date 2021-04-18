import React from 'react';
import './ItemsList.scss';
import FontAwesome from 'react-fontawesome'
import { Row, Col, Container, Card, Image, Button, OverlayTrigger, Popover } from "react-bootstrap";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import { dispatchDeleteItem } from "../../Pages/Dashboard/dispatcher";
import { actionDeleteItemSuccess } from "../../Pages/Dashboard/action";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Utility from "../../Utils/Utility";
import { navigationRef } from "../../index";

class ItemsList extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            showDeleteModal: false,
            actionItemName: "",
            showDeleteSuccessModal: false,
        }
        this.confirmDelete = this.confirmDelete.bind(this);
        this.toogleModal = this.toogleModal.bind(this);
        this.hideSuccessModal = this.hideSuccessModal.bind(this);
    }

    toogleModal(display: boolean, deleteItemName: string) {
        console.log("delete-", deleteItemName)
        this.setState({ showDeleteModal: display, actionItemName: deleteItemName })
    }
    async confirmDelete() {
        await this.props.dispatchDeleteItem(this.state.actionItemName);
        this.setState({ showDeleteSuccessModal: this.props.dashboard.deleteItemSuccess })
    }
    hideSuccessModal() {
        this.setState({ showDeleteSuccessModal: false })
        this.toogleModal(false, "")
        this.props.actionDeleteItemSuccess(false)
        window.location.reload();
    }
    navigateToEditItem(itemName: string, item: any) {
        console.log("item--", item)
        this.setState({ actionItemName: itemName }, function () {
            navigationRef.current.history.push(`/edit-item?item_name=${itemName}`, { item: item, editItem: true })
        }
        )
    }
    createPopover(itemDescription: string) {
        return (
            <Popover id="popover-basic" >
                <Popover.Content>
                    {itemDescription}
                </Popover.Content>
            </Popover>)
    }
    render() {
        console.log("props--", this.props)
        let products = [];
        for (const i in this.props.items) {
            let outOfStock = false
            if (this.props.items[i]['available_qty'] <= 0 || this.props.items[i]['available_qty'] === "") {
                outOfStock = true
            }
            let discount = this.props.items[i]['mrp'] - this.props.items[i]["customer_price"];
            if (this.props.items[i]['status'] !== "Deleted") {
                products.push(
                    <Col lg={3} md={4} xs={12} key={this.props.items[i]['name']}>
                        <Card className='item-card'>
                            <Row>
                                <Col xs={5} md={12} lg={12}>
                                    <div className="product">
                                        {outOfStock ? <p className='sold-out'>Sold out</p> : null}
                                        <Image className='img-fluid' src={this.props.items[i]["item_image"]} />
                                    </div>
                                </Col>
                                <Col xs={7} md={12} lg={12}>
                                    <p className='brand'>{this.props.items[i]['brand'].toUpperCase()}</p>
                                    <h5 className='productName'> {this.props.items[i]['item_name'].split('/')[0]}</h5>
                                    <OverlayTrigger trigger="click" placement="bottom" overlay={this.createPopover(this.props.items[i]['description'])}>
                                        <div className="cursor-pointer description">Description </div>
                                    </OverlayTrigger>
                                    <label>
                                        {this.props.items[i]['mrp'] > 0 ? <div>MRP <span className='mrp'>₹ <strike>{this.props.items[i]['mrp']}</strike></span></div> : null}
                                        <label>Customer Price<span className='customer-price'> ₹ {this.props.items[i]["customer_price"]}</span></label>
                                    </label>
                                    <label>
                                        {discount > 0 ?
                                            <div>Total Off <span className='total-off'> ₹ {discount.toFixed(2)}</span></div>
                                            : null}
                                    </label>
                                    <Row>
                                        <Col md={6} xs={6} className='center offset-md-0'>
                                            <Button onClick={(e) => this.navigateToEditItem(this.props.items[i]['name'], this.props.items[i])} disabled={outOfStock} className="edit-button">
                                                <FontAwesome
                                                    name="edit"
                                                    size="2x"
                                                />
                                            </Button>

                                        </Col>
                                        <Col md={6} xs={6} className='center offset-md-0'>
                                            <Button onClick={(e) => this.toogleModal(true, this.props.items[i]['name'])} disabled={outOfStock} className="delete-button">
                                                <FontAwesome
                                                    name="trash"
                                                    size="2x"
                                                />
                                            </Button>

                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                )
            }
        }
        return (

            <section className='itemListSection'>
                <Row className={""}>
                    {products}
                </Row>
                <ConfirmDeleteModal visible={this.state.showDeleteModal} onHide={() => this.toogleModal(false, "")} onconfirmDelete={() => this.confirmDelete()} />
                {this.state.showDeleteSuccessModal ? <SuccessModal modalTitle="Item Deleted Successfully!" visible={this.state.showDeleteSuccessModal} onHide={() => this.hideSuccessModal()} /> : null}
            </section>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    return { dashboard: state.dashboard }
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return bindActionCreators({ dispatchDeleteItem, actionDeleteItemSuccess }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
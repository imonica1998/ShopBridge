import React from 'react';
import './EditItem.scss';
import { withRouter } from "react-router-dom";
import { Row, Col, Card, Form, Button, FormControl } from "react-bootstrap";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatchCreateOrModifyItem } from "../Dashboard/dispatcher";
import { actionCreateOrModifyItemSuccess } from "../Dashboard/action";
import SuccessModal from "../../Components/SuccessModal/SuccessModal";
import { navigationRef } from "../../index";
import Utility from "../../Utils/Utility";
import { toast } from "react-toastify";

class EditItem extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            itemName: "",
            description: "",
            brand: "",
            mrp: "",
            customerPrice: "",
            imageURL: "",
            availableQty: "",
            weightPerUnit: "",
            itemNameError: false,
            itemBrandError: false,
            itemDescriptionError: false,
            itemMrpError: false,
            itemImageError: false,
            showSuccessModal: false,
        }
    }
    componentWillMount() {
        if (Utility.getCookie("user_id") === "Guest" || Utility.getCookie("full_name") === "Guest") {
            toast.error("Please Login before coming to Dashboard!")
            Utility.navigateToScreen("/login", this, {});
            return;
        }
    }
    componentDidMount() {
        if (this.props.location.state?.editItem) {
            this.setState({
                itemName: this.props.location.state?.item?.item_name,
                description: this.props.location.state?.item?.description,
                brand: this.props.location.state?.item?.brand,
                mrp: this.props.location.state?.item?.mrp,
                customerPrice: this.props.location.state?.item?.customer_price,
                imageURL: this.props.location.state?.item?.item_image,
                availableQty: this.props.location.state?.item?.available_quantity,
                weightPerUnit: this.props.location.state?.item?.weight_per_unitkg,
            })
        }
    }
    handleChange(field: string, value: any) {
        this.setState({ [field]: value })
        switch (field) {
            case "itemName":
                !value ?
                    this.setState({ itemNameError: true })
                    : this.setState({ itemNameError: false })
                break;
            case "description":
                !value ?
                    this.setState({ itemDescriptionError: true })
                    : this.setState({ itemDescriptionError: false })
                break;
            case "brand":
                !value ?
                    this.setState({ itemBrandError: true })
                    : this.setState({ itemBrandError: false })
                break;
            case "mrp":
                !value ?
                    this.setState({ itemMrpError: true })
                    : this.setState({ itemMrpError: false })
                break;
            case "imageURL":
                !value ?
                    this.setState({ itemImageError: true })
                    : this.setState({ itemImageError: false })
                break;
        }
    }
    clearForm() {
        this.setState({
            itemName: "",
            description: "",
            brand: "",
            mrp: "",
            customerPrice: "",
            imageURL: "",
            availableQty: "",
            weightPerUnit: "",
            itemNameError: false,
            itemBrandError: false,
            itemDescriptionError: false,
            itemMrpError: false,
            itemImageError: false,
            showSuccessModal: false,
        })
    }
    async submitForm() {
        if (!this.state.itemName) {
            this.setState({ itemNameError: true })
            return
        }
        if (!this.state.brand) {
            this.setState({ itemBrandError: true })
            return
        }
        if (!this.state.description) {
            this.setState({ itemDescriptionError: true })
            return
        }
        if (!this.state.mrp) {
            this.setState({ itemMrpError: true })
            return
        }
        if (!this.state.imageURL) {
            this.setState({ itemImageError: true })
            return
        }
        let itemDict = {
            "name": this.state.itemName,
            "decsription": this.state.description,
            "brand": this.state.brand,
            "item_image": this.state.imageURL,
            "mrp": this.state.mrp,
            "customer_price": !this.state.customerPrice ? this.state.mrp : this.state.customerPrice,
            "status": this.props.location.state?.editItem ? "Modified" : "New",
            "available_quantity": this.state.availableQty ? this.state.availableQty : 1,
            "weight_per_unitkg": this.state.weightPerUnit ? this.state.weightPerUnit : 0
        }
        if (!this.props.location.state?.editItem) {
            itemDict["item_name"] = this.state.itemName;
        }
        await this.props.dispatchCreateOrModifyItem(itemDict, !this.props.location.state?.editItem);
        this.setState({ showSuccessModal: this.props.dashboard?.createOrModifyItemSuccess })
    }
    hideSuccessModal() {
        this.setState({ showSuccessModal: false })
        this.props.actionCreateOrModifyItemSuccess(false)
        navigationRef.current.history.push("/dashboard", {})
    }
    render() {
        console.log("edit itemProps", this.props)
        return (
            <div className="edit-item-container">
                <Row>
                    <Col xs={12} md={12} lg={12}>
                        <h2 className="edit-item-title">
                            {this.props.location.state?.editItem ?
                                "Modify Item"
                                : "Add Item"}</h2>
                    </Col>
                    <Col xs={12} md={6} lg={6}>
                        <Card className="edit-item-card">
                            <Form className='edit-item-form'>
                                <label className='edit-item-label'>Item Name</label>
                                <FormControl
                                    aria-label="item_name"
                                    className='edit-item-input'
                                    type='text'
                                    placeholder='Item Name'
                                    required
                                    value={this.state.itemName}
                                    onChange={(e: any) => this.handleChange('itemName', e.target.value)}
                                />
                                {this.state.itemNameError ? <div className='error'>Please Enter Item name!</div> : null}
                                <label className='edit-item-label'>Item Brand</label>
                                <FormControl
                                    aria-label="brand_name"
                                    className='edit-item-input'
                                    type='text'
                                    placeholder='Item Brand'
                                    required
                                    value={this.state.brand}
                                    onChange={(e: any) => this.handleChange('brand', e.target.value)}
                                />
                                {this.state.itemBrandError ? <div className='error'>Please Enter Item brand!</div> : null}
                                <label className='edit-item-label'>Item Description</label>
                                <FormControl
                                    aria-label="description"
                                    className='edit-item-input'
                                    as="textarea" rows={3}
                                    placeholder='Item Description'
                                    required
                                    value={this.state.description}
                                    onChange={(e: any) => this.handleChange('description', e.target.value)}
                                />
                                {this.state.itemDescriptionError ? <div className='error'>Please Enter Item description!</div> : null}
                                <label className='edit-item-label'>MRP</label>
                                <FormControl
                                    aria-label="mrp"
                                    className='edit-item-input'
                                    type='number'
                                    placeholder='Item Mrp'
                                    required
                                    value={this.state.mrp}
                                    onChange={(e: any) => this.handleChange('mrp', e.target.value)}
                                />
                                {this.state.itemMrpError ? <div className='error'>Please Enter Mrp!</div> : null}
                                <label className='edit-item-label'>Customer Price</label>
                                <FormControl
                                    aria-label="customer_price"
                                    className='edit-item-input'
                                    type='number'
                                    placeholder='Discounted Customer Price'
                                    required
                                    value={this.state.customerPrice}
                                    onChange={(e: any) => this.handleChange('customerPrice', e.target.value)}
                                />
                                <label className='edit-item-label'>Item Image</label>
                                <FormControl
                                    aria-label="img_url"
                                    className='edit-item-input'
                                    type='text'
                                    placeholder='Image URL'
                                    required
                                    value={this.state.imageURL}
                                    onChange={(e: any) => this.handleChange('imageURL', e.target.value)}
                                />
                                {this.state.itemImageError ? <div className='error'>Please Enter Image Url!</div> : null}
                                <label className='edit-item-label'>Available Quantity</label>
                                <FormControl
                                    aria-label="available_qty"
                                    className='edit-item-input'
                                    type='number'
                                    placeholder='Available Quantity'
                                    required
                                    value={this.state.availableQty}
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
                                            this.handleChange('availableQty', e.target.value)
                                        }
                                    }}
                                />
                                <label className='edit-item-label'>Weight per unit in Kg</label>
                                <FormControl
                                    aria-label="weight_per_unit"
                                    className='edit-item-input'
                                    type='number'
                                    placeholder='Weight per unit in Kg'
                                    required
                                    value={this.state.weightPerUnit}
                                    onChange={(e: any) => this.handleChange('weightPerUnit', e.target.value)}
                                />
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
                {this.state.showSuccessModal ? <SuccessModal modalTitle="Item Updated Successfully!" visible={this.state.showSuccessModal} onHide={() => this.hideSuccessModal()} /> : null}
            </div>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    return { dashboard: state.dashboard }
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return bindActionCreators({ dispatchCreateOrModifyItem, actionCreateOrModifyItemSuccess }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditItem))


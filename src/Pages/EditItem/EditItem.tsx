import React from 'react';
import './EditItem.scss';
import { withRouter } from "react-router-dom";
import { Row, Col, Card, Image, Form, Button, FormControl } from "react-bootstrap";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
            itemNameError:false,
        }
    }
    handleChange(field: string, value: any) {
        this.setState({ [field]: value })
    }
    render() {
        return (
            <div className="edit-item-container">
                <Row>
                    <Col xs={12} md={12} lg={12}>
                        <h2 className="edit-item-title">Modify Item</h2>
                    </Col>
                    <Col xs={12} md={6} lg={6}>
                        <Card className="edit-item-card">
                            <Form className='edit-item-form'>
                                <FormControl
                                    aria-label="item_name"
                                    className='edit-item-input'
                                    type='text'
                                    placeholder='Item Name *'
                                    required
                                    value={this.state.itemName}
                                    onChange={(e: any) => this.handleChange('', e.target.value)}
                                />
                                {this.state.itemNameError ? <div className='error'>Please Enter Item name!</div> : null}
                                <FormControl
                                    aria-label="brand_name"
                                    className='edit-item-input'
                                    type='text'
                                    placeholder='Item Brand'
                                    required
                                    value={this.state.brand}
                                    onChange={(e: any) => this.handleChange('brand', e.target.value)}
                                />
                                <FormControl
                                    aria-label="mrp"
                                    className='edit-item-input'
                                    type='number'
                                    placeholder='Item Mrp'
                                    required
                                    value={this.state.mrp}
                                    onChange={(e: any) => this.handleChange('mrp', e.target.value)}
                                />
                                <FormControl
                                    aria-label="customer_price"
                                    className='edit-item-input'
                                    type='number'
                                    placeholder='Discounted Customer Price'
                                    required
                                    value={this.state.customerPrice}
                                    onChange={(e: any) => this.handleChange('customerPrice', e.target.value)}
                                />
                                <FormControl
                                    aria-label="img_url"
                                    className='edit-item-input'
                                    type='text'
                                    placeholder='Image URL'
                                    required
                                    value={this.state.imageURL}
                                    onChange={(e: any) => this.handleChange('imageURL', e.target.value)}
                                />
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
            </div>
        )
    }
}
export default withRouter(EditItem);

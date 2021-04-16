import React from 'react';
import './ItemsList.scss';
import FontAwesome from 'react-fontawesome'
import { Row, Col, Container, Card, Image, Button } from "react-bootstrap";

class ItemsList extends React.Component {
    render() {
        console.log("props--", this.props)
        let products = [];
        for (const i in this.props.items) {
            let outOfStock = false
            if (this.props.items[i]['available_qty'] <= 0) {
                outOfStock = true
            }
            let discount = this.props.items[i]['mrp'] - this.props.items[i]["customer_price"];
            products.push(
                <Col lg={3} md={4} xs={12} className={outOfStock ? 'disabled pl-columns' : 'pl-columns'} key={this.props.items[i]['name']}>
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
                                <label className='mrp inline'>
                                    {this.props.items[i]['mrp'] > 0 ? <div>MRP ₹ <strike>{this.props.items[i]['mrp']}</strike></div> : null}
                                    <label>Customer Price<span className='blue'> ₹ {this.props.items[i]["customer_price"]}</span></label>
                                </label>
                                <label className='rsSave inline'>
                                    {discount > 0 ?
                                        <div>Total Off <span className='green'> ₹ {discount.toFixed(2)}</span></div>
                                        : null}
                                </label>
                                <Row>
                                    <Col md={6} xs={6} className='center offset-md-0'>
                                        <Button onClick={(e) => { e.stopPropagation(); }} disabled={outOfStock} className="edit-button">
                                            <FontAwesome
                                                name="edit"
                                                size="2x"
                                                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                            />
                                        </Button>

                                    </Col>
                                    <Col md={6} xs={6} className='center offset-md-0'>
                                        <Button onClick={(e) => { e.stopPropagation(); }} disabled={outOfStock} className="delete-button">
                                            <FontAwesome
                                                name="trash"
                                                size="2x"
                                                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
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
        return (

            <section className='sellingProductsList'>
                <Row className={""}>
                    {products}
                </Row>
            </section>
        )
    }
}
export default ItemsList;
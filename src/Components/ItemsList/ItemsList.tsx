import React from 'react';
import './ItemsList.scss';
import FontAwesome from 'react-fontawesome'
import { Row, Col, Container, Card, Image, Button } from "react-bootstrap";

class ItemsList extends React.Component {
    render() {
        let products = [];
        let productList = [
            {
                "moq_multiples_only": 0,
                "item_name": "Nycil @40",
                "brand": "Heinz",
                "item_code": "Nycil-Nycil-Cool-Herbal-Neem @40",
                "item_group": "06-Heinz",
                "is_stock_item": 1,
                "er_item_type": "FMCG brands",
                "has_variants": 0,
                "variant_based_on": "Item Attribute",
                "gst_tax_rate": 12,
                "item_sub_category": "Talcum Powder",
                "is_retail_item": 1,
                "cess_rate": 0,
                "qty_cess": 0,
                "sales_uom": "",
                "stock_uom": "Piece",
                "mrp": 40,
                "max_qty_per_order": 0,
                "thumbnail": "/static/media/imageComingSoon.a5290a51.jpg",
                "er_code": null,
                "base64_placeholder_image": null,
                "temp_brand": "",
                "display_category_variant": "",
                "weight_per_unit": 50,
                "product_bundle": null,
                "lcname": "nycil-nycil-cool-herbal-neem @40",
                "brand_category_group": null,
                "kvi": 0,
                "available_qty": 0,
                "pd": "1 Piece",
                "type": "Piece",
                "s_no": "",
                "cf": 1,
                "tags": "",
                "is_discount": false,
                "rate": 36.69999984,
                "customer_rate": 39.2,
                "margin": 6.811989566482805,
                "actual_rate": 32.767857,
                "actual_customer_rate": 35,
                "reference": "Nycil-Nycil-Cool-Herbal-Neem @40Piece"
            }]
        for (const i in productList) {
            let outOfStock = false
            if (productList[i]['available_qty'] <= 0) {
                outOfStock = true
            }

            let customerRate = productList[i]['isBundle'] ? parseFloat(productList[i]['tax_customer_rate']).toFixed(2) : parseFloat(productList[i]['customer_rate']).toFixed(2)
            let percentOff = Math.round(((productList[i]['mrp'] - parseFloat(customerRate)) / productList[i]['mrp']) * 100)

            products.push(
                <Col lg={3} md={4} xs={12} className={outOfStock ? 'disabled pl-columns' : 'pl-columns'} key={productList[i]['item_code']}>
                    <Card className='item-card'>
                        <Row>
                            <Col xs={5} md={12} lg={12}>
                                <div className="product">
                                    {outOfStock ? <p className='sold-out'>Sold out</p> : null}
                                    <Image className='img-fluid' src={"https://images-na.ssl-images-amazon.com/images/I/71bufOt9zAL._SX425_.jpg"} />
                                </div>
                            </Col>
                            <Col xs={7} md={12} lg={12}>
                                <p className='brand'>{productList[i]['brand'].toUpperCase()}</p>
                                <h5 className='productName'> {productList[i]['item_name'].split('/')[0]}</h5>
                                <label className='mrp inline'>
                                    {productList[i]['mrp'] > 0 ? <div>MRP ₹ <strike>{productList[i]['mrp']}</strike></div> : null}
                                    <span className='blue'> ₹ {customerRate}</span>
                                </label>
                                <label className='rsSave inline'>
                                    {(parseFloat(productList[i]['mrp']) - parseFloat(customerRate)) > 0 ? <div>Total Off <span className='green'> ₹ {(parseFloat(productList[i]['mrp']) - parseFloat(customerRate)).toFixed(2)}</span></div> : null}
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
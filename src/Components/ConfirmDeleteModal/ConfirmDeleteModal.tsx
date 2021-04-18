import React from 'react';
import { Modal ,Button, Row, Col } from "react-bootstrap";
import FontAwesome from 'react-fontawesome';
import "./ConfirmDeleteModal.scss";


class ConfirmDeleteModal extends React.Component {
    render() {
        return (
            <Modal
                animation={false}
                className="confirm-delete-modal"
                show={this.props.visible}
                onExit={() => this.props.onHide()}
                onHide={() => this.props.onHide()}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <div className="close-btn-container">
                        <Button className="close-btn" onClick={() => this.props.onHide()}>
                            <FontAwesome
                                name="times" />
                        </Button>
                    </div>
                    <h4 className="success-modal-title">Are you sure to delete this item?</h4>
                    <Row className="action-btn-row">
                        <Col xs={6} md={6} className="action-btn-col">
                            <Button className='no-btn' onClick={() => this.props.onHide()}>No</Button>
                        </Col>
                        <Col xs={6} md={6} className="action-btn-col">
                            <Button className='yes-btn' onClick={()=>this.props.onconfirmDelete()}>Yes</Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        )
    }
}
export default ConfirmDeleteModal;
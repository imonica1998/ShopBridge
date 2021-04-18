import React from 'react';
import { Modal, Image, Button } from "react-bootstrap";
import Success from "../../assets/success.svg";
import FontAwesome from 'react-fontawesome';
import "./ProfileSuccessModal.scss";


class ProfileSuccessModal extends React.Component {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <Modal
                animation={false}
                className="profile-success-modal"
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
                    <h4 className="success-modal-title">Profile Updated Successfully!</h4>
                    <div className="success-img-container">
                        <Image src={Success} alt="success-profile" className="success-img" />
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}
export default ProfileSuccessModal;
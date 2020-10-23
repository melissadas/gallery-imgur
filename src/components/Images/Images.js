import React from "react";
import './Images.css';

import {
    Row,
    Col,
    Modal,
    OverlayTrigger,
    Tooltip,
    Button
} from "react-bootstrap";
import { Player } from 'video-react';

class Images extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: this.props.image,
            showModal: false,
            isVideo: false,
            imageSource: ""
        };
    }

    showGalleryImage = () => {
        let thumbnailImg;
        thumbnailImg = "https://imgur.com/" + this.props.image.cover + ".jpg"
        return thumbnailImg;

    }

    seeDetails = (image) => {
        this.setState({
            showModal: true
        })
        image.images.map((albumImg, key) => {
            if (albumImg.type === "video/mp4") {
                this.setState({
                    isVideo: true,
                    imageSource: "https://imgur.com/" + this.props.image.cover + ".mp4"
                })
            }
            else {
                this.setState({
                    isVideo: false,
                    imageSource: "https://imgur.com/" + this.props.image.cover + ".jpg"
                })
            }
        })
    }

    hideModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    render() {
        return (
            <>
                <Modal
                    class="container"
                    size="lg"
                    show={this.state.showModal}
                    onHide={() => this.hideModal()}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            {this.props.image.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.isVideo ? (<Player
                            playsInline
                            src={this.state.imageSource}
                        />) : (<img src={this.state.imageSource} class="img-fluid" alt=""></img>)}

                        {this.props.image.description ? <p>{this.props.image.description}</p> : ''}
                    </Modal.Body>
                    <Modal.Footer className="footer-align">
                        <Row className="full-width">
                            <Col xs={12} md={4} lg={4}>
                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={<Tooltip id="button-tooltip-2">Upvotes</Tooltip>}
                                >
                                    <span><i className="fa fa-thumbs-up"></i>
                                        {this.props.image.ups}
                                    </span>
                                </OverlayTrigger>
                            </Col>
                            <Col xs={12} md={4} lg={4}>
                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={<Tooltip id="button-tooltip-2">Downvotes</Tooltip>}
                                >
                                    <span><i class="fa fa-thumbs-down"></i>
                                        {this.props.image.downs}
                                    </span>
                                </OverlayTrigger>
                            </Col>
                            <Col xs={12} md={4} lg={4}>
                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={<Tooltip id="button-tooltip-2">Score</Tooltip>}
                                >
                                    <span><i class="fa fa-bullseye"></i>
                                        {this.props.image.score}
                                    </span>
                                </OverlayTrigger>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </Modal>
                <div className="card card-block">
                    <Button variant="link" onClick={this.seeDetails.bind(this, this.props.image)}><img src={this.showGalleryImage()} alt=".."></img></Button>
                    <h5 className="card-title mt-3 mb-3">{this.props.image.title}</h5>
                </div>
            </>
        )
    }
}
export default Images;

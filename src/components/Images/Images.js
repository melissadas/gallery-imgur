import React from "react";
import './Images.css';

import {
    Row,
    Col,
    Modal
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
                        />) : (<img src={this.state.imageSource} class="img-fluid" alt="Responsive image"></img>)}

                        {this.props.image.description ? <p>{this.props.image.description}</p> : ''}
                    </Modal.Body>
                    <Modal.Footer className="footer-align">
                        <Row className="full-width">
                            <Col xs={12} md={4} lg={4}>
                                <span><i class="fa fa-thumbs-up"></i>
                                    {this.props.image.ups}
                                </span>
                            </Col>
                            <Col xs={12} md={4} lg={4}>
                                <span><i class="fa fa-thumbs-down"></i>
                                    {this.props.image.downs}
                                </span>
                            </Col>
                            <Col xs={12} md={4} lg={4}>
                                <span><i class="fa fa-bullseye"></i>
                                    {this.props.image.score}
                                </span>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </Modal>


                <div class="card card-block">
                    <a onClick={this.seeDetails.bind(this, this.props.image)} > <img src={this.showGalleryImage()} alt=".."></img></a>
                    <h5 class="card-title mt-3 mb-3">{this.props.image.title}</h5>
                </div>


            </>
        )
    }
}
export default Images;

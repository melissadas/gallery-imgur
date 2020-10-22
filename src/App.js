import React, { Component, lazy, Suspense } from 'react';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import './App.css';
import {
  Col,
  Row,
  Container,
  Nav
} from 'react-bootstrap';
import fetch from 'node-fetch';

const CLIENT_ID = "6a1cd7b62948f55";
const API_URL = "https://api.imgur.com/3/gallery/hot/viral/day/0";

const ImageComponent = lazy(() => import('./components/Images/Images'));

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { galleryImages: [] };
  }

  componentDidMount = () => {
    this.getGalleryImages();

  }

  getGalleryImages = () => {
    fetch(API_URL, {
      headers: { Authorization: 'Client-ID ' + CLIENT_ID },
    })
      .then(res => res.json())
      .then(json =>
        this.setState({ galleryImages: json.data })
      );
  }

  renderLoader = () => (
    <Loader />
  )

  handleHotImages = () => {
    fetch("https://api.imgur.com/3/gallery/hot/0", {
      headers: { Authorization: 'Client-ID ' + CLIENT_ID },
    })
      .then(res => res.json())
      .then(json =>
        this.setState({ galleryImages: json.data })
      );
  }

  handleTopImages = () => {
    fetch("https://api.imgur.com/3/gallery/top/0", {
      headers: { Authorization: 'Client-ID ' + CLIENT_ID },
    })
      .then(res => res.json())
      .then(json =>
        this.setState({ galleryImages: json.data })
      );
  }

  handleUserImages = () => {
    fetch("https://api.imgur.com/3/gallery/user/0", {
      headers: { Authorization: 'Client-ID ' + CLIENT_ID },
    })
      .then(res => res.json())
      .then(json =>
        this.setState({ galleryImages: json.data })
      );
  }


  render() {
    return (
      <div className="App" >
        <Header />
        <Suspense fallback={this.renderLoader()}>
          <Container >
            <Nav variant="pills" defaultActiveKey="hot">
              <Nav.Item>
                <Nav.Link eventKey="hot" onClick={() => this.handleHotImages()}>Hot</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="top" onClick={() => this.handleTopImages()}>Top</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="user" onClick={() => this.handleUserImages()}>
                  User
    </Nav.Link>
              </Nav.Item>
            </Nav>
            <Row id="gallery">
              {this.state.galleryImages.map((img, key) => {
                //console.log(img);
                //console.log(img.images);
                // if (img.images !== undefined) {
                //   img.images.map((thumbnailImg, index) => {
                //     if (thumbnailImg.link.includes("jpg") || thumbnailImg.link.includes("jpeg") || thumbnailImg.link.includes("png")) {
                //       console.log(thumbnailImg.description);
                //     }

                //   })
                // }
                return img.cover ?
                  (
                    <Col md={4} className="col-padding">
                      <ImageComponent image={img} />
                    </Col>

                  ) : ''
              }
              )
              }
            </Row>
          </Container>
        </Suspense>
      </div >
    );
  }
}

export default App;

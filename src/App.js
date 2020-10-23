import React, { Component, lazy, Suspense } from 'react';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import Paginate from './components/Paginate/Paginate';
import './App.css';
import {
  Col,
  Row,
  Container,
  Nav,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import fetch from 'node-fetch';

const CLIENT_ID = "6a1cd7b62948f55";
const API_URL = "https://api.imgur.com/3";
const SORT = ["Viral", "Top", "Time"];
const TIME = ["Day", "Week", "Month", "Year", "All"];

const ImageComponent = lazy(() => import('./components/Images/Images'));

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      galleryImages: [],
      checked: true,
      show: false,
      sortDefaultValue: "viral",
      timeDefaultValue: "day",
      showTimeMenu: false
    };
  }

  componentDidMount = () => {
    this.getGalleryImages();

  }

  getGalleryImages = () => {
    fetch(API_URL + "/gallery/hot/viral/day", {
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
    fetch("https://api.imgur.com/3/gallery/hot", {
      headers: { Authorization: 'Client-ID ' + CLIENT_ID },
    })
      .then(res => res.json())
      .then(json =>
        this.setState({
          galleryImages: json.data,
          showTimeMenu: false
        }),

      );
  }

  handleTopImages = () => {
    fetch("https://api.imgur.com/3/gallery/top", {
      headers: { Authorization: 'Client-ID ' + CLIENT_ID },
    })
      .then(res => res.json())
      .then(json =>
        this.setState({
          galleryImages: json.data,
          showTimeMenu: true
        })
      );
  }

  handleUserImages = () => {
    fetch("https://api.imgur.com/3/gallery/user", {
      headers: { Authorization: 'Client-ID ' + CLIENT_ID },
    })
      .then(res => res.json())
      .then(json =>
        this.setState({ galleryImages: json.data, showTimeMenu: false })
      );
  }

  handleCheckboxChange = (event) => {
    //https://api.imgur.com/3/gallery/hot/viral
    console.log(event.target.checked);
    this.setState({ checked: event.target.checked })


  }


  handleSortChange = (event) => {
    this.setState({
      sortDefaultValue: event.target.value
    })
    // if (event.target.value === "viral") {
    //   this.setState({ checked: true })

    // }
    // else {
    //   this.setState({ checked: false })
    // }

    fetch(API_URL + "/gallery/hot/" + event.target.value.toLowerCase(), {
      headers: { Authorization: 'Client-ID ' + CLIENT_ID },
    })
      .then(res => res.json())
      .then(json =>
        this.setState({ galleryImages: json.data })
      );
  }

  handleTimeChange = (event) => {
    this.setState({
      timeDefaultValue: event.target.value
    })

    fetch(API_URL + "/gallery/top/viral/" + event.target.value.toLowerCase(), {
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
            <Row>
              <Col xs={12} md={4}>
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
              </Col>
              <Col xs={12} md={4}>
                {/* <Form>
                  <Form.Group controlId="formBasicCheckbox" className="check-box">
                    <Form.Check type="checkbox" label="Check me out" checked={this.state.checked} onChange={(event) => this.handleCheckboxChange(event)} />
                  </Form.Group>
                </Form> */}
                {this.state.showTimeMenu ? (<Row>
                  <Col xs={6} md={3} className="text-right">
                    <label className="sort-margin">Sort By: </label>
                  </Col>
                  <Col xs={6} md={3}>
                    <DropdownButton id="dropdown-item-button" className="drop-down-margin" title={this.state.timeDefaultValue}>
                      {TIME.map((time, key) => (
                        <Dropdown.Item as="button" className="drop-down-item" value={time} onClick={(event) => this.handleTimeChange(event)}>{time}</Dropdown.Item>

                      ))}

                    </DropdownButton>
                  </Col>
                </Row>) : ''}


              </Col>
              <Col xs={12} md={4}>
                <Row>
                  <Col xs={6} md={3} className="text-right">
                    <label className="sort-margin">Sort By: </label>
                  </Col>
                  <Col xs={6} md={3}>
                    <DropdownButton id="dropdown-item-button" className="drop-down-margin" title={this.state.sortDefaultValue}>
                      {SORT.map((sortBy, key) => (
                        <Dropdown.Item as="button" className="drop-down-item" value={sortBy} onClick={(event) => this.handleSortChange(event)}>{sortBy}</Dropdown.Item>

                      ))}

                    </DropdownButton>
                  </Col>
                </Row>

              </Col>

            </Row>


            <Row id="gallery">
              {this.state.galleryImages.map((img, key) => {
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

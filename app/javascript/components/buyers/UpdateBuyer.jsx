import PropTypes from "prop-types"
import React from 'react';
import Button from "../helpers/Button";

class UpdateBuyer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buyerId: this.props.buyerId,
      buyer: {},
      avatar: null,
      componentDidMount: false
    }
  }

  componentDidMount() {
    const buyerRoute = APIRoutes.buyers.show(this.state.buyerId);
    Requester.get(buyerRoute).then(
      response => {
        this.setState({ buyer: response, componentDidMount: true });
      },
      error => {
        console.error(error);
      }
    )
  }

  handleChange = (event) => {
    const buyer = this.state.buyer;
    buyer[event.target.name] = event.target.value;
    this.setState({ buyer: buyer });
  }

  setFile = (e) => {
    const files = e.target.files;
    if (!files || !files[0]) {
      return;
    }

    this.setState({ avatar: files[0] });
  }

  selectFile = () => {
    this.avatar.click();
  }

  handleSubmit = (event) => {

    event.preventDefault();
    let formData = new FormData();
    formData.append('buyer[name]', this.state.buyer.name);
    formData.append('buyer[phone_number]', this.state.buyer.phone_number);

    let { avatar } = this.state;
    if ( avatar ) {
      formData.append(
        'buyer[avatar]',
        avatar,
        avatar.name
      );
    }

    fetch(APIRoutes.buyers.update(this.state.buyer.id), {
      method: 'PUT',
      body: formData,
      credentials: 'same-origin',
      headers: {
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      }
    }).then((data) => {
      window.location = `/buyers/` + this.state.buyer.id;
    }).catch((data) => {
      console.error(data);
    });
  }

  render() {
    console.log(this.state);
    if (!this.state.componentDidMount) {
      return (
        <div><h2>Loading</h2></div>
      );
    }
    return (
      <div className="mw6 center">
        <h1>UPDATE BUYER</h1>
        <div className="bg-white pa3">
          <h5>Name</h5>
          <input
            value={this.state.buyer.name}
            onChange={this.handleChange}
            name="name"
            type="text"
            className="textinput"
            required
          />
          <h5>Phone Number</h5>
          <input
            value={this.state.buyer.phone_number}
            onChange={this.handleChange}
            name="phone_number"
            type="text"
            className="textinput"
            required
          />

          <h5>Profile Photo</h5>
          <div className="avatar-sel">
            <input
              name="avatar"
              id="avatar"
              type="file"
              ref={(node) => this.avatar = node}
              onChange={this.setFile}
            />
            <Button
              onClick={this.selectFile}
              className="w4"
              type="button-secondary"
              color="magenta"
            >
              Select File
            </Button>
            <h5 className="ml2">
              {
                this.state.avatar ? (
                  this.state.avatar.name
                ) : (
                  this.state.buyer.avatar &&
                  this.state.buyer.avatar.name
                )
              }
            </h5>
          </div>
          <div className="submit-container mt3 mb3">
            <Button
              onClick={() => {window.location = `/buyers/${this.state.buyer.id}`}}
              type="button-secondary"
              color="magenta"
              className="w4"
            >
              Cancel
            </Button>
            <Button
              onClick={this.handleSubmit}
              type="button-primary"
              color="magenta"
              className="w4 ml2"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default UpdateBuyer;

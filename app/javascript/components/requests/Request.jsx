import PropTypes from "prop-types";
import React from "react";
import StyledModal from "../helpers/StyledModal";
import CreateTransaction from "../transactions/CreateTransaction";
import BuyerSnapshot from "../buyers/BuyerSnapshot";

class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      request: this.props.request,
      artist: this.props.artist
    };
  }

  closeRequest = (id) => {
    const update_request_route = APIRoutes.requests.update(id);
    Requester.update(update_request_route, {open: false}).then((response) => {
      this.props.onChange();
    });
  }

  getRequestStatus = (request) => {
    if (request.open) {
      return "Pending";
    } else {
      if (request.receipt) {
        return "Complete";
      }
      return "Closed";
    }
  }

  getAttr = (request) => {
    let attr = {
      "Placed": new Date(request.updated_at).toLocaleDateString(),
      "Request Type": request.types
    };

    if (request.open) {
      attr["Message"] = request.message;
    } else if (request.receipt) {
      if (request.receipt.transaction_type === "rental") {
        attr["Start Date"] = request.receipt.start_date;
        attr["End Date"] = request.receipt.end_date;
      }
      attr["Price"] = request.receipt.price;
      attr["Purchase Date"] = request.receipt.purchase_date;
    }

    return (
      <div className="attr">
        <div className="key">
          {
            Object.keys(attr).map((obj, i) => {
              return <h5 key={i} className="attr-item">{obj}</h5>
            })
          }
        </div>
        <div className="value">
          {
            Object.keys(attr).map((obj, i) => {
              return <h6 key={i} className="attr-item">{attr[obj]}</h6>
            })
          }
        </div>
      </div>
    );
  }
  
  renderRequestButtons() {
    const closed_timestamps = new Date(this.state.request.updated_at).toLocaleDateString();
    if (!this.state.request.open) {
      return (
        <div className="closed-request-button pa3 w5">
          <p> You archived this request on {closed_timestamps} </p>
        </div>
      );
    }
    let id = this.state.request.id;
    return (
      <div className="request-buttons">
        <div className="w4">
          <button type="button" className="button-secondary b--charcoal w-100" value = {id} onClick = {()=>this.closeRequest(id)}>
            ARCHIVE
          </button>
        </div>
        <div className="ml3 w4">
          <StyledModal
            title="COMPLETE"
            color="ochre"
          >
            <CreateTransaction
              artist={this.props.artist}
              request_id={id}
            />
          </StyledModal>
        </div>
      </div>
    )
  }

  render() {
    const request = this.state.request;
    const id = request.id;
    const thumbnail_url = request.work.thumbnail ? request.work.thumbnail : "https://cdn0.iconfinder.com/data/icons/typicons-2/24/image-128.png";
    const closed_timestamps = new Date(request.updated_at).toLocaleDateString();

    return (
      <div key={request.id} className="request pa3 bg-white mb3">
        <img src={thumbnail_url} className="img"/>
        <div className="w-100 ml4">
          <div className="content-row">
            <div className="request-container">
              <div className="request-action">
                <BuyerSnapshot buyer={this.state.request.buyer} />
                {
                  this.props.artist ? 
                    this.renderRequestButtons()
                   : (
                    <div className = "closed-request-button pa4 w5">
                      <p> You requested this work on {closed_timestamps} </p>
                    </div>
                  )
                }
              </div>
              <div className="attr-container pa3 mt2">
                {this.getAttr(request)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Request;

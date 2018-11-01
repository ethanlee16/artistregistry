import PropTypes from "prop-types";
import React from "react";

/**
  * @prop buyer: buyer currently logged in
  * @prop artist: artist associated with works
  */
class ArtistWorks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      works: [],
      comment: "",
      errors: [],
      componentDidMount: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = () => {
    const artist_id = this.props.artist.id;
    const works_route = APIRoutes.artists.works(0);
    Requester.get(works_route).then(
      response => {
        this.setState({
          works: response,
          componentDidMount: true
        });
      },
      response => {
        console.err(response);
      }
    );
  }

  handleChange(event) {
    this.setState({ comment: event.target.value });
  }

  checkErrors() {
    let errors = [];
    if (!this.state.comment) {
      errors.push("This field cannot be empty.");
    }
    if (!this.props.buyer) {
      errors.push("You must be logged in to request a commission.");
    }
    this.setState({ errors: errors });
  }

  handleSubmit() {
    this.checkErrors();
    if (!this.state.errors) {

      const artist_id = this.props.artist.id;
      const buyer_id = this.props.buyer.id;
      const commissions_route = APIRoutes.commissions.create;

      const payload = {
        "buyer_id": buyer_id,
        "artist_id": artist_id,
        "comment": this.state.comment
      }
      Requester.post(commissions_route, payload).then(
        response => {
          window.location.href = '/artists/' + this.props.artist.id;
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  render() {
    if (!this.state.componentDidMount) {
      return (
        <div>
          <p>Loading</p>
        </div>
      );
    }
    return (
      <div className="artist-profile-page">
        These will be the artist works
        {this.state.works.map(work => (
          <div key={work.id}>
            <h3>{work.title}</h3>
            <p>{work.work_type}</p>
            <p>{work.media}</p>
          </div>
        ))}
        <textarea
          type="TEXT"
          name="comment"
          id="comment"
          value={this.state.comment}
          onChange = {this.handleChange}
        />
        {
          this.state.errors.map((error, i) => {
            return (
              <span key={i}>{error}</span>
            );
          })
        }
        <button onClick={this.handleSubmit}>
          Create
        </button>
      </div>
    );
  }
}

export default ArtistWorks;

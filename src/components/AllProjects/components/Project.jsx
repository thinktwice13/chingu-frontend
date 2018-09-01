import * as React from 'react';
import './Project.css';
import { Link, withRouter } from "react-router-dom";
import { Query } from "react-apollo"
import { gql } from "apollo-boost"
import AsyncLink from "../../utilities/AsyncLink"
import { getProjectAndUser } from "../../ProjectShowcase/graphql/getProjectAndUser"


const MiniLoader = () => <i className="fas fa-circle-notch fa-spin fa-2x" style={{ float: "right", color: "#15cf89" }} />
const MiniError = () => <i className="fas fa-exclamation-circle fa-2x" style={{ float: "right", color: "#f37070", marginLeft: "10px" }} />

class Project extends React.Component {
  state = { loading: false, error: null }

  updateNetworkStatus = ({ loading, error }) => this.setState({ loading, error })

  render() {
    const { id, images, title, elevator_pitch } = this.props.project
    const { loading, error } = this.state
    return (
      <AsyncLink
        className="project"
        to={`/project/${id}`}
        query={getProjectAndUser}
        variables={{ id }}
        onNetworkStatusChange={this.updateNetworkStatus}>
        <img
          className="project-image"
          src={!!images.length ? images[0].url : require('../../../assets/landingImage.png')}
          alt="Project Image"
        />
        <div className="project-info">
          <div
            className="project-title">
            {title}
            {loading && <MiniLoader />}
            {error && <MiniError />}
          </div>
          <div className="project-description" >{elevator_pitch}</div>
        </div>
      </AsyncLink>
    );
  }
}

export default Project;

// {
//   techStack.map((techStack, index) => {
//     return (
//       <div key={index} className="landing-item-project-techStack">{techStack}</div>
//     )
//   })
// }
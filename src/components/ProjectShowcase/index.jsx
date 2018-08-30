import * as React from "react";
import Banner from './components/Banner';
import ProjectSideBar from './components/ProjectSideBar';
import ProjectDescription from './components/ProjectDescription';
import { getProjectAndUser, getUserId } from './graphql/getProjectAndUser';
import { Query } from 'react-apollo';
import './ProjectShowcase.css';
import HeroImage from './components/HeroImage';
import Loader from "../Loader"
import Error from "../Error"

/*
This component should only be concerned with the overall layout of the page and whether it is editable.
*/
class ProjectShowcase extends React.Component {
  state = {
    editable: false
  };

  isEditable = (user, project) => {
    return project.users.some((teamMember) => {
      return user.id === teamMember.id;
    });
  }

  render() {
    const { projectId } = this.props
    return (
      <Query
        query={getProjectAndUser}
        variables={{
          id: projectId,
          github_repo_id: this.props.github_repo_id
        }}>
        {({ error, loading, data }) => {

          if (error) return <Error error={error.message} goBack="/" />
          if (loading) return <Loader />
          const { project } = data

          return (
            <div className="project-portal">
              <Query query={getUserId} fetchPolicy="cache-only">
                {
                  ({ loading, data: { user } }) => {
                    if (loading) return null

                    const editable = user && this.isEditable(user, project)
                    return <React.Fragment>
                      <Banner
                        editable
                        title={project.title}
                        elevator_pitch={project.elevator_pitch}
                        project_id={this.props.projectId}
                      />
                      <HeroImage
                        editable
                        title={project.title}
                        elevatorPitch={project.elevatorPitch}
                        proect_id={this.props.projectId}
                      />
                      <div className="project-info-container">
                        <ProjectDescription
                          editable
                          description={project.description}
                          project_id={projectId}
                        />
                        <ProjectSideBar
                          project={project}
                          editable
                        />
                      </div>
                    </React.Fragment>
                  }
                }
              </Query>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ProjectShowcase;
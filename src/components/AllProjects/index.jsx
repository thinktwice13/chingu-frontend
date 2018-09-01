import * as React from 'react';
import allProjectsQuery from './graphql/allProjectsQuery';
import Request from "../utilities/Request";
import Project from './components/Project';
import './AllProjects.css';

const AllProjects = ({ data }) => {
  const { projects } = data
  const mockErrorProject = { ...projects[0], id: 999 }
  const list = [mockErrorProject, ...projects]

  const renderProjects = projects => {
    return projects.map((project, idx) => {
      return <Project project={project} key={idx} />
    })
  }

  return (
    <div className="all-projects-container">
      <div className="all-projects-title">All Projects</div>
      <div className="all-projects">{projects && renderProjects(list)}</div>
    </div>
  )
}

export default props => (
  <Request
    {...props}
    query={allProjectsQuery}
    component={AllProjects}
    globalLoader
  />)

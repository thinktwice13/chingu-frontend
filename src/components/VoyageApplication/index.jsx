import * as React from 'react';
import './VoyageApplication.css';
import { DynamicForm } from "../DynamicForm";
import Request from "../utilities/Request"
import { gql } from "apollo-boost";
import { Redirect } from "react-router-dom";

const VoyageApplicationUserQuery = gql`
  query VoyageApplicationUserQuery {
    user {
      id
      status
    }
  }
`;

/**
 * refactor notes 8/11/18
 * 
 * apply to voyage button ->
 * render VoyageApplicationContainer passing voyage_id
 * 
 * Flow
 *    status is  'voyage_ready' -> VoyageApplication query
 *      submitRedirect -> /profile
 *    status is 'profile_complete' -> NewVoyageUserApplication query
 *      submitRedirect -> /voyage/applicaton/${this.state.voyage_id}      
 *    status is 'profile_incomplete' -> Redirect /profile/update
 */

const VoyageApplicationContainer = ({
  voyageVersion,
  newUserVersion,
  match: { params: { voyage_id } },
  data: { user: { status } }
}) => {
  switch (status) {
    case 'voyage_ready':
      return (
        <VoyageApplication
          version={voyageVersion}
          voyage_id={voyage_id}
        />
      );
    case 'profile_complete':
      return (
        <VoyageApplication
          version={newUserVersion}
          voyage_id={voyage_id}
          newUser
        />
      );
    case 'profile_incomplete':
      return <Redirect to={"/profile/update"} />;
    default:
      return <Redirect to={"/voyage"} />;
  }
}


const VoyageApplication = ({ version, voyage_id, newUser }) => {
  const handleResponse = (data) => {
    const redirectLocation = newUser
      ? `/voyage/application/${voyage_id}`
      : "/profile";

    return <Redirect to={redirectLocation} />;
  }

  return (
    <div className="voyage-application-container">
      <div className="voyage-application-title">
        {newUser ? "New Voyage User Application" : "Voyage Application"}
      </div>
      <div className="voyage-application">
        <DynamicForm
          version={version}
          purpose={newUser ? "new_voyage_user" : "voyage_application"}
          hiddenData={{ voyage_id }}
          onResponse={handleResponse}
        />
      </div>
    </div>
  );
}

export default props =>
  <Request
    {...props}
    component={VoyageApplicationContainer}
    query={VoyageApplicationUserQuery}
    options={{ fetchPolicy: "network-only" }}
    globalLoader
  />

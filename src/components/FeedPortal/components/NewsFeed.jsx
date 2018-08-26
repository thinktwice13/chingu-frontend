import * as React from "react"
import PropTypes from "prop-types"
import Request from "../../utilities/Request"
import Loader from "../../Loader"
import NewsfeedItems from './index';
import FeedItemContainer from './FeedItem';
import TeamCard from './TeamCard';
import newsfeedQuery from "../graphql/newsfeedQuery"

const NewsFeed = ({ type, loading, data }) => {

  const renderNewsfeedItems = items => items.map(
    item => FeedItemContainer({
      component: NewsfeedItems[item.type],
      item,
      key: item.id,
    }),
  );

  // TODO: Check where is team coming from in the new query response
  const renderFeed = ({ newsfeed: { chingu, other, team } }) => (
    <React.Fragment>
      {
        type === "TEAM"
          ? <TeamCard team={team} />
          : renderNewsfeedItems(chingu)
      }
      <hr className="hl" />
      {renderNewsfeedItems(other)}
    </React.Fragment>
  )


  return (
    <div className="main-container">
      <div className="title">NEWS FEED</div>
      <div className="portal-panel__feed">
        {
          loading
            ? <div style={{ height: "600px" }}><Loader style="medium" /></div>
            : renderFeed(data)
        }
      </div>
    </div >
  )
}

NewsFeed.propTypes = {
  type: PropTypes.oneOf(["ALL", "TEAM"]).isRequired,
  data: PropTypes.shape({
    newsfeed: PropTypes.object
  })
}

NewsFeed.defaultProps = {
  type: "ALL",
}


export default (props) => {
  const variables = {
    input: {
      type: props.type,
      team_id: props.team_id,
      limit: 12,
    }
  }
  return (
    <Request
      {...props}
      fromNewsfeed
      component={NewsFeed}
      query={newsfeedQuery}
      variables={variables}
      options={{ pollInterval: 0 * 60 * 1000 }}
    />
  )
}

import React from "react"
import { withRouter, Link } from "react-router-dom"
import PropTypes from "prop-types"
import { client } from "../../"

// Cancelable promise
// const makeCancelable = promise => {
//   let hasCanceled = false

//   const wrappedPromise = new Promise((resolve, reject) => {
//     promise.then(
//       value => hasCanceled ? reject({ isCanceled: true }) : resolve(value),
//       error => hasCanceled ? reject({ isCanceled: true }) : reject(error)
//     )
//   })
// 
//   return {
//     promise: wrappedPromise,
//     cancel() { hasCanceled: true }
//   }
// }

// cancelablePromise = makeCancelable(
//   new Promise(r => component.setState({...}))
// );

/**
 * TRANSITION ID
 * Only allows the last clicked AsyncLink to change the route. 
 * 
 * TODO: Avoid global variable!
 */
const transitionId = {
  id: 0,
  inc() { return ++this.id }
};

class AsyncLink extends React.Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    replace: PropTypes.bool,
    query: PropTypes.object.isRequired,
    variables: PropTypes.object,
    options: PropTypes.object,
    onNetworkStatusChange: PropTypes.func, // updates parent loading and error states
  }

  static defaultProps = {
    replace: false,
    onNetworkStatusChange: console.log
  }

  preload = e => {
    e.preventDefault()
    const { onNetworkStatusChange, query, variables, options } = this.props

    // Set parent loading state
    onNetworkStatusChange({ loading: true })
    const currentTransitionId = transitionId.inc();

    // Execute query
    // TODO: IDEA Use path registry to get query and options
    client.query({
      query,
      variables,
      options
    }).then(({ data, error }) => {
      // If another AsyncLink clicked, change loading status and return
      if (currentTransitionId < transitionId.id) {
        return onNetworkStatusChange({ loading: false })
      }

      // Otherwise continue to route change
      // TODO: Check for location: { pathname, search, hash }
      const { history, replace, to } = this.props;
      if (replace) history.replace(to)
      else history.push(to)

    }).catch((error) => onNetworkStatusChange({ error, loading: false }))
  }

  render() {
    const { to, replace } = this.props
    return (
      // TODO: middleClick open new tab
      <Link onClick={this.preload} to={to} replace={replace} >
        {this.props.children}
      </Link>
    )
  }
}

export default withRouter(AsyncLink)
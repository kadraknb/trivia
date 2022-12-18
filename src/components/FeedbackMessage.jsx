import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'

class FeedbackMessage extends React.Component {
  render () {
    const { assertions } = this.props
    const baseHits = 3
    return (
      <h1 className="emphasisText my-5">
        { assertions < baseHits ? 'Could be better...' : 'Well Done!' }
      </h1>
    )
  }
}

FeedbackMessage.propTypes = {
  assertions: propTypes.number.isRequired
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions
})

export default connect(mapStateToProps)(FeedbackMessage)

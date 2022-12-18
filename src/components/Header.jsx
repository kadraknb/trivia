import React from 'react'
import propTypes from 'prop-types'
import md5 from 'crypto-js/md5'
import { connect } from 'react-redux'
import { getIgmAction } from '../redux/actions'

class Header extends React.Component {
  getImg = (gravatarEmail) => {
    const { dispatch } = this.props
    const getHash = md5(gravatarEmail).toString()
    const img = `https://www.gravatar.com/avatar/${getHash}`
    dispatch(getIgmAction(img))
    return img
  }

  render () {
    const { gravatarEmail, score, name } = this.props
    return (
      <div>
        <header className="header">
          <section className="userInfo d-flex">
            <img
              className="imgHeader"
              alt="gravatar imagem"
              src={ this.getImg(gravatarEmail) }
            />
            <p
              className="fontHeader ms-3"
            >
              {name}
            </p>
          </section>
          <section className="d-flex">
            <p className="fontHeader me-3">Score:</p>
            <p
              id="score"
              className="fontHeader me-3"
            >
              {score}
            </p>
          </section>
        </header>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score || 0,
  name: state.player.name
})

Header.propTypes = {
  gravatarEmail: propTypes.string.isRequired,
  score: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  dispatch: propTypes.func.isRequired
}

export default connect(mapStateToProps)(Header)

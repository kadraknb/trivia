import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTriviaAction, playerLogin } from '../redux/actions'
import getToken from '../services/getToken'
import getTrivia from '../services/getTrivia'

class Login extends React.Component {
  constructor () {
    super()
    this.state = {
      name: '',
      gravatarEmail: '',
      isDisable: true
    }
  }

  validateEmail = () => {
    const { gravatarEmail } = this.state
    return /\S+@\S+\.\S+/.test(gravatarEmail)
  }

  validateFields = () => {
    const { name } = this.state
    const checker = (this.validateEmail() && name.length > 0)
    this.setState({ isDisable: !checker })
  }

  validToken = async (token) => {
    const trivia = await getTrivia(token)
    if (trivia.response_code !== 0) {
      localStorage.removeItem('token')
      return 'Login'
    }
    const { dispatchTrivia } = this.props
    dispatchTrivia(trivia)
    return 'Game'
  }

  handleSubmit = async () => {
    const token = await getToken()
    localStorage.setItem('token', token)
    const { dispatchPersonalData, router } = this.props
    dispatchPersonalData(this.state)
    const rota = await this.validToken(token)
    router(rota)
  }

  handleChange = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value }, () => this.validateFields())
  }

  render () {
    const { gravatarEmail, name, isDisable } = this.state
    return (
      <form className="LoginForm">
        <fieldset>
          <p className="title-trivia title-trivia-animated">Trivia</p>
          <input
            className="loginForm placeholder col-10 bg-light"
            name="name"
            autoComplete="username"
            value={ name }
            type="text"
            placeholder="Nome"
            onChange={ this.handleChange }
          />
          <input
            className="loginForm placeholder col-10 bg-light"
            autoComplete="email"
            name="gravatarEmail"
            value={ gravatarEmail }
            type="email"
            placeholder="E-mail"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            className="loginForm btn btn-light"
            value="Play"
            onClick={ this.handleSubmit }
            disabled={ isDisable }
          >
            Play
          </button>
        </fieldset>
      </form>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  dispatchPersonalData: (loginData) => dispatch(playerLogin(loginData)),
  dispatchTrivia: (trivia) => dispatch(getTriviaAction(trivia))
})

Login.propTypes = {
  router: PropTypes.func.isRequired,
  dispatchPersonalData: PropTypes.func.isRequired,
  dispatchTrivia: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(Login)

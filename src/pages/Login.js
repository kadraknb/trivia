import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions';

import getToken from '../services/getToken';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      gravatarEmail: '',
      isDisable: true,
    };
  }

  validateEmail = () => {
    const { gravatarEmail } = this.state;
    return /\S+@\S+\.\S+/.test(gravatarEmail);
  }

  validateFields = () => {
    const { isDisable, name } = this.state;
    const validEmail = this.validateEmail();
    const validName = name.length > 0;
    const checker = (validEmail * validName);
    if (isDisable === false && checker === 0) this.setState({ isDisable: true });
    if (checker === 1) this.setState({ isDisable: false });
  }

  handleSubmit = async () => {
    const token = await getToken();
    localStorage.setItem('token', JSON.stringify(token));
    const { dispatchPersonalData, history } = this.props;
    dispatchPersonalData(this.state);
    history.push('/');
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateFields());
  }

  render() {
    const { gravatarEmail, name, isDisable } = this.state;
    return (
      <form className="LoginForm">
        <fieldset>
          <p>Trivia</p>
          <input
            className="loginForm placeholder col-10 bg-light"
            data-testid="input-gravatar-email"
            autoComplete="email"
            name="gravatarEmail"
            value={ gravatarEmail }
            type="email"
            placeholder="e-mail"
            onChange={ this.handleChange }
          />
          <input
            className="loginForm placeholder col-10 bg-light"
            data-testid="input-player-name"
            name="name"
            autoComplete="username"
            value={ name }
            type="text"
            placeholder="Nome"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            className="loginForm btn btn-light"
            data-testid="btn-play"
            value="Play"
            onClick={ this.handleSubmit }
            disabled={ isDisable }
          >
            Play
          </button>
        </fieldset>
      </form>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  dispatchPersonalData: (loginData) => dispatch(userLogin(loginData)),
});

Login.propTypes = {
  dispatchPersonalData: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);

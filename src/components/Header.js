import React from 'react';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { getIgmAction } from '../redux/actions';

class Header extends React.Component {
  getImg = (gravatarEmail) => {
    const { dispatch } = this.props;
    const getHash = md5(gravatarEmail).toString();
    const img = `https://www.gravatar.com/avatar/${getHash}`;
    dispatch(getIgmAction(img));
    return img;
  }

  render() {
    const { gravatarEmail, score, name } = this.props;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            alt="gravatar imagem"
            src={ this.getImg(gravatarEmail) }
          />
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">{score}</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
  name: state.player.name,
});

Header.propTypes = {
  gravatarEmail: propTypes.string.isRequired,
  score: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  dispatch: propTypes.func.isRequired,
};

export default connect(mapStateToProps)(Header);

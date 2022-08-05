import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';


class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      gravatarEmail: '',
    };
  }
  
  render () {
    const { gravatarEmail } = this.props;
    const getHash = md5(gravatarEmail).toString();
    const img = `https://www.gravatar.com/avatar/${getHash}`;
    console.log(getHash);

    return (
      <div>
        <header>
        <img data-testid="header-profile-picture" alt="gravatar imagem" src ={img}/>
        <p data-testid="header-player-name">Nome da pessoa</p>
        <p data-testid="header-score">Score: 0</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.user.gravatarEmail,
});

export default connect(mapStateToProps)(Header);

//LEMBRAR DE CRIAR BRANCH 'main-group-31-req 05' QUANDO FOR DAR O PUSH
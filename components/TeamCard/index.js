import React from 'react';
import PropTypes from 'prop-types';

import img_card_bg_top from '@/assets/images/landing/teamcard/card-bg-top.png';
import img_card_bg_bottom from '@/assets/images/landing/teamcard/card-bg-bottom.png';
import img_card_social_fb from '@/assets/images/landing/teamcard/card-social-fb.svg';
import img_card_social_in from '@/assets/images/landing/teamcard/card-social-in.svg';
import img_card_social_tw from '@/assets/images/landing/teamcard/card-social-tw.svg';

class TeamCard extends React.Component {
  render() {
    return (
      <div className="team-card">
        <div className="card-overlay"/>
        <div className="card-header">
          <img src={img_card_bg_top} className="card-header-bg"/>
          <h1 className="card-header-name">{this.props.name}</h1>
          <h2 className="card-header-title">{this.props.title}</h2>
        </div>
        <div className="card-photo"
             style={{ backgroundImage: `url(${this.props.photo})` }}
        />
        <div className="card-bio">
          <p className="card-bio-description">
            {this.props.description}
          </p>
        </div>
        <div className="card-footer">
          <img src={img_card_bg_bottom} className="card-footer-bg"/>
          {(this.props.linkFb && (this.props.linkFb !== '#')) &&
          <a href={this.props.linkFb}>
            <img src={img_card_social_fb}/>
          </a>
          }
          {(this.props.linkTw && (this.props.linkTw !== '#')) &&
          <a href={this.props.linkTw}>
            <img src={img_card_social_tw}/>
          </a>
          }
          {(this.props.linkIn && (this.props.linkIn !== '#')) &&
          <a href={this.props.linkIn}>
            <img src={img_card_social_in}/>
          </a>
          }
        </div>
      </div>
    );
  }
}

TeamCard.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  photo: PropTypes.any.isRequired,
  linkFb: PropTypes.string,
  linkTw: PropTypes.string,
  linkIn: PropTypes.string
};

export default TeamCard;

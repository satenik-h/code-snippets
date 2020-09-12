import React from 'react';
import moment from 'moment';
import $ from 'jquery';

// Scroll Magic library
// let ScrollMagic = require('scrollmagic');
// import {TweenMax} from 'gsap';
// require('animation.gsap');
// require('debug.addIndicators');

// FullPage library
// require('fullpage.js/vendors/scrolloverflow.min');
import '../../../assets/js/scrolljs/scrolloverflow';

require('fullpage.js/dist/jquery.fullpage.css');
require('fullpage.js/vendors/jquery.easings.min');
require('fullpage.js/dist/jquery.fullpage.min');
require('fullpage.js/dist/jquery.fullpage.extensions.min');

// Parallax
import Parallax from 'parallax-js';

// Particles JS
require('particles.js');
import {LANDING_PARTICLE_SETTING} from '../../../constants';

// Custom Components
import FancyBox from '../../../components/FancyBox';
// import ProgressBar from '../../../components/ProgressBar';
import CountDownTimer from '../../../components/CountDownTimer';
import HexagonAvatar from '../../../components/HexagonAvatar';
import RoadmapXlStep from '../../../components/RoadMapXlStep';
import TeamCard from '../../../components/TeamCard';

// Images
import img_logo from '@/assets/images/common/logo-main.svg';
// import img_lang_en from '@/assets/images/common/lang-en.png';
import img_nav_glow_up from '@/assets/images/common/nav-glow-up.png';
import img_nav_glow_down from '@/assets/images/common/nav-glow-down.png';
// import img_logo_status from '@/assets/images/landing/logo-status.png';
// import img_coin from '@/assets/images/landing/coin.png';
// import img_ship_resize from '@/assets/images/landing/ship-resize.png';
import img_ship_resize from '@/assets/images/landing/ship-resize@1x.png';
// import img_sun from '@/assets/images/landing/sun.png';

// import img_sun from '@/assets/images/landing/sun@1x.png';
import img_sun from '@/assets/images/landing/core/sun_0.png';
import img_sun_1_outer_glow_1 from '@/assets/images/landing/core/sun_1_outer_glow_1.png';
import img_sun_2_flame_1 from '@/assets/images/landing/core/sun_2_flame_1.png';
import img_sun_3_flame_2 from '@/assets/images/landing/core/sun_3_flame_2.png';
import img_sun_4_core from '@/assets/images/landing/core/sun_4_core.png';
import img_sun_5_inner_glow from '@/assets/images/landing/core/sun_5_inner_glow.png';

// import img_partner_1 from '@/assets/images/landing/partners-amigo.png';
// import img_partner_2 from '@/assets/images/landing/partners-eea.png';
// import img_partner_3 from '@/assets/images/landing/partners-inoxoft.png';
// import img_partner_4 from '@/assets/images/landing/partners-opporty.png';
import img_use_of_proceeds from '@/assets/images/landing/use-of-proceeds.png';
import img_roadmap from '@/assets/images/landing/roadmap.png';
// import img_wp_ribbon_left from '@/assets/images/landing/wp-ribbon-left.svg';
// import img_wp_ribbon_right from '@/assets/images/landing/wp-ribbon-right.svg';
// import img_whitepaper from '@/assets/images/landing/whitepaper.png';
// import img_logo_artplant from '@/assets/images/landing/logo-artplant.png';
import img_icon_twitter from '@/assets/images/landing/icon-twitter.svg';
import img_icon_facebook from '@/assets/images/landing/icon-facebook.svg';
import img_icon_instagram from '@/assets/images/landing/icon-instagram.svg';
import img_scrolldown from '@/assets/images/landing/scrolldown.png';

import img_social_facebook from '@/assets/images/landing/social-icons/facebook.svg';
import img_social_twitter from '@/assets/images/landing/social-icons/twitter.svg';
import img_social_discord from '@/assets/images/landing/social-icons/discord.svg';
import img_social_telegram from '@/assets/images/landing/social-icons/telegram.svg';

// Leader photos
import img_leader_henning from '../../../assets/images/landing/teamcard/LeadershipColor-assets/henning.png';
import img_leader_andrey from '../../../assets/images/landing/teamcard/LeadershipColor-assets/andrey.png';
import img_leader_jack from '../../../assets/images/landing/teamcard/LeadershipColor-assets/jack.png';
import img_leader_trond from '../../../assets/images/landing/teamcard/LeadershipColor-assets/trond.png';
import img_leader_morten from '../../../assets/images/landing/teamcard/LeadershipColor-assets/morten.png';
import img_leader_max from '../../../assets/images/landing/teamcard/LeadershipColor-assets/max.png';

// Advisor Photos
import img_advisor_oyvind from '../../../assets/images/landing/teamcard/AdvisorsColor-assets/oyvind.png';
import img_advisor_frodeaschim from '../../../assets/images/landing/teamcard/AdvisorsColor-assets/frodeaschim.png';
import img_advisor_kennetheriksen from '../../../assets/images/landing/teamcard/AdvisorsColor-assets/kennetheriksen.png';
import img_advisor_john from '../../../assets/images/landing/teamcard/AdvisorsColor-assets/john.png';

// Developers
import img_developer_ilya_chubarov from '../../../assets/images/landing/teamcard/TeamColor-assets/Ilya.png';
import img_developer_alexey_antropov from '../../../assets/images/landing/teamcard/TeamColor-assets/alexey.png';
import img_developer_anatoly_shorin from '../../../assets/images/landing/teamcard/TeamColor-assets/AnatoliyShorin.png';
import img_developer_max_kashubo from '../../../assets/images/landing/teamcard/TeamColor-assets/Max.png';
import img_developer_peter_rocchio from '../../../assets/images/landing/teamcard/TeamColor-assets/PeterR.png';
import img_developer_karstein_ersdal from '../../../assets/images/landing/teamcard/TeamColor-assets/Karstein.png';
import img_developer_olivier_chateau from '../../../assets/images/landing/teamcard/TeamColor-assets/Olivier.png';
import img_developer_aleksander_larsen from '../../../assets/images/landing/teamcard/TeamColor-assets/Alexander.png';
import img_developer_daniel_stakhovskiy from '../../../assets/images/landing/teamcard/TeamColor-assets/DanielS.png';
import img_developer_ivan_koren from '../../../assets/images/landing/teamcard/TeamColor-assets/IvanKoren.png';
import img_developer_joachim_barrum from '../../../assets/images/landing/teamcard/TeamColor-assets/Joachim.png';
import img_developer_daria_rodionova from '../../../assets/images/landing/teamcard/TeamColor-assets/Daria.png';
import img_developer_valerii_kriazhev from '../../../assets/images/landing/teamcard/TeamColor-assets/Valery.png';
import img_developer_alexey_suvorov from '../../../assets/images/landing/teamcard/TeamColor-assets/alexeysuvorov.png';
import img_developer_valentin_pantyukh from '../../../assets/images/landing/teamcard/TeamColor-assets/Valentin.png';
import img_developer_yuri_faktorovich from '../../../assets/images/landing/teamcard/TeamColor-assets/yuri.png';
import img_developer_sindre_borresen from '../../../assets/images/landing/teamcard/TeamColor-assets/Sindre.png';
import img_developer_andrey_ashirov from '../../../assets/images/landing/teamcard/TeamColor-assets/AndreyAshirof.png';

class Landing extends React.Component {
  constructor(props) {
    super(props);

    // Set initial state.
    this.state = {
      goalTime: moment('2018-04-10T14:00:00Z'),
      is_menu_open: false
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
  }

  toggleMenu() {
    this.setState({
      is_menu_open: !this.state.is_menu_open
    });
  }

  handleNavClick(target) {
    $('html, body').stop().animate({
      'scrollTop': document.getElementById(target).offsetTop - 50
    }, 500, 'swing');
  }

  componentDidMount() {
    // Initialize Scroll Magic
    // this.scroll_controller = new ScrollMagic.Controller();
    // setTimeout(() => {
    //   new ScrollMagic.Scene({
    //     triggerElement: '#section-offering',
    //     triggerHook: 0.1,
    //     duration: document.getElementById('section-offering').clientHeight
    //   })
    //     .setClassToggle('#nav-offering', 'active')
    //     .addTo(this.scroll_controller);
    //   new ScrollMagic.Scene({
    //     triggerElement: '#section-thegame',
    //     triggerHook: 0.1,
    //     duration: document.getElementById('section-thegame').clientHeight
    //   })
    //     .setClassToggle('#nav-thegame', 'active')
    //     .addTo(this.scroll_controller);
    //   new ScrollMagic.Scene({
    //     triggerElement: '#section-team',
    //     triggerHook: 0.1,
    //     duration: document.getElementById('section-team').clientHeight
    //   })
    //     .setClassToggle('#nav-theteam', 'active')
    //     .addTo(this.scroll_controller);
    //
    //   let tween = TweenMax.to('#ship', 1, { className: 'ship-advance' });
    //   new ScrollMagic.Scene({
    //     triggerElement: '#section-thegame-id',
    //     triggerHook: 0,
    //     duration: document.getElementById('section-thegame-id').clientHeight
    //   })
    //     .setTween(tween)
    //     .addTo(this.scroll_controller);
    //
    //   new ScrollMagic.Scene({
    //     triggerElement: '#section-roadmap',
    //     triggerHook: 0.1,
    //     duration: document.getElementById('section-roadmap').clientHeight
    //   })
    //     .setClassToggle('#nav-roadmap', 'active')
    //     .addTo(this.scroll_controller);
    //   new ScrollMagic.Scene({
    //     triggerElement: '#section-whitepaper',
    //     triggerHook: 0.1,
    //     duration: document.getElementById('section-whitepaper').clientHeight
    //   })
    //     .setClassToggle('#nav-whitepaper', 'active')
    //     .addTo(this.scroll_controller);
    //   new ScrollMagic.Scene({
    //     triggerElement: '#section-contact',
    //     triggerHook: 0.1,
    //     duration: document.getElementById('section-contact').clientHeight
    //   })
    //     .setClassToggle('#nav-contact', 'active')
    //     .addTo(this.scroll_controller);
    // }, 0);

    // Initialize FullPage js
    const anchors = [
      'section-offering',
      'section-thegame',
      'section-tokenallocation',
//    'section-partners',
      'section-team',
      'section-roadmap'
    ];
    setTimeout(() => {
      $('#fullpage').fullpage({
        anchors,
        scrollOverflow: true,
        scrollOverflowReset: true,
        autoScrolling: true,
        bigSectionsDestination: null,
        dragAndMove: 'fingersonly',
        slidesNavigation: true,
        onLeave: function (index, nextIndex) {
          $('.stars-background-wrapper').css('display', 'none');

          $('[data-anchor="' + anchors[nextIndex - 1] + '"] .stars-background-wrapper')
            .css('display', 'block');
        },
        afterLoad: function (anchor) {
          $('.nav-item').removeClass('active');

          $('[data-menuanchor="' + anchor + '"]')
            .addClass('active');

          if (anchor === 'section-thegame') {
            $('#ship').css('transition', 'ease-out 10s');
            $('#ship').addClass('ship-advance');
          } else {
            $('#ship').css('transition', '0s');
            $('#ship').removeClass('ship-advance');
          }
        }
      });
    }, 0);

    // Initialize Stars
    window.particlesJS('stars-particle-1', LANDING_PARTICLE_SETTING);
    window.particlesJS('stars-particle-2', LANDING_PARTICLE_SETTING);
    window.particlesJS('stars-particle-3', LANDING_PARTICLE_SETTING);
    // window.particlesJS('stars-particle-4', LANDING_PARTICLE_SETTING);
    // window.particlesJS('stars-particle-5', LANDING_PARTICLE_SETTING);
    window.particlesJS('stars-particle-6', LANDING_PARTICLE_SETTING);

    $('.stars-background-wrapper').css('display', 'none');

    $('[data-anchor="section-offering"] .stars-background-wrapper')
      .css('display', 'block');

    // Initialize Parallax
    this.parallax_controller = [];
    let scenes = document.getElementsByClassName('stars-parallax');
    for (let i = 0; i < scenes.length; i++) {
      this.parallax_controller.push(new Parallax(scenes[i], {
        frictionX: 0.01,
        frictionY: 0.01,
        scalarX: 10,
        scalarY: 10
      }));
    }

    // Resize handle
    this.window_width = $(window).width();
    this.window_height = $(window).height();
    this.is_mobile = this.window_width <= 992;

    $(window).resize(() => {
      let new_width = $(window).width();
      let new_height = $(window).height();
      if (this.window_width !== new_width || this.window_height !== new_height) {
        if ((this.is_mobile && new_width > 992) || (!this.is_mobile && new_width <= 992)) {
          location.reload();
        }
      }
    });
  }

  render() {
    const { is_menu_open } = this.state;
    return (
      <div className="layout">
        <div className="main-layout landing-layout">
          {/*Header*/}
          <div className="header">
            {/*Navigation Bar*/}
            <div className="nav">
              <div className="nav-up">
                <div className="container flex-row">
                  <div className="lang-selector">
                    {/*<img src={img_lang_en} className="img-flag"/>*/}
                  </div>
                </div>
              </div>
              <div className="nav-down">
                <div className="container flex-row">
                  <a href="#section-offering" data-menuanchor="section-offering">
                    <img className="nav-logo" src={img_logo}/>
                  </a>
                  {/*Mobile Only nav open*/}
                  <div className="nav-menu-btn" onClick={this.toggleMenu}>
                    <div id="hamburger" className={"hamburglar" + (is_menu_open ? ' is-open' : ' is-closed')}>
                      <div className="burger-icon">
                        <div className="burger-container">
                          <span className="burger-bun-top"/>
                          <span className="burger-filling"/>
                          <span className="burger-bun-bot"/>
                        </div>
                      </div>
                      <div className="burger-ring">
                        <svg className="svg-ring">
                          <path className="path" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="4"
                                d="M 34 2 C 16.3 2 2 16.3 2 34 s 14.3 32 32 32 s 32 -14.3 32 -32 S 51.7 2 34 2"/>
                        </svg>
                      </div>
                      <svg width="0" height="0">
                        <mask id="mask">
                          <path xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#ff0000" strokeMiterlimit="10"
                                strokeWidth="4" d="M 34 2 c 11.6 0 21.8 6.2 27.4 15.5 c 2.9 4.8 5 16.5 -9.4 16.5 h -4"/>
                        </mask>
                      </svg>
                      <div className="path-burger">
                        <div className="animate-path">
                          <div className="path-rotation"/>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*Navigation Items*/}
                  <ul className={"nav-items" + (is_menu_open ? ' open' : '')}>
                    <li className="nav-item" id="nav-thegame" data-menuanchor="section-thegame">
                      <img className="nav-glow-up" src={img_nav_glow_up}/>
                      <a href="#section-thegame">
                        Game
                      </a>
                      <img className="nav-glow-down" src={img_nav_glow_down}/>
                    </li>
                    <li className="nav-item" id="nav-tokenallocation" data-menuanchor="section-tokenallocation">
                      <img className="nav-glow-up" src={img_nav_glow_up}/>
                      <a href="#section-tokenallocation">
                        Tokens
                      </a>
                      <img className="nav-glow-down" src={img_nav_glow_down}/>
                    </li>
                    <li className="nav-item" id="nav-theteam" data-menuanchor="section-team">
                      <img className="nav-glow-up" src={img_nav_glow_up}/>
                      <a href="#section-team">
                        Team
                      </a>
                      <img className="nav-glow-down" src={img_nav_glow_down}/>
                    </li>
                    <li className="nav-item" id="nav-roadmap" data-menuanchor="section-roadmap">
                      <img className="nav-glow-up" src={img_nav_glow_up}/>
                      <a href="#section-roadmap">
                        Roadmap
                      </a>
                      <img className="nav-glow-down" src={img_nav_glow_down}/>
                    </li>
                    {/*<li className="nav-item" id="nav-whitepaper" data-menuanchor="section-whitepaper">*/}
                      {/*<img className="nav-glow-up" src={img_nav_glow_up}/>*/}
                      {/*<a href="#section-whitepaper">*/}
                        {/*Whitepaper*/}
                      {/*</a>*/}
                      {/*<img className="nav-glow-down" src={img_nav_glow_down}/>*/}
                    {/*</li>*/}
                    <li className="nav-item" id="nav-blog">
                      <img className="nav-glow-up" src={img_nav_glow_up}/>
                      <a href="https://medium.com/parsec-frontiers" target="_blank" rel="noopener noreferrer">
                        Blog
                      </a>
                      <img className="nav-glow-down" src={img_nav_glow_down}/>
                    </li>
                    <li className="nav-item" id="nav-faq">
                      <img className="nav-glow-up" src={img_nav_glow_up}/>
                      <a href="https://faq.parsecfrontiers.com" target="_blank" rel="noopener noreferrer">
                        FAQ
                      </a>
                      <img className="nav-glow-down" src={img_nav_glow_down}/>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/*End Header*/}
          {/*Page Content*/}
          <div className="content">
            <div className="page" id="fullpage">
              {/*Section Offering*/}
              <div className="section" data-anchor="section-offering">
                <div className="section-offering" id="section-offering-id">
                  <div className="container flex-column">
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 offering-description">
                        <h1>
                          Next generation blockchain gaming
                        </h1>
                        <p>
                          Parsec Frontiers is a deep and feature-rich space MMO experience built from the ground up with blockchain in mind, where players are free to explore and conquer the whole galaxy. Built with the players - owned by the players, changing the way computer games are funded and developed.
                        </p>
                        <div className="fancybox-video">
                          <div className="video-parsec">
                            <div className="overlay" onClick={(e) => {
                              e.target.style.pointerEvents = 'none'
                            }}></div>
                            <iframe src="https://player.vimeo.com/video/262205493" frameBorder="0"
                                    webkitallowfullscreen="" mozallowfullscreen="" allowFullScreen></iframe>
                          </div>
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 offering-status">
                        {/*<img src={img_coin} className="coin"/>*/}
                        {/*Sale Status*/}
                        <FancyBox>
                          {/*<div className="offering-status-box">
                            <img className="logo-status" src={img_logo_status}/>
                            <h2 className="slogan">
                              CROWDSALE COMING SOON
                            </h2>
                            <span className="status-price">
                              1 PRSC = 20 ETH
                            </span>
                            <span className="status-cap">
                              700 PRSC / 7000 PRSC
                            </span>
                            <span className="status-bonus">
                              40% Bonus Token Right Now!
                            </span>
                            <ProgressBar className="status-progress" value={50}/>
                            <span className="status-softcap">
                              Soft Cap = 0000001 PRSC
                            </span>
                            <span className="status-hardcap">
                              Hard Cap = 0000001 PRSC
                            </span>
                            <h3 className="slogan-2">
                              CROWDSALE STARTS IN
                            </h3>

                            <CountDownTimer goalTime={this.state.goalTime} style={{
                              width: 'calc(100% + 55px)',
                              paddingLeft: '25px',
                              paddingRight: '25px',
                              marginBottom: '16px'
                            }}/>
                          </div>*/}
                          <div className="offering-status-box">
                            <h2 className="slogan-v2">
                              REGISTER NOW
                            </h2>
                            <span className="label-v2">
                              FOR A CHANCE TO TAKE PART IN THE
                            </span>
                            <h2 className="slogan-v2-sale">
                              CROWDSALE
                            </h2>
                            <div className="row row-signup">
                              <div className="col-sm-12 col-md-12 col-lg-6 flex-column offering-signup-div">
                                <span className="signup-label">
                                  Sign Up
                                </span>
                                <input className="offering-input" placeholder="E-MAIL"/>
                                <input className="offering-input" placeholder="PASSWORD" type="password"/>
                                <button className="offering-button register-button">
                                  REGISTER
                                </button>
                              </div>
                              <div className="col-sm-12 col-md-12 col-lg-6 offering-login-div">
                                <span className="login-label">
                                  Already have an account?
                                </span>
                                <br/>
                                <a href="#" className="login-link">
                                  Sign In here.
                                </a>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-12 col-md-12 col-lg-12">
                                <h3 className="timer-label">
                                  CROWDSALE STARTS IN:
                                </h3>
                              </div>
                            </div>
                            <CountDownTimer goalTime={this.state.goalTime} style={{
                              width: 'calc(100% + 55px)',
                              paddingLeft: '25px',
                              paddingRight: '25px',
                              marginBottom: '16px'
                            }}/>

                            {/*<div className="row">*/}
                            {/*<div className="col-sm-12 col-md-12 col-lg-12">*/}
                            {/*<h3 className="subscribe-label">*/}
                            {/*SUBSCRIBE TO OUR MAILING LIST*/}
                            {/*</h3>*/}
                            {/*</div>*/}
                            {/*</div>*/}

                            {/*<div className="row">*/}
                            {/*<div className="col-sm-12 col-md 7">*/}
                            {/*<input className="offering-input" placeholder="YOUR E-MAIL"/>*/}
                            {/*</div>*/}
                            {/*<div className="col-sm-12 col-md-5">*/}
                            {/*<button className="offering-button">*/}
                            {/*SUBSCRIBE*/}
                            {/*</button>*/}
                            {/*</div>*/}
                            {/*</div>*/}

                            <div className="social-buttons">
                              <a href="https://www.facebook.com/ParsecFrontiers/" target="_blank"
                                 rel="noopener noreferrer">
                                <img src={img_social_facebook}/>
                              </a>
                              <a href="https://twitter.com/parsecfrontiers" target="_blank" rel="noopener noreferrer">
                                <img src={img_social_twitter}/>
                              </a>
                              <a href="https://discord.gg/wpWQgUP" target="_blank" rel="noopener noreferrer">
                                <img src={img_social_discord}/>
                              </a>
                              <a href="https://t.me/ParsecFrontiers" target="_blank" rel="noopener noreferrer">
                                <img src={img_social_telegram}/>
                              </a>
                            </div>
                          </div>
                        </FancyBox>
                        {/*End Sale Status*/}
                      </div>
                    </div>
                  </div>
                  <div className="scrolldown" style={{ bottom: '75px', left: '50%' }}>
                    <a href="#section-thegame">
                      <img src={img_scrolldown} className="scrolldown-1"/>
                      <img src={img_scrolldown} className="scrolldown-2"/>
                      <img src={img_scrolldown} className="scrolldown-3"/>
                    </a>
                  </div>
                  <div className="stars-background-wrapper">
                    {/*<div className="stars-overlay"/>*/}
                    <div className="scene stars-parallax">
                      <div data-depth="0.2" className="layer stars-1"/>
                      {/*<div data-depth="0.2" className="layer twinkling"/>*/}
                      <div data-depth="0.4" className="layer stars-2"/>
                      <div data-depth="0.6" className="layer stars-particle" id="stars-particle-1"/>
                    </div>
                  </div>
                </div>
              </div>
              {/*End Section Offering*/}
              {/*Section The Game*/}
              <div className="section" data-anchor="section-thegame">
                <div className="section-thegame" id="section-thegame-id">
                  <div className="container flex-column" style={{ zIndex: 2 }}>
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-7">
                        <div className="backstory-box">
                          <FancyBox style={{ zIndex: 2 }}>
                            <div className="backstory-content">
                              <h1>
                                About the game
                              </h1>
                              <p>
                                Parsec Frontiers is an online game about humanity’s colonization of the stars and
                                planets in the Milky Way. Starting from Earth, the actions of the players will shape the
                                future of the galaxy, as well as forge their own destiny.
                              </p>
                              <p>
                                With a persistent game universe and time line the race is on to explore, expand and
                                exploit the riches to be found in other star systems.
                              </p>
                              <p>
                                A fully player driven economy, backed by blockchain technology, will allow players to
                                mine and refine rare elements, build advanced starships and defense systems and buy and
                                trade resources at a profit on the planetary exchanges.
                              </p>
                              <p>
                                Everything is tradeable, anything is possible!
                              </p>
                            </div>
                          </FancyBox>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="scrolldown" style={{ bottom: '75px', right: '30%' }}>
                    <a href="#section-tokenallocation">
                      <img src={img_scrolldown} className="scrolldown-1"/>
                      <img src={img_scrolldown} className="scrolldown-2"/>
                      <img src={img_scrolldown} className="scrolldown-3"/>
                    </a>
                  </div>
                  <img src={img_ship_resize} className="ship" id="ship"/>
                  <div className="stars-background-wrapper">
                    {/*<div className="stars-overlay"/>*/}
                    <div className="scene stars-parallax">
                      <div data-depth="0.2" className="layer stars-1"/>
                      {/*<div data-depth="0.2" className="layer twinkling"/>*/}
                      <div data-depth="0.4" className="layer stars-2"/>
                      <div data-depth="0.6" className="layer stars-particle" id="stars-particle-2"/>
                    </div>
                  </div>
                </div>
              </div>
              {/*End Section The Game*/}
              {/*Section Token Allocation*/}
              <div className="section" data-anchor="section-tokenallocation">
                <div className="section-tokenallocation">
                  <div className="container flex-column">
                    <div className="token-allocation">
                      <h1>
                        Token Allocation
                      </h1>
                      <div className="token-sun">
                        <div className="token-sun-labels">
                          <div className="sun-label">
                            <span className="sun-label-percent">70%</span>
                            <div className="sun-label-text">
                              <span className="sun-label-text-big">Pre-Sale + Crowd Sales</span>
                              <span className="sun-label-text-small"/>
                            </div>
                          </div>
                          <div className="sun-label">
                            <span className="sun-label-percent">10%</span>
                            <div className="sun-label-text">
                              <span className="sun-label-text-big">Developers</span>
                              <span className="sun-label-text-small"/>
                            </div>
                          </div>
                          <div className="sun-label">
                            <span className="sun-label-percent">10%</span>
                            <div className="sun-label-text">
                              <span className="sun-label-text-big">Advisors & partners</span>
                              <span className="sun-label-text-small"/>
                            </div>
                          </div>
                          <div className="sun-label">
                            <span className="sun-label-percent">5%</span>
                            <div className="sun-label-text">
                              <span className="sun-label-text-big">Bounty</span>
                              <span className="sun-label-text-small"/>
                            </div>
                          </div>
                          <div className="sun-label">
                            <span className="sun-label-percent">4%</span>
                            <div className="sun-label-text">
                              <span className="sun-label-text-big">Buffer to foundation</span>
                              <span className="sun-label-text-small"/>
                            </div>
                          </div>
                          <div className="sun-label">
                            <span className="sun-label-percent">1%</span>
                            <div className="sun-label-text">
                              <span className="sun-label-text-big">Airdrop</span>
                              <span className="sun-label-text-small"/>
                            </div>
                          </div>
                        </div>
                        <img src={img_sun} className="img-sun"/>
                        <img src={img_sun_1_outer_glow_1} className="img-sun img-sun-1-outer-glow-1"/>
                        <img src={img_sun_2_flame_1} className="img-sun img-sun-2-flame-1"/>
                        <img src={img_sun_3_flame_2} className="img-sun img-sun-3-flame-2"/>
                        <img src={img_sun_4_core} className="img-sun img-sun-4-core"/>
                        <img src={img_sun_5_inner_glow} className="img-sun img-sun-5-inner-glow"/>
                      </div>
                    </div>
                    <div className="use-of-proceeds">
                      <h1>
                        Use of Proceeds
                      </h1>
                      <div className="use-of-token">
                        <div className="use-of-token-top">
                          <div className="use-of-token-top-label">
                            <span>Min Cap</span>
                            <span>Hard Cap</span>
                          </div>
                          <div className="use-of-token-graph">
                            <img src={img_use_of_proceeds}/>
                            <div className="use-of-token-bottom">
                              <div className="label-horizontal">
                                <div className="color-icon" style={{ backgroundColor: '#763e6d' }}/>
                                <span>
                                  Development
                                </span>
                              </div>
                              <div className="label-horizontal">
                                <div className="color-icon" style={{ backgroundColor: '#7c7dae' }}/>
                                <span>
                                  Marketing & growth
                                </span>
                              </div>
                              <div className="label-horizontal">
                                <div className="color-icon" style={{ backgroundColor: '#b7ddff' }}/>
                                <span>
                                  Other
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="stars-background-wrapper">
                    {/*<div className="stars-overlay"/>*/}
                    <div className="scene stars-parallax">
                      <div data-depth="0.2" className="layer stars-1"/>
                      {/*<div data-depth="0.2" className="layer twinkling"/>*/}
                      <div data-depth="0.4" className="layer stars-2"/>
                      <div data-depth="0.6" className="layer stars-particle" id="stars-particle-3"/>
                    </div>
                  </div>
                </div>
              </div>
              {/*End Section Token Allocation*/}
              {/*Section Partners*/}
              {/*<div className="section" data-anchor="section-partners">*/}
              {/*<div className="section-partners">*/}
              {/*<div className="container flex-column">*/}
              {/*<div className="row">*/}
              {/*<div className="col-xs-12">*/}
              {/*<h1>*/}
              {/*Partners*/}
              {/*</h1>*/}
              {/*</div>*/}
              {/*</div>*/}
              {/*<div className="partners">*/}
              {/*<div className="partner">*/}
              {/*<img src={img_partner_1}/>*/}
              {/*</div>*/}
              {/*<div className="partner">*/}
              {/*<img src={img_partner_2}/>*/}
              {/*</div>*/}
              {/*<div className="partner">*/}
              {/*<img src={img_partner_3}/>*/}
              {/*</div>*/}
              {/*<div className="partner">*/}
              {/*<img src={img_partner_4}/>*/}
              {/*</div>*/}
              {/*<div className="partner">*/}
              {/*<img src={img_partner_2}/>*/}
              {/*</div>*/}
              {/*<div className="partner">*/}
              {/*<img src={img_partner_1}/>*/}
              {/*</div>*/}
              {/*<div className="partner">*/}
              {/*<img src={img_partner_2}/>*/}
              {/*</div>*/}
              {/*<div className="partner">*/}
              {/*<img src={img_partner_3}/>*/}
              {/*</div>*/}
              {/*<div className="partner">*/}
              {/*<img src={img_partner_4}/>*/}
              {/*</div>*/}
              {/*<div className="partner">*/}
              {/*<img src={img_partner_2}/>*/}
              {/*</div>*/}
              {/*<div className="partner">*/}
              {/*<img src={img_partner_1}/>*/}
              {/*</div>*/}
              {/*<div className="partner">*/}
              {/*<img src={img_partner_2}/>*/}
              {/*</div>*/}
              {/*<div className="partner">*/}
              {/*<img src={img_partner_3}/>*/}
              {/*</div>*/}
              {/*<div className="partner">*/}
              {/*<img src={img_partner_4}/>*/}
              {/*</div>*/}
              {/*<div className="partner">*/}
              {/*<img src={img_partner_2}/>*/}
              {/*</div>*/}
              {/*<div className="partner">*/}
              {/*<img src={img_partner_1}/>*/}
              {/*</div>*/}
              {/*<div className="partner">*/}
              {/*<img src={img_partner_2}/>*/}
              {/*</div>*/}
              {/*<div className="partner">*/}
              {/*<img src={img_partner_3}/>*/}
              {/*</div>*/}
              {/*<div className="partner">*/}
              {/*<img src={img_partner_4}/>*/}
              {/*</div>*/}
              {/*<div className="partner">*/}
              {/*<img src={img_partner_2}/>*/}
              {/*</div>*/}
              {/*<div className="partner">*/}
              {/*<img src={img_partner_1}/>*/}
              {/*</div>*/}
              {/*<div className="partner">*/}
              {/*<img src={img_partner_2}/>*/}
              {/*</div>*/}
              {/*<div className="partner">*/}
              {/*<img src={img_partner_3}/>*/}
              {/*</div>*/}
              {/*<div className="partner">*/}
              {/*<img src={img_partner_4}/>*/}
              {/*</div>*/}
              {/*<div className="partner">*/}
              {/*<img src={img_partner_2}/>*/}
              {/*</div>*/}
              {/*</div>*/}
              {/*</div>*/}
              {/*<div className="stars-background-wrapper">*/}
              {/*/!*<div className="stars-overlay"/>*!/*/}
              {/*<div className="scene stars-parallax">*/}
              {/*<div data-depth="0.2" className="layer stars-1"/>*/}
              {/*/!*<div data-depth="0.2" className="layer twinkling"/>*!/*/}
              {/*<div data-depth="0.4" className="layer stars-2"/>*/}
              {/*<div data-depth="0.6" className="layer stars-particle" id="stars-particle-4"/>*/}
              {/*</div>*/}
              {/*</div>*/}
              {/*</div>*/}
              {/*</div>*/}
              {/*End Section Partners*/}
              {/*Section Team*/}
              <div className="section fp-auto-height-responsive" data-anchor="section-team">
                <div className="slide" id="slide-leader">
                  <div className="section-team">
                    <div className="container flex-column">
                      <div className="row">
                        <div className="col-xs-12">
                          <h1>
                            Management
                          </h1>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-4">
                          <TeamCard
                            name="HENNING ROKLING"
                            title="PROJECT FOUNDER"
                            description="Henning has a background from the C64 demo scene, working at Funcom before co-founding game developer Innerloop Studios where he was CEO. An entrepreneur with a passion for games, Henning has also consulted with some of the largest organizations in Norway."
                            photo={img_leader_henning}
                            linkFb="#"
                            linkTw="https://twitter.com/hrokling"
                            linkIn="https://www.linkedin.com/in/hrokling"
                          />
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4">
                          <TeamCard
                            name="ANDREY TSIRULEV"
                            title="TECHNICAL DIRECTOR"
                            description="Andrey joined Artplant in 2008, supervising the programmers and technology development, as well as working as Lead Programmer on some of the largest projects in the company. Andrey is an expert at creating robust and scalable systems, and a big reason why Artplant has been labeled masters of online game production. He has a Master's Degree in Magnetic Physics from Tver State University."
                            photo={img_leader_andrey}
                            linkFb="#"
                            linkTw="#"
                            linkIn="https://www.linkedin.com/in/andrey-tsirulev-3041a435"
                          />
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4">
                          <TeamCard
                            name="JACK K. WULFF"
                            title="CEO, ARTPLANT"
                            description="Jack co-founded Artplant, and has worked as a game developer continuously for 24 years. For the last 15 years he has been an Executive Producer, making sure that projects get completed on time, and make the most out of their development budget."
                            photo={img_leader_jack}
                            linkFb="#"
                            linkTw="https://twitter.com/wulffjack"
                            linkIn="https://www.linkedin.com/in/jack-kristoffersen-5b83181"
                          />
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4">
                          <TeamCard
                            name="TROND JOHANSEN"
                            title="PRODUCER"
                            description="Trond has been a core Game Designer and Producer at Artplant since 2006, working on titles such as Block N Load and Battlestar Galactica Online. Trond leads the production of Parsec Frontiers, making sure that the planning is solid, and that the development progresses as planned."
                            photo={img_leader_trond}
                            linkFb="#"
                            linkTw="#"
                            linkIn="https://www.linkedin.com/in/trond-vidar-johansen-835b1b12"
                          />
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4">
                          <TeamCard
                            name="MORTEN LARSSEN"
                            title="VP PUBLISHING"
                            description="Morten is an experienced gaming industry executive with a passion for the business side of the games industry. He has launched and marketed games both locally and internationally for more than 25 years, most recently as Senior Vice President, Sales and Marketing with Funcom in Oslo for almost ten years."
                            photo={img_leader_morten}
                            linkFb="#"
                            linkTw="https://twitter.com/MSLarssen"
                            linkIn="https://www.linkedin.com/in/morten-larssen-565a5"
                          />
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4">
                          <TeamCard
                            name="MAXIM PUSHKAR"
                            title="TOOLS AND R&D LEAD"
                            description="Maxim joined Artplant 8 years ago and has extensive backend experience, including core server engine and many in-house tools. He has extensive blockchain and smart contract expertise and is the lead on all blockchain development at Artplant. He has a PhD in Computational and Theoretical Physics from Tver State University."
                            photo={img_leader_max}
                            linkFb="#"
                            linkTw="#"
                            linkIn="https://www.linkedin.com/in/maxim-pushkar-19405532"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="slide" id="slide-advisors">
                  <div className="section-team">
                    <div className="container flex-column">
                      <div className="row">
                        <div className="col-xs-12">
                          <h1>
                            Advisors
                          </h1>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-4">
                          <TeamCard
                            name="ØYVIND PEDERSEN JR."
                            title="BLOCKCHAIN STRATEGIST"
                            description="Øyvind has been involved in the blockchain community since 2012, and has a background from telecom. He was part of establishing the content platform Hubii Network. His help and advice has helped transition Artplant from an online gaming expert, to a blockchain gaming company."
                            photo={img_advisor_oyvind}
                            linkFb="#"
                            linkTw="https://twitter.com/oyvindp"
                            linkIn="https://www.linkedin.com/in/oyvindpedersenjr"
                          />
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4">
                          <TeamCard
                            name="FRODE ASCHIM"
                            title="CEO, ETHER CAPITAL LTD"
                            description="With 25 years of experience in the financial and technology markets, as a previous hedge fund manager and influential investor, Frode is now the CEO of Ether Capital Ltd. and is active in the development of- and investment in blockchain technology. He's been an early investor in many high-profile blockchain projects."
                            photo={img_advisor_frodeaschim}
                            linkFb="#"
                            linkTw="#"
                            linkIn="https://www.linkedin.com/in/frode-aschim-9936a912"
                          />
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4">
                          <TeamCard
                            name="KENNETH ERIKSEN"
                            title="DIGITAL MARKETING EXECUTIVE"
                            description="As the CEO of IAB Norway - INMA - Kenneth is an experienced digital marketer, web analyst and a prominent speaker on technology."
                            photo={img_advisor_kennetheriksen}
                            linkFb="#"
                            linkTw="#"
                            linkIn="#"
                          />
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4">
                          <TeamCard
                            name="JOHN KAVANAGH"
                            title="GAMES INDUSTRY EXECUTIVE"
                            description="John is an accomplished industry executive with a video game career of nearly 35 years as he started designing, developing and licensing games and technology to Sega, Nintendo, Apple, Atari, Commodore and Broderbund. He’s since worked at Eidos, Crystal Dynamics and Paramount Pictures."
                            photo={img_advisor_john}
                            linkFb="#"
                            linkTw="#"
                            linkIn="https://www.linkedin.com/in/jklinkedin"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="slide" id="slide-developers">
                  <div className="section-team">
                    <div className="container flex-column">
                      <div className="row">
                        <div className="col-xs-12">
                          <h1>
                            Development team
                          </h1>
                        </div>
                      </div>
                      <div className="row">

                        <div className="col-xs-12 col-sm-6 col-md-3">
                          <div className="team-member">
                            <HexagonAvatar src={img_developer_ilya_chubarov} className="avatar"/>
                            <h3>Ilja Chubarov</h3>
                            <p>Lead client programmer</p>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                          <div className="team-member">
                            <HexagonAvatar src={img_developer_alexey_antropov} className="avatar"/>
                            <h3>Alexey Antropov</h3>
                            <p>Visual effects programmer</p>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                          <div className="team-member">
                            <HexagonAvatar src={img_developer_anatoly_shorin} className="avatar"/>
                            <h3>Anatoly Shorin</h3>
                            <p>Gameplay programmer</p>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                          <div className="team-member">
                            <HexagonAvatar src={img_developer_max_kashubo} className="avatar"/>
                            <h3>Max Kashubo</h3>
                            <p>Gameplay programmer</p>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                          <div className="team-member">
                            <HexagonAvatar src={img_developer_peter_rocchio} className="avatar"/>
                            <h3>Peter Rocchio</h3>
                            <p>Lead game designer</p>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                          <div className="team-member">
                            <HexagonAvatar src={img_developer_karstein_ersdal} className="avatar"/>
                            <h3>Karstein R Ersdal</h3>
                            <p>Game designer</p>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                          <div className="team-member">
                            <HexagonAvatar src={img_developer_olivier_chateau} className="avatar"/>
                            <h3>Olivier Chateau</h3>
                            <p>Game designer</p>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                          <div className="team-member">
                            <HexagonAvatar src={img_developer_aleksander_larsen} className="avatar"/>
                            <h3>Aleksander L Larsen</h3>
                            <p>Community manager</p>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                          <div className="team-member">
                            <HexagonAvatar src={img_developer_daniel_stakhovskiy} className="avatar"/>
                            <h3>Daniel Stakhovskiy</h3>
                            <p>MD Artplant Russia</p>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                          <div className="team-member">
                            <HexagonAvatar src={img_developer_ivan_koren} className="avatar"/>
                            <h3>Ivan Koren</h3>
                            <p>Lead artist</p>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                          <div className="team-member">
                            <HexagonAvatar src={img_developer_joachim_barrum} className="avatar"/>
                            <h3>Joachim Barrum</h3>
                            <p>Art director</p>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                          <div className="team-member">
                            <HexagonAvatar src={img_developer_daria_rodionova} className="avatar"/>
                            <h3>Daria Rodionova</h3>
                            <p>UX artist</p>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                          <div className="team-member">
                            <HexagonAvatar src={img_developer_valerii_kriazhev} className="avatar"/>
                            <h3>Valerii Kriazhev</h3>
                            <p>3D artist</p>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                          <div className="team-member">
                            <HexagonAvatar src={img_developer_alexey_suvorov} className="avatar"/>
                            <h3>Alexey Suvorov</h3>
                            <p>3D artist</p>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                          <div className="team-member">
                            <HexagonAvatar src={img_developer_valentin_pantyukh} className="avatar"/>
                            <h3>Valentin Pantyukh</h3>
                            <p>3D artist</p>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                          <div className="team-member">
                            <HexagonAvatar src={img_developer_yuri_faktorovich} className="avatar"/>
                            <h3>Yuri Faktorovich</h3>
                            <p>3D artist</p>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                          <div className="team-member">
                            <HexagonAvatar src={img_developer_sindre_borresen} className="avatar"/>
                            <h3>Sindre Børresen</h3>
                            <p>Animator</p>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                          <div className="team-member">
                            <HexagonAvatar src={img_developer_andrey_ashirov} className="avatar"/>
                            <h3>Andrey Ashirov</h3>
                            <p>System administrator</p>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*End Section Team*/}
              {/*Section RoadMap*/}
              <div className="section" data-anchor="section-roadmap">
                <div className="section-roadmap">
                  <div className="container flex-column">
                    <h1>
                      Roadmap
                    </h1>
                    <div className="roadmap-xl">
                      <div className="roadmap-xl-steps">
                        <RoadmapXlStep
                          iconX="6.3%" iconY="5.4%" textX="-1%" textY="12.5%"
                          isFill={true} isActive={false}
                          title="June 2017"
                          description="The Parsec Frontiers concept created"
                        />
                        <RoadmapXlStep
                          iconX="25.2%" iconY="21.5%" textX="18%" textY="28%"
                          isFill={true} isActive={false}
                          title="August 2017"
                          description="Team and Advisors assembled"
                        />
                        <RoadmapXlStep
                          iconX="47%" iconY="10%" textX="40.6%" textY="-8%"
                          isFill={true} isActive={false}
                          title="December 2017"
                          description="Public announcement of project and release of white paper"
                        />
                        <RoadmapXlStep
                          iconX="71%" iconY="17.5%" textX="76%" textY="13%"
                          isFill={true} isActive={false}
                          title="January 2018"
                          description="Successfully completed Pre-sale"
                        />
                        <RoadmapXlStep
                          iconX="46%" iconY="44%" textX="51%" textY="39%"
                          isFill={false} isActive={true}
                          title="April 2018"
                          description="Detailed game design, technical design shared with community, Crowd sale starts"
                        />
                        <RoadmapXlStep
                          iconX="14%" iconY="57%" textX="0%" textY="62.5%"
                          isFill={false} isActive={false}
                          title="May 2018"
                          description="Parsec Credits distributed. Auction for starership opens"
                        />
                        <RoadmapXlStep
                          iconX="34.5%" iconY="90%" textX="19%" textY="91.5%"
                          isFill={false} isActive={false}
                          title="July 2018"
                          description="Auctions for colony rights on 17 initial habitable planets"
                        />
                        <RoadmapXlStep
                          iconX="59%" iconY="64%" textX="36%" textY="65%"
                          isFill={false} isActive={false}
                          title="December 2018"
                          description="Release of Travel module allowing for exploration and transport of surviving humans"
                        />
                        <RoadmapXlStep
                          iconX="76.4%" iconY="87.8%" textX="54.3%" textY="89.4%"
                          isFill={false} isActive={false}
                          title="Feburary 2019"
                          description="Resource extraction/production released, interstellar trade exchanges opened"
                        />
                        <RoadmapXlStep
                          iconX="93%" iconY="66.5%" textX="83.8%" textY="73.7%"
                          isFill={false} isActive={false}
                          title="May 2019"
                          description="Crafting feature and ability to upgrade colonies implemented"
                        />
                        <RoadmapXlStep
                          iconX="85%" iconY="41%" textX="76%" textY="47.5%"
                          isFill={false} isActive={false}
                          title="December 2019"
                          description="End of the 'non-aggression pact', combat introduce to the game"
                        />
                      </div>
                      <img src={img_roadmap} className="img-roadmap"/>
                    </div>
                  </div>
                  <div className="stars-background-wrapper">
                    {/*<div className="stars-overlay"/>*/}
                    <div className="scene stars-parallax">
                      <div data-depth="0.2" className="layer stars-1"/>
                      {/*<div data-depth="0.2" className="layer twinkling"/>*/}
                      <div data-depth="0.4" className="layer stars-2"/>
                      <div data-depth="0.6" className="layer stars-particle" id="stars-particle-6"/>
                    </div>
                  </div>
                </div>
              </div>
              {/*End Section RoadMap*/}
              {/*Section WhitePaper*/}
              {/*<div className="section fp-auto-height" data-anchor="section-whitepaper">*/}
                {/*<div className="section-whitepaper">*/}
                {/*<div className="row flex-row">*/}
                {/*<div className="col-xs-2 col-sm-3 div-wp-ribbon">*/}
                {/*<img src={img_wp_ribbon_left} className="wp-ribbon-left"/>*/}
                {/*</div>*/}
                {/*<div className="col-xs-12 col-sm-6 div-wp-text">*/}
                {/*<div className="row">*/}
                {/*<div className="col-xs-12 col-sm-8 col-md-6">*/}
                {/*<h1>Whitepaper</h1>*/}
                {/*<p>*/}
                {/*Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt*/}
                {/*ut*/}
                {/*labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco*/}
                {/*laboris nisi ut*/}
                {/*</p>*/}
                {/*</div>*/}
                {/*<div className="col-xs-12 col-sm-4 col-md-6 div-wp-button">*/}
                {/*<a href="#">*/}
                {/*<img src={img_whitepaper} className="img-whitepaper"/>*/}
                {/*<p style={{ textAlign: 'center' }}>Click to download</p>*/}
                {/*</a>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*<div className="col-xs-2 col-sm-3 div-wp-ribbon">*/}
                {/*<img src={img_wp_ribbon_right} className="wp-ribbon-right"/>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*<div className="section-contact" id="section-contact-inner">*/}
                {/*<div className="container flex-column">*/}
                {/*<div className="row">*/}
                {/*<div className="col-xs-12 col-sm-12 col-md-2 contact-div-1">*/}
                {/*<img src={img_logo_artplant} className="logo-artplant"/>*/}
                {/*</div>*/}
                {/*<div className="col-xs-12 col-sm-6 col-md-3 contact-div-2">*/}
                {/*<ul className="contact-links">*/}
                {/*<li><a href="#">Link to Something</a></li>*/}
                {/*<li><a href="#">Link to Something</a></li>*/}
                {/*<li><a href="#">Link to Something</a></li>*/}
                {/*<li><a href="#">Link to Something</a></li>*/}
                {/*<li><a href="#">Link to Something</a></li>*/}
                {/*</ul>*/}
                {/*</div>*/}
                {/*<div className="col-xs-12 col-sm-6 col-md-3 contact-div-3">*/}
                {/*<ul className="contact-links">*/}
                {/*<li><a href="#">Link to Something</a></li>*/}
                {/*<li><a href="#">Link to Something</a></li>*/}
                {/*<li><a href="#">Link to Something</a></li>*/}
                {/*<li><a href="#">Link to Something</a></li>*/}
                {/*<li><a href="#">Link to Something</a></li>*/}
                {/*</ul>*/}
                {/*</div>*/}
                {/*<div className="col-xs-12 col-sm-12 col-md-4 contact-div-4">*/}
                {/*<h1>Have questions?</h1>*/}
                {/*<span>Feel free to contact us.</span>*/}
                {/*<a href="#" className="email-button">support@parsecfrontiers.com</a>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*End Section Contact Us*/}
                {/*Section Footer*/}
                {/*<div className="section-footer" id="section-footer-inner">*/}
                  {/*<div className="container flex-column">*/}
                    {/*<div className="row">*/}
                      {/*<div className="col-xs-12 col-sm-12 col-md-4 col-lg-3 footer-share">*/}
                        {/*<a className="footer-button" href="#">*/}
                          {/*<img src={img_icon_twitter} className="footer-button-img"/>*/}
                        {/*</a>*/}
                        {/*<a className="footer-button" href="#">*/}
                          {/*<img src={img_icon_instagram} className="footer-button-img"/>*/}
                        {/*</a>*/}
                        {/*<a className="footer-button" href="#">*/}
                          {/*<img src={img_icon_facebook} className="footer-button-img"/>*/}
                        {/*</a>*/}
                      {/*</div>*/}
                      {/*<div className="col-xs-12 col-sm-12 col-md-8 col-lg-9 footer-text">*/}
                      {/*<span className="footer-copyright">*/}
                        {/*Copyright Artplant 2018*/}
                      {/*</span>*/}
                      {/*</div>*/}
                    {/*</div>*/}
                  {/*</div>*/}
                {/*</div>*/}
              {/*</div>*/}
              {/*End Section Footer*/}
            </div>
          </div>
          {/*End Page Content*/}
        </div>
      </div>
    );
  }
}

export default Landing;

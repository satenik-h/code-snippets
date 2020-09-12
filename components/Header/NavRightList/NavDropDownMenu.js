import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {hashHistory} from 'react-router';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';

const listItemStyle = {
    paddingLeft: '50px'
};

class NavDropDownMenu extends Component {
    handleChange = (event, value) => {
        hashHistory.push(value);
    };

    goToDashboard = (e) => {
        e.preventDefault();
        this.context.router.push('/dashboard');
    };

    goToProfile = (e) => {
        e.preventDefault();
        this.context.router.push('/references/profile');
    };

    goToSecurity = (e) => {
        e.preventDefault();
        this.context.router.push('/references/security');
    };

    goToSettings = (e) => {
        e.preventDefault();
        this.context.router.push('/references/settings');
    };

    render() {
        return (
            <IconMenu
                iconButtonElement={
                    <IconButton className="icon-button pr-0 text-white">
                        <img src="/assets/images/avatar.png" className="hidden-sm-down rounded-circle" />
                        <p className="px-2 mb-0 d-flex flex-column justify-content-center text-left">
                            <span>{this.props.userData && this.props.userData.username}</span>
                        </p>
                        <i className="material-icons icon-has-ul">arrow_drop_down</i>
                    </IconButton>
                }
                onChange={() => this.handleChange()}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                menuStyle={{minWidth: '150px'}}
            >
                {/*<MenuItem
                    onTouchTap={this.goToDashboard}
                    primaryText="Dashboard"
                    innerDivStyle={listItemStyle}
                    leftIcon={<i className="material-icons">home</i>}
                />

                <MenuItem
                    className="hidden-xs-up"
                    value='/app/page/about'
                    primaryText="About"
                    innerDivStyle={listItemStyle}
                    leftIcon={<i className="material-icons">person_outline</i>}
                />

                <MenuItem
                    onTouchTap={this.goToProfile}
                    primaryText="Profile"
                    innerDivStyle={listItemStyle}
                    leftIcon={<img src="../../../assets/images/profile.png" className="menu-item-icon" />}
                />

                <MenuItem
                    onTouchTap={this.goToSecurity}
                    primaryText="Security"
                    innerDivStyle={listItemStyle}
                    leftIcon={<img src="../../../assets/images/security.png" className="menu-item-icon" />}
                />

                <MenuItem
                    className="hidden-xs-up"
                    onTouchTap={this.goToSettings}
                    primaryText="Settings"
                    innerDivStyle={listItemStyle}
                    leftIcon={<img src="../../../assets/images/settings.png" className="menu-item-icon" />}
                />*/}

                <MenuItem
                    onTouchTap={this.props.signOut}
                    primaryText="Log Out"
                    innerDivStyle={listItemStyle}
                    leftIcon={<i className="material-icons">forward</i>}
                />
            </IconMenu>
        );
    }
}

NavDropDownMenu.contextTypes = {
    router: PropTypes.object.isRequired
};

export default NavDropDownMenu;

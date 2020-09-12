import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavRightList from './NavRightList';


class Header extends Component {
	componentDidMount() {
		const { sidebarToggler } = this.refs;
		const $sidebarToggler = $(sidebarToggler);
		const $body = $('#body');

		$sidebarToggler.on('click', (e) => {
			$body.toggleClass('sidebar-mobile-open');
		});
	}

	render() {
		return (
			<section className='app-header'>
				<div className='app-header-inner'>
					<NavRightList />
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state) => {
    return {
        userData: state.userReducer.userData,
    }
};

export default connect(mapStateToProps)(Header);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

export default class SideNavContent extends Component {
	componentDidMount() {
        const {nav} = this.refs;
        const $nav = $(nav);

        // scroll
        // $nav.slimscroll({
        //     height: '100%'
        // });

        // AccordionNav
        const slideTime = 250;
        const $lists = $nav.find('ul').parent('li');
        $lists.append('<i class="material-icons icon-has-ul">arrow_drop_down</i>');
        const $As = $lists.children('a');

        // Disable A link that has ul
        $As.on('click', (event) => event.preventDefault());

        // Accordion nav
        $nav.on('click', function (e) {
            let target = e.target;
            let $parentLi = $(target).closest('li'); // closest, instead of parent, so it still works when click on i icons
            if (!$parentLi.length) return; // return if doesn't click on li
            let $subUl = $parentLi.children('ul');

            // let depth = $subUl.parents().length; // but some li has no sub ul, so...
            let depth = $parentLi.parents().length + 1;

            // filter out all elements (except target) at current depth or greater
            let allAtDepth = $nav.find('ul').filter(function () {
                if ($(this).parents().length >= depth && this !== $subUl.get(0)) {
                    return true;
                }
            });
            allAtDepth.slideUp(slideTime).closest('li').removeClass('open');

            // Toggle target
            if ($parentLi.has('ul').length) {
                $parentLi.toggleClass('open');
            }
            $subUl.stop().slideToggle(slideTime);
        });

        // HighlightActiveItems
        const $links = $nav.find('a');
        const currentLocation = hashHistory.getCurrentLocation();

        function highlightActive(pathname) {
            const path = '#' + pathname;

            $links.each((i, link) => {
                let $link = $(link);
                let $li = $link.parent('li');
                let href = $link.attr('href');

                if ($li.hasClass('active')) {
                    $li.removeClass('active');
                }

                if (path.indexOf(href) === 0) {
                    $li.addClass('active');
                }
            });
        }

        highlightActive(currentLocation.pathname);
        hashHistory.listen((location) => {
            highlightActive(location.pathname);
        });		
	}

	render() {
		return (
			<div className='ga-nav-content'>
				<div className='ga-nav-block'>
                    <a href='#/dashboard/info'
                       className={(this.props.location.pathname === '/dashboard/info') ? 'active' : ''}>
                        <div className=''><span>Display info</span></div>
                    </a>
				</div>
			</div>
		);
	}	
}
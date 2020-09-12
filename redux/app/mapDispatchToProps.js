import {bindActionCreators} from 'redux';
import {routerActions} from 'react-router-redux';
import {Map} from 'immutable';

import * as accountActions from '../account/actions';
import * as settingActions from '../settings/actions';

const actions = [
    accountActions,
    routerActions,
    settingActions
];

export default function mapDispatchToProps(dispatch) {
    const creators = Map()
        .merge(...actions)
        .filter(value => typeof value === 'function')
        .toObject();

    return {
        actions: bindActionCreators(creators, dispatch),
        dispatch
    };
}

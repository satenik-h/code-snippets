import React, { Component } from 'react';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin(); // Needed for onTouchTap for Material UI

import TFAModal from '../../components/Modals/TFAModal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import lightTheme from './themes/lightTheme';

// Styles
import 'styles/bootstrap.scss';
import 'styles/layout.scss';
import 'styles/theme.scss';
import 'styles/ui.scss';
import 'styles/app.scss';

export default class App extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)}>
                <div id="app-inner">
                    <div className="preloaderbar hide"><span className="bar" /></div>

                    <div className="full-height fixed-header nav-behind">
                        {this.props.children}

                        <TFAModal />
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

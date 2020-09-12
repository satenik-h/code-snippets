import React, {Component} from 'react';

const timezoneList = require('timezones.json');

class ReferenceSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email_notifications: {
                sign_in: 0,
                coin_credited: 0,
                password_updated: 0,
                profile_change: 0,
                email_change: 0,
                promo_news: 0
            }
        };
    }

    toggleChange = (type) => {
        let {email_notifications} = this.state;

        if (email_notifications[type] === 0)
            email_notifications[type] = 1;
        else
            email_notifications[type] = 0;

        this.setState({
            email_notifications
        });
    };

    render() {
        const timezoneTable = [];
        timezoneList.forEach(tz => {
            timezoneTable.push(<option value={tz.offset}>{tz.text}</option>);
        });

        return(
            <div className="ga-sec-content">
                <div className="row">
                    <div className="col-md-12 ga-sc-title">
                        <h1>Settings</h1>
                    </div>
                </div>

                <div className="row ga-auth" id="ga-auth-settings">
                    <div className="col-md-6 p-30">
                        <div className="ga-sec-auth-title">
                            <span>Global Settings</span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="worldTimezone">Timezone</label>
                            <div className="ga-posr">
                                <select className="form-control" id="worldTimezone">
                                   {timezoneTable}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="fiatCurrency">Default Fiat Currency</label>
                            <div className="ga-posr">
                                <select className="form-control" id="fiatCurrency">
                                    <option value = "EUR">EURO €</option>
                                    <option value = "USD">US DOLLAR $</option>
                                    <option value = "JPY">YEN ¥</option>
                                    <option value = "CHF">SWISS FRANC CHF</option>
                                    <option value = "CHF">POUND STERLING £</option>
                                    <option value = "AUD">AUSTRALIAN DOLLAR $</option>
                                    <option value = "CAD">CANADIAN DOLLAR $</option>
                                    <option value = "SGD">SINGAPORE DOLLAR $</option>
                                </select>
                            </div>
                        </div>
                        <br />
                        <center>
                            <a href="#" className="ga-button">SAVE CHANGES</a>
                        </center>
                    </div>

                    <div className="col-md-6 p-30">
                        <div className="ga-sec-auth-title">
                            <span>Notifications</span>
                        </div>

                        <div className="ga-ptb40 ga-sec-auth-title-d"><span>Send email notifications after following events:</span></div>

                        <div className="ga-auth-rows">
                            <div className={`col ${(this.state.email_notifications.sign_in) ? 'ga-sw-active' : ''}`} onClick={() => this.toggleChange('sign_in')}>
                                <span>Sign in</span>
                                <div className="ga-auth-sw">
                                    <div className={`ga-sw-circle ${(this.state.email_notifications.sign_in) ? 'ga-sw-anim' : ''}`}/>
                                    <input type="hidden" value={this.state.email_notifications.sign_in} />
                                </div>
                            </div>

                            <div className={`col ${(this.state.email_notifications.coin_credited) ? 'ga-sw-active' : ''}`} onClick={() => this.toggleChange('coin_credited')}>
                                <span>COIN credited (buy finished)</span>
                                <div className="ga-auth-sw">
                                    <div className={`ga-sw-circle ${(this.state.email_notifications.coin_credited) ? 'ga-sw-anim' : ''}`}/>
                                    <input type="hidden" value={this.state.email_notifications.coin_credited} />
                                </div>
                            </div>

                            <div className={`col ${(this.state.email_notifications.password_updated) ? 'ga-sw-active' : ''}`} onClick={() => this.toggleChange('password_updated')}>
                                <span>Password update</span>
                                <div className="ga-auth-sw">
                                    <div className={`ga-sw-circle ${(this.state.email_notifications.password_updated) ? 'ga-sw-anim' : ''}`}/>
                                    <input type="hidden" value={this.state.email_notifications.password_updated} />
                                </div>
                            </div>

                            <div className={`col ${(this.state.email_notifications.profile_change) ? 'ga-sw-active' : ''}`} onClick={() => this.toggleChange('profile_change')}>
                                <span>Profile change</span>
                                <div id="set-ta" className="ga-auth-sw">
                                    <div className={`ga-sw-circle ${(this.state.email_notifications.profile_change) ? 'ga-sw-anim' : ''}`}/>
                                    <input type="hidden" value={this.state.email_notifications.profile_change} />
                                </div>
                            </div>

                            <div className={`col ${(this.state.email_notifications.email_change) ? 'ga-sw-active' : ''}`} onClick={() => this.toggleChange('email_change')}>
                                <span>Email change</span>
                                <div id="set-ta" className="ga-auth-sw">
                                    <div className={`ga-sw-circle ${(this.state.email_notifications.email_change) ? 'ga-sw-anim' : ''}`}/>
                                    <input type="hidden" value={this.state.email_notifications.email_change} />
                                </div>
                            </div>

                            <div className={`col ${(this.state.email_notifications.promo_news) ? 'ga-sw-active' : ''}`} onClick={() => this.toggleChange('promo_news')}>
                                <span>Promo and news</span>
                                <div id="set-ta" className="ga-auth-sw">
                                    <div className={`ga-sw-circle ${(this.state.email_notifications.promo_news) ? 'ga-sw-anim' : ''}`}/>
                                    <input type="hidden" value={this.state.email_notifications.promo_news} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReferenceSettings;

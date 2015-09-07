import React from 'react/addons';
import cx from 'classnames';

export default React.createClass( {

    mixins: [
        React.addons.LinkedStateMixin
    ],

    getInitialState() {
        return {
            username: null,
            password: null,
            email: null
        };
    },

    render() {
        let passwordFieldType;

        passwordFieldType = this.props.hidePassword ? 'password' : 'text';

        return (
            <div className="local-signin-form">
                <form action={ this.signup }>
                    <div className="signup-options text-center form">
                        <div className={this.formClassNames('username')}>
                            <input type="text"
                                   className="form-control"
                                   placeholder="Your Username"
                                   valueLink={this.linkState( 'username' )}
                                />
                            { this.props.errors.username &&
                                <span className="label label-danger animate bounceIn">{ this.props.errors.username[ 0 ]}</span>
                            }
                        </div>

                        <div className={this.formClassNames('password')}>
                            <input type={ passwordFieldType }
                                   className="form-control"
                                   placeholder="Your Password"
                                   valueLink={this.linkState( 'password' )}
                                />
                            { this.props.errors.password &&
                                <span className="label label-danger animate bounceIn">{ this.props.errors.password[ 0 ]}</span>
                            }
                        </div>

                        { this.props.showEmail &&
                            <div className={this.formClassNames('email')}>
                                <input type="text"
                                       className="form-control"
                                       placeholder="Email (optional)"
                                       valueLink={this.linkState( 'email' )}
                                    />

                                { this.props.errors.email &&
                                    <span className="label label-danger animate bounceIn">{ this.props.errors.email[ 0 ]}</span>
                                }
                            </div>
                        }

                        <button className="btn btn-lg btn-primary btn-signup" onClick={this.signup}>{ this.props.buttonCaption }</button>
                    </div>
                </form>
            </div>
        );
    },

    formClassNames( field ) {
        return cx( 'form-group', {
            'has-error': this.props.errors[ field ],
            'has-success': this.state[ field ] && !(this.props.errors[ field ])
        } );
    },

    signup( e ) {
        e.preventDefault();

        this.props.onButtonClick( {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        } );
    }

} );
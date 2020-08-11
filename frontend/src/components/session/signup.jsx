import React from 'react';
import { connect } from 'react-redux';
// import { createNewUser, remove } from '../../actions/session';
import { Link } from 'react-router-dom'

class SignUp extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            handle: '',
            email: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    handleSubmit(e) {
        e.preventDefault();
        this.props.createNewUser(this.state)
    }
    update(type) {
        return e => {
            this.setState({ [type]: e.currentTarget.value })
        }
    }
    renderErrors() {
        return(
            <ul>
                {this.props.errors.map((error,i) => (
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }
    componentWillUnmount() {
        // this.props.removeErrors();
    }
    render(){
        
        return (
            <>
                <section id="main-content">
                        <Link className="white-btn home-btn" to="/">Home</Link>
                    <div>
                        <div id="user-account-form">
                            <div className="flex space-between mb-11">
                                <p className="login-title">Sign up</p>
                                <p className="toggle-session">Have an account? {this.props.login}</p>
                            </div>
                            <form className="flex center column" onSubmit={this.handleSubmit}>
                                    <input
                                        className="mb"
                                        placeholder="Name"
                                        type="text"
                                        value={this.state.username}
                                        onChange={this.update('username')}
                                    /> 
                                    <input
                                        className="mb"
                                        placeholder="Email"
                                        type="text"
                                        value={this.state.email}
                                        onChange={this.update('email')}
                                    />
                                    <input
                                        placeholder="Password"
                                        className="mb"
                                        type="password"
                                        value={this.state.password}
                                        onChange={this.update('password')}
                                    />
                                <input className="submit-button" type="submit" value="Create Account"/>
                                {this.renderErrors()}
                            </form>
                        </div>
                    </div>
                </section>
            </>
        )}
    
}

const msp = ({ errors }) => {

    return {
        errors: errors.session,
        login: <Link to="/login">Log in</Link>
    }
}
const mdp = (dispatch) => {
    return {
        // createNewUser: user => dispatch(createNewUser(user)),
        // removeErrors: () => dispatch(remove())
    };
};

export default connect(msp, mdp)(SignUp);

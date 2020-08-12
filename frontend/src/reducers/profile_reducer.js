import { RECEIVE_USER } from '../actions/profile_actions';

const ProfileReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_USER:
            debugger
            return action.user;
        default:
            return state;
    }
};

export default ProfileReducer;
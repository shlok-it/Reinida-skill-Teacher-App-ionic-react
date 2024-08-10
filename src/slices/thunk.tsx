import { apiCall } from '../connect/api';
import {
    userIsUpdated,
} from './reducer';

/**
 * Changes the layout type
 * @param {*} param0
 */
export const getUserProfile = (setCurrentUser:any) => async (dispatch: any) => {
    const {call_secure_api } = apiCall();
    try {
        let response;
        await call_secure_api('profile')
            .then(
                (resolve: any) => {
                    if (resolve.status === true) {
                        setCurrentUser(resolve.data.profile);
                        response = true;
                    }
                    else {
                        response = false;
                    }
                },
                (reject) => {
                    response = false;
                }
            )
        if (response) {
            dispatch(userIsUpdated(response));
        }
    } catch (error) { }
};
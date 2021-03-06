import axios from'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {
     AUTH_ERROR,
     REGISTER_FAIL,
     REGISTER_SUCCESS,
     LOGIN_FAIL,
     LOGIN_SUCCESS,
     USER_LOADING,
     USER_LOADED,
     LOGOUT_SUCCESS
} from './types';
import {WEBSITE_URL} from '../../helpers/misc';

/**
 * @loadUser
 * @router( load user)
 * @url{'/api/auth/user'}
 */
export const loadUser = () => async (dispatch,getState)=>{
    dispatch({type:USER_LOADING})

    const token = await getState().auth.token;

    //Headers
    const config = {
        headers:{
            'Content-Type':'application/json',
        },
    };
    //If a token add it to headers
    if(token){
        config.header['x-chat-token']= token;
    }
    await axios.get(`${WEBSITE_URL}/api/auth/user`,config).then(res =>{
        return dispatch({
            type: USER_LOADED,
            payload: res.data,
        }).catch(err => console.warn(err.response.data));
    });
};

/**
 * @login
 * @router( login user)
 * @url{'/api/auth'}
 */

export const login = ({email,password}) => async dispatch =>{
    //Request body
    const data ={email,password};

    if(email !==''){
        await axios({
            method:'POST',
            url: `${WEBSITE_URL}/api/auth`,
            data,
            headers: {
                'Content-type':'application/json',
            },
        }).then(res =>
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            }),
            ).catch(err=>{
                alert(err.response.data)
                return dispatch({
                    type:AUTH_ERROR
                })
            })
    }
}; 
/**
 * @register
 * @router( register user)
 * @url{'/api/user'}
 */

export const register =({
    name,email,password,cpassword
})=> async dispatch => {
    //Request body
    const data= {name,email,password,cpassword}

    if(email !== ''){
        await axios({
            method:'POST',
            url:`${WEBSITE_URL}/api/user`,
            data,
            headers:{
                'Content-Type':'application/json',
            },
        }).then(res=>{
            return dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });
        }).catch(err => alert(err.response.data))
    }
};
/**
 * @logout
 */
export const logout =() => async dispatch =>{
    return dispatch({
         type: LOGOUT_SUCCESS,
        })
}
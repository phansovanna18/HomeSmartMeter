import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR, AUTH_LOGOUT } from '../action/authentication';
import { USER_REQUEST } from "../action/user";
import axios from 'axios';


const state = {
    token: localStorage.getItem("user-token") || "",
    status: "",
    hasLoadedOnce: false
}


const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
};


const actions = {
    [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST);
            axios({ url: 'http://127.0.0.1:5000/api/auth/', data: user, method: 'POST' })
                .then(resp => {
                    const token = resp.data.token
                    localStorage.setItem('user-token', token) // store the token in localstorage

                    axios.defaults.headers.common['Authorization'] = token

                    commit(AUTH_SUCCESS, token)

                    dispatch(USER_REQUEST)
                    resolve(resp)

                })
                .catch(err => {
                    console.log("error" + err)
                    commit(AUTH_ERROR, err)
                    localStorage.removeItem('user-token')
                    reject(err)
                })
        })
    },
    [AUTH_LOGOUT]: ({ commit }) => {
        return new Promise(resolve => {
            commit(AUTH_LOGOUT);
            localStorage.removeItem("user-token");
            resolve();
        });
    }
}


const mutations = {
    [AUTH_REQUEST]: state => {
        state.status = "loading";
    },
    [AUTH_SUCCESS]: (state, resp) => {
        state.status = "success";
        state.token = resp.token;
        state.hasLoadedOnce = true;
    },
    [AUTH_ERROR]: state => {
        state.status = "error";
        state.hasLoadedOnce = true;
    },
    [AUTH_LOGOUT]: state => {
        state.token = "";
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};

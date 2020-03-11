import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from "../action/user";
// import apiCall from "./apiCall";
import Vue from "vue";
import { AUTH_LOGOUT } from "../action/authentication";
import Axios from "axios";

const state = { status: "", profile: {} };

const getters = {
    getProfile: state => state.profile,
    isProfileLoaded: state => !!state.profile.name
};

const actions = {
    [USER_REQUEST]: ({ commit, dispatch }) => {
        commit(USER_REQUEST);
        // apiCall({ url: "user/me" })
        //     .then(resp => {
        //         commit(USER_SUCCESS, resp);
        //     })
        //     .catch(() => {
        //         commit(USER_ERROR);
        //         // if resp is unauthorized, logout, to
        //         dispatch(AUTH_LOGOUT);
        //     });
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    Axios.get("http://127.0.0.1:5000/api/user/me").then(response => {
                        console.log(response)
                        resolve("msg", "success")
                    }).catch(err => {
                        reject(err)
                        console.log("Error:" + err)
                    })
                } catch (err) {
                    reject(new Error(err));
                }
            }, 1000);
        }).then(resp => {
            commit(USER_SUCCESS, resp);
        }).catch(() => {
            commit(USER_ERROR);
            dispatch(AUTH_LOGOUT);
        })

    }
};

const mutations = {
    [USER_REQUEST]: state => {
        state.status = "loading";
    },
    [USER_SUCCESS]: (state, resp) => {
        state.status = "success";
        Vue.set(state, "profile", resp);
    },
    [USER_ERROR]: state => {
        state.status = "error";
    },
    [AUTH_LOGOUT]: state => {
        state.profile = {};
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};

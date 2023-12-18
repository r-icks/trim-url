import { useReducer, useContext, useEffect } from "react";
import React from "react";
import reducer from "./reducer";
import {
    CLEAR_ALERT, SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS, SETUP_USER_ERROR, LOGOUT_USER,
    GET_CURRENT_USER_BEGIN,
    GET_CURRENT_USER_SUCCESS,
    GET_COLLECTIONS_BEGIN,
    GET_COLLECTIONS_SUCCESS,
    CLEAR_STATS,
    GET_STATS_BEGIN,
    GET_STATS_SUCCESS,
    ADD_COLLECTION_BEGIN,
    ADD_COLLECTION_SUCCESS,
    ADD_COLLECTION_ERROR,
    ADD_URL_BEGIN,
    ADD_URL_SUCCESS,
    ADD_URL_ERROR,
} from "./actions";

import axios from "axios"

export const initialState = {
    userLoading: true,
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: null,
    collections: null,
    collectionsLoading: false,
    chartData: null,
    logs: null,
    statsLoading: false
}

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const authFetch = axios.create({
        baseURL: "/api/v1"
    })

    // auth request
    authFetch.interceptors.request.use(
        (config)=>{
            return config
        },
        (error)=>{
            return Promise.reject(error)
        }
    )

    authFetch.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            if (error.response.status === 401) {
                logoutUser();
            }
            return Promise.reject(error)
        }
    )

    const setupUser = async ({ currentUser, endPoint }) => {
        dispatch({ type: SETUP_USER_BEGIN })
        try {
            const { data } = await axios.post(
                `/api/v1/auth/${endPoint}`,
                currentUser)
            const { user} = data
            dispatch({
                type: SETUP_USER_SUCCESS,
                payload: {
                    user
                }
            })
        }
        catch (err) {
            dispatch({
                type: SETUP_USER_ERROR,
                payload: { msg: err.response.data.msg }
            })
        }
        clearAlert();
    }

    const logoutUser = async () => {
        await authFetch.get('/auth/logout')
        dispatch({ type: LOGOUT_USER })
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 3000)
    }

    const getCurrentUser = async ()=>{
        dispatch({type: GET_CURRENT_USER_BEGIN})
        try{
            const {data} = await authFetch('/auth/getCurrentUser')
            const {user, location} = data
            dispatch({type: GET_CURRENT_USER_SUCCESS,payload:
            {user, location}})
        }
        catch(err){
            if(err.response.status === 401 ) return;
            logoutUser()
        }
    }

    const getCollections = async ()=>{
        dispatch({type: GET_COLLECTIONS_BEGIN});
        try{
            const {data} = await authFetch('/user/collection');
            const {collections} = data;
            dispatch({type: GET_COLLECTIONS_SUCCESS, payload:{collections}});
        }
        catch(err){
            console.log(err);
            logoutUser();
        }
    }

    const getStats = async (urlId)=>{
        dispatch({type: GET_STATS_BEGIN});
        try{
            const {data} = await authFetch(`/user/url/${urlId}`);
            const {chartData, logs} = data;
            dispatch({type: GET_STATS_SUCCESS, payload:{chartData, logs}});
        }
        catch(err){
            console.log(err);
            logoutUser();
        }
    }

    const addCollection = async (collectionName)=>{
        dispatch({type:ADD_COLLECTION_BEGIN});
        try{
            const {data} = await authFetch.post('/user/collection', {collectionName});
            console.log(data);
            dispatch({type: ADD_COLLECTION_SUCCESS, payload:{collectionNew: data}});
        }
        catch(err){
            dispatch({type: ADD_COLLECTION_ERROR, payload: { msg: err.response.data.msg }})
        }
        clearAlert();
    }


    const addUrl = async (body)=>{
        dispatch({type:ADD_URL_BEGIN});
        try{
            const {data} = await authFetch.post('/user/url', body);
            console.log(data);
            dispatch({type: ADD_URL_SUCCESS, payload:{urlNew: data}});
        }
        catch(err){
            dispatch({type: ADD_URL_ERROR, payload: { msg: err.response.data.msg }})
        }
        clearAlert();
    }

    const clearStats = ()=>{
        dispatch({type: CLEAR_STATS})
    }

    useEffect(()=>{
        getCurrentUser()
    },[])
    
    return (
        <AppContext.Provider value={{
            ...state,
            setupUser,
            logoutUser,
            getCollections,
            clearStats,
            getStats,
            addCollection,
            addUrl
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return (useContext(AppContext));
}
import { ADD_COLLECTION_BEGIN, ADD_COLLECTION_ERROR, ADD_COLLECTION_SUCCESS, ADD_URL_BEGIN, ADD_URL_ERROR, ADD_URL_SUCCESS, CLEAR_ALERT, CLEAR_STATS, GET_COLLECTIONS_BEGIN, GET_COLLECTIONS_SUCCESS, GET_CURRENT_USER_BEGIN, GET_CURRENT_USER_SUCCESS, GET_STATS_BEGIN, GET_STATS_SUCCESS, LOGOUT_USER, SETUP_USER_BEGIN, SETUP_USER_ERROR, SETUP_USER_SUCCESS } from "./actions"
import { initialState } from "./appContext"

const reducer = (state, action) => {
    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: '',
            alertText: '',
        }
    }
    if (action.type === LOGOUT_USER) {
        return {
            ...initialState,
            userLoading: false,
            user: null
        }
    }
    if (action.type === SETUP_USER_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }
    if (action.type === SETUP_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            showAlert: true,
            alertType: "success",
            alertText: "Successful Redirecting..."
        }
    }
    if (action.type === SETUP_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg
        }
    }
    if (action.type === GET_CURRENT_USER_BEGIN) {
        return { ...state, userLoading: true, showAlert: false }
    }
    if (action.type === GET_CURRENT_USER_SUCCESS) {
        return {
            ...state,
            userLoading: false,
            user: action.payload.user,
        }
    }
    if (action.type === GET_COLLECTIONS_BEGIN) {
        return {
            ...state,
            collectionLoading: true
        }
    }
    if (action.type === GET_COLLECTIONS_SUCCESS) {
        return {
            ...state,
            collectionLoading: false,
            collections: action.payload.collections
        }
    }
    if (action.type === CLEAR_STATS) {
        return {
            ...state,
            statsLoading: false,
            chartData: null,
            logs: null
        }
    }
    if (action.type === GET_STATS_BEGIN) {
        return {
            ...state,
            statsLoading: true
        }
    }
    if (action.type === GET_STATS_SUCCESS) {
        return {
            ...state,
            statsLoading: false,
            chartData: action.payload.chartData,
            logs: action.payload.logs
        }
    }
    if (action.type === ADD_COLLECTION_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }
    if (action.type === ADD_COLLECTION_SUCCESS) {
        return {
            ...state,
            collections: [...state.collections, action.payload.collectionNew],
            showAlert: true,
            alertText: 'Collection Added Successfully!',
            alertType: 'success',
            isLoading: false
        }
    }
    if (action.type === ADD_COLLECTION_ERROR) {
        return {
            ...state,
            showAlert: true,
            alertText: action.payload.msg,
            alertType: 'danger',
            isLoading: false
        }
    }
    if (action.type === ADD_URL_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }
    if (action.type === ADD_URL_SUCCESS) {
        const { urlNew } = action.payload;
        const updatedCollections = state.collections.map((collection) =>
            collection.collectionId === urlNew.collectionId
                ? {
                    ...collection,
                    urls: [...collection.urls, urlNew],
                }
                : collection
        );

        return {
            ...state,
            collections: updatedCollections,
            showAlert: true,
            alertText: 'URL Added Successfully!',
            alertType: 'success',
            isLoading: false,
        };
    }
    if (action.type === ADD_URL_ERROR) {
        return {
            ...state,
            showAlert: true,
            alertText: action.payload.msg,
            alertType: 'danger',
            isLoading: false
        }
    }
    throw new Error(`no such action:${action.type}`);
}

export default reducer;
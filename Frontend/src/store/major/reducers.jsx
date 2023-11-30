import { CLEAR_JURUSAN_MESSAGES, DELETE_JURUSAN, DELETE_JURUSAN_SUCCESS, GET_JURUSAN, GET_JURUSAN_FAILED, GET_JURUSAN_SUCCESS, PATCH_JURUSAN, PATCH_JURUSAN_FAILED, PATCH_JURUSAN_SUCCESS, POST_JURUSAN, POST_JURUSAN_FAILED, POST_JURUSAN_SUCCESS } from "./actionTypes"

const init_state = {
    loading: false,
    response: [],
    post: {
        loading: false,
        message: null
    },
    patch: {
        loading: false,
        message: null
    },
    delete: {
        loading: false,
        message: null
    }
}

const majorReducer = (state = init_state, action) => {
    switch (action.type) {
    case GET_JURUSAN:
        state = {
            ...state,
            loading: true
        }
        break
    case GET_JURUSAN_SUCCESS:
        state = {
            ...state,
            response: action.payload
        }
        break
    case GET_JURUSAN_FAILED:
        state = {
            ...state,
            response:action.payload
        }
        break
    case POST_JURUSAN:
        state = {
            ...state,
            loading: true,
            post: {message:null},
            patch: {message:null},
            delete: {message:null},
        }
        break
    case POST_JURUSAN_SUCCESS:
        state = {
            ...state,
            loading: false,
            post: {message:action.payload}
        }
        break
    case POST_JURUSAN_FAILED:
        state = {
            ...state,
            loading: false,
            post: {message:action.payload}
        }
        break
    case PATCH_JURUSAN:
        state = {
            ...state,
            loading: true,
            post: {message:null},
            patch: {message:null},
            delete: {message:null},
        }
        break
    case PATCH_JURUSAN_SUCCESS:
        state = {
            ...state,
            loading: false,
            patch: {message:action.payload}
        }
        break
    case PATCH_JURUSAN_FAILED:
        state = {
            ...state,
            loading: false,
            patch: {message:action.payload}
        }
        break
    case DELETE_JURUSAN:
        state = {
            ...state,
            loading: true,
            post: {message:null},
            patch: {message:null},
            delete: {message:null},
        }
        break
    case DELETE_JURUSAN_SUCCESS:
        state = {
            ...state,
            loading: false,
            delete: {message:action.payload}
        }
        break
    // case DELETE_JURUSAN_FAILED:
    //     state = {
    //         ...state,
    //         loading: false,
    //         delete: {message:action.payload}
    //     }
    //     break
    case CLEAR_JURUSAN_MESSAGES:
        state = {
            ...state,
            post: {message:null},
            patch: {message:null},
            delete: {message:null},
        }
        break
    default:
        state = { ...state }
        break
    }
    return state
}

export default majorReducer
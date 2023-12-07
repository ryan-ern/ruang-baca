import { POST_SEARCH_BY_BORROW_DATE, POST_SEARCH_BY_BORROW_DATE_ADMIN, POST_SEARCH_BY_BORROW_DATE_ADMIN_FAILED, POST_SEARCH_BY_BORROW_DATE_ADMIN_SUCCESS, POST_SEARCH_BY_BORROW_DATE_FAILED, POST_SEARCH_BY_BORROW_DATE_SUCCESS, POST_SEARCH_BY_JUDUL, POST_SEARCH_BY_JUDUL_FAILED, POST_SEARCH_BY_JUDUL_SUCCESS, POST_SEARCH_BY_JURUSAN, POST_SEARCH_BY_JURUSAN_FAILED, POST_SEARCH_BY_JURUSAN_SUCCESS, POST_SEARCH_BY_RETURN_DATE, POST_SEARCH_BY_RETURN_DATE_ADMIN, POST_SEARCH_BY_RETURN_DATE_ADMIN_FAILED, POST_SEARCH_BY_RETURN_DATE_ADMIN_SUCCESS, POST_SEARCH_BY_RETURN_DATE_FAILED, POST_SEARCH_BY_RETURN_DATE_SUCCESS } from "./actionTypes"

const init_state = {
    loading: false,
    response: []
}

const searchReducer = (state = init_state, action) => {
    switch (action.type) {
    case POST_SEARCH_BY_JURUSAN:
        state = {
            ...state,
            loading: true
        }
        break
    case POST_SEARCH_BY_JURUSAN_SUCCESS:
        state = {
            ...state,
            loading: false,
            response: action.payload
        }
        break
    case POST_SEARCH_BY_JURUSAN_FAILED:
        state = {
            ...state,
            loading: false,
            response: action.payload
        }
        break
    case POST_SEARCH_BY_JUDUL:
        state = {
            ...state,
            loading: true
        }
        break
    case POST_SEARCH_BY_JUDUL_SUCCESS:
        state = {
            ...state,
            loading: false,
            response: action.payload
        }
        break
    case POST_SEARCH_BY_JUDUL_FAILED:
        state = {
            ...state,
            loading: false,
            response: action.payload
        }
        break
    case POST_SEARCH_BY_BORROW_DATE:
        state = {
            ...state,
            loading: true
        }
        break
    case POST_SEARCH_BY_BORROW_DATE_SUCCESS:
        state = {
            ...state,
            loading: false,
            response: action.payload
        }
        break
    case POST_SEARCH_BY_BORROW_DATE_FAILED:
        state = {
            ...state,
            loading: false,
            response: action.payload
        }
        break
    case POST_SEARCH_BY_BORROW_DATE_ADMIN:
        state = {
            ...state,
            loading: true
        }
        break
    case POST_SEARCH_BY_BORROW_DATE_ADMIN_SUCCESS:
        state = {
            ...state,
            loading: false,
            response: action.payload
        }
        break
    case POST_SEARCH_BY_BORROW_DATE_ADMIN_FAILED:
        state = {
            ...state,
            loading: false,
            response: action.payload
        }
        break
    case POST_SEARCH_BY_RETURN_DATE:
        state = {
            ...state,
            loading: true
        }
        break
    case POST_SEARCH_BY_RETURN_DATE_SUCCESS:
        state = {
            ...state,
            loading: false,
            response: action.payload
        }
        break
    case POST_SEARCH_BY_RETURN_DATE_FAILED:
        state = {
            ...state,
            loading: false,
            response: action.payload
        }
        break
    case POST_SEARCH_BY_RETURN_DATE_ADMIN:
        state = {
            ...state,
            loading: true
        }
        break
    case POST_SEARCH_BY_RETURN_DATE_ADMIN_SUCCESS:
        state = {
            ...state,
            loading: false,
            response: action.payload
        }
        break
    case POST_SEARCH_BY_RETURN_DATE_ADMIN_FAILED:
        state = {
            ...state,
            loading: false,
            response: action.payload
        }
        break
    default:
        state = { ...state }
        break
    }
    return state   
}

export default searchReducer
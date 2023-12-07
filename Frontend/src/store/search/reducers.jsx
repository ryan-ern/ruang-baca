import { GET_SEARCH_BY_BORROW_DATE, GET_SEARCH_BY_BORROW_DATE_ADMIN, GET_SEARCH_BY_BORROW_DATE_ADMIN_FAILED, GET_SEARCH_BY_BORROW_DATE_ADMIN_SUCCESS, GET_SEARCH_BY_BORROW_DATE_FAILED, GET_SEARCH_BY_BORROW_DATE_SUCCESS, GET_SEARCH_BY_JUDUL, GET_SEARCH_BY_JUDUL_FAILED, GET_SEARCH_BY_JUDUL_RESET, GET_SEARCH_BY_JUDUL_SUCCESS, GET_SEARCH_BY_JURUSAN, GET_SEARCH_BY_JURUSAN_FAILED, GET_SEARCH_BY_JURUSAN_SUCCESS, GET_SEARCH_BY_RETURN_DATE, GET_SEARCH_BY_RETURN_DATE_ADMIN, GET_SEARCH_BY_RETURN_DATE_ADMIN_FAILED, GET_SEARCH_BY_RETURN_DATE_ADMIN_SUCCESS, GET_SEARCH_BY_RETURN_DATE_FAILED, GET_SEARCH_BY_RETURN_DATE_SUCCESS, RESET_MESSAGE } from "./actionTypes"

const init_state = {
    loading: false,
    response: [],
    borrow: [],
    return: []
}

const searchReducer = (state = init_state, action) => {
    switch (action.type) {
    case GET_SEARCH_BY_JURUSAN:
        state = {
            ...state,
            loading: true
        }
        break
    case GET_SEARCH_BY_JURUSAN_SUCCESS:
        state = {
            ...state,
            loading: false,
            response: action.payload
        }
        break
    case GET_SEARCH_BY_JURUSAN_FAILED:
        state = {
            ...state,
            loading: false,
            response: action.payload
        }
        break
    case GET_SEARCH_BY_JUDUL:
        state = {
            ...state,
            loading: true
        }
        break
    case GET_SEARCH_BY_JUDUL_SUCCESS:
        state = {
            ...state,
            loading: false,
            response: action.payload
        }
        break
    case GET_SEARCH_BY_JUDUL_FAILED:
        state = {
            ...state,
            loading: false,
            response: action.payload
        }
        break
    case GET_SEARCH_BY_JUDUL_RESET:
        state = {
            ...state,
            loading: false,
            response: []
        }
        break
    case GET_SEARCH_BY_BORROW_DATE:
        state = {
            ...state,
            loading: true
        }
        break
    case GET_SEARCH_BY_BORROW_DATE_SUCCESS:
        state = {
            ...state,
            loading: false,
            borrow: action.payload
        }
        break
    case GET_SEARCH_BY_BORROW_DATE_FAILED:
        state = {
            ...state,
            loading: false,
            borrow: action.payload
        }
        break
    case GET_SEARCH_BY_BORROW_DATE_ADMIN:
        state = {
            ...state,
            loading: true
        }
        break
    case GET_SEARCH_BY_BORROW_DATE_ADMIN_SUCCESS:
        state = {
            ...state,
            loading: false,
            borrow: action.payload
        }
        break
    case GET_SEARCH_BY_BORROW_DATE_ADMIN_FAILED:
        state = {
            ...state,
            loading: false,
            borrow: action.payload
        }
        break
    case GET_SEARCH_BY_RETURN_DATE:
        state = {
            ...state,
            loading: true
        }
        break
    case GET_SEARCH_BY_RETURN_DATE_SUCCESS:
        state = {
            ...state,
            loading: false,
            return: action.payload
        }
        break
    case GET_SEARCH_BY_RETURN_DATE_FAILED:
        state = {
            ...state,
            loading: false,
            return: action.payload
        }
        break
    case GET_SEARCH_BY_RETURN_DATE_ADMIN:
        state = {
            ...state,
            loading: true
        }
        break
    case GET_SEARCH_BY_RETURN_DATE_ADMIN_SUCCESS:
        state = {
            ...state,
            loading: false,
            return: action.payload
        }
        break
    case GET_SEARCH_BY_RETURN_DATE_ADMIN_FAILED:
        state = {
            ...state,
            loading: false,
            return: action.payload
        }
        break
    case RESET_MESSAGE:
        state = {
            ...state,
            borrow: []
        }
        break
    default:
        state = { ...state }
        break
    }
    return state   
}

export default searchReducer
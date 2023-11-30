export const URL_POST_LOGIN = '/login'
export const URL_POST_REGISTER = '/register'
export const URL_DELETE_LOGOUT = '/logout'

export const URL_GET_AUTH = '/profile'
export const URL_GET_PROFILE = '/profile'

export const URL_GET_DASHBOARD = '/dashboard'

export const URL_GET_INVENTORY = '/inventory'
export const URL_POST_INVENTORY = '/addBook'
export const URL_EDIT_INVENTORY = '/editBook/:isbn'
export const URL_DELETE_INVENTORY = '/editBook/:isbn'

export const URL_PUT_PROFIL = '/profile'

export const URL_GET_ACCOUNT = '/userControl'
export const URL_DELETE_ACCOUNT = '/user/:username'
export const URL_EDIT_ACCOUNT = '/user/:username'

export const URL_POST_ADMIN = '/addAdmin'
export const URL_POST_SUPERADMIN = '/addSuperAdmin'

export const URL_GET_BORROW_ADMIN = '/peminjamanAdmin'
export const URL_GET_BORROW = '/peminjaman'
export const URL_POST_BORROW = '/addBorrow/:isbn'

export const URL_GET_RETURN= '/pengembalian'

export const URL_POST_ACCEPT_BORROW = '/acceptPeminjaman/:id'
export const URL_POST_DENIED_BORROW = '/deniedPeminjaman/:id'
export const URL_DELETE_BORROW = '/resetPeminjaman/:id'

export const URL_GET_FINED = "/denda"
export const URL_PUT_FINED= "/denda"

export const URL_GET_JURUSAN = '/jurusan'
export const URL_POST_JURUSAN = '/createJurusan'
export const URL_PATCH_JURUSAN = '/updateJurusan/:id'
export const URL_DELETE_JURUSAN = '/deleteJurusan/:id'

export const URL_GET_RETURN_USER= '/pengembalianUser'
// unfinished
export const URL_POST_ACCEPT_RETURN= '/pengembalian/:id'
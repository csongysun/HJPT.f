const baseUrl = 'http://localhost:2235';

// guard
export const adminCheck = baseUrl + '/api/admin';

// auth
export const auth = {
    login: baseUrl + '/api/auth/login',
    logout: baseUrl + '/api/auth/signout',
    refresh: baseUrl + '/api/auth/refresh',
    register: baseUrl + '/api/auth/signup',
}

// topic
export const topic = {
    recent: baseUrl + '/api/topic/recent',
    collection: baseUrl + '/api/topic'
}

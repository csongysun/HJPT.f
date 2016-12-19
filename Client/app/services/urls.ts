const baseUrl = 'http://localhost:2235/api/';


// auth
export const auth = {
    login: baseUrl + 'auth/login',
    logout: baseUrl + 'auth/signout',
    refresh: baseUrl + 'auth/refresh',
    register: baseUrl + 'auth/signup',
}

// topic
export const topic = {
    recent: baseUrl + 'topic/recent',
    collection: baseUrl + 'topic'
}

// admin
export const admin = {
    check: baseUrl + 'admin',
}



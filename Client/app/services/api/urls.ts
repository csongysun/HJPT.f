const baseUrl = 'http://localhost:2235/api/';


// auth
export const auth = {
    login: baseUrl + 'auth/login',
    logout: baseUrl + 'auth/signout',
    refresh: baseUrl + 'auth/refresh',
    register: baseUrl + 'auth/signup',
}

export const content = {
    category: baseUrl + 'category',
    topic: baseUrl + 'topic',
    recentTopic: baseUrl + 'topic/recent',
}

// admin
export const admin = {
    check: baseUrl + 'admin',
    category: {
        add: baseUrl + 'admin/category',
        edit: baseUrl + 'admin/category',
        delete: baseUrl + 'admin/category'
    }
}


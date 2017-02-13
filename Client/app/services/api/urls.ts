const baseUrl = 'http://localhost:5000/api/';


// auth
export const auth = {
    login: baseUrl + 'auth/login',
    logout: baseUrl + 'auth/signout',
    refresh: baseUrl + 'auth/refresh',
    register: baseUrl + 'auth/signup',
}

export const content = {
    category: baseUrl + 'category',
    promotion: baseUrl + 'promotion',

    topic: baseUrl + 'topic',
    recentTopic: baseUrl + 'topic/recent',
}

export const user = {
    role: baseUrl + 'role',
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



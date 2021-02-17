const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/kelas', component: Kelas },
    { path: '*', component: NotFound },
    {
        path: '/kelas/:idkelas',
        component: DetailKelas
    }
]

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})
function load(component) {
    return () => import(`@/views/${component}.vue`)
}

function components(component) {
    return () => import(`@/components/${component}.vue`)
}

const routes = [
    {
        path: '/',
        name: '/',
        component: load('index')
    },
    {
        path: '/hello',
        name: 'hello',
        component: components('HelloWorld')
    },
    {
        path: '/payMoney',
        name: 'payMoney',
        component: load('payMoney')
    }
]
export default routes;
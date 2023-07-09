import Router from './router.js'
const routes = [
    { path: '/', file: 'home' },
    { path: '/about', file: 'about' }
];

new Router(routes);

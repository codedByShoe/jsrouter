class Router {
    constructor(routes) {
        this.routes = routes;
        this._addEventListeners();
        this.loadInitialRoute();
    }

    loadRoute(...urlSegs) {
		    console.log('loadRoute urlSegs:', urlSegs);
        const matchedRoute = this.matchUrlToRoute(urlSegs);
		    console.log('matchedRoute:', matchedRoute);
        const url = `./${matchedRoute.file}.html`;

        fetch(url)
            .then(response => response.text())
            .then(content => {
                document.querySelector('#app').innerHTML = content;
            });

        history.pushState({}, '', matchedRoute.path);
    }

    loadInitialRoute() {
        const pathNameSplit = window.location.pathname.split('/');
        const pathSegs = pathNameSplit.length > 1 ? pathNameSplit.slice(1) : '';
        this.loadRoute(...pathSegs);
    }

    matchUrlToRoute(urlSegs) {
    const matchedRoute = this.routes.find(route => {
        const routePathSegs = route.path.split('/').slice(1);

        if (routePathSegs.length !== urlSegs.length) {
            return false;
        }

        return routePathSegs.every((routePathSeg, i) => routePathSeg === urlSegs[i]);
    });

    return matchedRoute;
}

    _addEventListeners() {
        document.body.addEventListener('click', e => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                const urlSegs = e.target.pathname.split('/').slice(1);
				this.loadRoute(...urlSegs);
            }
        });

        window.addEventListener('popstate', () => {
            this.loadRoute(window.location.pathname.split("/").slice(1));
        });
    }
}

export default Router

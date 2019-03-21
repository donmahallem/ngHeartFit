import { Component, OnInit, NgZone } from '@angular/core';
import { Router, Route } from '@angular/router';
import { LoadedRouterConfig } from '@angular/router/src/config';
@Component({
    selector: 'app-not-found-cmp',
    templateUrl: './not-found.component.pug',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
    private _title = 'app title';

    constructor(private router: Router) {

    }

    public ngOnInit(): void {

        this.printpath('JJJ', this.router.config);
    }

    printpath(parent: String, routes: Route[]) {
        const getFullPath = (path?: string) => {
            if (path) {
                return parent + '/' + path;
            }

            return parent;
        };

        for (let i = 0; i < routes.length; i++) {
            const route = routes[i];
            const fullPath = getFullPath(route.path);

            console.log(parent + '/' + route.path, route.component);

            if (route.children /*&& route.children.length > 0*/) {
                this.printpath(fullPath, route.children);
            }

            if (route.loadChildren && route.loadChildren.length > 0) {
                const routerConfig = <LoadedRouterConfig>(<any>route)['_loadedConfig'];
                if (routerConfig) {
                    this.printpath(fullPath, routerConfig.routes);
                }
            }
        }
    }
}

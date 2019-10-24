/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
@Component({
    selector: 'app-not-found-cmp',
    styleUrls: ['./not-found.component.scss'],
    templateUrl: './not-found.component.pug',
})
export class NotFoundComponent implements OnInit {

    constructor(private router: Router) {

    }

    public ngOnInit(): void {

        this.printpath('JJJ', this.router.config);
    }

    printpath(parent: string, routes: Route[]) {
        const getFullPath = (path?: string) => {
            if (path) {
                return parent + '/' + path;
            }

            return parent;
        };

        for (const route of routes) {
            const fullPath = getFullPath(route.path);

            if (route.children /*&& route.children.length > 0*/) {
                this.printpath(fullPath, route.children);
            }

            if (route.loadChildren && route.loadChildren.length > 0) {
                const routerConfig = (route as any)._loadedConfig as any;
                if (routerConfig) {
                    this.printpath(fullPath, routerConfig.routes);
                }
            }
        }
    }
}

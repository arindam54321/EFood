import { ActivatedRoute, Router } from "@angular/router";

export class Utils {
    static formatDate(date: Date): string {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-IN', options);
    }

    static formatTime(date: Date): string {
        const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        return date.toLocaleTimeString('en-IN', options);
    }

    static reloadCheck(route: ActivatedRoute, router: Router): void {
        route.queryParams.subscribe(params => {
            if (params['reload'] === 'true') {
                router.navigate([], {
                    relativeTo: route,
                    queryParams: { reload: null },
                    queryParamsHandling: 'merge',
                }).then(() => { window.location.reload() })
            }
        })
    }
}
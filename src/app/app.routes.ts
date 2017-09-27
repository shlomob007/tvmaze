import { RouterModule } from '@angular/router';

const routes = [
    { path: '', loadChildren: 'app/shows/shows.module' }
];

export const Routes = [RouterModule.forRoot(routes)];
import { RouterModule } from '@angular/router';
import { ShowsComponent } from './shows.component';
import { ShowComponent } from './show.component';

const routes = [
    { path: '', component: ShowsComponent },
    { path: ':id', component: ShowComponent }
];

export default RouterModule.forChild(routes);
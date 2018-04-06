// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Guards
import { TestSuitesRouteGuard } from './view/main/tests-suites/route-guards/test-suites.route-guard';
// Application Components
import { MainComponent } from './view/main/main.component';
import { IndexPageComponent } from './view/main/index-page/index-page.component';
import { TestsSuitesComponent } from './view/main/tests-suites/tests-suites.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: '', component: IndexPageComponent },
      { path: 'tasks', canActivate: [TestSuitesRouteGuard], component: TestsSuitesComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [TestSuitesRouteGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }

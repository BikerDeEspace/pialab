import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { AuthenticationComponent } from 'app/authentication/authentication.component';
import { SummaryComponent } from 'app/summary/summary.component';
import { SettingsComponent } from 'app/settings/settings.component';
import { HelpComponent } from 'app/help/help.component';
import { AboutComponent } from 'app/about/about.component';
import { ErrorsComponent } from 'app/errors/errors.component';

import { CardsRoutingModule } from 'app/cards/cards-routing.module';
import { EntryRoutingModule } from 'app/entry/entry-routing.module';
import { TemplatesRoutingModule } from 'app/templates/templates-routing.module';
import { PortfolioRoutingModule } from 'app/portfolio';
import { DashboardRoutingModule } from 'app/dashboard';
import { AuthenticationGuardService } from '@security/authentication-guard.service';
import {PiaResolve} from 'app/services/pia.resolve.service';
import {PiaService} from 'app/entry/pia.service';

const routes: Routes = [
  {
  	path: 'home',
    redirectTo: 'dashboard'
  },
  { path: '', component: AuthenticationComponent },
  { path: 'logout', component: AuthenticationComponent },
  { path: 'summary/:id',
    component: SummaryComponent ,
    canActivate: [AuthenticationGuardService, PiaResolve]
  },
  { path: 'help', component: HelpComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: ErrorsComponent },
];

@NgModule({
  imports: [
    CardsRoutingModule,
    EntryRoutingModule,
    TemplatesRoutingModule,
    PortfolioRoutingModule,
    DashboardRoutingModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  exports: [RouterModule],
  providers: [PiaService, PiaResolve]
})

export class AppRoutingModule { }

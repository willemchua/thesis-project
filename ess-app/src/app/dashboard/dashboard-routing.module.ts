import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PATH } from '../core/constant/index';
import { AuthenticatedGuard } from '../core/network/authentication/shared/authenticated.guard';
import { AuthorizedGuard } from '../core/network/authentication/shared/authorized.guard';
import { Permissions } from '../core/network/authentication/shared/permission.enum';
import { DashboardComponent } from './dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { ChatComponent } from './chat/chat.component';
import { RequestComponent } from './request/request.component';
import { StatusComponent } from './status/status.component';

const routes: Routes = [
  {
    path: PATH.EMPTY,
    canActivateChild: [AuthenticatedGuard],
    component: DashboardComponent,
    children: [
      {
        path: PATH.EMPTY,
        component: MenuComponent,
      },
      {
        path: PATH.CHAT,
        component: ChatComponent,
        data: {
          title: 'Chat',
        }
      },
      {
        path: PATH.REQUEST,
        data: {
          title: 'Request'
        },
        loadChildren: 'app/dashboard/request/request.module#RequestModule'
      },
      {
        path: PATH.STATUS,
        data: {
          title: 'Status'
        },
        component: StatusComponent
      }
    ]
  },
];

const routing: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
  imports: [routing],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

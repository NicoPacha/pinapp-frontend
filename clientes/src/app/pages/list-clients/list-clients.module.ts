import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListClientsRoutingModule } from './list-clients-routing.module';
import { ListClientsComponent } from './list-clients.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    ListClientsComponent
  ],
  imports: [
    CommonModule,
    ListClientsRoutingModule,
    NgxPaginationModule,
    MatProgressSpinnerModule
  ]
})
export class ListClientsModule { }

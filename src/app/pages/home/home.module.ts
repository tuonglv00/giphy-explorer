import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

// PrimeNG module
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ImageModule,
    CardModule,
    ButtonModule
  ]
})
export class HomeModule { }

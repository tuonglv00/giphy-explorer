import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ExplorerRoutingModule } from './explorer-routing.module';
import { ExplorerComponent } from './explorer.component';

import { GifListViewerComponent } from 'src/app/components/gif-list-viewer/gif-list-viewer.component';

// PrimeNG module
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    ExplorerComponent,
  ],
  imports: [
    CommonModule,
    ExplorerRoutingModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    GifListViewerComponent
  ]
})
export class ExplorerModule { }

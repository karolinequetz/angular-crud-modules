import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

import { MainComponent } from './layout/main/main.component';
import { HeaderComponent } from './layout/header/header.component';

@NgModule({
  declarations: [HeaderComponent, MainComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    NgbModule,
    NgxSpinnerModule,
  ],
  exports: [MainComponent],
})
export class CoreModule {}

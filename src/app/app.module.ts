// Angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AsyncPipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
// Primeng
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';

// Application service
import { TestSuitesService } from './view/main/tests-suites/services/test-suites.service';
import { ApiService } from './services/api/api.service';
import { InfoService } from './services/api/info.service';

// Application Components
import { AppComponent } from './app.component';
import { MainComponent } from './view/main/main.component';
// import { TestComponent } from './view/main/tests-sutes/';
import { IndexPageComponent } from './view/main/index-page/index-page.component';
import { TestsSuitesComponent } from './view/main/tests-suites/tests-suites.component';
import { SpinnerComponent } from './view/components/spinner/spinner.component';
import { TestsCaseComponent } from './view/main/tests-suites/components/tests-case/tests-case.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    IndexPageComponent,
    TestsSuitesComponent,
    SpinnerComponent,
    TestsCaseComponent,
    // Primeng
  ],
  imports: [
    // Angular
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    // Prime
    ButtonModule,
    ProgressSpinnerModule,
    TableModule,
    AccordionModule
  ],
  providers: [
    // Aplication service
    TestSuitesService,
    ApiService,
    InfoService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

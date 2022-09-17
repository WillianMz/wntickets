import { ComponentsModule } from './components/components.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxPopperjsModule } from 'ngx-popperjs';
import { AdminComponent } from './layouts/admin/admin.component';
import { NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule,CurrencyMaskInputMode } from "ngx-currency";

  export const customCurrencyMaskConfig = {
    align: "left",
    allowNegative: false,
    allowZero: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: ".",
    nullable: false,
    min: undefined,
    max: undefined,
    inputMode: CurrencyMaskInputMode.FINANCIAL
  };

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      preventDuplicates: true,
      countDuplicates: true
    }),
    NgxPopperjsModule,
    NgxMaskModule.forRoot({dropSpecialCharacters: false}),
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardElementComponent } from './components/board-element/board-element.component';
import { FieldElementComponent } from './components/board-element/field-element/field-element.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardElementComponent,
    FieldElementComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

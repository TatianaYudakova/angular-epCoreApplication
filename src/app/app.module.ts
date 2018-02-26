import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { DocumentsComponent } from './documents/documents.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    DocumentsComponent,
    CategoryCreateComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

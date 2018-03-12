import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { DocumentsComponent } from './documents/documents.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { DocumentCreateComponent } from './document-create/document-create.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    DocumentsComponent,
    CategoryCreateComponent,
    DocumentCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

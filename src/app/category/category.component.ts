import { Component , OnInit } from '@angular/core';
import { Category } from '../category';
import { CATEGORIES } from '../mock-categories';
import { Document } from '../document';
import { DOCUMENTS } from '../mock-documents';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories = CATEGORIES;
  selectedCat: Category;

  documents = DOCUMENTS;
  selectedDoc: Document[] = [];

  constructor() { }

  ngOnInit() {
  }

  onSelect(category: Category): void {
    this.selectedCat = category;
  }

  onShow(category: Category): void {
    this.selectedDoc = this.documents.filter(document => {
      for (let i = 0 ; i < category.id_doc.length; i++) {
        if(document.id == category.id_doc[i]){
          return true;
        }
      }
    });
  }
}

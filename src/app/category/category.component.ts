import { Component , OnInit } from '@angular/core';
import { Category } from '../shared/category';
import { CATEGORIES } from '../shared/mock-categories';
import { Document } from '../shared/document';
import { DOCUMENTS } from '../shared/mock-documents';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {

  categories = CATEGORIES;
  selectedCategory: Category;

  documents = DOCUMENTS;
  selectedDoc: Document[] = [];

  isAddCategory = false;
  isSelectedCategory = false;

  constructor() {}

  ngOnInit() {
  }

  onSelect(category: Category): void {
    this.selectedCategory = category;
    this.isSelectedCategory = true;
  }

  /*onShow(category: Category): void {
    if(category.id_doc != null) {
      this.selectedDoc = this.documents.filter(document => {
        for (let i = 0; i < category.id_doc.length; i++) {
          if (document.id == category.id_doc[i]) {
            return true;
          }
        }
      });
    } else {
      this.selectedDoc = [];
    }
  }*/

  setAddCategoryTrue(category: Category): void {
    this.isAddCategory = true;
    if(category != null) {
      this.selectedCategory = category;
    } else {
      this.selectedCategory = new Category(0, '', 0, false, []);
    }
  }

  onChanged(){
    this.isAddCategory = false;
    this.isSelectedCategory = false;
  }

}

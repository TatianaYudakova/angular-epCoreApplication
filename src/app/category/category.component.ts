import { Component , OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  @Output() onChangedCategory = new EventEmitter();

  categories = CATEGORIES;
  selectedCat: Category;

  documents = DOCUMENTS;
  selectedDoc: Document[] = [];

  addCategory = false;

  constructor() {}

  ngOnInit() {
  }

  onSelect(category: Category): void {
    this.selectedCat = category;
  }

  onShow(category: Category): void {
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
  }

  setAddCatTrue(category: Category): void {
    this.addCategory = true;
    if(category != null) {
      this.selectedCat = category;
    } else {
      this.selectedCat = new Category(0, '', 0, false, []);
    }
  }

  onChanged(){
    this.addCategory = false;
  }

  changeCat(){
    this.onChangedCategory.emit(this.selectedCat);
  }

}

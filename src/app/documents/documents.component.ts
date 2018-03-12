import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../shared/document';
import { DOCUMENTS } from '../shared/mock-documents';
import { Category } from '../shared/category';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  private _category: Category;
  private _isSelectedCategory: boolean;

  isSelected = false;

  @Input() set category(value: Category){
    this._category = value;
    this.selectedDoc = this.documents.filter(document => {
      for (let i = 0; i < value.id_doc.length; i++) {
        if (document.id == value.id_doc[i]) {
          return true;
        }
      }
    });
  }

  get category(): Category {
    return this._category;
  }

  @Input() set isSelectedCategory(value: boolean) {
    this._isSelectedCategory = value;
    this.isSelected = value;
  }

  get isSelectedCategory(): boolean {
    return this._isSelectedCategory;
  }

  documents = DOCUMENTS;
  selectedDoc: Document[] = [];

  isAddDocument = false;

  constructor() { }

  ngOnInit() {
  }

  setAddDocumentTrue() {
    this.isAddDocument = true;
  }

  onChangedDoc() {
    this.isAddDocument = false;
  }
}

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

  private _category: Document;

  @Input() set category(value: Document){
    this._category = value;
  }

  get category(){
    return this._category;
  }

  documents = DOCUMENTS;
  selectedDoc: Document[];

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

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {DocumentService} from "../service/document.service";
import {Document} from "../shared/document";
import {Category} from "../shared/category";

@Component({
  selector: 'app-document-create',
  templateUrl: './document-create.component.html',
  styleUrls: ['./document-create.component.css'],
  providers: [DocumentService]
})
export class DocumentCreateComponent implements OnInit {

  constructor(private documentService: DocumentService) { }

  @Input() isAddDocument: boolean;
  @Output() onChangedDoc = new EventEmitter<boolean>();

  private _category_dc: Category;

  @Input() set category_dc(value: Category){
    this._category_dc = value;
  }

  get category_dc(): Category {
    return this._category_dc;
  }

  documents: Document[] = [];

  nameDocument = '';
  contentDocument = '';

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
  }

  addDocument() {
    this.documentService.addDocument(0, this.nameDocument, this.contentDocument);
    this.category_dc.id_doc.push(this.documents[this.documents.length-1].id);
  }

  closeModal(increased: any) {
    this.isAddDocument = false;
    this.onChangedDoc.emit(true);

    this.nameDocument = '';
    this.contentDocument = '';
  }

}

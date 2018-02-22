import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../document';
import { DOCUMENTS } from '../mock-documents';
import { Category } from '../category';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  @Input() category: Category;

  documents = DOCUMENTS;
  selectedDoc: Document[];

  constructor() { }

  ngOnInit() {
  }

  onShow(category: Category): void {
    for (let i = 0 ; i < category.id_doc.length; i ++) {
      for(let j = 0; j < this.documents.length; j++) {
        if(category.id_doc[i] == this.documents[j].id){
          this.selectedDoc[this.selectedDoc.length] = this.documents[j];
        }
      }
    }
  }

}

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
  @Input() category: Category;

  documents = DOCUMENTS;
  selectedDoc: Document[];

  constructor() { }

  ngOnInit() {
  }

}

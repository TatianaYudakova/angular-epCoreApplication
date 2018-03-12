import { Document } from "../shared/document";
import { DOCUMENTS } from "../shared/mock-documents";

export class DocumentService {

  private index: number;

  getDocuments(): Document[] {
    return DOCUMENTS;
  }

  addDocument(id: number, name: string, content: string) {
    if(id == 0){
      DOCUMENTS.sort(function (a: Document, b: Document) {
        return a.id - b.id;
      });
      DOCUMENTS.push(new Document(DOCUMENTS[DOCUMENTS.length-1].id+1, name, content));
    } else {
      this.index = DOCUMENTS.findIndex(d => {
        return d.id == id;
      });
      DOCUMENTS[this.index] = new Document(id, name, content);
    }
    console.log(DOCUMENTS[DOCUMENTS.length-1]);
  }
}

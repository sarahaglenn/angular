import { EventEmitter, Injectable } from '@angular/core';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './mockdocuments';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  maxDocumentId: number;

  constructor(private http: HttpClient) { }

  getDocuments() {
    this.http
      .get<Document[]>('https://contact-manag-sys-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents || [];

          this.maxDocumentId = this.getMaxId();

          this.documents.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
          this.documentListChangedEvent.next(this.documents.slice())
        },
        (error: any) => {
          console.log(error.message);
        },
      );
  }

  storeDocuments() {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put(
      'https://contact-manag-sys-default-rtdb.firebaseio.com/documents.json',
      this.documents,
      { headers: headers }
    ).subscribe(() => {
      this.documentListChangedEvent.next(this.documents.slice());
    });
  }

  getDocument(id:string): Document {
    return this.documents.find(
      (document: Document) =>
      document.id === id) || null;
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.storeDocuments()
  }

  addDocument(newDocument: Document) {
    if (!newDocument) return;
    this.maxDocumentId++;
    newDocument.id = String(this.maxDocumentId);
    this.documents.push(newDocument);
    this.storeDocuments()
  }

  updateDocument(originalDocument: Document,
                newDocument: Document
  ) {
    if (!originalDocument || !newDocument) return;

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) return;

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }

  getMaxId(): number {
    let maxId = 0;
    this.documents.forEach( (document) => {
      if (parseInt(document.id) > maxId) {
        maxId = parseInt(document.id);
      }
    })
    return maxId;
  }
}

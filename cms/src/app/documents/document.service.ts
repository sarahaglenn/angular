import { EventEmitter, Injectable } from '@angular/core';

import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  // maxDocumentId: number;

  constructor(private http: HttpClient) {}

  getDocuments() {
    this.http.get<{message: String, documents: Document[]}>('http://localhost:3000/documents')
    .subscribe(
      (response) => {
        this.documents = response.documents || [];
        this.sortAndSend();
      },
      (error: any) => {
        console.log(error.message);
      },
    );
  }

  getDocument(id: string): Document {
    return (
      this.documents.find((document: Document) => document.id === id) || null
    );
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.findIndex(d => d.id === document.id);
    if (pos < 0) {
      return;
    }
    this.http.delete('http://localhost:3000/documents/' + document.id)
    .subscribe(
      (response: any) => {
        this.documents.splice(pos, 1);
        this.sortAndSend();
      }
    );
  }

  addDocument(document: Document) {
    if (!document) return;
    document.id = '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<{
        message: String;
        document: Document;
      }>('http://localhost:3000/documents', document, { headers: headers })
      .subscribe((responseData) => {
        this.documents.push(responseData.document);
        this.sortAndSend();
      });
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) return;

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);
    if (pos < 0) return;

    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, {headers: headers })
      .subscribe(
        (response: any) => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
          this.documentSelectedEvent.emit(newDocument);
        }
      );
  }

  sortAndSend() {
    this.documents.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0,
    );

    this.documentListChangedEvent.next(this.documents.slice());
  }
}

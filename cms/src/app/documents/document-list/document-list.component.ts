import { Component, EventEmitter, Output } from '@angular/core';

import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document(
      1,
      'document1',
      'An important document.',
      'documents/document1',
    ),
    new Document(
      2,
      'document2',
      'An very important document.',
      'documents/document2',
    ),
    new Document(
      3,
      'document3',
      'A boring document.',
      'documents/document3',
    ),
    new Document(
      4,
      'document4',
      'An essential document.',
      'documents/document4',
    ),
    new Document(
      5,
      'document5',
      'A really cool document.',
      'documents/document5',
    ),
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}

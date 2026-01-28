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
      'WDD 430 - Week2 Assignment',
      'An important document.',
      'documents/document1',
    ),
    new Document(
      2,
      'WDD 430 - Week1 Assignment',
      'An very important document.',
      'documents/document2',
    ),
    new Document(
      3,
      'CSE 430 - Milestone 1',
      'Another document.',
      'documents/document3',
    ),
    new Document(
      4,
      'CSE 430 - Milestone 2',
      'An essential document.',
      'documents/document4',
    ),
    new Document(
      5,
      'WDD 430 - Week3 Assignment',
      'A really cool document.',
      'documents/document5',
    ),
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}

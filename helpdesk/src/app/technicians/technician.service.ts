import { EventEmitter, Injectable } from '@angular/core';

import { Technician } from './technician.model';
import { map, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TechnicianService {
  private technicians: Technician[] = [];
  technicianListChangedEvent = new Subject<Technician[]>();
  technicianSelectedEvent = new EventEmitter<Technician>();

  constructor(private http: HttpClient) {}

  getTechnicians() {
    return this.http
      .get<{
        message: String;
        technicians: Technician[];
      }>('http://localhost:3000/api/technicians')
      .pipe(
        map((response) => {
          this.technicians = response.technicians || [];
          this.sortAndSend();
          return this.technicians;
        }),
      );
  }

  getTechnician(id: string): Technician {
    return this.technicians.find((technician: Technician) => technician.id === id) || null;
  }

  deleteTechnician(technician: Technician) {
    if (!technician) {
      return;
    }
    const pos = this.technicians.findIndex((c) => c.id === technician.id);
    if (pos < 0) {
      return;
    }
    this.http
      .delete('http://localhost:3000/api/technicians/' + technician.id)
      .subscribe((response: any) => {
        this.technicians.splice(pos, 1);
        this.sortAndSend();
      });
  }

  addTechnician(newTechnician: Technician) {
    if (!newTechnician) return;
    newTechnician.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<{
        message: String;
        technician: Technician;
      }>('http://localhost:3000/api/technicians', newTechnician, { headers: headers })
      .subscribe((responseData) => {
        this.technicians.push(responseData.technician);
        this.sortAndSend();
      });
  }

  updateTechnician(originalTechnician: Technician, newTechnician: Technician) {
    if (!originalTechnician || !newTechnician) return;

    const pos = this.technicians.findIndex((c) => c.id === originalTechnician.id);
    if (pos < 0) return;

    newTechnician.id = originalTechnician.id;
    newTechnician._id = originalTechnician._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put('http://localhost:3000/api/technicians/' + originalTechnician.id, newTechnician, {
        headers: headers,
      })
      .subscribe((response: any) => {
        this.technicians[pos] = newTechnician;
        this.sortAndSend();
        this.technicianSelectedEvent.emit(newTechnician);
      });
  }

  sortAndSend() {
    this.technicians.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0,
    );

    this.technicianListChangedEvent.next(this.technicians.slice());
  }
}

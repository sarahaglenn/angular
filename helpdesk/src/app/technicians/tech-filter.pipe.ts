import { Pipe, PipeTransform } from "@angular/core";
import { Technician } from "./technician.model";

@Pipe({
  name: 'techsFilter',
})
export class TechsFilterPipe implements PipeTransform {
  transform(technicians: Technician[], term: string): Technician[] {
    if (!term || term.length === 0) {
      return technicians;
    }
    const filteredTechs = technicians.filter((tech: Technician) => {
      return tech.name.toLowerCase().includes(term.toLowerCase());
    });
    return filteredTechs.length > 0 ? filteredTechs : [];
  }
}

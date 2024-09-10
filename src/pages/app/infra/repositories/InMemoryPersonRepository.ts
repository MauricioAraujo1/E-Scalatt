import { Person } from '../../domain/entities/Person';
import { PersonRepository } from '../../domain/repositories/PersonRepository';

export class InMemoryPersonRepository implements PersonRepository {
  private people: Person[] = [];

  addPerson(person: Person): void {
    this.people.push(person);
  }

  deletePerson(id: number): void {
    this.people = this.people.filter(person => person.id !== id);
  }

  updatePerson(person: Person): void {
    this.people = this.people.map(p => (p.id === person.id ? person : p));
  }

  getAllPeople(): Person[] {
    return this.people;
  }
}

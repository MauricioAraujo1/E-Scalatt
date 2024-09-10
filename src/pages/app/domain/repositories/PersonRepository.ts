import { Person } from '../entities/Person';

export interface PersonRepository {
    addPerson(person: Person): void;
    deletePerson(id: number): void;
    updatePerson(person: Person): void;
    getAllPeople(): Person[];
  }
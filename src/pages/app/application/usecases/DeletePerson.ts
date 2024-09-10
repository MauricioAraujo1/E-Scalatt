import { PersonRepository } from '../../domain/repositories/PersonRepository';

export class DeletePerson {
  constructor(private personRepository: PersonRepository) {}

  execute(id: number): void {
    this.personRepository.deletePerson(id);
  }
}

import { PersonRepository } from '../../domain/repositories/PersonRepository';

export class GetPeople {
  constructor(private personRepository: PersonRepository) {}

  execute() {
    return this.personRepository.getAllPeople();
  }
}

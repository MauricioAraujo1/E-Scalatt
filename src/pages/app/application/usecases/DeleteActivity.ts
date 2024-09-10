import { ActivityRepository } from '../../domain/repositories/ActivityRepository';

export class DeleteActivity {
  constructor(private activityRepository: ActivityRepository) {}

  execute(id: number): void {
    this.activityRepository.deleteActivity(id);
  }
}

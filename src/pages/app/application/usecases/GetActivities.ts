import { ActivityRepository } from '../../domain/repositories/ActivityRepository';

export class GetActivities {
  constructor(private activityRepository: ActivityRepository) {}

  execute() {
    return this.activityRepository.getAllActivities();
  }
}

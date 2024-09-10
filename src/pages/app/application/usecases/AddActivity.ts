import { Activity } from '../../domain/entities/Activity';
import { ActivityRepository } from '../../domain/repositories/ActivityRepository';

export class AddActivity {
  constructor(private activityRepository: ActivityRepository) {}

  execute(activity: Activity): void {
    this.activityRepository.addActivity(activity);
  }
}

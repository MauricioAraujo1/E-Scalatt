import { Activity } from '../../domain/entities/Activity';
import { ActivityRepository } from '../../domain/repositories/ActivityRepository';

export class InMemoryActivityRepository implements ActivityRepository {
  private activities: Activity[] = [];

  addActivity(activity: Activity): void {
    this.activities.push(activity);
  }

  deleteActivity(id: number): void {
    this.activities = this.activities.filter(activity => activity.id !== id);
  }

  updateActivity(activity: Activity): void {
    this.activities = this.activities.map(a => (a.id === activity.id ? activity : a));
  }

  getAllActivities(): Activity[] {
    return this.activities;
  }
}

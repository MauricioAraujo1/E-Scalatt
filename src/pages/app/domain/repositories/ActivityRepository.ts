import { Activity } from '../entities/Activity';

export interface ActivityRepository {
    addActivity(activity: Activity): void;
    deleteActivity(id: number): void;
    updateActivity(activity: Activity): void;
    getAllActivities(): Activity[];
  }
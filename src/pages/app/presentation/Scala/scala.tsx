import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Person } from '../../domain/entities/Person';
import { Activity } from '../../domain/entities/Activity';
import { InMemoryPersonRepository } from '../../infra/repositories/InMemoryPersonRepository';
import { InMemoryActivityRepository } from '../../infra/repositories/InMemoryActivityRepository';
import { AddPerson } from '../../application/usecases/AddPerson';
import { DeletePerson } from '../../application/usecases/DeletePerson';
import { GetPeople } from '../../application/usecases/GetPeople';
import { AddActivity } from '../../application/usecases/AddActivity';
import { DeleteActivity } from '../../application/usecases/DeleteActivity';
import { GetActivities } from '../../application/usecases/GetActivities';

export function Scala() {
  const personRepository = new InMemoryPersonRepository();
  const activityRepository = new InMemoryActivityRepository();

  const addPerson = new AddPerson(personRepository);
  const deletePerson = new DeletePerson(personRepository);
  const getPeople = new GetPeople(personRepository);

  const addActivity = new AddActivity(activityRepository);
  const deleteActivity = new DeleteActivity(activityRepository);
  const getActivities = new GetActivities(activityRepository);

  const [people, setPeople] = useState<Person[]>(getPeople.execute());
  const [activities, setActivities] = useState<Activity[]>(getActivities.execute());
  const [newPerson, setNewPerson] = useState<Person>({ id: Date.now(), name: '', email: '' });
  const [newActivity, setNewActivity] = useState<Activity>({ id: Date.now(), name: '', weight: '' });

  const handleAddPerson = () => {
    addPerson.execute(newPerson);
    setPeople([...people, newPerson]);
    setNewPerson({ id: Date.now(), name: '', email: '' });
  };

  const handleDeletePerson = (id: number) => {
    deletePerson.execute(id);
    setPeople(people.filter(person => person.id !== id));
  };

  const handleAddActivity = () => {
    addActivity.execute(newActivity);
    setActivities([...activities, newActivity]);
    setNewActivity({ id: Date.now(), name: '', weight: '' });
  };

  const handleDeleteActivity = (id: number) => {
    deleteActivity.execute(id);
    setActivities(activities.filter(activity => activity.id !== id));
  };

  return (
    <div>
      <div className="mt-16 ml-10 flex items-center gap-3 text-lg font-medium text-foreground text-green-800">
        <span className="font-semibold">Escala</span>
      </div>

      <div className="grid min-h-screen">
        <div className="h-full border-r border-foreground/5 p-10 text-muted-foreground flex flex-col justify-between">
          <div className="mt-10 flex items-center gap-3 text-lg font-medium text-foreground text-green-800">
            <span className="font-semibold">Pessoas</span>
            <Button
              onClick={handleAddPerson}
              className="w-0 font-bold text-center h-6 text-lg"
              style={{ borderRadius: 80, background: "#0E2841" }}
            >
              +
            </Button>
          </div>

          {people.map((person, index) => (
            <div key={person.id} className="mt-5 flex items-center gap-2 text-sm font-medium text-foreground">
              <span className="font-semibold">Nome da pessoa {index + 1}:</span>
              <Input
                type="text"
                placeholder="Nome"
                value={person.name}
                onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
                style={{ width: '600px' }}
              />
              <Input
                type="text"
                placeholder="Email"
                value={person.email}
                onChange={(e) => setNewPerson({ ...newPerson, email: e.target.value })}
                style={{ width: '600px', marginLeft: '10px' }}
              />
              <Button
                onClick={() => handleDeletePerson(person.id)}
                className="ml-2 p-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </Button>
            </div>
          ))}

          <div className="mt-10 flex items-center gap-3 text-lg font-medium text-foreground text-green-800">
            <span className="font-semibold">Atividades</span>
            <Button
              onClick={handleAddActivity}
              className="w-0 font-bold text-center h-6 text-lg"
              style={{ borderRadius: 80, background: "#0E2841" }}
            >
              +
            </Button>
          </div>

          {activities.map((activity, index) => (
            <div key={activity.id} className="mt-5 flex items-center gap-2 text-sm font-medium text-foreground">
              <span className="font-semibold">Nome da atividade {index + 1}:</span>
              <Input
                type="text"
                placeholder="Nome"
                value={activity.name}
                onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
                style={{ width: '500px' }}
              />
              <Input
                type="number"
                placeholder="Peso"
                value={activity.weight}
                onChange={(e) => setNewActivity({ ...newActivity, weight: e.target.value })}
                min="0"
                style={{ width: '500px', marginLeft: '10px' }}
              />
              <Button
                onClick={() => handleDeleteActivity(activity.id)}
                className="ml-2 p-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

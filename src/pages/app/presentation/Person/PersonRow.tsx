import { FC } from 'react';
import { Person } from '../../domain/entities/Person';
import { TrashIcon } from '@heroicons/react/20/solid';
import { Input } from '@/components/ui/input';

interface PersonRowProps {
  person: Person;
  index: number;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onDelete: () => void;
}

export const PersonRow: FC<PersonRowProps> = ({ person, index, onNameChange, onEmailChange, onDelete }) => (
  <div className="mt-5 flex items-center gap-2 text-sm font-medium text-foreground">
    <span className="font-semibold">Nome da pessoa {index + 1}:</span>
    <Input
      type="text"
      placeholder="Nome"
      value={person.name}
      onChange={(e) => onNameChange(e.target.value)}
      style={{ width: '600px' }}
    />
    <Input
      type="text"
      placeholder="Email"
      value={person.email}
      onChange={(e) => onEmailChange(e.target.value)}
      style={{ width: '600px', marginLeft: '10px' }}
    />
    <button onClick={onDelete} className="ml-2 p-2 bg-red-500 text-white rounded hover:bg-red-600">
      <TrashIcon className="w-5 h-5" />
    </button>
  </div>
);

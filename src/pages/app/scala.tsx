import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TrashIcon } from '@heroicons/react/20/solid';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from 'axios';
import { optimize } from "../../services/Services"

import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const invoices = [
  { invoice: "Activity 1", paymentStatus: "Paid", totalAmount: "$250.00", paymentMethod: "Credit Card" },
  { invoice: "Activity 2", paymentStatus: "Pending", totalAmount: "$150.00", paymentMethod: "PayPal" },
  { invoice: "Activity 3", paymentStatus: "Unpaid", totalAmount: "$350.00", paymentMethod: "Bank Transfer" },
  { invoice: "Activity 4", paymentStatus: "Paid", totalAmount: "$450.00", paymentMethod: "Credit Card" },
  { invoice: "Activity 5", paymentStatus: "Paid", totalAmount: "$550.00", paymentMethod: "PayPal" }
];

interface Person {
  id: number;
  name: string;
  email: string;
}

interface Activity {
  id: number;
  name: string;
  weight: string;
}

interface Day {
  id: number; 
  name: string;
  quantity: string; 
}

export function Scala() {
  const [pointRestrictions, setPointRestrictions] = useState([]); // Para restrições pontuais
  const [nextDayRest, setNextDayRest] = useState([]); // Para folga no dia seguinte

  const [restrictions, setRestrictions] = useState<any[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [people, setPeople] = useState<Person[]>([{ id: Date.now(), name: '', email: '' }]);
  const [day, setDay] = useState('');

  // State for restrictions
  const [restrictionPeople, setRestrictionPeople] = useState('');
  const [restrictionMaxActivities, setRestrictionMaxActivities] = useState('');
  const [restrictionMinActivities, setRestrictionMinActivities] = useState('');
  const [daysScal, setDaysScal] = useState<Day[]>([{ id: Date.now(), name: '', quantity: '' }]);


  // Add a new days
  const handleAddDay = () => {
    setDaysScal([...daysScal, { id: Date.now(), name: '', quantity: '' }]);
  };

  const handleDayChange = (id: number, value: string) => {
    setDaysScal(daysScal.map(day => (day.id === id ? { ...day, name: value } : day)));
  };

  const handleQuantityChange = (id: number, value: string) => {
    setDaysScal(daysScal.map(day => (day.id === id ? { ...day, quantity: value } : day)));
  };

  const handleDeleteDay = (id: number) => {
    setDaysScal(daysScal.filter(day => day.id !== id));
  };

  

  const handleAddPointRestriction = () => {
    const newRestriction = { id: Date.now() }; // Gera um ID único
    setPointRestrictions((prev) => [...prev, newRestriction]);
  };
  
  const handleAddNextDayRest = () => {
    const newRest = { id: Date.now() }; // Gera um ID único
    setNextDayRest((prev) => [...prev, newRest]);
  };

  const handleDeletePointRestriction = (id) => {
    setPointRestrictions((prev) => prev.filter((restriction) => restriction.id !== id));
  };
  
  const handleDeleteNextDayRest = (id) => {
    setNextDayRest((prev) => prev.filter((rest) => rest.id !== id));
  };
  

  
  // Add a new person
  const handleAddPerson = () => {
    setPeople([...people, { id: Date.now(), name: '', email: '' }]);
  };

  const handleDelete = (id: number) => {
    setPeople(people.filter(person => person.id !== id));
  };

  const handleNameChange = (id: number, value: string) => {
    const updatedPeople = people.map(person =>
      person.id === id ? { ...person, name: value } : person
    );
    setPeople(updatedPeople);
  };

  const handleEmailChange = (id: number, value: string) => {
    const updatedPeople = people.map(person =>
      person.id === id ? { ...person, email: value } : person
    );
    setPeople(updatedPeople);
  };


  // Add a new activity
  const handleAddActivity = () => {
    setActivities([...activities, { id: Date.now(), name: '', weight: '' }]);
  };

  const handleActivityNameChange = (index: number, value: string) => {
    const newActivities = [...activities];
    newActivities[index].name = value;
    setActivities(newActivities);
  };

  const handleActivityWeightChange = (index: number, value: string) => {
    const newActivities = [...activities];
    newActivities[index].weight = value;
    setActivities(newActivities);
  };

  const handleDeleteActivity = (id: number) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  const handleAddRestriction = () => {
    const newRestriction = { id: Date.now(), people: 0 }; // Gera um ID único
    setRestrictions((prev) => [...prev, newRestriction]);
  };
  
  const handleRestrictionChange = (id, value) => {
    setRestrictions((prev) =>
      prev.map((restriction) => (restriction.id === id ? { ...restriction, people: value } : restriction))
    );
  };
  
  const handleDeleteRestriction = (id) => {
    setRestrictions((prev) => prev.filter((restriction) => restriction.id !== id));
  };
  
  const sendDataToBackend = async (data: any) => {
    try {
      const response = await axios.post('http://localhost:5000/optimize', data);
      console.log('Response from server:', response.data);
      return response.data; // Retorne a resposta para manipulação posterior, se necessário
    } catch (error) {
      console.error('Error sending data:', error);
      throw error; // Lança o erro para ser tratado onde a função é chamada
    }
  };

  const handleCalcSubmit = async () => {
    const requestData = {
      days: daysScal.map(day => ({ name: day.name })), // Extrair nomes dos dias
      people: people.map(person => ({ name: person.name, email: person.email })), // Extrair dados das pessoas
      activities: activities.map(activity => ({ name: activity.name, weight: activity.weight })), // Extrair dados das atividades
      restrictions: restrictions.map(restriction => ({
        activity: restriction.activityName, // A propriedade correta para a atividade
        peopleRequired: restriction.people,
      })),
      maxActivities: restrictionMaxActivities,
      minActivities: restrictionMinActivities,
    };
  
    try {
      const response: any = await sendDataToBackend(requestData);
      // Aqui você pode processar a resposta recebida do servidor
    } catch (error) {
      console.error('Failed to submit data:', error);
    }
  };

//   // Handle form submission
// const handleSubmit = () => {
//     // Exibir informações no console
//     console.log('Days:', daysScal);
//     console.log('People:', people);
//     console.log('Activities:', activities);
//     console.log('Max activities per person:', restrictionMaxActivities);
//     console.log('Min activities per person:', restrictionMinActivities);

//     // Configurar restrições dinamicamente
//     setRestrictions([
//       { activity: 'Activity 1', peopleRequired: restrictionPeople },
//       { activity: 'Activity 2', peopleRequired: restrictionPeople }
//     ]);

//     // // Limpar os campos
//     // setDaysScal([{ id: Date.now(), name: '', quantity: '' }]); // Resetando os dias
//     // setPeople([{ id: Date.now(), name: '', email: '' }]); // Resetando as pessoas
//     // setActivities([]); // Resetando atividades
//     // setRestrictionPeople(''); // Resetando restrições
//     // setRestrictionMaxActivities(''); // Resetando restrições
//     // setRestrictionMinActivities(''); // Resetando restrições
//   };


const handleSubmit = () => {
  // Exibir informações no console
  console.log('Days:', daysScal);
  console.log('People:', people);
  console.log('Activities:', activities);
  console.log('Max activities per person:', restrictionMaxActivities);
  console.log('Min activities per person:', restrictionMinActivities);

  // Definir as restrições dinamicamente
  setRestrictions([
      { activity: activities[0]?.name || '', peopleRequired: restrictionPeople },
      { activity: activities[1]?.name || '', peopleRequired: restrictionPeople }
  ]);

  // Configurar as restrições automaticamente
  setRestrictionPeople(1); // Defina o número de pessoas necessárias por atividade
  setRestrictionMaxActivities(3); // Defina o máximo de atividades por pessoa
  setRestrictionMinActivities(1); // Defina o mínimo de atividades por pessoa

  // Limpar os campos, se desejado
  // setDaysScal([{ id: Date.now(), name: '', quantity: '' }]);
  // setPeople([{ id: Date.now(), name: '', email: '' }]);
  // setActivities([]);
  // setRestrictionPeople('');
  // setRestrictionMaxActivities('');
  // setRestrictionMinActivities('');
};

  return (
    <>
      <Helmet title="Scala" />

      <div className="mt-16 ml-10 flex items-center gap-3 text-lg font-medium text-foreground text-green-800">
        <span className="font-semibold">Escala</span>
      </div>

      <div className="grid min-h-screen">
        <div className="h-full border-r border-foreground/5 p-10 text-muted-foreground flex flex-col justify-between">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]"></TableHead>
                <TableHead>Dia 1</TableHead>
                <TableHead>Dia 2</TableHead>
                <TableHead>Dia 3</TableHead>
                <TableHead>Dia 4</TableHead>
                <TableHead>Dia 5</TableHead>
                <TableHead>Dia 6</TableHead>
                <TableHead>Dia 7</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">{invoice.invoice}</TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-10 flex items-center gap-3 text-lg font-medium text-foreground text-green-800">
            <span className="font-semibold">Componentes</span>
          </div>

          <div className="mt-10 flex items-center gap-3 text-sm font-medium text-foreground">
            <span className="font-semibold">1. Quantas pessoas fazem parte dessa escala? </span>
            <Button onClick={handleAddPerson} className="w-0 font-bold text-center justify-items-center h-6 text-lg" type="button" style={{ borderRadius: 80, background: "#0E2841" }}>
              +
            </Button>
          </div>

          {people.map((person, index) => (
            <div key={person.id} className="mt-5 flex items-center gap-2 text-sm font-medium text-foreground">
              <span className="font-semibold">Nome da pessoa {index + 1}:</span>
              <Input type="text" placeholder="Nome" value={person.name} onChange={(e) => handleNameChange(person.id, e.target.value)} style={{ width: '600px' }} />
              <Input type="text" placeholder="Email" value={person.email} onChange={(e) => handleEmailChange(person.id, e.target.value)} style={{ width: '600px', marginLeft: '10px' }} />
              <button onClick={() => handleDelete(person.id)} className="ml-2 p-2 bg-red-500 text-white rounded hover:bg-red-600">
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          ))}

        <div className="mt-10 flex items-center gap-3 text-sm font-medium text-foreground">
          <span className="font-semibold">2. Essa escala é composta por quantos dias?</span>
          <Button onClick={handleAddDay} className="w-0 font-bold text-center justify-items-center h-6 text-lg" type="button" style={{ borderRadius: 80, background: "#0E2841" }}>
            +
          </Button>
        </div>

        {daysScal.map((day, index) => (
          <div key={day.id} className="mt-5 flex items-center gap-2 text-sm font-medium text-foreground">
            <span className="font-semibold">Nome do dia {index + 1}:</span>
            <Input type="text" placeholder="Dia" value={day.name} onChange={(e) => handleDayChange(day.id, e.target.value)} style={{ width: '600px' }} />
            {/* <Input type="text" placeholder="Quantidade" value={day.quantity} onChange={(e) => handleQuantityChange(day.id, e.target.value)} style={{ width: '600px', marginLeft: '10px' }} /> */}
            <button onClick={() => handleDeleteDay(day.id)} className="ml-2 p-2 bg-red-500 text-white rounded hover:bg-red-600">
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
          
          <div key={day} className="mt-5 gap-2 flex items-center text-sm font-medium text-foreground">
            <Input id="day" type="number" placeholder="Dia" value={day} onChange={(e) => setDay(e.target.value)} min="0" style={{ width: '65px', marginLeft: '10px' }} />
          </div>

          <div className="mt-10 flex items-center gap-3 text-sm font-medium text-foreground">
            <span className="font-semibold">3. Quantas atividades devem ser registradas? </span>
            <Button onClick={handleAddActivity} className="w-0 font-bold text-center justify-items-center h-6 text-lg" type="button" style={{ borderRadius: 80, background: "#0E2841" }}>
              +
            </Button>
          </div>

          <div className="mt-5 flex flex-col gap-2 text-sm font-medium text-foreground">
            {activities.map((activity, index) => (
              <div key={activity.id} className="flex items-center gap-2 text-sm font-medium text-foreground">
                <span className="font-semibold">Atividade {index + 1}:</span>
                <Input id={`name-${activity.id}`} type="text" placeholder="Nome" value={activity.name} onChange={(e) => handleActivityNameChange(index, e.target.value)} style={{ width: '500px' }} />
                <Input id={`weight-${activity.id}`} type="number" placeholder="Peso" value={activity.weight} onChange={(e) => handleActivityWeightChange(index, e.target.value)} min="0" style={{ width: '500px', marginLeft: '10px' }} />
                <button onClick={() => handleDeleteActivity(activity.id)} className="ml-2 p-2 bg-red-500 text-white rounded hover:bg-red-600">
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm font-medium text-foreground">
            <Button onClick={handleSubmit} className="w-40 font-bold text-center justify-items-center h-12 text-lg" type="button" style={{ borderRadius: 10, background: "#0E2841" }}>
              Registrar
            </Button>
          </div>

          {/* Restrições */}
          <div className="mt-10 flex items-center gap-3 text-lg font-medium text-foreground text-green-800">
            <span className="font-semibold">Restrições</span>
          </div>

          <div className="mt-10 flex items-center gap-3 text-sm font-medium text-foreground">
            <span className="font-semibold">1. Cada atividade do dia deverá ser cumprida por quantas pessoas?</span>
            <Button onClick={handleAddRestriction} className="w-0 font-bold text-center justify-items-center h-6 text-lg" type="button" style={{ borderRadius: 80, background: "#0E2841" }}>
              +
            </Button>
            <Switch id="switch" />
          </div>

          <div className="mt-5 flex flex-col gap-2 text-sm font-medium text-foreground">
  {restrictions.map((restriction, index) => (
    <div key={restriction.id} className="flex gap-4">
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Atividade</span>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Nome da atividade" />
          </SelectTrigger>
          <SelectContent>
            {activities.map((activity) => {
              const { id, name } = activity;
              return name ? (
                <SelectItem key={id} value={name}>{name}</SelectItem>
              ) : null; // Evitar adicionar item se o nome estiver vazio
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold">#Pessoas</span>
        <Input
          id={`restrictionPeople-${restriction.id}`}
          type="number"
          value={restriction.people}
          onChange={(e) => handleRestrictionChange(restriction.id, e.target.value)}
          min="0"
          style={{ width: '70px' }}
        />
      </div>
      <button onClick={() => handleDeleteRestriction(restriction.id)} className="ml-2 p-2 bg-red-500 text-white rounded hover:bg-red-600">
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  ))}
</div>

          <div className="mt-10 flex items-center gap-3 text-sm font-medium text-foreground">
            <span className="font-semibold">2. Cada pessoa deverá cumprir quantas atividades por dia? </span>
            <Switch id="switch" />
          </div>

          <div className="mt-5 flex flex-col gap-2 text-sm font-medium text-foreground">
            <div className="flex gap-4">
              <div className="flex flex-col gap-1">
                <Input id="maxActivities" type="number" value={restrictionMaxActivities} onChange={(e) => setRestrictionMaxActivities(e.target.value)} min="0" style={{ width: '70px' }} />
                <span className="font-semibold" style={{ marginTop: '10px' }}>No máximo</span>
              </div>
              <div className="flex flex-col gap-1">
                <Input id="minActivities" type="number" value={restrictionMinActivities} onChange={(e) => setRestrictionMinActivities(e.target.value)} min="0" style={{ width: '70px' }} />
                <span className="font-semibold" style={{ marginTop: '10px' }}>No mínimo</span>
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center gap-3 text-sm font-medium text-foreground">
  <span className="font-semibold">3. Há restrições pontuais a serem cumpridas? </span>
  <Button onClick={handleAddPointRestriction} className="w-0 font-bold text-center justify-items-center h-6 text-lg" type="button" style={{ borderRadius: 80, background: "#0E2841" }}>
    +
  </Button>
  <Switch id="switch" />
</div>

<div className="mt-5 flex flex-col gap-2 text-sm font-medium text-foreground">
  {pointRestrictions.map((restriction) => (
    <div key={restriction.id} className="flex gap-4">
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Pessoa</span>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Nome da pessoa" />
          </SelectTrigger>
          <SelectContent>
            {people.map((person) => {
              const { id, name } = person;
              return name ? (
                <SelectItem key={id} value={name}>{name}</SelectItem>
              ) : null; // Evitar adicionar item se o nome estiver vazio
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Atividade</span>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Nome da atividade" />
          </SelectTrigger>
          <SelectContent>
            {activities.map((activity) => {
              const { id, name } = activity;
              return name ? (
                <SelectItem key={id} value={name}>{name}</SelectItem>
              ) : null; // Evitar adicionar item se o nome estiver vazio
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Dia</span>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Dia" />
          </SelectTrigger>
          <SelectContent>
            {daysScal.map((day) => {
              const { id, name } = day;
              return name ? (
                <SelectItem key={id} value={name}>{name}</SelectItem>
              ) : null; // Evitar adicionar item se o nome estiver vazio
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center mt-2">
        <div className="flex items-center mr-2 gap-2 mt-6">Não executa</div>
        <div className="flex flex-col gap-1">
          <span className="font-bold ml-1">Ação</span>
          <Switch id="switch" />
        </div>
        <div className="flex items-center ml-2 gap-2 mt-6">Executa</div>
      </div>
      <div className="mt-6">
        <button onClick={() => handleDeletePointRestriction(restriction.id)} className="ml-2 p-2 bg-red-500 text-white rounded hover:bg-red-600">
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  ))}
</div>

<div className="mt-10 flex items-center gap-3 text-sm font-medium text-foreground">
  <span className="font-semibold">4. Após uma determinada atividade, deverá ser dada folga no dia seguinte? </span>
  <Button onClick={handleAddNextDayRest} className="w-0 font-bold text-center justify-items-center h-6 text-lg" type="button" style={{ borderRadius: 80, background: "#0E2841" }}>
    +
  </Button>
  <Switch id="switch" />
</div>

<div className="flex flex-col gap-1 mt-2">
  {nextDayRest.map((rest) => (
    <div key={rest.id} className="flex gap-4">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Nome da atividade" />
        </SelectTrigger>
        <SelectContent>
          {activities.map((activity) => {
            const { id, name } = activity;
            return name ? (
              <SelectItem key={id} value={name}>{name}</SelectItem>
            ) : null; // Evitar adicionar item se o nome estiver vazio
          })}
        </SelectContent>
      </Select>
      <button onClick={() => handleDeleteNextDayRest(rest.id)} className="ml-2 p-2 bg-red-500 text-white rounded hover:bg-red-600">
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  ))}
</div>

          <div className="mt-5 flex items-center gap-2 text-sm font-medium text-foreground">
            <Button onClick={handleCalcSubmit} className="w-100 font-bold text-center justify-items-center h-12 text-lg" type="button" style={{ borderRadius: 10, background: "#0E2841" }}>
              Calcular escala otimizada
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

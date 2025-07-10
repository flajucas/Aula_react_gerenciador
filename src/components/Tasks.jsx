
import { CheckCheckIcon, CheckIcon, ChevronRightIcon, Trash2Icon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Componente Tasks para exibir uma lista de tarefas, permitindo interação.
 *
 * @param {object} props - As propriedades passadas para o componente.
 * @param {Array<object>} props.tasks - Um array de objetos de tarefa.
 * Cada objeto de tarefa deve ter:
 * - `id`: string | number (único, para a chave do React)
 * - `title`: string (o texto da tarefa)
 * - `isCompleted`: boolean (indica se a tarefa está completa)
 * @param {function(string | number): void} props.onTaskClick - Função de callback
 * chamada quando o botão da tarefa é clicado, passando o ID da tarefa.
 * @param {function(string | number): void} props.onDeleteTaskClick - Função de callback
 * chamada quando o botão de exclusão é clicado, passando o ID da tarefa.
 */
// Desestruturamos as props diretamente para um código mais limpo.
function Tasks({ tasks, onTaskClick, onDeleteTaskClick }) {
  
  const navigate = useNavigate();

  function onSeeDetailsClick(task) {
    const query = new URLSearchParams()
    query.set('title', task.title);
    query.set('description', task.description);
    navigate(`/task?${query.toString()}`);
  }

  return (
    // Contêiner principal da lista de tarefas com estilos Tailwind CSS.
    <ul className="space-y-4 bg-slate-200 rounded-md p-6 shadow">
      
      {tasks.map((task) => (
        <li key={task.id} className='flex items-center gap-2'>
          
          <button
            onClick={() => onTaskClick(task.id)}
            className={`bg-slate-400 text-left flex items-center gap-2 text-white p-2 rounded-md flex-grow
                        ${task.isCompleted ? 'line-through opacity-75' : ''}`}
          >
            {task.isCompleted && <CheckCheckIcon size={15} className='text-green-700'/>}
            {task.title}
          </button>

          <button 
            onClick={() => onSeeDetailsClick(task)}          
            className='bg-slate-400 p-2 rounded-md text-white'>
            <ChevronRightIcon size={15} /> {/* Define um tamanho para o ícone */}
          </button>

          
          <button
            onClick={() => onDeleteTaskClick(task.id)}
            className='bg-red-500 hover:bg-red-600 p-2 rounded-md text-white transition-colors duration-200'
          >
            <Trash2Icon size={15} /> {/* Define um tamanho para o ícone */}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;

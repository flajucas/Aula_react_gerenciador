import { useEffect, useState } from 'react';
import AddTask from './components/AddTask';
import Tasks from './components/Tasks';
import { v4 } from 'uuid';


function App() {
 const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
 );
  /*{
    id: v4(),
    title: 'Estudar programação',
    description: 'Estudar React e Node.js',
    isCompleted: false
  },
  {
    id: v4(),
    title: 'Ler livros',
    description: 'Ler livros por 1 hora',
    isCompleted: false
  },
  {
    id: v4(),
    title: 'Estudar ingles',
    description: 'Estudar ingles por 30 minutos',
    isCompleted: false
  }
]);*/
useEffect(() => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}, [tasks]);

useEffect(() => {
    async function fetchTasks() {

    const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos?_limit=10',
      {
      method: 'GET'
      });

      const data = await response.json();
      
      setTasks(data);
    }

    //fetchTasks();
  
}, []);

function onAddTask(title, description) {
    const newTask = {
      // Gera um ID simples baseado no timestamp para garantir unicidade (para este exemplo).
      // Em uma aplicação real, você usaria uma biblioteca como 'uuid' ou IDs de banco de dados.
      id: Date.now(),
      title,
      description,
      isCompleted: false
    };
    // Atualiza o estado 'tasks' adicionando a nova tarefa.
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title: title,
      description: description,
      isCompleted: false
    };
    setTasks([...tasks, newTask]);
  }

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      // PRECISO ATUALIZAR ESSA TAREFA
      if (task.id === taskId) {
        return {...task, isCompleted: !task.isCompleted };
      }
      // NÃO PRECISO ATUALIZAR ESSA TAREFA
      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }
 
  return (
    <div className='w-screen h-screen bg-slate-500 flex justify-center p-6'>
     <div className='w-[500px] space-y-4'>
      <h1 className="text-3xl text-slate-100 font-bold text-center">
        Gerenciador de Tarefas
      </h1>

     <AddTask onAddTask={onAddTask}
     onAddTaskSubmit={onAddTaskSubmit}/>
     <Tasks tasks={tasks}
     onTaskClick={onTaskClick}
     onDeleteTaskClick={onDeleteTaskClick} />
     </div>
    </div>
  );


}

export default App;
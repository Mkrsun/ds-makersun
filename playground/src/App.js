import './App.css';
import { useState } from 'react';
import {
  Greeting,
  Tabs,
  TaskList,
  MoveHand as MoveHandIcon,
  CompleteTasks as CompletTaskIcon,
} from '@ds-makersun/dozen';

const tasks = [
  {
    id: '1',
    label: 'Escribir a gaitero del grupo musical',
    state: 'active',
  },
  {
    id: '2',
    label: 'Ir a buscar mi salud a donde la perdí',
    state: 'new',
  },
  {
    id: '3',
    label: 'Liberarme de la pasión',
    state: 'active',
  },
];

function App() {
  const [taskListState, setTaskListState] = useState('complete-tasks');
  return (
    <div>
      <Greeting label="Bienvenido 👋 Manuel Martínez" width={200} />

      <div style={{ padding: '2rem' }} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingRight: '1rem',
        }}
      >
        <MoveHandIcon
          style={{ marginRight: '0.5rem' }}
          onClick={() => setTaskListState('reorder')}
          isActive={taskListState === 'reorder'}
        />
        <CompletTaskIcon
          onClick={() => setTaskListState('complete-tasks')}
          isActive={taskListState === 'complete-tasks'}
        />
      </div>

      <Tabs options={['To do', 'Done', 'Summary']}>
        <div>
          <TaskList tasks={tasks} state={taskListState} />
        </div>
        <div>Tab two</div>
        <div>Tab three</div>
      </Tabs>
    </div>
  );
}

export default App;

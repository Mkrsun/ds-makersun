import { useEffect, useState, useRef } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';

import Pill from '../../atoms/Pill';
import TaskHome from '../../molecules/TaskHome';
import './TaskList.scss';

export type TaskEntity = {
  id: string;
  label: string;
  state: 'new' | 'active' | 'completed' | string;
  isDragging: boolean;
};

export interface TaskListProps {
  className?: string;
  ariaLabel?: string;
  tasks?: TaskEntity[];
  state?: 'complete-tasks' | 'reorder';
}

const TaskList: React.FC<TaskListProps> = ({
  className = '',
  ariaLabel,
  tasks,
  state = 'complete-tasks',
}) => {
  const [orderedTasks, setOrderedTasks] = useState(tasks);
  const refs = useRef<{ [key: string]: HTMLDivElement | null }>({}).current;
  const [positionPerIndex, setPositionPerIndex] = useState<number[]>([]);

  useEffect(() => {
    const newPositionPerIndex =
      orderedTasks?.map(
        (task) => (refs[task.id]?.clientHeight ?? 20) / 2 - 20
      ) ?? [];
    setPositionPerIndex(newPositionPerIndex);
  }, [refs, orderedTasks]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newItems = Array.from(orderedTasks ?? []);
    const [movedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, movedItem);

    setOrderedTasks(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lista-tareas">
        {(providedDroppable) => (
          <div
            ref={providedDroppable.innerRef}
            data-testid={`ds-makersun-dozen-task-list-container`}
            aria-label={ariaLabel}
            tabIndex={0}
            {...providedDroppable.droppableProps}
          >
            {orderedTasks?.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id}
                index={index}
                isDragDisabled={state !== 'reorder'}
              >
                {(providedDraggable, snapshotDraggable) => {
                  const draggableRef = providedDraggable!
                    .innerRef! as unknown as React.MutableRefObject<HTMLDivElement>;
                  return (
                    <div
                      ref={(element) => {
                        refs[task.id] = element;
                        providedDraggable.innerRef(element);
                      }}
                      {...providedDraggable.draggableProps}
                      {...providedDraggable.dragHandleProps}
                      style={{
                        ...providedDraggable.draggableProps.style,
                        display: 'flex',
                        top: `${
                          draggableRef.current?.clientHeight * index + 30
                        }px`,
                      }}
                    >
                      <div className="order-number-relative">
                        <Pill
                          className="order-number-absolute"
                          type="mini"
                          value={snapshotDraggable.isDragging ? '?' : index + 1}
                          style={{
                            top: `${positionPerIndex[index] ?? 0}px`,
                          }}
                        />
                      </div>

                      <TaskHome
                        key={task?.id ?? index}
                        label={task.label}
                        gesturesEnabled={state === 'complete-tasks'}
                      />
                    </div>
                  );
                }}
              </Draggable>
            ))}
            {providedDroppable.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;

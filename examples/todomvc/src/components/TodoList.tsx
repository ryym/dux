import * as React from 'react';
// import connect from '../connect';
import TodoItem from './TodoItem';
// import Footer from './Footer';
import Todo from '../lib/Todo';
import { TodoCounts } from '../lib/todo-counts'

type Props = {
  todos: Todo[],
  filter: string,
  editedId?: number,
  counts: TodoCounts,

  // XXX: too many callbacks
  updateTodo: (id: number, title: string) => void,
  deleteTodo: (id: number) => void,
  deleteCompleted: () => void,
  changeFilter: (filter: string) => void,
  toggleCompleted: (id: number) => void,
  toggleCompletedAll: () => void,
  startEditing: (id: number) => void,
  finishEditing: () => void,
}

export default class TodoList extends React.Component<Props> {
  handleShow = (filter: string) => {
    this.props.changeFilter(filter);
  }

  handleTodoSave = (id: number, title: string) => {
    if (title.length === 0) {
      this.props.deleteTodo(id);
    }
    else {
      this.props.updateTodo(id, title);
    }
    this.props.finishEditing();
  }

  // renderToggleAll(toggleCompletedAll: () => void, counts: TodoCounts) {
  //   if (counts.all > 0) {
  //     return (
  //       <input
  //         className="toggle-all"
  //         type="checkbox"
  //         checked={counts.active === 0}
  //         onChange={toggleCompletedAll}
  //       />
  //     );
  //   }
  // }

  // renderFooter(filter: string, counts: TodoCounts, deleteCompleted: () => void) {
  //   if (counts.all) {
  //     return (
  //       <Footer
  //         completedCount={counts.completed}
  //         activeCount={counts.active}
  //         filter={filter}
  //         onClearCompleted={deleteCompleted}
  //         onShow={this.handleShow}
  //       />
  //     );
  //   }
  // }

  render() {
    const { filter, counts, todos, editedId, ...props } = this.props;

    return (
      <ul className="todo-list">
        {todos.map(todo =>
          <TodoItem
            key={todo.id}
            todo={todo}
            editing={todo.id === editedId}
            onDeleteClick={props.deleteTodo}
            onCompletedToggle={props.toggleCompleted}
            onEditStart={props.startEditing}
            onEditEnd={this.handleTodoSave}
          />
        )}
      </ul>
    );
  }
}

// const propsMapper = ({ inputs, todoList, getFilteredTodos }: AppState) => {
//   const toggleCompletedAll = (): void => {
//     const counts = todoList.getTodoCounts();
//     if (counts.all > 0) {
//       const allCompleted = counts.active === 0;
//       todoList.$toggleCompletedAll(!allCompleted);
//     }
//   };

//   return (): MainSectionProps => ({
//     todos: getFilteredTodos(),
//     filter: inputs.getCurrentFilter(),
//     editedId: inputs.getEditedId(),
//     changeFilter: inputs.$changeFilter,
//     startEditing: inputs.$startEditing,
//     finishEditing: inputs.$finishEditing,
//     counts: todoList.getTodoCounts(),
//     updateTodo: todoList.$updateTodo,
//     deleteTodo: todoList.$deleteTodo,
//     deleteCompleted: todoList.$deleteCompleted,
//     toggleCompleted: todoList.$toggleCompleted,
//     toggleCompletedAll,
//   });
// };

// export default connect(MainSection, { propsMapper });

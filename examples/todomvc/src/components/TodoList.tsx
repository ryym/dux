import * as React from 'react';
import { connect } from '../dux-react';
import { Dispatch } from '../dux'
import { State } from '../store'
import TodoItem from './TodoItem';
import Todo from '../lib/Todo';
import {
  getFilteredTodos,
  DeleteTodo,
  UpdateTodo,
  ToggleCompleted,
} from '../store/todos'
import {
  StartEditing,
  FinishEditing,
} from '../store/input'

type Props = {
  todos: Todo[],
  filter: string,
  editedId: number | null,
  dispatch: Dispatch<State>,

  // XXX: too many callbacks
  // updateTodo: (id: number, title: string) => void,
  // deleteTodo: (id: number) => void,
  // deleteCompleted: () => void,
  // changeFilter: (filter: string) => void,
  // toggleCompleted: (id: number) => void,
  // toggleCompletedAll: () => void,
  // startEditing: (id: number) => void,
  // finishEditing: () => void,
}

export class TodoList extends React.Component<Props> {
  render() {
    const { filter, todos, editedId } = this.props;

    return (
      <ul className="todo-list">
        {todos.map(todo =>
          <TodoItem
            key={todo.id}
            todo={todo}
            editing={todo.id === editedId}
            onDeleteClick={this.deleteTodo}
            onCompletedToggle={this.toggleCompleted}
            onEditStart={this.startEditing}
            onEditEnd={this.updateOrDelete}
          />
        )}
      </ul>
    );
  }

  deleteTodo = (id: number) => this.props.dispatch(DeleteTodo(id))
  toggleCompleted = (id: number) => this.props.dispatch(ToggleCompleted(id))
  startEditing = (id: number) => this.props.dispatch(StartEditing(id))

  // XXX: どうするのがいいのか
  //   1. props として各関数を受け取って呼び出すだけ
  //   2. dispatch だけ受け取って後は内部でやっちゃう
  //   3. この場合分けを包んだ command を用意する
  // 1 が一番きれいだとは思うけど、渡す関数を変えて再利用するようなケースじゃなければ、
  // ロジックはStoreにまかせて dispatch だけする 2 でも別におかしくはない。
  // 3 もロジックが微妙にViewに属している気がして何ともいえない。
  updateOrDelete = (id: number, title: string) => {
    const { dispatch } = this.props
    if (title.length === 0) {
      dispatch(DeleteTodo(id))
    } else {
      dispatch(UpdateTodo({ id, title }))
    }
    dispatch(FinishEditing())
  }
}

export default connect(TodoList, {
  mapProps: dispatch => (state: State) => ({
    dispatch,
    todos: getFilteredTodos(state),
    filter: state.filter, 
    editedId: state.editedId,
  })
})

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

import * as React from 'react';
import TodoTextInput from './TodoTextInput';

type Props = {
  // addTodo: (title: string) => void
}

// App, TodoList を connect する
// TodoList を dump にすると
// たくさんコールバックを渡さないといけないので。

export default function App() {
  return (
    null

    // <div>
    //   <Header />
    //   <section class="main">
    //     {counts.all > 0 && (
    //       <input
    //         className="toggle-all"
    //         type="checkbox"
    //         checked={counts.active === 0}
    //         onChange={toggleCompletedAll}
    //       />
    //     )}
    //     <TodoList />
    //     {counts.all > 0 && (
    //       <Footer
    //         completedCount={counts.completed}
    //         activeCount={counts.active}
    //         filter={filter}
    //         onClearCompleted={deleteCompleted}
    //         onShow={this.handleShow}
    //       />
    //     )}
    //     <Footer />
    //   </section>
    // </div>
  )
}

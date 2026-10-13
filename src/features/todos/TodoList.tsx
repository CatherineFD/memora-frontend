import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { todoDeleted, todoToggled } from "./todosSlice";

export function TodoList() {
    const dispatch = useAppDispatch()

    const todos = useAppSelector((state) => state.todos.items)
    const filter = useAppSelector((state) => state.todos.filter)

    const visibleTodos = todos.filter((todo) => {
        if (filter === 'active') {
            return !todo.completed
        } 

        if (filter === 'completed') {
            return todo.completed
        }

        return true
    })

    return (
        <ul>
            {visibleTodos.map((todo) => (
                <li key={todo.id}>
                <label>
                    <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => dispatch(todoToggled(todo.id))}
                    />

                    <span>{todo.title}</span>
                </label>

                <button onClick={() => dispatch(todoDeleted(todo.id))}>
                    Удалить
                </button>
                </li>
            ))}
        </ul>
    )
}
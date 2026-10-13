import { useState, type FormEvent } from "react";
import { useAppDispatch } from "../../app/hooks";
import { todoAdded } from "./todosSlice";

/**
 * TODO 
 * - есть ли какие-то нюансы использования стрелочных функций во vue, теряется ли контекст и так далее
 * - как работает dispatch
 */

export function TodoForm() {
    const [title, setTitle] = useState('');
    const dispatch = useAppDispatch();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const normalizedTitle = title.trim();
        if (!normalizedTitle) return;

        dispatch(todoAdded(normalizedTitle))
        setTitle('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Новая задача"
            />

            <button type="submit">Добавить</button>
        </form>
    )
}
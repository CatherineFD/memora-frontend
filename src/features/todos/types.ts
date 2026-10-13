export interface Todo {
  id: string
  title: string
  completed: boolean
}

export type TodoFilter = 'all' | 'active' | 'completed'

export interface TodosState {
  items: Todo[]
  filter: TodoFilter
}
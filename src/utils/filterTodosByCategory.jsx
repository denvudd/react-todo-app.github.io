export function filterTodosByCategory(todos, category) {
  return todos.filter((item) => item.category === category);
}
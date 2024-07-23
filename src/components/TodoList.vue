<template>
  <div class="space-y-2">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      :toggle-complete="toggleComplete"
      :remove-todo="removeTodo"
      :update-todo-text="updateTodoText"
    />
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue';

export default {
  name: 'TodoList',
  components: {
    TodoItem
  },
  props: {
    todos: Array,
    toggleComplete: Function,
    removeTodo: Function,
  },
  methods: {
    updateTodoText(id, newText) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.text = newText;
      }
    }
  }
}
</script>
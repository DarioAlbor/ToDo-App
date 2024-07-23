<template>
  <div class="flex items-center justify-between p-2 border-b border-gray-200">
    <div class="flex items-center">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="toggleComplete(todo.id)"
        class="mr-2"
      />
      <input
        v-if="editingTodo"
        v-model="todoText"
        @blur="saveTodoName"
        @keyup.enter="saveTodoName"
        class="flex-1 border p-1 text-black bg-white mr-2"
        autofocus
      />
      <span v-else :class="{ 'line-through': todo.completed }">{{ todo.text }}</span>
    </div>
    <div class="flex items-center">
      <button @click="editTodoName" class="text-blue-500 mr-2">
        <font-awesome-icon :icon="['fas', 'pencil-alt']" />
      </button>
      <button @click="removeTodo(todo.id)" class="text-red-500">
        <font-awesome-icon :icon="['fas', 'trash']" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: Object,
    toggleComplete: Function,
    removeTodo: Function,
    updateTodoText: Function
  },
  data() {
    return {
      editingTodo: false,
      todoText: this.todo.text
    };
  },
  methods: {
    editTodoName() {
      this.editingTodo = true;
    },
    saveTodoName() {
      this.editingTodo = false;
      if (this.todoText.trim() === '') {
        this.todoText = this.todo.text;
      } else {
        this.updateTodoText(this.todo.id, this.todoText);
      }
    }
  }
}
</script>
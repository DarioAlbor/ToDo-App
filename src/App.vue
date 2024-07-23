<template>
  <div class="h-screen flex">
    <MenuCategory
      :default-categories="categories"
      :custom-categories="customCategories"
      :selected-category="selectedCategory"
      @select-category="selectCategory"
      @add-category="addCategory"
      @edit-category="editCategory"
      class="flex-none w-64"
    />
    <div class="flex-1 flex flex-col">
      <div class="flex-1 p-4 overflow-y-auto">
        <h1 class="text-2xl font-bold mb-4">To-Do List</h1>
        <TodoList
          :todos="currentCategoryTasks"
          :toggle-complete="toggleComplete"
          :remove-todo="removeTodo"
          :update-todo-text="updateTodoText"
        />
      </div>
      <div class="p-4 bg-gray-100">
        <div class="flex items-center border p-2 w-full bg-white">
          <input
            type="text"
            v-model="newTodo"
            @keyup.enter="addTodo"
            placeholder="Add a new task..."
            class="flex-1 p-2"
          />
          <button @click="addTodo" class="ml-2 p-2 bg-blue-500 text-white flex items-center">
            <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" />
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import TodoList from './components/TodoList.vue'
import MenuCategory from './components/MenuCategory.vue'

export default {
  name: 'App',
  components: {
    TodoList,
    MenuCategory
  },
  data() {
    return {
      newTodo: '',
      selectedCategory: 'Mi día',
      categories: [
        { name: 'Mi día', id: 'Mi día', tasks: [], icon: ['fas', 'sun'] },
        { name: 'Importante', id: 'Importante', tasks: [], icon: ['fas', 'exclamation'] },
        { name: 'Asignado a mí', id: 'Asignado a mí', tasks: [], icon: ['fas', 'user'] },
        { name: 'Tareas', id: 'Tareas', tasks: [], icon: ['fas', 'book'] },
      ],
      customCategories: [],
    }
  },
  computed: {
    allCategories() {
      return [...this.categories, ...this.customCategories];
    },
    currentCategoryTasks() {
      const category = this.allCategories.find(cat => cat.id === this.selectedCategory);
      return category ? category.tasks : [];
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() === '') return;
      const category = this.allCategories.find(cat => cat.id === this.selectedCategory);
      if (category) {
        category.tasks.push({
          id: uuidv4(),
          text: this.newTodo,
          completed: false
        });
      }
      this.newTodo = '';
    },
    toggleComplete(id) {
      const category = this.allCategories.find(cat => cat.id === this.selectedCategory);
      const todo = category.tasks.find(todo => todo.id === id);
      if (todo) todo.completed = !todo.completed;
    },
    removeTodo(id) {
      const category = this.allCategories.find(cat => cat.id === this.selectedCategory);
      category.tasks = category.tasks.filter(todo => todo.id !== id);
    },
    selectCategory(categoryId) {
      this.selectedCategory = categoryId;
    },
    addCategory(newCategory) {
      this.customCategories.push(newCategory);
      this.selectCategory(newCategory.id);
    },
    editCategory(id, newName) {
      const category = this.customCategories.find(cat => cat.id === id);
      if (category) {
        category.name = newName;
      }
    },
    updateTodoText(id, newText) {
      const category = this.allCategories.find(cat => cat.id === this.selectedCategory);
      const todo = category.tasks.find(todo => todo.id === id);
      if (todo) {
        todo.text = newText;
      }
    }
  }
}
</script>

<style>
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}
</style>
<template>
  <div class="h-full bg-gray-100 p-4 flex flex-col justify-between">
    <div>
      <div
        v-for="category in defaultCategories"
        :key="category.id"
        class="flex justify-between items-center mb-4 p-2 cursor-pointer"
        :class="{ 'bg-blue-500 text-white': category.id === selectedCategory }"
        @click="selectCategory(category.id)"
      >
        <div class="flex items-center w-full">
          <font-awesome-icon :icon="category.icon" class="mr-2" />
          <span>{{ category.name }}</span>
          <span class="ml-auto">{{ category.tasks.length }}</span>
        </div>
      </div>

      <hr class="my-4">

      <div
        v-for="category in customCategories"
        :key="category.id"
        class="flex justify-between items-center mb-4 p-2 cursor-pointer"
        :class="{ 'bg-blue-500 text-white': category.id === selectedCategory }"
        @click="selectCategory(category.id)"
      >
        <div class="flex items-center w-full">
          <font-awesome-icon icon="pencil-alt" v-if="editingCategory === category.id" class="mr-2" />
          <input
            v-if="editingCategory === category.id"
            v-model="category.name"
            @blur="saveCategoryName(category)"
            @keyup.enter="saveCategoryName(category)"
            @input="limitCategoryNameLength(category)"
            class="flex-1 border p-1 text-black bg-white"
            style="max-width: calc(100% - 2rem);"
            autofocus
          />
          <span v-else>{{ category.name }}</span>
        </div>
        <div class="flex items-center">
          <span>{{ category.tasks.length }}</span>
          <font-awesome-icon icon="pencil-alt" class="ml-2 cursor-pointer" @click.stop="editCategoryName(category.id)" />
        </div>
      </div>
    </div>

    <div>
      <hr class="my-4">
      <div class="flex justify-between items-center cursor-pointer" @click="addCategory">
        <span>Nueva categoría</span>
        <font-awesome-icon icon="plus" />
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'MenuCategory',
  props: {
    defaultCategories: Array,
    customCategories: Array,
    selectedCategory: String,
  },
  data() {
    return {
      editingCategory: null,
    };
  },
  methods: {
    selectCategory(categoryId) {
      this.$emit('select-category', categoryId);
    },
    addCategory() {
      const newCategory = {
        id: uuidv4(),
        name: 'Nueva categoría',
        tasks: [],
        icon: ['fas', 'folder']
      };
      this.$emit('add-category', newCategory);
      this.editingCategory = newCategory.id;
    },
    editCategoryName(categoryId) {
      this.editingCategory = categoryId;
    },
    saveCategoryName(category) {
      if (category.name.trim() === '') {
        category.name = 'Nueva categoría';
      }
      this.$emit('edit-category', category.id, category.name);
      this.editingCategory = null;
    },
    limitCategoryNameLength(category) {
      if (category.name.length > 20) {
        category.name = category.name.slice(0, 20);
      }
    },
  }
}
</script>
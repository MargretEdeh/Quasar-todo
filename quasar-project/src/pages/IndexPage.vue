<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input
        class="col"
        v-model="newTask"
        placeholder="Add an adventure"
        square
        bg-color="white"
        dense
        @keyup.enter="addTask"
      >
        <template v-slot:append>
          <q-btn @click="addTask" round dense flat icon="add" />
        </template>
      </q-input>
    </div>
    <q-list class="bg-white" separator bordered>
      <div v-if="todos && todos.length">
        <q-item
          v-for="(todo) in todos"
          :key="todo.id"
          @click="toggleTodoDone(todo)"
          :class="{ 'done bg-blue-1': todo.done }"
          clickable=""
          tag="label"
          v-ripple
        >
          <q-item-section avatar>
            <q-checkbox v-model="todo.done" color="teal" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ todo.title }}</q-item-label>
          </q-item-section>
          <q-item-section v-if="todo.done" avatar>
            <q-icon
              @click="confirmDelete(todo.id)"
              name="delete"
              color="red"
              size="2rem"
            />
          </q-item-section>
        </q-item>
      </div>
      <div v-else>
        Loading todos...
      </div>
    </q-list>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="red" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to delete this todo?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="negative" @click="deleteTodo" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div v-if="!todos || !todos.length" class="no-task absolute-center">
      <q-icon name="check" color="primary" size="70px" />
      No Tasks
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { getDatabase, ref as firebaseRef, push, onValue, set } from 'firebase/database';
import {database } from '../../src/boot/firebase';

export default defineComponent({
  name: "IndexPage",
  setup() {
    const $q = useQuasar();
    const newTask = ref(null);
    const todos = ref([]);
    const confirm = ref(false);
    let todoToDeleteId = null;

    const toggleTodoDone = (todo) => {
      todo.done = !todo.done;
      updateTodoInFirebase(todo);
    };

    const confirmDelete = (id) => {
      todoToDeleteId = id;
      confirm.value = true;
    };

    const deleteTodo = () => {
      const todoRef = firebaseRef(database, `todos/${todoToDeleteId}`);
      set(todoRef, null);
      confirm.value = false;
      $q.notify("Todo deleted");
    };


    const addTask = () => {
      if (newTask.value) {
        const newTodo = {
          title: newTask.value,
          done: false,
        };
        const todosRef = firebaseRef(database, 'todos');
        push(todosRef, newTodo);
        newTask.value = "";
      }
    };

    const updateTodoInFirebase = (todo) => {
      const todoRef = firebaseRef(database, `todos/${todo.id}`);
      set(todoRef, todo);
    };

    onMounted(() => {
      const todosRef = firebaseRef(database, 'todos');

      const previousListener = onValue(todosRef, () => {});
      previousListener();
      onValue(todosRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const todoArray = Object.keys(data).map((id) => {
            return { ...data[id], id };
          });
          todos.value = todoArray;
        } else {
          todos.value = [];
        }
      });
    });

    return {
      confirm,
      newTask,
      toggleTodoDone,
      confirmDelete,
      deleteTodo,
      addTask,
      todos,
    };
  },
});
</script>

<style scoped lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: #bbb;
  }
}
.no-task {
  opacity: 0.5;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  color: #086491;
}
</style>

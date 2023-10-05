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
      <q-item
        v-for="(todo, i) in todos"
        :key="todo.title"
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
            @click="confirmDelete(i)"
            name="delete"
            color="red"
            size="2rem"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Move q-dialog outside q-item -->
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="red" text-color="white" />
          <span class="q-ml-sm"
            >Are you sure you want to delete this todo?</span
          >
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="negative" @click="deleteTodo" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div v-if="!todos.length" class="no-task  absolute-center">
      <q-icon
      name="check"
      color="primary"
      size="70px"
      />
      No Tasks
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "IndexPage",
  setup() {
    const $q = useQuasar();
    const newTask = ref(null);
    const todos = ref([
      // {
      //   title: "shop in Paris",
      //   done: false,
      // },
      // {
      //   title: "Take pictures at the eiffel tower",
      //   done: false,
      // },
      // {
      //   title: "try out a french cuisine",
      //   done: false,
      // },
    ]);

    const confirm = ref(false);
    let todoToDeleteIndex = null;

    const toggleTodoDone = (todo) => {
      todo.done = !todo.done;
    };

    const confirmDelete = (i) => {
      todoToDeleteIndex = i;
      confirm.value = true;
    };

    const deleteTodo = () => {
      todos.value.splice(todoToDeleteIndex, 1);
      confirm.value = false;
      $q.notify("Todo deleted");
    };
    const addTask = () => {
  if (newTask.value) {
    todos.value.push({
      title: newTask.value,
      done: false,
    });
    newTask.value = "";
  }
};


    return {
      confirm,
      todos,
      newTask,
      toggleTodoDone,
      confirmDelete,
      deleteTodo,
      addTask
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
.no-task{
  opacity: 0.5;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  color: #086491;

}
</style>

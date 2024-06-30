<template>
  <div>
    <div v-if="error" class="alert alert-danger my-2" role="alert">
      {{ error }}
    </div>
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="addTask" class="mb-3">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              v-model="newTask"
              placeholder="Enter a Task"
            />
            <button type="submit" class="btn btn-primary" :disabled="loading">
              Add task
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axiosCustom from "@/models/axios";
import { defineComponent } from "vue";
import { TaskProps } from "../models/types";

export default defineComponent({
  data() {
    return {
      newTask: "",
      loading: false,
      error: "",
    };
  },
  props: {
    tasks: {
      type: Array as () => TaskProps[],
    },
  },
  methods: {
    async addTask() {
      this.loading = true;
      this.error = "";
      try {
        const response = await axiosCustom.post("/api/addTask", {
          title: this.newTask,
        });
        console.log(response.data);
        this.tasks?.push(response.data);
        this.newTask = "";
      } catch (error: any) {
        this.error = error?.response?.data.error;
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style>
</style>
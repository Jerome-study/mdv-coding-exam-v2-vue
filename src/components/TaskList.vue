<template>
  <div>
    <h4 class="text-secondary" v-if="tasks.length === 0">No Task</h4>
    <ul class="list-group">
      <li class="list-group-item mb-3" v-for="task in tasks" :key="task.id">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <span>{{ task.title }}</span>
          </div>
          <div>
            <button :disabled="loading" class="btn btn-danger btn-sm me-2" @click="deleteTask(task.id)">Delete</button>
            <button :disabled="loading" class="btn btn-sm" :class="{'btn-success': task.status, 'btn-outline-primary': !task.status}" @click="updateTask(task)">
              {{ task.status ? 'Mark Undone' : 'Mark Done' }}
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import axiosCustom from '@/models/axios';
import { defineComponent } from 'vue';
import { TaskProps } from "../models/types";
export default defineComponent({
  data() {
    return {
      loading : false
    }
  },
  props: {
    tasks: {
      type: Array as () => TaskProps[],
    },
  },
  emits: ['task-deleted'],
  methods: {
    async updateTask(task: TaskProps) {
      this.loading = true
      try {
        await axiosCustom.put("/api/updateTask/" + task.id);
        task.status = !task.status
      } catch(error : any) {
        console.log(error.response.data);
      } finally {
        this.loading = false
      }
    },
    async deleteTask(task_id : string) {
      this.loading = false
      try {
        await axiosCustom.delete("/api/deleteTask/" + task_id)
        this.$emit('task-deleted', task_id)
      } catch(error : any) {
        console.log(error?.response?.data?.error);
      } finally {
        this.loading = false
      }
    }
  },
});
</script>

<style>
</style>
<template>
  <div
    class="flex items-center gap-4 text-base box-border p-2 bg-hex-[#f5f5f5] border-b-2 border-gray-200"
  >
    <button
      class="px-3 py-2 cursor-pointer hover:text-blue-500"
      @click="execCommand('bold')"
    >
      {{ "B" }}
    </button>
    <button
      class="px-3 py-2 cursor-pointer hover:text-blue-500"
      @click="execCommand('italic')"
    >
      {{ "I" }}
    </button>
    <button
      class="px-3 py-2 cursor-pointer hover:text-blue-500"
      @click="execCommand('underline')"
    >
      {{ "U" }}
    </button>
    <button
      class="px-3 py-2 cursor-pointer hover:text-blue-500"
      @click="insertLink"
    >
      {{ "#" }}
    </button>
    <button class="px-3 py-2 cursor-pointer hover:text-blue-500" @click="undo">
      {{ "↩" }}
    </button>
    <button class="px-3 py-2 cursor-pointer hover:text-blue-500" @click="redo">
      {{ "↪" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { RichEditor } from "@/core/Editor";

defineProps<{
  editor: InstanceType<typeof RichEditor>;
}>();

const execCommand = (cmd: string) => {
  document.execCommand(cmd);
};

const insertLink = () => {
  const url = prompt("输入链接地址:");
  if (url) {
    document.execCommand("createLink", false, url);
  }
};

const undo = () => {
  document.execCommand("undo");
};
const redo = () => {
  document.execCommand("redo");
};
</script>

<style scoped lang="less"></style>

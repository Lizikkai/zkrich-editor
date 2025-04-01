<template>
  <div class="rounded-sm border border-solid border-1 min-w-[850px]">
    <Toolbar :editor="editorCore" />
    <div
      ref="editorEl"
      class="p-3 w-full h-72 outline-none"
      contenteditable
      @input="handleInput"
      @keydown.ctrl.z.prevent="undo"
      @keydown.ctrl.y.prevent="redo"
      v-html="content"
      placeholder="请输入内容..."
    ></div>
  </div>
</template>

<script setup lang="ts">
    import Toolbar from "./Toolbar.vue";
    import { ref, watch, nextTick } from "vue";
    import { RichEditor } from "@/core/Editor";

    const props = defineProps<{
      modelValue?: string;
    }>();
    const emits = defineEmits<{
      (e: "update:modelValue", value: string): void;
    }>();

    const editorEl = ref<HTMLElement>();
    const editorCore = new RichEditor(props.modelValue);
    const content = ref<string>(props.modelValue || "");

    editorCore.onUpdate((newContent) => {
      if (newContent) {
        content.value = newContent as string;
        emits("update:modelValue", newContent as string);
      }
    });

    function handleInput() {
      if (editorEl.value) {
        editorCore.setContent(editorEl.value.innerHTML);
      }
    }

    function undo() {
      editorCore.undo();
      restoreContent();
    }

    function redo() {
      editorCore.redo();
      restoreContent();
    }

    async function restoreContent() {
      await nextTick();
      if (editorEl.value) {
        editorEl.value.innerHTML = content.value;
      }
    }

    // 初始化选取保持
    let lastRange: Range | null = null;
    function saveSelection() {
      const sel = window.getSelection();
      lastRange = sel?.rangeCount ? sel.getRangeAt(0) : null;
    }

    function restoreSelection() {
      if (!lastRange) return;
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(lastRange);
    }

    watch(() => content.value, () => {
      saveSelection();
      restoreContent().then(restoreSelection);
    })
</script>

<style scoped></style>

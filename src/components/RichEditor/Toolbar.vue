<template>
  <div
    class="flex items-center gap-4 text-base box-border p-2 bg-hex-[#f5f5f5] border-b-2 border-gray-200"
  >
    <button
      class="px-3 py-2 cursor-pointer hover:text-blue-500"
      @click="execCommand('bold')"
    >
      <div class="flex justify-center items-center bold"></div>
    </button>
    <button
      class="px-3 py-2 cursor-pointer hover:text-blue-500"
      @click="execCommand('italic')"
    >
      <div class="flex justify-center items-center italic"></div>
    </button>
    <button
      class="px-3 py-2 cursor-pointer hover:text-blue-500"
      @click="execCommand('underline')"
    >
      <div class="flex justify-center items-center underline"></div>
    </button>
    <button
      class="px-3 py-2 cursor-pointer hover:text-blue-500"
      @click="execCommand('strikeThrough')"
    >
      <div class="flex justify-center items-center deleteline"></div>
    </button>
    <button
      class="px-3 py-2 cursor-pointer hover:text-blue-500"
      @click="insertLink"
    >
      <div class="flex justify-center items-center superlink"></div>
    </button>
    <button class="px-3 py-2 cursor-pointer hover:text-blue-500" @click="undo">
      <div class="flex justify-center items-center undo"></div>
    </button>
    <button class="px-3 py-2 cursor-pointer hover:text-blue-500" @click="redo">
      <div class="flex justify-center items-center redo"></div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { RichEditor } from "@/core/Editor";
import svgIcon from "@/components/SvgIcon/index.vue";

defineProps<{
  editor: InstanceType<typeof RichEditor>;
}>();

const execCommand = (cmd: string) => {
  document.execCommand(cmd);
};

const insertLink = () => {
  // const url = prompt("输入链接地址:");
  // if (url) {
  //   document.execCommand("createLink", false, url);
  // }
};

const undo = () => {
  document.execCommand("undo");
};
const redo = () => {
  document.execCommand("redo");
};
</script>

<style scoped lang="less">
.bold {
  &::before {
    content: "";
    background: url("../../assets/icons/bold.svg") no-repeat center center;
    width: 20px;
    height: 20px;
    display: inline-block;
    background-size: contain;
  }
  button:hover &::before {
    background-image: url("../../assets/icons/bold-active.svg");
  }
}

.italic {
  &::before {
    content: "";
    background: url("../../assets/icons/italic.svg") no-repeat center center;
    width: 20px;
    height: 20px;
    display: inline-block;
    background-size: contain;
  }
  button:hover &::before {
    background-image: url("../../assets/icons/italic-active.svg");
  }
}

.underline {
  &::before {
    content: "";
    background: url("../../assets/icons/underline.svg") no-repeat center center;
    width: 20px;
    height: 20px;
    display: inline-block;
    background-size: contain;
  }
  button:hover &::before {
    background-image: url("../../assets/icons/underline-active.svg");
  }
}

.deleteline {
  &::before {
    content: "";
    background: url("../../assets/icons/deleteline.svg") no-repeat center center;
    width: 20px;
    height: 20px;
    display: inline-block;
    background-size: contain;
  }
  button:hover &::before {
    background-image: url("../../assets/icons/deleteline-active.svg"); 
  }
}

.superlink {
  &::before {
    content: "";
    background: url("../../assets/icons/superlink.svg") no-repeat center center;
    width: 20px;
    height: 20px;
    display: inline-block;
    background-size: contain;
  }
  button:hover &::before {
    background-image: url("../../assets/icons/superlink-active.svg");
  }
}
.cancel-superlink {
  &::before {
    content: "";
    background: url("../../assets/icons/cancel-superlink.svg") no-repeat center
      center;
    width: 20px;
    height: 20px;
    display: inline-block;
    background-size: contain;
  }
  button:hover &::before {
    background-image: url("../../assets/icons/cancel-superlink-active.svg");
  }
}
.redo {
  &::before {
    content: "";
    background: url("../../assets/icons/redo.svg") no-repeat center center;
    width: 20px;
    height: 20px;
    display: inline-block;
    background-size: contain;
  }
  button:hover &::before {
    background-image: url("../../assets/icons/redo-active.svg");
  }
}

.undo {
  &::before {
    content: "";
    background: url("../../assets/icons/undo.svg") no-repeat center center;
    width: 20px;
    height: 20px;
    display: inline-block;
    background-size: contain;
  }
  button:hover &::before {
    background-image: url("../../assets/icons/undo-active.svg");
  }
}
</style>

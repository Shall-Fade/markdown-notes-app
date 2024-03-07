<template>
  <div class="flex flex-col gap-y-[3px] px-[20px] py-[15px] border-b border-medium-grey duration-100 cursor-pointer hover:bg-blue/30">
    <div class="flex items-center gap-[5px] mb-[5px]">
      <!-- <img src="" alt=""> -->
      <span>
        <slot name="title"></slot>
      </span>
    </div>
    <div class="flex items-center gap-x-[5px]">
      <span class="text-blue text-[14px]">
        <slot name="date"></slot>
      </span>
      <!-- Tags List -->
      <ul class="flex items-center gap-[5px] text-[12px]">
        <slot name="tags"></slot>
      </ul>
    </div>
    <p class="text-light-grey text-[12px] truncate">
      <slot name="description"></slot>
    </p>
  </div>
</template>

<script setup></script>

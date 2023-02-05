<script setup lang="ts">

defineProps<{
  modelValue: any,
  name: string,
  label: string,
  placeholder?: string,
}>()
defineEmits(['update:modelValue'])

</script>

<template>
  <div class="mt-4 sm:mt-6 relative w-full">
    <input
      v-bind="$attrs"
      type="number"
      step=".01"
      :name="name"
      :value="modelValue" 
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="label"
      class="ring-2 ring-indigo-500 px-3 py-2 peer placeholder-transparent w-full focus-within:outline-none caret-indigo-500" />
    <label
      :for="name"
      :class="[
        'absolute -top-2.5 px-1 left-1 text-xs font-semibold transition-all pointer-events-none bg-white font-mono lowercase',
        'peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-placeholder-shown:left-2.5 peer-placeholder-shown:bg-transparent'
      ]"
    >
      {{ label }}
    </label>
  </div>
</template>
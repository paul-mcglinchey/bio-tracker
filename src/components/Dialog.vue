<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/20/solid';

defineProps<{
  dialogTitle: string,
  isOpen: boolean
}>()
const emit = defineEmits(['close'])

</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="emit('close')" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex justify-center pt-20 md:pt-40 text-center h-screen sm:h-auto"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 translate-y-full"
            enter-to="opacity-100 scale-100 translate-y-0"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100 translate-y-0"
            leave-to="opacity-0 scale-95 translate-y-full"
          >
            <DialogPanel
              class="w-full max-w-xl transform overflow-hidden bg-white p-2 pt-4 md:p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="flex justify-between items-center text-lg font-medium leading-6 text-gray-900"
              >
                <div>
                  {{ dialogTitle }}
                </div>
                <button type="button" @click="emit('close')">
                  <XMarkIcon class="h-8 w-8"/>
                </button>
              </DialogTitle>
              <slot />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
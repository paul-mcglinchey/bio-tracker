<script setup lang="ts">
import { authInjectionKey } from '@/injectionKeys/auth.key';
import { authServiceInjectionKey } from '@/injectionKeys/auth.service.key';
import { dbInjectionKey } from '@/injectionKeys/db.key';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { inject } from 'vue';

defineProps<{
  label?: string
}>()

const authService = inject(authServiceInjectionKey)

</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <MenuButton class="inline-flex items-center">
      {{ label ?? 'Select' }}
      <ChevronDownIcon class="w-5 h-5" />
    </MenuButton>
    <MenuItems class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-indigo-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div class="p-1">
        <MenuItem v-slot="{ active }">
          <button 
            :class="[
              active ? 'bg-indigo-500 text-white' : 'text-gray-900',
              'group flex w-full items-center rounded-md px-2 py-2 text-sm',
            ]" 
            @click="authService?.logout()"
          >
            Logout
          </button>
        </MenuItem>
      </div>
    </MenuItems>
  </Menu>
</template>
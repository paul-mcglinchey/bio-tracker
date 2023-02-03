<script setup lang="ts">
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import TextInput from './TextInput.vue'
import { APISettings } from '@/api/config';
import PocketBase, { ClientResponseError } from 'pocketbase';
import { ArrowPathIcon, CheckIcon } from '@heroicons/vue/20/solid'

const pb = new PocketBase(APISettings.baseURL)
const loggingIn = ref<boolean>(true)
const toggleLoggingIn = () => { loggingIn.value = !loggingIn.value }
const loading = ref<boolean>(false)
const success = ref<boolean>(false)
const error = ref<string | null>(null)

defineProps<{
  isOpen: boolean
}>()
const emit = defineEmits(['close'])

const form = ref({
  name: '',
  usernameOrEmail: '',
  username: '',
  email: '',
  password: '',
  passwordConfirm: ''
})

const onSubmit = async () => {

  loading.value = true

  try {
    if (loggingIn.value) {
      await pb.collection('users').authWithPassword(
        form.value.usernameOrEmail,
        form.value.password
      )
  
      if (pb.authStore.isValid) {
        success.value = true

        setTimeout(() => emit('close'), 300)
      }
    } else {
      await pb.collection('users').create({
        "username": form.value.username,
        "email": form.value.email,
        "emailVisibility": true,
        "password": form.value.password,
        "passwordConfirm": form.value.passwordConfirm,
        "name": form.value.name
      })
  
      await pb.collection('users').requestVerification(form.value.email)
    }
  } catch(e) {
    error.value = (e as ClientResponseError).message
  } finally {
    loading.value = false
  }
}

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
          class="flex justify-center p-4 pt-40 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                {{ loggingIn ? 'Login' : 'Sign Up' }}
              </DialogTitle>
              <div class="mt-2">
                <form class="flex flex-col" @submit.prevent="onSubmit">
                  <TextInput
                    v-if="!loggingIn"
                    v-model="form.name"
                    name="name"
                    label="Name" />
                  <TextInput
                    v-if="loggingIn"
                    v-model="form.usernameOrEmail"
                    name="usernameOrEmail"
                    label="Username or Email" />
                  <TextInput
                    v-if="!loggingIn"
                    v-model="form.username"
                    name="username"
                    label="Username" />
                  <TextInput
                    v-if="!loggingIn"
                    v-model="form.email"
                    name="email"
                    label="Email" />
                  <TextInput
                    type="password"
                    v-model="form.password"
                    name="password"
                    label="Password" />
                  <TextInput
                    v-if="!loggingIn"
                    type="password"
                    v-model="form.passwordConfirm"
                    name="passwordConfirm"
                    label="Confirm Password" />
                  <div v:if="error" class="w-full text-center text-rose-500 pt-4">
                    {{ error }}
                  </div>
                  <div class="flex justify-between mt-6">
                    <button
                      type="button"
                      @click="toggleLoggingIn"
                      class="lowercase inline-flex rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                    >
                      {{ loggingIn ? 'Don\'t have an account yet?' : 'Already a user?' }}
                    </button>
                    <button
                      class="lowercase inline-flex rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                    >
                      <ArrowPathIcon v-if="loading" class="w-5 h-5 -ml-1 mr-2 animate-spin" />
                      <CheckIcon v-if="!loading && success" class="w-5 h-5 -ml-1 mr-2 text-green-500" />
                      Confirm
                    </button>
                  </div>
                </form>
              </div>

            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

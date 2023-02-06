<script setup lang="ts">
import { inject, ref } from 'vue'
import TextInput from './TextInput.vue'
import { ArrowPathIcon, CheckIcon } from '@heroicons/vue/20/solid'
import { authServiceInjectionKey } from '@/injectionKeys/auth.service.key';
import type { ClientResponseError } from 'pocketbase';
import Dialog from './Dialog.vue';

const authService = inject(authServiceInjectionKey)
const loggingIn = ref<boolean>(true)
const toggleLoggingIn = () => { loggingIn.value = !loggingIn.value }
const loading = ref<boolean>(false)
const success = ref<boolean>(false)
const error = ref<string | null>(null)

defineProps<{
  isOpen: boolean
}>()
const emit = defineEmits(['close'])

const initialFormValues = {
  name: '',
  usernameOrEmail: '',
  username: '',
  email: '',
  password: '',
  passwordConfirm: ''
}

const form = ref(initialFormValues)

const onSubmit = async () => {
  error.value = null
  loading.value = true

  try {
    if (loggingIn.value) {
      await authService?.login(
        form.value.usernameOrEmail,
        form.value.password
      )

      success.value = true
      setTimeout(() => emit('close'), 300)
    } else {
      await authService?.signup({
        "username": form.value.username,
        "email": form.value.email,
        "emailVisibility": true,
        "password": form.value.password,
        "passwordConfirm": form.value.passwordConfirm,
        "name": form.value.name
      })

      await authService?.requestVerification(form.value.email)
    }
  } catch (e) {
    error.value = (e as ClientResponseError).message
  } finally {
    if (success.value) {
      form.value.email = ''
      form.value.name = ''
      form.value.password = ''
      form.value.passwordConfirm = ''
      form.value.username = ''
      form.value.usernameOrEmail = ''
    }

    loading.value = false
  }
}

</script>

<template>
  <Dialog :dialog-title="loggingIn ? 'Login' : 'Sign Up'" :is-open="isOpen" @close="emit('close')">
    <div class="mt-0 sm:mt-2">
      <form class="flex flex-col" name="loginSignupForm" @submit.prevent="onSubmit" autocomplete="off">
        <TextInput v-if="!loggingIn" v-model="form.name" name="name" label="Name" />
        <TextInput v-if="loggingIn" v-model="form.usernameOrEmail" aria-autocomplete="none" name="usernameOrEmail" label="Username or Email" />
        <TextInput v-if="!loggingIn" v-model="form.username" name="username" label="Username" />
        <TextInput v-if="!loggingIn" v-model="form.email" name="email" label="Email" />
        <TextInput type="password" v-model="form.password" name="password" label="Password" />
        <TextInput v-if="!loggingIn" type="password" v-model="form.passwordConfirm" name="passwordConfirm" label="Confirm Password" />
        <div v:if="error" class="w-full text-center text-rose-500 pt-4">
          {{ error }}
        </div>
        <div class="flex justify-between mt-6">
          <button type="button" @click="toggleLoggingIn"
            class="lowercase inline-flex rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2">
            {{ loggingIn ? 'Don\'t have an account yet?': 'Already a user?' }}
          </button>
          <button
            class="lowercase inline-flex rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2">
            <ArrowPathIcon v-if="loading" class="w-5 h-5 -ml-1 mr-2 animate-spin" />
            <CheckIcon v-if="!loading && success" class="w-5 h-5 -ml-1 mr-2 text-green-500" />
            Confirm
          </button>
        </div>
      </form>
    </div>
  </Dialog>
</template>
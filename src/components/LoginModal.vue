<script setup lang="ts">
import { inject, ref, watch, watchEffect } from 'vue'
import TextInput from './TextInput.vue'
import { ArrowPathIcon, CheckIcon } from '@heroicons/vue/20/solid'
import type { ClientResponseError } from 'pocketbase';
import Dialog from './Dialog.vue';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth()
const loggingIn = ref<boolean>(true)
const toggleLoggingIn = () => { loggingIn.value = !loggingIn.value }
const loading = ref<boolean>(false)
const success = ref<boolean>(false)
const error = ref<string | null>(null)
const formValid = ref<boolean>(false)

defineProps<{
  isOpen: boolean
}>()
const emit = defineEmits(['close'])

type Form = {
  email: string
  password: string
  passwordConfirm: string
}

const initialFormValues: Form = {
  email: '',
  password: '',
  passwordConfirm: ''
}

const form = ref<Form>(initialFormValues)

const onSubmit = async () => {
  error.value = null
  loading.value = true

  try {
    if (loggingIn.value) {
      await signInWithEmailAndPassword(auth, form.value.email, form.value.password)

      success.value = true
      setTimeout(() => emit('close'), 300)
    } else {
      await createUserWithEmailAndPassword(auth, form.value.email, form.value.password)
    }
  } catch (e) {
    error.value = (e as ClientResponseError).message
  } finally {
    if (success.value) {
      form.value.email = ''
      form.value.password = ''
      form.value.passwordConfirm = ''
    }

    loading.value = false
  }
}

const notNullOrEmpty = (val: string) => {
  if (!val) return false
  if (val.trim().length === 0) return false

  return true
}

const validateForm = (form: Form) => {
  if (loggingIn) {
    return notNullOrEmpty(form.email) && notNullOrEmpty(form.password)
  } else {
    if (!notNullOrEmpty(form.email)) return false
    if (!notNullOrEmpty(form.password)) return false
    if (!notNullOrEmpty(form.passwordConfirm)) return false
    if (form.password !== form.passwordConfirm) return false

    return true
  }
}

watchEffect(() => {
  formValid.value = validateForm(form.value)
})

</script>

<template>
  <Dialog :dialog-title="loggingIn ? 'Login' : 'Sign Up'" :is-open="isOpen" @close="emit('close')">
    <div class="mt-0 sm:mt-2">
      <form class="flex flex-col" name="loginSignupForm" @submit.prevent="onSubmit" autocomplete="off">
        <TextInput v-model="form.email" aria-autocomplete="none" name="usernameOrEmail" label="Username or Email" />
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
            :disabled="!formValid"
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
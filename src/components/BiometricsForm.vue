<script setup lang="ts">
import { inject, ref } from 'vue';
import { dbInjectionKey } from '@/injectionKeys/db.key';
import { ArrowPathIcon, CheckIcon } from '@heroicons/vue/20/solid';
import { v4 as uuid } from 'uuid'
import type { IBiometric } from '@/models/biometrics.model';
import type { ClientResponseError } from 'pocketbase';
import NumericInput from './NumericInput.vue';
import DateInput from './DateInput.vue';

const emit = defineEmits(['completedSubmitting'])
const db = inject(dbInjectionKey)

const form = ref<IBiometric>({
  'readingDateTime': new Date().toISOString().split("T")[0],
  'bodyMassKg': null,
  'bmi': null,
  'bodyFatPercentage': null,
  'bodyMusclePercentage': null,
  'bodyWaterPercentage': null,
  'boneMassKg': null
})
const loading = ref(false)
const error = ref<string | null>(null)
const success = ref(false)

const handleSubmit = async () => {

  loading.value = true

  try {
    if (db?.authStore.isValid) {
      await db?.collection('biometrics').create({ ...form.value, user: db.authStore.model?.id })
    } else {
      let localStorageEntries = JSON.parse(localStorage.getItem('biometrics') ?? '[]') as Array<IBiometric>
      
      localStorageEntries.push({ ...form.value, id: uuid() })
      localStorage.setItem('biometrics', JSON.stringify(localStorageEntries))
    }
  } catch (e) {
    let apiError = e as ClientResponseError
    
    console.error(apiError.message)
    error.value = apiError.message
  } finally {
    emit('completedSubmitting')
    loading.value = false
  }

  setTimeout(() => {
    form.value.bodyMassKg = null
    form.value.bmi = null
    form.value.bodyFatPercentage = null
    form.value.bodyMusclePercentage = null
    form.value.bodyWaterPercentage = null
    form.value.boneMassKg = null

    success.value = false
  }, 200)
}

</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <DateInput v-model="form.readingDateTime" name="readingDateTime" label="Reading Date" />
      <NumericInput v-model.number="form.bodyMassKg" name="bodyMassKg" label="Body Mass (Kg)" />
      <NumericInput v-model.number="form.bmi" name="bmi" label="BMI" />
      <NumericInput v-model.number="form.bodyFatPercentage" name="bodyFatPercentage" label="Body Fat (%)" />
      <NumericInput v-model.number="form.bodyMusclePercentage" name="bodyMusclePercentage" label="Body Muscle (%)" />
      <NumericInput v-model.number="form.bodyWaterPercentage" name="bodyWaterPercentage"
        label="Body Water Percentage (%)" />
      <NumericInput v-model.number="form.boneMassKg" name="boneMassKg" label="Bone Mass (Kg)" />
    </div>
    <div class="flex justify-end">
      <button type="submit"
        class="px-3 py-1 bg-indigo-500/20 hover:bg-indigo-500/50 transition-colors flex items-center">
        <ArrowPathIcon v-if="loading" class="w-5 h-5 -ml-1 mr-2 animate-spin" />
        <CheckIcon v-if="!loading && success" class="w-5 h-5 -ml-1 mr-2 text-green-500" />
        Add entry
      </button>
    </div>
  </form>
</template>
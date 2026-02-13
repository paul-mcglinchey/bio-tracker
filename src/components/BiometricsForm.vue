<script setup lang="ts">
import { ref } from 'vue';
import { ArrowPathIcon, CheckIcon } from '@heroicons/vue/20/solid';
import type { ClientResponseError } from 'pocketbase';
import NumericInput from './NumericInput.vue';
import DateInput from './DateInput.vue';
import { getFirestore, addDoc, collection } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';
import { BodyMeasurementRequest } from '@/models/body-measurement.request';

const emit = defineEmits(['completedSubmitting'])
const auth = getAuth()
const firestore = getFirestore()

const form = ref<BodyMeasurementRequest>({
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
  if (!auth.currentUser) throw new Error('Current user is not defined')

  loading.value = true

  try {
    await addDoc(collection(firestore, 'users', auth.currentUser.uid, 'body-measurements'), form.value)
  } catch (e) {
    console.error(e)
    let apiError = e as ClientResponseError
    
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
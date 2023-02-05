<script setup lang="ts">
import AccordionSection from '@/components/AccordionSection.vue';
import NumericInput from '../components/NumericInput.vue'
import DateInput from '../components/DateInput.vue'
import { ArrowPathIcon, CheckIcon, ChevronUpIcon, QuestionMarkCircleIcon } from '@heroicons/vue/20/solid';
import { inject, ref } from 'vue';
import { dbInjectionKey } from '@/injectionKeys/db.key';
import type { ClientResponseError } from 'pocketbase';

const welcomeOpen = ref<boolean>(localStorage.getItem('welcome-open') === "true" ? true : false)

const openWelcome = () => {
  welcomeOpen.value = true
  localStorage.setItem('welcome-open', 'true')
}

const closeWelcome = () => {
  welcomeOpen.value = false
  localStorage.setItem('welcome-open', 'false')
}

const db = inject(dbInjectionKey)
const loading = ref(false)
const error = ref<string | null>(null)
const success = ref(false)

const form = ref({
  'readingDateTime': new Date().toISOString().split("T")[0],
  'bodyMassKg': null,
  'bmi': null,
  'bodyFatPercentage': null,
  'bodyMusclePercentage': null,
  'bodyWaterPercentage': null,
  'boneMassKg': null
})

const handleSubmit = async () => {

  loading.value = true

  try {
    await db?.collection('biometrics').create({ ...form.value, user: db.authStore.model?.id })
  } catch (e) {
    let apiError = e as ClientResponseError
    console.error(apiError.message)
    error.value = apiError.message
  } finally {
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
  <div class="flex flex-col justify-center md:py-2">
    <div class="flex justify-end items-center space-x-1">
      <button @click="welcomeOpen ? closeWelcome() : openWelcome()" class="border-b border-transparent hover:border-neutral-500 text-xs transition-col">{{ welcomeOpen ? 'Hide this' : 'Show welcome' }}</button>
      <ChevronUpIcon :class="['w-3 h-3 text-neutral-500 rounded-full transform transition-transform', !welcomeOpen && 'rotate-180']" />
    </div>
    <Transition>
      <div v-if="welcomeOpen" class="flex flex-col flex-shrink space-y-1 lg:space-y-4 py-4 lg:p-12">
        <h1 class="text-4xl lg:text-5xl font-bold tracking-wide text-left lg:text-center">The simplest way to track your progress</h1>
        <div class="flex justify-end">
          <button class="flex items-center space-x-2 hover:bg-indigo-500/20 px-2 py-0.5 transition-colors relative group">
            <span class="text-neutral-400 text-md lg:text-lg text-right leading-tight">
              Do I need to log in?
            </span>
            <QuestionMarkCircleIcon class="w-5 h-5" />
            <div class="hidden hover:flex group-hover:flex absolute z-50 bg-indigo-500/20 top-full w-72 right-0 origin-top-right text-left text-sm p-2 flex-col space-y-2">
              <p>
                No, absolutely not!
              </p>
              <p>
                The application will work entirely locally on a per-device basis unless you decide to login. Click <RouterLink to="/about" class="text-indigo-500 italic hover:text-indigo-700">here</RouterLink> to learn more
              </p>
            </div>
          </button>
        </div>
      </div>
    </Transition>
  </div>
  <div>
    <AccordionSection section-title="Add a new entry">
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <DateInput 
            v-model="form.readingDateTime"
            name="readingDateTime"
            label="Reading Date"
          />
          <NumericInput
            v-model.number="form.bodyMassKg"
            name="bodyMassKg"
            label="Body Mass (Kg)"
          />
          <NumericInput
            v-model.number="form.bmi"
            name="bmi"
            label="BMI"
          />
          <NumericInput
            v-model.number="form.bodyFatPercentage"
            name="bodyFatPercentage"
            label="Body Fat (%)"
          />
          <NumericInput
            v-model.number="form.bodyMusclePercentage"
            name="bodyMusclePercentage"
            label="Body Muscle (%)"
          />
          <NumericInput
            v-model.number="form.bodyWaterPercentage"
            name="bodyWaterPercentage"
            label="Body Water Percentage (%)"
          />
          <NumericInput
            v-model.number="form.boneMassKg"
            name="boneMassKg"
            label="Bone Mass (Kg)"
          />
        </div>
        <div class="flex justify-end">
          <button type="submit" class="px-3 py-1 bg-indigo-500/20 hover:bg-indigo-500/50 transition-colors flex items-center">
            <ArrowPathIcon v-if="loading" class="w-5 h-5 -ml-1 mr-2 animate-spin" />
            <CheckIcon v-if="!loading && success" class="w-5 h-5 -ml-1 mr-2 text-green-500" />
            Add entry
          </button>
        </div>
      </form>
    </AccordionSection>
    <table>
      <tr>
        <th></th>
      </tr>
    </table>
  </div>
</template>

<style scoped>

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>
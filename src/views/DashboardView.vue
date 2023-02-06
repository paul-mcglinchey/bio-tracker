<script setup lang="ts">
import AccordionSection from '@/components/AccordionSection.vue';
import NumericInput from '../components/NumericInput.vue'
import DateInput from '../components/DateInput.vue'
import TableHeader from '@/components/TableHeader.vue';
import TableRow from '@/components/TableRow.vue';
import TableCell from '@/components/TableCell.vue';
import { ArrowPathIcon, CheckIcon, ChevronUpIcon, QuestionMarkCircleIcon, TrashIcon } from '@heroicons/vue/20/solid';
import { inject, onMounted, ref } from 'vue';
import { dbInjectionKey } from '@/injectionKeys/db.key';
import { subDays } from 'date-fns'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { v4 as uuid } from 'uuid'
import type { ClientResponseError } from 'pocketbase';

interface IBiometric {
  id?: string
  readingDateTime: string
  bodyMassKg: number | null
  bmi: number | null
  bodyFatPercentage: number | null
  bodyMusclePercentage: number | null
  bodyWaterPercentage: number | null
  boneMassKg: number | null
}

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
const biometrics = ref<IBiometric[]>([])

const form = ref<IBiometric>({
  'readingDateTime': new Date().toISOString().split("T")[0],
  'bodyMassKg': null,
  'bmi': null,
  'bodyFatPercentage': null,
  'bodyMusclePercentage': null,
  'bodyWaterPercentage': null,
  'boneMassKg': null
})

onMounted(async () => {
  getEntries()
})

const getEntries = async () => {
  loading.value = true
  
  try {

    if (db?.authStore.isValid) {
      const res = await db?.collection('biometrics').getList<IBiometric>(1, 200, { filter: 'user.id=\'' + db.authStore.model?.id + '\'', sort: '-readingDateTime' })
      biometrics.value = res?.items ?? []
    } else {
      biometrics.value = (JSON.parse(localStorage.getItem('biometrics') ?? '[]') as Array<IBiometric>).sort((a, b) => +new Date(b.readingDateTime) - +new Date(a.readingDateTime))
    }

  } catch (e) {
    let apiError = e as ClientResponseError
    console.error(apiError.message)
    error.value = apiError.message
  } finally {
    loading.value = false
  }
}

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
    await getEntries()
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

const deleteEntry = async (id: string | undefined) => {
  
  if (!id) throw new Error('Something went wrong...')
  loading.value = true

  try {
    if (db?.authStore.isValid) {
      await db?.collection('biometrics').delete(id)
    } else {
      let localStorageEntries = JSON.parse(localStorage.getItem('biometrics') ?? '[]') as Array<IBiometric>
      localStorageEntries = localStorageEntries.filter(lse => lse.id !== id)

      localStorage.setItem('biometrics', JSON.stringify(localStorageEntries))
    }
  } catch (e) {
    let apiError = e as ClientResponseError
    console.error(apiError.message)
  } finally {
    await getEntries()
    loading.value = false
  }
}

const shouldShowDate = (readingDateTime: string): boolean => {
  let date = new Date(readingDateTime)
  let current = new Date()

  return date > subDays(current, 2)
}

</script>

<template>
  <div class="flex flex-col justify-center md:py-2">
    <div class="flex justify-end items-center space-x-1">
      <button @click="welcomeOpen ? closeWelcome() : openWelcome()"
        class="border-b border-transparent hover:border-neutral-500 text-xs transition-col">{{
          welcomeOpen? 'Hide this'
            : 'Show welcome'
        }}</button>
      <ChevronUpIcon
        :class="['w-3 h-3 text-neutral-500 rounded-full transform transition-transform', !welcomeOpen && 'rotate-180']" />
    </div>
    <Transition>
      <div v-if="welcomeOpen" class="flex flex-col flex-shrink space-y-1 lg:space-y-4 py-4 lg:p-12">
        <h1 class="text-4xl lg:text-5xl font-bold tracking-wide text-left lg:text-center">The simplest way to track your
          progress</h1>
        <div class="flex justify-end">
          <button
            class="flex items-center space-x-2 hover:bg-indigo-500/20 px-2 py-0.5 transition-colors relative group">
            <span class="text-neutral-400 text-md lg:text-lg text-right leading-tight">
              Do I need to log in?
            </span>
            <QuestionMarkCircleIcon class="w-5 h-5" />
            <div
              class="hidden hover:flex group-hover:flex absolute z-50 bg-white border border-indigo-500 lg:bg-indigo-500/20 top-full w-72 right-0 origin-top-right text-left text-sm p-2 flex-col space-y-2">
              <p>
                No, absolutely not!
              </p>
              <p>
                The application will work entirely locally on a per-device basis unless you decide to login. Click
                <RouterLink to="/about" class="text-indigo-500 italic hover:text-indigo-700">here</RouterLink> to learn
                more
              </p>
            </div>
          </button>
        </div>
      </div>
    </Transition>
  </div>
  <div class="flex flex-col space-y-4 mb-10">
    <AccordionSection section-title="Add a new entry">
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <DateInput v-model="form.readingDateTime" name="readingDateTime" label="Reading Date" />
          <NumericInput v-model.number="form.bodyMassKg" name="bodyMassKg" label="Body Mass (Kg)" />
          <NumericInput v-model.number="form.bmi" name="bmi" label="BMI" />
          <NumericInput v-model.number="form.bodyFatPercentage" name="bodyFatPercentage" label="Body Fat (%)" />
          <NumericInput v-model.number="form.bodyMusclePercentage" name="bodyMusclePercentage"
            label="Body Muscle (%)" />
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
    </AccordionSection>
    <table class="hidden lg:table">
      <thead class="border-b-2 border-neutral-300 w-full">
        <TableRow>
          <TableHeader>Reading Date</TableHeader>
          <TableHeader>Body Mass (Kg)</TableHeader>
          <TableHeader>BMI</TableHeader>
          <TableHeader>Body Fat (%)</TableHeader>
          <TableHeader>Body Muscle (%)</TableHeader>
          <TableHeader>Body Water (%)</TableHeader>
          <TableHeader>Bone Mass (Kg)</TableHeader>
        </TableRow>
      </thead>
      <tbody>
        <TableRow v-for="item in biometrics" as="div">
          <TableCell>{{ item.readingDateTime.split(" ")[0] }}</TableCell>
          <TableCell>{{ !item.bodyMassKg ? 'N/A' : item.bodyMassKg }}</TableCell>
          <TableCell>{{ !item.bmi ? 'N/A' : item.bmi }}</TableCell>
          <TableCell>{{ !item.bodyFatPercentage ? 'N/A' : item.bodyFatPercentage }}</TableCell>
          <TableCell>{{ !item.bodyMusclePercentage ? 'N/A' : item.bodyMusclePercentage }}</TableCell>
          <TableCell>{{ !item.bodyWaterPercentage ? 'N/A' : item.bodyWaterPercentage }}</TableCell>
          <TableCell>{{ !item.boneMassKg ? 'N/A' : item.boneMassKg }}</TableCell>
          <TableCell>
            <button @click="deleteEntry(item.id)">
              <TrashIcon class="w-5 h-5 text-rose-400" />
            </button>
          </TableCell>
        </TableRow>
      </tbody>
    </table>
    <div class="flex flex-col lg:hidden space-y-2">
      <div v-for="item in biometrics">
        <AccordionSection :section-title="item.readingDateTime.split(' ')[0]" :default-open="shouldShowDate(item.readingDateTime)">
          <Disclosure>
            <DisclosureButton as="div">
              <table class="w-full">
                <TableRow>
                  <td>Body Mass (Kg)</td>
                  <td>{{ item.bodyMassKg }}</td>
                </TableRow>
                <TableRow>
                  <td>BMI</td>
                  <td>{{ item.bmi }}</td>
                </TableRow>
                <TableRow>
                  <td>Body Fat (%)</td>
                  <td>{{ item.bodyFatPercentage }}</td>
                </TableRow>
                <TableRow>
                  <td>Body Muscle (%)</td>
                  <td>{{ item.bodyMusclePercentage }}</td>
                </TableRow>
                <TableRow>
                  <td>Body Water (%)</td>
                  <td>{{ item.bodyWaterPercentage }}</td>
                </TableRow>
                <TableRow>
                  <td>Bone Mass (Kg)</td>
                  <td>{{ item.boneMassKg }}</td>
                </TableRow>
              </table>
              <Transition>
                <DisclosurePanel>
                  <div class="flex justify-end py-1">
                    <button type="button" @click="deleteEntry(item.id)" class="text-rose-500 px-2 py-1 border-b border-rose-500">delete</button>
                  </div>
                </DisclosurePanel>
              </Transition>
            </DisclosureButton>
          </Disclosure>
        </AccordionSection>
      </div>
    </div>
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
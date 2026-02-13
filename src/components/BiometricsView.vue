<script setup lang="ts">
import AccordionSection from './AccordionSection.vue'
import { ref, watchPostEffect } from 'vue'
import BiometricsForm from './BiometricsForm.vue'
import BiometricsTable from './BiometricsTable.vue'
import { collection, deleteDoc, doc, FirestoreError, getDocs, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { BodyMeasurementResponse } from '@/models/body-measurement.response'
import Dialog from './Dialog.vue'

const firestore = getFirestore()
const auth = getAuth()
const biometrics = ref<BodyMeasurementResponse[]>([])
const loading = ref<boolean>(false)
const error = ref<string | null>(null)
const importDataOpen = ref<boolean>(false)

const getEntries = async () => {
  if (!auth.currentUser) throw new Error('Current user is not defined')
  
  loading.value = true
  
  try {
    const res = await getDocs(collection(firestore, 'users', auth.currentUser.uid, 'body-measurements'))
    biometrics.value = res.docs.map(d => ({ id: d.id, ...d.data() }) as BodyMeasurementResponse)
  } catch (e) {
    let apiError = e as FirestoreError
    console.error(apiError.message)
    error.value = apiError.message
  } finally {
    loading.value = false
  }
}

const deleteEntry = async (id: string) => {
  if (!auth.currentUser) throw new Error('Current user is not defined')

  loading.value = true

  try {
    await deleteDoc(doc(firestore, 'users', auth.currentUser.uid, 'body-measurements', id))
  } catch (e) {
    let apiError = e as FirestoreError
    console.error(apiError.message)
    error.value = apiError.message
  } finally {
    loading.value = false
    getEntries()
  }
}

watchPostEffect(getEntries)
</script>

<template>
  <div class="flex flex-col space-y-4">
    <div class="flex justify-end gap-4">
      <button
        @click="importDataOpen = true"
        class="py-1 px-2 bg-indigo-500 text-white hover:bg-indigo-500/80"
      >
        Import data
      </button>
    </div>
    <AccordionSection section-title="Add a new entry">
      <BiometricsForm @completed-submitting="getEntries" />
    </AccordionSection>
    <BiometricsTable :biometrics="biometrics" @delete-entry="deleteEntry" />
  </div>
  <Dialog dialog-title="Import data" :is-open="importDataOpen" @close="importDataOpen = false">
    <form>
      <div class="flex mt-6 justify-between">
        <button
          :disabled="false"
          type="submit"
          class="lowercase inline-flex rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 justify-self-end"
        >
          <ArrowPathIcon v-if="loading" class="w-5 h-5 -ml-1 mr-2 animate-spin" />
          Import
        </button>
      </div>
    </form>
  </Dialog>
</template>
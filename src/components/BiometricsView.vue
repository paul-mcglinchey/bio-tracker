<script setup lang="ts">
import type { IBiometric } from '@/models/biometrics.model'
import AccordionSection from './AccordionSection.vue'
import type { ClientResponseError } from 'pocketbase'
import { inject, onMounted, ref } from 'vue'
import { dbInjectionKey } from '@/injectionKeys/db.key'
import BiometricsForm from './BiometricsForm.vue'
import BiometricsTable from './BiometricsTable.vue'

const db = inject(dbInjectionKey)
const biometrics = ref<IBiometric[]>([])
const loading = ref<boolean>(false)
const error = ref<string | null>(null)

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

    await getEntries()

  } catch (e) {
    let apiError = e as ClientResponseError
    console.error(apiError.message)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  getEntries()
})

</script>

<template>
  <div class="flex flex-col space-y-4">
    <AccordionSection section-title="Add a new entry">
      <BiometricsForm @completed-submitting="getEntries" />
    </AccordionSection>
    <BiometricsTable :biometrics="biometrics" @delete-entry="deleteEntry" />
  </div>
</template>
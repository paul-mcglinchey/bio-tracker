<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { TrashIcon } from '@heroicons/vue/20/solid';
import { subDays } from 'date-fns';
import { Transition } from 'vue';
import AccordionSection from './AccordionSection.vue';
import TableCell from './TableCell.vue';
import TableHeader from './TableHeader.vue';
import TableRow from './TableRow.vue';
import { BodyMeasurementResponse } from '@/models/body-measurement.response';

defineProps<{
  biometrics: BodyMeasurementResponse[]
}>()

const emit = defineEmits(['deleteEntry'])

const shouldShowDate = (readingDateTime: string): boolean => {
  let date = new Date(readingDateTime)
  let current = new Date()

  return date > subDays(current, 2)
}

</script>

<template>
  <table class="hidden lg:table w-full">
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
          <button @click="emit('deleteEntry', item.id)">
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
                  <button type="button" @click="emit('deleteEntry', item.id)" class="text-rose-500 px-2 py-1 border-b border-rose-500">delete</button>
                </div>
              </DisclosurePanel>
            </Transition>
          </DisclosureButton>
        </Disclosure>
      </AccordionSection>
    </div>
  </div>
</template>
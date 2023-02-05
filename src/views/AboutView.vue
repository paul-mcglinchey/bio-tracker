<script setup lang="ts">
import Blob from '@/components/Blob.vue';

</script>

<template>
  <div class="rounded-lg mb-6">
    <h1 class="font-sans text-indigo-500 border-b-2 pb-2 text-5xl md:text-6xl font-bold tracking-wide">
      about
    </h1>
    <div class="flex">
      <div class="mt-2 max-w-4xl lg:text-justify flex flex-col space-y-4 font-medium text-neutral-800">
        <p>
          The <span class="text-indigo-500">bio-tracker</span> application was developed off the back of a new year's
          resolution.
          For most people its not an irregular occurrence to make some sort of goal to lose weight or get healthier and
          I figured that the easier it is to monitor your progress the more likely you are to achieve your goals.
        </p>
        <p>
          The idea here was to create a really simple & single purpose application with little-to-no complexity.
          The main driving force for this requirement is that I've personally found it very useful (and I believe it's
          recommended practice) to take your biometric readings at the same time every day.
        </p>
        <p>
          My solution to this initially was just to keep a note on my phone that I would update with a new set of
          readings every day and then when I got around to it I would transfer them over to a google sheets document
          where
          I had visualizations set up. Not the most elegant approach! This application is still in the early stages of
          development but the goal is that I'd love to replace all the facets of that routine with a single webapp.
        </p>
        <p>
          If you have any feedback or a particular feature in mind I'd love to hear from you, feel free to reach out on
          my <a class="italic text-indigo-700" href="https://github.com/paul-mcglinchey">GitHub</a> or give me an <a
            class="italic text-indigo-700" href="mailto:paulmcglinchey789@gmail.com">email</a>!
        </p>
      </div>
      <Blob />
    </div>
  </div>
</template>

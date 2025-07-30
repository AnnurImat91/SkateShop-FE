<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-6 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-4 text-center">{{ title }}</h2>
      <slot />
      <p class="mt-4 text-center text-sm">
        <slot name="footer" />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthWrapper',
  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>

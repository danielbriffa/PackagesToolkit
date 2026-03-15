<template>
  <button
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    :aria-busy="loading"
    @click="!disabled && !loading && emit('click', $event)"
  >
    <span v-if="$slots['left-icon'] && !loading">
      <slot name="left-icon" />
    </span>

    <span v-if="loading" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none" width="1em" height="1em">
        <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-dasharray="28" stroke-dashoffset="10" />
      </svg>
    </span>

    <slot>{{ label }}</slot>

    <span v-if="$slots['right-icon'] && !loading">
      <slot name="right-icon" />
    </span>
  </button>
</template>

<script setup lang="ts">
defineOptions({ name: 'CustomButton' })

withDefaults(defineProps<{
  label?: string
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
})

const emit = defineEmits<{ click: [event: MouseEvent] }>()
</script>

<style scoped>
    .slot{
        background-color: aquamarine;
    }
</style>
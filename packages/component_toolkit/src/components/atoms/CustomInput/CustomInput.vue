<template>
  <div :class="['custom-input', `custom-input--${size}`, { 'custom-input--error': !!error, 'custom-input--disabled': disabled }]">
    <label v-if="label" :for="inputId" class="custom-input__label">{{ label }}</label>
    <div class="custom-input__wrapper">
      <span v-if="$slots['left-icon']" class="custom-input__left-icon">
        <slot name="left-icon" />
      </span>
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :aria-disabled="disabled"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${inputId}-error` : undefined"
        class="custom-input__field"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
      />
      <span v-if="$slots['right-icon']" class="custom-input__right-icon">
        <slot name="right-icon" />
      </span>
    </div>
    <span v-if="error" :id="`${inputId}-error`" class="custom-input__error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue'

defineOptions({ name: 'CustomInput' })

withDefaults(defineProps<{
  modelValue?: string
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  error?: string
}>(), {
  type: 'text',
  size: 'md',
  disabled: false,
})

const inputId = useId()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()
</script>

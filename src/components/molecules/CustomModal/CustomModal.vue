<template>
  <Teleport to="body">
    <Transition name="custom-modal">
      <div
        v-if="modelValue"
        class="custom-modal__backdrop"
        @click.self="closeOnBackdrop && close()"
        @keydown.esc="close()"
      >
        <div
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          :class="['custom-modal', `custom-modal--${size}`]"
          tabindex="-1"
        >
          <div class="custom-modal__header">
            <span :id="titleId" class="custom-modal__title">{{ title }}</span>
            <CustomButton class="custom-modal__close" variant="ghost" aria-label="Close modal" @click="close()">
              <svg viewBox="0 0 16 16" fill="none" width="1em" height="1em" aria-hidden="true">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </CustomButton>
          </div>

          <div class="custom-modal__body">
            <slot />
          </div>

          <div v-if="$slots.footer" class="custom-modal__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useId, watch } from 'vue'
import CustomButton from '@/components/atoms/CustomButton/CustomButton.vue'

defineOptions({ name: 'CustomModal' })

const props = withDefaults(defineProps<{
  modelValue?: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg'
  closeOnBackdrop?: boolean
}>(), {
  modelValue: false,
  size: 'md',
  closeOnBackdrop: true,
})

const titleId = useId()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

function close() {
  emit('update:modelValue', false)
  emit('close')
}

watch(() => props.modelValue, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
}, { immediate: true })
</script>

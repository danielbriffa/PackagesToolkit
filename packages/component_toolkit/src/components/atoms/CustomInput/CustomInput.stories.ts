import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { fn, expect, userEvent, within } from 'storybook/test';
import { defineComponent, h, ref } from 'vue';

import CustomInput from './CustomInput.vue';

const IconSearch = defineComponent({
  render: () => h('svg', { viewBox: '0 0 16 16', fill: 'none', width: '1em', height: '1em', 'aria-hidden': 'true' }, [
    h('circle', { cx: '6.5', cy: '6.5', r: '4', stroke: 'currentColor', 'stroke-width': '1.5' }),
    h('path', { d: 'M11 11l2.5 2.5', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round' }),
  ]),
});

const IconLock = defineComponent({
  render: () => h('svg', { viewBox: '0 0 16 16', fill: 'none', width: '1em', height: '1em', 'aria-hidden': 'true' }, [
    h('rect', { x: '3', y: '7', width: '10', height: '7', rx: '1.5', stroke: 'currentColor', 'stroke-width': '1.5' }),
    h('path', { d: 'M5 7V5a3 3 0 016 0v2', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round' }),
  ]),
});

const meta = {
  title: 'Design System/atoms/CustomInput',
  component: CustomInput,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    modelValue: '',
    label: 'Label',
    placeholder: 'Enter text...',
    type: 'text',
    size: 'md',
    disabled: false,
    error: '',
    'onUpdate:modelValue': fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof CustomInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// Verifies typing updates the model value
export const EmitsOnInput: Story = {
  render: (args) => ({
    components: { CustomInput },
    setup: () => {
      const value = ref(args.modelValue ?? '');
      return { args, value };
    },
    template: `<CustomInput v-bind="args" v-model="value" />`,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    await userEvent.type(input, 'hello');

    expect((input as HTMLInputElement).value).toBe('hello');
  },
};

// Verifies input is not interactable when disabled
export const NoInteractionWhenDisabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
    placeholder: 'Cannot type here',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    expect(input).toBeDisabled();
  },
};

export const Default: Story = {};
export const WithError: Story = { args: { error: 'This field is required.' } };
export const Disabled: Story = { args: { disabled: true } };
export const Small: Story = { args: { size: 'sm', label: 'Small' } };
export const Large: Story = { args: { size: 'lg', label: 'Large' } };
export const EmailType: Story = { args: { type: 'email', label: 'Email', placeholder: 'you@example.com' } };
export const PasswordType: Story = { args: { type: 'password', label: 'Password', placeholder: '••••••••' } };

export const WithLeftIcon: Story = {
  args: { label: 'Search', placeholder: 'Search...' },
  render: (args) => ({
    components: { CustomInput, IconSearch },
    setup: () => ({ args }),
    template: `<CustomInput v-bind="args"><template #left-icon><IconSearch /></template></CustomInput>`,
  }),
};

export const WithRightIcon: Story = {
  args: { label: 'Password', type: 'password', placeholder: '••••••••' },
  render: (args) => ({
    components: { CustomInput, IconLock },
    setup: () => ({ args }),
    template: `<CustomInput v-bind="args"><template #right-icon><IconLock /></template></CustomInput>`,
  }),
};

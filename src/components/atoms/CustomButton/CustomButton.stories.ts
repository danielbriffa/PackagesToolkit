import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { fn, expect, userEvent, within } from 'storybook/test';
import { defineComponent, h } from 'vue';

import CustomButton from './CustomButton.vue';

const IconArrow = defineComponent({
  render: () => h('svg', { viewBox: '0 0 16 16', fill: 'none', width: '1em', height: '1em', 'aria-hidden': 'true' }, [
    h('path', { d: 'M3 8h10M9 4l4 4-4 4', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
  ]),
});

const IconPlus = defineComponent({
  render: () => h('svg', { viewBox: '0 0 16 16', fill: 'none', width: '1em', height: '1em', 'aria-hidden': 'true' }, [
    h('path', { d: 'M8 3v10M3 8h10', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round' }),
  ]),
});

const meta = {
  title: 'Design System/atoms/CustomButton',
  component: CustomButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'danger', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    label: 'Click me',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    onClick: fn(),
  },
} satisfies Meta<typeof CustomButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Verifies the click emit fires when the button is clicked
export const EmitsOnClick: Story = {
  args: {
    label: 'Click me',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /click me/i });

    await userEvent.click(button);

    expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

// Verifies no emit fires when disabled
export const NoEmitWhenDisabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /disabled/i });

    await userEvent.click(button);

    expect(args.onClick).not.toHaveBeenCalled();
  },
};

// Verifies no emit fires when loading
export const NoEmitWhenLoading: Story = {
  args: {
    label: 'Loading',
    loading: true,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /loading/i });

    await userEvent.click(button);

    expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Danger: Story = { args: { variant: 'danger' } };
export const Ghost: Story = { args: { variant: 'ghost' } };

export const WithLeftIcon: Story = {
  args: { label: 'Add item' },
  render: (args) => ({
    components: { CustomButton, IconPlus },
    setup: () => ({ args }),
    template: `<CustomButton v-bind="args"><template #left-icon><IconPlus /></template>{{ args.label }}</CustomButton>`,
  }),
};

export const WithRightIcon: Story = {
  args: { label: 'Next' },
  render: (args) => ({
    components: { CustomButton, IconArrow },
    setup: () => ({ args }),
    template: `<CustomButton v-bind="args">{{ args.label }}<template #right-icon><IconArrow /></template></CustomButton>`,
  }),
};

export const WithBothIcons: Story = {
  args: { label: 'Continue' },
  render: (args) => ({
    components: { CustomButton, IconPlus, IconArrow },
    setup: () => ({ args }),
    template: `<CustomButton v-bind="args"><template #left-icon><IconPlus /></template>{{ args.label }}<template #right-icon><IconArrow /></template></CustomButton>`,
  }),
};

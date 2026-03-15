import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { fn, expect, userEvent, within } from 'storybook/test';

import CustomButton from './CustomButton.vue';

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

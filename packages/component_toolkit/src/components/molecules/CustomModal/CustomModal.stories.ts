import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { fn, expect, userEvent, within, waitFor } from 'storybook/test';
import { ref } from 'vue';

import CustomModal from './CustomModal.vue';
import CustomButton from '../../atoms/CustomButton/CustomButton.vue';

const meta = {
  title: 'Design System/molecules/CustomModal',
  component: CustomModal,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    modelValue: false,
    title: 'Modal Title',
    size: 'md',
    closeOnBackdrop: true,
    'onUpdate:modelValue': fn(),
    onClose: fn(),
  },
} satisfies Meta<typeof CustomModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const WithTrigger = (args: Record<string, unknown>) => ({
  components: { CustomModal, CustomButton },
  setup: () => {
    const open = ref(false);
    return { args, open };
  },
  template: `
    <div>
      <CustomButton label="Open Modal" @click="open = true" />
      <CustomModal v-bind="args" v-model="open">
        <p>This is the modal content area. You can place any content here.</p>
        <template #footer>
          <CustomButton variant="secondary" label="Cancel" @click="open = false" />
          <CustomButton label="Confirm" @click="open = false" />
        </template>
      </CustomModal>
    </div>
  `,
});

export const Default: Story = { render: WithTrigger };
export const Small: Story = { args: { size: 'sm' }, render: WithTrigger };
export const Large: Story = { args: { size: 'lg' }, render: WithTrigger };
export const NoBackdropClose: Story = { args: { closeOnBackdrop: false }, render: WithTrigger };

export const WithoutFooter: Story = {
  render: (args) => ({
    components: { CustomModal, CustomButton },
    setup: () => {
      const open = ref(false);
      return { args, open };
    },
    template: `
      <div>
        <CustomButton label="Open Modal" @click="open = true" />
        <CustomModal v-bind="args" v-model="open">
          <p>This modal has no footer slot.</p>
        </CustomModal>
      </div>
    `,
  }),
};

// Verifies the modal opens and closes correctly
export const OpensAndCloses: Story = {
  render: (args) => ({
    components: { CustomModal, CustomButton },
    setup: () => {
      const open = ref(false);
      return { args, open };
    },
    template: `
      <div>
        <CustomButton label="Open Modal" @click="open = true" />
        <CustomModal v-bind="args" v-model="open">
          <p>Modal content</p>
          <template #footer>
            <CustomButton label="Cancel" @click="open = false" />
          </template>
        </CustomModal>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openBtn = canvas.getByRole('button', { name: /open modal/i });
    await userEvent.click(openBtn);
    
    const dialog = within(document.body).getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    
    const closeBtn = within(document.body).getByRole('button', { name: /^cancel$/i, hidden: false});
    await userEvent.click(closeBtn);

    await waitFor(() => expect(within(document.body).queryByRole('dialog')).not.toBeInTheDocument());
  },
};

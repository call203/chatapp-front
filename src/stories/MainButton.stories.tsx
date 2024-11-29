import type { Meta, StoryObj } from "@storybook/react";
import { MainButton } from "../components/MainButton";

const meta = {
  title: "Component/Button",
  component: MainButton,
  ypes: {
    children: { control: "text" },
    backgroundColor: { control: "color" },
    disabled: { control: "boolean" }
  }
} as Meta<typeof MainButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
    backgroundColor: "#34394b", // Default background color (blue)
    disabled: false // Default not disabled
  }
};

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import "./index.css";
import Slider from "./Slider";
import Slide from "./Slide";

const meta: Meta<typeof Slider> = {
  title: "JynzoComponents/JynzoSlider",
  component: Slider,
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Main: Story = {
  render: (args) => (
    <Slider {...args}>
      <Slide>
        <div className="content">1</div>
      </Slide>
      <Slide>
        <div className="content">2</div>
      </Slide>
      <Slide>
        <div className="content">3</div>
      </Slide>
      <Slide>
        <div className="content">4</div>
      </Slide>
      <Slide>
        <div className="content">5</div>
      </Slide>
      <Slide>
        <div className="content">6</div>
      </Slide>
    </Slider>
  ),
};

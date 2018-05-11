import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";

import { Button, Modal } from "antd";

import WelcomeMessage from "../../src/components/WelcomeMessage";
import ReactDOM from "react-dom";


describe("WelcomeMessage", () => {

  let welcomeMessage;

  beforeEach(() => {
    welcomeMessage = mount(<WelcomeMessage />);
  });

  function $$(className) {
    return document.body.querySelectorAll(className);
  }

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WelcomeMessage />, div);
  });

  it("should have exact okText", () => {
    expect(welcomeMessage.find(Modal).prop("okText")).to.equal("Proceed to dApp");
  });

  it("should have exact title", () => {
    expect(welcomeMessage.find(Modal).prop("title")).to.equal("Welcome To MarketProtocol.io");
  });

  it("should be visible true", () => {
    welcomeMessage.setState({ visible: true });
    expect(welcomeMessage.find(Modal).prop("visible")).to.equal(true);
  });

  it("click proceed to dApp should hide the modal", () => {
    $$('.ant-btn-primary')[0].click();
    expect(welcomeMessage.find(Modal).prop("visible")).to.equal(false);
  });

});

import React, { Component } from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { PriceGraph } from '../../../src/components/DeployContract/PriceGraph';

describe('Price cap/floor graph', () => {
  let wrapper;
  let canvas;
  let ctx;
  const priceFloor = 1;
  const price = 2;
  const priceCap = 3;

  let beginPathSpy;
  let moveToSpy;
  let lineToSpy;
  let strokeSpy;
  let fillTextSpy;
  let setTransformSpy;
  let drawImageSpy;

  let updateCanvasSpy;

  beforeAll(() => {
    wrapper = mount(
      <PriceGraph priceFloor={priceFloor} price={price} priceCap={priceCap} />
    );
    canvas = wrapper.instance().refs.canvas;
    ctx = wrapper.instance().refs.canvas.getContext('2d');

    beginPathSpy = sinon.spy(ctx, 'beginPath');
    moveToSpy = sinon.spy(ctx, 'moveTo');
    lineToSpy = sinon.spy(ctx, 'lineTo');
    strokeSpy = sinon.spy(ctx, 'stroke');
    fillTextSpy = sinon.spy(ctx, 'fillText');
    setTransformSpy = sinon.spy(ctx, 'setTransform');
    drawImageSpy = sinon.spy(ctx, 'drawImage');
    updateCanvasSpy = sinon.spy(wrapper.instance(), 'updateCanvas');
  });

  it('correctly draws a line on the graph', () => {
    const position = 1;
    const color = '#ffffff';
    const text = 'text';
    wrapper.instance().line(ctx, position, color, text);

    expect(ctx.strokeStyle).to.equal(color);
    expect(ctx.fillStyle).to.equal(color);
    expect(beginPathSpy.calledOnce).to.equal(true);
    expect(moveToSpy.calledWith(20, position)).to.equal(true);
    expect(lineToSpy.calledWith(180, position)).to.equal(true);
    expect(strokeSpy.calledOnce).to.equal(true);
    expect(ctx.font).to.equal("14px 'Work Sans', sans-serif ");
    expect(fillTextSpy.calledWith(text, 200, position + 5, 100)).to.equal(true);
  });

  it('correctly sets the DPI scale', () => {
    const dpi = 300;
    wrapper.instance().setDPI(canvas, dpi);

    expect(setTransformSpy.calledWith(dpi / 96, 0, 0, dpi / 96, 0, 0)).to.equal(
      true
    );
    expect(drawImageSpy.calledOnce).to.equal(true);
    expect(setTransformSpy.callCount).to.equal(2);
  });

  it('is correct width and height', () => {
    expect(canvas.style.width).to.equal('300px');
    expect(canvas.style.height).to.equal('160px');
  });

  it('updates when the price cap/floor changes', () => {
    wrapper.setProps({
      priceCap: 4,
      priceFloor: 2
    });
    expect(updateCanvasSpy.calledOnce).to.equal(true);
  });
});

import React from 'react';

function line(ctx, position, color, text) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(20, position);
  ctx.lineTo(180, position);
  ctx.stroke();
  ctx.font = "14px 'Work Sans', sans-serif ";
  ctx.fillText(text, 200, position + 5, 100);
}
export class PriceGraph extends React.Component {
  componentDidMount() {
    this.updateCanvas();
    this.setDPI(this.refs.canvas, 300);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.priceCap !== prevProps.priceCap ||
      this.props.priceFloor !== prevProps.priceFloor
    ) {
      this.updateCanvas();
    }
  }

  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, 300, 160);
      line(ctx, 20, '#ffffff', 'Price Cap');
      line(ctx, 150, '#ffffff', 'Price Floor');

      let pY =
        150 -
        (130 / 100) *
          (((this.props.price - this.props.priceFloor) * 100) /
            (this.props.priceCap - this.props.priceFloor));
      pY = pY >= 135 ? 135 : pY <= 35 ? 35 : pY;
      line(ctx, pY, '#00FFE2', this.props.price);
    }
  }
  setDPI(canvas, dpi) {
    canvas.style.width = canvas.style.width || canvas.width + 'px';
    canvas.style.height = canvas.style.height || canvas.height + 'px';
    let scaleFactor = dpi / 96;
    let width = parseFloat(canvas.style.width);
    let height = parseFloat(canvas.style.height);
    let oldScale = canvas.width / width;
    let backupScale = scaleFactor / oldScale;
    let backup = canvas.cloneNode(false);

    backup.getContext('2d').drawImage(canvas, 0, 0);
    let ctx = canvas.getContext('2d');
    canvas.width = Math.ceil(width * scaleFactor);
    canvas.height = Math.ceil(height * scaleFactor);
    ctx.setTransform(backupScale, 0, 0, backupScale, 0, 0);
    ctx.drawImage(backup, 0, 0);
    ctx.setTransform(scaleFactor, 0, 0, scaleFactor, 0, 0);
  }
  render() {
    return (
      <canvas
        ref="canvas"
        width={300}
        height={160}
        style={{ marginLeft: '-20px' }}
      />
    );
  }
}

import * as PIXI from 'pixi.js';

export class MatrixLine {
  private x: number;
  private symbols: PIXI.Text[] = [];
  private state: 'fadingIn' | 'fadingOut' | 'active' = 'fadingIn';
  private transitionProgress = 0;
  private speed = 0;
  private nextTransition = 0;
  private stage: PIXI.Container;
  private config: {
    fontSize: number;
    maxSpeed: number;
    minSpeed: number;
    fadeDuration: number;
    minLineDuration: number;
    maxLineDuration: number;
    symbolSpacing: number;
    height: number;
  };
  private symbolsSet: string[];
  private textStyle: PIXI.TextStyle;
  private color: number;

  constructor(
    x: number,
    stage: PIXI.Container,
    config: {
      fontSize: number;
      maxSpeed: number;
      minSpeed: number;
      fadeDuration: number;
      minLineDuration: number;
      maxLineDuration: number;
      symbolSpacing: number;
      height: number;
    },
    symbols: string[],
    style: PIXI.TextStyle,
    color: number = 0x800080
  ) {
    this.x = x;
    this.stage = stage;
    this.config = config;
    this.symbolsSet = symbols;
    this.textStyle = style;
    this.color = color;
    this.createNewLine();
  }

  private createNewLine() {
    this.symbols.forEach((s) => s.destroy());
    this.symbols = [];

    this.speed =
      this.config.minSpeed +
      Math.random() * (this.config.maxSpeed - this.config.minSpeed);

    const spacing = this.config.fontSize * this.config.symbolSpacing;
    const lineLength = Math.ceil((this.config.height * 2) / spacing);
    const startY = -spacing;

    for (let i = 0; i < lineLength; i++) {
      const char =
        this.symbolsSet[
          Math.floor(Math.random() * this.symbolsSet.length)
        ];
      const text = new PIXI.Text(char, this.textStyle);
      text.tint = this.color;
      text.x = this.x;
      text.y = startY - i * spacing;
      text.alpha = 0;
      this.stage.addChild(text);
      this.symbols.push(text);
    }

    this.nextTransition =
      this.config.minLineDuration +
      Math.random() *
        (this.config.maxLineDuration - this.config.minLineDuration);
  }

  public update(delta: number) {
    switch (this.state) {
      case 'fadingIn':
        this.transitionProgress += delta;
        this.symbols.forEach((s) => {
          s.alpha = this.transitionProgress / this.config.fadeDuration;
          s.y += this.speed * delta;
          this.wrapSymbol(s);
        });
        if (this.transitionProgress >= this.config.fadeDuration) {
          this.state = 'active';
          this.transitionProgress = 0;
        }
        break;
      case 'active':
        this.nextTransition -= delta;
        this.symbols.forEach((s) => {
          s.y += this.speed * delta;
          this.wrapSymbol(s);
        });
        if (this.nextTransition <= 0) {
          this.state = 'fadingOut';
          this.transitionProgress = 0;
        }
        break;
      case 'fadingOut':
        this.transitionProgress += delta;
        this.symbols.forEach((s) => {
          s.alpha = 1 - this.transitionProgress / this.config.fadeDuration;
          s.y += this.speed * delta;
          this.wrapSymbol(s);
        });
        if (this.transitionProgress >= this.config.fadeDuration) {
          this.createNewLine();
          this.state = 'fadingIn';
          this.transitionProgress = 0;
        }
        break;
    }
  }

  private wrapSymbol(symbol: PIXI.Text) {
    if (symbol.y > this.config.height) {
      const spacing = this.config.fontSize * this.config.symbolSpacing;
      const topSymbol = this.symbols.reduce((prev, curr) =>
        curr.y < prev.y ? curr : prev
      );
      symbol.y = topSymbol.y - spacing;
      symbol.text =
        this.symbolsSet[
          Math.floor(Math.random() * this.symbolsSet.length)
        ];
      symbol.tint = this.color;
    }
  }

  public resize(newX: number) {
    if (this.symbols.length === 0) return;
    const spacing = this.config.fontSize * this.config.symbolSpacing;
    const baseY = this.symbols[0].y;
    this.x = newX;
    this.symbols.forEach((symbol, i) => {
      symbol.x = newX;
      symbol.y = baseY + i * spacing;
    });
  }

  public setColor(color: number) {
    this.color = color;
    this.symbols.forEach((s) => (s.tint = color));
  }

  public setSymbolsSet(symbols: string[]) {
    this.symbolsSet = symbols;
  }

  public destroy() {
    this.symbols.forEach((s) => s.destroy());
    this.symbols = [];
  }
}

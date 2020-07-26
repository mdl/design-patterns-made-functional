abstract class BreadBuilder {
  abstract bakeBasis(): void
  abstract salt(): void
  abstract addAdditives(): void
  // to make it simple
  bread: any
}

class RyeBread implements BreadBuilder {
  bread: any;

  addAdditives(): void {}
  bakeBasis(): void {}
  salt(): void {}
}

class WheatBread implements BreadBuilder {
  bread: any;

  addAdditives(): void {}
  bakeBasis(): void {}
  salt(): void {}
}

class Baker {
  constructor(private builder: BreadBuilder) {}

  bake() {
    this.builder.bakeBasis();
    this.builder.addAdditives();
    this.builder.salt();
  }
}


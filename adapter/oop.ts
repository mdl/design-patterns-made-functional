abstract class Target {
  abstract targetMethod(): void;
}

abstract class Adaptee {
  abstract adapteeMethod(): void;
}

class Adapter implements Target {
  constructor(private adaptee: Adaptee) {}

  targetMethod(): void {
    return this.adaptee.adapteeMethod();
  }
}
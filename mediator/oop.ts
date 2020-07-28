abstract class Mediator {
  abstract push(msg: any, member: Member<any>): void
}

abstract class Member<TData> {
  mediator: Mediator | undefined;
  abstract notify(data: TData): void
}

class Farmer implements Member<string> {
  mediator;

  notify(product: string): void
    {console.log(`Farmer received a request to make ${product}`)}
  done() {this.mediator.push('done', this)}
}

class CanFactory implements Member<never> {
  mediator;

  notify() {console.log(`Can factory received a request to make a can`)}
  done() {this.mediator.push('done', this)}
}

class MediatorGuy implements Mediator {
  constructor(
    private farmer: Farmer,
    private factory: CanFactory) {
    farmer.mediator = this;
    factory.mediator = this;
  }

  produceJuice() {
    this.farmer.notify('Apple');
    this.factory.notify();
  }

  push(msg: any, member: Member<any>): void {
    console.log(`${member} has finished ${msg}`)
  }
}

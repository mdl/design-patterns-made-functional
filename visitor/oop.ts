type Visitor = {
  visitElementA(elemA: ElementA): void;
  visitElementB(elemB: ElementB): void;
}

type El = {
  state: string;
  accept(visitor: Visitor): void;
}

// Elements should know that they can be visited, and also they know about structure of visitors
// (so they know about existense of other elements which is bad)
// ^ this can be fixed by something like this
// type Visitor = VisitorA & VisitorB & VisitorC
// type VisitorA = {visitElementA(elemA: ElementA): void;}
// type VisitorB = {visitElementB(elemB: ElementB): void;}
// type VisitorC = {visitElementC(elemC: ElementC): void;}
// and then
// class ElementA implements El {
//   state = 'element1'
//
//   accept(visitor: VisitorA)
//     { visitor.visitElementA(this); }
//   operationB(): void { }
// }
// ...

class ElementB implements El {
  state = 'element1'

  accept(visitor: Visitor)
    { visitor.visitElementB(this); }
  operationB(): void { }
}

class ElementA implements El {
  state = 'element2'

  accept(visitor: Visitor)
    { visitor.visitElementA(this); }
  operationA(): void { }
}

// Visitor implements some "behavior 1" among all instances of "Element"
class ConcreteVisitor1 implements Visitor {
  visitElementA(elementA: ElementA)
    { elementA.operationA(); }
  visitElementB(elementB: ElementB)
    { elementB.operationB(); }
}

// Visitor implements some "behavior 2" among all instances of "Element"
class ConcreteVisitor2 implements Visitor {
  visitElementA(elementA: ElementA)
    { elementA.operationA(); }
  visitElementB(elementB: ElementB)
    { elementB.operationB(); }
}

class Client {
  main() {
    const structure = new ObjectStructure();
    structure.add(new ElementA());
    structure.add(new ElementB());
    structure.accept(new ConcreteVisitor1());
    structure.accept(new ConcreteVisitor2());
  }
}

class ObjectStructure {
  elements: El[] = [];
  add(element: El)
  { this.elements.push(element); }
  remove(element: El)
  { this.elements = this.elements.filter(e => e !== element); }
  accept(visitor: Visitor)
  { this.elements.forEach(e => e.accept(visitor)); }
}
abstract class AbstractWaterState {
  abstract heat(ctx: AbstractWater): AbstractWaterState
  abstract cold(ctx: AbstractWater): AbstractWaterState
}

abstract class AbstractWater {
  state: AbstractWaterState
  isSalty: boolean
}

// Concrete
class Ice implements AbstractWaterState {
  cold(): AbstractWaterState {return new Ice}
  heat(): AbstractWaterState {return new Ice}
}

class Gas implements AbstractWaterState {
  cold(): AbstractWaterState {return new Liquid}
  heat(): AbstractWaterState {return new Gas}
}

class Liquid implements AbstractWaterState {
  cold(): AbstractWaterState {return new Ice}
  heat(): AbstractWaterState {return new Liquid}
}

class Water implements AbstractWater {
  isSalty = true;
  state: AbstractWaterState = new Liquid;
  cold() {this.state.cold(this)}
  heat() {this.state.cold(this)}
}
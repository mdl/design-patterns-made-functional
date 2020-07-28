type Pos = {x: number, y: number}

class Hero {
  position: Pos;
  health: number;
  shoot() {console.log('shooting')}
  saveState(): HeroMemento {
    return {
      health: this.health,
      position: this.position,
    }
  }
  setState({position, health}: HeroMemento) {
    this.position = position;
    this.health = health;
  }
}

class HeroMemento {
  position: Pos;
  health: number;
}

class Caretaker {
  saves: HeroMemento[];
}
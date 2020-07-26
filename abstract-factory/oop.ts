abstract class MoveStyle {abstract move(): void}
abstract class FightStyle {abstract fight(): void}
abstract class HealStyle {abstract heal() : void}
abstract class AbstractHero {
  move: MoveStyle
  fight: FightStyle
  heal: HealStyle
}
abstract class HeroFactory {
  abstract getMove(): MoveStyle
  abstract getFight(): FightStyle
  abstract getHeal(): HealStyle
}
//---------------------------------------------------
class Run implements MoveStyle
  {move() {console.log('Running')}}
class Fly implements MoveStyle
  {move() {console.log('Flying')}}

class Sword implements FightStyle
  {fight() {console.log('Hitting with sword')}}
class Bow implements FightStyle
  {fight() {console.log('Hitting with bow')}}
class NullFight implements FightStyle
  {fight() {console.log('Not able to fight')}}

class BandageWounds implements HealStyle
  {heal() {console.log('Bandaging wounds')}}
class NullRestore implements HealStyle
  {heal() {console.log('Not able to heal')}}

class ElfFactory implements HeroFactory {
  getFight() {return new Bow}
  getHeal() {return new BandageWounds}
  getMove() {return new Fly}
}
class WarriorFactory implements HeroFactory {
  getFight() {return new Sword}
  getHeal() {return new NullRestore}
  getMove() {return new Run}
}
class DruidFactory implements HeroFactory {
  getFight() {return new NullFight}
  getHeal() {return new BandageWounds}
  getMove() {return new Run}
}
class Hero implements AbstractHero {
  fight = this.factory.getFight()
  heal = this.factory.getHeal()
  move = this.factory.getMove()
  constructor(private factory: HeroFactory) {}
}




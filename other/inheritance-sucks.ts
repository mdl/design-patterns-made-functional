// fighter, mage, archer, paladin, knight\
// fighter can fight
// mage can cast
// archer can shoot
// paradin can cast and fight
// knight can fight and shoot
// ranger can cast and shoot

// Our goal is maximizing behavior reuse
type Fighter = {fight: () => string}
type Mage = {cast: () => string}
type Archer = {shoot: () => string}
type Knight = Fighter & Archer
type Paladin = Fighter & Mage
type Ranger = Archer & Mage

// The problem here is that it's not possible to express such example via
// inheritance chain !!!


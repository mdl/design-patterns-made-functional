const run = () => console.log('Running')
const fly = () => console.log('Flying')

const fightWithSword = () => console.log('Hitting with sword')
const fightWithBow = () => console.log('Hitting with bow')

const bandageWounds = () => console.log('Bandaging wounds')

enum Hero {
  Elf = 'Elf',
  Warrior = 'Warrior',
  Druid = 'Druid'
}

type Elf = ReturnType<typeof elf>
const elf = () => ({
  type: Hero.Elf,
  fightWithBow, bandageWounds, fly
})

type Warrior = ReturnType<typeof warrior>
const warrior = () => ({
  type: Hero.Warrior,
  fightWithSword, run
})

type Druid = ReturnType<typeof druid>
const druid = () => ({
  type: Hero.Druid,
  bandageWounds, run
})


import Rpipe from 'ramda/es/pipe'
import Rmap from 'ramda/es/map'
import RsortBy from 'ramda/es/sortBy'
import Rprop from 'ramda/es/prop'
import Rfilter from 'ramda/es/filter'
import Rwhere from 'ramda/es/where'

const addUncurried: (x: number, y: number) => number
  = (x, y) => x + y

const addCurried: (x: number) => (y: number) => number
  = x => y => x + y

// Defining deneric add5 functions that always adds 5 to the argument
type Add5 = (x: number) => number

// Option 1
const add5: Add5 = x => addUncurried(5, x)

// Option 2
const add5C: Add5 = addCurried(5)

const pipe = (...fns) => x => fns.reduce((res, fn) => fn(res), x)

// ---------------------------------
type User = {
  id: string
  name: string
  male: boolean
}

// Declarative style via ramda
// Final expression is composed of many smaller blocks
// somewhat similar to custom rxjs operators
const sortUserTasksR: (users: User[]) => User[] = 
  Rpipe(
    RsortBy(Rprop('name')),
    Rfilter(Rwhere({male: true})),
    Rmap(Rprop('id'))
  )

// Imperative style via native js
// 
const sortUserTasksJs: (users: User[]) => User[] = users => {
  const usersSorted = [...users].sort(({name: name1}, {name: name2}) =>
    name1 < name2
      ? -1
      : name1 > name2
        ? 1
        : 0
  )

  return usersSorted
    .filter(({male}) => male)
    .map(({id}) => id);
}


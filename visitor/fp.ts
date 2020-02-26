// Experiments with Pattern Matching
type Tagged = {_tag: string}

type Tags<TUnionType extends Tagged> = TUnionType['_tag']

type TagTypeMap<TTags extends string, TUnionType extends Tagged> = {
  [TTag in TTags]: TUnionType extends {_tag: TTag} ? TUnionType : never
}

type Pattern<TResult, TTagTypeMap> = {
  [K in keyof TTagTypeMap]: (item: TTagTypeMap[K]) => TResult
}

type Patt<TResult, TUnionType extends Tagged> =
  Pattern<TResult, TagTypeMap<Tags<TUnionType>, TUnionType>> 

const match = <TUnionType extends Tagged, TObject extends TUnionType, TResult>
  (pattern: Patt<TResult, TUnionType>) =>
    (object: TObject) =>
      pattern[object._tag][object] as TResult

// ------------------Sample------------------
type Square = {len: number, _tag: 'Square'}
type Circle = {rad: number, _tag: 'Circle'}
type Rectangle = {xlen: number, ylen: number, _tag: 'Rectangle'}

type Shape = Square | Circle | Rectangle

const shapes = [
  {len: 1} as Square,
  {rad: 2} as Circle,
  {xlen: 3, ylen: 4} as Rectangle
]

// PATTERN MATCHING SAMPLE
// Without PM (sucks)
const descriptions1: string[] = []

for (let shape of shapes) {
  switch (shape._tag) {
    case "Circle":
      descriptions1.push(`I am circle with radius ${shape.rad}`)
      break
    case "Square":
      descriptions1.push(`I am square with length ${shape.len}`)
      break
    case "Rectangle":
      descriptions1.push(`I am rectangle with sides ${shape.xlen} and ${shape.ylen}`)
      break
  }
}

// With PM (looks good)
const shapeDescription: Patt<string, Shape> = {
  Square: ({len}) => `I am square with length ${len}`,
  Circle: ({rad}) => `I am circle with radius ${rad}`,
  Rectangle: ({xlen, ylen}) => `I am rectangle with sides ${xlen} and ${ylen}`
}

const descriptions2 = shapes.map(match(shapeDescription))


// ----------------------------------------------------------------------------------------
// Visitor implementation via functional techniques
// What visitor does is basically ability to add some behavior to existing models
// which may or may not be contained within some data structure
// (which seems the case where the visitor shines)
type DataStructure = Array<Shape>

const foldDS: <TAcc, TValue>
  (fn: (a: TAcc, v: TValue) => TAcc) =>
  (init: TAcc) =>
  (ds: Array<TValue>) =>
  TAcc =
  fn => init => ds => ds.reduce(fn, init)

const shapesDS: DataStructure = [
  {len: 1} as Square,
  {rad: 2} as Circle,
  {xlen: 3, ylen: 4} as Rectangle
]

// #region 'Visitor' # 1
const shapeArea = match({
  Square: ({len}) => len * len,
  Circle: ({rad}) => 3.14 * rad * rad,
  Rectangle: ({xlen, ylen}) => xlen * ylen
} as Patt<number, Shape>)

const largestArea = foldDS<number, Shape>((currLargest, shape) => Math.max(currLargest, shapeArea(shape)))(0)
// #endregion

// #region 'Visitor' # 2
const shapePerimeter = match({
  Square: ({len}) => 4 * len ,
  Circle: ({rad}) => 2 * 3.14 * rad,
  Rectangle: ({xlen, ylen}) => xlen + xlen + ylen + ylen
} as Patt<number, Shape>)

const totalPerimeter = foldDS<number, Shape>((total, shape) => total + shapePerimeter(shape))(0)
// #endregion

















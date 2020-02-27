// region -------Pattern matching--------
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
// endregion

type Plus = {_tag: 'Plus', x: number}
type Minus = {_tag: 'Minus', x: number}

type CalcCommand = Plus | Minus

const plus: (x: number) => Plus =
  x => ({_tag: 'Plus', x})

const minus: (x: number) => Minus =
  x => ({_tag: 'Minus', x})

const calculator: (state: number, command: CalcCommand) => number =
  (state, command) => {
    const matcher = match({
      Minus: ({x}) => state - x,
      Plus: ({x}) => state + x,
    } as Patt<number, CalcCommand>)

    return matcher(command)
  }

const commands = [plus(10), plus(5), minus(8)]

const result = commands.reduce(calculator, 0)
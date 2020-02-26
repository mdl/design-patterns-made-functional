type Command<TExecutor> = {
  do: () => void;
  undo: () => void;
}

// Calculator Sample
type CalcExecutor = {
  plus(x: number): void;
  minus(x: number): void;
}

const createExecutor = (state = 0): CalcExecutor => ({
  plus(x: number) {state += x},
  minus(x: number) {state -= x},
});

const createAddCommand = (x: number, executor: CalcExecutor): Command<CalcExecutor> => {
  return {
    do: () => executor.plus(x),
    undo: () => executor.minus(x),
  }
};

const createSubtractCommand = (x: number, executor: CalcExecutor): Command<CalcExecutor> => {
  return {
    do: () => executor.minus(x),
    undo: () => executor.plus(x),
  }
};

const client = () => {
  const executor = createExecutor();
  const commands = [createAddCommand(10, executor), createAddCommand(5, executor), createSubtractCommand(8, executor)];

  for (let command of commands) {
    command.do();
  }

  commands[commands.length].undo();
};
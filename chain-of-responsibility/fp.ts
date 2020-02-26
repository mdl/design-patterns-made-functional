// Need support for cancellation at each stage
type Result<TData> = {
  $$resolved?: true;
  data: TData
}
const resolved = <TData>(data: TData): Result<TData> => ({ $$resolved: true, data });
const unresolved = <TData>(data: TData): Result<TData> => ({ data });
type Handler<TData, TResponse> = (data: TData) => Result<TData>
const process = (handlers: Handler<any, any>[], input: any) => {
  let acc = input;

  for (const handler of handlers) {
    const result = handler(acc);
    if (result.$$resolved) return result.data;
    acc = result.data;
  }
};

// SAMPLE
const handler2: Handler<string, string> = data =>
    resolved(`(handler2: ${data})`);

const handler1: Handler<string, string> = data =>
    unresolved(`(handler1: ${data})`);

const handlers = [handler1, handler2];
process(handlers, 'input');

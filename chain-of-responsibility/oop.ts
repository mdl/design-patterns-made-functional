type Handler<TData, TResponse> = {
  next?: Handler<TData, TResponse>;
  handle: (data: TData) => TResponse;
}

// SAMPLE
const handler2: Handler<string, string> = {
  handle(data: string) {
    return `(handler2: ${data})`
  }
};

const handler1: Handler<string, string> = {
  next: handler2,
  handle(data: string) {
    return `(handler1: ${this.next.handle(data)})`
  }
};

handler1.handle('input');

type Handler<T = any> = (event?: T) => void;

export class EventBus {
  private events: Record<string, Handler[]> = {};
  on<T = any>(event: string, handler: Handler<T>) {
    (this.events[event] || (this.events[event] = [])).push(handler);
  }

  emit<T = any>(event: string, data?:T) {
    (this.events[event] || []).forEach(handler => handler(data));
  }
}
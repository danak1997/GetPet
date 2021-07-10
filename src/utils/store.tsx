import React, { useContext, useEffect, useState } from 'react';

let storeObject = {
  state: {
    todos: [
      { id: 0, text: 'First Todo' },
      { id: 1, text: 'Second Todo' },
    ],
  },
  update(newState: any) {
    this.state = newState;
  },
};

const StoreContext = React.createContext<any>(storeObject);

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const EventEmitter = {
  listeners: [] as Function[],
  subscribe(listener: Function) {
    this.listeners.push(listener);
  },
  unsubscribe(listener: any) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  },
  notify() {
    this.listeners.forEach((listener) => listener());
  },
};

export function useStore<T>(queryFunction: Function): T {
  // const [, refresh] = useState();
  const storeObject = useContext(StoreContext);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const a = () => setCount(count + 1);
    EventEmitter.subscribe(a);

    return () => EventEmitter.unsubscribe(a);
  }, [count]);

  return queryFunction(storeObject.state);
}

export const useUpdateStore = () => {
  const [count, setCount] = useState(0);
  const storeFromContext = useContext(StoreContext);

  useEffect(() => {
    const refresher = () => setCount(count + 1);
    EventEmitter.subscribe(refresher);

    return () => EventEmitter.unsubscribe(refresher);
  }, [count]);

  return (updated: any) => {
    storeFromContext.update({ ...storeFromContext.state, ...updated });
    EventEmitter.notify();
  };
};

export default function StoreProvider({ children }: Props) {
  return (
    <StoreContext.Provider value={storeObject}>
      {children}
    </StoreContext.Provider>
  );
}

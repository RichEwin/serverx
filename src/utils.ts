import 'server-only';
import { cache } from 'react';

/**
 * Creates a lazily-initialized context with getter and setter functions for a given data type.
 * 
 * This factory ensures that context data is cached and accessed safely. If `getContext` is called
 * before a value is set, an error will be thrown to help with debugging.
 * 
 * @template Data - The type of the context data to be stored.
 * @param {string} name - A unique name for the context, used in error messages.
 * @returns {[() => Data, (value: Data) => void]} A tuple containing:
 *   - `getContext`: A function to retrieve the current context value. Throws an error if not set.
 *   - `setContext`: A function to set the context value.
 */
export function contextFactory<Data>(name: string) {
  const context = cache(() => {
    const container: { current?: Data } = {};

    return container;
  });

  function setContext(value: Data) {
    context().current = value;
  }

  function getContext() {
    const value = context().current;

    if (typeof value === 'undefined') {
      const errorMessage = `Accessing undefined context value: ${name}`;

      throw new Error(errorMessage);
    }

    return value;
  }

  return [getContext, setContext] as const;
}
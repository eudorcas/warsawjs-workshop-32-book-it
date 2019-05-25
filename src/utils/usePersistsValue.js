import { useState } from 'react';

export default function usePersistsValue(key, initialValue) {
  const [storedValue] = useState();

  const setValue = value => {};

  return [storedValue, setValue];
}

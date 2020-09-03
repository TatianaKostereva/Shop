import { useCallback } from 'react';
import debounce from '@/utils/debounce';

const useDebounce = (func) => useCallback(debounce(func), [func]);

export default useDebounce;

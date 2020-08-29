import { useCallback } from 'react';
import Debounce from '@/utils/debounce';

const useDebounce = (func) => useCallback(Debounce(func), [func]);

export default useDebounce;

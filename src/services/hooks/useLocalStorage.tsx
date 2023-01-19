import { useEffect, useState } from 'react';
import { Exercise } from '../../types/types';

function useLocalStorage(
    key: string,
    initialValue?: Exercise[]
  ): [
    Exercise[], (item: Exercise[]) => void
  ] {
    
	const [state, setState] = useState(() => {
		if (!initialValue) {
      initialValue = [];
    }
		try {
			const value = localStorage.getItem(key);
			if (value) {
				return JSON.parse(value);
			} else {
				throw new Error();
			}
		} catch (error) {
			return initialValue;
		}
	});

	useEffect(() => {
		if (state) {
			try {
				localStorage.setItem(key, JSON.stringify(state));
			} catch (error) {
				console.log(error);
			}
		}
	}, [state, key]);

	return [state, setState];
}

export default useLocalStorage;

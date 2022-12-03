import { useCallback, useRef } from 'react';

// The code is from
// https://learnersbucket.com/examples/interview/usethrottle-hook-in-react/

const useThrottle = (
  fn: any,
  wait: number,
  option = { leading: true, trailing: true }
) => {
  const timerId: any = useRef(); // track the timer
  const lastArgs: any = useRef(); // track the args

  // create a memoized debounce
  const throttle = useCallback(
    function (...args: any[]) {
      const { trailing, leading } = option;
      // function for delayed call
      const waitFunc = () => {
        // if trailing invoke the function and start the timer again
        if (trailing && lastArgs.current) {
          fn.apply(this, lastArgs.current);
          lastArgs.current = null;
          timerId.current = setTimeout(waitFunc, wait);
        } else {
          // else reset the timer
          timerId.current = null;
        }
      };

      // if leading run it right away
      if (!timerId.current && leading) {
        fn.apply(this, args);
      }
      // else store the args
      else {
        lastArgs.current = args;
      }

      // run the delayed call
      if (!timerId.current) {
        timerId.current = setTimeout(waitFunc, wait);
      }
    },
    [fn, wait, option]
  );

  return throttle;
};

export default useThrottle;

import * as React from 'react';

const Slot = React.forwardRef(({ children, ...props }, ref) => {
  return React.cloneElement(children, {
    ...props,
    ref,
  });
});

Slot.displayName = 'Slot';

export { Slot };

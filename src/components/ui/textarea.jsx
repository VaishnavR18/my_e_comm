import React from 'react';

export const Textarea = React.forwardRef(({ className = '', ...props }, ref) => (
  <textarea
    ref={ref}
    className={`border rounded-md p-2 w-full resize-none ${className}`}
    rows={4}
    {...props}
  />
));

Textarea.displayName = 'Textarea';

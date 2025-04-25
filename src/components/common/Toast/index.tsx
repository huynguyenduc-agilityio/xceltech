import { Check, X } from 'lucide-react';

// Types
import { ToastStatus } from '@/types';

// Hooks
import { useToast } from '@/hooks';

// Utils
import { cn } from '@/utils';

import {
  ToastRoot,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './base/toast';

const Toast = () => {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, status, title, description, action, ...props }) => {
        const isSuccess = status === ToastStatus.Success;

        return (
          <ToastRoot
            key={id}
            {...props}
            className={cn(
              'border-l-8 p-4 shadow-lg rounded-lg',
              isSuccess
                ? 'border-green-primary bg-green-100'
                : 'border-red-600 bg-red-100',
            )}
          >
            <div className="flex items-center gap-3">
              <div className="flex item-center w-6">
                {isSuccess ? (
                  <div className="flex justify-center items-center w-6 h-6 rounded-full bg-green-primary">
                    <Check className="text-white w-4 h-4" />
                  </div>
                ) : (
                  <div className="flex justify-center items-center w-6 h-6 rounded-full bg-red-600">
                    <X className="text-white w-4 h-4" />
                  </div>
                )}
              </div>
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </ToastRoot>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
};

export default Toast;

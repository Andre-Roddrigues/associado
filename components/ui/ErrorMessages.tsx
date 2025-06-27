// components/ui/ErrorMessages.tsx
import React from 'react';

interface ErrorMessagesProps {
    errors: { [key: string]: string };
}

const ErrorMessages: React.FC<ErrorMessagesProps> = ({ errors }) => {
    return (
        <div>
            {Object.keys(errors).map((key) => (
                <p key={key} className="text-red-500 text-xs mt-1">
                    {errors[key]}
                </p>
            ))}
        </div>
    );
};

export default ErrorMessages;

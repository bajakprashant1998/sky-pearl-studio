import { useEffect, useRef } from 'react';

declare global {
    interface Window {
        turnstile: {
            render: (
                element: string | HTMLElement,
                options: {
                    sitekey: string;
                    callback: (token: string) => void;
                    'error-callback': () => void;
                }
            ) => string;
            reset: (widgetId: string) => void;
            remove: (widgetId: string) => void;
        };
    }
}

interface TurnstileWidgetProps {
    onVerify: (token: string) => void;
    onError?: () => void;
}

const TurnstileWidget = ({ onVerify, onError }: TurnstileWidgetProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetId = useRef<string | null>(null);

    useEffect(() => {
        // Load script if not already loaded
        const scriptId = 'turnstile-api';
        let script = document.getElementById(scriptId) as HTMLScriptElement;

        if (!script) {
            script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
        }

        const renderWidget = () => {
            if (containerRef.current && window.turnstile) {
                // Clear previous widget if any
                if (widgetId.current) {
                    window.turnstile.remove(widgetId.current);
                }

                try {
                    widgetId.current = window.turnstile.render(containerRef.current, {
                        sitekey: 'TURNSTILE_SITE_KEY', // Placeholder as requested
                        callback: (token: string) => {
                            onVerify(token);
                        },
                        'error-callback': () => {
                            if (onError) onError();
                        },
                    });
                } catch (e) {
                    console.error('Turnstile render error:', e);
                }
            }
        };

        // If script is already loaded (or loads immediately)
        if (window.turnstile) {
            renderWidget();
        } else {
            script.addEventListener('load', renderWidget);
        }

        return () => {
            if (widgetId.current && window.turnstile) {
                window.turnstile.remove(widgetId.current);
            }
            script.removeEventListener('load', renderWidget);
        };
    }, [onVerify, onError]);

    return <div ref={containerRef} className="min-h-[65px]" />;
};

export default TurnstileWidget;

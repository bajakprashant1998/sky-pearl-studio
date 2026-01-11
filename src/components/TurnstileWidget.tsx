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
    siteKey: string;
    onVerify: (token: string) => void;
    onError?: () => void;
}

const TurnstileWidget = ({ siteKey, onVerify, onError }: TurnstileWidgetProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetId = useRef<string | null>(null);
    const initialized = useRef(false);

    // Store callbacks in refs to avoid re-initializing the widget when they change
    const onVerifyRef = useRef(onVerify);
    const onErrorRef = useRef(onError);

    useEffect(() => {
        onVerifyRef.current = onVerify;
        onErrorRef.current = onError;
    }, [onVerify, onError]);

    useEffect(() => {
        if (initialized.current) return;

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
            if (containerRef.current && window.turnstile && !widgetId.current) {
                try {
                    widgetId.current = window.turnstile.render(containerRef.current, {
                        sitekey: siteKey,
                        callback: (token: string) => {
                            if (onVerifyRef.current) onVerifyRef.current(token);
                        },
                        'error-callback': () => {
                            if (onErrorRef.current) onErrorRef.current();
                        },
                    });
                    initialized.current = true;
                } catch (e) {
                    console.error('Turnstile render error:', e);
                }
            }
        };

        if (window.turnstile) {
            renderWidget();
        } else {
            script.addEventListener('load', renderWidget);
        }

        return () => {
            // Cleanup is tricky with strict mode + external scripts. 
            // Ideally we shouldn't remove it to prevent flickering on quick unmount/remounts 
            // unless we are sure. But for safety to prevent duplicates:
            if (widgetId.current && window.turnstile) {
                window.turnstile.remove(widgetId.current);
                widgetId.current = null;
                initialized.current = false;
            }
            script.removeEventListener('load', renderWidget);
        };
    }, [siteKey]);

    return <div ref={containerRef} className="min-h-[65px]" />;
};

export default TurnstileWidget;

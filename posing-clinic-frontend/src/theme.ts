export const theme = {
    colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        accent: '#f472b6',
        neutral: '#6b7280',
        background: '#ffffff',
        text: '#1f2937',
        error: '#ef4444',
        success: '#10b981',
        warning: '#f59e0b',
        info: '#3b82f6',
    },
    spacing: (factor: number) => `${0.25 * factor}rem`,
    borderRadius: '0.5rem',
    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
    },
};
export function formatDateTime(input: string): string {
    if(!input) return ""

    // Create a Date object from the input string
    const date = new Date(input);

    // Define options for date and time formatting
    const dateOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // Use 24-hour time format
    };

    const formattedDate = date.toLocaleDateString('en-GB', dateOptions).replace(/\//g, '-');
    const formattedTime = date.toLocaleTimeString('en-GB', timeOptions);

    return `${formattedDate}, ${formattedTime}`;
}

// // Example usage
// const input = '2024-08-31T16:45:21.068936+00:00';
// const result = formatDateTime(input);
// console.log(result); // Output: "31-08-2024, 16:45"

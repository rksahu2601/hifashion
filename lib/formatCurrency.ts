export const formatCurrency = (num: number): string => {
    return num.toLocaleString('en-US', {
        minimumFractionDigits: 2,  // Show two decimal places
        maximumFractionDigits: 2   // Cap the decimals at two places
    });
}

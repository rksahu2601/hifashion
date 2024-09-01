export function generateOrderId(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    const getRandomChar = (charset: string): string => {
        const randomIndex = Math.floor(Math.random() * charset.length);
        return charset[randomIndex];
    };

    // Generate the first two characters (letters)
    const letterPart = getRandomChar(letters) + getRandomChar(letters);

    // Generate the last four characters (numbers)
    let numberPart = '';
    for (let i = 0; i < 4; i++) {
        numberPart += getRandomChar(numbers);
    }

    // Combine the parts and return the result
    return letterPart + numberPart;
}

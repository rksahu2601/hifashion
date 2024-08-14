export function generateSlug(input: string): string {
    // Convert the input string to lowercase
    let slug = input.toLowerCase();

    // Replace spaces and special characters with hyphens
    slug = slug.replace(/[^a-z0-9]+/g, '-');

    // Remove leading and trailing hyphens
    slug = slug.replace(/^-+|-+$/g, '');

    return slug;
}

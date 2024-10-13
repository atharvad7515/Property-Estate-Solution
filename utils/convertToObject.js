export function convertToSerializableObject(leanKarDocumentla) {
    // Ensure the input is a non-null object
    if (leanKarDocumentla && typeof leanKarDocumentla === 'object') {
        for (const key of Object.keys(leanKarDocumentla)) {
            if (leanKarDocumentla[key] && leanKarDocumentla[key].toJSON && leanKarDocumentla[key].toString) {
                leanKarDocumentla[key] = leanKarDocumentla[key].toString();
            }
        }
    } else {
        console.warn("convertToSerializableObject: Input is not a valid object.");
    }

    return leanKarDocumentla;
}

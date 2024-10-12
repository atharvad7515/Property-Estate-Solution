export function convertToSerializableObject(leanKarDocumentla) {
    for (const key of Object.keys(leanKarDocumentla)) {
        if (leanKarDocumentla[key].toJSON && leanKarDocumentla[key].toString) {
            leanKarDocumentla[key] = leanKarDocumentla[key].toString();
        }
    }
    return leanKarDocumentla;
} 
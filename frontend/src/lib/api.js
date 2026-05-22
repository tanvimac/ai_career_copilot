const defaultBase = "/api";

const rawBase = (process.env.REACT_APP_API_BASE_URL || defaultBase).trim();
const normalizedBase = rawBase.endsWith("/") ? rawBase.slice(0, -1) : rawBase;

export const uploadResumeUrl = `${normalizedBase}/upload-resume`;

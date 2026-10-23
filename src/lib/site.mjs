function normalizeUrl(value) {
  if (!value) return null;
  const candidate = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(candidate);
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    return url.origin;
  } catch {
    return null;
  }
}

export function resolveSiteUrl(env = process.env) {
  return normalizeUrl(env.NEXT_PUBLIC_SITE_URL)
    || normalizeUrl(env.VERCEL_URL)
    || 'http://localhost:3000';
}

export function isPreviewDeployment(env = process.env) {
  return env.VERCEL_ENV === 'preview';
}

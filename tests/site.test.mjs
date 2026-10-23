import test from 'node:test';
import assert from 'node:assert/strict';
import { isPreviewDeployment, resolveSiteUrl } from '../src/lib/site.mjs';

test('site URL prefers an explicit public URL', () => {
  assert.equal(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: 'https://hergun.example/path', VERCEL_URL: 'preview.vercel.app' }), 'https://hergun.example');
});

test('site URL uses the Vercel deployment URL without a scheme', () => {
  assert.equal(resolveSiteUrl({ VERCEL_URL: 'hergun-git-preview.vercel.app' }), 'https://hergun-git-preview.vercel.app');
});

test('site URL safely falls back for invalid or missing values', () => {
  assert.equal(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: '://invalid' }), 'http://localhost:3000');
  assert.equal(resolveSiteUrl({}), 'http://localhost:3000');
});

test('preview detection only enables on Vercel preview deployments', () => {
  assert.equal(isPreviewDeployment({ VERCEL_ENV: 'preview' }), true);
  assert.equal(isPreviewDeployment({ VERCEL_ENV: 'production' }), false);
});

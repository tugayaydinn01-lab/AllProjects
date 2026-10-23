import type {MetadataRoute} from 'next';
import {isPreviewDeployment,resolveSiteUrl} from '@/lib/site.mjs';
export default function robots():MetadataRoute.Robots{const base=resolveSiteUrl();if(isPreviewDeployment())return {rules:{userAgent:'*',disallow:'/'}};return {rules:{userAgent:'*',allow:'/',disallow:'/api/'},sitemap:`${base}/sitemap.xml`,host:base}}

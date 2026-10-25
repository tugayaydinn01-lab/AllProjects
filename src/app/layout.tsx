import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import { isPreviewDeployment, resolveSiteUrl } from '@/lib/site.mjs';
import './globals.css';
const siteUrl=resolveSiteUrl();
const preview=isPreviewDeployment();
export const metadata: Metadata = {metadataBase:new URL(siteUrl),title:{default:'HerGün | Günlük hayatın ücretsiz araçları',template:'%s | HerGün'},description:'Ücretsiz hesaplama araçları, günlük oyunlar, güncel veriler ve günlük yaşam araçları.',applicationName:'HerGün',alternates:{canonical:'/'},verification:{google:'axCp9K64qeDZ-RC3o680M79EZ1vNDJpDBSGNEqTLMV0'},openGraph:{type:'website',locale:'tr_TR',siteName:'HerGün',title:'HerGün | Günlük hayatın ücretsiz araçları',description:'Hesapla, oyna ve güncel bilgilere güvenilir kaynaklarla ulaş.'},robots:{index:!preview,follow:!preview}};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="tr"><body><Header/>{children}<footer className="footer"><div className="container footerGrid"><div><Link className="brand footerBrand" href="/"><span className="brandMark">H</span>HerGün<span className="dot">.</span></Link><p>Günlük işlerini kolaylaştıran ücretsiz ve şeffaf araçlar.</p></div><nav aria-label="Alt menü"><Link href="/gizlilik">Gizlilik</Link><Link href="/kullanim-kosullari">Kullanım koşulları</Link><Link href="/iletisim">İletişim</Link></nav><p className="footerLegal">© {new Date().getFullYear()} HerGün. Finansal bilgiler yatırım tavsiyesi değildir.</p></div></footer></body></html>}

# HerGün

Türkiye’deki kullanıcılar için mobil öncelikli, ücretsiz günlük yaşam portalı. Next.js App Router, TypeScript ve Tailwind CSS ile geliştirilmiştir.

## Özellikler

- Yüzde, KDV, yaş, tarih farkı, mevduat ve ayrıntılı kredi ödeme planı hesaplayıcıları
- Günlük beş harfli Türkçe kelime oyunu, sudoku ve bilgi yarışması
- Kaynak ve güncelleme zamanı gösteren döviz çevirici ve şehir hava durumu
- Yapılandırılmış lisanslı sağlayıcıyla çalışan, hata durumunda fiyat uydurmayan altın sayfası
- Aylık takvim, gün sayacı, araç araması ve tarayıcıda saklanan favoriler
- Her araç için metadata/canonical, dinamik sitemap, robots.txt ve iç bağlantılar
- İçerikten ve oyun kontrollerinden ayrılmış AdSense uyumlu reklam yerleşimi bileşeni
- Gizlilik, kullanım koşulları ve iletişim sayfaları

## Gereksinimler

- Node.js 22 LTS
- npm

## Windows kurulumu

PowerShell’i proje klasöründe açın:

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Tarayıcıda <http://localhost:3000> adresini açın. PowerShell yürütme politikası `npm.ps1` dosyasını engellerse aynı komutları `npm.cmd install` ve `npm.cmd run dev` biçiminde çalıştırabilirsiniz.

## Ortam değişkenleri

`.env.example` dosyasını `.env.local` olarak kopyalayın. Gerçek anahtarları repoya eklemeyin.

| Değişken | Zorunluluk | Açıklama |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Üretimde gerekli | Canonical, sitemap ve robots.txt için tam site adresi |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Yayından önce önerilir | İletişim sayfasında gösterilecek yayıncı adresi |
| `GOLD_API_KEY` | Altın verisi için gerekli | GoldAPI.io erişim anahtarı; yalnızca sunucuda kullanılır |

Döviz verisi Frankfurter üzerinden Avrupa Merkez Bankası referans kurlarından, hava durumu Open‑Meteo’dan alınır. Bu iki servis için anahtar gerekmez. Kullanım ve atıf koşullarını üretim öncesinde yeniden gözden geçirin.

## Kalite kontrolleri

```powershell
npm test
npm run lint
npm run build
```

Testler saf hesaplama ve günlük oyun seçim/puanlama fonksiyonlarını kapsar. Production build TypeScript kontrollerini de çalıştırır.

## Üretime yayınlama

### Vercel

Depoda Node.js, install/build komutları ve temel güvenlik başlıklarını tanımlayan `vercel.json` bulunur. Ayrıntılı preview kurulumu, ortam değişkenleri ve yayın engelleri için [Vercel güvenli önizleme rehberine](docs/vercel-preview.md) bakın. Gerçek cihaz ve tarayıcı doğrulamasında [preview kontrol listesini](docs/preview-checklist.md) kullanın.

1. GitHub deposunu Vercel’e bağlayın ve önce pull request Preview Deployment oluşturun.
2. Production ortam değişkenlerini Vercel proje ayarlarına ekleyin.
3. Alan adını bağladıktan sonra `NEXT_PUBLIC_SITE_URL` değerini `https://alanadiniz.com` biçiminde güncelleyin.
4. `/sitemap.xml`, `/robots.txt`, güvenlik başlıkları ve canlı veri sayfalarını kontrol edin.

### Node.js sunucusu

```powershell
npm ci
npm run build
npm start
```

Ters proxy üzerinde HTTPS kullanın ve Node sürecini bir servis yöneticisiyle çalıştırın.

## Veri ve finans notları

- Kredi hesabı kullanıcı tarafından girilen aylık nominal faizle eşit taksit hesabı yapar; ücret, vergi, sigorta ve banka yuvarlamaları dahil değildir.
- Mevduat hesabı 365 gün bazlı basit faiz ve kullanıcı tarafından girilen stopaj oranını kullanır.
- Döviz referans kuru banka alış/satış kuru değildir.
- Gram altın karşılığı ons fiyatının 31,1034768 grama bölünmesiyle hesaplanır; kuyumcu makası ve işçilik içermez.
- Sağlayıcı hatasında API yolları `503` döndürür ve arayüz eski veriyi güncelmiş gibi göstermez.

## Reklam

`AdSlot` bileşeni yalnızca görsel yerleşim alanıdır; gerçek reklam kodu veya uydurma yayıncı kimliği içermez. AdSense hesabı onaylandıktan, çerez/onay gereksinimleri tamamlandıktan ve yayıncı kimliği sağlandıktan sonra gerçek istemci kodu ayrıca entegre edilmelidir.

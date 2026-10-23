# Vercel güvenli önizleme kurulumu

Bu belge depo tarafında doğrulanan Vercel ayarlarını ve dışarıdan tamamlanması gereken adımları ayırır.

## Depoda hazır olanlar

- Node.js sürümü `22.x` olarak sabittir (`package.json` ve `.nvmrc`).
- Vercel framework değeri `nextjs`, kurulum komutu `npm ci`, build komutu `npm run build` olarak tanımlıdır.
- Her yanıta `nosniff`, frame engeli, referrer ve gereksiz tarayıcı izinlerini kapatan güvenlik başlıkları eklenir.
- Vercel Preview ortamları otomatik `VERCEL_URL` değerini kullanır ve arama motorlarına `noindex`/`disallow` döndürür.
- GitHub Actions her push ve pull request için production dependency audit, test, lint ve build çalıştırır.
- Production build için altın API anahtarı zorunlu değildir; anahtar yokken ilgili uç nokta kontrollü `503` döndürür.

## Vercel projesinde yapılacaklar

1. Vercel hesabıyla `tugayaydinn01-lab/AllProjects` GitHub deposuna erişim verin.
2. Yeni proje oluştururken Root Directory değerini depo kökü olarak bırakın.
3. Framework Preset: **Next.js**; Install Command: **npm ci**; Build Command: **npm run build** olmalı. `vercel.json` bunları depodan sağlar.
4. Önce yalnızca pull request Preview Deployment oluşturun. Production deployment veya özel alan adı bu kontrolün parçası değildir.
5. Vercel Deployment Protection özelliği planda varsa preview URL’sini yalnızca ekip üyelerine açın.
6. Preview üzerindeki kontroller için [preview-checklist.md](preview-checklist.md) belgesini uygulayın.

## Ortam değişkenleri

| Değişken | Preview | Production | Gizlilik | Amaç |
| --- | --- | --- | --- | --- |
| `GOLD_API_KEY` | Altın testi yapılacaksa gerekli | Altın özelliği için gerekli | Secret, yalnızca sunucu | GoldAPI.io erişimi |
| `NEXT_PUBLIC_CONTACT_EMAIL` | İsteğe bağlı | Yayından önce gerekli | Herkese açık | İletişim sayfası |
| `NEXT_PUBLIC_SITE_URL` | Gerekli değil; `VERCEL_URL` kullanılır | Gerçek alan adı bağlanınca gerekli | Herkese açık | Canonical, sitemap, robots |

`GOLD_API_KEY` değerini GitHub Actions’a eklemek gerekmez; CI canlı sağlayıcı çağrısı yapmaz. Değeri yalnızca Vercel’in şifreli Environment Variables alanına ekleyin ve kapsamını gereken Preview/Production ortamlarıyla sınırlayın.

## Servis hesapları ve izinler

- **Vercel hesabı ve GitHub entegrasyon izni:** Preview deployment oluşturmak için zorunlu. Bu ajan adına hesap veya yetki uydurulamaz.
- **GoldAPI.io hesabı:** Altın fiyatı özelliğini canlı sınamak için zorunlu. Anahtar yoksa sayfa tahmini fiyat üretmez.
- **Frankfurter:** Döviz için anahtar gerektirmez; ECB referans verilerini aktarır.
- **Open‑Meteo:** Hava ve şehir araması için anahtar gerektirmez; görünür atıf korunmalıdır.
- **Google AdSense:** Güvenli preview için gerekli değildir. Gerçek reklam entegrasyonu, yayıncı hesabı ve izin/onay akışı ayrı bir iş olmalıdır.
- **PostgreSQL/Prisma:** Mevcut özellikler sunucu veritabanı kullanmadığı için preview kapsamında gerekli değildir.

## Yayını durdurma ölçütleri

- CI test, lint, build veya yüksek önem seviyeli production dependency audit başarısızsa merge etmeyin.
- Preview üzerinde canonical URL `localhost` gösteriyorsa, preview `noindex` değilse veya API anahtarı tarayıcı paketinde görünüyorsa merge etmeyin.
- Döviz/hava yanıtında kaynak ve zaman yoksa ya da sağlayıcı hatasında eski değer gösteriliyorsa yayına çıkmayın.
- Production için gerçek alan adı, yayıncı iletişim adresi ve gerekiyorsa `GOLD_API_KEY` tanımlanmadan production deployment yapmayın.

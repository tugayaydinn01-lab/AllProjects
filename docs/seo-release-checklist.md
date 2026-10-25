# SEO ve AdSense yayın kontrol listesi

## Kod ve build

- [ ] Branch güncel `main` üzerine kurulmuş ve inceleme tamamlanmış.
- [ ] `npm ci`, `npm test`, `npm run lint`, `npm run build` başarılı.
- [ ] Production dependency audit yüksek seviye açık vermiyor.
- [ ] Gizli anahtar kaynak, istemci bundle’ı veya loglarda görünmüyor.

## Teknik SEO

- [ ] Her indekslenebilir sayfada özgün title, description, tek ana H1 ve doğru canonical var.
- [ ] Production metadata `index, follow`; Preview metadata ve `/robots.txt` indekslemeyi engelliyor.
- [ ] Production `/robots.txt` sitemap adresini doğru alan adıyla gösteriyor ve `/api/` yollarını engelliyor.
- [ ] `/sitemap.xml` yalnızca gerçek, canonical ve HTTP 200 sayfaları içeriyor; yönlendirme/404 yok.
- [ ] Breadcrumb bağlantıları çalışıyor ve JSON-LD görünür gezinmeyle eşleşiyor.
- [ ] JSON-LD Schema.org validator ile kontrol edildi; görünmeyen FAQ, yorum veya puan yok.
- [ ] Google Search Console sahipliği ve sitemap durumu gerçek panelde kontrol edildi; dizin sayısı tahmin edilmedi.

## İçerik ve güven

- [ ] Hakkımızda sayfasında gerçek yayıncı adı ve içerik hazırlama yöntemi var.
- [ ] İletişim e-postası çalışıyor ve site sahibince izleniyor.
- [ ] Gizlilik metni Production’daki gerçek sağlayıcı, çerez ve veri akışlarıyla aynı.
- [ ] Finans örnekleri güncel oran/teklif gibi sunulmuyor; varsayımlar görünür.
- [ ] Canlı veri sonuçlarında kaynak ve zaman var; hata anında eski değer güncelmiş gibi kalmıyor.
- [ ] Tüm iç bağlantılar ve footer bağlantıları 200 yanıt veriyor.

## Mobil, erişilebilirlik ve performans

- [ ] 320, 375, 390, 768 ve 1440 px genişliklerde yatay taşma yok.
- [ ] Klavye ile skip link, menü, form, favori ve oyun kontrolleri kullanılabiliyor.
- [ ] Form etiketleri, hata mesajları, odak göstergeleri ve `aria-live` bölgeleri ekran okuyucuyla kontrol edildi.
- [ ] Lighthouse mobil/masaüstü Production üzerinde çalıştırıldı; LCP, CLS, INP ve erişilebilirlik bulguları kaydedildi.
- [ ] Console’da hydration, React, CSP veya başarısız asset uyarısı yok.

## AdSense (yalnızca reklam etkinleştirilecekse)

- [ ] Güncel Google Publisher Policies ve yerleşim kuralları resmî siteden yeniden okundu.
- [ ] Gerçek AdSense hesabı, publisher ID ve site onayı var.
- [ ] Hedef bölgeler için CMP/TCF ve kullanıcı onayı gereksinimi tamamlandı.
- [ ] Gerçek ads.txt kaydı kök URL’de düz metin ve HTTP 200 olarak doğrulandı.
- [ ] Reklamlar oyun/hesaplama kontrollerinden ayrıldı ve yanlış tıklama riski yok.
- [ ] Reklam yükleme/kapanma durumlarında CLS ve mobil taşma yok.
- [ ] Gizlilik politikası reklam, CMP ve ölçüm sağlayıcılarıyla güncellendi.

## Yayın sonrası

- [ ] Production ana sayfa, tüm sitemap URL’leri ve yasal sayfalar haricî ağdan tarandı.
- [ ] Search Console URL Inspection ile kritik sayfalarda canonical/index sinyali kontrol edildi.
- [ ] Vercel loglarında yeni 5xx veya sağlayıcı hata artışı yok.
- [ ] Geri alma commit’i ve sorumlu kişi belli.

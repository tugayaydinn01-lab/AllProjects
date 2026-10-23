# Gerçek tarayıcı preview kontrol listesi

Her maddeyi Vercel pull request preview URL’sinde, tarayıcı geliştirici araçlarında Console ve Network panelleri açıkken kontrol edin. Sonuçları PR yorumuna cihaz/tarayıcı sürümüyle yazın.

## Mobil

- [ ] Chrome veya Safari’de 375×667 ve 390×844 görünümünde yatay taşma yok.
- [ ] 320 px genişlikte menü, kartlar, hesap makinesi alanları ve kredi ödeme tablosu kullanılabiliyor.
- [ ] Dokunma hedefleri rahatça seçiliyor; oyun düğmeleri ile reklam alanı arasında belirgin mesafe var.
- [ ] Sanal klavye sayı, tarih ve kelime alanlarını kapatmıyor; sayfa yakınlaştırmadan kullanılabiliyor.
- [ ] Günlük kelime hücreleri, Sudoku 9×9 alanı ve bilgi yarışması seçenekleri okunaklı.
- [ ] Favoriye ekleme sonrası sayfayı yenileyince favoriler aynı tarayıcıda korunuyor.

## Masaüstü ve tablet

- [ ] Chrome/Firefox’ta 1440×900, Safari/Edge’de mümkün olan güncel sürüm ve tablette 768×1024 kontrol edildi.
- [ ] Başlık, kategori kartları ve footer hizaları düzgün; geniş ekranlarda içerik gereksiz uzamıyor.
- [ ] Yalnızca klavye ile üst menü, arama, favori düğmeleri, formlar ve oyunlar kullanılabiliyor.
- [ ] Odak göstergeleri görünür, “İçeriğe geç” bağlantısı çalışıyor ve sekme sırası mantıklı.

## Temel işlevler

- [ ] Ana sayfa araması ilgili araçları filtreliyor ve sonuç yok durumu anlaşılır.
- [ ] Yüzde/KDV için bilinen örnekler, kredi ödeme planı toplamı, mevduat ve tarih hesapları elle karşılaştırıldı.
- [ ] Kelime oyunu altı denemede bitiyor; Sudoku doğru/yanlış sonucu; yarışma beş soruluk skoru gösteriyor.
- [ ] Takvim önceki/sonraki ay ve bugüne dön işlevleri çalışıyor.
- [ ] Geçersiz, boş, negatif ve çok büyük form girdileri uygulamayı çökertmiyor.

## Canlı veri ve hata davranışı

- [ ] Döviz sonucu kaynak, kur tarihi ve alınma zamanını gösteriyor.
- [ ] Hava sonucu doğru şehir, ölçüm zamanı, alınma zamanı ve Open‑Meteo atfını gösteriyor.
- [ ] `GOLD_API_KEY` tanımlıysa altın sonucu kaynak ve zaman gösteriyor; tanımsızsa fiyat yerine açık yapılandırma hatası var.
- [ ] Tarayıcı Network panelinde `GOLD_API_KEY` veya başka bir gizli değer istek URL’sinde, yanıtta ya da JavaScript paketlerinde görünmüyor.
- [ ] Sağlayıcı erişimi kesilerek/engellenerek denendiğinde önceki fiyat “güncel” olarak kalmıyor ve anlaşılır hata gösteriliyor.

## SEO, güvenlik ve içerik

- [ ] Preview sayfa kaynağında canonical URL HTTPS preview adresini kullanıyor.
- [ ] Preview için `robots` metadata ve `/robots.txt` indekslemeyi engelliyor.
- [ ] `/sitemap.xml`, `/robots.txt`, gizlilik, kullanım koşulları ve iletişim sayfaları açılıyor.
- [ ] Yanıtlarda `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` ve `Permissions-Policy` başlıkları var.
- [ ] İletişim e-postası doğru; boşsa yayın öncesi yapılandırma uyarısı görünür.
- [ ] Console’da hata, hydration uyarısı veya başarısız asset isteği yok.
- [ ] Network panelinde HTTP üzerinden karışık içerik, bilinmeyen üçüncü taraf veya gereksiz kişisel veri gönderimi yok.

## Son karar

- [ ] GitHub Actions kontrollerinin tamamı yeşil.
- [ ] Engelleyici ve yüksek önemde tarayıcı hatası yok; diğer bulgular PR’da kayıtlı.
- [ ] Production’a geçilecekse gerçek alan adı, iletişim adresi, API hesabı ve veri sağlayıcı kullanım koşulları ayrıca onaylandı.

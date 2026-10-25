# HerGün SEO ve içerik kalite denetimi

Denetim tarihi: 25 Ekim 2026

## Kapsam ve kanıt sınırları

Kaynak kod, App Router rotaları, metadata, sitemap/robots üretimi, iç bağlantılar, erişilebilirlik işaretleri, API hata davranışları ve otomatik testler incelendi. Yerel Production build HTTP üzerinden tarandı: sitemap’teki 22 URL’nin tamamı 200 döndürdü, her sayfada tek H1/title/description/canonical bulundu, 22 title özgündü ve bulunan 23 iç bağlantıda kırık yanıt yoktu. On dört JSON-LD bloğu başarıyla ayrıştırıldı. Headless Chromium ile 390×844 mobil ve 1440×900 masaüstü profillerinde ana sayfa, kredi, Sudoku ve gizlilik sayfaları test edildi; yatay taşma ve Console hatası yoktu, skip link/arama/favori yenileme akışı çalıştı, Production reklam yer tutucusu görünmedi. Production adresine ve resmî Google destek sayfalarına bu çalışma ortamından yapılan HTTPS istekleri ise ağ geçidi tarafından `403 CONNECT tunnel failed` ile engellendi. Bu nedenle canlı HTTP kodları, Search Console dizin sayıları, gerçek cihaz Core Web Vitals ve Google politikalarının 25 Ekim 2026 metni doğrulanmış gibi raporlanmamıştır.

Search Console için kullanıcı tarafından sağlanan tek doğrulanmış bilgi: sitemap okunmuş ve 21 URL keşfedilmiştir; dizine ekleme raporu henüz hazır değildir. Bu rapor herhangi bir dizin sayısı tahmin etmez.

## Özet

Başlangıç sürümünde rotalar çalışır, canonical/preview noindex temeli doğru ve finansal araçlar canlı oran uydurmaz durumdaydı. En önemli kalite açıkları; araç sayfalarındaki tekrarlanan genel açıklama, Hakkımızda sayfasının olmaması, hesaplama liste canonical’ının eksikliği, semantik olmayan breadcrumb’lar, yapılandırılmış veri eksikliği, Production’da boş reklam yer tutucuları ve her gün aynı kalan “Günlük Sudoku” idi.

Bu branch P1 kod sorunlarını giderir. Reklam aktivasyonu için yayıncı kimliği, iletişim adresi, AdSense hesabı, gerçek ads.txt kaydı ve bölgesel onay mekanizması hâlâ dışarıdan tamamlanmalıdır.

## P0 — reklam/Production aktivasyonunu engelleyenler

| Bulgu | Durum | Gerekli işlem |
| --- | --- | --- |
| Doğrulanmış yayıncı/yasal işletmeci adı yok | Açık | Site sahibi gerçek yayıncı adını sağlamalı; Hakkımızda ve yasal metinlere eklenmeli. |
| `NEXT_PUBLIC_CONTACT_EMAIL` tanımlı değil | Açık | İzlenen bir yayıncı e-postası Vercel Production ayarına girilmeli. |
| AdSense hesabı ve gerçek publisher ID yok | Beklenen | Başvuru/onay sonrası yalnızca gerçek değer kullanılmalı; mevcut branch reklam kodu eklemez. |
| ads.txt gerçek kaydı yok | Beklenen | AdSense’in hesapta verdiği kesin kayıt, alan adı ve publisher ID doğrulandıktan sonra yayınlanmalı. |
| Reklam/analitik için bölgesel onay akışı yok | Reklam açılışı için engel | Hedef bölgeler belirlenmeli; gerekli yerlerde Google sertifikalı CMP ve TCF akışı reklam kodundan önce kurulmalı. |
| Canlı site ve gerçek tarayıcı denetimi bu ajan tarafından yapılamadı | Açık yayın kapısı | Production’da HTTP, kaynak kodu, mobil/masaüstü, Lighthouse ve erişilebilirlik kontrolleri insan tarafından tamamlanmalı. |

Bu maddeler mevcut reklamsız sitenin build edilmesini engellemez; AdSense kodunu Production’da etkinleştirmeyi veya başvuruya “hazır” demeyi engeller.

## P1 — yüksek öncelikli bulgular ve uygulanan düzeltmeler

| Bulgu | Etki | Düzeltme |
| --- | --- | --- |
| `/hesaplama` canonical tanımlamıyordu | Arama motoru URL sinyali tutarsızlığı | Özgün açıklama ve `/hesaplama` canonical eklendi. |
| Hakkımızda sayfası yoktu | Güven ve yayıncı şeffaflığı zayıftı | Veri kaynakları, içerik yöntemi, sınırlar ve eksik yayıncı kimliğini açıkça anlatan `/hakkimizda` eklendi. |
| Altı hesaplayıcı aynı genel yardım metnini kullanıyordu | İnce/tekrarlı içerik ve bazı sayfalarda alakasız finans metni | Her hesaplayıcı için özgün amaç, adım, formül, doğrulanabilir örnek, hata ve iç bağlantı hazırlandı. |
| Döviz, altın, hava, oyun ve takvim sayfaları çok kısa idi | Araç kullanımı ve sınırları yeterince açıklanmıyordu | Yedi sayfa için özgün kısa rehberler eklendi; örnek oranların güncel olmadığı açıklandı. |
| Breadcrumb’lar düz metin ve `/` karakterlerinden oluşuyordu | Erişilebilir gezinme ve makine okunabilirlik zayıftı | `nav`, `ol`, `aria-label` ve `aria-current` kullanan ortak bileşen eklendi. |
| Yapılandırılmış veri yoktu | Sayfa türü ve gezinme ilişkisi makinece açık değildi | Gerçek içeriği yansıtan `WebSite`, `WebApplication` ve `BreadcrumbList` JSON-LD eklendi; puan/yorum/FAQ uydurulmadı. |
| Sitemap her üretimde tüm URL’lere o anı `lastModified` veriyordu | Yanlış güncellik sinyali | Kanıtlanabilir sayfa tarihi olmadığı için yanıltıcı `lastModified` kaldırıldı; Hakkımızda eklendi. |
| Production’da boş “Reklam” yer tutucuları görünüyordu | Kullanıcı güveni ve içerik kalitesi | Yer tutucu yalnızca development ortamında render edilir; gerçek reklam kodu eklenmedi. |
| Tarayıcı favicon isteği 404 dönüyordu | Console hatası ve eksik marka varlığı | App Router `icon.svg` eklendi; yeniden yapılan Chromium testinde Console temiz. |
| Günlük Sudoku her gün aynı bulmacaydı | Sayfa vaadi ile işlev uyuşmuyordu | Türkiye gün anahtarına göre geçerli bulmaca seçimi eklendi ve çözümler test edildi. |
| Favoriler localStorage doluyken hydration farkı oluşturabiliyordu | Console uyarısı ve görsel kararsızlık | `useSyncExternalStore` ile sunucu snapshot’ı ve istemci senkronizasyonu güvenli hale getirildi. |
| Gizlilik ve güven sayfaları yetersizdi | Veri akışları ve reklam durumu açık değildi | Yerel depolama, API sağlayıcıları, hosting kayıtları, reklamsız mevcut durum ve gelecekteki onay ihtiyacı açıklandı. |

## P2 — sonraki iyileştirmeler

- Gerçek Production URL’sinde tüm sitemap rotalarını HTTP 200/404/yönlendirme açısından tara.
- Headless Chromium testleri temiz olsa da gerçek Chrome Android, Safari iOS, Firefox ve Edge ile klavye/ekran okuyucu kontrollerini tamamla.
- Production üzerinde Lighthouse ve CrUX/Search Console Core Web Vitals verisi topla; sayı uydurma.
- Kelime oyunu için editoryal olarak gözden geçirilmiş daha geniş kabul sözlüğü ve erişilebilir sanal klavye değerlendir.
- Sudoku içerik havuzunu zorluk dereceleri ve çözüm üretim kalite kontrolüyle genişlet.
- Hava aramasında aynı adlı şehirler için açık konum seçimi ekle.
- İçeriklerin son editoryal inceleme tarihini yalnızca gerçek yayın süreci kurulduğunda göster.
- Search Console dizin raporu hazır olduğunda “keşfedildi, tarandı, dizine eklendi” durumlarını URL bazında incele.

## Teknik SEO durumu

- Root metadata; title şablonu, description, production/preview robots davranışı, canonical temeli ve Google sahiplik doğrulaması içerir.
- Detay sayfalarında tek H1, özgün title/description ve canonical bulunur.
- Preview ortamında metadata `noindex, nofollow`; `/robots.txt` tüm taramayı engeller. Production’da sayfalar açık, `/api/` robots ile engellidir.
- Sitemap yalnızca gerçek uygulama rotalarını içerir; yeni Hakkımızda ile hedef URL sayısı 22’dir ve tamamı yerel Production HTTP taramasında 200 dönmüştür.
- Yapılandırılmış veri yalnızca sayfada görünür olan uygulama ve breadcrumb bilgilerini kullanır; yorum, yıldız, uzmanlık veya resmî kuruluş iddiası yoktur.

## İçerik ve finans güvenliği

- Hesaplama fonksiyonları değiştirilmedi; açıklamalar mevcut formülleri yansıtır.
- KDV, faiz ve stopaj örnekleri matematik örneği olarak etiketlidir; güncel oran iddiası taşımaz.
- Döviz banka alış/satış kuru değildir; altın gram değeri ons bölümü olup işçilik/makas içermez.
- Sağlayıcı hatasında eski veya uydurma canlı değer sunulmaz.

## Erişilebilirlik ve performans gözlemleri

- Tek ana H1, “İçeriğe geç” bağlantısı, etiketli form alanları, canlı sonuç bölgeleri ve klavye ile çalışan düğmeler mevcuttur.
- Breadcrumb semantiği ve favori hydration riski bu branch’te iyileştirildi; headless Chromium’da mobil/masaüstü hydration ve Console hatası görülmedi.
- Haricî web fontu veya büyük görsel yok; bu başlangıç performansı için olumlu olsa da Lighthouse ölçümünün yerini tutmaz.
- Ortamda Lighthouse çalıştırıcısı kurulu değildi. Mevcut Chromium/Playwright kontrolü yerleşim, klavye başlangıcı ve Console hatalarını sınadı; performans skoru veya gerçek Core Web Vitals üretmedi.
- Gerçek reklam yüklenmediği için reklam kaynaklı CLS ölçülmedi. Gelecekte reklam slot boyutları mobil/masaüstünde gerçek kreatiflerle test edilmelidir.

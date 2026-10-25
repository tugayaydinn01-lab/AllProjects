# HerGün AdSense başvuru hazırlığı

Durum: **Başvuruya hazır değil.** Bu belge onay garantisi vermez.

## Resmî kaynak kontrolü

Aşağıdaki resmî kaynaklar uygulama öncesi ve başvuru günü yeniden okunmalıdır:

- Google Publisher Policies: <https://support.google.com/publisherpolicies/answer/10502938>
- AdSense reklam yerleşimi politikaları: <https://support.google.com/adsense/answer/1346295>
- ads.txt rehberi: <https://support.google.com/adsense/answer/7532444>
- EEA/UK/İsviçre için Google sertifikalı CMP gereksinimi: <https://support.google.com/adsense/answer/13554116>
- Google EU User Consent Policy: <https://www.google.com/about/company/user-consent-policy/>

25 Ekim 2026’da bu çalışma ortamından sayfalara erişim ağ politikası nedeniyle 403 ile engellendi. Aşağıdaki kontrol listesi mevcut ürün davranışına ve bilinen entegrasyon gereksinimlerine dayanır; güncel politika metninin canlı incelendiği iddiası değildir.

## Hazır olanlar

- [x] Özgün araç işlevleri ve her öncelikli sayfada kullanıcıya yararlı kısa rehber
- [x] Gizlilik, kullanım koşulları, iletişim ve Hakkımızda rotaları
- [x] Oyun kontrollerinin içine veya hesaplama düğmelerinin yanına reklam kodu yerleştirilmemiş olması
- [x] Production’da boş reklam yer tutucularının gizlenmesi
- [x] Reklam/analitik çerezi başlatan kodun bulunmaması
- [x] Finansal örneklerin güncel teklif veya vergi oranı olmadığının açıklanması
- [x] Canlı verilerde kaynak/zaman ve hata durumunda veri göstermeme yaklaşımı

## Başvuru veya reklam aktivasyonu öncesi zorunlu

- [ ] Gerçek yayıncı/yasal işletmeci adı sağlanıp Hakkımızda ve gerekli yasal sayfalara eklenmeli.
- [ ] `NEXT_PUBLIC_CONTACT_EMAIL` izlenen gerçek bir adresle Production’da tanımlanmalı.
- [ ] AdSense hesabı site sahibi tarafından açılmalı ve site sahipliği doğrulanmalı.
- [ ] Hedef ülkeler ve reklam kişiselleştirme tercihi belirlenmeli.
- [ ] EEA, Birleşik Krallık ve İsviçre kullanıcılarına reklam sunulacaksa Google sertifikalı CMP/TCF çözümü seçilip varsayılan ret/onay davranışı test edilmeli.
- [ ] Türkiye için KVKK, elektronik iletişim ve çerez/onay yükümlülükleri yayıncının gerçek veri akışıyla hukuk danışmanı tarafından değerlendirilmeli.
- [ ] Gizlilik politikası seçilen reklam, CMP ve ölçüm sağlayıcılarıyla güncellenmeli.
- [ ] Gerçek publisher ID geldikten sonra ads.txt kaydı AdSense hesabındaki değerle birebir yayınlanmalı.
- [ ] Production’da mobil/masaüstü reklam yerleşimi, yanlış tıklama ve CLS açısından test edilmeli.
- [ ] Search Console ve Lighthouse sonuçları gerçek verilerle gözden geçirilmeli.

## Reklam yerleşimi ilkeleri

- Reklamı hesapla, tahmin et, seçeneği işaretle, sudoku hücresi ve favori düğmelerinden görsel olarak ayır.
- Reklamı menü, indirme düğmesi veya içerikmiş gibi etiketleme; açık “Reklam” etiketi kullan.
- İlk ekranı reklamla kaplama; aracın amacı ve ana kontrolü önce görünür olmalı.
- Sticky veya tam ekran yerleşimleri ancak güncel politika ve kullanıcı kapatma davranışı doğrulanırsa değerlendir.
- Sabit olmayan kreatif boyutlarında yeterli alan ayırarak içerik kaymasını sınırla.
- Reklam yüklenemezse boş çerçeve, sahte reklam veya yeniden deneme döngüsü gösterme.

## ads.txt entegrasyon planı

1. AdSense hesabındaki **Sites / ads.txt** yönlendirmesinden siteye özel gerçek kaydı kopyala.
2. Publisher ID’yi sohbetten, örnekten veya başka siteden tahmin etme.
3. Kaydı yalnızca Production alan adının kökünde `/ads.txt` olarak düz metin ve HTTP 200 ile yayınla.
4. Yönlendirme, HTML içerik türü, Preview domaini veya placeholder satır kullanma.
5. Yayından sonra tarayıcı/curl ile tam içeriği ve AdSense panelindeki tarama durumunu doğrula.

Bu branch kasıtlı olarak `ads.txt`, AdSense scripti, publisher ID veya CMP kodu eklemez.

## Başvuru kararı

Yayıncı kimliği ve iletişim adresi, gerçek Production tarayıcı kontrolü, güncel politika incelemesi, gerekiyorsa CMP seçimi ve gerçek ads.txt kaydı tamamlanmadan başvuru yapılmamalıdır. İçerik veya teknik hazırlık, Google onayı garantisi değildir.

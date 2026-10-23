export const calculatorTools = [
  { slug: 'yuzde-hesaplama', title: 'Yüzde Hesaplama', icon: '%', description: 'Bir tutarın yüzdesini veya iki değer arasındaki yüzde değişimini hesapla.' },
  { slug: 'kdv-hesaplama', title: 'KDV Hesaplama', icon: '₺', description: 'KDV dahil ve hariç tutarları seçtiğin oranla bul.' },
  { slug: 'kredi-hesaplama', title: 'Kredi ve Ödeme Planı', icon: '↗', description: 'Aylık taksiti, toplam maliyeti ve ayrıntılı ödeme planını hesapla.' },
  { slug: 'mevduat-hesaplama', title: 'Mevduat Getirisi', icon: '◉', description: 'Brüt ve net faiz getirisini açık varsayımlarla hesapla.' },
  { slug: 'yas-hesaplama', title: 'Yaş Hesaplama', icon: '♧', description: 'Doğum tarihinden belirli bir tarihteki tamamlanmış yaşını bul.' },
  { slug: 'tarih-farki-hesaplama', title: 'Tarih ve Gün Sayacı', icon: '▦', description: 'İki tarih arasındaki gün sayısını takvim farklarından etkilenmeden hesapla.' },
] as const;

export const portalTools = [
  ...calculatorTools.map((tool) => ({ ...tool, href: `/hesaplama/${tool.slug}`, category: 'Hesaplama' })),
  { slug: 'kelime-oyunu', title: 'Günlük Kelime', icon: 'A', description: 'Altı denemede günün beş harfli Türkçe kelimesini bul.', href: '/oyunlar/kelime', category: 'Oyunlar' },
  { slug: 'sudoku', title: 'Günlük Sudoku', icon: '9', description: 'Her gün yenilenen mantık bulmacasını çöz.', href: '/oyunlar/sudoku', category: 'Oyunlar' },
  { slug: 'bilgi-yarismasi', title: 'Günlük Bilgi Yarışması', icon: '?', description: 'Her gün beş yeni soruyla bilgini sına.', href: '/oyunlar/bilgi-yarismasi', category: 'Oyunlar' },
  { slug: 'doviz-cevirici', title: 'Döviz Çevirici', icon: '€', description: 'Kaynağı ve güncelleme tarihi gösterilen döviz kurlarıyla çeviri yap.', href: '/finans/doviz-cevirici', category: 'Finans' },
  { slug: 'altin-fiyatlari', title: 'Altın Fiyatları', icon: '◆', description: 'Yapılandırılmış lisanslı sağlayıcıdan ons altın fiyatını görüntüle.', href: '/finans/altin-fiyatlari', category: 'Finans' },
  { slug: 'hava-durumu', title: 'Şehir Hava Durumu', icon: '☁', description: 'Şehir adına göre güncel hava koşullarını ve veri zamanını gör.', href: '/gunluk-yasam/hava-durumu', category: 'Günlük yaşam' },
  { slug: 'takvim', title: 'Takvim', icon: '▣', description: 'Aylık takvimi görüntüle ve tarihler arasında gez.', href: '/gunluk-yasam/takvim', category: 'Günlük yaşam' },
] as const;

export const categories = [
  { title: 'Hesaplamalar', href: '/hesaplama', icon: '∑', description: 'Finans ve tarih hesaplarını saniyeler içinde tamamla.' },
  { title: 'Günlük oyunlar', href: '/oyunlar', icon: '♟', description: 'Kelime, sudoku ve bilgi yarışmasıyla güne mola ver.' },
  { title: 'Finans', href: '/finans', icon: '₺', description: 'Kaynağı belirtilen döviz ve altın verilerini takip et.' },
  { title: 'Günlük yaşam', href: '/gunluk-yasam', icon: '☀', description: 'Hava durumu, takvim ve gün sayacını kullan.' },
] as const;

export const tools = calculatorTools;
export type ToolSlug = (typeof calculatorTools)[number]['slug'];

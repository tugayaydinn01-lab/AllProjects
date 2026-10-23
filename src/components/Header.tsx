import Link from 'next/link';

export default function Header(){return <><a className="skipLink" href="#ana-icerik">İçeriğe geç</a><header className="header"><div className="container nav"><Link className="brand" href="/" aria-label="HerGün ana sayfa"><span className="brandMark">H</span>HerGün<span className="dot">.</span></Link><nav aria-label="Ana menü"><Link href="/hesaplama">Hesaplamalar</Link><Link href="/finans">Finans</Link><Link href="/oyunlar">Oyunlar</Link><Link href="/gunluk-yasam">Günlük yaşam</Link></nav></div></header></>}

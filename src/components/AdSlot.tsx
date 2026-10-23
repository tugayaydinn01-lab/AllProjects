export default function AdSlot({ label = 'Reklam alanı' }: { label?: string }) {
  return (
    <aside className="adSlot" aria-label={label}>
      <span>REKLAM</span>
      <p>İçerikten ayrılmış reklam yerleşimi</p>
    </aside>
  );
}

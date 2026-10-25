export default function AdSlot({ label = 'Reklam alanı' }: { label?: string }) {
  if (process.env.NODE_ENV === 'production') return null;
  return (
    <aside className="adSlot" aria-label={label}>
      <span>REKLAM</span>
      <p>İçerikten ayrılmış reklam yerleşimi</p>
    </aside>
  );
}

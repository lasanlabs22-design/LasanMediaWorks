// "LaSän" set like the big wordmark above the footer (La purple, Sän gold),
// with the rest of the name around it and an optional small line underneath.
export default function BrandName({ before, after, mark = 'Sän', sub, className = '' }: { before?: string; after?: string; mark?: string; sub?: string; className?: string }) {
  return (
    <span className={`brand-name ${className}`}>
      <b>{before}<span className="mk-p">La</span><span className="mk-y">{mark}</span>{after}</b>
      {sub && <small>{sub}</small>}
    </span>
  );
}

export function SoftDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <span className="absolute -top-12 -left-12 h-56 w-56 rounded-full bg-accent-peach-light opacity-50 blur-2xl" />
      <span className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-primary-light opacity-40 blur-2xl" />
    </div>
  );
}

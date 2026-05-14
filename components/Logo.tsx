import { cn } from '@/lib/utils';

/**
 * Idoko C Idoko Consulting brand mark.
 * - Outer circular outline that breaks into a downward peak ("roof")
 * - Three stylised buildings inside (left short, middle tall, right medium)
 * - 2x2 window detail beneath the peak
 *
 * Drawn purely with SVG paths so it scales crisply and can be re-coloured
 * for dark/light backgrounds.
 */
export function LogoMark({
  className,
  size = 48,
  variant = 'navy',
}: {
  className?: string;
  size?: number;
  variant?: 'navy' | 'white';
}) {
  const stroke = variant === 'white' ? '#ffffff' : '#1e3568';
  const fill = variant === 'white' ? 'rgba(255,255,255,0.18)' : '#dbe2ee';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden="true"
    >
      {/* Circle that comes down to a peak at the bottom — like a shield */}
      <path
        d="M100 18
           C 145 18, 182 55, 182 100
           C 182 130, 168 156, 148 170
           L 100 130
           L 52 170
           C 32 156, 18 130, 18 100
           C 18 55, 55 18, 100 18 Z"
        fill="none"
        stroke={stroke}
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Building 1 — left, shortest */}
      <path
        d="M58 130 L58 96 L78 76 L78 130 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="4.5"
        strokeLinejoin="round"
      />

      {/* Building 2 — middle, tallest */}
      <path
        d="M78 130 L78 60 L100 38 L100 130 Z"
        fill="none"
        stroke={stroke}
        strokeWidth="4.5"
        strokeLinejoin="round"
      />

      {/* Building 3 — right, medium */}
      <path
        d="M100 130 L100 70 L122 50 L122 130 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="4.5"
        strokeLinejoin="round"
      />

      {/* Window detail — 2x2 squares below the peak */}
      <g fill={stroke}>
        <rect x="91" y="146" width="7" height="7" rx="0.5" />
        <rect x="102" y="146" width="7" height="7" rx="0.5" />
        <rect x="91" y="157" width="7" height="7" rx="0.5" />
        <rect x="102" y="157" width="7" height="7" rx="0.5" />
      </g>
    </svg>
  );
}

/**
 * Full lockup with wordmark — for header / footer / emails.
 */
export function LogoLockup({
  className,
  variant = 'dark',
  showTagline = false,
}: {
  className?: string;
  variant?: 'dark' | 'light';
  showTagline?: boolean;
}) {
  const text = variant === 'light' ? 'text-white' : 'text-ink-900';
  const accent = variant === 'light' ? 'text-brand-200' : 'text-accent';
  const taglineColor = variant === 'light' ? 'text-brand-100/70' : 'text-ink-500';

  return (
    <div className={cn('flex items-center gap-3.5', className)}>
      <LogoMark size={56} variant={variant === 'light' ? 'white' : 'navy'} />

      <div className="flex flex-col leading-tight">
        <span className={cn('font-display text-[19px] font-bold tracking-tight', text)}>
          IDOKO C IDOKO
        </span>

        <span className={cn('text-[10.5px] font-bold tracking-[0.28em]', accent)}>
          CONSULTING
        </span>

        {showTagline && (
          <span className={cn('mt-1 text-[10px] tracking-wide', taglineColor)}>
            Estate Surveyors &amp; Valuers
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Compatibility export.
 * Some components import { Logo } from './Logo',
 * so this wraps LogoLockup and prevents TS2305 export errors.
 */
export function Logo({
  className,
  variant = 'dark',
  showTagline = false,
}: {
  className?: string;
  variant?: 'dark' | 'light';
  showTagline?: boolean;
}) {
  return (
    <LogoLockup
      className={className}
      variant={variant}
      showTagline={showTagline}
    />
  );
}
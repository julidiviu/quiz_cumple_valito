import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function baseProps(props: IconProps) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
    ...props,
  };
}

export function MoonIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M20.1 14.3A8.2 8.2 0 0 1 9.7 3.9 8.3 8.3 0 1 0 20.1 14.3Z" />
    </svg>
  );
}

export function OrbitIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <circle cx="12" cy="12" r="3.1" />
      <ellipse cx="12" cy="12" rx="9.2" ry="4.4" transform="rotate(-28 12 12)" />
      <circle cx="19.1" cy="7.4" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M12 2.8c.6 5.3 3.9 8.6 9.2 9.2-5.3.6-8.6 3.9-9.2 9.2-.6-5.3-3.9-8.6-9.2-9.2 5.3-.6 8.6-3.9 9.2-9.2Z" />
    </svg>
  );
}

export function ButterflyIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M12 7.2v10.3" />
      <path d="M11.2 11.6C9.4 10.1 7.8 8.7 6 8.7c-2 0-3.2 1.5-3.2 3.1 0 2.6 3.4 4.5 8.4 2.7" />
      <path d="M12.8 11.6c1.8-1.5 3.4-2.9 5.2-2.9 2 0 3.2 1.5 3.2 3.1 0 2.6-3.4 4.5-8.4 2.7" />
      <path d="M11.1 14c-1.9 1-3.2 2-4.9 2.1M12.9 14c1.9 1 3.2 2 4.9 2.1" />
      <path d="M12 7.2c-.9-1.1-1-2.3-.4-3.2M12 7.2c.9-1.1 1-2.3.4-3.2" />
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="m4.5 12.5 4.7 4.7L19.5 6.8" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="m8 5.5 10 6.5-10 6.5v-13Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function RefreshIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M20 7v5h-5" />
      <path d="M4.9 17.1A8.5 8.5 0 0 0 20 12a8.4 8.4 0 0 0-2.1-5.6L15 9" />
      <path d="M4 17v-5h5" />
      <path d="M19.1 6.9A8.5 8.5 0 0 0 4 12a8.4 8.4 0 0 0 2.1 5.6L9 15" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M20.4 5.6a5.2 5.2 0 0 0-7.4 0L12 6.7l-1.1-1.1a5.2 5.2 0 0 0-7.4 7.4L12 21l8.4-8a5.2 5.2 0 0 0 0-7.4Z" />
    </svg>
  );
}

export function GiftIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M4 10h16v10H4V10Z" />
      <path d="M3 6.6h18V10H3V6.6Z" />
      <path d="M12 6.6V20" />
      <path d="M12 6.6C10.8 3.4 8.2 3 7.2 4.2c-1.1 1.4.3 2.4 4.8 2.4Z" />
      <path d="M12 6.6C13.2 3.4 15.8 3 16.8 4.2c1.1 1.4-.3 2.4-4.8 2.4Z" />
    </svg>
  );
}

export function SignalIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M5 18.5a9.8 9.8 0 0 1 14 0" />
      <path d="M8 15a5.6 5.6 0 0 1 8 0" />
      <circle cx="12" cy="18.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

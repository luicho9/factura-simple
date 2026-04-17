import { cn } from "@/lib/utils";

function BrowserIcon({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-4", className)}
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function BrowserChrome({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-3 border-b bg-muted/40 px-4 py-3 text-muted-foreground">
      <div className="flex items-center gap-1.5">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
      </div>
      <div className="ml-2 hidden items-center gap-3 sm:flex">
        <BrowserIcon>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <line x1="9" y1="4" x2="9" y2="20" />
        </BrowserIcon>
        <BrowserIcon>
          <polyline points="15 6 9 12 15 18" />
        </BrowserIcon>
        <BrowserIcon>
          <polyline points="9 6 15 12 9 18" />
        </BrowserIcon>
      </div>
      <div className="relative mx-auto hidden h-7 w-full max-w-md items-center rounded-md bg-background px-3 text-xs sm:flex">
        <BrowserIcon className="size-3.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3 v18" />
          <path
            d="M12 3 a9 9 0 0 0 0 18 z"
            fill="currentColor"
            stroke="none"
          />
        </BrowserIcon>
        <span className="mx-auto">{url}</span>
        <BrowserIcon className="size-3.5">
          <path d="M20 11 A8 8 0 1 0 18.5 16" />
          <polyline points="20 5 20 11 14 11" />
        </BrowserIcon>
      </div>
      <div className="hidden items-center gap-3 sm:flex">
        <BrowserIcon>
          <path d="M12 3 v12" />
          <polyline points="8 7 12 3 16 7" />
          <path d="M5 15 v4 a2 2 0 0 0 2 2 h10 a2 2 0 0 0 2 -2 v-4" />
        </BrowserIcon>
        <BrowserIcon>
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </BrowserIcon>
        <BrowserIcon>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="8" y="8" width="12" height="12" rx="2" />
        </BrowserIcon>
      </div>
    </div>
  );
}

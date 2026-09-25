"use client";

import { useState } from "react";

type Step = { label: string; state: "done" | "current" };
type PreviewState = "delayed" | "not-received" | "not-available";

const delayedSteps: Step[] = [
  { label: "Processing", state: "done" },
  { label: "Shipped", state: "done" },
  { label: "Out for Delivery", state: "done" },
  { label: "Delayed", state: "current" },
];

const deliveredSteps: Step[] = [
  { label: "Processing", state: "done" },
  { label: "Shipped", state: "done" },
  { label: "Out for Delivery", state: "done" },
  { label: "Delivered", state: "done" },
];

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2.5 6.2 4.8 8.5 9.5 3.5"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Timeline({
  steps,
  currentBadge,
  connectorClass = "bg-zinc-950",
}: {
  steps: Step[];
  currentBadge?: string;
  connectorClass?: string;
}) {
  return (
    <ol className="mt-3">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const isDone = step.state === "done";
        const isCurrent = step.state === "current";
        return (
          <li key={step.label} className="relative flex gap-3 pb-6 last:pb-0">
            {!isLast && (
              <span
                aria-hidden="true"
                className={`absolute left-[7px] top-5 h-[calc(100%-1.25rem)] w-0.5 ${connectorClass}`}
              />
            )}
            <span
              aria-hidden="true"
              className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                isCurrent
                  ? "border-amber-500 bg-amber-400"
                  : "border-zinc-950 bg-zinc-950"
              }`}
            >
              {isCurrent ? (
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              ) : (
                <CheckIcon />
              )}
            </span>
            <div className="flex flex-1 items-center justify-between">
              <span
                className={`text-[15px] ${
                  isDone ? "font-medium text-zinc-800" : "font-semibold text-zinc-950"
                }`}
                {...(isCurrent ? { "aria-current": "step" } : {})}
              >
                {step.label}
              </span>
              {isCurrent && currentBadge && (
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-900">
                  {currentBadge}
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function ProductCard() {
  return (
    <section aria-label="Product" className="rounded-2xl border border-zinc-200 p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
        Product
      </p>
      <div className="mt-2 flex items-center gap-3">
        <div
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-100"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 14v-2a8 8 0 0 1 16 0v2"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <rect
              x="2.5"
              y="13.5"
              width="4.5"
              height="7"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <rect
              x="17"
              y="13.5"
              width="4.5"
              height="7"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="truncate text-base font-semibold">Wireless Headphones</p>
          <p className="mt-0.5 text-sm text-zinc-600">৳2,500 × 1</p>
        </div>
      </div>
    </section>
  );
}

function ContactSupportButton() {
  return (
    <a
      href="#support"
      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-zinc-950 text-base font-semibold transition-colors hover:bg-zinc-950 hover:text-white"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Contact Support
    </a>
  );
}

function DelayedState() {
  return (
    <>
      <section
        role="alert"
        aria-label="Delivery delayed"
        className="rounded-2xl border border-amber-200 bg-amber-50 p-4"
      >
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-400/30"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3 2.5 20h19L12 3Z"
                stroke="#92400e"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M12 9.5V14"
                stroke="#92400e"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <circle cx="12" cy="17" r="1.1" fill="#92400e" />
            </svg>
          </span>
          <h2 className="text-lg font-bold tracking-tight text-amber-950">
            Delivery Delayed
          </h2>
        </div>
        <p className="mt-2 text-[15px] leading-6 text-amber-900">
          We&apos;re sorry, your order is taking longer than expected.
        </p>
      </section>

      <section
        aria-label="Delivery estimates"
        className="rounded-2xl border border-zinc-200 p-4"
      >
        <div className="flex items-center justify-between gap-3 border-b border-zinc-100 pb-3">
          <p className="text-sm text-zinc-500">Original estimated delivery</p>
          <p className="shrink-0 text-sm font-semibold text-zinc-400 line-through">
            September 24
          </p>
        </div>
        <div className="flex items-center justify-between gap-3 pt-3">
          <p className="text-sm font-medium text-zinc-800">Updated estimate</p>
          <p className="shrink-0 rounded-full bg-amber-100 px-2.5 py-1 text-sm font-bold text-amber-950">
            September 27
          </p>
        </div>
      </section>

      <ProductCard />

      <section aria-labelledby="timeline-heading-delayed">
        <h3
          id="timeline-heading-delayed"
          className="text-sm font-medium uppercase tracking-wider text-zinc-500"
        >
          Tracking timeline
        </h3>
        <Timeline
          steps={delayedSteps}
          currentBadge="Delayed"
          connectorClass="bg-amber-400"
        />
      </section>

      <section
        aria-label="Current status"
        className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
      >
        <p className="text-sm text-zinc-500">Current status</p>
        <p className="mt-1 text-lg font-bold">Out for Delivery</p>
      </section>

      <div className="mt-auto pt-2">
        <ContactSupportButton />
      </div>
    </>
  );
}

function NotReceivedState() {
  const [reported, setReported] = useState(false);

  return (
    <>
      <section
        aria-label="Delivery completed"
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4"
      >
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 10.5 8.5 15 16 6.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-emerald-950">
              Marked as Delivered
            </h2>
            <p className="mt-0.5 text-sm text-emerald-800">
              September 25, 3:42 PM
            </p>
          </div>
        </div>
      </section>

      <ProductCard />

      <section aria-labelledby="timeline-heading-delivered">
        <h3
          id="timeline-heading-delivered"
          className="text-sm font-medium uppercase tracking-wider text-zinc-500"
        >
          Tracking timeline
        </h3>
        <Timeline steps={deliveredSteps} />
        <a
          href="#report-issue"
          className="mt-1 flex items-center justify-between rounded-xl bg-zinc-50 px-3 py-3 text-left transition-colors hover:bg-zinc-100"
        >
          <span className="text-sm">
            <span className="font-semibold text-zinc-950">
              Didn&apos;t receive your order?
            </span>{" "}
            <span className="text-zinc-600">Report a delivery issue</span>
          </span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="shrink-0 text-zinc-950"
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </section>

      <section
        id="report-issue"
        aria-label="Delivery issue support"
        className="scroll-mt-4 rounded-2xl border border-zinc-200 p-4"
      >
        <h2 className="text-lg font-bold tracking-tight">
          But didn&apos;t receive your order?
        </h2>
        <p className="mt-1.5 text-[15px] leading-6 text-zinc-600">
          If you haven&apos;t received the package, you can report a delivery
          issue.
        </p>
        {reported ? (
          <p
            role="status"
            className="mt-3 rounded-xl bg-emerald-50 px-3 py-3 text-sm font-medium text-emerald-900"
          >
            Thanks — your delivery issue has been noted. Our support team will
            follow up shortly.
          </p>
        ) : (
          <div className="mt-3 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => setReported(true)}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 text-base font-semibold text-white transition-colors hover:bg-zinc-800"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Report Delivery Issue
            </button>
            <ContactSupportButton />
          </div>
        )}
      </section>

      <section
        aria-label="Current status"
        className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
      >
        <p className="text-sm text-zinc-500">Current status</p>
        <p className="mt-1 text-lg font-bold">Delivered</p>
      </section>
    </>
  );
}

function NoTrackingState() {
  return (
    <>
      <section
        aria-label="Order confirmed"
        className="flex flex-col items-center rounded-2xl border border-emerald-200 bg-emerald-50 px-4 pb-5 pt-6 text-center"
      >
        <span
          aria-hidden="true"
          className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
            <rect x="8" y="15" width="32" height="22" rx="3" fill="#D1FAE5" />
            <path
              d="M8 18h32M24 15v22M24 15l-8-6h16l-8 6Z"
              stroke="#059669"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle cx="34" cy="34" r="8" fill="#059669" />
            <path
              d="M30.5 34.2 33 36.7 37.5 31.7"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h2 className="mt-3 flex items-center gap-1.5 text-lg font-bold tracking-tight text-emerald-950">
          Order Confirmed
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="10" cy="10" r="9" fill="#059669" />
            <path
              d="M6.5 10.2 9 12.7 13.5 7.7"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </h2>
        <p className="mt-1 text-[15px] font-medium text-emerald-900">
          Your order has been placed successfully.
        </p>
      </section>

      <section
        aria-label="Tracking unavailable"
        className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-center"
      >
        <p className="text-[15px] font-semibold text-zinc-800">
          Tracking information isn&apos;t available yet.
        </p>
        <p className="mt-1 text-sm leading-6 text-zinc-600">
          We&apos;ll show your delivery progress here once your order has been
          shipped.
        </p>
      </section>

      <section
        aria-label="Estimated delivery"
        className="rounded-2xl bg-zinc-950 p-4 text-white"
      >
        <p className="text-sm text-zinc-300">Estimated delivery</p>
        <p className="mt-1 text-lg font-semibold">September 28</p>
      </section>

      <section
        aria-label="Order summary"
        className="rounded-2xl border border-zinc-200 p-4"
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-bold">Order #ORD-1024</p>
          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-900">
            Confirmed
          </span>
        </div>
        <div className="mt-3 flex items-center gap-3 border-t border-zinc-100 pt-3">
          <div
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-100"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 14v-2a8 8 0 0 1 16 0v2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <rect
                x="2.5"
                y="13.5"
                width="4.5"
                height="7"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <rect
                x="17"
                y="13.5"
                width="4.5"
                height="7"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.8"
              />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-semibold">Wireless Headphones</p>
            <p className="mt-0.5 text-sm text-zinc-600">Qty 1</p>
          </div>
          <p className="shrink-0 text-base font-bold">৳2,500</p>
        </div>
      </section>

      <section aria-labelledby="next-steps-heading">
        <h3
          id="next-steps-heading"
          className="text-sm font-medium uppercase tracking-wider text-zinc-500"
        >
          What happens next
        </h3>
        <ol className="mt-3">
          {["Shipped", "Out for Delivery", "Delivered"].map((label, index, arr) => (
            <li key={label} className="relative flex gap-3 pb-6 last:pb-0">
              {index !== arr.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-[7px] top-5 h-[calc(100%-1.25rem)] w-0.5 bg-zinc-200"
                />
              )}
              <span
                aria-hidden="true"
                className="mt-1 h-4 w-4 shrink-0 rounded-full border-2 border-dashed border-zinc-300 bg-white"
              />
              <span className="text-[15px] text-zinc-500">{label}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-auto pt-2">
        <ContactSupportButton />
      </div>
    </>
  );
}

export default function MainPage() {
  const [preview, setPreview] = useState<PreviewState>("not-available");

  return (
    <div className="flex min-h-screen justify-center bg-zinc-100 font-sans text-zinc-950">
      <div className="flex min-h-screen w-full max-w-[430px] flex-col bg-white shadow-sm">
        <header className="flex items-center gap-3 border-b border-zinc-100 px-4 py-4">
          <a
            href="#"
            aria-label="Back to orders"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 transition-colors hover:bg-zinc-50"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <h1 className="text-lg font-semibold tracking-tight">Order Tracking</h1>
        </header>

        <div className="border-b border-zinc-100 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Preview state (frontend only)
          </p>
          <div
            role="group"
            aria-label="Preview order state"
            className="mt-2 grid grid-cols-3 gap-1 rounded-xl bg-zinc-100 p-1"
          >
            <button
              type="button"
              aria-pressed={preview === "delayed"}
              aria-label="State 1, delayed order"
              onClick={() => setPreview("delayed")}
              className={`h-10 rounded-lg text-[13px] font-semibold transition-colors ${
                preview === "delayed"
                  ? "bg-white text-zinc-950 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              Delayed
            </button>
            <button
              type="button"
              aria-pressed={preview === "not-received"}
              aria-label="State 2, delivered but not received"
              onClick={() => setPreview("not-received")}
              className={`h-10 rounded-lg text-[13px] font-semibold transition-colors ${
                preview === "not-received"
                  ? "bg-white text-zinc-950 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              Not received
            </button>
            <button
              type="button"
              aria-pressed={preview === "not-available"}
              aria-label="State 3, tracking not available yet"
              onClick={() => setPreview("not-available")}
              className={`h-10 rounded-lg text-[13px] font-semibold transition-colors ${
                preview === "not-available"
                  ? "bg-white text-zinc-950 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              No tracking
            </button>
          </div>
        </div>

        <main className="flex flex-1 flex-col gap-5 px-4 py-5">
          <section aria-labelledby="order-heading">
            <p className="text-sm text-zinc-500">Tracking order</p>
            <h2 id="order-heading" className="mt-1 text-2xl font-bold tracking-tight">
              Order #ORD-1024
            </h2>
          </section>

          {preview === "delayed" ? (
            <DelayedState />
          ) : preview === "not-received" ? (
            <NotReceivedState />
          ) : (
            <NoTrackingState />
          )}
        </main>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import DraggableText from "./DraggableText";

type PaperSize = "a4" | "letter";
type Orientation = "portrait" | "landscape";
type SimpleFrameStyle = "none" | "thinLine" | "doubleLine";
type Position = { x: number; y: number };

const COMPANY_LOGO_PATH = "/images/petkeepsart_logo2.png";

function getPaperAspectRatio(paperSize: PaperSize, orientation: Orientation) {
  return paperSize === "a4"
    ? orientation === "portrait" ? "210 / 297" : "297 / 210"
    : orientation === "portrait" ? "8.5 / 11" : "11 / 8.5";
}

function WatermarkOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[30]"
      style={{
        opacity: 0.1,
        backgroundRepeat: "repeat",
        backgroundImage: `url("${COMPANY_LOGO_PATH}")`,
        backgroundSize: "120px",
      }}
    />
  );
}

// ─── DROP-IN REPLACEMENT for CertificatePreview ────────────────────────────
// Changes from the original:
//   1. Image container: moved from top-[55%] / absolute-center to a proper
//      flex-column layout with padding, so it never reaches the border edge.
//   2. Border overlay: moved SimpleFrameOverlay to be the LAST child before
//      WatermarkOverlay so z-20 actually wins over the photo layer.
//   3. Canvas centering: the outer wrapper already uses mx-auto; the inner
//      layout is now a flex column so every layer stacks cleanly.

function CertificatePreview({
    canvasRef,
    paperSize,
    orientation,
    bg,
    frameStyle,
    photoUrl,
    font,
    mainHeading,
    subtitle,
    bottomText,
    mainPos,
    subtitlePos,
    bottomPos,
    mainSize,
    subtitleSize,
    bottomSize,
    mainRotate,
    subtitleRotate,
    bottomRotate,
    onMainPointerDown,
    onSubtitlePointerDown,
    onBottomPointerDown,
    isFinalized,
    isLocked,
}: {
    canvasRef: React.RefObject<HTMLDivElement | null>;
    paperSize: PaperSize;
    orientation: Orientation;
    bg: { label: string; bg: string; accentLight: string; accent: string };
    frameStyle: SimpleFrameStyle;
    photoUrl: string;
    font: string;
    mainHeading: string;
    subtitle: string;
    bottomText: string;
    mainPos: Position;
    subtitlePos: Position;
    bottomPos: Position;
    mainSize: number;
    subtitleSize: number;
    bottomSize: number;
    mainRotate: number;
    subtitleRotate: number;
    bottomRotate: number;
    onMainPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
    onSubtitlePointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
    onBottomPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
    isFinalized: boolean;
    isLocked: boolean;
}) {
    return (
        /*
         * FIX 3 – centering: mx-auto + width constraint already centers the card.
         * overflow-hidden clips the photo blobs at the card edge, not the border.
         */
        <div
            ref={canvasRef}
            className="relative mx-auto w-full max-w-[700px] overflow-hidden rounded-[18px] border border-[#eadfd2] shadow-[0_10px_28px_rgba(91,67,52,0.08)] transition-all duration-300"
            style={{
                aspectRatio: getPaperAspectRatio(paperSize, orientation),
                backgroundColor: bg.bg,
            }}
        >
            {/* ── Decorative ambient blobs (z-0) ─────────────────────────────── */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute -left-8 top-8 h-56 w-56 rounded-full blur-3xl"
                    style={{ backgroundColor: bg.accentLight, opacity: 0.52 }}
                />
                <div
                    className="absolute right-2 top-20 h-44 w-44 rounded-full blur-3xl"
                    style={{ backgroundColor: bg.accent, opacity: 0.14 }}
                />
                <div
                    className="absolute bottom-8 left-10 h-52 w-52 rounded-full blur-3xl"
                    style={{ backgroundColor: bg.accentLight, opacity: 0.36 }}
                />
                <div
                    className="absolute inset-0 opacity-[0.18]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 12% 18%, ${bg.accent} 0 4px, transparent 5px),
              radial-gradient(circle at 82% 16%, ${bg.accentLight} 0 8px, transparent 9px),
              radial-gradient(circle at 14% 85%, ${bg.accentLight} 0 9px, transparent 10px),
              radial-gradient(circle at 88% 84%, ${bg.accent} 0 5px, transparent 6px)`,
                    }}
                />
            </div>

            {/*
       * FIX 1 – image position:
       *   OLD: absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2
       *        → the 42%-wide box could bleed outside the card and cover the
       *          border, especially at the bottom.
       *
       *   NEW: absolute inset-0 flex items-center justify-center p-[8%]
       *        → the image is always centered inside the card, the 8% padding
       *          guarantees it never reaches the border edge.
       *        → the aspect-ratio wrapper (4/5) keeps portrait proportions.
       *
       *   The photo takes up ~40 % of the card width (w-[40%]) so it looks
       *   identical to the original 42 %, but is now boundary-safe.
       */}
            <div className="absolute inset-0 z-[1] flex items-center justify-center p-[8%] pointer-events-none">
                <div className="relative w-[40%]">
                    <div className="relative" style={{ aspectRatio: "4 / 5" }}>
                        <img
                            src={photoUrl}
                            alt="Preview"
                            className="absolute inset-0 h-full w-full object-cover"
                            draggable={false}
                            style={{
                                WebkitMaskImage:
                                    "radial-gradient(ellipse at center, rgba(0,0,0,1) 56%, rgba(0,0,0,0.82) 72%, rgba(0,0,0,0.38) 88%, rgba(0,0,0,0) 100%)",
                                maskImage:
                                    "radial-gradient(ellipse at center, rgba(0,0,0,1) 56%, rgba(0,0,0,0.82) 72%, rgba(0,0,0,0.38) 88%, rgba(0,0,0,0) 100%)",
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* ── Draggable text labels (z-[3], above photo) ─────────────────── */}
            <DraggableText
                text={mainHeading}
                pos={mainPos}
                font={font}
                size={mainSize}
                rotate={mainRotate}
                onPointerDown={onMainPointerDown}
                isLocked={isLocked}
                className="z-[3] max-w-[78%] font-black leading-[1.02] text-[#3B261C]"
            />
            <DraggableText
                text={subtitle}
                pos={subtitlePos}
                font={font}
                size={subtitleSize}
                rotate={subtitleRotate}
                onPointerDown={onSubtitlePointerDown}
                isLocked={isLocked}
                className="z-[3] max-w-[72%] italic leading-tight text-[#6A5448]"
            />
            <DraggableText
                text={bottomText}
                pos={bottomPos}
                font={font}
                size={bottomSize}
                rotate={bottomRotate}
                onPointerDown={onBottomPointerDown}
                isLocked={isLocked}
                className="z-[3] max-w-[75%] italic leading-tight text-[#6A5448]"
            />

            {/*
       * FIX 2 – border rendering order:
       *   OLD: SimpleFrameOverlay appeared BEFORE the photo div in the JSX,
       *        so the photo (z-[2]) painted over the border's z-20.
       *
       *   NEW: SimpleFrameOverlay is placed AFTER all content layers.
       *        z-[10] beats the photo (z-[1]) and text (z-[3]) so the border
       *        is always visible on top. WatermarkOverlay stays last at z-[30].
       */}
            <div className="pointer-events-none absolute inset-0 z-[10]">
                <SimpleFrameOverlay frameStyle={frameStyle} />
            </div>

            {!isFinalized && <WatermarkOverlay />}
        </div>
    );
}

// ── SimpleFrameOverlay unchanged (shown here for copy-paste completeness) ──
function SimpleFrameOverlay({ frameStyle }: { frameStyle: SimpleFrameStyle }) {
    if (frameStyle === "none") {
        return (
            <div className="pointer-events-none absolute inset-[6.3%] z-20 rounded-[10px] bg-transparent shadow-[inset_0_0_0_1px_rgba(184,144,115,0.08)]" />
        );
    }

    if (frameStyle === "thinLine") {
        return (
            <div className="pointer-events-none absolute inset-[5.7%] z-20 rounded-[10px] border border-[#B89073]" />
        );
    }

    // doubleLine
    return (
        <>
            <div className="pointer-events-none absolute inset-[6%] z-20 rounded-[10px] border border-[#B89073]" />
            <div className="pointer-events-none absolute inset-[8.2%] z-20 rounded-[8px] border border-[#D5B395]" />
        </>
    );
}

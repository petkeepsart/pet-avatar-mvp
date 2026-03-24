"use client";

import React from "react";

type Position = {
    x: number;
    y: number;
};

type Props = {
    text: string;
    pos: Position;
    font: string;
    size: number;
    rotate: number;
    onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
    isLocked?: boolean;
    className?: string;
};

export default function DraggableText({
    text,
    pos,
    font,
    size,
    rotate,
    onPointerDown,
    isLocked,
    className = "",
}: Props) {
    return (
        <div
            onPointerDown={isLocked ? undefined : onPointerDown}
            className={`absolute cursor-move select-none ${className}`}
            style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
                fontFamily: font,
                fontSize: `${size}px`,
                userSelect: "none",
            }}
        >
            {text}
        </div>
    );
}
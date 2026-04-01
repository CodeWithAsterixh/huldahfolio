import React from "react";
import { MouseTracker } from "./MouseTracker";

export function GlobalCursors() {
  return (
    <>
      <MouseTracker selector='[data-cursor="view"]'>
        <CursorLabel>View</CursorLabel>
      </MouseTracker>
      <MouseTracker selector='[data-cursor="play"]'>
        <CursorLabel>Play</CursorLabel>
      </MouseTracker>
      <MouseTracker selector='[data-cursor="send"]'>
        <CursorLabel>Send</CursorLabel>
      </MouseTracker>
      <MouseTracker selector='[data-cursor="menu"]'>
        <CursorLabel>Menu</CursorLabel>
      </MouseTracker>
      <MouseTracker selector='[data-cursor="close"]'>
        <CursorLabel>Close</CursorLabel>
      </MouseTracker>
      <MouseTracker selector='[data-cursor="visit"]'>
        <CursorLabel>Visit</CursorLabel>
      </MouseTracker>
      <MouseTracker selector='[data-cursor="pointer"]'>
        <div className="size-5 bg-white rounded-full" />
      </MouseTracker>

    </>
  );
}



function CursorLabel({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-black text-[10px] font-bold uppercase"
      style={{ WebkitTextStroke: "0.3px white" }}
    >
      {children}
    </div>
  );
}

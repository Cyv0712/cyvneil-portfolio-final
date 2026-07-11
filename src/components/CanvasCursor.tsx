import useCanvasCursor from "../hooks/useCanvasCursor";

export default function CanvasCursor() {
  useCanvasCursor("cursor-canvas");

  return (
    <canvas
      id="cursor-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none z-[14]"
      aria-hidden="true"
    />
  );
}

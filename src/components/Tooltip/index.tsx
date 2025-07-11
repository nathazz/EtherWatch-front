import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { useDarkMode } from "../../Hooks/DarkMode/useDarkMode";

interface IProps {
  value: string | null;
  children: React.ReactNode;
}

export const Tooltip: React.FC<IProps> = ({ value, children }) => {
  const { theme } = useDarkMode();
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const targetRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!visible || !targetRef.current || !tooltipRef.current) return;

    const targetRect = targetRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const margin = 1;

    let left = targetRect.left + targetRect.width / 2;
    const halfTooltip = tooltipRect.width / 2;

    left = Math.max(left, halfTooltip + margin);
    left = Math.min(left, window.innerWidth - halfTooltip - margin);

    const top = targetRect.top - tooltipRect.height;

    setPosition({ top, left });
  }, [visible]);

  useEffect(() => {
    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    const node = targetRef.current;
    node?.addEventListener("mouseenter", handleMouseEnter);
    node?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      node?.removeEventListener("mouseenter", handleMouseEnter);
      node?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div ref={targetRef} className="inline-block cursor-help font-mono">
        {children}
      </div>
      {visible &&
        createPortal(
          <div
            ref={tooltipRef}
            className={`fixed z-[9999] px-3 py-2 text-xs max-w-[90vw] break-words ${theme.cardBg} ${theme.text} border ${theme.border} rounded-lg shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full`}
            style={{ top: position.top, left: position.left }}
          >
            <div className="break-all">{value}</div>
            <div
              className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent"
              style={{
                borderTopColor:
                  theme.cardBg === "bg-white" ? "#ffffff" : "#1f2937",
              }}
            />
          </div>,
          document.getElementById("tooltip-root")!,
        )}
    </>
  );
};

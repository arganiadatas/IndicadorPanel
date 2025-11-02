import { useEffect, useRef } from "react";
import { createChart, ColorType, AreaSeries } from "lightweight-charts";
import { DataPoint } from "@shared/schema";

interface EconomicChartProps {
  data: DataPoint[];
  height?: number;
  showGrid?: boolean;
}

export function EconomicChart({ data, height = 200, showGrid = true }: EconomicChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current || data.length === 0) return;

    // Get CSS variable values for theming
    const rootStyles = getComputedStyle(document.documentElement);
    const primaryColor = rootStyles.getPropertyValue("--primary").trim();
    const borderColor = rootStyles.getPropertyValue("--border").trim();
    const mutedForeground = rootStyles.getPropertyValue("--muted-foreground").trim();
    
    // Convert HSL values to hex for lightweight-charts
    const primaryHex = `hsl(${primaryColor})`;
    const borderHex = `hsl(${borderColor})`;
    const crosshairHex = `hsl(${mutedForeground})`;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: height,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: crosshairHex,
      },
      grid: {
        vertLines: {
          visible: showGrid,
          color: borderHex,
        },
        horzLines: {
          visible: showGrid,
          color: borderHex,
        },
      },
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
        timeVisible: true,
      },
      crosshair: {
        vertLine: {
          width: 1,
          color: crosshairHex,
          style: 3,
        },
        horzLine: {
          width: 1,
          color: crosshairHex,
          style: 3,
        },
      },
    });

    // v5.x API: use chart.addSeries(AreaSeries, options) with theme colors
    const areaSeries = chart.addSeries(AreaSeries, {
      lineColor: primaryHex,
      topColor: "hsl(217 91% 60% / 0.28)", // 28% opacidad
      bottomColor: "hsl(217 91% 60% / 0.05)", // 5% opacidad
      lineWidth: 2,
    });


    // Convert data to TradingView format
    const formattedData = data.map((point) => ({
      time: point.time,
      value: point.value,
    }));

    areaSeries.setData(formattedData);
    chart.timeScale().fitContent();

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data, height, showGrid]);

  return <div ref={chartContainerRef} className="w-full" />;
}

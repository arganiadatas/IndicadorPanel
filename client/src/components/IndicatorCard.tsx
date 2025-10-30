import { EconomicIndicator } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { EconomicChart } from "./EconomicChart";
import { TrendingUp, TrendingDown } from "lucide-react";

interface IndicatorCardProps {
  indicator: EconomicIndicator;
  onClick: () => void;
}

export function IndicatorCard({ indicator, onClick }: IndicatorCardProps) {
  const currentValue = indicator.data[indicator.data.length - 1]?.value ?? 0;
  const trend = indicator.trend ?? 0;
  const isPositive = trend >= 0;

  return (
    <Card
      className="p-6 cursor-pointer transition-all duration-200 hover-elevate active-elevate-2 hover:shadow-md"
      onClick={onClick}
      data-testid={`card-indicator-${indicator.id}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4 gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-foreground truncate" data-testid={`text-name-${indicator.id}`}>
            {indicator.name}
          </h3>
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? "text-chart-2" : "text-destructive"}`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" data-testid={`icon-trend-up-${indicator.id}`} />
            ) : (
              <TrendingDown className="w-4 h-4" data-testid={`icon-trend-down-${indicator.id}`} />
            )}
            <span data-testid={`text-trend-${indicator.id}`}>
              {isPositive ? "+" : ""}
              {trend.toFixed(2)}%
            </span>
          </div>
        )}
      </div>

      {/* Current Value */}
      <div className="mb-4">
        <div className="font-mono text-2xl font-medium text-foreground" data-testid={`text-value-${indicator.id}`}>
          {currentValue.toLocaleString("es-AR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          {indicator.unit && <span className="text-lg ml-1 text-muted-foreground">{indicator.unit}</span>}
        </div>
      </div>

      {/* Chart Preview */}
      <div className="h-[200px]" data-testid={`chart-preview-${indicator.id}`}>
        <EconomicChart data={indicator.data} height={200} showGrid={false} />
      </div>
    </Card>
  );
}

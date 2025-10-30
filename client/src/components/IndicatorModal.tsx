import { EconomicIndicator } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { EconomicChart } from "./EconomicChart";
import { TrendingUp, TrendingDown } from "lucide-react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IndicatorModalProps {
  indicator: EconomicIndicator | null;
  open: boolean;
  onClose: () => void;
}

export function IndicatorModal({ indicator, open, onClose }: IndicatorModalProps) {
  if (!indicator) return null;

  const currentValue = indicator.data[indicator.data.length - 1]?.value ?? 0;
  const trend = indicator.trend ?? 0;
  const isPositive = trend >= 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-y-auto p-8" 
        data-testid={`modal-indicator-${indicator.id}`}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-3xl font-semibold mb-2" data-testid={`text-modal-title-${indicator.id}`}>
                {indicator.name}
              </DialogTitle>
              <div className="flex items-center gap-4">
                <div className="font-mono text-3xl font-medium text-foreground" data-testid={`text-modal-value-${indicator.id}`}>
                  {currentValue.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  {indicator.unit && <span className="text-2xl ml-1 text-muted-foreground">{indicator.unit}</span>}
                </div>
                {trend !== undefined && (
                  <div className={`flex items-center gap-1 text-lg font-medium ${isPositive ? "text-chart-2" : "text-destructive"}`}>
                    {isPositive ? (
                      <TrendingUp className="w-5 h-5" />
                    ) : (
                      <TrendingDown className="w-5 h-5" />
                    )}
                    <span data-testid={`text-modal-trend-${indicator.id}`}>
                      {isPositive ? "+" : ""}
                      {trend.toFixed(2)}%
                    </span>
                  </div>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="flex-shrink-0"
              data-testid={`button-close-modal-${indicator.id}`}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        {/* Expanded Chart */}
        <div className="mt-6 mb-8 h-[400px]" data-testid={`chart-expanded-${indicator.id}`}>
          <EconomicChart data={indicator.data} height={400} showGrid={true} />
        </div>

        {/* Description */}
        <DialogDescription className="text-base leading-relaxed text-foreground" data-testid={`text-description-${indicator.id}`}>
          {indicator.description}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

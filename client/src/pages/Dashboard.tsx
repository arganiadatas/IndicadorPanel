import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { EconomicIndicator } from "@shared/schema";
import { IndicatorCard } from "@/components/IndicatorCard";
import { IndicatorModal } from "@/components/IndicatorModal";
import { BarChart3, AlertCircle, RefreshCw, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { queryClient } from "@/lib/queryClient";

export default function Dashboard() {
  const [selectedIndicator, setSelectedIndicator] = useState<EconomicIndicator | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: indicators, isLoading, isError, error } = useQuery<EconomicIndicator[]>({
    queryKey: ["/api/indicators"],
  });

  const handleCardClick = (indicator: EconomicIndicator) => {
    setSelectedIndicator(indicator);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedIndicator(null), 200);
  };

  const handleRetry = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/indicators"] });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-10 bg-card border-b border-card-border shadow-sm">
          <div className="max-w-7xl mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Dashboard Económico</h1>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 11 }).map((_, i) => (
              <div
                key={i}
                className="h-[340px] bg-card rounded-lg border border-card-border animate-pulse"
                data-testid={`skeleton-card-${i}`}
              />
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-10 bg-card border-b border-card-border shadow-sm">
          <div className="max-w-7xl mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Dashboard Económico</h1>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-12">
          <Alert variant="destructive" data-testid="alert-error">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle className="text-lg font-semibold">Error al cargar los indicadores</AlertTitle>
            <AlertDescription className="mt-2">
              <p className="mb-4">
                No se pudieron cargar los datos económicos. Por favor, verifica tu conexión e intenta nuevamente.
              </p>
              {error instanceof Error && (
                <p className="text-sm text-muted-foreground mb-4" data-testid="text-error-message">
                  Detalle: {error.message}
                </p>
              )}
              <Button
                onClick={handleRetry}
                variant="outline"
                className="mt-2"
                data-testid="button-retry"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reintentar
              </Button>
            </AlertDescription>
          </Alert>
        </main>
      </div>
    );
  }

  // Empty State
  if (!indicators || indicators.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-10 bg-card border-b border-card-border shadow-sm">
          <div className="max-w-7xl mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Dashboard Económico</h1>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-12">
          <div className="flex flex-col items-center justify-center py-16 text-center" data-testid="empty-state">
            <TrendingDown className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              No hay indicadores disponibles
            </h2>
            <p className="text-muted-foreground max-w-md mb-6">
              No se encontraron datos económicos para mostrar en este momento.
            </p>
            <Button onClick={handleRetry} data-testid="button-refresh-empty">
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualizar
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" data-testid="page-dashboard">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-card-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary" data-testid="icon-dashboard" />
            <h1 className="text-3xl font-bold text-foreground" data-testid="text-page-title">
              Dashboard Económico
            </h1>
          </div>
          <div className="text-sm text-muted-foreground" data-testid="text-indicator-count">
            {indicators.length} indicadores
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="grid-indicators">
          {indicators.map((indicator) => (
            <IndicatorCard
              key={indicator.id}
              indicator={indicator}
              onClick={() => handleCardClick(indicator)}
            />
          ))}
        </div>
      </main>

      {/* Modal */}
      <IndicatorModal
        indicator={selectedIndicator}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

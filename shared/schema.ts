import { z } from "zod";

// Data point schema for time series
export const dataPointSchema = z.object({
  time: z.string(), // ISO date string (e.g., "2025-10-17")
  value: z.number(),
});

export type DataPoint = z.infer<typeof dataPointSchema>;

// Economic indicator schema
export const economicIndicatorSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  data: z.array(dataPointSchema),
  unit: z.string().optional(), // e.g., "%", "USD", "Millones"
  trend: z.number().optional(), // Percentage change
});

export type EconomicIndicator = z.infer<typeof economicIndicatorSchema>;

// All available indicators
export const INDICATOR_IDS = {
  INFLATION: "inflacion",
  CANASTA_BASICA: "canasta-basica",
  EMAE: "emae",
  ICC: "icc",
  DESEMPLEO: "desempleo",
  RESERVAS: "reservas",
  VENTAS_SUPER: "ventas-supermercados",
  RESULTADOS_FISCALES: "resultados-fiscales",
  PBI: "pbi",
  DEUDA: "deuda",
  CRIPTO_PAT: "cripto-pat",
  ALQUILERES: "alquileres",
  APROBACION: "aprobacion",
} as const;

export type IndicatorId = typeof INDICATOR_IDS[keyof typeof INDICATOR_IDS];

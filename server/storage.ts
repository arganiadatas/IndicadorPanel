import { EconomicIndicator, INDICATOR_IDS } from "@shared/schema";

export interface IStorage {
  getAllIndicators(): Promise<EconomicIndicator[]>;
  getIndicatorById(id: string): Promise<EconomicIndicator | undefined>;
}

export class MemStorage implements IStorage {
  private indicators: Map<string, EconomicIndicator>;

  constructor() {
    this.indicators = new Map();
    this.initializeData();
  }

  private initializeData() {
    const indicatorsData: EconomicIndicator[] = [
      {
        id: INDICATOR_IDS.INFLATION,
        name: "Inflación (IPC mensual)",
        description: "El índice de precios al consumidor (IPC) mide la variación de precios de los bienes y servicios representativos del gasto de consumo de los hogares.",
        unit: "%",
        trend: -0.8,
        data: [
          { time: "2025-08-01", value: 4.2 },
          { time: "2025-09-01", value: 3.5 },
          { time: "2025-10-01", value: 2.7 },
        ],
      },
      {
        id: INDICATOR_IDS.CANASTA_BASICA,
        name: "Canasta Básica Total",
        description: "La Canasta Básica Total establece el ingreso que un hogar tipo debe tener para satisfacer, por medio de la compra de bienes y servicios no alimentarios (vestimenta, educación, salud, etc.), un conjunto de necesidades consideradas esenciales.",
        unit: "$",
        trend: 5.3,
        data: [
          { time: "2025-08-01", value: 850000 },
          { time: "2025-09-01", value: 892000 },
          { time: "2025-10-01", value: 935000 },
        ],
      },
      {
        id: INDICATOR_IDS.EMAE,
        name: "EMAE",
        description: "El Estimador Mensual de Actividad Económica (EMAE) refleja la evolución mensual de la actividad económica del conjunto de los sectores productivos a nivel nacional.",
        unit: "índice",
        trend: 1.2,
        data: [
          { time: "2025-08-01", value: 125.4 },
          { time: "2025-09-01", value: 126.8 },
          { time: "2025-10-01", value: 128.2 },
        ],
      },
      {
        id: INDICATOR_IDS.ICC,
        name: "Índice de Confianza del Consumidor",
        description: "El índice se confecciona con datos recolectados en una encuesta mensual sobre la situación económica personal y de la economía en general, con una muestra representativa.",
        unit: "puntos",
        trend: -2.1,
        data: [
          { time: "2025-08-01", value: 45.2 },
          { time: "2025-09-01", value: 44.1 },
          { time: "2025-10-01", value: 43.5 },
        ],
      },
      {
        id: INDICATOR_IDS.DESEMPLEO,
        name: "Tasa de Desocupación",
        description: "Presenta información sobre el comportamiento del mercado de trabajo, midiendo el porcentaje de la población económicamente activa que se encuentra sin empleo.",
        unit: "%",
        trend: -0.3,
        data: [
          { time: "2025-08-01", value: 7.8 },
          { time: "2025-09-01", value: 7.6 },
          { time: "2025-10-01", value: 7.3 },
        ],
      },
      {
        id: INDICATOR_IDS.RESERVAS,
        name: "Reservas USD",
        description: "Reservas internacionales en dólares estadounidenses del Banco Central de la República Argentina. Estas reservas incluyen oro, divisas extranjeras y otros activos de liquidez internacional.",
        unit: "M USD",
        trend: 3.5,
        data: [
          { time: "2025-08-01", value: 28500 },
          { time: "2025-09-01", value: 29200 },
          { time: "2025-10-01", value: 30100 },
        ],
      },
      {
        id: INDICATOR_IDS.VENTAS_SUPER,
        name: "Ventas en Supermercados",
        description: "Mide la evolución de las ventas a los consumidores finales en supermercados a precios corrientes. Es un indicador clave del consumo privado y la actividad económica interna.",
        unit: "var. %",
        trend: 2.8,
        data: [
          { time: "2025-08-01", value: -1.2 },
          { time: "2025-09-01", value: 0.5 },
          { time: "2025-10-01", value: 2.1 },
        ],
      },
      {
        id: INDICATOR_IDS.RESULTADOS_FISCALES,
        name: "Resultado Fiscal Primario",
        description: "El resultado fiscal primario muestra el balance de ingresos y gastos del sector público nacional antes del pago de intereses de la deuda. Un resultado positivo indica superávit, mientras que un resultado negativo indica déficit.",
        unit: "M $",
        trend: 15.2,
        data: [
          { time: "2025-08-01", value: -125000 },
          { time: "2025-09-01", value: -95000 },
          { time: "2025-10-01", value: -68000 },
        ],
      },
      {
        id: INDICATOR_IDS.PBI,
        name: "Producto Bruto Interno (PBI)",
        description: "El Producto Bruto Interno (PBI) representa el valor total de todos los bienes y servicios finales producidos en el país durante un período determinado. Es el principal indicador del tamaño y salud de la economía.",
        unit: "var. % anual",
        trend: 1.8,
        data: [
          { time: "2025-06-01", value: -2.1 },
          { time: "2025-07-01", value: -0.8 },
          { time: "2025-08-01", value: 0.3 },
        ],
      },
      {
        id: INDICATOR_IDS.DEUDA,
        name: "Deuda Externa y Pública",
        description: "Representa el total de la deuda del sector público argentino, tanto externa como interna. Incluye obligaciones con organismos internacionales, bonistas privados y otros acreedores. Se mide como porcentaje del PBI para evaluar la sostenibilidad fiscal.",
        unit: "% PBI",
        trend: -1.2,
        data: [
          { time: "2025-06-01", value: 87.5 },
          { time: "2025-07-01", value: 86.8 },
          { time: "2025-08-01", value: 85.9 },
        ],
      },
      {
        id: INDICATOR_IDS.CRIPTO_PAT,
        name: "Cripto $PAT",
        description: "Valor de mercado de la criptomoneda $PAT (Patria Token), un activo digital emergente vinculado al ecosistema económico local. Refleja la confianza de inversores en instrumentos alternativos de ahorro y la adopción de tecnologías blockchain en la región.",
        unit: "USD",
        trend: 12.5,
        data: [
          { time: "2025-10-17", value: 5.2 },
          { time: "2025-10-18", value: 5.1 },
          { time: "2025-10-19", value: 4.6 },
        ],
      },
    ];

    indicatorsData.forEach((indicator) => {
      this.indicators.set(indicator.id, indicator);
    });
  }

  async getAllIndicators(): Promise<EconomicIndicator[]> {
    return Array.from(this.indicators.values());
  }

  async getIndicatorById(id: string): Promise<EconomicIndicator | undefined> {
    return this.indicators.get(id);
  }
}

export const storage = new MemStorage();

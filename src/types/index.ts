export type UF =
  | 'AC' | 'AL' | 'AM' | 'AP' | 'BA' | 'CE' | 'DF' | 'ES' | 'GO' | 'MA'
  | 'MG' | 'MS' | 'MT' | 'PA' | 'PB' | 'PE' | 'PI' | 'PR' | 'RJ' | 'RN'
  | 'RO' | 'RR' | 'RS' | 'SC' | 'SE' | 'SP' | 'TO';

export type BandeiraTarifaria = 'verde' | 'amarela' | 'vermelha1' | 'vermelha2' | 'escassez';

export type TipoLigacao = 'monofasico' | 'bifasico' | 'trifasico';

export type ClasseConsumo = 'residencial' | 'baixa_renda';

export interface Concessionaria {
  id: string;
  nome: string;
  uf: UF;
  tarifaBaseKwh: number; // R$/kWh (TUSD + TE sem tributos)
  tusdKwh: number;
  teKwh: number;
  cosipEstimada: number;
}

export interface EstadoInfo {
  uf: UF;
  nome: string;
  aliquotaIcms: number; // Decimal (ex: 0.18 para 18%)
  pisCofinsEstimado: number; // Decimal (ex: 0.045 para 4.5%)
}

export interface BandeiraInfo {
  tipo: BandeiraTarifaria;
  nome: string;
  adicionalKwh: number; // R$ por kWh
  adicional100kwh: number; // R$ a cada 100 kWh
  descricao: string;
  corBadge: string;
  corHex: string;
}

export interface CalculoResultado {
  consumoKwh: number;
  consumoFaturadoKwh: number; // considerando mínimo de disponibilidade
  tarifaKwhEfetiva: number;
  valorEnergiaBase: number;
  valorBandeira: number;
  subtotalSemImpostos: number;
  aliquotaIcmsEfetiva: number;
  valorIcms: number;
  valorPisCofins: number;
  totalImpostos: number;
  custoDisponibilidadeAplicado: boolean;
  diferencaKwhMinimo: number;
  valorCustoDisponibilidade: number;
  valorCosip: number;
  descontoBaixaRenda: number;
  valorTotalEstimado: number;
}

export interface VerificacaoResultado {
  valorFaturaReal: number;
  valorEstimado: number;
  diferencaValor: number;
  diferencaPercentual: number;
  status: 'normal' | 'alta' | 'baixa';
  motivosProvaveis: string[];
  recomendacoes: string[];
}

export interface Eletrodomestico {
  id: string;
  nome: string;
  potenciaWatts: number;
  horasDiaPadrao: number;
  diasMesPadrao: number;
  categoria: 'climatizacao' | 'banho' | 'cozinha' | 'lavanderia' | 'eletronicos' | 'iluminacao';
  icone: string;
  dicaEconomia: string;
}

export type PageRoute =
  | 'home'
  | 'como-ler-medidor-analogico'
  | 'como-ler-medidor-digital'
  | 'o-que-e-bandeira-tarifaria'
  | 'quanto-cada-aparelho-gasta'
  | 'conta-de-luz-muito-alta-motivos'
  | 'conta-estimada-o-que-fazer'
  | 'tarifa-distribuicao-vs-geracao'
  | 'impostos-na-conta-de-luz'
  | 'o-que-e-cosip-iluminacao-publica'
  | 'como-calcular-consumo-pelo-medidor'
  | 'faq'
  | 'sobre'
  | 'politica-de-privacidade'
  | 'termos-de-uso'
  | 'contato';

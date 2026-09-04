import {
  BandeiraInfo,
  BandeiraTarifaria,
  CalculoResultado,
  ClasseConsumo,
  Concessionaria,
  Eletrodomestico,
  EstadoInfo,
  TipoLigacao,
  UF,
  VerificacaoResultado
} from '../types';

export const ULTIMA_ATUALIZACAO_TARIFAS = 'Setembro/2026';
export const FONTE_DADOS_OFICIAL = 'Resoluções Homologatórias ANEEL & Regulamentação Tributária dos Estados';

export const BANDEIRA_VIGENTE_PADRAO: BandeiraTarifaria = 'amarela';

export const ESTADOS: Record<UF, EstadoInfo> = {
  SP: { uf: 'SP', nome: 'São Paulo', aliquotaIcms: 0.18, pisCofinsEstimado: 0.0465 },
  RJ: { uf: 'RJ', nome: 'Rio de Janeiro', aliquotaIcms: 0.18, pisCofinsEstimado: 0.0485 },
  MG: { uf: 'MG', nome: 'Minas Gerais', aliquotaIcms: 0.18, pisCofinsEstimado: 0.0450 },
  RS: { uf: 'RS', nome: 'Rio Grande do Sul', aliquotaIcms: 0.17, pisCofinsEstimado: 0.0420 },
  PR: { uf: 'PR', nome: 'Paraná', aliquotaIcms: 0.18, pisCofinsEstimado: 0.0440 },
  SC: { uf: 'SC', nome: 'Santa Catarina', aliquotaIcms: 0.17, pisCofinsEstimado: 0.0410 },
  BA: { uf: 'BA', nome: 'Bahia', aliquotaIcms: 0.19, pisCofinsEstimado: 0.0470 },
  CE: { uf: 'CE', nome: 'Ceará', aliquotaIcms: 0.20, pisCofinsEstimado: 0.0460 },
  PE: { uf: 'PE', nome: 'Pernambuco', aliquotaIcms: 0.18, pisCofinsEstimado: 0.0450 },
  GO: { uf: 'GO', nome: 'Goiás', aliquotaIcms: 0.17, pisCofinsEstimado: 0.0430 },
  DF: { uf: 'DF', nome: 'Distrito Federal', aliquotaIcms: 0.18, pisCofinsEstimado: 0.0430 },
  ES: { uf: 'ES', nome: 'Espírito Santo', aliquotaIcms: 0.17, pisCofinsEstimado: 0.0420 },
  PA: { uf: 'PA', nome: 'Pará', aliquotaIcms: 0.19, pisCofinsEstimado: 0.0490 },
  AM: { uf: 'AM', nome: 'Amazonas', aliquotaIcms: 0.18, pisCofinsEstimado: 0.0450 },
  MA: { uf: 'MA', nome: 'Maranhão', aliquotaIcms: 0.20, pisCofinsEstimado: 0.0480 },
  MT: { uf: 'MT', nome: 'Mato Grosso', aliquotaIcms: 0.17, pisCofinsEstimado: 0.0440 },
  MS: { uf: 'MS', nome: 'Mato Grosso do Sul', aliquotaIcms: 0.17, pisCofinsEstimado: 0.0430 },
  PB: { uf: 'PB', nome: 'Paraíba', aliquotaIcms: 0.18, pisCofinsEstimado: 0.0440 },
  RN: { uf: 'RN', nome: 'Rio Grande do Norte', aliquotaIcms: 0.18, pisCofinsEstimado: 0.0440 },
  AL: { uf: 'AL', nome: 'Alagoas', aliquotaIcms: 0.19, pisCofinsEstimado: 0.0460 },
  PI: { uf: 'PI', nome: 'Piauí', aliquotaIcms: 0.21, pisCofinsEstimado: 0.0480 },
  SE: { uf: 'SE', nome: 'Sergipe', aliquotaIcms: 0.19, pisCofinsEstimado: 0.0450 },
  TO: { uf: 'TO', nome: 'Tocantins', aliquotaIcms: 0.18, pisCofinsEstimado: 0.0440 },
  RO: { uf: 'RO', nome: 'Rondônia', aliquotaIcms: 0.175, pisCofinsEstimado: 0.0430 },
  AC: { uf: 'AC', nome: 'Acre', aliquotaIcms: 0.19, pisCofinsEstimado: 0.0450 },
  AP: { uf: 'AP', nome: 'Amapá', aliquotaIcms: 0.18, pisCofinsEstimado: 0.0430 },
  RR: { uf: 'RR', nome: 'Roraima', aliquotaIcms: 0.17, pisCofinsEstimado: 0.0420 },
};

export const CONCESSIONARIAS: Concessionaria[] = [
  // São Paulo
  { id: 'enel-sp', nome: 'Enel Distribuição São Paulo (Capital e Grande SP)', uf: 'SP', tarifaBaseKwh: 0.723, tusdKwh: 0.412, teKwh: 0.311, cosipEstimada: 14.50 },
  { id: 'cpfl-paulista', nome: 'CPFL Paulista (Campinas, Ribeirão Preto e interior)', uf: 'SP', tarifaBaseKwh: 0.748, tusdKwh: 0.435, teKwh: 0.313, cosipEstimada: 12.80 },
  { id: 'cpfl-piratininga', nome: 'CPFL Piratininga (Santos, Sorocaba, Jundiaí)', uf: 'SP', tarifaBaseKwh: 0.732, tusdKwh: 0.419, teKwh: 0.313, cosipEstimada: 13.20 },
  { id: 'edp-sp', nome: 'EDP São Paulo (Vale do Paraíba e Alto Tietê)', uf: 'SP', tarifaBaseKwh: 0.718, tusdKwh: 0.408, teKwh: 0.310, cosipEstimada: 11.50 },
  { id: 'elektro', nome: 'Neoenergia Elektro (Interior e Litoral Norte)', uf: 'SP', tarifaBaseKwh: 0.756, tusdKwh: 0.441, teKwh: 0.315, cosipEstimada: 12.00 },

  // Rio de Janeiro
  { id: 'light-rj', nome: 'Light (Rio de Janeiro e Baixada Fluminense)', uf: 'RJ', tarifaBaseKwh: 0.812, tusdKwh: 0.492, teKwh: 0.320, cosipEstimada: 16.80 },
  { id: 'enel-rj', nome: 'Enel Distribuição Rio (Niterói, Região dos Lagos e interior)', uf: 'RJ', tarifaBaseKwh: 0.865, tusdKwh: 0.540, teKwh: 0.325, cosipEstimada: 15.40 },

  // Minas Gerais
  { id: 'cemig-mg', nome: 'Cemig Distribuição (Minas Gerais)', uf: 'MG', tarifaBaseKwh: 0.785, tusdKwh: 0.470, teKwh: 0.315, cosipEstimada: 14.90 },
  { id: 'dme-mg', nome: 'DME Poços de Caldas', uf: 'MG', tarifaBaseKwh: 0.692, tusdKwh: 0.380, teKwh: 0.312, cosipEstimada: 9.80 },

  // Rio Grande do Sul
  { id: 'ceee-rs', nome: 'CEEE Equatorial (Porto Alegre e Litoral Sul)', uf: 'RS', tarifaBaseKwh: 0.772, tusdKwh: 0.458, teKwh: 0.314, cosipEstimada: 13.60 },
  { id: 'rge-rs', nome: 'RGE Sul (Caxias do Sul, Passo Fundo e interior)', uf: 'RS', tarifaBaseKwh: 0.789, tusdKwh: 0.471, teKwh: 0.318, cosipEstimada: 14.00 },

  // Paraná
  { id: 'copel-pr', nome: 'Copel Distribuição (Paraná)', uf: 'PR', tarifaBaseKwh: 0.715, tusdKwh: 0.405, teKwh: 0.310, cosipEstimada: 11.20 },

  // Santa Catarina
  { id: 'celesc-sc', nome: 'Celesc Distribuição (Santa Catarina)', uf: 'SC', tarifaBaseKwh: 0.698, tusdKwh: 0.388, teKwh: 0.310, cosipEstimada: 10.50 },

  // Bahia
  { id: 'coelba-ba', nome: 'Neoenergia Coelba (Bahia)', uf: 'BA', tarifaBaseKwh: 0.834, tusdKwh: 0.515, teKwh: 0.319, cosipEstimada: 15.00 },

  // Ceará
  { id: 'enel-ce', nome: 'Enel Distribuição Ceará', uf: 'CE', tarifaBaseKwh: 0.828, tusdKwh: 0.510, teKwh: 0.318, cosipEstimada: 14.20 },

  // Pernambuco
  { id: 'celpe-pe', nome: 'Neoenergia Pernambuco (Celpe)', uf: 'PE', tarifaBaseKwh: 0.796, tusdKwh: 0.480, teKwh: 0.316, cosipEstimada: 13.90 },

  // Goiás & DF
  { id: 'equatorial-go', nome: 'Equatorial Energia Goiás', uf: 'GO', tarifaBaseKwh: 0.764, tusdKwh: 0.448, teKwh: 0.316, cosipEstimada: 12.50 },
  { id: 'ceb-df', nome: 'Neoenergia Brasília (CEB-D)', uf: 'DF', tarifaBaseKwh: 0.730, tusdKwh: 0.418, teKwh: 0.312, cosipEstimada: 11.00 },

  // Espírito Santo
  { id: 'edp-es', nome: 'EDP Espírito Santo (Escelsa)', uf: 'ES', tarifaBaseKwh: 0.742, tusdKwh: 0.428, teKwh: 0.314, cosipEstimada: 12.00 },

  // Pará & Norte
  { id: 'equatorial-pa', nome: 'Equatorial Pará (Celpa)', uf: 'PA', tarifaBaseKwh: 0.924, tusdKwh: 0.598, teKwh: 0.326, cosipEstimada: 16.50 },
  { id: 'amazonas-am', nome: 'Amazonas Energia', uf: 'AM', tarifaBaseKwh: 0.885, tusdKwh: 0.560, teKwh: 0.325, cosipEstimada: 15.20 },
  { id: 'equatorial-ma', nome: 'Equatorial Maranhão (Cemar)', uf: 'MA', tarifaBaseKwh: 0.852, tusdKwh: 0.530, teKwh: 0.322, cosipEstimada: 14.80 },

  // Centro-Oeste
  { id: 'energisa-mt', nome: 'Energisa Mato Grosso', uf: 'MT', tarifaBaseKwh: 0.840, tusdKwh: 0.522, teKwh: 0.318, cosipEstimada: 14.10 },
  { id: 'energisa-ms', nome: 'Energisa Mato Grosso do Sul (Enersul)', uf: 'MS', tarifaBaseKwh: 0.825, tusdKwh: 0.509, teKwh: 0.316, cosipEstimada: 13.50 },

  // Demais Estados
  { id: 'energisa-pb', nome: 'Energisa Paraíba', uf: 'PB', tarifaBaseKwh: 0.782, tusdKwh: 0.468, teKwh: 0.314, cosipEstimada: 12.70 },
  { id: 'cosern-rn', nome: 'Neoenergia Cosern (Rio Grande do Norte)', uf: 'RN', tarifaBaseKwh: 0.776, tusdKwh: 0.462, teKwh: 0.314, cosipEstimada: 12.40 },
  { id: 'equatorial-al', nome: 'Equatorial Alagoas (Ceal)', uf: 'AL', tarifaBaseKwh: 0.810, tusdKwh: 0.494, teKwh: 0.316, cosipEstimada: 13.80 },
  { id: 'equatorial-pi', nome: 'Equatorial Piauí (Cepisa)', uf: 'PI', tarifaBaseKwh: 0.835, tusdKwh: 0.518, teKwh: 0.317, cosipEstimada: 14.50 },
  { id: 'energisa-se', nome: 'Energisa Sergipe (Sulgipe/Energipe)', uf: 'SE', tarifaBaseKwh: 0.768, tusdKwh: 0.453, teKwh: 0.315, cosipEstimada: 12.20 },
  { id: 'energisa-to', nome: 'Energisa Tocantins', uf: 'TO', tarifaBaseKwh: 0.815, tusdKwh: 0.498, teKwh: 0.317, cosipEstimada: 13.40 },
  { id: 'energisa-ro', nome: 'Energisa Rondônia (Ceron)', uf: 'RO', tarifaBaseKwh: 0.820, tusdKwh: 0.504, teKwh: 0.316, cosipEstimada: 13.90 },
  { id: 'energisa-ac', nome: 'Energisa Acre (Eletroacre)', uf: 'AC', tarifaBaseKwh: 0.845, tusdKwh: 0.528, teKwh: 0.317, cosipEstimada: 14.20 },
  { id: 'cea-ap', nome: 'CEA Equatorial (Amapá)', uf: 'AP', tarifaBaseKwh: 0.760, tusdKwh: 0.446, teKwh: 0.314, cosipEstimada: 11.80 },
  { id: 'roraima-rr', nome: 'Roraima Energia', uf: 'RR', tarifaBaseKwh: 0.795, tusdKwh: 0.480, teKwh: 0.315, cosipEstimada: 13.00 },
];

export const BANDEIRAS_INFO: Record<BandeiraTarifaria, BandeiraInfo> = {
  verde: {
    tipo: 'verde',
    nome: 'Bandeira Verde',
    adicionalKwh: 0.00,
    adicional100kwh: 0.00,
    descricao: 'Condições favoráveis de geração de energia. Nenhum acréscimo tarifário na conta.',
    corBadge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    corHex: '#10b981',
  },
  amarela: {
    tipo: 'amarela',
    nome: 'Bandeira Amarela',
    adicionalKwh: 0.01885,
    adicional100kwh: 1.885,
    descricao: 'Condições menos favoráveis. Acréscimo de R$ 0,01885 por kWh consumido (R$ 1,885 a cada 100 kWh).',
    corBadge: 'bg-amber-100 text-amber-800 border-amber-300',
    corHex: '#f59e0b',
  },
  vermelha1: {
    tipo: 'vermelha1',
    nome: 'Vermelha Patamar 1',
    adicionalKwh: 0.04463,
    adicional100kwh: 4.463,
    descricao: 'Condições mais custosas de geração com térmicas. Acréscimo de R$ 0,04463 por kWh (R$ 4,463 a cada 100 kWh).',
    corBadge: 'bg-orange-100 text-orange-800 border-orange-300',
    corHex: '#f97316',
  },
  vermelha2: {
    tipo: 'vermelha2',
    nome: 'Vermelha Patamar 2',
    adicionalKwh: 0.07877,
    adicional100kwh: 7.877,
    descricao: 'Geração térmica intensiva e custos elevados. Acréscimo de R$ 0,07877 por kWh (R$ 7,877 a cada 100 kWh).',
    corBadge: 'bg-rose-100 text-rose-800 border-rose-300',
    corHex: '#e11d48',
  },
  escassez: {
    tipo: 'escassez',
    nome: 'Escassez Hídrica',
    adicionalKwh: 0.14200,
    adicional100kwh: 14.200,
    descricao: 'Crise hídrica severa com necessidade extraordinária de térmicas. Acréscimo de R$ 0,1420 por kWh.',
    corBadge: 'bg-purple-100 text-purple-800 border-purple-300',
    corHex: '#9333ea',
  }
};

export const CUSTO_DISPONIBILIDADE_KWH: Record<TipoLigacao, number> = {
  monofasico: 30,
  bifasico: 50,
  trifasico: 100,
};

/**
 * Calcula a conta de energia residencial com decomposição completa
 */
export function calcularContaEnergia(params: {
  uf: UF;
  concessionariaId: string;
  consumoKwh: number;
  bandeira: BandeiraTarifaria;
  tipoLigacao?: TipoLigacao;
  classeConsumo?: ClasseConsumo;
  cosipManual?: number;
}): CalculoResultado {
  const {
    uf,
    concessionariaId,
    consumoKwh,
    bandeira,
    tipoLigacao = 'monofasico',
    classeConsumo = 'residencial',
    cosipManual,
  } = params;

  const concessionaria =
    CONCESSIONARIAS.find((c) => c.id === concessionariaId) ||
    CONCESSIONARIAS.find((c) => c.uf === uf) ||
    CONCESSIONARIAS[0];

  const estado = ESTADOS[uf] || ESTADOS.SP;
  const bandeiraInfo = BANDEIRAS_INFO[bandeira] || BANDEIRAS_INFO.verde;
  const consumoMinimo = CUSTO_DISPONIBILIDADE_KWH[tipoLigacao];

  // Se o consumo real for menor que o custo de disponibilidade, o faturamento mínimo é cobrado
  const consumoEfetivo = Math.max(0, consumoKwh);
  const consumoFaturadoKwh = Math.max(consumoEfetivo, consumoMinimo);
  const custoDisponibilidadeAplicado = consumoEfetivo < consumoMinimo;
  const diferencaKwhMinimo = custoDisponibilidadeAplicado ? consumoMinimo - consumoEfetivo : 0;

  // Tarifa base da concessionária
  const tarifaBase = concessionaria.tarifaBaseKwh;
  const valorEnergiaBase = consumoFaturadoKwh * tarifaBase;

  // Adicional de bandeira tarifária
  const valorBandeira = consumoFaturadoKwh * bandeiraInfo.adicionalKwh;

  // Subtotal da energia + bandeira
  let subtotalSemImpostos = valorEnergiaBase + valorBandeira;

  // Desconto Baixa Renda (Tarifa Social de Energia Elétrica - TSEE)
  let descontoBaixaRenda = 0;
  if (classeConsumo === 'baixa_renda') {
    // 0 a 30 kWh: 65% de desconto
    // 31 a 100 kWh: 40% de desconto
    // 101 a 220 kWh: 10% de desconto
    const faixa1 = Math.min(consumoFaturadoKwh, 30);
    const faixa2 = Math.max(0, Math.min(consumoFaturadoKwh - 30, 70));
    const faixa3 = Math.max(0, Math.min(consumoFaturadoKwh - 100, 120));

    const valorFaixa1 = faixa1 * (tarifaBase + bandeiraInfo.adicionalKwh) * 0.65;
    const valorFaixa2 = faixa2 * (tarifaBase + bandeiraInfo.adicionalKwh) * 0.40;
    const valorFaixa3 = faixa3 * (tarifaBase + bandeiraInfo.adicionalKwh) * 0.10;

    descontoBaixaRenda = valorFaixa1 + valorFaixa2 + valorFaixa3;
    subtotalSemImpostos = Math.max(0, subtotalSemImpostos - descontoBaixaRenda);
  }

  // Alíquotas e tributos
  // No Brasil, a cobrança de ICMS na conta de energia é calculada "por dentro":
  // Base de Cálculo = Valor / (1 - ICMS - PIS - COFINS)
  // Para fins didáticos e precisão de estimativa, usamos a alíquota líquida efetiva
  const aliquotaIcms = estado.aliquotaIcms;
  const aliquotaPisCofins = estado.pisCofinsEstimado;

  // Fator de gross-up por dentro:
  const divisorGrossUp = Math.max(0.5, 1 - (aliquotaIcms + aliquotaPisCofins));
  const baseCalculoComTributos = subtotalSemImpostos / divisorGrossUp;

  const valorIcms = baseCalculoComTributos * aliquotaIcms;
  const valorPisCofins = baseCalculoComTributos * aliquotaPisCofins;
  const totalImpostos = valorIcms + valorPisCofins;

  // COSIP / CIP (Contribuição de Iluminação Pública municipal)
  const valorCosip = cosipManual !== undefined && !isNaN(cosipManual)
    ? cosipManual
    : concessionaria.cosipEstimada;

  // Custo de disponibilidade monetizado
  const valorCustoDisponibilidade = custoDisponibilidadeAplicado
    ? diferencaKwhMinimo * (tarifaBase + bandeiraInfo.adicionalKwh)
    : 0;

  // Valor total final estimado
  const valorTotalEstimado = subtotalSemImpostos + totalImpostos + valorCosip;
  const tarifaKwhEfetiva = consumoFaturadoKwh > 0 ? valorTotalEstimado / consumoFaturadoKwh : 0;

  return {
    consumoKwh: consumoEfetivo,
    consumoFaturadoKwh,
    tarifaKwhEfetiva,
    valorEnergiaBase,
    valorBandeira,
    subtotalSemImpostos,
    aliquotaIcmsEfetiva: aliquotaIcms,
    valorIcms,
    valorPisCofins,
    totalImpostos,
    custoDisponibilidadeAplicado,
    diferencaKwhMinimo,
    valorCustoDisponibilidade,
    valorCosip,
    descontoBaixaRenda,
    valorTotalEstimado,
  };
}

/**
 * Compara o valor cobrado na fatura com a estimativa e fornece diagnóstico
 */
export function verificarFatura(
  valorFaturaReal: number,
  calculoEstimado: CalculoResultado
): VerificacaoResultado {
  const estimado = calculoEstimado.valorTotalEstimado;
  const diferencaValor = valorFaturaReal - estimado;
  const diferencaPercentual = estimado > 0 ? (diferencaValor / estimado) * 100 : 0;

  const margemTolerancia = 10; // ±10% aceitável
  let status: 'normal' | 'alta' | 'baixa' = 'normal';

  if (diferencaPercentual > margemTolerancia) {
    status = 'alta';
  } else if (diferencaPercentual < -margemTolerancia) {
    status = 'baixa';
  }

  const motivosProvaveis: string[] = [];
  const recomendacoes: string[] = [];

  if (status === 'alta') {
    motivosProvaveis.push(
      'Faturamento por Média/Estimativa: Verifique na fatura se há o aviso "Leitura Estimada", ocorrido quando o leiturista não teve acesso ao medidor.',
      'Mudança de Bandeira Tarifária: A fatura pode ter englobado dias com bandeira vermelha ou amarela mais custosa que o selecionado.',
      'Período de Leitura Maior que 30 dias: Algumas faturas acumulam 32 a 35 dias de ciclo de faturamento.',
      'Tributação Municipal (COSIP) ou Taxas Extras: Contribuição de iluminação pública mais alta na sua cidade ou cobrança de multas/juros de meses anteriores.',
      'Parcelamentos ou Doações: Verifique se não há cobrança de seguros, planos odontológicos ou parcelamento de débitos antigos incluídos na conta.',
      'Possível Erro de Digitação do Leiturista: Compare os números do seu relógio físico com o campo "Leitura Atual" impresso na conta.'
    );

    recomendacoes.push(
      'Examine o campo "Histórico de Consumo" na fatura para comparar os últimos 12 meses.',
      'Fotografe seu medidor hoje mesmo para comprovar a leitura real caso precise contestar.',
      'Acesse a Agência Virtual da sua distribuidora para solicitar refaturamento se a leitura impressa estiver maior que o visor do relógio.',
      'Se a distribuidora não resolver em até 5 dias úteis, abra reclamação com protocolo na Ouvidoria e na ANEEL (telefone 167).'
    );
  } else if (status === 'baixa') {
    motivosProvaveis.push(
      'Ciclo de Faturamento Menor: Faturas com 27 a 28 dias de leitura.',
      'Crédito de Ressarcimento de ICMS ou devoluções de cobrança indevida de meses anteriores.',
      'Enquadramento automático na Tarifa Social Baixa Renda ou subsídios estaduais.',
      'Leitura anterior acumulada que gerou compensação neste mês.'
    );

    recomendacoes.push(
      'Guarde esta fatura com histórico para manter controle das oscilações sazonais.',
      'Acompanhe a leitura do próximo mês para garantir que não haja cobrança acumulada de resíduo.'
    );
  } else {
    motivosProvaveis.push(
      'Os dados conferem com a tarifa homologada da distribuidora e a alíquota de impostos (ICMS, PIS e COFINS).',
      'A diferença está dentro da margem normal de arredondamento e variações da taxa municipal de iluminação pública.'
    );

    recomendacoes.push(
      'Sua conta aparenta estar dentro dos parâmetros regulatórios esperados pela ANEEL.',
      'Continue acompanhando seu consumo pelo medidor para antecipar o fechamento do mês.'
    );
  }

  return {
    valorFaturaReal,
    valorEstimado: estimado,
    diferencaValor,
    diferencaPercentual,
    status,
    motivosProvaveis,
    recomendacoes,
  };
}

export const ELETRODOMESTICOS_PADRAO: Eletrodomestico[] = [
  {
    id: 'chuveiro',
    nome: 'Chuveiro Elétrico (Inverno)',
    potenciaWatts: 5500,
    horasDiaPadrao: 0.66, // 40 minutos diários somados da casa
    diasMesPadrao: 30,
    categoria: 'banho',
    icone: 'shower-head',
    dicaEconomia: 'Reduza o banho em 5 minutos e use a chave no modo "Verão" em dias amenos para economizar até 30% no chuveiro.'
  },
  {
    id: 'ar-inverter',
    nome: 'Ar-Condicionado Inverter (9.000 a 12.000 BTUs)',
    potenciaWatts: 900,
    horasDiaPadrao: 8,
    diasMesPadrao: 30,
    categoria: 'climatizacao',
    icone: 'air-vent',
    dicaEconomia: 'Ajuste a temperatura em 23°C ou 24°C. Cada grau a menos aumenta o consumo em cerca de 7% a 10%.'
  },
  {
    id: 'ar-convencional',
    nome: 'Ar-Condicionado Tradicional (Sem Inverter)',
    potenciaWatts: 1400,
    horasDiaPadrao: 8,
    diasMesPadrao: 30,
    categoria: 'climatizacao',
    icone: 'wind',
    dicaEconomia: 'Mantenha portas e janelas vedadas e limpe os filtros quinzenalmente para o motor não sobrecarregar.'
  },
  {
    id: 'geladeira-frostfree',
    nome: 'Geladeira Frost Free Duplex (Média)',
    potenciaWatts: 55, // média ponderada do ciclo do compressor
    horasDiaPadrao: 24,
    diasMesPadrao: 30,
    categoria: 'cozinha',
    icone: 'refrigerator',
    dicaEconomia: 'Verifique a borracha de vedação com uma folha de papel e evite guardar panelas ou alimentos quentes.'
  },
  {
    id: 'airfryer',
    nome: 'Fritadeira Air Fryer',
    potenciaWatts: 1500,
    horasDiaPadrao: 0.5, // 30 min
    diasMesPadrao: 20,
    categoria: 'cozinha',
    icone: 'flame',
    dicaEconomia: 'Aproveite o cesto aquecido para assar porções seguidas sem precisar pré-aquecer duas vezes.'
  },
  {
    id: 'microondas',
    nome: 'Forno Micro-ondas',
    potenciaWatts: 1200,
    horasDiaPadrao: 0.33, // 20 min
    diasMesPadrao: 30,
    categoria: 'cozinha',
    icone: 'microwave',
    dicaEconomia: 'Descongele carnes com antecedência na geladeira em vez de usar potências máximas no micro-ondas.'
  },
  {
    id: 'tv-led',
    nome: 'Televisor LED 50"',
    potenciaWatts: 100,
    horasDiaPadrao: 5,
    diasMesPadrao: 30,
    categoria: 'eletronicos',
    icone: 'tv',
    dicaEconomia: 'Ative o sensor de luz ambiente da TV para reduzir o brilho do painel durante a noite.'
  },
  {
    id: 'computador-pc',
    nome: 'Computador Desktop / Gamer',
    potenciaWatts: 300,
    horasDiaPadrao: 6,
    diasMesPadrao: 26,
    categoria: 'eletronicos',
    icone: 'monitor',
    dicaEconomia: 'Configure a suspensão automática após 10 minutos de inatividade para evitar consumo contínuo da GPU.'
  },
  {
    id: 'maquina-lavar',
    nome: 'Máquina de Lavar Roupas (11kg)',
    potenciaWatts: 500,
    horasDiaPadrao: 1.5,
    diasMesPadrao: 12,
    categoria: 'lavanderia',
    icone: 'washing-machine',
    dicaEconomia: 'Acumule a capacidade máxima recomendada de roupas e evite ciclos com água aquecida quando não for necessário.'
  },
  {
    id: 'ferro-passar',
    nome: 'Ferro Elétrico a Vapor',
    potenciaWatts: 1300,
    horasDiaPadrao: 1,
    diasMesPadrao: 8,
    categoria: 'lavanderia',
    icone: 'iron',
    dicaEconomia: 'Junte bastante roupa para passar de uma só vez, iniciando pelas peças que exigem menos calor.'
  },
  {
    id: 'ventilador',
    nome: 'Ventilador de Mesa / Teto',
    potenciaWatts: 80,
    horasDiaPadrao: 8,
    diasMesPadrao: 30,
    categoria: 'climatizacao',
    icone: 'fan',
    dicaEconomia: 'Desligue o ventilador ao sair do cômodo, pois ele apenas ventila o ar sobre a pele, não refrigera o ambiente.'
  },
  {
    id: 'lampadas-led',
    nome: 'Conjunto de 10 Lâmpadas LED (9W cada)',
    potenciaWatts: 90,
    horasDiaPadrao: 6,
    diasMesPadrao: 30,
    categoria: 'iluminacao',
    icone: 'lightbulb',
    dicaEconomia: 'Aproveite a luz natural do dia e use sensores de presença em corredores e garagens.'
  }
];

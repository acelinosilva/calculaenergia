import { PageRoute } from '../types';

export interface SeoPageData {
  route: PageRoute;
  title: string;
  metaDescription: string;
  h1: string;
  subheadline: string;
  badge: string;
  readTime: string;
  breadcrumbs: { label: string; route?: PageRoute }[];
  contentSections: {
    title: string;
    body: string[];
    highlightBox?: {
      title: string;
      text: string;
      type: 'info' | 'warning' | 'success';
    };
    table?: {
      headers: string[];
      rows: string[][];
    };
    bulletList?: string[];
  }[];
  faqs?: { question: string; answer: string }[];
  schemaType: 'FAQPage' | 'HowTo' | 'Article' | 'WebApplication';
}

export const SEO_PAGES: Record<PageRoute, SeoPageData> = {
  home: {
    route: 'home',
    title: 'Calculadora de Conta de Energia Elétrica — Veja se o Valor Está Correto',
    metaDescription: 'Calcule o valor estimado da sua conta de luz em kWh, confira se a fatura da distribuidora está correta, aprenda a ler o relógio medidor e simule o consumo por aparelho.',
    h1: 'Calculadora de Conta de Energia Elétrica',
    subheadline: 'Calcule o valor exato estimado pelo seu consumo em kWh, confira se a sua fatura veio com cobrança indevida e aprenda a ler o medidor da sua residência.',
    badge: 'Atualizado para as Tarifas ANEEL 2026',
    readTime: '6 min de leitura',
    breadcrumbs: [{ label: 'Início' }],
    schemaType: 'WebApplication',
    contentSections: [
      {
        title: 'Como é composta a conta de luz no Brasil?',
        body: [
          'A conta de energia elétrica que chega à sua residência todo mês não representa apenas a eletricidade consumida. O valor final faturado pela concessionária é composto por quatro parcelas essenciais: a Tarifa de Energia (TE), a Tarifa de Uso do Sistema de Distribuição (TUSD), o Adicional de Bandeiras Tarifárias e uma carga significativa de tributos municipais, estaduais e federais.',
          'A Tarifa de Energia (TE) remunera os geradores de eletricidade (usinas hidrelétricas, solares, eólicas e termelétricas). Já a TUSD cobre os custos de transporte e manutenção de postes, transformadores, cabos e fiação de alta e baixa tensão até a entrada da sua residência.',
          'Além disso, o sistema de Bandeiras Tarifárias (Verde, Amarela e Vermelha Patamar 1 ou 2) é acionado mensalmente pela ANEEL e pelo Operador Nacional do Sistema (ONS) dependendo do nível dos reservatórios de água e da necessidade de ligar usinas termelétricas, que são mais caras e poluentes.'
        ],
        highlightBox: {
          title: 'Regra de Ouro da ANEEL',
          text: 'Você tem o direito garantido pela Resolução Normativa nº 1.000/2021 da ANEEL de receber uma fatura detalhada com a discriminação exata do consumo ativo faturado em kWh, histórico dos últimos 12 meses e a composição de tributos destacados.',
          type: 'info'
        }
      },
      {
        title: 'Entenda os Tributos: ICMS "Por Dentro", PIS, COFINS e COSIP',
        body: [
          'Um dos maiores motivos de espanto do consumidor ao conferir a fatura é a forma como os impostos são cobrados. No Brasil, o ICMS (Imposto sobre Circulação de Mercadorias e Serviços) é um tributo estadual cobrado "por dentro". Isso significa que a alíquota incide sobre o próprio valor do imposto adicionado à tarifa base.',
          'Desde a aprovação da Lei Complementar nº 194/2022, a energia elétrica é considerada bem essencial, limitando a alíquota geral de ICMS na maioria dos estados entre 17% e 20%.',
          'Já o PIS e a COFINS são contribuições federais que somam em média de 3,5% a 5% da fatura. Por fim, a COSIP (Contribuição para Custeio do Serviço de Iluminação Pública) é uma taxa instituída pelas prefeituras municipais para custear lâmpadas e postes nas vias públicas, variando conforme a cidade.'
        ]
      },
      {
        title: 'O que fazer quando a conta de luz vem muito mais cara?',
        body: [
          'Se você recebeu uma fatura muito acima da sua média habitual, o primeiro passo nunca deve ser pagar sem antes conferir três pontos cruciais:',
          '1. Verifique se a leitura foi real ou "estimada por média": se o portão estava trancado ou o leiturista não teve acesso, a distribuidora pode ter faturado pela média dos últimos 12 meses.',
          '2. Compare os números do seu relógio hoje com a linha "Leitura Atual" impressa na fatura. Se o número da fatura for superior ao que o medidor exibe hoje, houve erro de digitação do leiturista.',
          '3. Verifique o número de dias faturados: o ciclo regulamentar da ANEEL varia de 27 a 33 dias. Em alguns meses o ciclo fecha com 34 ou 35 dias, aumentando o consumo total sem que seu padrão diário tenha mudado.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Por que o valor da conta varia tanto de um mês para o outro?',
        answer: 'As oscilações mensais ocorrem por quatro motivos fundamentais: variação da temperatura ambiente (o chuveiro e o ar-condicionado consomem muito mais em extremos climáticos), acionamento de bandeiras tarifárias amarelas ou vermelhas pela ANEEL, quantidade de dias no ciclo de leitura (de 27 a 33 dias) e possíveis cobranças retroativas de leituras estimadas.'
      },
      {
        question: 'O que é o Custo de Disponibilidade ou Taxa Mínima?',
        answer: 'É o valor cobrado pela distribuidora mesmo que você não consuma nada no mês (como em um imóvel fechado). Ele remunera a infraestrutura mantida à sua disposição. Conforme a ANEEL, equivale a 30 kWh para ligações monofásicas, 50 kWh para bifásicas e 100 kWh para trifásicas.'
      },
      {
        question: 'Como funciona a Tarifa Social de Energia Elétrica (Baixa Renda)?',
        answer: 'Famílias inscritas no Cadastro Único (CadÚnico) com renda per capita de até meio salário mínimo têm direito a descontos progressivos: 65% de desconto nos primeiros 30 kWh consumidos, 40% de 31 a 100 kWh e 10% de 101 a 220 kWh por mês.'
      },
      {
        question: 'Como contestar uma conta de luz com valor incorreto?',
        answer: 'Anote a leitura real do seu medidor, fotografe o relógio e ligue imediatamente para o SAC da concessionária anotando o protocolo. Se constatado o erro de leitura, a distribuidora deve cancelar a conta e emitir uma nova fatura com novo prazo de vencimento sem encargos.'
      },
      {
        question: 'Qual aparelho elétrico mais encarece a conta de luz?',
        answer: 'Em média residencial no Brasil, o Chuveiro Elétrico (5.500W) e o Ar-Condicionado (900W a 1.400W contínuos) respondem por até 50% a 65% do valor total da fatura, seguidos pela geladeira e pela fritadeira elétrica (air fryer).'
      },
      {
        question: 'A calculadora do site garante o valor exato cobrado na conta?',
        answer: 'Nossa calculadora fornece uma estimativa de alta precisão com base nas resoluções homologatórias da ANEEL, alíquotas de ICMS oficiais de cada UF e tarifas de cada distribuidora. Pequenas variações de centavos podem ocorrer devido a arredondamentos tributários municipais e ao valor específico da COSIP da sua cidade.'
      }
    ]
  },

  'como-ler-medidor-analogico': {
    route: 'como-ler-medidor-analogico',
    title: 'Como Ler o Medidor de Energia Analógico (Relógio de Ponteiros) — Guia Passo a Passo',
    metaDescription: 'Aprenda a ler o medidor de luz analógico de 4 ou 5 ponteiros. Entenda o sentido de rotação horário e anti-horário e a regra do menor número.',
    h1: 'Como Ler o Medidor de Energia Analógico de Ponteiros',
    subheadline: 'Passo a passo definitivo para decifrar os reloginhos do medidor de indução eletromecânico e nunca mais ser pego de surpresa na conta de luz.',
    badge: 'Guia Técnico Ilustrado',
    readTime: '5 min de leitura',
    breadcrumbs: [{ label: 'Início', route: 'home' }, { label: 'Como Ler Medidor Analógico' }],
    schemaType: 'HowTo',
    contentSections: [
      {
        title: 'O que é o medidor analógico (eletromecânico)?',
        body: [
          'O medidor analógico, também conhecido popularmente como relógio de luz de ponteiros ou medidor eletromecânico, funciona por indução eletromagnética. Ele possui um disco metálico central que gira proporcionalmente à quantidade de corrente elétrica consumida pelos aparelhos da casa.',
          'Esse disco transmite a rotação por meio de engrenagens para um conjunto de 4 ou 5 pequenos círculos graduados de 0 a 9 com ponteiros metálicos. Cada ponteiro representa uma ordem de grandeza decimal (unidades, dezenas, centenas, milhares e dezenas de milhares de kWh).'
        ],
        highlightBox: {
          title: 'Regra Crucial: Sentido dos Ponteiros Alternados',
          text: 'Os relógios giram em sentidos opostos! O primeiro relógio da esquerda geralmente gira no sentido HORÁRIO, o segundo no sentido ANTI-HORÁRIO, o terceiro HORÁRIO e o quarto ANTI-HORÁRIO. Observe sempre a seta desenhada no visor de cada mostrador!',
          type: 'warning'
        }
      },
      {
        title: 'A Regra de Ouro: "Se o ponteiro estiver entre dois números, anote sempre o MENOR"',
        body: [
          'O erro mais comum cometido por consumidores ao tentar ler o relógio analógico é anotar o número superior quando o ponteiro está entre dois dígitos.',
          'A regra oficial da ANEEL é inequívoca: sempre que o ponteiro estiver posicionado entre dois algarismos, o número registrado deve ser o MENOR (o que o ponteiro já ultrapassou).',
          'Exceção do 0 e do 9: Quando o ponteiro estiver entre o 9 e o 0, lembre-se de que o 0 representa o número 10 naquela escala. Logo, se ele ainda não passou completamente pelo 0, o número correto a ser anotado é o 9!'
        ],
        bulletList: [
          '1º Passo: Posicione-se em frente ao medidor na altura dos seus olhos para evitar o erro de paralaxe.',
          '2º Passo: Faça a leitura SEMPRE DA ESQUERDA PARA A DIREITA (do ponteiro de maior valor para o de menor valor).',
          '3º Passo: Se o ponteiro estiver exatamente em cima de um número, olhe o relógio vizinho à direita. Se o relógio da direita já tiver passado pelo 0, anote o número. Se o da direita ainda estiver antes do 0 (no 8 ou 9), anote o número anterior!'
        ]
      }
    ],
    faqs: [
      {
        question: 'E se o meu medidor analógico tiver 5 ponteiros em vez de 4?',
        answer: 'A regra é rigorosamente a mesma. Com 5 ponteiros, o primeiro relógio da esquerda mede a dezena de milhar (10.000). Você lê da esquerda para a direita, anotando os 5 dígitos sucessivamente.'
      },
      {
        question: 'O disco de metal no meio do medidor gira rápido demais. Isso indica vazamento de energia?',
        answer: 'Para testar se há fuga de corrente (vazamento), desligue todos os disjuntores ou tire todos os aparelhos das tomadas e apague as lâmpadas. O disco metálico deve parar completamente em até 10 minutos. Se continuar girando, pode haver fuga na fiação da casa.'
      }
    ]
  },

  'como-ler-medidor-digital': {
    route: 'como-ler-medidor-digital',
    title: 'Como Ler o Medidor de Energia Digital (Eletrônico) — Passo a Passo',
    metaDescription: 'Descubra como ler o medidor de luz digital com display LCD. Entenda os códigos 03, 04 e 08 e como conferir seu consumo em tempo real.',
    h1: 'Como Ler o Medidor de Energia Digital Eletrônico',
    subheadline: 'Entenda os códigos do display LCD, saiba qual tela indica o consumo ativo em kWh e como verificar se a distribuidora cobrou a leitura certa.',
    badge: 'Manual Prático',
    readTime: '4 min de leitura',
    breadcrumbs: [{ label: 'Início', route: 'home' }, { label: 'Como Ler Medidor Digital' }],
    schemaType: 'HowTo',
    contentSections: [
      {
        title: 'O que os códigos do display LCD significam?',
        body: [
          'Os medidores eletrônicos modernos contam com um display digital de cristal líquido (LCD) que alterna automaticamente entre várias telas a cada 6 ou 10 segundos, ou mediante o clique em um botão de navegação frontal.',
          'Diferente dos ponteiros mecânicos, a leitura é direta e numérica, sem margem para interpretações ambíguas. No entanto, o display exibe múltiplas grandezas elétricas identificadas por códigos numéricos padronizados pela ABNT e pela ANEEL.'
        ],
        table: {
          headers: ['Código na Tela', 'Grandeza Registrada', 'Significado para o Consumidor'],
          rows: [
            ['Código 03', 'Consumo Ativo Total (kWh)', 'É ESTE NÚMERO que deve ser anotado para calcular a sua conta!'],
            ['Código 04', 'Demanda Máxima Registrada (kW)', 'Mais comum em faturas comerciais e industriais.'],
            ['Código 08', 'Tensão Instantânea (Volts)', 'Mostra a voltagem real da sua rede (ex: 127V ou 220V).'],
            ['Código 24 ou 88', 'Teste de Display (888888)', 'Serve para verificar se todos os segmentos do LCD estão funcionando.']
          ]
        }
      },
      {
        title: 'Como calcular seu consumo pelo medidor digital?',
        body: [
          'Aguarde a tela exibir o Código 03 (ou aperte o botão até chegar nele). Anote o número completo exibido no visor, desconsiderando os dígitos que estiverem após a vírgula (se houver, geralmente destacados em vermelho).',
          'Para saber quanto você gastou entre duas datas, subtraia a leitura anterior da leitura de hoje: Consumo = Leitura Atual - Leitura Anterior.'
        ],
        highlightBox: {
          title: 'Luz Vermelha Piscando no Medidor',
          text: 'O LED vermelho frontal pisca proporcionalmente ao consumo imediato da casa. Quanto mais aparelhos potentes estiverem ligados (como chuveiro e ferro), mais rápido o LED piscará. Cada pulso representa uma fração padronizada de Wh (ex: 1 pulse = 1 Wh).',
          type: 'info'
        }
      }
    ],
    faqs: [
      {
        question: 'O medidor digital pode ser lido remotamente pela distribuidora?',
        answer: 'Sim, modelos bidirecionais e inteligentes (smart meters) instalados em novas conexões transmitem os dados via radiofrequência ou sinal de celular (GPRS/Mesh), dispensando a presença física do leiturista.'
      }
    ]
  },

  'o-que-e-bandeira-tarifaria': {
    route: 'o-que-e-bandeira-tarifaria',
    title: 'O que é Bandeira Tarifária e Como Ela Afeta a Conta de Luz — Valores ANEEL',
    metaDescription: 'Entenda como funcionam as bandeiras tarifárias verde, amarela, vermelha 1 e 2. Veja a tabela oficial de valores e como economizar energia.',
    h1: 'O que é Bandeira Tarifária e Quanto Custa Cada Cor?',
    subheadline: 'Entenda como o sistema de bandeiras tarifárias da ANEEL funciona, quais são os custos adicionais por kWh e como se preparar para meses de seca.',
    badge: 'Regulação ANEEL',
    readTime: '6 min de leitura',
    breadcrumbs: [{ label: 'Início', route: 'home' }, { label: 'Bandeiras Tarifárias' }],
    schemaType: 'Article',
    contentSections: [
      {
        title: 'Como funciona o sistema de bandeiras tarifárias?',
        body: [
          'Criado pela ANEEL em 2015, o Sistema de Bandeiras Tarifárias tem como objetivo alertar os consumidores brasileiros com antecedência sobre o custo real da geração de energia no país mês a mês.',
          'Mais de 65% da matriz elétrica brasileira depende da água que corre nos rios e abastece os reservatórios das usinas hidrelétricas. Quando o período de chuvas é escasso e os reservatórios baixam, o ONS precisa despachar as usinas termelétricas, que queimam gás natural, carvão mineral ou óleo diesel.',
          'Como o custo do combustível termelétrico é muito superior ao da água, a bandeira tarifária transfere esse custo adicional diretamente para a fatura mensal, evitando que as distribuidoras acumulem dívidas bilionárias com repasses retroativos no ano seguinte.'
        ]
      },
      {
        title: 'Tabela de Valores Oficiais das Bandeiras Tarifárias (ANEEL 2026)',
        body: [
          'A ANEEL divulga no último dia útil de cada mês qual será a bandeira vigente para o mês seguinte. Veja os valores de acréscimo aplicados a cada 100 kWh consumidos:'
        ],
        table: {
          headers: ['Bandeira', 'Condição dos Reservatórios', 'Acréscimo por kWh', 'Acréscimo a cada 100 kWh'],
          rows: [
            ['Verde', 'Boas chuvas e reservatórios cheios', 'R$ 0,00000', 'R$ 0,00 (Sem acréscimo)'],
            ['Amarela', 'Condições menos favoráveis, início de térmicas', 'R$ 0,01885', 'R$ 1,885'],
            ['Vermelha Patamar 1', 'Usinas térmicas mais caras em operação', 'R$ 0,04463', 'R$ 4,463'],
            ['Vermelha Patamar 2', 'Seca acentuada e térmicas a pleno vapor', 'R$ 0,07877', 'R$ 7,877'],
            ['Escassez Hídrica', 'Crise hídrica extrema e emergencial', 'R$ 0,14200', 'R$ 14,200']
          ]
        },
        highlightBox: {
          title: 'Impacto Real no Orçamento Familiar',
          text: 'Em uma residência com consumo médio de 300 kWh/mês, a ativação da Bandeira Vermelha Patamar 2 adiciona cerca de R$ 23,63 somente de taxa de bandeira, sem contar os tributos (ICMS e PIS/COFINS) que incidem sobre ela!',
          type: 'warning'
        }
      }
    ],
    faqs: [
      {
        question: 'A bandeira tarifária é um imposto novo?',
        answer: 'Não. A bandeira tarifária não é um imposto, mas sim uma tarifa regulatória que antecipa custos reais de geração térmica aprovada pela ANEEL.'
      },
      {
        question: 'Quem tem Tarifa Social (Baixa Renda) paga bandeira?',
        answer: 'Os beneficiários da Tarifa Social de Energia Elétrica contam com descontos proporcionais também sobre o adicional de bandeiras tarifárias.'
      }
    ]
  },

  'quanto-cada-aparelho-gasta': {
    route: 'quanto-cada-aparelho-gasta',
    title: 'Quanto Cada Aparelho Gasta de Energia? — Tabela Completa em kWh e R$',
    metaDescription: 'Descubra quanto gasta de energia o chuveiro, ar-condicionado, geladeira, air fryer, TV e computador. Tabela com potências e cálculo de custo mensal.',
    h1: 'Quanto Cada Aparelho Gasta de Energia Elétrica?',
    subheadline: 'Veja a tabela com os maiores vilões do consumo residencial, a fórmula para calcular o custo de qualquer eletrodoméstico e dicas práticas para economizar.',
    badge: 'Consumo por Aparelho',
    readTime: '7 min de leitura',
    breadcrumbs: [{ label: 'Início', route: 'home' }, { label: 'Consumo por Aparelho' }],
    schemaType: 'Article',
    contentSections: [
      {
        title: 'A Fórmula Matemática do Consumo Elétrico',
        body: [
          'Você não precisa adivinhar quanto um aparelho gasta. A física e a matemática oferecem uma fórmula simples que qualquer pessoa pode calcular em casa:',
          'Consumo Mensal (kWh) = (Potência em Watts × Horas de uso por dia × Dias de uso no mês) ÷ 1.000',
          'Para descobrir o custo em reais (R$), basta multiplicar o consumo em kWh resultante pela tarifa média de energia com impostos da sua cidade (que costuma ficar entre R$ 0,85 e R$ 1,15 por kWh).'
        ],
        highlightBox: {
          title: 'Exemplo Prático: Chuveiro Elétrico de 5.500W',
          text: 'Se 3 pessoas na casa tomarem um banho de 10 minutos cada por dia no inverno (30 minutos = 0,5 hora diária):\nConsumo = (5.500W × 0,5h × 30 dias) ÷ 1.000 = 82,5 kWh/mês!\nCom uma tarifa de R$ 1,00/kWh, apenas o chuveiro custa R$ 82,50 por mês.',
          type: 'info'
        }
      },
      {
        title: 'Ranking dos Maiores Consumidores de Eletricidade',
        body: [
          'Confira a estimativa média de consumo e custo mensal dos principais aparelhos de uma casa padrão brasileira:'
        ],
        table: {
          headers: ['Aparelho', 'Potência Média', 'Uso Típico', 'Consumo Mensal (kWh)', 'Custo Médio Est. (R$)'],
          rows: [
            ['Chuveiro Elétrico (Modo Inverno)', '5.500 W', '40 min/dia', '110,0 kWh', 'R$ 105 a R$ 125'],
            ['Ar-Condicionado Convencional 9.000 BTU', '1.400 W', '8 horas/dia', '168,0 kWh', 'R$ 155 a R$ 190'],
            ['Ar-Condicionado Inverter 9.000 BTU', '900 W (média)', '8 horas/dia', '108,0 kWh', 'R$ 100 a R$ 120'],
            ['Geladeira Duplex Frost Free (Procel A)', '55 W (ciclo médio)', '24 horas/dia', '39,6 kWh', 'R$ 38 a R$ 46'],
            ['Fritadeira Air Fryer', '1.500 W', '30 min/dia (20 dias)', '15,0 kWh', 'R$ 14 a R$ 17'],
            ['Computador Gamer / Desktop', '300 W', '6 horas/dia (26 dias)', '46,8 kWh', 'R$ 44 a R$ 53'],
            ['Televisor LED 50"', '100 W', '5 horas/dia', '15,0 kWh', 'R$ 14 a R$ 17'],
            ['Máquina de Lavar Roupas', '500 W', '1h30 por lavagem (12x/mês)', '9,0 kWh', 'R$ 8 a R$ 11']
          ]
        }
      }
    ],
    faqs: [
      {
        question: 'O aparelho em stand-by (luzinha vermelha acesa) gasta muita energia?',
        answer: 'O consumo de stand-by de cada aparelho é pequeno (1 a 5 Watts), mas a soma de 10 ou 15 eletrônicos na casa pode representar até 5% a 8% da conta ao longo de um ano inteiro.'
      },
      {
        question: 'Ar-condicionado Inverter realmente economiza até 60%?',
        answer: 'Sim, porque o compressor Inverter não desliga e liga bruscamente como os modelos tradicionais; ele apenas modula a velocidade para manter a temperatura estável, evitando picos de corrente.'
      }
    ]
  },

  'conta-de-luz-muito-alta-motivos': {
    route: 'conta-de-luz-muito-alta-motivos',
    title: 'Conta de Luz Veio Muito Alta: 7 Motivos e Como Contestar na Distribuidora',
    metaDescription: 'Sua conta de energia veio muito cara de repente? Veja os 7 principais motivos, como identificar cobrança indevida e o passo a passo para contestar.',
    h1: 'Por que Minha Conta de Luz Veio Muito Alta?',
    subheadline: 'Descubra os principais motivos que fazem a fatura disparar e aprenda exatamente como contestar cobranças indevidas junto à sua concessionária e à ANEEL.',
    badge: 'Direitos do Consumidor',
    readTime: '6 min de leitura',
    breadcrumbs: [{ label: 'Início', route: 'home' }, { label: 'Conta Muito Alta: Motivos' }],
    schemaType: 'Article',
    contentSections: [
      {
        title: 'Os 7 Motivos Mais Frequentes para a Conta Subir de Repente',
        body: [
          'Quando a conta dobra de valor de um mês para o outro, o consumidor costuma desconfiar de fraude ou relógio quebrado. Embora defeitos no medidor existam, na grande maioria dos casos o motivo é uma das sete causas abaixo:',
          '1. Leitura por Estimativa no mês anterior: Se o mês passado foi faturado pela média por falta de acesso e você consumiu mais, a leitura real deste mês acumulou a diferença retroativa.',
          '2. Erro de Digitação do Leiturista: O operador pode ter digitado um número errado no coletor eletrônico.',
          '3. Fuga de Corrente Elétrica (Vazamento): Fios desencapados em conduítes úmidos ou emendas malfeitas podem drenar eletricidade continuamente para a terra ou ferragens da parede.',
          '4. Problema no Termostato da Geladeira ou Chuveiro: A geladeira não desliga o motor nunca porque a borracha de vedação rasgou ou o termostato travou.',
          '5. Ciclo de Leitura Estendido: A ANEEL autoriza faturamentos entre 27 e 33 dias. Meses com 34 ou 35 dias acumulam mais consumo.',
          '6. Mudança de Bandeira Tarifária: A virada da bandeira verde para a vermelha patamar 2 encarece instantaneamente cada kWh.',
          '7. Cobrança de Serviços Extras ou Débitos Anteriores: Inclusão de multas por atraso, parcelamento de débitos ou seguros não solicitados.'
        ]
      },
      {
        title: 'Passo a Passo para Contestar a Fatura na Distribuidora',
        body: [
          'Se você identificou um erro claro (por exemplo, a leitura impressa na conta está mais alta do que o relógio exibe hoje):',
          'Passo 1: Fotografe o medidor em boa resolução, mostrando o mostrador e o número de série gravado no aparelho.',
          'Passo 2: Ligue para o atendimento telefônico da concessionária e solicite "Reclamação por Erro de Faturamento / Leitura". Guarde o número de protocolo com dia e hora.',
          'Passo 3: A distribuidora tem até 5 dias úteis para analisar o pedido. Comprovado o erro, a conta é cancelada e substituída por uma nova fatura recalculada, prorrogando a data de vencimento.',
          'Passo 4: Caso a distribuidora negue a revisão, acione a Ouvidoria da concessionária informando o protocolo anterior. Se ainda assim não houver solução, registre queixa formal na ANEEL (telefone 167 ou app ANEEL Consumidor) e no Procon.'
        ],
        highlightBox: {
          title: 'Atenção ao Prazo de Suspensão de Fornecimento',
          text: 'Faturas em contestação formal com protocolo aberto na distribuidora não podem ensejar corte de energia elétrica enquanto o recurso estiver pendente de resposta.',
          type: 'warning'
        }
      }
    ]
  },

  'conta-estimada-o-que-fazer': {
    route: 'conta-estimada-o-que-fazer',
    title: 'Conta com Leitura Estimada: O Que Fazer e Como Pedir Refaturamento',
    metaDescription: 'Sua conta de energia veio com leitura estimada por média? Entenda a Resolução ANEEL 1.000/2021, como autoleitura funciona e evite acúmulo de consumo.',
    h1: 'Conta com Leitura Estimada: O Que Significa e Como Resolver',
    subheadline: 'Entenda quando a concessionária pode faturar pela média, os perigos do acúmulo no mês seguinte e como fazer a autoleitura pelo aplicativo.',
    badge: 'Regras da ANEEL',
    readTime: '5 min de leitura',
    breadcrumbs: [{ label: 'Início', route: 'home' }, { label: 'Conta Estimada: O Que Fazer' }],
    schemaType: 'Article',
    contentSections: [
      {
        title: 'Por que a distribuidora fatura por estimativa?',
        body: [
          'A Resolução Normativa nº 1.000/2021 da ANEEL autoriza a distribuidora a emitir a conta com base na média dos últimos 12 meses exclusivamente quando há impedimento de acesso ao medidor (como portão trancado, presença de cães bravos ou intempéries climáticas) ou em situações de emergência pública.',
          'O perigo da estimativa: se no mês da estimativa você viajou e a casa ficou vazia, você pagará mais do que consumiu. Por outro lado, se você consumiu muito (com ar-condicionado no verão), a leitura seguinte registrará um salto gigantesco que poderá empurrar seu consumo para faixas de ICMS mais altas!'
        ]
      },
      {
        title: 'Como fazer a Autoleitura e evitar estimativas',
        body: [
          'A maioria das concessionárias (Enel, CPFL, Light, Cemig, Copel) disponibiliza em seus aplicativos e agências virtuais a funcionalidade de Autoleitura.',
          'Verifique na sua conta a data prevista para a próxima leitura. Cerca de 2 a 3 dias antes dessa data, acesse o app da distribuidora, tire uma foto do relógio e digite os números registrados. Isso garante faturamento 100% real.'
        ]
      }
    ]
  },

  'tarifa-distribuicao-vs-geracao': {
    route: 'tarifa-distribuicao-vs-geracao',
    title: 'Tarifa de Distribuição (TUSD) vs. Tarifa de Geração (TE) — Entenda a Diferença',
    metaDescription: 'O que é TUSD e TE na conta de luz? Entenda a diferença entre a Tarifa de Uso do Sistema de Distribuição e a Tarifa de Energia e para onde vai o seu dinheiro.',
    h1: 'Tarifa de Distribuição (TUSD) vs. Tarifa de Energia (TE)',
    subheadline: 'Descubra para onde vai cada centavo pago na sua conta de luz e entenda por que a TUSD representa a maior fatia do valor faturado.',
    badge: 'Composição Tarifária',
    readTime: '5 min de leitura',
    breadcrumbs: [{ label: 'Início', route: 'home' }, { label: 'TUSD vs TE' }],
    schemaType: 'Article',
    contentSections: [
      {
        title: 'O que é TUSD (Tarifa de Uso do Sistema de Distribuição)?',
        body: [
          'A TUSD remunera os custos de instalação, operação e manutenção de toda a rede elétrica física que leva os elétrons das subestações até a sua tomada.',
          'Ela inclui os postes de iluminação, os transformadores nos bairros, a fiação de distribuição e as equipes de emergência que restabelecem a energia após temporais.'
        ]
      },
      {
        title: 'O que é TE (Tarifa de Energia)?',
        body: [
          'A TE cobre o custo direto da geração da eletricidade nas usinas hidrelétricas, eólicas, solares ou térmicas. Ela remunera os geradores pelo produto "eletricidade" propriamente dito.',
          'Em média, em uma conta residencial brasileira sem impostos, a TUSD representa entre 55% e 60% do total e a TE representa entre 40% e 45%.'
        ]
      }
    ]
  },

  'impostos-na-conta-de-luz': {
    route: 'impostos-na-conta-de-luz',
    title: 'Impostos na Conta de Luz: ICMS "Por Dentro", PIS e COFINS Explicados',
    metaDescription: 'Como os impostos são calculados na conta de energia? Entenda a mecânica do ICMS por dentro, PIS/COFINS e o impacto da Lei Complementar 194.',
    h1: 'Como os Impostos São Calculados na Conta de Luz',
    subheadline: 'Entenda o cálculo "por dentro" do ICMS, a participação do PIS/COFINS e como as alíquotas estaduais impactam o valor final que você desembolsa.',
    badge: 'Tributação de Energia',
    readTime: '6 min de leitura',
    breadcrumbs: [{ label: 'Início', route: 'home' }, { label: 'Impostos na Conta de Luz' }],
    schemaType: 'Article',
    contentSections: [
      {
        title: 'O Fenômeno do Cálculo "Por Dentro" do ICMS',
        body: [
          'No sistema tributário brasileiro, o ICMS não é simplesmente somado ao valor do produto. A legislação determina que o imposto integra a sua própria base de cálculo.',
          'Fórmula da Base de Cálculo: Base = Valor da Energia ÷ [1 - (Alíquota ICMS + PIS + COFINS)]',
          'Dessa forma, uma alíquota aparente de 18% resulta em um peso financeiro real de mais de 22% a 25% sobre a tarifa pura da distribuidora.'
        ]
      }
    ]
  },

  'o-que-e-cosip-iluminacao-publica': {
    route: 'o-que-e-cosip-iluminacao-publica',
    title: 'O que é COSIP / CIP na Conta de Luz? — Contribuição de Iluminação Pública',
    metaDescription: 'O que significa COSIP ou CIP na sua fatura de energia? Saiba por que a prefeitura cobra essa taxa e como o valor é definido em cada município.',
    h1: 'O que é COSIP / CIP na Conta de Energia Elétrica?',
    subheadline: 'Tudo o que você precisa saber sobre a Contribuição de Iluminação Pública: legalidade constitucional, valores médios e destinação dos recursos.',
    badge: 'Tributos Municipais',
    readTime: '4 min de leitura',
    breadcrumbs: [{ label: 'Início', route: 'home' }, { label: 'COSIP Iluminação Pública' }],
    schemaType: 'Article',
    contentSections: [
      {
        title: 'Origem Constitucional da COSIP',
        body: [
          'A COSIP (Contribuição para o Custeio da Iluminação Pública) foi introduzida na Constituição Federal de 1988 pela Emenda Constitucional nº 39/2002 (Artigo 149-A).',
          'Ela autoriza os municípios e o Distrito Federal a instituir contribuição para o custeio do serviço de iluminação das ruas, praças, avenidas e vias públicas.',
          'Embora venha discriminada na fatura da concessionária de energia, a distribuidora não fica com esse dinheiro: ela atua apenas como arrecadadora e repassa o montante integralmente para a prefeitura da sua cidade.'
        ]
      }
    ]
  },

  'como-calcular-consumo-pelo-medidor': {
    route: 'como-calcular-consumo-pelo-medidor',
    title: 'Como Calcular o Consumo em kWh a Partir do Medidor Residencial',
    metaDescription: 'Aprenda a fórmula simples para calcular seu consumo diário e mensal em kWh usando as leituras do relógio de energia e antecipe sua fatura.',
    h1: 'Como Calcular o Consumo em kWh pelo Medidor de Luz',
    subheadline: 'Fórmula prática para medir seu consumo semanal ou mensal, calcular o gasto diário médio e nunca mais tomar sustos com a conta no final do mês.',
    badge: 'Controle de Consumo',
    readTime: '4 min de leitura',
    breadcrumbs: [{ label: 'Início', route: 'home' }, { label: 'Calcular Consumo pelo Medidor' }],
    schemaType: 'HowTo',
    contentSections: [
      {
        title: 'Fórmula do Consumo entre Duas Leituras',
        body: [
          'Para acompanhar seu consumo ao longo do mês, adote o hábito de anotar a leitura do relógio no mesmo dia e horário toda semana.',
          'Consumo do Período (kWh) = Leitura Atual (kWh) - Leitura Anterior (kWh)',
          'Consumo Médio Diário (kWh/dia) = Consumo do Período ÷ Quantidade de Dias entre Leituras',
          'Projeção para 30 Dias = Consumo Médio Diário × 30'
        ]
      }
    ]
  },

  faq: {
    route: 'faq',
    title: 'Dúvidas Frequentes sobre Conta de Energia, Tarifas e Medidores — FAQ',
    metaDescription: 'Respostas completas para as principais dúvidas sobre cálculo de conta de luz, bandeiras tarifárias, leitura de relógio e direitos na ANEEL.',
    h1: 'Perguntas Frequentes (FAQ)',
    subheadline: 'Tire suas dúvidas sobre faturamento de energia elétrica, leituras de medidores, regras da ANEEL e como reduzir os gastos mensais.',
    badge: 'Central de Ajuda',
    readTime: '5 min de leitura',
    breadcrumbs: [{ label: 'Início', route: 'home' }, { label: 'Perguntas Frequentes' }],
    schemaType: 'FAQPage',
    contentSections: [],
    faqs: [
      {
        question: 'Por que a bandeira tarifária muda todo mês?',
        answer: 'A ANEEL e o ONS avaliam mensalmente o nível dos reservatórios das hidrelétricas e a previsão meteorológica. Se houver pouca chuva, é necessário acionar usinas termelétricas, elevando o custo de geração e ativando bandeiras amarela ou vermelha.'
      },
      {
        question: 'O que fazer se a conta vier com "leitura estimada"?',
        answer: 'Confira imediatamente se o relógio físico marca menos do que o valor cobrado. Se estiver coerente, certifique-se de garantir acesso livre ao leiturista no próximo ciclo ou envie a autoleitura pelo aplicativo da sua distribuidora.'
      },
      {
        question: 'Como faço para contestar uma conta que parece errada?',
        answer: 'Tire fotos do seu medidor, anote os dados e ligue para a concessionária solicitando revisão por erro de leitura. Caso não haja resposta favorável em 5 dias úteis, acione a Ouvidoria e o canal oficial da ANEEL pelo telefone 167.'
      },
      {
        question: 'Existe diferença de tarifa entre dia e noite (tarifa branca)?',
        answer: 'Sim. A Tarifa Branca oferece tarifas mais baratas nos horários fora de ponta (madrugada e manhã/tarde), mas encarece fortemente no horário de ponta (início da noite, das 17h30 às 20h30). Só compensa para residências que conseguem deslocar banhos e máquinas para o período diurno.'
      },
      {
        question: 'O que é a taxa mínima ou custo de disponibilidade mesmo sem consumir nada?',
        answer: 'É o valor cobrado pela concessionária para manter a infraestrutura de rede conectada ao seu imóvel. Corresponde a 30 kWh para monofásicos, 50 kWh para bifásicos e 100 kWh para trifásicos conforme a Resolução Normativa 1.000/2021 da ANEEL.'
      },
      {
        question: 'Quais aparelhos gastam mais energia em uma residência comum?',
        answer: 'Chuveiro elétrico e ar-condicionado respondem juntos por mais da metade da conta na maioria dos lares, seguidos por geladeiras antigas, fritadeiras elétricas (air fryers) e ferros de passar roupa.'
      },
      {
        question: 'O que é Tarifa Social de Energia Elétrica e quem tem direito?',
        answer: 'É um benefício social do Governo Federal que concede descontos de até 65% na conta de luz para famílias inscritas no CadÚnico com renda mensal per capita de até meio salário mínimo ou com portadores de deficiência que necessitem de aparelhos elétricos vitais.'
      },
      {
        question: 'Como saber se meu relógio de luz está marcando mais do que deveria?',
        answer: 'Desligue todos os disjuntores da sua casa. O disco do medidor analógico deve parar totalmente de rodar, ou o LED vermelho do medidor digital deve parar de piscar. Se continuar se movimentando com a chave desligada, chame um eletricista ou solicite calibração na distribuidora.'
      }
    ]
  },

  sobre: {
    route: 'sobre',
    title: 'Sobre Nós — Calculadora de Conta de Energia Elétrica',
    metaDescription: 'Conheça o propósito do portal: fornecer ferramentas públicas e didáticas para cálculo, conferência e compreensão do consumo de energia no Brasil.',
    h1: 'Sobre o Portal',
    subheadline: 'Educação financeira, transparência nas tarifas elétricas e ferramentas gratuitas de utilidade pública para os consumidores de todo o Brasil.',
    badge: 'Institucional',
    readTime: '3 min de leitura',
    breadcrumbs: [{ label: 'Início', route: 'home' }, { label: 'Sobre' }],
    schemaType: 'Article',
    contentSections: [
      {
        title: 'Nossa Missão',
        body: [
          'A conta de energia elétrica é uma das despesas fixas mais pesadas e enigmáticas do orçamento doméstico brasileiro. Fórmulas complexas de impostos "por dentro", siglas como TUSD e TE, e mudanças imprevistas de bandeiras tarifárias deixam milhões de famílias sem saber se o que pagam todo mês é justo ou se decorre de cobranças indevidas.',
          'Nosso portal nasceu para democratizar o entendimento tarifário por meio de tecnologia acessível, calculadoras precisas atualizadas com base nos dados públicos da ANEEL e guias visuais para leitura de medidores analógicos e digitais.'
        ]
      },
      {
        title: 'Declaração Institucional Obrigatória',
        body: [
          'Este site tem finalidade estritamente informativa e educativa sobre consumo e faturamento de energia elétrica residencial no Brasil. Não somos uma distribuidora de energia nem representamos a ANEEL (Agência Nacional de Energia Elétrica) ou qualquer concessionária pública ou privada.'
        ],
        highlightBox: {
          title: 'Independência Editorial',
          text: 'Todas as ferramentas disponibilizadas no portal são 100% gratuitas, não exigem cadastro prévio e respeitam a privacidade dos usuários. Os valores calculados são estimativas fundamentadas nas normas regulatórias oficiais.',
          type: 'info'
        }
      }
    ]
  },

  'politica-de-privacidade': {
    route: 'politica-de-privacidade',
    title: 'Política de Privacidade — Calculadora de Conta de Energia',
    metaDescription: 'Transparência, proteção de dados e conformidade com a LGPD e diretrizes do Google AdSense e Google Analytics.',
    h1: 'Política de Privacidade',
    subheadline: 'Entenda como protegemos sua privacidade e como usamos cookies para veiculação de anúncios do Google AdSense e medição de audiência.',
    badge: 'Legal & LGPD',
    readTime: '4 min de leitura',
    breadcrumbs: [{ label: 'Início', route: 'home' }, { label: 'Política de Privacidade' }],
    schemaType: 'Article',
    contentSections: [
      {
        title: '1. Coleta e Uso de Dados',
        body: [
          'Nosso portal opera em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018). As calculadoras de energia elétrica disponibilizadas no site não exigem cadastro, login, CPF ou dados bancários.',
          'Todos os dados de consumo em kWh, leituras de medidores e valores de faturas inseridos nas ferramentas são processados de forma puramente local no navegador do usuário, não sendo armazenados em servidores externos.'
        ]
      },
      {
        title: '2. Cookies e Google AdSense',
        body: [
          'Utilizamos provedores terceiros, incluindo o Google, para veicular anúncios quando você visita nosso site. O Google utiliza cookies (como o cookie DoubleClick) para veicular anúncios com base nas visitas anteriores do usuário a este ou a outros sites na internet.',
          'Os usuários podem desativar a publicidade personalizada acessando as Configurações de Anúncios do Google (www.google.com/settings/ads) ou visitando o portal www.aboutads.info.'
        ]
      },
      {
        title: '3. Google Analytics',
        body: [
          'Utilizamos o Google Analytics para coletar informações agregadas de tráfego, como páginas mais visitadas, tempo médio de permanência e tipo de dispositivo utilizado, com o único propósito de aprimorar a experiência de navegação e velocidade do site.'
        ]
      }
    ]
  },

  'termos-de-uso': {
    route: 'termos-de-uso',
    title: 'Termos de Uso — Calculadora de Conta de Energia',
    metaDescription: 'Condições de uso do portal, natureza das estimativas tarifárias e limitação de responsabilidade civil.',
    h1: 'Termos de Uso do Serviço',
    subheadline: 'Regras e termos que regem a utilização das calculadoras e dos conteúdos informativos do portal.',
    badge: 'Termos Legais',
    readTime: '4 min de leitura',
    breadcrumbs: [{ label: 'Início', route: 'home' }, { label: 'Termos de Uso' }],
    schemaType: 'Article',
    contentSections: [
      {
        title: '1. Natureza das Ferramentas',
        body: [
          'As calculadoras e simuladores deste portal têm caráter estritamente educativo e orientador. Os valores exibidos são estimativas baseadas em tarifas públicas homologadas pela ANEEL e alíquotas médias de ICMS e COSIP.',
          'Em nenhuma hipótese os cálculos deste site substituem faturas oficiais ou decisões de faturamento emitidas por concessionárias de energia elétrica.'
        ]
      },
      {
        title: '2. Limitação de Responsabilidade',
        body: [
          'Não nos responsabilizamos por decisões financeiras, pagamentos com atraso, disputas administrativas ou judiciais travadas entre o usuário e concessionárias de energia. Recomendamos sempre a consulta à fatura física emitida pela distribuidora credenciada.'
        ]
      }
    ]
  },

  contato: {
    route: 'contato',
    title: 'Fale Conosco — Sugestões e Dúvidas Tarifárias',
    metaDescription: 'Entre em contato com a equipe da Calculadora de Conta de Energia para relatar atualizações tarifárias ou sugerir melhorias.',
    h1: 'Fale Conosco',
    subheadline: 'Envie sugestões de melhorias, correções tarifárias da sua concessionária ou tire dúvidas sobre o funcionamento das calculadoras.',
    badge: 'Atendimento',
    readTime: '2 min de leitura',
    breadcrumbs: [{ label: 'Início', route: 'home' }, { label: 'Contato' }],
    schemaType: 'Article',
    contentSections: [
      {
        title: 'Canal de Comunicação com a Equipe',
        body: [
          'Valorizamos o feedback da comunidade para manter as tarifas de todas as distribuidoras do Brasil sempre atualizadas e fiéis às revisões tarifárias da ANEEL.',
          'Para sugestões, correções ou dúvidas institucionais, utilize nosso formulário abaixo ou envie um e-mail para: contato@calculadoracontadeenergia.com.br'
        ]
      }
    ]
  }
};

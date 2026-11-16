import type { CaseStudy } from "@/core/entities/case-study.entity";
import { ProjectId } from "@/core/enums/project-id.enum";
import { CODEBUILD_SPEC_SAMPLE } from "@/data/content/shared/code-samples.constants";
import { CASE_STUDY_SLUGS, PROJECT_URLS } from "@/data/content/shared/profile.constants";

export const CASE_STUDIES_PT_BR: readonly CaseStudy[] = [
  {
    slug: CASE_STUDY_SLUGS.codebuild,
    projectId: ProjectId.Codebuild,
    title: "go-codebuild-tool",
    summary:
      "Um gerador de código para Go. Entram specs pequenas e sai uma API REST completa, ou um conjunto de microsserviços gRPC, com código que dá para ler e manter.",
    stack: ["Go", "net/http", "database/sql", "gRPC", "Protocol Buffers", "OpenTelemetry", "Kubernetes"],
    sections: [
      {
        id: "motivo",
        heading: "Por que existe",
        paragraphs: [
          "Toda API nova começava do mesmo jeito: handlers, validação, repositórios, migrações, autenticação e testes. Escrevi o codebuild para gerar essa base a partir de structs Go, sem framework e sem dependência em tempo de execução.",
          "Se o codebuild sair do projeto, o projeto continua compilando.",
        ],
        points: [],
        code: null,
        metrics: [],
      },
      {
        id: "spec",
        heading: "A spec é Go",
        paragraphs: [
          "Cada entidade é uma struct com tags gen. A análise usa go/parser e go/types, então um erro na spec aponta a linha e sugere o nome certo.",
        ],
        points: [],
        code: { caption: "specs/users.go", source: CODEBUILD_SPEC_SAMPLE },
        metrics: [],
      },
      {
        id: "saida",
        heading: "O que sai",
        paragraphs: [
          "Os handlers gerados chamam um Service que é seu e nunca é sobrescrito. O Service chama o repositório gerado.",
        ],
        points: [
          "Rotas com net/http, validação por campo e erros no formato RFC 9457",
          "Repositórios database/sql com SQL escrito para PostgreSQL, SQL Server, MySQL ou SQLite",
          "Migrações incrementais com up e down e um migrador embutido",
          "Autenticação por sessão, JWT com refresh rotativo ou API key, com senhas em PBKDF2",
          "OpenAPI 3.1 gerado das mesmas definições dos handlers",
          "Idempotency-Key, rate limit por endereço e por conta, probes de saúde",
        ],
        code: null,
        metrics: [],
      },
      {
        id: "microsservicos",
        heading: "Microsserviços",
        paragraphs: [
          "Quando as entidades ficam dentro de structs de serviço, a saída vira um workspace Go com um serviço gRPC por struct e um gateway REST na frente.",
        ],
        points: [
          "Contratos .proto gerados sem protoc, com números de campo estáveis",
          "mTLS entre os serviços e um token interno assinado com Ed25519",
          "Chaves e certificados que giram sem reiniciar",
          "Balanceamento no cliente, retries e circuit breaker",
        ],
        code: null,
        metrics: [],
      },
      {
        id: "garantias",
        heading: "Garantias",
        paragraphs: [
          "A mesma spec, com a mesma versão do Go e o mesmo banco, gera sempre os mesmos bytes. Só os arquivos *_gen.go são regenerados.",
        ],
        points: [
          "Projetos de referência comparados byte a byte nos testes",
          "Testes ponta a ponta contra os quatro bancos",
          "Fuzzing semanal e análise com CodeQL",
          "Releases com checksums assinados, SBOM e proveniência de build",
        ],
        code: null,
        metrics: [],
      },
      {
        id: "numeros",
        heading: "Números",
        paragraphs: [
          "Teste de carga da documentação, rodado num runner do GitHub Actions com quatro CPUs divididas entre o gerador de carga, a API e o PostgreSQL 17, com 32 clientes.",
        ],
        points: [],
        code: null,
        metrics: [
          { value: "11.462", label: "req/s num GET por id, p50 de 2,5 ms" },
          { value: "5.937", label: "req/s criando registros" },
          { value: "5.795", label: "req/s pelo gateway, com gRPC e mTLS" },
          { value: "4", label: "bancos com SQL próprio" },
        ],
      },
    ],
    links: [
      { label: "repositório no GitHub", href: PROJECT_URLS.codebuildRepo, external: true },
      { label: "releases", href: PROJECT_URLS.codebuildReleases, external: true },
    ],
    nextSlug: CASE_STUDY_SLUGS.expertiDict,
    nextLabel: "próximo: ExpertiDict",
  },
  {
    slug: CASE_STUDY_SLUGS.expertiDict,
    projectId: ProjectId.ExpertiDict,
    title: "ExpertiDict",
    summary:
      "Um PWA de vocabulário. Uma palavra nova chega por notificação, com significado e pronúncia, nos horários que a pessoa escolhe.",
    stack: ["Go", "PostgreSQL", "React", "Vite", "Tailwind", "Service Worker", "Web Push"],
    sections: [
      {
        id: "ideia",
        heading: "A ideia",
        paragraphs: [
          "Aprender vocabulário em doses pequenas, sem precisar abrir um app para estudar. A palavra aparece na tela de bloqueio e um toque abre o significado e a pronúncia.",
        ],
        points: [],
        code: null,
        metrics: [],
      },
      {
        id: "backend",
        heading: "Backend gerado",
        paragraphs: [
          "A API em Go saiu do go-codebuild-tool. Por cima dela entraram o agendador de envios, o web push com chaves VAPID, o login com Google e a síntese de voz.",
        ],
        points: [
          "PostgreSQL com migrações geradas",
          "Agendador que respeita os horários de cada pessoa",
          "Web push no Android e no iPhone, a partir do iOS 16.4 com o app na tela de início",
        ],
        code: null,
        metrics: [],
      },
      {
        id: "voz",
        heading: "Voz",
        paragraphs: [
          "A pronúncia usa voz neural gerada no servidor e guardada em cache. Sem ela configurada, o app usa a voz do próprio aparelho.",
        ],
        points: [],
        code: null,
        metrics: [],
      },
      {
        id: "busca",
        heading: "Busca",
        paragraphs: [
          "Cada termo ganha uma página estática com dados estruturados, entra no sitemap e é avisado aos buscadores quando muda.",
        ],
        points: [],
        code: null,
        metrics: [],
      },
      {
        id: "defesa",
        heading: "Defesa em camadas",
        paragraphs: ["As rotas abertas são o alvo mais fácil, então o limite existe em quatro lugares."],
        points: [
          "API: por endereço nas rotas abertas e por conta nas fechadas",
          "nginx: limite por endereço e teto de conexões",
          "fail2ban: bloqueio depois de falhas de login e de excesso de respostas 429",
          "ufw: teto de conexões novas por segundo",
        ],
        code: null,
        metrics: [],
      },
    ],
    links: [{ label: "expertdict.com", href: PROJECT_URLS.expertiDictSite, external: true }],
    nextSlug: CASE_STUDY_SLUGS.codebuild,
    nextLabel: "próximo: go-codebuild-tool",
  },
];

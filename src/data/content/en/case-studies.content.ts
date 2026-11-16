import type { CaseStudy } from "@/core/entities/case-study.entity";
import { ProjectId } from "@/core/enums/project-id.enum";
import { CODEBUILD_SPEC_SAMPLE } from "@/data/content/shared/code-samples.constants";
import { CASE_STUDY_SLUGS, PROJECT_URLS } from "@/data/content/shared/profile.constants";

export const CASE_STUDIES_EN: readonly CaseStudy[] = [
  {
    slug: CASE_STUDY_SLUGS.codebuild,
    projectId: ProjectId.Codebuild,
    title: "go-codebuild-tool",
    summary:
      "A code generator for Go. Small spec files go in and a complete REST API comes out, or a set of gRPC microservices, with code you can read and maintain.",
    stack: ["Go", "net/http", "database/sql", "gRPC", "Protocol Buffers", "OpenTelemetry", "Kubernetes"],
    sections: [
      {
        id: "why",
        heading: "Why it exists",
        paragraphs: [
          "Every new API started the same way: handlers, validation, repositories, migrations, authentication and tests. I wrote codebuild to generate that base from Go structs, with no framework and no runtime dependency.",
          "Remove codebuild from the project and the project still builds.",
        ],
        points: [],
        code: null,
        metrics: [],
      },
      {
        id: "spec",
        heading: "The spec is Go",
        paragraphs: [
          "Each entity is a struct with gen tags. Parsing uses go/parser and go/types, so a mistake in a spec points to the line and suggests the right name.",
        ],
        points: [],
        code: { caption: "specs/users.go", source: CODEBUILD_SPEC_SAMPLE },
        metrics: [],
      },
      {
        id: "output",
        heading: "What comes out",
        paragraphs: [
          "Generated handlers call a Service that belongs to you and is never overwritten. The Service calls the generated repository.",
        ],
        points: [
          "net/http routes, per field validation and RFC 9457 errors",
          "database/sql repositories with SQL written for PostgreSQL, SQL Server, MySQL or SQLite",
          "Incremental migrations with up and down and an embedded migrator",
          "Session, JWT with rotating refresh or API key authentication, with PBKDF2 passwords",
          "OpenAPI 3.1 generated from the same definitions as the handlers",
          "Idempotency-Key, rate limits per address and per account, health probes",
        ],
        code: null,
        metrics: [],
      },
      {
        id: "microservices",
        heading: "Microservices",
        paragraphs: [
          "When entities live inside service structs, the output becomes a Go workspace with one gRPC service per struct and a REST gateway in front.",
        ],
        points: [
          ".proto contracts generated without protoc, with stable field numbers",
          "mTLS between services plus an internal token signed with Ed25519",
          "Keys and certificates that rotate without restarts",
          "Client side load balancing, retries and circuit breakers",
        ],
        code: null,
        metrics: [],
      },
      {
        id: "guarantees",
        heading: "Guarantees",
        paragraphs: [
          "The same spec, Go version and database always produce the same bytes. Only *_gen.go files are regenerated.",
        ],
        points: [
          "Reference projects compared byte by byte in the tests",
          "End-to-end tests against the four databases",
          "Weekly fuzzing and CodeQL analysis",
          "Releases with signed checksums, SBOM and build provenance",
        ],
        code: null,
        metrics: [],
      },
      {
        id: "numbers",
        heading: "Numbers",
        paragraphs: [
          "Load test from the documentation, run on a GitHub Actions runner with four CPUs shared by the load generator, the API and PostgreSQL 17, with 32 clients.",
        ],
        points: [],
        code: null,
        metrics: [
          { value: "11,462", label: "req/s on a GET by id, p50 of 2.5 ms" },
          { value: "5,937", label: "req/s creating records" },
          { value: "5,795", label: "req/s through the gateway, with gRPC and mTLS" },
          { value: "4", label: "databases with their own SQL" },
        ],
      },
    ],
    links: [
      { label: "repository on GitHub", href: PROJECT_URLS.codebuildRepo, external: true },
      { label: "releases", href: PROJECT_URLS.codebuildReleases, external: true },
    ],
    nextSlug: CASE_STUDY_SLUGS.expertiDict,
    nextLabel: "next: ExpertiDict",
  },
  {
    slug: CASE_STUDY_SLUGS.expertiDict,
    projectId: ProjectId.ExpertiDict,
    title: "ExpertiDict",
    summary:
      "A vocabulary PWA. A new word arrives by notification, with meaning and pronunciation, at the times each person chooses.",
    stack: ["Go", "PostgreSQL", "React", "Vite", "Tailwind", "Service Worker", "Web Push"],
    sections: [
      {
        id: "idea",
        heading: "The idea",
        paragraphs: [
          "Learning vocabulary in small doses, without opening an app to study. The word shows up on the lock screen and one tap opens its meaning and pronunciation.",
        ],
        points: [],
        code: null,
        metrics: [],
      },
      {
        id: "backend",
        heading: "Generated backend",
        paragraphs: [
          "The Go API came out of go-codebuild-tool. On top of it went the delivery scheduler, web push with VAPID keys, Google sign in and speech synthesis.",
        ],
        points: [
          "PostgreSQL with generated migrations",
          "A scheduler that follows the times each person picked",
          "Web push on Android and iPhone, from iOS 16.4 with the app on the home screen",
        ],
        code: null,
        metrics: [],
      },
      {
        id: "voice",
        heading: "Voice",
        paragraphs: [
          "Pronunciation uses a neural voice generated on the server and cached. Without it configured, the app falls back to the device voice.",
        ],
        points: [],
        code: null,
        metrics: [],
      },
      {
        id: "search",
        heading: "Search",
        paragraphs: [
          "Each term gets a static page with structured data, goes into the sitemap and is announced to search engines when it changes.",
        ],
        points: [],
        code: null,
        metrics: [],
      },
      {
        id: "defense",
        heading: "Defense in layers",
        paragraphs: ["Open routes are the easiest target, so the limits live in four places."],
        points: [
          "API: per address on open routes and per account on protected ones",
          "nginx: per address limits and a connection ceiling",
          "fail2ban: bans after failed logins and too many 429 responses",
          "ufw: a ceiling on new connections per second",
        ],
        code: null,
        metrics: [],
      },
    ],
    links: [{ label: "expertdict.com", href: PROJECT_URLS.expertiDictSite, external: true }],
    nextSlug: CASE_STUDY_SLUGS.codebuild,
    nextLabel: "next: go-codebuild-tool",
  },
];

import { describe, expect, it } from "vitest";
import { Locale } from "@/core/enums/locale.enum";
import {
  caseStudyPath,
  caseStudySlugFromPathname,
  equivalentPath,
  homePath,
  localeFromPathname,
  otherLocale,
} from "@/shared/i18n/locale-path.util";

describe("locale paths", () => {
  it("builds the home path of each locale", () => {
    expect(homePath(Locale.PtBr)).toBe("/");
    expect(homePath(Locale.En)).toBe("/en");
  });

  it("builds case study paths with the localized segment", () => {
    expect(caseStudyPath(Locale.PtBr, "codebuild")).toBe("/projetos/codebuild");
    expect(caseStudyPath(Locale.En, "codebuild")).toBe("/en/projects/codebuild");
  });

  it("reads the locale from a pathname", () => {
    expect(localeFromPathname("/")).toBe(Locale.PtBr);
    expect(localeFromPathname("/projetos/codebuild")).toBe(Locale.PtBr);
    expect(localeFromPathname("/en")).toBe(Locale.En);
    expect(localeFromPathname("/en/projects/expertidict")).toBe(Locale.En);
    expect(localeFromPathname("/english")).toBe(Locale.PtBr);
  });

  it("extracts the case study slug only from case study routes", () => {
    expect(caseStudySlugFromPathname("/projetos/codebuild")).toBe("codebuild");
    expect(caseStudySlugFromPathname("/en/projects/expertidict/")).toBe("expertidict");
    expect(caseStudySlugFromPathname("/projects/codebuild")).toBeNull();
    expect(caseStudySlugFromPathname("/projetos/")).toBeNull();
    expect(caseStudySlugFromPathname("/projetos/a/b")).toBeNull();
  });

  it("maps a route to its equivalent in the other locale", () => {
    expect(equivalentPath("/", Locale.En)).toBe("/en");
    expect(equivalentPath("/en", Locale.PtBr)).toBe("/");
    expect(equivalentPath("/projetos/codebuild", Locale.En)).toBe("/en/projects/codebuild");
    expect(equivalentPath("/en/projects/expertidict", Locale.PtBr)).toBe("/projetos/expertidict");
  });

  it("returns the other locale", () => {
    expect(otherLocale(Locale.PtBr)).toBe(Locale.En);
    expect(otherLocale(Locale.En)).toBe(Locale.PtBr);
  });
});

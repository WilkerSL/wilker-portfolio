import { createBrowserRouter } from "react-router";
import { Locale } from "@/core/enums/locale.enum";
import { CASE_STUDY_SEGMENT } from "@/shared/i18n/locale-routes.constants";
import { CaseStudyMain } from "@/features/case-study/case-study.main";
import { HomeMain } from "@/features/home/home.main";
import { NotFoundMain } from "@/features/not-found/not-found.main";
import { AppShell } from "@/app/app.component";
import { LocaleLayout } from "@/app/layouts/locale-layout.component";

export const appRouter = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      {
        path: "/",
        element: <LocaleLayout locale={Locale.PtBr} />,
        children: [
          { index: true, element: <HomeMain /> },
          { path: `${CASE_STUDY_SEGMENT[Locale.PtBr]}/:slug`, element: <CaseStudyMain /> },
          { path: "*", element: <NotFoundMain /> },
        ],
      },
      {
        path: "/en",
        element: <LocaleLayout locale={Locale.En} />,
        children: [
          { index: true, element: <HomeMain /> },
          { path: `${CASE_STUDY_SEGMENT[Locale.En]}/:slug`, element: <CaseStudyMain /> },
          { path: "*", element: <NotFoundMain /> },
        ],
      },
    ],
  },
]);

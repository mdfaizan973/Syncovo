Frontend Folder Structure Plan

Goal

Refactor the current frontend into a feature-first structure so page-level code, hooks, service calls, and feature-specific UI live together, while shared app-wide pieces stay in dedicated common folders.

Recommended Target Structure

src/
    App.tsx
    main.tsx
    routes/
      MainRoutes.tsx
      ProtectedRoute.tsx
    providers/
    styles/
      index.css
      App.css
  assets/
  components/
    ui/
      button.tsx
      card.tsx
      input.tsx
      icons.tsx
      layout.tsx
      small-elements.tsx
    shared/
      Navbar.tsx
      Footer.tsx
      Sidebar.tsx
      Logo.tsx
      Language.tsx
      NotFound.tsx
      DataNotFound.tsx
  Page/
    auth/
        Login.tsx
        SignUp.tsx
      components/
        LoginForm.tsx
        LoginLeftPanel.tsx
        SignUpForm.tsx
        SignUpLeftPanel.tsx
      hooks/
        useAuth.ts
      services/
        auth.ts
    dashboard/
        Dashboard.tsx
      components/
        DashboardInfo.tsx
        DashboardIcons.tsx
    notes/
      components/
        QuickNotesDashboard.tsx
        CreateQuickNote.tsx
        QuickNote.tsx
      hooks/
        useNotes.ts
      services/
        notes.ts
  lib/
    api/
      apiClient.ts
    i18n/
      index.ts
      locales/
        en.json
        fr.json
        ja.json
  utils/
    storage.ts
    commonUtils.ts
    toasUtils.ts

Why This Fits Your Current Frontend





Current domain boundaries already exist: frontend/src/Pages/auth/Login.tsx, frontend/src/Pages/MainContent/Dashboard.tsx, and frontend/src/Pages/MainContent/components/QuickNotes/QuickNotesDashboard.tsx.



Routing is already centralized in frontend/src/routes/MainRoutes.tsx, so moving route definitions under src/app/routes is low risk.



Shared shell/UI files are mixed under shared and components; consolidating them reduces ambiguity.



API and translation infrastructure are cross-cutting concerns and should live outside feature folders.

Concrete Move Map





Move app entry files:





frontend/src/App.tsx -> src/app/App.tsx



frontend/src/main.tsx -> src/app/main.tsx



frontend/src/index.css -> src/app/styles/index.css



frontend/src/App.css -> src/app/styles/App.css



Move routing:





frontend/src/routes/MainRoutes.tsx -> src/app/routes/MainRoutes.tsx



frontend/src/routes/ProtectedRoute.tsx -> src/app/routes/ProtectedRoute.tsx



Move auth into features/auth



Move dashboard shell/content into features/dashboard



Move quick note and note CRUD files into features/notes



Move frontend/src/utils/apiClient.ts into src/lib/api/apiClient.ts



Move i18n files from frontend/src/i18n/index.ts and frontend/src/locales/en.json into src/lib/i18n



Keep low-level reusable primitives under src/components/ui



Keep only truly generic helpers in src/utils

Import Cleanup Rules





Replace deep relative imports with shorter, grouped paths after moves.



Rename Pages to lowercase feature folders to match common React/Vite conventions.



Keep Sidebar.tsx in shared components unless you want the dashboard shell fully owned by the dashboard feature.



Avoid leaving feature hooks in global src/hooks when they are used by only one domain.

Execution Order





Create the new top-level folders: app, features, components, lib, utils.



Move app bootstrap and route files first so the project structure is clear.



Move auth, dashboard, and notes into feature folders.



Move shared layout/presentation files into components/shared.



Move API/i18n infrastructure into lib.



Update imports incrementally after each group move.



Run lint/build and fix broken import paths.

Safety Notes





Keep the current route URLs unchanged during the reorganization.



Do not merge unrelated shared UI into features unless it is only used by one feature.



Treat notes.ts + useNotes.ts as a feature pair and move them together.



If QuickNote.tsx is the route shell for notes, keep it close to notes components rather than under dashboard.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Contact form: EmailJS setup (optional)

The contact form can send email directly from the site using EmailJS, or fall back to opening the visitor's email client (mailto) if EmailJS is not configured.

To enable direct sending with EmailJS (no backend required):

1. Create a free account at https://www.emailjs.com/ and add an email service (Gmail, Outlook, etc.).
2. Create an email template that uses these placeholders: `from_name`, `from_email`, `message`.
3. Copy your **Service ID**, **Template ID**, and **Public Key (User ID)** from the EmailJS dashboard.
4. Create a file named `.env.local` at the project root and add these variables (Vite requires the `VITE_` prefix):

	VITE_EMAILJS_SERVICE_ID=service_xxx
	VITE_EMAILJS_TEMPLATE_ID=template_xxx
	VITE_EMAILJS_PUBLIC_KEY=your_public_key

5. Restart the dev server so Vite picks up the new env variables:

```powershell
npm run dev
```

The contact form now saves messages directly to Firebase Firestore (no email delivery required).

Security note: Storing messages in Firestore from the client is convenient, but you should secure your database before going to production. See the `firestore.rules` file for an example and update it to restrict writes or require verification. Do NOT commit your Firebase credentials — use GitHub Secrets for builds.

## Contact storage: Firebase (optional, recommended)

You can store all contact form submissions in Firebase Firestore so messages are retained even if email delivery fails. This is client-side Firestore usage and requires a Firebase project. Steps:

1. Create a Firebase project at https://console.firebase.google.com/ and enable Firestore (in Native mode).
2. From Project Settings, copy the Web app configuration values: `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`.
3. Create a file named `.env.local` at the project root and add these variables (Vite requires the `VITE_` prefix):

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Restart the dev server:

```powershell
npm run dev
```

5. The contact form will attempt to save submissions to a `messages` collection in Firestore. For production, add Firestore security rules that only allow authenticated admin writes or restrict access as needed. Storing messages client-side is convenient but not a substitute for server-side validation.

GitHub Pages / Build notes:
- GitHub Pages serves the built static assets. Environment variables used by Vite are baked into the build at build time. To keep secrets out of the public repo, configure your CI (for example, a GitHub Actions workflow) to inject the `VITE_` vars during build using repository Secrets, then deploy the generated `dist/` to GitHub Pages. Do NOT commit your `.env.local` to the repository.

If you want, I can add a simple GitHub Actions workflow that builds the site with env secrets and deploys to GitHub Pages.

## GitHub Pages deployment (automated)

I've added a sample GitHub Actions workflow at `.github/workflows/deploy.yml` that:

- Installs dependencies with `npm ci`.
- Builds the site (`npm run build`) with Vite environment variables supplied from repository Secrets.
- Uploads the `dist/` artifact and deploys it to GitHub Pages.

Required repository secrets (add these under Settings → Secrets → Actions):

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- (optional) `VITE_EMAILJS_SERVICE_ID`
- (optional) `VITE_EMAILJS_TEMPLATE_ID`
- (optional) `VITE_EMAILJS_PUBLIC_KEY`

Workflow notes:
- The workflow triggers on pushes to `main`. If your default branch is named differently, update the workflow's `on.push.branches`.
- Secrets are injected into the build step as environment variables so Vite can bake them into the static build. Do not commit `.env.local` with secret values.
- After the first successful run, enable GitHub Pages from the repository's Pages settings if necessary (the action will configure and deploy the site automatically in most cases).

If you'd like, I can also:
- Add a GitHub Actions example that uses a custom domain.
- Generate a small GitHub Actions file that runs security checks before deploy.


## CV download

The site includes a CV download modal that expects a PDF file in the `public/` folder. Place your CV at `public/Muhammad_Izhar_CV.pdf` (or update the path in `src/components/CVModal.jsx`) to enable direct download.

# Nova

Nova reads every study and shows you a clear, organ-by-organ picture of your health — reviewed with clinical-grade care.

## About Nova

Nova is a whole-body imaging companion app. It turns dense scan reports into something a patient can actually read and act on:

- **Home** — a summary of your latest scan, organ/region breakdown by section (e.g. Parkinson's, Alzheimer's, Temporal Lobe, Lewy Body), severity counts, and history across past studies.
- **Images** — browse a study's DICOM series and view individual scans.
- **Documents** — the underlying reports and files behind each study.
- Built with [Expo](https://expo.dev) (Expo Router, React Native + Web), TypeScript, Tailwind (via `uniwind`), and `heroui-native`.

## Demo

<!-- TODO: add a short screen recording or GIF of the app in action, e.g.:
https://github.com/user-attachments/assets/<id>
-->

## Get started

1. Install dependencies

   ```bash
   yarn install
   ```

2. Start the app

   ```bash
   yarn start
   ```

   Or target a platform directly:

   ```bash
   yarn ios      # iOS simulator
   yarn android  # Android emulator
   yarn web      # Web
   ```

In the output, you'll find options to open the app in a [development build](https://docs.expo.dev/develop/development-builds/introduction/), Android emulator, iOS simulator, or [Expo Go](https://expo.dev/go).

Other useful scripts:

- `yarn lint` — lint and auto-fix
- `yarn check:types` — TypeScript type check
- `yarn check:circular` — check for circular imports
- `yarn check:code` — run all of the above

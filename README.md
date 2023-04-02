# TRADESMITH

## Starting Development
- Start API: npm run dev

- Starting Website: npm run serve
### [v0.0.6] 02-04-2023
#### Added
- `dist` directory to `.gitignore`.
- Added Production handling for Middleware API.
- Added Production files.

#### Changed
- Title of Website
- `MainSettings`: Added a resolve even if the DB query fails.
### [v0.0.5] 02-04-2023
#### Added
- Added VS Code spell checker items.
- Added readme to root repo directory.
- Added `client` directory based on the `Try New` directory's content.
- Offline API to connect website to the database.
- Defined `Spinner` component.
- Show `Spinner` component when querying for config data from database.
- Short description on how to start the Development environment.

#### Changed
- Converted `vue-website` to TS (work in progress).
- Changed file, component, and variable names to .vue conventions (work in progress).
- Improved `BaseBanner` (work in progress).
- Improved display of question mark icon on `BaseInput` (added alignment and padding).
- Extended validation on currency and percentage inputs for `BaseInput`.
- Changed heading color from red to blue.
- Moved global components import to a separate file.

#### Removed
- Unnecessary items from `.gitignore`.
- `Bot` directory.
- `Try New` directory.
- `Webwerf` directory.

### [v0.0.4] 18-03-2023
#### Added
- Changelog.
- Subheadings to all views.
- `Main Settings` view: error alert without proper styling.
- `Bot Landing` view: icons.

#### Changed
- Changed some file names to Vue.js naming conventions.
- BaseButton: Changed the slot into a prop: label.

#### Improved
- Improved overall style on screens of all sizes.
# TRADESMITH
## To Do
1. Get an https URL.
With Namecheap we can get the URL name "https://tradesmith-trader.com" with a fee of $10 per year.
- https://www.namecheap.com/domains/registration/results/?domain=tradesmith-trader
- Johan het gesê dat ek dit verniet deur die terminal kan doen. Ek gaan daarin kyk.
  
2. Get environment variables on AWS
- Select an object in a S3 bucket and select "edit metadata".
- Die Luno besonderhede en Env Vars gaan ek encode vir 'n ekstra sekuriteit. Ek dink die key waarmee ek gaan encrypt gaan ek op 'n derde verniet sagteware stoor 'HashiCorp'.
- Die HishiCorp gaan ek maar deur AWS se KMS moet vat. Dit kos so R 90 'n jaar as ek net HashiCorp se API besonderhede daar stoor. Vir nou, gaan ek dit as nog 'n environment variable stoor.
  

3. Figure uit hoe om die api en die website te run.

## Starting Development
- Start API: npm run dev
- Starting Website: npm run serve
  
## Installing HashiCorp on your system:
To install HashiCorp on Ubuntu, you can follow these steps:

Add the HashiCorp GPG key:
```curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -```

Add the HashiCorp repository:
```sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"```

Update the package list:
```sudo apt-get update```

Install the HashiCorp product:
```sudo apt-get install vault```

## Changelog
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

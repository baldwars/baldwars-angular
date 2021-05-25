# BaldWars Angular Client

## Run Application:

### With Docker:

- Create a  `.env` file
- Set your environment variables following `.env.example`
- Execute the command: `docker-compose up`

> <i><u>Note:</u> To rebuild container after code modification, run: `docker-compose up --build`.</i>
### Locally:

> #### *<u>Prerequisites:</u>*
> - `git clone https://github.com/baldwars/baldwars-api.git`
> - Follow `README.md` **BaldWars API**'s file instructions to run the API locally.

---

At the project's root (`./baldwars-angular/`), run the following commands:

- `npm install` or `npm i`,
- Change `endpoint` property by `http://localhost:8080/api` in `src/environments/environment.ts`,
- `npm run start` or `ng serve`.

> *<u>Note:</u> You can change the port of the local server with `--port` option: `ng serve --port=4201`.*

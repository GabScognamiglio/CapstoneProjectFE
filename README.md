# GS-Budgets

Questo è il mio Capstone Project per il Bootcamp Epicode, classe FS0124A.
Questa repo è relativa al Front-End dell'applicazione, puoi trovare il relativo Back-End, scritto in Java con Spring Boot a questo link: [**CapstoneProjectBE**](https://github.com/GabScognamiglio/CapstoneProject) 
GS-Budgets è un'applicazione di gestione delle spese e delle entrate progettata per aiutarti a tenere traccia delle tue finanze personali in modo semplice ed efficace.


## Installazione e utilizzo

1. Clonare il repository
2. Installare le dipendenze eseguendo `npm install`
3. Avviare l'applicazione eseguendo il comando `ng serve -o`. Il tutto dopo aver avviato il relativo server backend
4. Nel browser, naviga su `http://localhost:4200/` per visualizzare l'app in esecuzione.
5. Per creare un pacchetto di distribuzione, esegui il seguente comando: `ng build`. Il pacchetto di distribuzione verrà generato nella cartella `dist/`

## Funzionalità Principali

- **Registrazione delle Spese e delle Entrate**: Aggiungi facilmente nuove spese e entrate con dettagli come categoria, data, importo, e descrizione.
- **Gestione delle Categorie**: Scegli tra tante categorie per le spese e le entrate in base alle tue necessità.
- **Visualizzazione delle Statistiche**: Visualizza statistiche mensili e annuali per comprendere meglio come stai gestendo il tuo denaro.
- **Obiettivi di Risparmio**: Imposta obiettivi di risparmio e monitora il tuo progresso nel raggiungerli.
- **Interfaccia Intuitiva**: Interfaccia utente semplice e intuitiva per una navigazione facile e veloce.

## Componenti principali

- **Login e Signup**: Componenti per la registrazione e l'accesso gestito tramite JWT.
- **Home**: È la dashboard dell'app in cui si può dare uno sguardo d'insieme al conto, con grafici dell'ultimo periodoe le ultime transazioni.
- **Saving Goals**: Componente in cui si possono creare, eliminare e aggiornare gli obiettivi di risparmio dell'utente.
- **Stats**: È il cuore pulsante dell'app in cui si possono visualizzare nel dettaglio spese e entrate, filtrarle per data e ammontare, vedere dove si spende di più (e dove si guadagna) e dove c'è il confronto tra esse, condito da grafici.
- **Account settings**: Componente per la gestione dell'account, in cui l'utente può visualizzare e modificare l'utenza e il conto relativo.
- **Supporto**: Componente in cui l'utente può aprire un ticket di supporto che un utente di ruolo ADMIN potrà visualizzare e al quale potrà rispondere.
- **User-list**: Componente riservato agli ADMIN in cui l'utente privilegiato potrà visualizzare la lista utenti dell'app, vedere i relativi dettagli e ticket e rispondere a essi, il tutto filtrabile tramite barra di ricerca.
- **Ticket-list**: Componente simile al precedente, in cui si visualizza la lista di tutti i ticket aperti dagli utenti. Si potrà inoltre rispondere al ticket e ambiare il suo stato.


## Tecnologie Utilizzate

  
   ![Logo](https://skillicons.dev/icons?i=html,ts,scss)

-  HTML5
- TypeScript
- SCSS

- **Framework**: È utilizzato **Angular** nella versione 16. 
- **Autenticazione**: L'autenticazione degli utenti avviene utilizzando **JWT**
- **Grafici**: Libreria **ngx-echarts**
- **Toast messages**: Libreria **ngx-toastrs**

### Autore

- [**Gabriele Scognamiglio**](https://github.com/GabScognamiglio) 
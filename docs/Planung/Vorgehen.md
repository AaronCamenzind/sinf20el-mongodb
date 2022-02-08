# Vorgehen LB1 LB2 M141 

- [x] Bewerbungsschreiben an Lehrperson für DB Wahl
- [ ] Vorgehen Planen (this dokument / projektplan)
- [ ] Netzwerkschema planen
- [ ] Datensatz generieren (frigg)


## Ziel des Projektes

> Installation &Konfiguration 

- installiert und lauffähig
- sinnvoll & fachgerecht / entspricht Empfehlungen Hersteller
- lokale Installation auf Server
- Abfragen auf DB werden geloggt
- DB über Netzwerk erreichbar
- Server und Client in sinnvollen Netzen mit DMZ und IntranetDatenstruktur
- vollständig
- fachlich korrekt und sinnvoll
- entspricht (insofern sinnvoll) logischem Modell der ExpertendokumentationDatenimport
- Datensätze in Anzahl und Inhalt korrekt› reproduzierbar, Files und Skripts funktionstüchtig vorhanden

> Zugriff &Kontrolle

- Nutzerfriggappmit Lese- und Schreibrecht auf Datenbankfriggund Pass-wortsml12345
- Nutzerfriggrepmit Leserecht auf Vieworiginalformund Passwortsml12345
- Vieworiginalformwelche die Struktur der Importdaten (nicht normalisiert)vonfriggimitiert (CSV)Anbindung
- Eigener Applikationsserver in DMZ› Webseite von aussen (Host) erreichbar
- DB in Intranet (Smartlearn Default) oder eigenem geschützen DB-Netz
- Startseite von gna
- Weitere einzelne Seiten von gna

## Netzwerkmanagement S-INF20eL Gruppe MongoDB

### Netzwerkschema
 
- **Intranet**
  - Desktop
  - DB Datenbank Server (MongoDB)

- **Router**

- **Internet**
  - User

- **DMZ Demilitarisierte Zone**
  - Applikaiton GNA

#### Applikation
Ubuntu 20.04 Webserver. Benötigt die Software «gna».

#### Desktop
Benötigt einen Browser und sie Software «frigg» zum generieren der Daten

#### Datenbank
Ubuntu 20.04 Client mit Ruby/MongoDB Bridge installiert


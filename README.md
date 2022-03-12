# M141 BBZW Sursee 2022

Das Modul möchte den Schwerpunkt auf drei Bereiche legen:

> Konfigurieren einer Datenbank: DB-Produkt Auswählen, Installieren, Konfigurieren, User einrichten.

> Datenmodell abbilden und Daten importieren: Detailimplementation(ERD, Tabellen) nach „groben“ Vorgaben (ERM, Rohdaten).

> Datenbank Betreiben, Auswerten und „erleben“: DB über Interface/View an zur Verfügung gestellte GUI-Applikation anschliessenund nutzen. Abfragen Testen, Messen und Vergleichen

**Meine Wahl:** MongoDB mit Ruby SDK

> Install command: ```wget https://github.com/timosarkar/sinf20el-mongodb/blob/main/install.sh | bash```

# Vorgehen LB1 LB2 M141 

- [x] Bewerbungsschreiben an Lehrperson für DB Wahl
- [x] Vorgehen Planen (this dokument / projektplan)
- [x] Netzwerkschema planen
- [x] Datensatz generieren (frigg)
- [x] Datenbank auf vm bmLP1 Smartlearn installieren


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


## Datenmodell

Folgende Datenfelder müssen importiert werden:

digest Eine eindeutige Hashsumme der Daten

path Pfad zur Datei

size Grösse der Daten in Byte

type Dateityp der DatenmodeBerechtigungsmaske der Datei

uid Benutzer-ID des Dateibesitzers

user Name des Dateibesitzers

gid Gruppen-ID der Dateigruppe

group Name der Dateigruppe

time Zeitstempel der letzten Änderung an der Datei als Unix-Timestamp

compression Rate der DatenkompressiondataInhalt der Datei, teilweise komprimiert und immer im base64-Format abgebildet

---

## Datenbank auf VM bmLP1 installieren

1. Sie wählen eine zu Ihrer Datenbank passende VM.  
3. Sie installieren die Datenbank auf Ihrer VM.
5. Sie generieren die zu importierenden Daten mitfrigg.
6. Sie erstellen die Datenstruktur auf der Datenbank.
7. Sie erstellen die Benutzer auf der Datenbank. 
8. Sie lassen Netzwerkverbindungen zu.
9. Sie importieren die Daten in Ihre Datenbank.
10. Sie binden die Applikation gna über das Netzwerk an Ihre Datenbank an

### Mein Vorgehen bei der DB Installation auf bmLP1

Ich habe zuerst die Firewall vmLF1 gestartet, damit die Ports und die zugehörigen Rules aktiviert werden.
Danach habe ich die Ubuntu Vm bmLP1 gestartet. Dort wird sich die Installation der DB und alle zugehörigen Configs abspielen. Nach dem Starten der VM habe ich schnell bemerkt dass die VM nicht nach aussen kommunizieren kann. Ich habe dann die ICMP Verbindung von der Firewall vmLF1 zum Ubuntu Host bmLP1 getestet. LF1 erreicht LP1. Jedoch nicht umgekehrt. Ich habe danach die Virtualisierungs-Configs der VM bmLP1 überprüft und habe den Netzwerkadapter auf VMNet8 (NAT) umgestellt. Ping nach google DNS und intern funktioniert nun auf bmLP1.

Nun muss ich zuerst den language-host für die NoSQL DB installieren. In meinem Fall ist das Ruby. Die installation von Ruby ist mit diesem COmmand gelöst

```bash
$ sudo apt-get install ruby
```

Testen ob ruby installiert ist mit: ```ruby -v```. Danach den MongoDB Driver von Ruby mit ```gem install mongo``` installieren. Dort habe ich gemerkt, dass es Probleme mit nativen Erweiterungen hat. Headerfiles welche von RubyGems verwendet werden konnten nicht gefunden werden. Dieses Problem habe ich mit zwei weiteren apt packages gelöst: ``` sudo apt-get install ruby-dev```. Danach funktioniert der Command ```gem install mongo``` wieder mit resultat:

```
root@bmLP1:/home/vmadmin# gem install mongo
Building native extensions. This could take a while...
Successfully installed bson-4.14.1
Successfully installed mongo-2.17.0
Parsing documentation for bson-4.14.1
Installing ri documentation for bson-4.14.1
Parsing documentation for mongo-2.17.0
Installing ri documentation for mongo-2.17.0
Done installing documentation for bson, mongo after 6 seconds
2 gems installed
```
Ich habe danach noch schnell mithilfe der interaktiven Ruby Umgebung IRB getestet ob ich die installierte MongoDB Datenbank in ein Ruby Programm importieren kann.


### Native installlation des MongoDB Clients/Shell auf WSL 2.0 Ubuntu

```bash
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
mongod --version
mkdir -p ~/data/db
sudo mongod --dbpath ~/data/db
ps -e | grep 'mongod'
sudo mkdir -p /var/lib/mongo
sudo mkdir -p /var/log/mongodb
sudo chown `whoami` /var/lib/mongo     # Or substitute another user
sudo chown `whoami` /var/log/mongodb   # Or substitute another user
```

#### Service skript für MongoDB Daemon auf WSL 2.0 Ubuntu

```bash
curl https://raw.githubusercontent.com/mongodb/mongo/master/debian/init.d | sudo tee /etc/init.d/mongodb >/dev/null
sudo chmod +x /etc/init.d/mongodb
sudo service mongodb status
```

### Datenbank starten und testen

```bash
mongod --dbpath /var/lib/mongo --logpath /var/log/mongodb/mongod.log --fork
mongosh
show dbs # aktuelle datenbanken anzeigen
```

### Datensatz mit Frigg generieren

Der Datensatz ~70MB wurde auf der Vm bmLP1 generiert.

```bash
sudo apt install, open-vm-tools-desktop gdebi
sudo gdebi frigg_0.4_all.deb 

# falls dpkg im cache noch vorhanden ist
# dpkg --remove --force-remove-reinstreq frigg

Vorname: timo
Nachname: sarkar
Klasse: INF20e

sudo frigg /opt/frigg > timo_sarkar.csv
```

## Datenstruktur erstellen

Beim erstellen der Datenstruktur hatten wir Probleme. Da wir unsere Entitäten und Attribute auswählen wollten, mussten wir das CSV File zuerst innerhalb von libreoffice  formatieren. Das öffnen der Datei in Libreoffice calc funktionierte aber nicht, da die Datei von Frigg vom user: root erstellt wurde und somit auch alle Zugriffsberechtigungen geändert worden sind. Wir haben den Dateibesitzer auf den user: vmadmin geändert.: 

```bash
sudo chown vmadmin ./<datensatz_name>.csv
```

![image](https://user-images.githubusercontent.com/71646577/158028607-8c929f23-79c6-4b28-9ff8-fd40b654999e.png)

![image](https://user-images.githubusercontent.com/71646577/158028635-44c6208e-c740-4dd9-b3bb-d4d541a088ca.png)

Grobe Datenstruktur in einem Mongo Script **database.js**:

```javascript
use database

db.createCollection("Type")
db.createCollection("Data")
db.createCollection("Meta")
db.createCollection("Tag")
db.createCollection("SystemUser")
db.createCollection("USerGroup")

show collections
```

> **https://sqlserverguides.com/create-tables-in-mongodb/**

> **https://docs.mongodb.com/manual/reference/command/**

> **https://www.quackit.com/mongodb/tutorial/mongodb_create_a_relationship.cfm#:~:text=To%20create%20a%20relationship%20in,is%20also%20true%20of%20relationships.**

> **https://medium.com/analytics-vidhya/import-csv-file-into-mongodb-9b9b86582f34**

## User und Berechtigungen erstellen

> **https://docs.mongodb.com/manual/tutorial/manage-users-and-roles/**

## Firewall auf In und Outbounding Traffic konfigurieren

# Licensing

Copyright 2022 (C) Timo Sarkar <timo_sarkar@sluz.ch> <sartimo10@gmail.com> 

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

## User und Berechtigungen erstellen

## Firewall auf In und Outbounding Traffic konfigurieren



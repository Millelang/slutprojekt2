# Loggbok

## V15 Måndag
Idag har jag planerat och initierat projektet. Jag har skapat en projektplan och en tidsplan. Jag har skapat en projektstruktur och en första version av projektets dokumentation.

## V15 Tisdag
Idag har jag skapat en databas och börjat med att skapa en inloggningsida och registreringssida. Ett problem som jag löste idag var att jag hade problem med att få databasen att fungera, jag hade glömt att skriva in databasens namn i min .env fil.

## V15 Torsdag
Idag så fixade jag några små problem som jag hade med databasen. Jag skapade en startsida och en hero. Ett problem som jag hade var att startsidan inte tog emot username från session, problemet var att en parantes var på fel ställe i index.js filen.9

## V16 Måndag
Idag så fixade jag en figma skiss eftersom att jag kände mig vilse, problemet som jag löste idag var att jag kände mig vilse. Jag skapade en skiss för att få en bättre överblick över projektet.

## V16 Tisdag
Idag så skapade jag startsidan och lade till produkter och en searchbar. Ett problem som jag hade var att jag hade problem med att få produkterna att visas på startsidan, problemet var att jag hade glömt att skicka datan som en array i index.js.

## V17 Måndag
Skapade basen för en kundvagn och problemet jag löste var att javascript inte gillade att ha flera knappar i en array så jag fixade det genom att ta bort arrayen

## V17 Torsdag och tisdag
Skapade backend för kundvagnen så att man kan skcika in ordrar till databasen, ett problem som jag satt fast på väldigt länge var att fetch vägrade ta emot/kunna skicka formdata vilket löstes genom att inte skicka varukorgen som fromdata och bara skicka carten som ett json objekt.

## 18 Måndag
Skapade så att man kan se vad som man har lagt i kundvagnen då man ska checka ut, problemet som jag löste idag var att jag hade svårt med att få datan att visas på sidan, problemet var att jag hade glömt att skicka datan som en array.

## Fixade hosting och kundvagn v18 tisdag

## V19 Måndag
Fixade search funktionen, en problem som jag stötte på var att jag hade problem med att få search funktionen att fungera, problemet var att jag hade glömt att skicka datan som en array och använda array metoder på den (foreach).

## V19 Tisdag
Fixat utchecknings sidans css och gjort den finare, har även påbörjat att göra order databasen mer organiserad, ett problem som dök upp var att utcheckningsknappen vägrade vara på rätt ställe och alltid hamnade på toppen, jag löste detta genom att skapa en separat div för själv utcheckning infon.

## V20 Tisdag
Fixade så att utcheckningsknappen omdiregerar till order konfirmation, problemet var att jag var tvungen att göra en separat listener för att göra det.

## V20 Torsdag
Idag så fixade jag lite generella buggar och skapade ett error medelande då man skriver in fel lösenord då man loggar, ett problem som jag stötte på idag var att om man slog fel lösenord och loggade in så försvann alla logga in knappar eftersom att username redan ändå blev skickat, löste detta genom att inte skicka username från login formet föräns det inloggningen gått igenom.


## V21 Måndag-Torsdag
Fixat så att price kommer in i ordern och försökt att fixa hosting igen då jag råka sabotera för mig själv, ett problem som jag stött på väldigt länge är att få ett sätt att få in price i cart, löste detta genom att använda data attributet för datan vilket gjorde det möjligt att välja price och lägga in i cart local storage. Även fixat validator
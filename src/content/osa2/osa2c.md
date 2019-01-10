---
title: osa 2
subTitle: Palvelimella olevan datan hakeminen
path: /osa2/palvelimella_olevan_datan_hakeminen
mainImage: ../../images/part-2.svg
part: 2
letter: c
partColor: dark-orange
---


<div class="content">

## Datan haku palvelimelta

Olemme nyt viipyneet tovin keskittyen pelkkään "frontendiin", eli selainpuolen toiminnallisuuteen. Rupeamme itse toteuttamaan "backendin", eli palvelinpuolen toiminnallisuutta vasta kurssin kolmannessa osassa, mutta otamme nyt jo askeleen sinne suuntaan tutustumalla siihen, miten selaimessa suoritettava koodi kommunikoi backendin kanssa.

Käytetään nyt palvelimena sovelluskehitykseen tarkoitettua [JSON Serveriä](https://github.com/typicode/json-server).

Tehdään projektin juurihakemistoon tiedosto _db.json_, jolla on seuraava sisältö:

```json
{
  "notes": [
    {
      "id": 1,
      "content": "HTML on helppoa",
      "date": "2019-01-10T17:30:31.098Z",
      "important": true
    },
    {
      "id": 2,
      "content": "Selain pystyy suorittamaan vain javascriptiä",
      "date": "2019-01-10T18:39:34.091Z",
      "important": false
    },
    {
      "id": 3,
      "content": "HTTP-protokollan tärkeimmät metodit ovat GET ja POST",
      "date": "2019-01-10T19:20:14.298Z",
      "important": true
    }
  ]
}
```

JSON server on mahdollista [asentaa](https://github.com/typicode/json-server#install) koneelle ns. globaalisti komennolla _npm install -g json-server_. Globaali asennus edellyttää kuitenkin pääkäyttäjän oikeuksia, eli se ei ole mahdollista laitoksen koneilla tai uusilla fuksiläppäreillä.

Globaali asennus ei kuitenkaan ole tarpeen, voimme käynnistää _json-serverin_ komennon _npx_ avulla:

```js
npx json-server --port=3001 --watch db.json
```

Oletusarvoisesti _json-server_ käynnistyy porttiin 3000, mutta create-react-app:illa luodut projektit varaavat portin 3000, joten joudumme nyt määrittelemään json-server:ille vaihtoehtoisen portin 3001.

Mennään selaimella osoitteeseen <http://localhost:3001/notes>. Kuten huomaamme, _json-server_ tarjoaa osoitteessa tiedostoon tallentamamme muistiinpanot JSON-muodossa:

![](../images/2/14b.png)

Jos selaimesi ei osaa näyttää JSON-muotoista dataa formatoituna, asenna jokin sopiva plugin, esim. [JSONView](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc)
helpottamaan elämääsi.

Ideana jatkossa onkin se, että muistiinpanot talletetaan palvelimelle, eli tässä vaiheessa _json-server_:ille. React-koodi lataa muistiinpanot palvelimelta ja renderöi ne ruudulle. Kun sovellukseen lisätään uusi muistiinpano, React-koodi lähettää sen myös palvelimelle, jotta uudet muistiinpanot jäävät pysyvästi "muistiin".

json-server tallettaa kaiken datan palvelimella sijaitsevaan tiedostoon _db.json_. Todellisuudessa data tullaan tallentamaan johonkin tietokantaan. json-server on kuitenkin käyttökelpoinen apuväline, joka mahdollistaa palvelinpuolen toiminnallisuuden käyttämisen kehitysvaiheessa ilman tarvetta itse ohjelmoida mitään.

Tutustumme palvelinpuolen toteuttamisen periaatteisiin tarkemmin kurssin [osassa 3](/osa3).

### Selain suoritusympäristönä

Ensimmäisenä tehtävänämme on siis hakea React-sovellukseen jo olemassaolevat mustiinpanot osoitteesta <http://localhost:3001/notes>.

Osan 0 [esimerkkiprojektissa](/osa0#selaimessa-suoritettava-sovelluslogiikka) nähtiin jo eräs tapa hakea Javascript-koodista palvelimella olevaa dataa. Esimerkin koodissa data haettiin [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)- eli XHR-olion avulla muodostetulla HTTP-pyynnöllä. Kyseessä on vuonna 1999 lanseerattu tekniikka, jota kaikki web-selaimet ovat jo pitkään tukeneet.

Nykyään XHR:ää ei kuitenkaan kannata käyttää ja selaimet tukevatkin jo laajasti [fetch](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch)-metodia, joka perustuu XHR:n käyttämän tapahtumapohjaisen mallin sijaan ns. [promiseihin](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

Muistutuksena edellisestä osasta (oikeastaan tätä tapaa pitää lähinnä <i>muistaa olla käyttämättä</i> ilman painavaa syytä), XHR:llä haettiin dataa seuraavasti

```js
const xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    const data = JSON.parse(this.responseText);
    // käsittele muuttujaan data sijoitettu kyselyn tulos
  }
};

xhttp.open('GET', '/data.json', true);
xhttp.send();
```

Heti alussa HTTP-pyyntöä vastaavalle <code>xhttp</code>-oliolle rekisteröidään <i>tapahtumankäsittelijä</i>, jota Javascript runtime kutsuu kun <code>xhttp</code>-olion tila muuttuu. Jos tilanmuutos tarkoittaa että pyynnön vastaus on saapunut, käsitellään data halutulla tavalla.

Huomionarvoista on se, että tapahtumankäsittelijän koodi on määritelty jo ennen kun itse pyyntö lähetetään palvelimelle. Tapahtumankäsittelijäfunktio tullaan kuitenkin suorittamaan vasta jossain myöhäisemmässä vaiheessa. Koodin suoritus ei siis etene synkronisesti "ylhäältä alas", vaan <i>asynkronisesti</i>, Javascript kutsuu sille rekisteröityä tapahtumankäsittelijäfunktiota jossain vaiheessa.

Esim. Java-ohjelmoinnista tuttu synkroninen tapa tehdä kyselyjä etenisi seuraavaan tapaan (huomaa että kyse ei ole oikeasti toimivasta Java-koodista):

```java
HTTPRequest request = new HTTPRequest()

String url = "https://fullstack-exampleapp.herokuapp.com/data.json";
List<Muistiinpano> muistiinpanot = request.get(url);

muistiinpanot.forEach(m => {
  System.out.println(m.content);
})
```

Javassa koodi etenee nyt rivi riviltä ja koodi pysähtyy odottamaan HTTP-pyynnön, eli komennon _request.get(...)_ valmistumista. Komennon palauttama data, eli muistiinpanot talletetaan muuttujaan ja dataa aletaan käsittelemään halutulla tavalla.

Javascript-enginet eli suoritusympäristöt kuitenkin noudattavat [asynkronista mallia](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop), eli periaatteena on se, että kaikki [IO-operaatiot](https://en.wikipedia.org/wiki/Input/output) (poislukien muutama poikkeus) suoritetaan ei-blokkaavana, eli operaatioiden tulosta ei jäädä odottamaan vaan koodin suoritusta jatketaan heti eteenpäin.

Siinä vaiheessa kun operaatio valmistuu tai tarkemmin sanoen jonain valmistumisen jälkeisenä ajanhetkenä, kutsuu Javascript-engine operaatiolle rekisteröityjä tapahtumankäsittelijöitä.

Nykyisellään Javascript-moottorit ovat <i>yksisäikeisiä</i> eli ne eivät voi suorittaa rinnakkaista koodia. Tämän takia on käytännössä pakko käyttää ei-blokkaavaa mallia IO-operaatioiden suorittamiseen, sillä muuten selain 'jäätyisi' siksi aikaa kun esim. palvelimelta haetaan dataa.

Javascript-moottoreiden yksisäikeisyydellä on myös sellainen seuraus, että jos koodin suoritus kestää erittäin pitkään, menee selain jumiin suorituksen ajaksi. Jos lisätään sovelluksen alkuun seuraava koodi:

```js
setTimeout(() => {
  console.log('loop..');
  let i = 0;
  while (i < 50000000000) {
    i++;
  }
  console.log('end');
}, 5000);
```

Kaikki toimii 5 sekunnin ajan normaalisti. Kun <code>setTimeout</code>:in parametrina määritelty funktio suoritetaan, menee selaimen sivu jumiin pitkän loopin suorituksen ajaksi. Ainakaan Chromessa selaimen tabia ei pysty edes sulkemaan luupin suorituksen aikana.

Eli jotta selain säilyy <i>responsiivisena</i>, eli että se reagoi koko ajan riittävän nopeasti käyttäjän haluamiin toimenpiteisiin, koodin logiikan tulee olla sellainen, että yksittäinen laskenta ei saa kestää liian kauaa.

Aiheesta löytyy paljon lisämateriaalia internetistä, eräs varsin havainnollinen esitys aiheesta Philip Robertsin esitelmä [What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ)

Nykyään selaimissa on mahdollisuus suorittaa myös rinnakkaista koodia ns. [web workerien](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) avulla. Yksittäisen selainikkunan koodin ns. event loopista huolehtii kuitenkin edelleen [vain yksi säie](https://medium.com/techtrument/multithreading-javascript-46156179cf9a).

## npm

Palaamme jälleen asiaan, eli datan hakemiseen palvelimelta.

Voisimme käyttää datan palvelimelta hakemiseen aiemmin mainittua promiseihin perustuvaa funktiota [fetch](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch). Fetch on hyvä työkalu, se on standardoitu ja kaikkien modernien selaimien (poislukien IE) tukema.

Käytetään selaimen ja palvelimen väliseen kommunikaatioon kuitenkin [axios](https://github.com/axios/axios)-kirjastoa, joka toimii samaan tapaan kuin fetch, mutta on hieman mukavampikäyttöinen. Hyvä syy axios:in käytölle on myös se, että pääsemme tutustumaan siihen miten ulkopuolisia kirjastoja eli <i>npm-paketteja</i> liitetään React-projektiin.

Nykyään lähes kaikki Javascript-projektit määritellään node "pakkausmanagerin" eli [npm](https://docs.npmjs.com/getting-started/what-is-npm):n avulla. Myös create-react-app:in avulla generoidut projektit ovat npm-muotoisia projekteja. Varma tuntomerkki siitä on projektin juuressa oleva tiedosto <code>package.json:</code>

```json
{
  "name": "notes",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^16.7.0-alpha.2",
    "react-dom": "^16.7.0-alpha.2",
    "react-scripts": "2.1.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not ie <= 11",
    "not op_mini all"
  ]
}
```

Tässä vaiheessa meitä kiinnostaa osa <code>dependencies</code>, joka määrittelee mitä <i>riippuvuuksia</i> eli ulkoisia kirjastoja projektilla on.

Haluamme nyt käyttöömme axioksen. Voisimme määritellä kirjaston suoraan tiedostoon <i>package.json</i>, mutta on parempi asentaa se komentoriviltä

```js
npm install axios --save
```

**Huomaa, että _npm_-komennot tulee antaa aina projektin juurihakemistossa**, eli siinä minkä sisältä tiedosto _package.json_ löytyy.

Nyt axios on mukana riippuvuuksien joukossa:

```json
{
  "dependencies": {
    "axios": "^0.18.0", // highlight-line
    "json-server": "^0.14.2",
    "react": "^16.7.0-alpha.2",
    "react-dom": "^16.7.0-alpha.2",
    "react-scripts": "2.1.3"
  },
  // ...
}

```

Sen lisäksi, että komento <code>npm install</code> lisäsi axiosin riippuvuuksien joukkoon, se myös <i>latasi</i> kirjaston koodin. Koodi löytyy muiden riippuvuuksien tapaan projektin juuren hakemistosta <code>node_modules</code>, mikä kuten huomata saattaa sisältääkin runsaasti kaikenlaista.

Tehdään toinenkin pieni lisäys. Asennetaan myös <code>json-server</code> projektin riippuvuudeksi komennolla

```js
npm install json-server --save
```

ja tehdään tiedoston <code>package.json</code> osaan <code>scripts</code> pieni lisäys

```json
{
  // ... 
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject",
    "server": "json-server -p3001 db.json"  // highlight-line
  }
}
```

Nyt voimme käynnistää  json-serverin projektin hakemistosta mukavasti ilman tarvetta parametrien määrittelylle komennolla

```js
npm run server
```

Tutustumme _npm_-työkaluun tarkemmin kurssin [kolmannessa osassa](/osa3).

Huomaa, että aiemmin käynnistetty json-server tulee olla sammutettuna, muuten seuraa ongelmia

![](../images/2/15b.png)

Virheilmoituksen punaisella oleva teksti kertoo mistä on kyse: 

<i>Cannot bind to the port 3001. Please specify another port number either through --port argument or through the json-server.json configuration file</i> 

eli sovellus ei onnistu käynnistyessään kytkemään itseään [porttiin](https://en.wikipedia.org/wiki/Port_(computer_networking)), syy tälle on se, että portti 3001 on jo aiemmin käynnistetyn json-serverin varaama.

### Axios ja promiset

Olemme nyt valmiina käyttämään axiosia. Jatkossa oletetaan että _json-server_ on käynnissä portissa 3001.

Kirjaston voi ottaa käyttöön samaan tapaan kuin esim. React otetaan käyttöön, eli sopivalla <code>import</code>-lauseella.

Lisätään seuraava tiedostoon <code>index.js</code>

```js
import axios from 'axios'

const promise = axios.get('http://localhost:3001/notes')
console.log(promise)

const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)
```

Konsoliin tulostuu seuraavaa

![](../images/2/16b.png)

Axiosin metodi _get_ palauttaa [promisen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).

Mozillan dokumentaatio sanoo promisesta seuraavaa:

> A Promise is an object representing the eventual completion or failure of an asynchronous operation.

Promise siis edustaa asynkronista operaatiota. Promise voi olla kolmessa eri tilassa:

- aluksi promise on <i>pending</i>, eli promisea vastaava asynkroninen operaatio ei ole vielä tapahtunut
- jos operaatio päättyy onnistuneesti, menee promise tilaan <i>fulfilled</i>, josta joskus käytetään nimitystä <i>resolved</i>
- kolmas mahdollinen tila on <i>rejected</i>, joka edustaa epäonnistunutta operaatiota

Esimerkkimme ensimmäinen promise on <i>fulfilled</i>, eli vastaa onnistunutta <code>axios.get('http://localhost:3001/notes')</code> pyyntöä. Promiseista toinen taas on <i>rejected</i>, syy selviää konsolista, eli yritettiin tehdä HTTP GET -pyyntöä osoitteeseen, jota ei ole olemassa.

Jos ja kun haluamme tietoon promisea vastaavan operaation tuloksen, tulee promiselle rekisteröidä tapahtumankuuntelija. Tämä tapahtuu metodilla <code>then</code>:

```js
const promise = axios.get('http://localhost:3001/notes')

promise.then(response => {
  console.log(response)
})
```

Konsoliin tulostuu seuraavaa

![](../images/2/17b.png)

Javascriptin suoritusympäristö kutsuu <code>then</code>_-metodin avulla rekisteröityä takaisinkutsufunktiota antaen sille parametriksi olion <code>result</code>, joka sisältää kaiken oleellisen HTTP GET -pyynnön vastaukseen liittyvän, eli palautetun <i>datan</i>, <i>statuskoodin</i> ja <i>headerit</i>.

Promise-olioa ei ole yleensä tarvetta tallettaa muuttujaan, ja onkin tapana ketjuttaa metodin <code>then</code> kutsu suoraan axiosin metodin kutsun perään:

```js
axios.get('http://localhost:3001/notes').then(response => {
  const notes = response.data
  console.log(notes)
})
```

Takaisinkutsufunktio ottaa nyt vastauksen sisällä olevan datan muuttujaan ja tulostaa muistiinpanot konsoliin.

Luettavampi tapa formatoida <i>ketjutettuja</i> metodikutsuja on sijoittaa jokainen kutsu omalle rivilleen:

```js
axios
  .get('http://localhost:3001/notes')
  .then(response => {
    const notes = response.data
    console.log(notes)
  })
```

näin jo nopea, ruudun vasempaan laitaan kohdistunut vilkaisu kertoo mistä on kyse.

Palvelimen palauttama data on pelkkää tekstiä, käytännössä yksi iso merkkijono. 
Axios-kirjasto osaa kuitenkin parsia datan Javascript-taulukoksi, sillä palvelin on kertonut headerin <code>content-type</code> avulla että datan muoto on <code>application/json; charset=utf-8</code> (ks. edellinen kuva).

Voimme vihdoin siirtyä käyttämään sovelluksessamme palvelimelta haettavaa dataa.

Tehdään se aluksi "huonosti", eli lisätään sovellusta vastaavan komponentin <code>App</code> renderöinti takaisinkutsufunktion sisälle muuttamalla <code>index.js</code> seuraavaan muotoon:

```js
import ReactDOM from 'react-dom'
import React from 'react'
import App from './App'

import axios from 'axios'

axios.get('http://localhost:3001/notes').then(response => {
  const notes = response.data
  ReactDOM.render(
    <App notes={notes} />,
    document.getElementById('root')
  )
})
```

Joissain tilanteissa tämäkin tapa voisi olla ok, mutta se on hieman ongelmallinen ja päätetäänkin siirtää datan hakeminen komponenttiin <code>App</code>.

Ei ole kuitenkaan ihan selvää, mihin kohtaan komponentin koodia komento <code>axios.get</code> olisi hyvä sijoittaa.

### Effect hookit

Olemme jo käyttäneet Reactin version [16.7.0-alpha.2](https://www.npmjs.com/package/react/v/16.7.0-alpha.2) mukanaan tuomia [state hookeja](https://reactjs.org/docs/hooks-state.html) tuomaan funktioina määriteltyihin React-komponentteihin tilan. Versio 16.7.0-alpha.2 tarjoaa myös
[effect hookit](https://reactjs.org/docs/hooks-effect.html), dokumentaation sanoin

> The Effect Hook lets you perform side effects in function components
> Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects. 

Eli effect hookit ovat juuri oikea tapa hakea dataa palvelimelta.

Poistetaan nyt datan hakeminen tiedostosta <code>index.js</code>. Komponentille <code>App</code> ei ole enää tarvetta välittää dataa propseina. Eli  <code>index.js</code> pelkistyy seuraavaan muotoon

```js
ReactDOM.render(<App />, document.getElementById('root'))
```
Komponentti <code>App</code> muuttuu seuraavasti:

```js
import React, { useState, useEffect } from 'react' // highlight-line
import axios from 'axios' // highlight-line
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([]) 
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

// highlight-start
  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/notes').then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
  }, [])

  console.log('render', notes.length, 'notes')
// highlight-end

  // ...
}
```


Koodiin on myös lisätty muutama aputulostus, jotka auttavat hahmottamaan miten suoritus etenee.

Konsoliin tulostuu

<pre>
render 0 notes
effect
promise fulfilled
render 3 notes
</pre>

Ensin siis suoritetaan komponentin määrittelevan funktion runko ja renderöidään komponentti ensimmäistä kertaa. Tässä vaiheessa tulostuu <i>render 0 notes</i> eli dataa ei ole vielä haettu palvelimelta.

Efekti, eli funktio 

```js
() => {
  console.log('effect')
  axios.get('http://localhost:3001/notes').then(response => {
    console.log('promise fulfilled')
    setNotes(response.data)
  })
}
```

suoritetaan heti renderöinnin jälkeen. Funktion suoritus saa aikaan sen, että konsoliin tulostuu <i>effect</i> ja että komento <code>axios.get</code> aloittaa datan hakemisen palvelimelta ja rekisteröi operaatiolle <i>tapahtumankäsittelijksi</i> funktion

```js
response => {
  console.log('promise fulfilled')
  setNotes(response.data)
})
```

Siinä vaiheessa kun data saapuu palvelimelta Javascriptin runtime kutsuu rekisteröityä tapahtumankäsittelijäfunktiota, joka tulostaa konsoliin <i>promise fulfilled</i> sekä tallettaa tilaan palvelimen palauttamat muistiinpanot funktiolla <code>setNotes(response.data)</code>.

Kuten aina tilan päivittävän funktion kutsu aiheuttaa funktion uudelleen renderöitymisen. Tämän seurauksena konsoliin tulostuu <i>render 3 notes</i>.

Tarkastellaan vielä efektihookin määrittelyä kokonaisuudessaan

```js
useEffect(() => {
  console.log('effect')
  axios.get('http://localhost:3001/notes').then(response => {
    console.log('promise fulfilled')
    setNotes(response.data)
  })
}, [])
```

Kirjotetaan koodi hieman toisella tavalla. 

```js
const hook = () => {
  console.log('effect')
  axios.get('http://localhost:3001/notes').then(response => {
    console.log('promise fulfilled')
    setNotes(response.data)
  })
}

useEffect(hook, [])
```

Nyt huomaamme selvemmin, että funktiolle [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect) annetaan kaksi parametria. Näistä ensimmäinen on funktio, eli itse <i>efekti</i>. Dokumentaation mukaan

> By default, effects run after every completed render, but you can choose to fire it only when certain values have changed.

Eli oletusarvoisesti efekti suoritetaan <i>aina</i> kun komponentti renderöidään. Meidän tapauksessamme emme kuitenkaan halua suorittaa efektin kuin ensimmäisen renderöinnin yhteydessä. 

Funktion <code>useEffect</code> toista parametria käytetään [tarkentamaan sitä miten usein efekti suoritetaan](https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect). Jos toisena parametrina on tyhjä taulukko <code>[]</code>, suoritetaanefekti ainoastaan komponentin ensimmäisen renderöinnin aikana.

Efektihookien avulla on mahdollisuus tehdä paljon muutakin kuin hakea dataa palvelimelta, tämä riittää kuitenkin meille tässä vaiheessa.

Mieti vielä tarkasti äsken läpikäytyä tapahtumasarjaa, eli mitä kaikkea koodista suoritetaan, missä järjetyksessä ja kuinka monta kertaa kun komponentin renderöinti alkaa, sen ymmärtäminen on erittäin tärkeää!

Huomaa, että olisimme voineet kirjoittaa koodin myös seuraavasti:

```js
useEffect(() => {
  console.log('effect')

  const eventHandler = response => {
    console.log('promise fulfilled')
    setNotes(response.data)
  }

  const promise = axios.get('http://localhost:3001/notes')
  promise.then(eventHandler)
}, [])
```

Muuttujaan <code>eventHandler</code> on sijoitettu viite funktioon. Axiosin metodin get palauttama promise on talletettu muuttujaan <code>promise</code>. Takaisinkutsun rekisteröinti tapahtuu antamalla promisen then-metodin parametrina muuttuja <code>eventHandler</code>, joka viittaa käsittelijäfunktioon.

Sovelluksessa on tällä hetkellä vielä se ongelma, että jos lisäämme uusia muisiinpanoja, ne eivät tallennu palvelimelle asti. Eli kun uudelleenlataamme sovelluksen, kaikki lisäykset katoavat. Korjaus asiaan tulee pian.

Sovelluksen tämän hetkinen koodi on kokonaisuudessaan [githubissa](https://github.com/FullStack-HY/part2-notes/tree/part2-4), branchissa _part2-4_.

### Sovelluskehityksen suoritusympäristö

Sovelluksemme kokonaisuuden konfiguraatiosta on pikkuhiljaa muodostunut melko kompleksinen. Käydään vielä läpi mitä tapahtuu missäkin. Seuraava diagrammi kuvaa asetelmaa

![](../images/2/18b.png)

React-sovelluksen muodostavaa Javascript-koodia siis suoritetaan selaimessa. Selain hakee Javascriptin, joka luonnollisesti sijaitsee koneen kiintolevyllä, <i>React dev serveriltä</i>, joka on se ohjelma, mikä käynnistyy kun suoritetaan komento <code>npm run</code>. Dev-serveri muokkaa tiedostossa olevan Javascriptin selainta varten sopivaan muotoon, se mm. yhdistellee eri tiedostoissa olevan Javascript-koodin yhdeksi tiedostoksi. Puhumme enemmän dev-serveristä kurssin osassa 7.

JSON-modossa olevan datan selaimessa pyörivä React-sovellus siis hakee koneella portissa 3001 käynnissä olevalta <i>json-serveriltä</i>, joka taas saa JSON-datan tiedostosta <i>db.json</i>.

Kaikki sovelluksen osat ovat näin sovelluskehitysvaiheessa ohjelmoijan koneella eli <i>localhostissa</i>. Tilanne muuttuu sitten kun sovellus viedään internettiin. Teemme näin osassa 3.

</div>

<div class="tasks">

<h3>Tehtäviä</h3>
<h4>2.11: puhelinluettelo osa 6</h4>

Jatketaan puhelinluettelon kehittämistä. Talleta sovelluksen alkutila projektin juureen sijoitettavaan tiedostoon _db.json_:

```json
{
  "persons": [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Martti Tienari",
      "number": "040-123456",
      "id": 2
    },
    {
      "name": "Arto Järvinen",
      "number": "040-123456",
      "id": 3
    },
    {
      "name": "Lea Kutvonen",
      "number": "040-123456",
      "id": 4
    }
  ]
}
```

Käynnistä json-server porttiin 3001 ja varmista selaimella osoitteesta <http://localhost:3001/persons>, että palvelin palauttaa henkilölistan.

Jos saat virheilmoituksen:

```js
events.js:182
      throw er; // Unhandled 'error' event
      ^

Error: listen EADDRINUSE 0.0.0.0:3001
    at Object._errnoException (util.js:1019:11)
    at _exceptionWithHostPort (util.js:1041:20)
```

on portti 3001 jo jonkin muun sovelluksen, esim. jo käynnissä olevan json-serverin käytössä. Sulje toinen sovellus tai jos se ei onnistu, vaihda porttia.

Muuta sovellusta siten, että datan alkutila haetaan _axios_-kirjaston avulla palvelimelta. Hoida datan hakeminen [Effect hookilla](https://reactjs.org/docs/hooks-effect.html)).

<h4>2.12* maiden tiedot</h4>

Rajapinta [https://restcountries.eu](https://restcountries.eu) tarjoaa paljon eri maihin liittyvää tietoa koneluettavassa muodossa REST-apina.

Tee sovellus, jonka avulla voit tarkastella eri maiden tietoja. Sovelluksen kannattaa hakea tiedot endpointista [all](https://restcountries.eu/#api-endpoints-all).

Sovelluksen käyttöliittymä on yksinkertainen. Näytettävä maa haetaan kirjoittamalla hakuehto etsintäkenttään.

Jos ehdon täyttäviä maita on liikaa (yli 10), kehoitetaan tarkentamaan hakuehtoa:

![](../images/2/19b1.png)

Jos maita on alle kymmenen, mutta yli 1 näytetään hakuehdon täyttävät maat:

![](../images/2/19b2.png)

Kun ehdon täyttäviä maita on enää yksi, näytetään maan perustiedot, lippu sekä siellä puhutut kielet:

![](../images/2/19b3.png)

**Huom:** riittää että sovelluksesi toimii suurimmalle osalle maista. Jotkut maat kuten _Sudan_ voivat tuottaa ongelmia, sillä maan nimi on toisen maan _South Sudan_ osa. Näistä corner caseista ei tarvitse välittää.

<h4>2.13*: puhelinluettelo osa 4</h4>

**Tässä osassa on vielä paljon tekemistä, joten älä juutu tähän tehtävään!**

Paranna edellisen tehtävän maasovellusta siten, että kun sivulla näkyy useiden maiden nimiä, tulee maan nimen viereen nappi, mitä klikkaamalla pääsee suoraan maan näkymään:

![](../images/2/19b3.png)

Tässäkin tehtävässä riittää, että ohjelmasi toimii suurella osalla maita ja maat joiden nimi sisältyy johonkin muuhun maahan, kuten _Sudan_ voit unohtaa. 

</div>
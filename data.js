// ============================================================
// SUPPTIME - DATA MODULE (lekentaal)
// ============================================================

const SUPPLEMENTS = {
    vitD3: {
        name: 'Vitamine D3',
        category: 'In vet oplosbaar',
        timing: 'Bij een maaltijd met wat vet erin (bv. ontbijt met ei, avocado of volle yoghurt).',
        timeSlot: 'breakfast',
        tagType: 'fat',
        tagLabel: 'Met vet',
        shortDesc: 'Belangrijk voor sterke botten, weerstand en spierkracht.',
        cofactors: ['Magnesium (helpt je lichaam vitamine D activeren)', 'Vitamine K2 (zorgt dat het calcium in je botten komt en niet in je bloedvaten)', 'Een beetje vet bij de maaltijd'],
        avoid: ['Houd 4 uur afstand van schildkliermedicatie', 'Houd 2 uur afstand van bisfosfonaten (botmedicatie)'],
        form: 'Kies D3 (cholecalciferol), niet D2.',
        mechanism: 'Vitamine D heeft vet nodig om in je bloed te komen. Daarna activeert je lever en je nieren het, en daar is magnesium voor nodig. Daarom werkt vitamine D vaak pas goed als je ook genoeg magnesium binnenkrijgt.',
        season: 'In Nederland staat de zon van oktober tot maart te laag om zelf vitamine D te maken — in die periode is een supplement vrijwel altijd nuttig.',
        refs: ''
    },
    vitK2: {
        name: 'Vitamine K2 (MK-7)',
        category: 'In vet oplosbaar',
        timing: '\'s Avonds bij het eten met wat vet erin.',
        timeSlot: 'evening',
        tagType: 'fat',
        tagLabel: 'Met vet',
        shortDesc: 'Stuurt calcium naar je botten en houdt het uit je bloedvaten.',
        cofactors: ['Vitamine D3 (werken samen)', 'Calcium (de "lading" die K2 op de juiste plek aflevert)'],
        avoid: ['Bij bloedverdunners (warfarine): blijf bij dezelfde dagelijkse hoeveelheid, geen schommelingen'],
        form: 'MK-7 is beter dan MK-4 — werkt veel langer in je lichaam.',
        mechanism: 'Zonder K2 kan calcium op de verkeerde plek belanden (bijvoorbeeld in je bloedvaten). K2 zorgt ervoor dat het in je botten terechtkomt waar het hoort.',
        refs: ''
    },
    vitC: {
        name: 'Vitamine C',
        category: 'In water oplosbaar',
        timing: 'Verdeeld over de dag in 2 of 3 keer (bv. ochtend en middag).',
        timeSlot: 'morning',
        tagType: 'food',
        tagLabel: 'Bij maaltijd',
        shortDesc: 'Goed voor weerstand, helpt ijzer beter opnemen, ondersteunt je huid en bindweefsel.',
        cofactors: ['IJzer (vitamine C verdubbelt de opname van plantaardig ijzer)', 'Bioflavonoïden (helpen vitamine C stabiel houden)'],
        avoid: ['Houd minstens 2 uur afstand van vitamine B12', 'Niet vlak voor of na het sporten in hoge dosis (kan trainingsresultaat afzwakken)'],
        form: 'Gewone ascorbinezuur, of een gebufferde variant als je een gevoelige maag hebt.',
        mechanism: 'Je lichaam kan maar een beperkte hoeveelheid tegelijk opnemen, daarom werkt het beter als je het over de dag verspreidt. Het is ook snel "op" in je bloed (binnen een paar uur), dus meerdere kleine porties zijn effectiever dan één grote.',
        refs: ''
    },
    vitB12: {
        name: 'Vitamine B12',
        category: 'In water oplosbaar',
        timing: '\'s Ochtends, op een lege maag of bij een licht ontbijt.',
        timeSlot: 'earlyMorning',
        tagType: 'empty',
        tagLabel: 'Lege maag',
        shortDesc: 'Belangrijk voor je energie, je zenuwen en de aanmaak van rode bloedcellen.',
        cofactors: ['Foliumzuur (werken samen in hetzelfde proces)', 'Een beetje calcium helpt de opname'],
        avoid: ['Houd 2 uur afstand van een hoge dosis vitamine C', 'Bij metformine (diabetesmedicatie) is je opname lager — extra alertheid nodig'],
        form: 'Methylcobalamine of hydroxocobalamine zijn beter dan cyanocobalamine.',
        mechanism: 'B12 wordt in je darm met hulp van een eiwit uit je maag opgenomen. Bij ouderen werkt dit proces vaak minder goed, daarom zijn hogere doses of zuigtabletten dan handiger.',
        refs: ''
    },
    bComplex: {
        name: 'B-complex',
        category: 'In water oplosbaar',
        timing: '\'s Ochtends bij het ontbijt.',
        timeSlot: 'breakfast',
        tagType: 'food',
        tagLabel: 'Bij ontbijt',
        shortDesc: 'Helpt je lichaam energie maken uit je eten en ondersteunt zenuwen en stressbestendigheid.',
        cofactors: ['Magnesium (werkt samen met vitamine B6)', 'De B-vitamines werken als team — daarom een complex en niet los'],
        avoid: ['Liever niet \'s avonds (kan je wakker houden)', 'Geen hoge dosis B6 langdurig — overleg met een professional'],
        form: 'Kies een complex met "actieve" of "gemethyleerde" vormen (bv. methylfolaat, methylcobalamine, P-5-P).',
        mechanism: 'B-vitamines zijn als de "vonken" die je voedsel omzetten in energie. \'s Ochtends innemen past bij het natuurlijke moment waarop je lichaam opstart.',
        refs: ''
    },
    iron: {
        name: 'IJzer',
        category: 'Mineraal',
        timing: '\'s Ochtends op een lege maag, bij voorkeur om de dag in plaats van dagelijks.',
        timeSlot: 'earlyMorning',
        tagType: 'empty',
        tagLabel: 'Lege maag + vit C',
        shortDesc: 'Nodig voor zuurstoftransport in je bloed en je energieniveau.',
        cofactors: ['Vitamine C (een glas sinaasappelsap of 100-200 mg verdubbelt de opname)'],
        avoid: ['Houd 2-4 uur afstand van calcium (zuivel, kalktabletten)', 'Geen koffie of thee binnen 1-2 uur (de looistoffen blokkeren de opname sterk)', 'Houd afstand van zink', 'Niet direct na het sporten'],
        form: 'Bisglycinaat geeft de minste maagklachten. Fumaraat en sulfaat zijn goedkoper maar zwaarder voor de maag.',
        mechanism: 'Verrassend genoeg neem je ijzer beter op als je het om de dag slikt in plaats van elke dag. Na een dosis maakt je lichaam namelijk een stof aan die de volgende opname blokkeert. Een dag overslaan reset dit.',
        refs: ''
    },
    calcium: {
        name: 'Calcium',
        category: 'Mineraal',
        timing: '\'s Avonds bij een maaltijd, maximaal 500 mg per keer.',
        timeSlot: 'evening',
        tagType: 'food',
        tagLabel: 'Bij maaltijd',
        shortDesc: 'Bouwsteen voor je botten en tanden, en nodig voor spier- en zenuwwerking.',
        cofactors: ['Vitamine D (zonder D neem je calcium nauwelijks op)', 'Vitamine K2 (stuurt het naar je botten)'],
        avoid: ['Houd 2-4 uur afstand van ijzer', 'Houd 4 uur afstand van schildkliermedicatie', 'Houd 2-6 uur afstand van bepaalde antibiotica'],
        form: 'Citraat als je maagzuurremmers gebruikt of weinig maagzuur hebt; carbonaat is goedkoper en werkt prima bij een maaltijd.',
        mechanism: 'Je lichaam kan maar een beperkte hoeveelheid calcium tegelijk verwerken — daarom verdeel je het in porties van maximaal 500 mg. \'s Avonds is handig omdat je botten dan extra calcium gebruiken.',
        refs: ''
    },
    magnesiumSleep: {
        name: 'Magnesium — voor slaap & ontspanning',
        category: 'Mineraal',
        timing: '\'s Avonds, 1 tot 2 uur voor het slapen.',
        timeSlot: 'night',
        tagType: 'food',
        tagLabel: 'Lichte snack',
        shortDesc: 'Helpt je hoofd en lichaam tot rust komen, makkelijker inslapen en dieper slapen.',
        cofactors: ['Vitamine B6 (helpt magnesium beter zijn werk doen)', 'Glycine (versterkt het ontspannende effect)'],
        avoid: ['Houd 2 uur afstand van calcium', 'Houd 4 uur afstand van schildkliermedicatie', 'Houd 2-6 uur afstand van bepaalde antibiotica'],
        form: 'Magnesium-bisglycinaat is hier de beste vorm: rustgevend, geen darmklachten. L-threonaat is een alternatief als je ook concentratie wil ondersteunen. Vermijd magnesiumoxide — daar neem je nauwelijks iets van op.',
        mechanism: 'Glycinaat en threonaat passeren makkelijk de hersen-barrière en kalmeren het zenuwstelsel, daarom werken juist deze vormen \'s avonds zo goed. Citraat of malaat zou je hier wakker kunnen maken én darmklachten geven.',
        refs: ''
    },
    magnesiumMuscle: {
        name: 'Magnesium — voor spieren, kramp & energie',
        category: 'Mineraal',
        timing: 'Verdeeld over de dag: bij ontbijt en na de training (of bij de avondmaaltijd als je niet sport).',
        timeSlot: 'midday',
        tagType: 'food',
        tagLabel: 'Bij maaltijd',
        shortDesc: 'Helpt tegen spierkramp, ondersteunt spierherstel na sport en vult je energie aan.',
        cofactors: ['Vitamine B6 (helpt magnesium zijn werk doen)', 'Vitamine D (werkt samen met magnesium)', 'Kalium (samen tegen kramp)'],
        avoid: ['Houd 2 uur afstand van calcium', 'Houd 4 uur afstand van schildkliermedicatie', 'Houd 2-6 uur afstand van bepaalde antibiotica', 'Niet vlak vóór de training (kan ontspannend werken)'],
        form: 'Magnesium-malaat is ideaal voor spieren en energie (malaat speelt mee in de energie-cyclus). Citraat is een goed algemeen alternatief. Bisglycinaat kan ook, maar is meer ontspannend. Vermijd magnesiumoxide.',
        mechanism: 'Spieren hebben magnesium nodig om goed te ontspannen na een samentrekking — een tekort uit zich vaak als kramp, schokjes of een zwaar gevoel. Voor dit doel werkt magnesium beter overdag, verdeeld over twee momenten, en niet als slaap-dosis.',
        refs: ''
    },
    zinc: {
        name: 'Zink',
        category: 'Mineraal',
        timing: '1 tot 2 uur voor of na een maaltijd, met een lichte eiwitrijke snack als je maag gevoelig is.',
        timeSlot: 'midday',
        tagType: 'food',
        tagLabel: 'Tussen maaltijden',
        shortDesc: 'Belangrijk voor je weerstand, huid, wondgenezing en hormonen.',
        cofactors: ['Koper (zink en koper moeten in balans blijven)', 'Eiwit uit je voeding (helpt de opname)'],
        avoid: ['Houd 2-4 uur afstand van ijzer en calcium', 'Houd 2-6 uur afstand van bepaalde antibiotica', 'Niet langdurig meer dan 50 mg per dag — dat kan een kopertekort veroorzaken'],
        form: 'Bisglycinaat of picolinaat — die nemen je darmen het beste op.',
        mechanism: 'Zink en ijzer "vechten" om dezelfde opnameroute in je darm, daarom kun je ze beter gescheiden nemen.',
        refs: ''
    },
    omega3: {
        name: 'Omega-3 (visolie)',
        category: 'Vetzuur',
        timing: 'Bij een maaltijd met vet erin.',
        timeSlot: 'breakfast',
        tagType: 'fat',
        tagLabel: 'Met vetrijke maaltijd',
        shortDesc: 'Goed voor je hart, hersenen en remt ontstekingen.',
        cofactors: ['Vet uit je maaltijd (zonder vet neem je het nauwelijks op)', 'Vitamine E (beschermt de visolie tegen veroudering)'],
        avoid: ['Bij bloedverdunners en hoge doses (>3 g/dag): overleg met je arts', 'Niet vlak voor of na krachttraining'],
        form: 'Triglyceride-vorm (TG) wordt veel beter opgenomen dan ethylester (EE). Krillolie is ook een goede optie.',
        mechanism: 'Omega-3 is een vet, dus het heeft ander vet nodig om opgenomen te worden. Een lepel olijfolie of een avocado bij je maaltijd maakt al verschil.',
        refs: ''
    },
    probiotics: {
        name: 'Probiotica',
        category: 'Darmflora',
        timing: '30 minuten voor het ontbijt, op een lege maag.',
        timeSlot: 'earlyMorning',
        tagType: 'empty',
        tagLabel: 'Voor het ontbijt',
        shortDesc: 'Ondersteunt je darmflora, je weerstand en de opname van voedingsstoffen.',
        cofactors: ['Prebiotische vezels (voeding voor de bacteriën, bv. inuline of FOS)'],
        avoid: ['Houd minstens 2 uur afstand van antibiotica'],
        form: 'Een vorm met een beschermend laagje (enterisch gecoat) overleeft de maag beter.',
        mechanism: 'Maagzuur doodt de meeste bacteriën. Door ze op een lege maag te nemen, gaan ze snel door je maag heen naar je darmen waar ze hun werk doen.',
        refs: ''
    },
    coq10: {
        name: 'Co-enzym Q10',
        category: 'Co-enzym',
        timing: 'Bij een maaltijd met vet erin.',
        timeSlot: 'breakfast',
        tagType: 'fat',
        tagLabel: 'Met vetrijke maaltijd',
        shortDesc: 'Levert energie aan je cellen, vooral belangrijk voor je hart en spieren.',
        cofactors: ['Vet uit de maaltijd', 'Vitamine E (werkt samen als beschermer)'],
        avoid: ['Bij gebruik van cholesterolverlagers (statines) is suppletie juist aanbevolen'],
        form: 'Ubiquinol wordt 2 tot 4 keer beter opgenomen dan ubiquinon — vooral handig boven de 40.',
        mechanism: 'Statines verlagen je eigen aanmaak van Q10, en Q10 heb je nodig voor energie in je spieren. Daarom helpt een supplement vaak tegen de spierpijn die statines kunnen geven.',
        refs: ''
    },
    creatine: {
        name: 'Creatine',
        category: 'Sport',
        timing: 'Na de training, samen met iets eiwitrijks of een maaltijd met koolhydraten.',
        timeSlot: 'workout',
        tagType: 'food',
        tagLabel: 'Na de training',
        shortDesc: 'Geeft je spieren extra "snelle energie" voor kracht, herstel en ook concentratie.',
        cofactors: ['Koolhydraten (helpen creatine in je spieren te krijgen)', 'Eiwit (versterkt het effect)'],
        avoid: ['Drink voldoende water — minstens 2-3 liter per dag'],
        form: 'Creatine-monohydraat — het meest onderzocht en goedkoopste, niets werkt beter.',
        mechanism: 'Insuline (na een maaltijd) helpt creatine in je spiercellen te krijgen. Daarom werkt het beter samen met eten dan op een lege maag.',
        refs: ''
    },
    wheyProtein: {
        name: 'Wei-eiwit (whey)',
        category: 'Sport',
        timing: 'Binnen 0-2 uur na de training.',
        timeSlot: 'workout',
        tagType: 'food',
        tagLabel: 'Na de training',
        shortDesc: 'Snelle eiwitten voor spierherstel en spieropbouw.',
        cofactors: ['Koolhydraten (helpen je glycogeenvoorraden aanvullen)'],
        avoid: [],
        form: 'Isolaat (WPI) of concentraat (WPC). Caseïne is een tragere variant, fijn voor \'s avonds.',
        mechanism: 'Wei-eiwit wordt snel opgenomen en zet direct het spierherstelproces in gang. Het belangrijkste is dat je dagtotaal aan eiwit klopt — verdeel het over 4 à 5 momenten.',
        refs: ''
    },
    vitA: {
        name: 'Vitamine A',
        category: 'In vet oplosbaar',
        timing: 'Bij een maaltijd met vet.',
        timeSlot: 'breakfast',
        tagType: 'fat',
        tagLabel: 'Met vet',
        shortDesc: 'Belangrijk voor je ogen, huid en weerstand.',
        cofactors: ['Zink (helpt vitamine A op zijn plek krijgen)', 'Eiwit'],
        avoid: ['NIET in hoge dosis tijdens zwangerschap'],
        form: 'Retinol of bètacaroteen (de plantaardige variant is veiliger maar minder krachtig).',
        mechanism: 'Vitamine A wordt opgeslagen in je lever, dus je hoeft het niet elke dag exact aan te vullen — maar te veel langdurig kan ook schadelijk zijn.',
        refs: ''
    },
    vitE: {
        name: 'Vitamine E',
        category: 'In vet oplosbaar',
        timing: 'Bij een maaltijd met vet.',
        timeSlot: 'breakfast',
        tagType: 'fat',
        tagLabel: 'Met vet',
        shortDesc: 'Beschermt je cellen tegen veroudering en schade.',
        cofactors: ['Vitamine C (helpt vitamine E "opladen" na gebruik)', 'Selenium'],
        avoid: ['Niet in hoge dosis vlak rond het sporten'],
        form: 'Natuurlijke vorm (d-alfa-tocoferol) is beter dan de synthetische (dl-alfa-tocoferol).',
        mechanism: 'Werkt samen met vitamine C als een soort recycling-team: als E zijn werk heeft gedaan, maakt C het weer actief.',
        refs: ''
    },
    multivitamin: {
        name: 'Multivitamine',
        category: 'Combinatie',
        timing: 'Bij het ontbijt, bij voorkeur met wat vet erin.',
        timeSlot: 'breakfast',
        tagType: 'food',
        tagLabel: 'Bij ontbijt',
        shortDesc: 'Basis-aanvulling die kleine tekorten afdekt — handig als je voeding niet altijd perfect is.',
        cofactors: ['Een beetje vet (voor de in-vet-oplosbare vitamines die erin zitten)', 'Water (voor de in-water-oplosbare vitamines)'],
        avoid: ['Kies er één met niet méér dan 100% van de dagbehoefte', 'Niet laat op de dag (B-vitamines kunnen wakker houden)'],
        form: 'Kies er een met actieve B-vormen (methylfolaat, methylcobalamine) en zonder overmaat aan ijzer als je dat niet nodig hebt.',
        mechanism: 'Een multi is een vangnet, geen wondermiddel. De losse supplementen in deze app zijn vaak krachtiger voor een specifiek doel.',
        refs: ''
    },
    iodine: {
        name: 'Jodium',
        category: 'Mineraal',
        timing: '\'s Ochtends bij het ontbijt.',
        timeSlot: 'breakfast',
        tagType: 'food',
        tagLabel: 'Bij ontbijt',
        shortDesc: 'Nodig voor je schildklier, je stofwisseling en bij zwangerschap voor de hersenontwikkeling van je baby.',
        cofactors: ['Selenium (werken samen voor de schildklier)', 'IJzer'],
        avoid: ['Niet bij Hashimoto of een overactieve schildklier zonder overleg met je arts', 'Niet combineren met kelp/zeewier in hoge dosis'],
        form: 'Kaliumjodide. 150 µg is de standaarddosering, 220 µg tijdens zwangerschap.',
        mechanism: 'Je schildklier gebruikt jodium om hormonen te maken die je energie en stofwisseling sturen. Te weinig én te veel zijn allebei een probleem.',
        refs: ''
    },
    selenium: {
        name: 'Selenium',
        category: 'Mineraal',
        timing: '\'s Ochtends bij het ontbijt.',
        timeSlot: 'breakfast',
        tagType: 'food',
        tagLabel: 'Bij ontbijt',
        shortDesc: 'Ondersteunt je schildklier en werkt als antioxidant die je cellen beschermt.',
        cofactors: ['Jodium (team voor de schildklier)', 'Vitamine E (werken samen als antioxidanten)'],
        avoid: ['Niet meer dan 200 µg per dag langdurig', 'Let op: 2 paranoten per dag leveren al je dagbehoefte'],
        form: 'Selenomethionine wordt het beste opgenomen.',
        mechanism: 'Selenium is nodig om schildklierhormoon actief te maken. Bij Hashimoto kan het de antistoffen verlagen.',
        refs: ''
    },
    melatonin: {
        name: 'Melatonine',
        category: 'Slaap',
        timing: '30 tot 60 minuten voor het slapen, in een donkere omgeving.',
        timeSlot: 'night',
        tagType: 'empty',
        tagLabel: 'Voor het slapen',
        shortDesc: 'Helpt je inslapen, vooral handig bij jetlag of verstoord slaapritme.',
        cofactors: ['Magnesium (versterkt het ontspannende effect)', 'Donker (licht breekt melatonine direct af)'],
        avoid: ['Niet overdag innemen', 'Niet combineren met alcohol of slaapmedicatie zonder overleg', 'Begin laag: 0,3 tot 1 mg is vaak genoeg'],
        form: 'Korte-werking tablet voor inslapen, verlengde afgifte voor doorslapen.',
        mechanism: 'Melatonine is geen slaappil maar een "nacht-signaal". Kleine doseringen werken vaak net zo goed als grote — en geven minder hangover \'s ochtends.',
        refs: ''
    },
    nac: {
        name: 'NAC (N-acetylcysteïne)',
        category: 'Antioxidant',
        timing: 'Op een lege maag, \'s ochtends of tussen maaltijden door.',
        timeSlot: 'earlyMorning',
        tagType: 'empty',
        tagLabel: 'Lege maag',
        shortDesc: 'Voedt je lichaam\'s eigen sterkste antioxidant (glutathion) en ondersteunt je lever en longen.',
        cofactors: ['Vitamine C (werken samen als antioxidanten)', 'Selenium'],
        avoid: ['Bij astma-medicatie: overleg met arts', 'Kan een zwavelige smaak hebben'],
        form: 'NAC capsules van 600 mg zijn standaard.',
        mechanism: 'Glutathion kun je niet direct slikken — je lichaam moet het zelf maken, en NAC is de belangrijkste bouwsteen daarvoor.',
        refs: ''
    },
    biotin: {
        name: 'Biotine (B7)',
        category: 'In water oplosbaar',
        timing: '\'s Ochtends bij het ontbijt.',
        timeSlot: 'breakfast',
        tagType: 'food',
        tagLabel: 'Bij ontbijt',
        shortDesc: 'Ondersteunt huid, haar en nagels en helpt bij de stofwisseling.',
        cofactors: ['De rest van de B-vitamines (team)', 'Zink'],
        avoid: ['STOP minstens 3 dagen voor een bloedonderzoek — hoge dosis biotine kan je lab-uitslagen (schildklier, hart) vervalsen'],
        form: 'D-biotine, 30 tot 300 µg is meestal genoeg; "haar en nagels"-producten zitten vaak veel hoger zonder extra nut.',
        mechanism: 'Biotine stuurt enzymen aan die vetten en suikers omzetten in energie. Echte tekorten zijn zeldzaam.',
        refs: ''
    },
    casein: {
        name: 'Caseïne (langzame eiwit)',
        category: 'Sport',
        timing: 'Vlak voor het slapen.',
        timeSlot: 'night',
        tagType: 'food',
        tagLabel: 'Voor het slapen',
        shortDesc: 'Langzame eiwit die je spieren de hele nacht van bouwstenen voorziet — tegenhanger van snelle whey.',
        cofactors: ['Magnesium (ontspanning voor de nacht)'],
        avoid: ['Niet bij koemelkallergie'],
        form: 'Micellair caseïne is het meest natuurlijk en langzaamst.',
        mechanism: 'Caseïne stolt in je maag en geeft zo uren lang kleine beetjes aminozuren af — ideaal om spierafbraak tijdens de nacht te voorkomen.',
        refs: ''
    },
    potassium: {
        name: 'Kalium',
        category: 'Mineraal',
        timing: 'Verdeeld over de dag bij maaltijden.',
        timeSlot: 'midday',
        tagType: 'food',
        tagLabel: 'Bij maaltijd',
        shortDesc: 'Belangrijk voor bloeddruk, hartritme en spierwerking.',
        cofactors: ['Magnesium (werken als duo voor hart en bloeddruk)'],
        avoid: ['NIET bij nierproblemen zonder overleg', 'NIET combineren met ACE-remmers, ARB\'s of kaliumsparende plaspillen zonder arts', 'Maximaal 99 mg per tablet zonder recept'],
        form: 'Kaliumcitraat. Meeste winst haal je uit voeding (groenten, fruit, bonen).',
        mechanism: 'De verhouding natrium/kalium is belangrijker dan alleen "minder zout". Meer kalium uit groente verlaagt bloeddruk net zo goed als minder zout.',
        refs: ''
    },
    chromium: {
        name: 'Chromium',
        category: 'Mineraal',
        timing: 'Bij een koolhydraatrijke maaltijd.',
        timeSlot: 'midday',
        tagType: 'food',
        tagLabel: 'Bij maaltijd',
        shortDesc: 'Kan helpen om je bloedsuiker stabieler te houden en snaaitrek verminderen.',
        cofactors: ['Vitamine C (helpt opname)', 'Niacine (B3)'],
        avoid: ['Bij diabetesmedicatie: overleg met arts — kan je bloedsuiker extra verlagen'],
        form: 'Chroompicolinaat of chroomnicotinaat, 200 tot 400 µg per dag.',
        mechanism: 'Chromium helpt insuline beter zijn werk doen, waardoor je cellen suiker makkelijker opnemen.',
        refs: ''
    },
    ala: {
        name: 'Alpha-liponzuur (ALA)',
        category: 'Antioxidant',
        timing: 'Op een lege maag, 30 min voor een maaltijd.',
        timeSlot: 'earlyMorning',
        tagType: 'empty',
        tagLabel: 'Lege maag',
        shortDesc: 'Krachtige antioxidant die in zowel vet als water werkt, wordt gebruikt bij zenuwklachten door diabetes.',
        cofactors: ['B-complex (werken samen in energie-productie)', 'Biotine (ALA verlaagt soms biotine)'],
        avoid: ['Bij diabetesmedicatie: overleg met arts (kan bloedsuiker verlagen)', 'Niet bij schildklierproblemen zonder overleg'],
        form: 'R-ALA is de natuurlijke, actievere vorm; gewone ALA (racemisch) werkt ook en is goedkoper.',
        mechanism: 'ALA is uniek omdat het als enige antioxidant zowel je vetweefsels als je waterige cellen kan beschermen, én andere antioxidanten (C, E, glutathion) recyclet.',
        refs: ''
    },
    electrolytes: {
        name: 'Elektrolyten (natrium/kalium/magnesium)',
        category: 'Sport',
        timing: 'Tijdens en na langdurige of zware training, vooral bij warmte.',
        timeSlot: 'workout',
        tagType: 'food',
        tagLabel: 'Rond training',
        shortDesc: 'Vult zout, kalium en magnesium aan die je uitzweet — voorkomt krampen en hoofdpijn na sport.',
        cofactors: ['Water (altijd samen)', 'Koolhydraten (versnellen opname bij duursport)'],
        avoid: ['Niet nodig bij korte of lichte training', 'Let op bij hoge bloeddruk met veel natrium'],
        form: 'Sportdrank of bruistabletten met natrium (300-700 mg/L), kalium en magnesium.',
        mechanism: 'Alleen water drinken bij lang zweten verdunt juist je bloed (hyponatriëmie) en maakt krampen erger. Zout erbij is essentieel.',
        refs: ''
    },
    glycine: {
        name: 'Glycine',
        category: 'Slaap',
        timing: '30 tot 60 minuten voor het slapen.',
        timeSlot: 'night',
        tagType: 'empty',
        tagLabel: 'Voor het slapen',
        shortDesc: 'Aminozuur dat helpt ontspannen, de lichaamstemperatuur verlaagt en zo de slaap verbetert.',
        cofactors: ['Magnesium (versterkt het effect, klassieke combi)'],
        avoid: ['Bij clozapine (psychose-medicatie): overleg met arts'],
        form: 'Poeder is het goedkoopst, 3 gram voor het slapen. Smaakt zoetig.',
        mechanism: 'Glycine verlaagt je kerntemperatuur licht, en een dalende temperatuur is een krachtig slaap-signaal voor je lichaam.',
        refs: ''
    },
    quercetin: {
        name: 'Quercetine (bioflavonoïde)',
        category: 'Antioxidant',
        timing: 'Bij een maaltijd met wat vet.',
        timeSlot: 'breakfast',
        tagType: 'fat',
        tagLabel: 'Met vet',
        shortDesc: 'Natuurlijke antihistamine en antioxidant, populair bij hooikoorts en voor weerstand.',
        cofactors: ['Vitamine C (versterken elkaar)', 'Bromelaïne (helpt opname)'],
        avoid: ['Bij bloedverdunners: overleg met arts', 'Hoge dosis kan nieren belasten'],
        form: 'Quercetine-fytosoom wordt veel beter opgenomen dan gewone quercetine.',
        mechanism: 'Quercetine stabiliseert de cellen die histamine afgeven, daarom werkt het kalmerend bij allergische reacties.',
        refs: ''
    },
    folate: {
        name: 'Foliumzuur',
        category: 'In water oplosbaar',
        timing: '\'s Ochtends bij het ontbijt.',
        timeSlot: 'breakfast',
        tagType: 'food',
        tagLabel: 'Bij ontbijt',
        shortDesc: 'Belangrijk voor celdeling, bloedaanmaak en zwangerschap.',
        cofactors: ['Vitamine B12 (werken altijd samen)', 'Vitamine B6'],
        avoid: ['Bij hoge dosis: laat ook altijd je B12 controleren'],
        form: 'Methylfolaat (5-MTHF) is de actieve vorm en werkt voor iedereen, ook bij genetische varianten.',
        mechanism: 'Foliumzuur en B12 werken zo nauw samen dat je ze altijd samen moet beoordelen — een tekort aan de één kan het andere maskeren.',
        refs: ''
    }
};

const MEDICATIONS = {
    levothyroxine: {
        name: 'Schildkliermedicatie (levothyroxine)',
        interactions: [
            { with: 'calcium', level: 'red', rule: 'Houd 4 uur afstand', desc: 'Calcium bindt zich aan de medicatie en blokkeert de opname bijna helemaal.' },
            { with: 'iron', level: 'red', rule: 'Houd 4 uur afstand', desc: 'IJzer maakt klontjes met de medicatie waardoor het niet werkt.' },
            { with: 'magnesium', level: 'red', rule: 'Houd 4 uur afstand', desc: 'Magnesium remt de opname van schildkliermedicatie.' },
            { with: 'zinc', level: 'red', rule: 'Houd 4 uur afstand', desc: 'Zink remt de opname van schildkliermedicatie.' },
            { with: 'coq10', level: 'green', rule: 'Geen interactie', desc: '' },
            { with: 'vitD3', level: 'yellow', rule: 'Apart innemen', desc: 'Geen directe botsing, maar handig om uit elkaar te houden.' }
        ],
        timing: 'Direct na het opstaan op een lege maag. Wacht minstens 30-60 minuten met je ontbijt en 4 uur met mineralen. Koffie pas na een uur.'
    },
    statins: {
        name: 'Cholesterolverlagers (statines)',
        interactions: [
            { with: 'coq10', level: 'green', rule: 'Aanvulling aanbevolen', desc: 'Statines verlagen je eigen Q10-aanmaak. Een aanvulling kan spierpijn van statines verminderen.' },
            { with: 'omega3', level: 'green', rule: 'Werken goed samen', desc: 'Omega-3 ondersteunt het verlagen van triglyceriden.' },
            { with: 'vitD3', level: 'green', rule: 'Geen interactie', desc: '' }
        ],
        timing: 'Sommige statines (simvastatine, pravastatine) werken het best \'s avonds. Andere (atorvastatine, rosuvastatine) maakt niet uit wanneer.'
    },
    ppi: {
        name: 'Maagzuurremmers (PPI)',
        interactions: [
            { with: 'vitB12', level: 'yellow', rule: 'Hogere dosis nodig', desc: 'Maagzuurremmers maken het lastiger om B12 uit voeding te halen — kies een sterkere dosis of een zuigtablet.' },
            { with: 'iron', level: 'yellow', rule: 'Kies een goede vorm', desc: 'Met minder maagzuur neem je ijzer slechter op. Kies bisglycinaat of citraat, met vitamine C erbij.' },
            { with: 'calcium', level: 'yellow', rule: 'Kies calciumcitraat', desc: 'Calciumcitraat heeft geen maagzuur nodig, calciumcarbonaat wel.' },
            { with: 'magnesium', level: 'yellow', rule: 'Let op je magnesium', desc: 'Lang gebruik van maagzuurremmers verlaagt je magnesium — een aanvulling is vaak verstandig.' }
        ],
        timing: 'Bij langdurig gebruik (>1 jaar): laat regelmatig B12, magnesium, ijzer en calcium controleren.'
    },
    metformin: {
        name: 'Metformine (diabetesmedicatie)',
        interactions: [
            { with: 'vitB12', level: 'yellow', rule: 'Laat B12 controleren', desc: 'Metformine vermindert de opname van B12. Een halfjaarlijkse controle is verstandig.' },
            { with: 'magnesium', level: 'yellow', rule: 'Apart innemen', desc: 'Metformine plast magnesium uit. Een magnesium-aanvulling kan ook de bijwerkingen van metformine verminderen.' }
        ],
        timing: 'Vraag je arts halfjaarlijks om je B12-waarde te checken.'
    },
    antibiotics_tet: {
        name: 'Antibiotica (tetracyclines / fluoroquinolonen)',
        interactions: [
            { with: 'calcium', level: 'red', rule: '2 uur ervoor of 4-6 uur erna', desc: 'Mineralen maken klontjes met deze antibiotica waardoor ze niet meer werken.' },
            { with: 'magnesium', level: 'red', rule: '2 uur ervoor of 4-6 uur erna', desc: 'Magnesium maakt het antibioticum onwerkzaam als je het samen inneemt.' },
            { with: 'iron', level: 'red', rule: '2 uur ervoor of 4-6 uur erna', desc: 'IJzer blokkeert het antibioticum.' },
            { with: 'zinc', level: 'red', rule: '2-6 uur afstand', desc: 'Zink blokkeert het antibioticum.' },
            { with: 'probiotics', level: 'yellow', rule: 'Minstens 2 uur tussen', desc: 'Antibiotica doden ook je goede darmbacteriën. Neem probiotica gescheiden in en ga er nog 2-4 weken na de kuur mee door.' }
        ],
        timing: 'Antibiotica nemen met water op een lege maag. Houd alle mineralen ver weg.'
    },
    warfarin: {
        name: 'Bloedverdunner (warfarine)',
        interactions: [
            { with: 'vitK2', level: 'red', rule: 'Geen schommelingen', desc: 'Je dosering bloedverdunner is afgestemd op je gewone vitamine K-inname. Plotseling meer of minder kan gevaarlijk zijn — overleg altijd met je arts.' },
            { with: 'omega3', level: 'yellow', rule: 'Bij hoge dosis: overleg arts', desc: 'Hoge doses omega-3 kunnen het bloedverdunnende effect versterken.' },
            { with: 'vitE', level: 'yellow', rule: 'Bij hoge dosis: overleg arts', desc: 'Vitamine E kan de bloedverdunning versterken.' }
        ],
        timing: 'Laat je INR (stollingswaarde) controleren als je supplementen of dieet verandert.'
    },
    bisphosphonates: {
        name: 'Botmedicatie (bisfosfonaten)',
        interactions: [
            { with: 'calcium', level: 'red', rule: 'Minstens 2 uur erna', desc: 'Calcium blokkeert de botmedicatie als je het te snel inneemt.' },
            { with: 'magnesium', level: 'red', rule: 'Minstens 2 uur erna', desc: 'Magnesium blokkeert de botmedicatie.' },
            { with: 'iron', level: 'red', rule: 'Minstens 2 uur erna', desc: 'IJzer blokkeert de botmedicatie.' }
        ],
        timing: 'Neem de botmedicatie op een lege maag, 30-60 minuten voor het ontbijt, rechtop met een groot glas water. Calcium en vitamine D pas \'s avonds.'
    },
    anticonvulsants: {
        name: 'Anti-epileptica (bv. valproaat, carbamazepine)',
        interactions: [
            { with: 'folate', level: 'yellow', rule: 'Hogere dosis nodig', desc: 'Deze medicatie verbruikt extra foliumzuur.' },
            { with: 'vitD3', level: 'yellow', rule: 'Hogere dosis nodig', desc: 'Deze medicatie versnelt de afbraak van vitamine D — een hogere dosis is vaak nodig.' },
            { with: 'vitB12', level: 'yellow', rule: 'Laat controleren', desc: 'De B12-opname kan verminderd zijn.' }
        ],
        timing: 'Laat jaarlijks je B12, foliumzuur en vitamine D laten controleren.'
    }
};

const CONDITIONS = [
    { id: 'vegan', name: 'Vegetarisch / Veganistisch' },
    { id: 'pregnant', name: 'Zwangerschap of zwangerschapswens' },
    { id: 'menstruating', name: 'Menstruerend' },
    { id: 'menopause', name: 'Menopauze of postmenopauze' },
    { id: 'nightwork', name: 'Nachtwerk of wisselende diensten' },
    { id: 'highstress', name: 'Hoge stress of burn-out' },
    { id: 'labtest', name: 'Bloedonderzoek binnenkort' }
];

// Supplement-supplement interactions
const SUPP_INTERACTIONS = [
    { a: 'vitD3', b: 'vitK2', level: 'green', title: 'Vitamine D3 + K2: gouden duo', desc: 'D3 helpt je calcium opnemen, K2 zorgt dat het in je botten belandt en niet in je bloedvaten. Samen een sterk team voor bot- en hartgezondheid.' },
    { a: 'vitD3', b: 'magnesium', level: 'green', title: 'Vitamine D3 + magnesium: noodzakelijk team', desc: 'Zonder voldoende magnesium kan je lichaam vitamine D niet goed activeren. Veel mensen met "vitamine D-tekort" hebben eigenlijk een magnesium-tekort.' },
    { a: 'vitD3', b: 'calcium', level: 'green', title: 'Vitamine D3 + calcium: opnameteam', desc: 'Vitamine D opent als het ware de deur in je darm waardoor calcium naar binnen kan.' },
    { a: 'vitC', b: 'iron', level: 'green', title: 'Vitamine C + ijzer: opname-boost', desc: 'Vitamine C verdubbelt of verdrievoudigt de opname van ijzer uit plantaardige bronnen of supplementen. Neem ze daarom samen.' },
    { a: 'vitC', b: 'vitB12', level: 'yellow', title: 'Vitamine C + B12: niet samen', desc: 'Hoge dosis vitamine C kan vitamine B12 onwerkzaam maken. Houd er minstens 2 uur tussen.' },
    { a: 'calcium', b: 'iron', level: 'red', title: 'Calcium + ijzer: scheiden', desc: 'Calcium remt de opname van ijzer met 50-70% als je ze samen neemt. Houd er 2-4 uur tussen.' },
    { a: 'calcium', b: 'magnesium', level: 'yellow', title: 'Calcium + magnesium: liefst apart', desc: 'Ze gebruiken dezelfde "transportbus" in je darm en zitten elkaar in de weg. Neem ze 2 uur uit elkaar.' },
    { a: 'calcium', b: 'zinc', level: 'yellow', title: 'Calcium + zink: liefst apart', desc: 'Een hoge dosis calcium remt de opname van zink. 2 uur tussen laten zit goed.' },
    { a: 'iron', b: 'zinc', level: 'yellow', title: 'IJzer + zink: liefst apart', desc: 'Beide gebruiken dezelfde route je lichaam in en concurreren. Houd er 2-4 uur tussen of wissel per dag af.' },
    { a: 'magnesium', b: 'zinc', level: 'yellow', title: 'Magnesium + zink: liefst apart', desc: 'Een hoge dosis magnesium kan zink in de weg zitten. Liever niet tegelijk innemen.' },
    { a: 'bComplex', b: 'magnesium', level: 'green', title: 'B-complex + magnesium: ontspannings-team', desc: 'Vitamine B6 en magnesium werken samen aan de aanmaak van slaap- en gelukshormonen.' },
    { a: 'omega3', b: 'vitE', level: 'green', title: 'Omega-3 + vitamine E: bescherming', desc: 'Vitamine E beschermt de visolie tegen veroudering in je lichaam.' },
    { a: 'omega3', b: 'vitD3', level: 'green', title: 'Omega-3 + D3: samen met vet', desc: 'Beide hebben vet nodig om opgenomen te worden. Samen bij een vetrijke maaltijd is perfect.' }
];

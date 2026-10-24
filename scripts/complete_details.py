from pathlib import Path

path = Path("src/data/destination-details.js")
text = path.read_text(encoding="utf-8")

cities = {
"red-fort": {
"eat":[
("chandni-chaat","Chandni Chowk chaat","Street chaat including aloo tikki, papdi and other spiced snacks is closely associated with Old Delhi.","Chaat"),
("paranthe","Paranthe","Stuffed parathas are a long-established speciality of the Old Delhi food scene.","Paratha"),
("jalebi","Jalebi","Crisp coils of batter are fried and soaked in sugar syrup, a familiar North Indian sweet.","Jalebi"),
("nihari","Nihari","Slow-cooked meat stew is a traditional Mughlai and Old Delhi dish.","Nihari"),
("chole-bhature","Chole bhature","Spiced chickpeas served with fried bread are a popular North Indian street-food combination.","Chole bhature")],
"culture":[
("mughal-heritage","Mughal court heritage","The Red Fort was the principal residence of Mughal emperors in Delhi for generations.","Red Fort"),
("qawwali","Qawwali","Sufi devotional music is an important performance tradition in Delhi and the wider north Indian region.","Qawwali"),
("independence-day","Independence Day ceremony","The Prime Minister traditionally hoists India's national flag at the Red Fort on 15 August.","Independence Day (India)"),
("diwan-i-am","Diwan-i-Aam","The Hall of Public Audience reflects the ceremonial architecture of the Mughal court at the Red Fort.","Red Fort"),
("lahori-gate","Lahori Gate","The monumental Lahori Gate is the main ceremonial entrance to the Red Fort complex.","Red Fort")],
"wear":[
("zari-kurta","Zari kurta","Kurta garments decorated with metallic zari embroidery are associated with festive North Indian dress.","Zari"),
("banarasi-dupatta","Banarasi dupatta","Silk dupattas with brocade or zari weaving are widely used with festive Indian outfits.","Banarasi sari"),
("sherwani","Sherwani","The long formal coat remains a traditional choice for weddings and ceremonial occasions.","Sherwani"),
("churidar","Churidar","Close-fitting trousers are traditionally worn with kurtas and longer North Indian garments.","Churidar"),
("khadi","Khadi","Hand-spun and hand-woven cloth has an important place in Indian dress and national history.","Khadi")]},
"qutub-minar":{
"eat":[
("nihari","Nihari","Slow-cooked meat stew is a traditional dish associated with Old Delhi.","Nihari"),
("seekh-kebab","Seekh kebab","Spiced minced meat is shaped around skewers and grilled, a classic Mughlai preparation.","Seekh kebab"),
("chole-bhature","Chole bhature","Spiced chickpeas with fried bhature are a familiar Delhi food combination.","Chole bhature"),
("paratha","Paratha","Layered or stuffed flatbread is a staple of North Indian cuisine and Old Delhi food culture.","Paratha"),
("jalebi","Jalebi","Fried batter coils soaked in syrup are a popular sweet throughout Delhi.","Jalebi")],
"culture":[
("delhi-sultanate","Delhi Sultanate heritage","Qutub Minar was begun during the Delhi Sultanate period and stands within the Qutb complex.","Delhi Sultanate"),
("qutub-festival","Qutub Festival","The Qutub Festival has featured Indian classical and folk music and dance at the monument complex.","Qutub Festival"),
("indian-classical-music","Indian classical music","Delhi has long supported traditions of Hindustani classical performance.","Indian classical music"),
("sufi-tradition","Sufi tradition","Sufi music and devotional traditions form an important part of Delhi's cultural history.","Sufism"),
("stone-carving","Stone carving","The Qutb complex preserves detailed stone carving and architectural ornament from the medieval period.","Qutb Minar")],
"wear":[
("kurta-pyjama","Kurta-pyjama","A long kurta paired with loose trousers is a common traditional North Indian outfit.","Kurta"),
("zari-work","Delhi zari work","Metallic-thread embroidery is used on festive garments and formal clothing.","Zari"),
("sherwani","Sherwani","A long formal coat traditionally worn for weddings and ceremonial occasions.","Sherwani"),
("churidar","Churidar","Close-fitting trousers are commonly paired with kurtas and formal Indian outfits.","Churidar") ]},
"golden-temple":{
"eat":[
("langar-dal","Langar dal and roti","The Golden Temple langar serves simple vegetarian food to visitors and pilgrims regardless of background.","Langar"),
("amritsari-kulcha","Amritsari kulcha","Stuffed leavened bread baked in a tandoor is a well-known speciality of Amritsar.","Kulcha"),
("lassi","Lassi","Thick yogurt-based lassi is a popular drink in Punjab and Amritsar.","Lassi"),
("chole","Chole","Spiced chickpeas are widely eaten in Punjab, often with breads such as bhature or kulcha.","Chole"),
("pinni","Pinni","Dense sweets made from flour, ghee and sugar are traditional Punjabi winter treats.","Pinni")],
"culture":[
("seva","Seva","Selfless service is a central practice in Sikh community life and at the Golden Temple.","Seva"),
("kirtan","Kirtan","Sikh devotional singing is performed continuously at the Harmandir Sahib.","Kirtan"),
("langar","Langar","The community kitchen provides free vegetarian meals and expresses equality and service.","Langar"),
("bhangra","Bhangra","Energetic Punjabi folk dance is widely associated with Punjab's cultural traditions.","Bhangra"),
("gurpurab","Gurpurab","Sikh festivals commemorate important events in the lives of the Sikh Gurus.","Gurpurab")],
"wear":[
("turban","Turban","The dastar is an important article of faith and identity for initiated Sikh men and some Sikh women.","Dastar"),
("patiala-salwar","Patiala salwar","The pleated Patiala salwar is a well-known Punjabi garment worn with a kameez or kurta.","Salwar"),
("phulkari","Phulkari","Bright floral embroidery is a traditional textile art of Punjab.","Phulkari"),
("kurta-pyjama","Kurta-pyjama","Kurta-pyjama is a common Punjabi men's outfit for everyday and festive wear.","Kurta") ]},
"kerala-backwaters":{
"eat":[
("karimeen-pollichathu","Karimeen pollichathu","Pearl spot fish is marinated with spices and cooked wrapped in banana leaf.","Karimeen"),
("appam-stew","Appam with stew","Lacy fermented rice pancakes are commonly served with vegetable or meat stew in Kerala.","Appam"),
("sadya","Sadya","A vegetarian feast served with rice and numerous accompaniments on a banana leaf.","Sadya"),
("puttu-kadala","Puttu with kadala","Steamed rice-and-coconut cylinders are commonly served with spiced black chickpea curry.","Puttu"),
("payasam","Payasam","Milk, rice or other grains and sugar are cooked into traditional Kerala sweet dishes.","Payasam")],
"culture":[
("kathakali","Kathakali","Highly stylised dance-drama combines elaborate makeup, costume, gesture and storytelling.","Kathakali"),
("snake-boat-races","Snake boat races","Long traditional boats compete in rhythmic races, especially during Kerala's festive season.","Vallam kali"),
("onam","Onam","Kerala's major harvest festival includes feasting, flower decorations and cultural celebrations.","Onam"),
("mohiniyattam","Mohiniyattam","Classical dance from Kerala is known for graceful movements and expressive storytelling.","Mohiniyattam"),
("theyyam","Theyyam","Ritual performance tradition of northern Kerala combines dance, music, costume and sacred storytelling.","Theyyam")],
"wear":[
("kasavu-mundu","Kasavu mundu","Cream-coloured Kerala cloth with a distinctive gold border is traditional festive attire.","Mundum neriyathum"),
("set-saree","Kerala set saree","The traditional Kerala set saree uses a light fabric with a contrasting border.","Mundum neriyathum"),
("mundu","Mundu","The wrapped lower garment is widely worn by men in Kerala.","Mundu"),
("kasavu-blouse","Kasavu blouse","Festive Kerala outfits commonly pair the traditional gold-bordered textile with a blouse.","Mundum neriyathum")]}
}

def block(slug, sections):
    out = [f'  "{slug}": {{']
    for si, sec in enumerate(("eat", "culture", "wear")):
        out.append(f"    {sec}: [")
        rows = sections[sec]
        for i, (id_, name, note, wiki) in enumerate(rows):
            comma = "," if i < len(rows) - 1 else ""
            out.append(f'      {{ id: "{id_}", name: "{name}", note: "{note}", wiki: "{wiki}" }}{comma}')
        out.append("    ]" + ("," if sec != "wear" else ""))
    out.append("  }")
    return "\n".join(out)

for slug, sections in cities.items():
    if f'"{slug}":' in text:
        continue
    text = text.rstrip()
    if text.endswith("};"):
        text = text[:-2].rstrip()
    if not text.endswith(","):
        text += ","
    text += "\n" + block(slug, sections) + "\n};\n"

path.write_text(text, encoding="utf-8")
print("Added first 4 missing cities.")
from pathlib import Path

p = Path("src/data/destination-details.js")
s = p.read_text(encoding="utf-8")

C = {
"mysore-palace": {
"eat":[("mysore-pak","Mysore pak","Ghee, gram flour and sugar are cooked into a rich Mysuru sweet.","Mysore pak"),("bisi-bele-bath","Bisi bele bath","Rice, lentils and vegetables are cooked with a distinctive spice blend.","Bisi bele bath"),("masala-dosa","Masala dosa","Crisp fermented rice-and-lentil crepe is filled with spiced potato.","Masala dosa"),("ragi-mudde","Ragi mudde","Cooked finger-millet flour is shaped into balls and commonly served with curry.","Ragi mudde"),("chitranna","Chitranna","Rice seasoned with lemon, spices and tempering is a common Karnataka dish.","Chitranna")],
"culture":[("mysore-dasara","Mysore Dasara","The city's major Dasara celebration includes processions, illumination and cultural performances.","Mysore Dasara"),("yakshagana","Yakshagana","A Karnataka dance-drama tradition combines elaborate costume, music and storytelling.","Yakshagana"),("carnatic-music","Carnatic music","South Indian classical music has a strong performance tradition in Karnataka.","Carnatic music"),("mysore-palace","Mysore Palace heritage","The palace is a major example of Indo-Saracenic architecture and Mysuru royal heritage.","Mysore Palace"),("kannada-literature","Kannada literature","Karnataka has a long literary tradition expressed through Kannada poetry and prose.","Kannada literature")],
"wear":[("mysore-silk","Mysore silk saree","Mysore is strongly associated with finely woven silk sarees.","Mysore silk"),("peta","Mysuru peta","The Mysuru peta is a traditional ceremonial turban associated with Karnataka.","Mysore peta"),("panche","Panche","The traditional wrapped lower garment is worn by men in Karnataka.","Dhoti"),("ilkal-saree","Ilkal saree","Ilkal sarees are a traditional Karnataka textile known for their distinctive borders.","Ilkal saree")]},
"hampi": {
"eat":[("jolada-rotti","Jolada rotti","Flatbread made from sorghum flour is a staple of northern Karnataka cuisine.","Jolada rotti"),("ennegai","Ennegai","Stuffed eggplant cooked with a spiced ground filling is a Karnataka speciality.","Ennegayi"),("holige","Holige","Sweet flatbread filled with lentils and jaggery is a traditional festive food.","Holige"),("bisi-bele-bath","Bisi bele bath","Rice, lentils and vegetables are cooked together with a spice blend.","Bisi bele bath"),("ragi-mudde","Ragi mudde","Finger-millet flour is cooked and shaped into a traditional Karnataka staple.","Ragi mudde")],
"culture":[("hampi-utsav","Hampi Utsav","The annual festival celebrates the cultural heritage of the historic Vijayanagara site.","Hampi Utsav"),("vijayanagara","Vijayanagara heritage","Hampi preserves monuments from the Vijayanagara Empire, including temples and royal structures.","Vijayanagara Empire"),("virupaksha-temple","Virupaksha Temple tradition","The temple remains an active place of worship within the historic Hampi landscape.","Virupaksha Temple"),("stone-carving","Stone carving","Hampi's monuments contain extensive carved stone architecture and sculpture.","Hampi"),("classical-dance","Classical dance","Dance and music performances are regularly associated with cultural events at Hampi.","Hampi")],
"wear":[("ilkal-saree","Ilkal saree","Traditional Karnataka saree with a distinctive contrasting border.","Ilkal saree"),("cotton-dhoti","Cotton dhoti","Light cotton wrapped garments are practical traditional wear in the region.","Dhoti"),("kasuti","Kasuti embroidery","Traditional Karnataka embroidery uses geometric and figurative stitched patterns.","Kasuti embroidery"),("angavastram","Angavastram","A traditional shoulder cloth is worn with men's ceremonial Indian clothing.","Angavastram")]},
"khajuraho": {
"eat":[("poha-jalebi","Poha-jalebi","Flattened rice preparation paired with jalebi is a familiar breakfast combination in central India.","Poha"),("bhutte-ka-kees","Bhutte ka kees","Grated corn is cooked with spices and milk in a Madhya Pradesh preparation.","Bhutte ka kees"),("dal-bafla","Dal bafla","Baked wheat balls are served with dal and ghee in a central Indian tradition.","Dal bafla"),("samosa","Samosa","Spiced filling is enclosed in pastry and deep-fried, a common Indian snack.","Samosa"),("malpua","Malpua","Sweet fried pancakes are served as a traditional dessert in northern and central India.","Malpua")],
"culture":[("khajuraho-dance","Khajuraho Dance Festival","Classical Indian dance performances are presented against the backdrop of Khajuraho temples.","Khajuraho Dance Festival"),("chandela-art","Chandela temple art","The temples preserve intricate sculpture and architecture associated with the Chandela period.","Khajuraho Group of Monuments"),("temple-sculpture","Temple sculpture","Khajuraho is renowned for detailed stone sculpture covering religious and everyday themes.","Khajuraho Group of Monuments"),("hindu-jain-heritage","Hindu and Jain heritage","The surviving temple groups represent both Hindu and Jain traditions.","Khajuraho Group of Monuments"),("stone-carving","Stone carving","Detailed carving is a defining feature of Khajuraho's medieval temple architecture.","Khajuraho Group of Monuments")],
"wear":[("bundelkhandi-lehenga","Bundelkhandi lehenga","Flared skirts and coordinated garments form part of traditional women's dress in the region.","Lehenga"),("dhoti","Dhoti","The wrapped lower garment remains a traditional form of men's Indian dress.","Dhoti"),("saree","Saree","The saree is widely worn across Madhya Pradesh in regional fabrics and styles.","Sari"),("chanderi","Chanderi fabric","Lightweight woven textiles from Madhya Pradesh are used for sarees and other garments.","Chanderi sari")]},
"ajanta-ellora": {
"eat":[("puran-poli","Puran poli","Sweet flatbread filled with cooked lentils and jaggery is a traditional Maharashtra dish.","Puran poli"),("misal-pav","Misal pav","Spiced sprouted lentil curry is served with bread rolls and accompaniments.","Misal pav"),("naan-khalia","Naan khalia","A meat preparation associated with the Aurangabad region is served with naan.","Naan"),("bharli-vangi","Bharli vangi","Small eggplants are stuffed with a spiced ground filling in a Maharashtra preparation.","Bharli vangi"),("shrikhand","Shrikhand","Strained yogurt is sweetened and flavoured with ingredients such as saffron and cardamom.","Shrikhand")],
"culture":[("ajanta-murals","Ajanta cave murals","Ajanta preserves important ancient Buddhist paintings and sculptures inside rock-cut caves.","Ajanta Caves"),("kailasa-temple","Kailasa temple","Ellora's Kailasa temple was carved from living rock as a monumental Hindu temple.","Kailasa Temple"),("buddhist-heritage","Buddhist cave heritage","Ajanta contains monasteries and worship spaces created for Buddhist communities.","Ajanta Caves"),("ellora-heritage","Ellora religious heritage","Ellora contains Buddhist, Hindu and Jain monuments within one cave complex.","Ellora Caves"),("dance-festival","Ellora-Ajanta Festival","The cultural festival has presented music and dance associated with the heritage region.","Ellora Festival")],
"wear":[("paithani","Paithani saree","Rich silk sarees with distinctive woven borders and motifs are associated with Maharashtra.","Paithani"),("nauvari","Nauvari saree","The nine-yard saree is a traditional Maharashtra drape allowing ease of movement.","Nauvari sari"),("pheta","Maharashtrian pheta","The pheta is a traditional turban worn for ceremonial occasions in Maharashtra.","Pheta"),("dhoti","Dhoti","The traditional wrapped lower garment is worn with regional variations across Maharashtra.","Dhoti")]},
"mumbai": {
"eat":[("vada-pav","Vada pav","Spiced potato fritter served in a bread roll is one of Mumbai's best-known street foods.","Vada pav"),("pav-bhaji","Pav bhaji","Mashed spiced vegetables are served with buttered bread rolls in this Mumbai street-food classic.","Pav bhaji"),("bombay-sandwich","Bombay sandwich","Layered vegetable sandwich with chutney is a familiar Mumbai snack.","Sandwich"),("bhel-puri","Bhel puri","Puffed rice, vegetables, chutneys and sev form this popular Mumbai chaat.","Bhelpuri"),("modak","Modak","Steamed or fried sweet dumplings filled with coconut and jaggery are associated with Maharashtra.","Modak")],
"culture":[("bollywood","Bollywood","Mumbai is a major centre of India's Hindi-language commercial film industry.","Hindi cinema"),("ganesh-chaturthi","Ganesh Chaturthi","Mumbai is renowned for large public celebrations of the Ganesh festival.","Ganesh Chaturthi"),("dabbawalas","Dabbawalas","Mumbai's lunchbox delivery network is a distinctive part of the city's working culture.","Dabbawala"),("koli-culture","Koli culture","Koli fishing communities are among Mumbai's historic coastal communities.","Kolis"),("lavani","Lavani","This energetic Maharashtra performance tradition combines song, rhythm and dance.","Lavani")],
"wear":[("koli-saree","Koli fisherfolk saree","Koli women's traditional dress includes a practical saree drape suited to coastal work.","Koli people"),("nauvari","Nauvari saree","The nine-yard saree is a traditional Maharashtra garment.","Nauvari sari"),("pheta","Maharashtrian pheta","Traditional turban worn at ceremonial occasions in Maharashtra.","Pheta"),("contemporary-fashion","Contemporary city fashion","Mumbai's urban culture includes diverse modern Indian and global clothing styles.","Mumbai")]},
"goa": {
"eat":[("fish-curry-rice","Fish curry rice","Rice served with coconut-based fish curry is a staple of Goan cuisine.","Goan cuisine"),("vindaloo","Vindaloo","A Goan preparation of meat or seafood marinated with vinegar and spices.","Vindaloo"),("bebinca","Bebinca","Layered Goan dessert made with coconut milk, eggs, sugar and flour.","Bebinca"),("xacuti","Xacuti","Goan curry prepared with roasted spices, coconut and meat or seafood.","Xacuti"),("sorpotel","Sorpotel","Spiced pork dish with Portuguese and Goan culinary influences.","Sorpotel")],
"culture":[("goa-carnival","Goa Carnival","Public parades and festivities reflect Goa's distinctive Portuguese-influenced carnival tradition.","Goa Carnival"),("mando","Konkani mando songs","Mando is a Goan musical form combining song and dance with historical Portuguese influence.","Mando"),("shigmo","Shigmo","Goa's spring festival features processions, music, dance and colourful performances.","Shigmo"),("christian-traditions","Goan Christian traditions","Goa has distinctive Catholic festivals, music and community traditions shaped by its history.","Goa"),("kunbi-heritage","Kunbi heritage","The Kunbi community has traditional agricultural, textile and folk traditions in Goa.","Kunbi")],
"wear":[("kunbi-saree","Kunbi saree","The checked traditional saree associated with Goa's Kunbi community has a practical drape.","Kunbi"),("linen","Beach-casual linen","Lightweight linen clothing is commonly suited to Goa's warm coastal climate.","Linen"),("pano-bhau","Pano bhaju","Traditional Goan women's clothing includes the pano bhaju style.","Goan Catholic costume"),("kashti","Kashti","Traditional garments in Goa include regional wrapped and draped forms.","Goa")]},
"konark": {
"eat":[("pakhala-bhata","Pakhala bhata","Fermented or soaked rice served with accompaniments is a staple of Odisha cuisine.","Pakhala"),("dalma","Dalma","Lentils cooked with vegetables and mild spices are a classic Odia preparation.","Dalma"),("chhena-poda","Chhena poda","Fresh cheese is baked with sugar until caramelised in this Odisha dessert.","Chhena poda"),("dahi-pakhala","Dahi pakhala","Rice soaked in water and served with yogurt is a cooling Odisha preparation.","Pakhala"),("rasabali","Rasabali","Flattened fried cheese patties are simmered in sweetened milk.","Rasabali")],
"culture":[("odissi","Odissi dance","One of India's classical dance forms developed in Odisha and uses expressive movement and sculpture-inspired poses.","Odissi"),("konark-dance","Konark Dance Festival","Classical dance performances are presented annually near the Sun Temple.","Konark Dance Festival"),("rath-yatra","Rath Yatra","The chariot festival tradition is especially prominent in Odisha and Puri.","Ratha Yatra"),("pattachitra","Pattachitra","Traditional Odisha painting uses detailed narrative imagery and naturalistic decorative patterns.","Pattachitra"),("sand-art","Odisha sand art","Sand sculpture is a contemporary artistic tradition strongly associated with Odisha's coast.","Sand art")],
"wear":[("sambalpuri-ikat","Sambalpuri ikat saree","Ikat weaving from Odisha is known for geometric motifs and distinctive dyed yarn patterns.","Sambalpuri sari"),("bomkai","Bomkai saree","Odisha handloom sarees with traditional motifs are woven in the Bomkai style.","Bomkai sari"),("dhoti","Dhoti","The traditional wrapped lower garment is worn by men across Odisha.","Dhoti"),("sambalpuri-textile","Sambalpuri textile","Odisha's handloom tradition includes patterned cotton and silk textiles.","Sambalpuri sari")]},
"meenakshi-madurai": {
"eat":[("jigarthanda","Jigarthanda","A chilled milk-based drink made with ingredients such as almond gum and nannari syrup is associated with Madurai.","Jigarthanda"),("kari-dosa","Kari dosa","Thick dosa topped with spiced meat is a well-known Madurai-style preparation.","Dosa"),("idli-sambar","Idli with sambar","Steamed fermented rice cakes are served with lentil-based sambar across Tamil Nadu.","Idli"),("parotta","Parotta","Layered flatbread is widely eaten in Tamil Nadu, often with curry.","Parotta"),("murukku","Murukku","Crisp spiral savoury snack made from rice and lentil flours.","Murukku")],
"culture":[("chithirai","Chithirai festival","Madurai's major annual festival combines temple processions and traditions connected with Meenakshi and Sundareswarar.","Chithirai Festival"),("bharatanatyam","Bharatanatyam","Tamil Nadu's classical dance tradition uses expressive gesture, rhythm and storytelling.","Bharatanatyam"),("meenakshi-temple","Meenakshi Temple heritage","The temple is a major centre of Tamil religious architecture, sculpture and ritual life.","Meenakshi Temple"),("kolam","Kolam","Decorative floor patterns made from rice flour are a common Tamil household tradition.","Kolam"),("nadaswaram","Nadaswaram music","The powerful double-reed instrument is traditionally used in Tamil temple and ceremonial music.","Nadaswaram")],
"wear":[("kanjeevaram","Kanjeevaram silk saree","Rich silk sarees woven in Kanchipuram are famous for contrasting borders and traditional motifs.","Kanchipuram silk sari"),("veshti","Veshti","The traditional Tamil men's lower garment is worn for everyday and ceremonial occasions.","Veshti"),("angavastram","Angavastram","A shoulder cloth commonly accompanies traditional men's ceremonial dress in Tamil Nadu.","Angavastram"),("madisar","Madisar saree","A distinctive traditional Tamil Brahmin saree drape used for ceremonial occasions.","Madisar")]},
"jaisalmer": {
"eat":[("ker-sangri","Ker sangri","Desert berries and beans are cooked with spices in a traditional Rajasthani dish.","Ker sangri"),("gatte-ki-sabzi","Gatte ki sabzi","Gram-flour dumplings are simmered in a spiced yogurt-based curry.","Gatte ki sabzi"),("bajra-roti","Bajra roti","Flatbread made from pearl millet is a staple of Rajasthan's arid regions.","Bajra roti"),("dal-baati","Dal baati","Baked wheat balls are served with dal and ghee in a classic Rajasthani meal.","Dal baati churma"),("moong-dal-halwa","Moong dal halwa","Ground mung lentils are cooked with ghee and sugar into a rich dessert.","Moong dal halwa")],
"culture":[("camel-safari","Camel safaris","Camel travel is a traditional and tourism-associated way of experiencing Rajasthan's desert landscape.","Camel safari"),("kalbelia","Kalbelia dance","The Kalbelia community's dance tradition features flowing movements and rhythmic folk music.","Kalbelia"),("desert-festival","Jaisalmer Desert Festival","The festival showcases Rajasthani music, dance, dress and desert traditions.","Jaisalmer Desert Festival"),("puppet-tradition","Kathputli puppetry","Rajasthan's traditional string puppetry presents folk stories through colourful figures.","Kathputli"),("manganiyar-music","Manganiyar music","Hereditary musicians of western Rajasthan perform a rich tradition of folk and devotional music.","Manganiar")],
"wear":[("mirror-work-ghagra","Mirror-work ghagra choli","Colourful skirts and blouses may feature embroidery and small mirrors characteristic of western Rajasthan textiles.","Ghagra choli"),("safa","Safa turban","Brightly coloured turbans are worn in Rajasthan with styles varying by region and occasion.","Pagri"),("bandhani","Bandhani","Tie-dyed textiles with dotted patterns are widely used for Rajasthan garments and accessories.","Bandhani"),("mojari","Mojari","Traditional embroidered leather footwear is widely associated with Rajasthan.","Mojari")]},
"udaipur": {
"eat":[("dal-baati-churma","Dal baati churma","Baked wheat balls, lentils and sweet churma form a classic Rajasthani meal.","Dal baati churma"),("laal-maas","Laal maas","Spicy red mutton curry is a well-known Rajasthani preparation.","Laal maas"),("malpua","Malpua","Sweet fried pancakes are served as a traditional dessert in Rajasthan.","Malpua"),("gatte","Gatte ki sabzi","Gram-flour dumplings cooked in a spiced gravy are a Rajasthan staple.","Gatte ki sabzi"),("ker-sangri","Ker sangri","Desert beans and berries are cooked with spices in a traditional Rajasthani dish.","Ker sangri")],
"culture":[("gangaur","Gangaur","The spring festival honours Gauri and features processions, songs and traditional observances.","Gangaur"),("mewar-festival","Mewar Festival","Udaipur's festival celebrates spring with cultural performances and processions.","Mewar Festival"),("miniature-painting","Mewar miniature painting","The Mewar school is known for detailed paintings depicting courtly, religious and literary subjects.","Mewar painting"),("ghoomar","Ghoomar","Traditional Rajasthani dance features graceful circular movements and colourful dress.","Ghoomar"),("mewar-heritage","Mewar heritage","Udaipur preserves the architectural and cultural traditions of the historic Mewar kingdom.","Mewar")],
"wear":[("mewari-poshak","Mewari poshak","Traditional women's dress in Mewar includes a skirt, blouse and veil in regional styles.","Rajasthan"),("bandhani","Bandhani","Tie-dyed textiles are widely used in Rajasthan clothing and accessories.","Bandhani"),("pagri","Rajasthani pagri","Turban styles vary by region and occasion across Rajasthan.","Pagri"),("mojari","Mojari","Embroidered leather footwear is a traditional Rajasthan accessory.","Mojari")]},
"ladakh": {
"eat":[("thukpa","Thukpa","Noodle soup with vegetables or meat is widely eaten in Ladakh and the wider Himalayan region.","Thukpa"),("momos","Momos","Steamed or fried dumplings filled with meat or vegetables are popular in Ladakh.","Momo"),("butter-tea","Butter tea","Salted tea prepared with butter is a traditional drink in Himalayan regions.","Butter tea"),("skyù","Skyu","Ladakhi dumpling stew combines wheat dough pieces with vegetables and sometimes meat.","Ladakhi cuisine"),("tingmo","Tingmo","Steamed bread is commonly served with Tibetan-influenced curries and stews.","Tingmo")],
"culture":[("hemis-festival","Hemis festival","The annual festival at Hemis Monastery features masked dances, music and Buddhist religious traditions.","Hemis Monastery"),("monastery-chants","Monastery chants","Monastic communities preserve Buddhist chanting and ritual music traditions.","Tibetan Buddhism"),("cham-dance","Cham dance","Masked ritual dances are performed in Himalayan Buddhist monasteries during festivals.","Cham dance"),("losar","Losar","Tibetan and Himalayan New Year traditions are observed in Ladakh with religious and community celebrations.","Losar"),("thangka","Thangka painting","Religious scroll paintings are an important visual art tradition in Tibetan Buddhism.","Thangka")],
"wear":[("goncha","Goncha","The long woollen robe is traditional Ladakhi clothing suited to the cold mountain climate.","Goncha"),("perak","Perak headdress","The perak is a traditional Ladakhi women's headdress decorated with turquoise and other stones.","Perak"),("woollen-shawl","Woollen shawl","Warm woollen wraps are practical traditional clothing in Ladakh's cold climate.","Shawl"),("boots","Traditional woollen boots","Warm boots and layered wool clothing are traditional practical wear in the high-altitude region.","Ladakh")]},
"kashmir": {
"eat":[("wazwan","Wazwan","A ceremonial multi-course Kashmiri feast traditionally features numerous meat preparations.","Wazwan"),("rogan-josh","Rogan josh","Aromatic Kashmiri meat curry is traditionally prepared with spices and yoghurt or similar ingredients.","Rogan josh"),("kahwa","Kahwa","Green tea flavoured with saffron, cardamom and nuts is a traditional Kashmiri drink.","Kahwah"),("yakhni","Yakhni","Yogurt-based meat preparation seasoned with aromatic spices is part of Kashmiri cuisine.","Yakhni"),("dum-aloo","Dum aloo","Small potatoes cooked in a spiced gravy are a familiar Kashmiri dish.","Dum aloo")],
"culture":[("shikara","Shikara rides","Decorated wooden boats are a distinctive part of life and tourism on Kashmir's lakes.","Shikara"),("sufi-music","Sufi music","Sufi devotional traditions have a long history in Kashmir.","Sufism"),("chinar-gardens","Chinar gardens","The chinar tree and Mughal-style gardens are distinctive elements of Kashmir's cultural landscape.","Chinar"),("papier-mache","Kashmiri papier-mâché","Hand-painted papier-mâché objects are a long-established Kashmiri craft.","Kashmiri papier-mâché"),("kashmiri-carpet","Kashmiri carpet weaving","Fine hand-knotted carpets form an important traditional craft of Kashmir.","Kashmir carpet")],
"wear":[("pheran","Pheran","The loose long robe is traditional Kashmiri clothing, especially useful in cold weather.","Pheran"),("tilla-embroidery","Tilla embroidery","Metallic thread embroidery decorates traditional Kashmiri garments.","Tilla embroidery"),("pashmina","Pashmina shawl","Fine cashmere wool is woven into lightweight warm shawls associated with Kashmir.","Pashmina"),("taranga","Taranga headdress","Traditional Kashmiri women's headwear varies by community and region.","Kashmiri clothing")]},
"rishikesh": {
"eat":[("aloo-puri","Aloo puri","Spiced potato curry served with fried puris is a common North Indian meal.","Puri"),("kachori","Kachori","Spiced filling enclosed in fried pastry is a popular North Indian snack.","Kachori"),("sattvic-thali","Sattvic thali","Vegetarian meals prepared without meat and often without strong ingredients are common around pilgrimage centres.","Sattvic"),("rajma-rice","Rajma rice","Kidney bean curry with rice is a familiar North Indian vegetarian meal.","Rajma"),("pakora","Pakora","Vegetables coated in seasoned gram-flour batter are deep-fried as a common snack.","Pakora")],
"culture":[("yoga","Yoga","Rishikesh is internationally associated with yoga study, practice and spiritual retreats.","Rishikesh"),("ganga-aarti","Ganga aarti","Evening river worship with lamps and devotional music is performed at Rishikesh's ghats.","Ganga Aarti"),("kumbh","Kumbh Mela","Rishikesh is one of the four traditional sites associated with the Kumbh Mela cycle.","Kumbh Mela"),("ashram-tradition","Ashram tradition","The city has a long association with Hindu spiritual study, meditation and ashram life.","Ashram"),("garhwali-culture","Garhwali culture","Rishikesh sits in Uttarakhand, where Garhwali language, music and folk traditions are important.","Garhwali people")],
"wear":[("cotton-kurta","Cotton kurta","Light cotton kurtas are practical traditional clothing in the warm plains around Rishikesh.","Kurta"),("saffron-clothing","Saffron robes","Saffron-coloured robes are associated with Hindu ascetic and monastic traditions.","Sannyasa"),("dhoti","Dhoti","The traditional wrapped lower garment is worn in religious and ceremonial contexts.","Dhoti"),("shawl","Woollen shawl","Shawls are commonly used in the cooler Himalayan foothill climate.","Shawl")]}
}

def make(slug,d):
    x=[f'  "{slug}": {{']
    for n,sec in enumerate(("eat","culture","wear")):
        x.append(f"    {sec}: [")
        for i,(a,b,c,w) in enumerate(d[sec]):
            x.append(f'      {{ id: "{a}", name: "{b}", note: "{c}", wiki: "{w}" }}'+("," if i+1<len(d[sec]) else ""))
        x.append("    ]"+("," if n<2 else ""))
    x.append("  }")
    return "\n".join(x)

for slug,d in C.items():
    if f'"{slug}":' in s: continue
    s=s.rstrip()
    s=s[:-2].rstrip() if s.endswith("};") else s
    if not s.endswith(","): s+=","
    s+="\n"+make(slug,d)+"\n};\n"

p.write_text(s,encoding="utf-8")
print("Remaining cities added.")
// data.js
const json = `[{"id":1,"first_name":"Jerald","last_name":"Mazella","email":"jmazella0@deviantart.com","gender":"Male","salary":4338},
{"id":2,"first_name":"Marlie","last_name":"Aldersley","email":"maldersley1@cpanel.net","gender":"Female","salary":9141},
{"id":3,"first_name":"Ulrike","last_name":"Callis","email":"ucallis2@examiner.com","gender":"Female","salary":6176},
{"id":4,"first_name":"Bel","last_name":"Andreassen","email":"bandreassen3@utexas.edu","gender":"Female","salary":5005},
{"id":5,"first_name":"Cathyleen","last_name":"Garham","email":"cgarham4@washingtonpost.com","gender":"Female","salary":3886},
{"id":6,"first_name":"Walton","last_name":"Wisedale","email":"wwisedale5@si.edu","gender":"Male","salary":3158},
{"id":7,"first_name":"Dacy","last_name":"Spurden","email":"dspurden6@mysql.com","gender":"Female","salary":8878},
{"id":8,"first_name":"Luise","last_name":"Quittonden","email":"lquittonden7@last.fm","gender":"Female","salary":7218},
{"id":9,"first_name":"Corty","last_name":"McArte","email":"cmcarte8@spiegel.de","gender":"Male","salary":9568},
{"id":10,"first_name":"Rory","last_name":"Ilewicz","email":"rilewicz9@google.com","gender":"Female","salary":8379},
{"id":11,"first_name":"Susannah","last_name":"Rafferty","email":"sraffertya@pinterest.com","gender":"Female","salary":9589},
{"id":12,"first_name":"Duane","last_name":"Demangeon","email":"ddemangeonb@hubpages.com","gender":"Male","salary":5016},
{"id":13,"first_name":"Kermie","last_name":"Cockett","email":"kcockettc@reuters.com","gender":"Male","salary":9961},
{"id":14,"first_name":"Aluin","last_name":"Robertsson","email":"arobertssond@eventbrite.com","gender":"Male","salary":4688},
{"id":15,"first_name":"Franz","last_name":"Delagua","email":"fdelaguae@sun.com","gender":"Male","salary":4515}]`;

// 문자열을 파싱(변환)해서 배열객체 data로 변환해줌
const data = JSON.parse(json);

// console.log(data);
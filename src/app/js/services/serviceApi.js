app.service("serviceApi", function(){
  // 
  // this.api =  'http://localhost/LAMP/Adopte_un_simplonien/server/index.php/api/card';
  // this.filter = 'http://localhost/LAMP/Adopte_un_simplonien/server/index.php/api/cardFiltre';
  // this.connect = 'http://localhost/LAMP/Adopte_un_simplonien/server/index.php/api/connection';
  // this.getUser = 'http://localhost/LAMP/Adopte_un_simplonien/server/index.php/api/user';
  // this.profilUser = 'http://localhost/LAMP/Adopte_un_simplonien/server/index.php/api/simplonien/';
  // this.createUser = 'http://localhost/LAMP/Adopte_un_simplonien/server/index.php/api/create/user';
  // this.deleteUser = 'http://localhost/LAMP/Adopte_un_simplonien/server/index.php/api/delete/user/';
  // this.createStudent = 'http://localhost/LAMP/Adopte_un_simplonien/server/index.php/api/create/simplonien';
  // this.getSimplonien = 'http://localhost/LAMP/Adopte_un_simplonien/server/index.php/api/listeSimplonien';
  // this.deleteSimplonien = 'http://localhost/LAMP/Adopte_un_simplonien/server/index.php/api/delete/simplonien/';
  // this.modifySimplonien = 'http://localhost/LAMP/Adopte_un_simplonien/server/index.php/api/simplonien/';
  // this.modifySendSimplonien = 'http://localhost/LAMP/Adopte_un_simplonien/server/index.php/api/modify/simplonien/';

  this.schools = [{
      ville: 'Montreuil',
      rue: '55 rue de Vincennes',
      code:'93100 Montreuil',
      mail: 'inbox@simplon.co',
      phone: '',
      active: false,
  }, {
      ville: 'Indre',
      rue: '',
      code:'',
      mail: '',
      phone: '',
      active: false,
  }, {
      ville: 'Roubaix',
      rue: '94 Rue Léon Marlot',
      code:'59100 Roubaix',
      mail: '',
      phone: '03 20 02 79 68',
      active: false,
  }, {
      ville: 'Noyon',
      rue: '1435 Bd Cambronne Bat 12',
      code:' 60400 NOYON',
      mail: 'contact.formation@novei.fr',
      phone: '',
      active: false,
  }, {
      ville: 'Troyes',
      rue: '217 avenue Pierre Brossolette',
      code:'10002 Troyes',
      mail: '',
      phone: '+33 (0)3 25 71 22 22',
      active: false,
  }, {
      ville: 'Epinal',
      rue: ' 1 Avenue Général de Gaulle',
      code:'88000 Épinal',
      mail: '',
      phone: '03 29 33 88 88',
      active: false,
  },{
      ville: 'Le Cheylard',
      rue: 'Aric industrie',
      code:'07160 Le Cheylard',
      mail: 'contact@simplonve.co',
      phone: '09 70 65 01 17',
      active: false,
  }, {
      ville: 'Rennes',
      rue: "23 Rue d'Aiguillon",
      code:'35200 Rennes',
      mail: '',
      phone: '02 99 86 89 26',
      active: false,
  }, {
      ville: 'Vannes',
      rue: '20 Rue Winston Churchill',
      code:'56000 Vannes',
      mail: '',
      phone: '+33 2 97 46 61 10',
      active: false,
  }, {
      ville: 'Hérault',
      rue: '',
      code:'',
      mail: '',
      phone: '',
      active: false,
  }, {
      ville: 'Villeurbanne',
      rue: '352, cours Emile Zola',
      code:'69100 Villeurbanne',
      mail: 'contact.lyon@simplon.co',
      phone: '',
      active: false,
  }, {
      ville: 'Mende',
      rue: 'Avenue du 11 novembre',
      code:'48000 Mende',
      mail: 'contact@codincamp.fr ',
      phone: '',
      active: false,
  }, {
      ville: 'Alès',
      rue: ' 160 montée des Lauriers ',
      code:' 30318 ALES ',
      mail: 'coda@mde-alescevennes.fr',
      phone: '04 66 55 84 94',
      active: false,
  }, {
      ville: 'Lunel',
      rue: 'SCOP Fondespierre, 33-35 rue de la Libération',
      code:'34400 Lunel',
      mail: '',
      phone: '04 67 70 52 40',
      active: false,
  }, {
      ville: 'Toulouse',
      rue: "79 Route d'Espagne",
      code:'31200 Toulouse',
      mail: '',
      phone: '05 34 40 51 10',
      active: false,
  }, {
      ville: 'Boulogne sur mer',
      rue: '10 Rue des Carreaux',
      code:'62200 Boulogne sur ',
      mail: 'eeuchin@simplon.co',
      phone: '',
      active: false,
  }, {
      ville: 'Narbonne',
      rue: '30 Avenue du Dr Paul Pompidor',
      code:'11100 Narbonne',
      mail: '',
      phone: '04 11 23 22 00',
      active: false,
  }, {
      ville: 'Marseille',
      rue: '38 rue Frédéric Joliot Curie',
      code:'13013 Marseille',
      mail: 'simplonmars@centrale-marseille.fr',
      phone: '',
      active: false,
  }, {
      ville: 'Nice',
      rue: '89 Route de Turin',
      code:'06300 Nice',
      mail: '',
      phone: '04 93 31 33 72',
      active: false,
  },{
      ville: 'Réunion',
      rue: 'Rue des Longanins',
      code:'97440',
      mail: 'farid@simplon.co',
      phone: '',
      active: false,
  },{
      ville: 'Roumanie',
      rue: '23 Emil Isac Street',
      code:'Cluj Cowork',
      mail: 'farid@simplon.co',
      phone: '',
      active: false,
  }];

  this.themes = [{
      name: 'Promo',
      active: true,
  }, {
      name: 'Langage',
      active: false,
  }, {
      name: 'Contrat',
      active: false,
  }];


  this.langages = [{
      type: 'Javascript',
      active: false,
  }, {
      type: 'HTML/CSS',
      active: false,
  }, {
      type: 'PHP',
      active: false,
  }, {
      type: 'Angular',
      active: false,
  }, {
      type: 'REACT',
      active: false,
  }, {
      type: 'Typescript',
      active: false,
  }, {
      type: 'Jquery',
      active: false,
  }, {
      type: 'PHP',
      active: false,
  }, {
      type: 'Design',
      active: false,
  }, {
      type: 'JAVA',
      active: false,
  }, {
      type: 'C#',
      active: false,
  }, {
      type: 'UI/UX',
      active: false,
  }, {
      type: 'Ruby',
      active: false,
  }, {
      type: 'Responsive',
      active: false,
  }, {
      type: 'Node',
      active: false,
  }, {
      type: 'Meteor',
      active: false,
  }, {
      type: 'Git',
      active: false,
  }, ];


  this.contrats = [{
      type: 'CDD',
      active: false,
  }, {
      type: 'CDI',
      active: false,
  }, {
      type: 'Contrat Pro',
      active: false,
  }, {
      type: 'Stage',
      active: false,
  }, {
      type: 'Freelance',
      active: false,
  }, ];
});

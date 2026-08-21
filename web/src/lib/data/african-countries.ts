export interface AfricanCountry {
  code: string;
  name: string;
  nameFr: string;
  dialCode: string;
  flag: string;
  phoneLength: number;
  regions: Region[];
}

export interface Region {
  name: string;
  cities: City[];
}

export interface City {
  name: string;
  communes?: string[];
  quarters?: Record<string, string[]>;
}

export const africanCountries: AfricanCountry[] = [
  {
    code: 'CI', name: 'Ivory Coast', nameFr: "Côte d'Ivoire", dialCode: '+225', flag: '🇨🇮', phoneLength: 10,
    regions: [
      { name: 'District Autonome d\'Abidjan', cities: [
        { name: 'Abidjan', communes: ['Abobo', 'Adjamé', 'Attécoubé', 'Cocody', 'Koumassi', 'Marcory', 'Plateau', 'Port-Bouët', 'Treichville', 'Yopougon', 'Songon', 'Bingerville', 'Anyama'],
          quarters: {
            'Cocody': ['Riviera', 'Angre', 'Deux Plateaux', 'Attoban', 'Cocody Centre', 'II Plateaux', 'Angré Château', 'Vallon', 'Ambassade', 'Saint Viateur'],
            'Plateau': ['Plateau Centre', 'Treichville'],
            'Yopougon': ['Yopougon Centre', 'Yopougon Selmer', 'Niangon', 'Kouté', 'Maroc', 'Siporex', 'Wassakara', 'Sideci'],
            'Abobo': ['Abobo Centre', 'Abobo Baoulé', 'Abobo Gare', 'Abobo Nord', 'PK18', 'Avocatier'],
            'Adjamé': ['Adjamé Centre', 'Brasserie', 'Liberté', '220 Logements'],
            'Marcory': ['Marcory Centre', 'Zone Industrielle', 'Biabou', 'Résidentiel'],
            'Koumassi': ['Koumassi Nord', 'Koumassi Sud', 'Remblais', 'Prodomo'],
            'Port-Bouët': ['Port-Bouët Centre', 'Vridi', 'Golf', 'Jean Folly'],
            'Treichville': ['Treichville Centre', 'Zone Portuaire'],
            'Bingerville': ['Bingerville Centre', 'Eucalyptus', 'Les Perles'],
            'Anyama': ['Anyama Centre', 'Anguédédou', 'Gbéké'],
          }
        },
      ]},
      { name: 'District Autonome de Yamoussoukro', cities: [
        { name: 'Yamoussoukro', communes: ['Yamoussoukro', 'N\'Zuessy', 'Kossou', 'Attiégouakro'],
          quarters: { 'Yamoussoukro': ['Centre-ville', 'Habitat', 'Commerce', 'Résidentiel', 'Nangui Abrogoua'] }
        },
      ]},
      { name: 'Lacs', cities: [
        { name: 'Dimbokro', communes: ['Dimbokro'] },
        { name: 'Toumodi', communes: ['Toumodi'] },
        { name: 'Tiassalé', communes: ['Tiassalé'] },
      ]},
      { name: 'Vallée du Bandama', cities: [
        { name: 'Bouaké', communes: ['Bouaké Nord', 'Bouaké Sud', 'Bouaké Ville'],
          quarters: { 'Bouaké Nord': ['Air France', 'Commerce', 'Dar es Salaam', 'Kennedy'] }
        },
        { name: 'Katiola', communes: ['Katiola'] },
      ]},
      { name: 'Haut-Sassandra', cities: [
        { name: 'Daloa', communes: ['Daloa Nord', 'Daloa Sud'],
          quarters: { 'Daloa Nord': ['Centre', 'Cité', 'Camp Militaire'] }
        },
        { name: 'Issia', communes: ['Issia'] },
        { name: 'Vavoua', communes: ['Vavoua'] },
      ]},
      { name: 'Savanes', cities: [
        { name: 'Korhogo', communes: ['Korhogo Nord', 'Korhogo Sud'],
          quarters: { 'Korhogo Nord': ['Centre', 'Commerce', 'Quartier Mosquée'] }
        },
        { name: 'Ferkessédougou', communes: ['Ferkessédougou'] },
        { name: 'Ouangolodougou', communes: ['Ouangolodougou'] },
      ]},
      { name: 'Bas-Sassandra', cities: [
        { name: 'San-Pédro', communes: ['San-Pédro', 'Grand-Béréby'],
          quarters: { 'San-Pédro': ['Centre', 'Zone Portuaire', 'Balmer'] }
        },
        { name: 'Sassandra', communes: ['Sassandra'] },
        { name: 'Soubré', communes: ['Soubré'] },
      ]},
      { name: 'Dix-Huit Montagnes', cities: [
        { name: 'Man', communes: ['Man', 'Danané', 'Biankouma'],
          quarters: { 'Man': ['Centre', 'Libreville', 'Gbangbegouiné'] }
        },
      ]},
      { name: 'Moyen-Comoé', cities: [
        { name: 'Abengourou', communes: ['Abengourou'],
          quarters: { 'Abengourou': ['Centre', 'N\'Gban Koffikro', 'Ahouabo'] }
        },
      ]},
      { name: 'Zanzan', cities: [
        { name: 'Bondoukou', communes: ['Bondoukou', 'Bouna', 'Tanda'] },
      ]},
      { name: 'Denguélé', cities: [
        { name: 'Odienné', communes: ['Odienné'] },
      ]},
      { name: 'Worodougou', cities: [
        { name: 'Séguéla', communes: ['Séguéla'] },
      ]},
      { name: 'Bafing', cities: [
        { name: 'Touba', communes: ['Touba'] },
      ]},
      { name: 'Gbêkê', cities: [
        { name: 'Bouaké', communes: ['Bouaké'] },
      ]},
      { name: 'Marahoué', cities: [
        { name: 'Bouaflé', communes: ['Bouaflé'] },
        { name: 'Sinfra', communes: ['Sinfra'] },
      ]},
      { name: 'Hambol', cities: [
        { name: 'Katiola', communes: ['Katiola'] },
      ]},
      { name: 'Poro', cities: [
        { name: 'Korhogo', communes: ['Korhogo'] },
      ]},
      { name: 'Tchologo', cities: [
        { name: 'Ferkessédougou', communes: ['Ferkessédougou'] },
      ]},
      { name: 'Béré', cities: [
        { name: 'Mankono', communes: ['Mankono'] },
      ]},
      { name: 'Bagoué', cities: [
        { name: 'Boundiali', communes: ['Boundiali'] },
      ]},
      { name: 'Gôh', cities: [
        { name: 'Gagnoa', communes: ['Gagnoa'],
          quarters: { 'Gagnoa': ['Centre', 'Lobia', 'Guezon'] }
        },
      ]},
      { name: 'Lôh-Djiboua', cities: [
        { name: 'Divo', communes: ['Divo'],
          quarters: { 'Divo': ['Centre', 'Gadouan'] }
        },
      ]},
      { name: 'Indénié-Djuablin', cities: [
        { name: 'Abengourou', communes: ['Abengourou'] },
      ]},
      { name: 'Sud-Comoé', cities: [
        { name: 'Grand-Bassam', communes: ['Grand-Bassam'] },
        { name: 'Aboisso', communes: ['Aboisso'] },
      ]},
      { name: 'Nawa', cities: [
        { name: 'Soubré', communes: ['Soubré'] },
      ]},
      { name: 'Gontougo', cities: [
        { name: 'Bondoukou', communes: ['Bondoukou'] },
      ]},
      { name: 'Iffou', cities: [
        { name: 'Daoukro', communes: ['Daoukro'] },
      ]},
      { name: 'Moronou', cities: [
        { name: 'Bongouanou', communes: ['Bongouanou'] },
      ]},
      { name: 'Mé', cities: [
        { name: 'Adzopé', communes: ['Adzopé'] },
        { name: 'Akoupé', communes: ['Akoupé'] },
      ]},
      { name: 'La Mé', cities: [
        { name: 'Adzopé', communes: ['Adzopé'] },
      ]},
      { name: 'Agnéby-Tiassa', cities: [
        { name: 'Agboville', communes: ['Agboville'] },
      ]},
      { name: 'San Pedro', cities: [
        { name: 'Tabou', communes: ['Tabou'] },
      ]},
    ]
  },
  { code: 'SN', name: 'Senegal', nameFr: 'Sénégal', dialCode: '+221', flag: '🇸🇳', phoneLength: 9,
    regions: [
      { name: 'Dakar', cities: [
        { name: 'Dakar', communes: ['Plateau', 'Médina', 'Fass', 'Colobane', 'HLM', 'Grand Yoff', 'Parcelles Assainies', 'Patte d\'Oie'] },
        { name: 'Pikine', communes: ['Pikine Est', 'Pikine Ouest', 'Pikine Nord'] },
        { name: 'Guédiawaye', communes: ['Guédiawaye'] },
        { name: 'Rufisque', communes: ['Rufisque'] },
      ]},
      { name: 'Thiès', cities: [
        { name: 'Thiès', communes: ['Thiès Nord', 'Thiès Sud', 'Thiès Est'] },
        { name: 'Mbour', communes: ['Mbour'] },
        { name: 'Tivaouane', communes: ['Tivaouane'] },
      ]},
      { name: 'Saint-Louis', cities: [
        { name: 'Saint-Louis', communes: ['Saint-Louis'] },
        { name: 'Dagana', communes: ['Dagana'] },
      ]},
      { name: 'Ziguinchor', cities: [
        { name: 'Ziguinchor', communes: ['Ziguinchor'] },
      ]},
      { name: 'Kaolack', cities: [
        { name: 'Kaolack', communes: ['Kaolack'] },
      ]},
      { name: 'Diourbel', cities: [
        { name: 'Touba', communes: ['Touba'] },
        { name: 'Diourbel', communes: ['Diourbel'] },
        { name: 'Mbacké', communes: ['Mbacké'] },
      ]},
      { name: 'Fatick', cities: [{ name: 'Fatick', communes: ['Fatick'] }] },
      { name: 'Kolda', cities: [{ name: 'Kolda', communes: ['Kolda'] }] },
      { name: 'Tambacounda', cities: [{ name: 'Tambacounda', communes: ['Tambacounda'] }] },
      { name: 'Louga', cities: [{ name: 'Louga', communes: ['Louga'] }] },
      { name: 'Kaffrine', cities: [{ name: 'Kaffrine', communes: ['Kaffrine'] }] },
      { name: 'Kédougou', cities: [{ name: 'Kédougou', communes: ['Kédougou'] }] },
      { name: 'Sédhiou', cities: [{ name: 'Sédhiou', communes: ['Sédhiou'] }] },
      { name: 'Matam', cities: [{ name: 'Matam', communes: ['Matam'] }] },
    ]
  },
  { code: 'ML', name: 'Mali', nameFr: 'Mali', dialCode: '+223', flag: '🇲🇱', phoneLength: 8,
    regions: [
      { name: 'Bamako', cities: [{ name: 'Bamako', communes: ['Commune I', 'Commune II', 'Commune III', 'Commune IV', 'Commune V', 'Commune VI'] }] },
      { name: 'Sikasso', cities: [{ name: 'Sikasso', communes: ['Sikasso'] }] },
      { name: 'Mopti', cities: [{ name: 'Mopti', communes: ['Mopti'] }] },
      { name: 'Ségou', cities: [{ name: 'Ségou', communes: ['Ségou'] }] },
      { name: 'Kayes', cities: [{ name: 'Kayes', communes: ['Kayes'] }] },
      { name: 'Koulikoro', cities: [{ name: 'Koulikoro', communes: ['Koulikoro'] }] },
      { name: 'Tombouctou', cities: [{ name: 'Tombouctou', communes: ['Tombouctou'] }] },
      { name: 'Gao', cities: [{ name: 'Gao', communes: ['Gao'] }] },
      { name: 'Kidal', cities: [{ name: 'Kidal', communes: ['Kidal'] }] },
    ]
  },
  { code: 'BF', name: 'Burkina Faso', nameFr: 'Burkina Faso', dialCode: '+226', flag: '🇧🇫', phoneLength: 8,
    regions: [
      { name: 'Centre', cities: [{ name: 'Ouagadougou', communes: ['Ouagadougou'] }] },
      { name: 'Hauts-Bassins', cities: [{ name: 'Bobo-Dioulasso', communes: ['Bobo-Dioulasso'] }] },
      { name: 'Boucle du Mouhoun', cities: [{ name: 'Dédougou', communes: ['Dédougou'] }] },
      { name: 'Centre-Ouest', cities: [{ name: 'Koudougou', communes: ['Koudougou'] }] },
      { name: 'Centre-Nord', cities: [{ name: 'Kaya', communes: ['Kaya'] }] },
      { name: 'Sahel', cities: [{ name: 'Dori', communes: ['Dori'] }] },
      { name: 'Est', cities: [{ name: 'Fada N\'Gourma', communes: ['Fada N\'Gourma'] }] },
      { name: 'Cascades', cities: [{ name: 'Banfora', communes: ['Banfora'] }] },
    ]
  },
  { code: 'NE', name: 'Niger', nameFr: 'Niger', dialCode: '+227', flag: '🇳🇪', phoneLength: 8,
    regions: [
      { name: 'Niamey', cities: [{ name: 'Niamey', communes: ['Niamey I', 'Niamey II', 'Niamey III', 'Niamey IV', 'Niamey V'] }] },
      { name: 'Zinder', cities: [{ name: 'Zinder', communes: ['Zinder'] }] },
      { name: 'Maradi', cities: [{ name: 'Maradi', communes: ['Maradi'] }] },
      { name: 'Agadez', cities: [{ name: 'Agadez', communes: ['Agadez'] }] },
      { name: 'Tahoua', cities: [{ name: 'Tahoua', communes: ['Tahoua'] }] },
    ]
  },
  { code: 'TG', name: 'Togo', nameFr: 'Togo', dialCode: '+228', flag: '🇹🇬', phoneLength: 8,
    regions: [
      { name: 'Maritime', cities: [{ name: 'Lomé', communes: ['Lomé I', 'Lomé II', 'Lomé III', 'Lomé IV', 'Lomé V'] }] },
      { name: 'Plateaux', cities: [{ name: 'Atakpamé', communes: ['Atakpamé'] }, { name: 'Kpalimé', communes: ['Kpalimé'] }] },
      { name: 'Centrale', cities: [{ name: 'Sokodé', communes: ['Sokodé'] }] },
      { name: 'Kara', cities: [{ name: 'Kara', communes: ['Kara'] }] },
      { name: 'Savanes', cities: [{ name: 'Dapaong', communes: ['Dapaong'] }] },
    ]
  },
  { code: 'BJ', name: 'Benin', nameFr: 'Bénin', dialCode: '+229', flag: '🇧🇯', phoneLength: 8,
    regions: [
      { name: 'Littoral', cities: [{ name: 'Cotonou', communes: ['Cotonou'] }] },
      { name: 'Atlantique', cities: [{ name: 'Allada', communes: ['Allada'] }, { name: 'Ouidah', communes: ['Ouidah'] }] },
      { name: 'Ouémé', cities: [{ name: 'Porto-Novo', communes: ['Porto-Novo'] }] },
      { name: 'Zou', cities: [{ name: 'Abomey', communes: ['Abomey'] }, { name: 'Bohicon', communes: ['Bohicon'] }] },
      { name: 'Borgou', cities: [{ name: 'Parakou', communes: ['Parakou'] }] },
      { name: 'Donga', cities: [{ name: 'Djougou', communes: ['Djougou'] }] },
      { name: 'Atacora', cities: [{ name: 'Natitingou', communes: ['Natitingou'] }] },
      { name: 'Mono', cities: [{ name: 'Lokossa', communes: ['Lokossa'] }] },
    ]
  },
  { code: 'CM', name: 'Cameroon', nameFr: 'Cameroun', dialCode: '+237', flag: '🇨🇲', phoneLength: 9,
    regions: [
      { name: 'Littoral', cities: [{ name: 'Douala', communes: ['Douala I', 'Douala II', 'Douala III', 'Douala IV', 'Douala V', 'Douala VI'] }] },
      { name: 'Centre', cities: [{ name: 'Yaoundé', communes: ['Yaoundé I', 'Yaoundé II', 'Yaoundé III', 'Yaoundé IV', 'Yaoundé V', 'Yaoundé VI', 'Yaoundé VII'] }] },
      { name: 'Ouest', cities: [{ name: 'Bafoussam', communes: ['Bafoussam'] }, { name: 'Bamenda', communes: ['Bamenda'] }] },
      { name: 'Nord', cities: [{ name: 'Garoua', communes: ['Garoua'] }] },
      { name: 'Extrême-Nord', cities: [{ name: 'Maroua', communes: ['Maroua'] }] },
      { name: 'Adamaoua', cities: [{ name: 'Ngaoundéré', communes: ['Ngaoundéré'] }] },
      { name: 'Est', cities: [{ name: 'Bertoua', communes: ['Bertoua'] }] },
      { name: 'Sud', cities: [{ name: 'Ebolowa', communes: ['Ebolowa'] }] },
      { name: 'Nord-Ouest', cities: [{ name: 'Bamenda', communes: ['Bamenda'] }] },
      { name: 'Sud-Ouest', cities: [{ name: 'Buea', communes: ['Buea'] }, { name: 'Limbe', communes: ['Limbe'] }] },
    ]
  },
  { code: 'CD', name: 'DR Congo', nameFr: 'RD Congo', dialCode: '+243', flag: '🇨🇩', phoneLength: 9,
    regions: [
      { name: 'Kinshasa', cities: [{ name: 'Kinshasa', communes: ['Gombe', 'Lingwala', 'Barumbu', 'Kinshasa', 'Kasa-Vubu', 'Bandalungwa', 'Bumbu', 'Makala', 'Ngiri-Ngiri', 'Selembao', 'Kalamu', 'Kintambo', 'Ngaliema', 'Mont-Ngafula', 'Lemba', 'Matete', 'Limete', 'Masina', 'N\'sele', 'Maluku', 'Kimbanseke', 'N\'djili', 'Ndjili', 'Kisenso'] }] },
      { name: 'Haut-Katanga', cities: [{ name: 'Lubumbashi', communes: ['Lubumbashi'] }] },
      { name: 'Kasaï', cities: [{ name: 'Kananga', communes: ['Kananga'] }] },
      { name: 'Nord-Kivu', cities: [{ name: 'Goma', communes: ['Goma'] }] },
      { name: 'Sud-Kivu', cities: [{ name: 'Bukavu', communes: ['Bukavu'] }] },
    ]
  },
  { code: 'CG', name: 'Congo', nameFr: 'Congo', dialCode: '+242', flag: '🇨🇬', phoneLength: 9,
    regions: [
      { name: 'Brazzaville', cities: [{ name: 'Brazzaville', communes: ['Brazzaville'] }] },
      { name: 'Pointe-Noire', cities: [{ name: 'Pointe-Noire', communes: ['Pointe-Noire'] }] },
    ]
  },
  { code: 'GA', name: 'Gabon', nameFr: 'Gabon', dialCode: '+241', flag: '🇬🇦', phoneLength: 8,
    regions: [
      { name: 'Estuaire', cities: [{ name: 'Libreville', communes: ['Libreville'] }] },
      { name: 'Haut-Ogooué', cities: [{ name: 'Franceville', communes: ['Franceville'] }] },
      { name: 'Ogooué-Maritime', cities: [{ name: 'Port-Gentil', communes: ['Port-Gentil'] }] },
    ]
  },
  { code: 'GH', name: 'Ghana', nameFr: 'Ghana', dialCode: '+233', flag: '🇬🇭', phoneLength: 9,
    regions: [
      { name: 'Greater Accra', cities: [{ name: 'Accra', communes: ['Accra', 'Tema'] }] },
      { name: 'Ashanti', cities: [{ name: 'Kumasi', communes: ['Kumasi'] }] },
      { name: 'Northern', cities: [{ name: 'Tamale', communes: ['Tamale'] }] },
      { name: 'Western', cities: [{ name: 'Takoradi', communes: ['Takoradi'] }] },
      { name: 'Central', cities: [{ name: 'Cape Coast', communes: ['Cape Coast'] }] },
      { name: 'Eastern', cities: [{ name: 'Koforidua', communes: ['Koforidua'] }] },
    ]
  },
  { code: 'NG', name: 'Nigeria', nameFr: 'Nigeria', dialCode: '+234', flag: '🇳🇬', phoneLength: 10,
    regions: [
      { name: 'Lagos', cities: [{ name: 'Lagos', communes: ['Lagos Island', 'Lagos Mainland', 'Ikeja', 'Surulere', 'Yaba', 'Lekki', 'Victoria Island', 'Ikoyi'] }] },
      { name: 'FCT', cities: [{ name: 'Abuja', communes: ['Abuja'] }] },
      { name: 'Kano', cities: [{ name: 'Kano', communes: ['Kano'] }] },
      { name: 'Oyo', cities: [{ name: 'Ibadan', communes: ['Ibadan'] }] },
      { name: 'Rivers', cities: [{ name: 'Port Harcourt', communes: ['Port Harcourt'] }] },
    ]
  },
  { code: 'KE', name: 'Kenya', nameFr: 'Kenya', dialCode: '+254', flag: '🇰🇪', phoneLength: 9,
    regions: [
      { name: 'Nairobi', cities: [{ name: 'Nairobi', communes: ['Nairobi'] }] },
      { name: 'Coast', cities: [{ name: 'Mombasa', communes: ['Mombasa'] }] },
      { name: 'Nyanza', cities: [{ name: 'Kisumu', communes: ['Kisumu'] }] },
    ]
  },
  { code: 'TZ', name: 'Tanzania', nameFr: 'Tanzanie', dialCode: '+255', flag: '🇹🇿', phoneLength: 9,
    regions: [
      { name: 'Dar es Salaam', cities: [{ name: 'Dar es Salaam', communes: ['Dar es Salaam'] }] },
      { name: 'Dodoma', cities: [{ name: 'Dodoma', communes: ['Dodoma'] }] },
    ]
  },
  { code: 'ET', name: 'Ethiopia', nameFr: 'Éthiopie', dialCode: '+251', flag: '🇪🇹', phoneLength: 9,
    regions: [
      { name: 'Addis Ababa', cities: [{ name: 'Addis Ababa', communes: ['Addis Ababa'] }] },
    ]
  },
  { code: 'RW', name: 'Rwanda', nameFr: 'Rwanda', dialCode: '+250', flag: '🇷🇼', phoneLength: 9,
    regions: [
      { name: 'Kigali', cities: [{ name: 'Kigali', communes: ['Kigali'] }] },
    ]
  },
  { code: 'UG', name: 'Uganda', nameFr: 'Ouganda', dialCode: '+256', flag: '🇺🇬', phoneLength: 9,
    regions: [
      { name: 'Central', cities: [{ name: 'Kampala', communes: ['Kampala'] }] },
    ]
  },
  { code: 'DZ', name: 'Algeria', nameFr: 'Algérie', dialCode: '+213', flag: '🇩🇿', phoneLength: 9,
    regions: [
      { name: 'Alger', cities: [{ name: 'Alger', communes: ['Alger'] }] },
      { name: 'Oran', cities: [{ name: 'Oran', communes: ['Oran'] }] },
      { name: 'Constantine', cities: [{ name: 'Constantine', communes: ['Constantine'] }] },
    ]
  },
  { code: 'MA', name: 'Morocco', nameFr: 'Maroc', dialCode: '+212', flag: '🇲🇦', phoneLength: 9,
    regions: [
      { name: 'Casablanca-Settat', cities: [{ name: 'Casablanca', communes: ['Casablanca'] }] },
      { name: 'Rabat-Salé-Kénitra', cities: [{ name: 'Rabat', communes: ['Rabat'] }, { name: 'Salé', communes: ['Salé'] }] },
      { name: 'Marrakech-Safi', cities: [{ name: 'Marrakech', communes: ['Marrakech'] }] },
      { name: 'Fès-Meknès', cities: [{ name: 'Fès', communes: ['Fès'] }, { name: 'Meknès', communes: ['Meknès'] }] },
      { name: 'Tanger-Tétouan-Al Hoceïma', cities: [{ name: 'Tanger', communes: ['Tanger'] }] },
    ]
  },
  { code: 'TN', name: 'Tunisia', nameFr: 'Tunisie', dialCode: '+216', flag: '🇹🇳', phoneLength: 8,
    regions: [
      { name: 'Tunis', cities: [{ name: 'Tunis', communes: ['Tunis'] }] },
      { name: 'Sfax', cities: [{ name: 'Sfax', communes: ['Sfax'] }] },
    ]
  },
  { code: 'EG', name: 'Egypt', nameFr: 'Égypte', dialCode: '+20', flag: '🇪🇬', phoneLength: 10,
    regions: [
      { name: 'Le Caire', cities: [{ name: 'Le Caire', communes: ['Le Caire'] }] },
      { name: 'Alexandrie', cities: [{ name: 'Alexandrie', communes: ['Alexandrie'] }] },
    ]
  },
  { code: 'ZA', name: 'South Africa', nameFr: 'Afrique du Sud', dialCode: '+27', flag: '🇿🇦', phoneLength: 9,
    regions: [
      { name: 'Gauteng', cities: [{ name: 'Johannesburg', communes: ['Johannesburg'] }, { name: 'Pretoria', communes: ['Pretoria'] }] },
      { name: 'Western Cape', cities: [{ name: 'Le Cap', communes: ['Le Cap'] }] },
      { name: 'KwaZulu-Natal', cities: [{ name: 'Durban', communes: ['Durban'] }] },
    ]
  },
  { code: 'GN', name: 'Guinea', nameFr: 'Guinée', dialCode: '+224', flag: '🇬🇳', phoneLength: 9,
    regions: [
      { name: 'Conakry', cities: [{ name: 'Conakry', communes: ['Conakry'] }] },
    ]
  },
  { code: 'TD', name: 'Chad', nameFr: 'Tchad', dialCode: '+235', flag: '🇹🇩', phoneLength: 8,
    regions: [
      { name: 'N\'Djamena', cities: [{ name: 'N\'Djamena', communes: ['N\'Djamena'] }] },
    ]
  },
  { code: 'CF', name: 'Central African Republic', nameFr: 'Centrafrique', dialCode: '+236', flag: '🇨🇫', phoneLength: 8,
    regions: [
      { name: 'Bangui', cities: [{ name: 'Bangui', communes: ['Bangui'] }] },
    ]
  },
  { code: 'BI', name: 'Burundi', nameFr: 'Burundi', dialCode: '+257', flag: '🇧🇮', phoneLength: 8,
    regions: [
      { name: 'Bujumbura Mairie', cities: [{ name: 'Bujumbura', communes: ['Bujumbura'] }] },
    ]
  },
  { code: 'MG', name: 'Madagascar', nameFr: 'Madagascar', dialCode: '+261', flag: '🇲🇬', phoneLength: 9,
    regions: [
      { name: 'Analamanga', cities: [{ name: 'Antananarivo', communes: ['Antananarivo'] }] },
    ]
  },
  { code: 'MR', name: 'Mauritania', nameFr: 'Mauritanie', dialCode: '+222', flag: '🇲🇷', phoneLength: 8,
    regions: [
      { name: 'Nouakchott', cities: [{ name: 'Nouakchott', communes: ['Nouakchott'] }] },
    ]
  },
  { code: 'LR', name: 'Liberia', nameFr: 'Liberia', dialCode: '+231', flag: '🇱🇷', phoneLength: 8,
    regions: [
      { name: 'Montserrado', cities: [{ name: 'Monrovia', communes: ['Monrovia'] }] },
    ]
  },
  { code: 'SL', name: 'Sierra Leone', nameFr: 'Sierra Leone', dialCode: '+232', flag: '🇸🇱', phoneLength: 8,
    regions: [
      { name: 'Western Area', cities: [{ name: 'Freetown', communes: ['Freetown'] }] },
    ]
  },
  { code: 'GM', name: 'Gambia', nameFr: 'Gambie', dialCode: '+220', flag: '🇬🇲', phoneLength: 7,
    regions: [
      { name: 'Banjul', cities: [{ name: 'Banjul', communes: ['Banjul'] }] },
    ]
  },
  { code: 'GW', name: 'Guinea-Bissau', nameFr: 'Guinée-Bissau', dialCode: '+245', flag: '🇬🇼', phoneLength: 7,
    regions: [
      { name: 'Bissau', cities: [{ name: 'Bissau', communes: ['Bissau'] }] },
    ]
  },
  { code: 'CV', name: 'Cape Verde', nameFr: 'Cap-Vert', dialCode: '+238', flag: '🇨🇻', phoneLength: 7,
    regions: [
      { name: 'Santiago', cities: [{ name: 'Praia', communes: ['Praia'] }] },
    ]
  },
  { code: 'ST', name: 'São Tomé & Príncipe', nameFr: 'São Tomé et Príncipe', dialCode: '+239', flag: '🇸🇹', phoneLength: 7,
    regions: [
      { name: 'Água Grande', cities: [{ name: 'São Tomé', communes: ['São Tomé'] }] },
    ]
  },
  { code: 'DJ', name: 'Djibouti', nameFr: 'Djibouti', dialCode: '+253', flag: '🇩🇯', phoneLength: 8,
    regions: [
      { name: 'Djibouti', cities: [{ name: 'Djibouti', communes: ['Djibouti'] }] },
    ]
  },
  { code: 'KM', name: 'Comoros', nameFr: 'Comores', dialCode: '+269', flag: '🇰🇲', phoneLength: 7,
    regions: [
      { name: 'Grande Comore', cities: [{ name: 'Moroni', communes: ['Moroni'] }] },
    ]
  },
  { code: 'MU', name: 'Mauritius', nameFr: 'Maurice', dialCode: '+230', flag: '🇲🇺', phoneLength: 8,
    regions: [
      { name: 'Port Louis', cities: [{ name: 'Port Louis', communes: ['Port Louis'] }] },
    ]
  },
  { code: 'SC', name: 'Seychelles', nameFr: 'Seychelles', dialCode: '+248', flag: '🇸🇨', phoneLength: 7,
    regions: [
      { name: 'Mahé', cities: [{ name: 'Victoria', communes: ['Victoria'] }] },
    ]
  },
  { code: 'MZ', name: 'Mozambique', nameFr: 'Mozambique', dialCode: '+258', flag: '🇲🇿', phoneLength: 9,
    regions: [
      { name: 'Maputo', cities: [{ name: 'Maputo', communes: ['Maputo'] }] },
    ]
  },
  { code: 'AO', name: 'Angola', nameFr: 'Angola', dialCode: '+244', flag: '🇦🇴', phoneLength: 9,
    regions: [
      { name: 'Luanda', cities: [{ name: 'Luanda', communes: ['Luanda'] }] },
    ]
  },
  { code: 'ZM', name: 'Zambia', nameFr: 'Zambie', dialCode: '+260', flag: '🇿🇲', phoneLength: 9,
    regions: [
      { name: 'Lusaka', cities: [{ name: 'Lusaka', communes: ['Lusaka'] }] },
    ]
  },
  { code: 'ZW', name: 'Zimbabwe', nameFr: 'Zimbabwe', dialCode: '+263', flag: '🇿🇼', phoneLength: 9,
    regions: [
      { name: 'Harare', cities: [{ name: 'Harare', communes: ['Harare'] }] },
    ]
  },
  { code: 'NA', name: 'Namibia', nameFr: 'Namibie', dialCode: '+264', flag: '🇳🇦', phoneLength: 9,
    regions: [
      { name: 'Khomas', cities: [{ name: 'Windhoek', communes: ['Windhoek'] }] },
    ]
  },
  { code: 'BW', name: 'Botswana', nameFr: 'Botswana', dialCode: '+267', flag: '🇧🇼', phoneLength: 8,
    regions: [
      { name: 'South-East', cities: [{ name: 'Gaborone', communes: ['Gaborone'] }] },
    ]
  },
  { code: 'SZ', name: 'Eswatini', nameFr: 'Eswatini', dialCode: '+268', flag: '🇸🇿', phoneLength: 8,
    regions: [
      { name: 'Hhohho', cities: [{ name: 'Mbabane', communes: ['Mbabane'] }] },
    ]
  },
  { code: 'LS', name: 'Lesotho', nameFr: 'Lesotho', dialCode: '+266', flag: '🇱🇸', phoneLength: 8,
    regions: [
      { name: 'Maseru', cities: [{ name: 'Maseru', communes: ['Maseru'] }] },
    ]
  },
  { code: 'SO', name: 'Somalia', nameFr: 'Somalie', dialCode: '+252', flag: '🇸🇴', phoneLength: 9,
    regions: [
      { name: 'Banaadir', cities: [{ name: 'Mogadiscio', communes: ['Mogadiscio'] }] },
    ]
  },
  { code: 'SD', name: 'Sudan', nameFr: 'Soudan', dialCode: '+249', flag: '🇸🇩', phoneLength: 9,
    regions: [
      { name: 'Khartoum', cities: [{ name: 'Khartoum', communes: ['Khartoum'] }] },
    ]
  },
  { code: 'LY', name: 'Libya', nameFr: 'Libye', dialCode: '+218', flag: '🇱🇾', phoneLength: 9,
    regions: [
      { name: 'Tripoli', cities: [{ name: 'Tripoli', communes: ['Tripoli'] }] },
    ]
  },
  { code: 'GQ', name: 'Equatorial Guinea', nameFr: 'Guinée Équatoriale', dialCode: '+240', flag: '🇬🇶', phoneLength: 9,
    regions: [
      { name: 'Bioko Norte', cities: [{ name: 'Malabo', communes: ['Malabo'] }] },
    ]
  },
  { code: 'MW', name: 'Malawi', nameFr: 'Malawi', dialCode: '+265', flag: '🇲🇼', phoneLength: 9,
    regions: [
      { name: 'Central', cities: [{ name: 'Lilongwe', communes: ['Lilongwe'] }] },
    ]
  },
];

export const defaultCountry = africanCountries.find(c => c.code === 'CI')!;

export function getCountryByCode(code: string): AfricanCountry | undefined {
  return africanCountries.find(c => c.code === code);
}

export function getCountryByNameFr(name: string): AfricanCountry | undefined {
  return africanCountries.find(c => c.nameFr === name);
}

export function searchCountries(query: string): AfricanCountry[] {
  const q = query.toLowerCase();
  return africanCountries.filter(c =>
    c.nameFr.toLowerCase().includes(q) ||
    c.name.toLowerCase().includes(q) ||
    c.dialCode.includes(q) ||
    c.code.toLowerCase().includes(q)
  );
}

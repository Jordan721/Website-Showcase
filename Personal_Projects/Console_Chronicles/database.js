// Console Chronicles Database
// Historical data about gaming consoles, companies, and games

const consoleData = {
    companies: [
        { id: 1, name: 'Nintendo', founded: 1889, country: 'Japan' },
        { id: 2, name: 'Sony', founded: 1946, country: 'Japan' },
        { id: 3, name: 'Microsoft', founded: 1975, country: 'USA' },
        { id: 4, name: 'Sega', founded: 1960, country: 'Japan' },
        { id: 5, name: 'Atari', founded: 1972, country: 'USA' },
        { id: 6, name: 'NEC', founded: 1899, country: 'Japan' },
        { id: 7, name: 'SNK', founded: 1978, country: 'Japan' },
        { id: 8, name: '3DO', founded: 1991, country: 'USA' },
        { id: 9, name: 'Valve', founded: 1996, country: 'USA' },
        { id: 10, name: 'ASUS', founded: 1989, country: 'Taiwan' },
        { id: 11, name: 'Lenovo', founded: 1984, country: 'China' }
    ],

    consoles: [
        // Generation 1
        { id: 1, name: 'Magnavox Odyssey', company_id: 5, year: 1972, generation: 1, units_sold: 0.35, price: 99.99 },

        // Generation 2
        { id: 2, name: 'Atari 2600', company_id: 5, year: 1977, generation: 2, units_sold: 30.0, price: 199.99 },
        { id: 3, name: 'Intellivision', company_id: 5, year: 1979, generation: 2, units_sold: 3.0, price: 299.99 },
        { id: 4, name: 'ColecoVision', company_id: 5, year: 1982, generation: 2, units_sold: 2.0, price: 175.00 },

        // Generation 3
        { id: 5, name: 'NES', company_id: 1, year: 1983, generation: 3, units_sold: 61.91, price: 179.99 },
        { id: 6, name: 'Sega Master System', company_id: 4, year: 1985, generation: 3, units_sold: 13.0, price: 199.99 },

        // Generation 4
        { id: 7, name: 'Sega Genesis', company_id: 4, year: 1988, generation: 4, units_sold: 30.75, price: 189.99 },
        { id: 8, name: 'Super Nintendo', company_id: 1, year: 1990, generation: 4, units_sold: 49.10, price: 199.99 },
        { id: 9, name: 'TurboGrafx-16', company_id: 6, year: 1987, generation: 4, units_sold: 10.0, price: 199.99 },
        { id: 10, name: 'Neo Geo', company_id: 7, year: 1990, generation: 4, units_sold: 1.0, price: 649.99 },

        // Generation 5
        { id: 11, name: 'PlayStation', company_id: 2, year: 1994, generation: 5, units_sold: 102.49, price: 299.99 },
        { id: 12, name: 'Sega Saturn', company_id: 4, year: 1994, generation: 5, units_sold: 9.26, price: 399.99 },
        { id: 13, name: 'Nintendo 64', company_id: 1, year: 1996, generation: 5, units_sold: 32.93, price: 199.99 },
        { id: 14, name: '3DO Interactive', company_id: 8, year: 1993, generation: 5, units_sold: 2.0, price: 699.99 },

        // Generation 6
        { id: 15, name: 'Dreamcast', company_id: 4, year: 1998, generation: 6, units_sold: 9.13, price: 199.99 },
        { id: 16, name: 'PlayStation 2', company_id: 2, year: 2000, generation: 6, units_sold: 155.0, price: 299.99 },
        { id: 17, name: 'Xbox', company_id: 3, year: 2001, generation: 6, units_sold: 24.0, price: 299.99 },
        { id: 18, name: 'GameCube', company_id: 1, year: 2001, generation: 6, units_sold: 21.74, price: 199.99 },

        // Generation 7
        { id: 19, name: 'Xbox 360', company_id: 3, year: 2005, generation: 7, units_sold: 85.5, price: 399.99 },
        { id: 20, name: 'PlayStation 3', company_id: 2, year: 2006, generation: 7, units_sold: 87.4, price: 599.99 },
        { id: 21, name: 'Wii', company_id: 1, year: 2006, generation: 7, units_sold: 101.63, price: 249.99 },

        // Generation 8
        { id: 22, name: 'Wii U', company_id: 1, year: 2012, generation: 8, units_sold: 13.56, price: 349.99 },
        { id: 23, name: 'PlayStation 4', company_id: 2, year: 2013, generation: 8, units_sold: 117.2, price: 399.99 },
        { id: 24, name: 'Xbox One', company_id: 3, year: 2013, generation: 8, units_sold: 51.0, price: 499.99 },
        { id: 25, name: 'Nintendo Switch', company_id: 1, year: 2017, generation: 8, units_sold: 139.36, price: 299.99 },

        // Generation 9
        { id: 26, name: 'PlayStation 5', company_id: 2, year: 2020, generation: 9, units_sold: 59.3, price: 499.99 },
        { id: 27, name: 'Xbox Series X/S', company_id: 3, year: 2020, generation: 9, units_sold: 31.0, price: 499.99 },
        { id: 28, name: 'Steam Deck', company_id: 9, year: 2022, generation: 9, units_sold: 5.0, price: 399.99 },
        { id: 29, name: 'PlayStation Portal', company_id: 2, year: 2023, generation: 9, units_sold: 2.0, price: 199.99 },
        { id: 30, name: 'Nintendo Switch OLED', company_id: 1, year: 2021, generation: 8, units_sold: 25.0, price: 349.99 },
        { id: 31, name: 'ASUS ROG Ally', company_id: 10, year: 2023, generation: 9, units_sold: 1.5, price: 699.99 },
        { id: 32, name: 'Lenovo Legion Go', company_id: 11, year: 2023, generation: 9, units_sold: 0.5, price: 699.99 }
    ],

    games: [
        // NES Games
        { id: 1, title: 'Super Mario Bros.', console_id: 5, year: 1985, copies_sold: 40.24 },
        { id: 2, title: 'Duck Hunt', console_id: 5, year: 1984, copies_sold: 28.31 },
        { id: 3, title: 'The Legend of Zelda', console_id: 5, year: 1986, copies_sold: 6.51 },

        // SNES Games
        { id: 4, title: 'Super Mario World', console_id: 8, year: 1990, copies_sold: 20.61 },
        { id: 5, title: 'Super Mario Kart', console_id: 8, year: 1992, copies_sold: 8.76 },
        { id: 6, title: 'The Legend of Zelda: A Link to the Past', console_id: 8, year: 1991, copies_sold: 4.61 },

        // PlayStation Games
        { id: 7, title: 'Gran Turismo', console_id: 11, year: 1997, copies_sold: 10.95 },
        { id: 8, title: 'Final Fantasy VII', console_id: 11, year: 1997, copies_sold: 11.0 },
        { id: 9, title: 'Tekken 3', console_id: 11, year: 1998, copies_sold: 8.36 },

        // PlayStation 2 Games
        { id: 10, title: 'Grand Theft Auto: San Andreas', console_id: 16, year: 2004, copies_sold: 17.33 },
        { id: 11, title: 'Grand Theft Auto: Vice City', console_id: 16, year: 2002, copies_sold: 16.15 },
        { id: 12, title: 'Gran Turismo 3: A-Spec', console_id: 16, year: 2001, copies_sold: 14.89 },

        // Nintendo 64 Games
        { id: 13, title: 'Super Mario 64', console_id: 13, year: 1996, copies_sold: 11.91 },
        { id: 14, title: 'Mario Kart 64', console_id: 13, year: 1996, copies_sold: 9.87 },
        { id: 15, title: 'GoldenEye 007', console_id: 13, year: 1997, copies_sold: 8.09 },

        // Xbox 360 Games
        { id: 16, title: 'Kinect Adventures', console_id: 19, year: 2010, copies_sold: 24.0 },
        { id: 17, title: 'Grand Theft Auto V', console_id: 19, year: 2013, copies_sold: 16.0 },
        { id: 18, title: 'Call of Duty: Modern Warfare 3', console_id: 19, year: 2011, copies_sold: 14.73 },

        // Wii Games
        { id: 19, title: 'Wii Sports', console_id: 21, year: 2006, copies_sold: 82.90 },
        { id: 20, title: 'Mario Kart Wii', console_id: 21, year: 2008, copies_sold: 37.38 },
        { id: 21, title: 'Wii Sports Resort', console_id: 21, year: 2009, copies_sold: 33.14 },

        // PlayStation 4 Games
        { id: 22, title: 'Grand Theft Auto V', console_id: 23, year: 2014, copies_sold: 20.0 },
        { id: 23, title: 'The Last of Us Remastered', console_id: 23, year: 2014, copies_sold: 7.0 },
        { id: 24, title: 'Uncharted 4', console_id: 23, year: 2016, copies_sold: 16.0 },

        // Nintendo Switch Games
        { id: 25, title: 'Mario Kart 8 Deluxe', console_id: 25, year: 2017, copies_sold: 60.46 },
        { id: 26, title: 'Animal Crossing: New Horizons', console_id: 25, year: 2020, copies_sold: 45.36 },
        { id: 27, title: 'Super Smash Bros. Ultimate', console_id: 25, year: 2018, copies_sold: 34.22 },
        { id: 28, title: 'The Legend of Zelda: Breath of the Wild', console_id: 25, year: 2017, copies_sold: 31.85 },

        // PlayStation 5 Games
        { id: 29, title: 'Spider-Man: Miles Morales', console_id: 26, year: 2020, copies_sold: 10.8 },
        { id: 30, title: 'Demon\'s Souls', console_id: 26, year: 2020, copies_sold: 1.4 },
        { id: 31, title: 'God of War Ragnarök', console_id: 26, year: 2022, copies_sold: 15.0 },
        { id: 32, title: 'Hogwarts Legacy', console_id: 26, year: 2023, copies_sold: 22.0 },
        { id: 33, title: 'Spider-Man 2', console_id: 26, year: 2023, copies_sold: 11.0 },
        { id: 34, title: 'Final Fantasy XVI', console_id: 26, year: 2023, copies_sold: 3.0 },
        { id: 35, title: 'Stellar Blade', console_id: 26, year: 2024, copies_sold: 1.0 },

        // Nintendo Switch Games (2021-2024)
        { id: 36, title: 'Pokémon Legends: Arceus', console_id: 25, year: 2022, copies_sold: 14.83 },
        { id: 37, title: 'Pokémon Scarlet/Violet', console_id: 25, year: 2022, copies_sold: 25.29 },
        { id: 38, title: 'The Legend of Zelda: Tears of the Kingdom', console_id: 25, year: 2023, copies_sold: 20.80 },
        { id: 39, title: 'Super Mario Bros. Wonder', console_id: 25, year: 2023, copies_sold: 8.0 },
        { id: 40, title: 'Splatoon 3', console_id: 25, year: 2022, copies_sold: 12.21 },
        { id: 41, title: 'Fire Emblem Engage', console_id: 25, year: 2023, copies_sold: 2.0 },
        { id: 42, title: 'Princess Peach: Showtime!', console_id: 25, year: 2024, copies_sold: 1.2 },

        // Xbox Series X/S Games
        { id: 43, title: 'Halo Infinite', console_id: 27, year: 2021, copies_sold: 6.0 },
        { id: 44, title: 'Forza Horizon 5', console_id: 27, year: 2021, copies_sold: 35.0 },
        { id: 45, title: 'Starfield', console_id: 27, year: 2023, copies_sold: 13.0 },
        { id: 46, title: 'Hi-Fi Rush', console_id: 27, year: 2023, copies_sold: 3.0 },

        // Steam Deck Games
        { id: 47, title: 'Elden Ring', console_id: 28, year: 2022, copies_sold: 25.0 },
        { id: 48, title: 'Baldur\'s Gate 3', console_id: 28, year: 2023, copies_sold: 15.0 }
    ]
};

// Historical facts about console companies
const companyHistory = {
    1: {
        name: 'Nintendo',
        history: 'Founded in 1889 as a playing card company, Nintendo transformed into a video game giant. The company revolutionized gaming with the NES in 1983, saving the industry after the 1983 crash.',
        milestones: [
            '1889: Founded as Nintendo Karuta',
            '1983: Released NES/Famicom',
            '1989: Released Game Boy',
            '1996: Introduced 3D gaming with N64',
            '2006: Revolutionary motion controls with Wii',
            '2017: Hybrid console with Switch',
            '2021: Switch OLED model released',
            '2023: Zelda: Tears of the Kingdom breaks records'
        ]
    },
    2: {
        name: 'Sony',
        history: 'Sony entered gaming in 1994 after a failed partnership with Nintendo. The PlayStation became the first console to ship 100 million units, establishing Sony as an industry leader.',
        milestones: [
            '1994: PlayStation launch',
            '2000: PS2 becomes best-selling console ever',
            '2006: Blu-ray integration with PS3',
            '2013: PS4 dominates generation 8',
            '2020: PS5 launches with cutting-edge technology',
            '2022: God of War Ragnarök released',
            '2023: PlayStation Portal streaming device'
        ]
    },
    3: {
        name: 'Microsoft',
        history: 'Microsoft entered console gaming in 2001 with Xbox, bringing PC gaming innovations to consoles. Xbox Live revolutionized online gaming.',
        milestones: [
            '2001: Original Xbox launch',
            '2002: Xbox Live revolutionizes online gaming',
            '2005: Xbox 360 leads HD gaming era',
            '2013: Xbox One multimedia focus',
            '2020: Game Pass and Series X/S launch',
            '2023: Activision Blizzard acquisition completed',
            '2023: Starfield exclusive release'
        ]
    },
    4: {
        name: 'Sega',
        history: 'Sega was a major console manufacturer from 1985-2001. After Dreamcast\'s discontinuation, they became a third-party game publisher.',
        milestones: [
            '1988: Genesis/Mega Drive launch',
            '1991: Sonic the Hedgehog debuts',
            '1994: Saturn struggles against PlayStation',
            '1998: Dreamcast - ahead of its time',
            '2001: Exit console hardware market'
        ]
    }
};

const exampleQueries = [
    "SELECT * FROM consoles WHERE year > 2000 ORDER BY units_sold DESC;",
    "SELECT c.name, co.name as company, c.units_sold FROM consoles c JOIN companies co ON c.company_id = co.id WHERE c.generation = 8;",
    "SELECT co.name, SUM(c.units_sold) as total_sales FROM consoles c JOIN companies co ON c.company_id = co.id GROUP BY co.name ORDER BY total_sales DESC;",
    "SELECT name, year, units_sold FROM consoles WHERE units_sold > 100 ORDER BY units_sold DESC;",
    "SELECT c.name as console, g.title, g.copies_sold FROM games g JOIN consoles c ON g.console_id = c.id ORDER BY g.copies_sold DESC LIMIT 10;",
    "SELECT generation, AVG(units_sold) as avg_sales, COUNT(*) as console_count FROM consoles GROUP BY generation ORDER BY generation;",
    "SELECT c.name, c.year, c.price, c.units_sold FROM consoles c WHERE c.company_id = 1 ORDER BY c.year;",
    "SELECT co.name, COUNT(c.id) as console_count FROM companies co JOIN consoles c ON co.id = c.company_id GROUP BY co.name;"
];

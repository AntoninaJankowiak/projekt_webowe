BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "generations" (
	"g_id"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	PRIMARY KEY("g_id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "items" (
	"id"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	"stackSize"	INTEGER,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "platforms" (
	"id"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	"year"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "character" (
	"id"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	"game"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "nature" (
	"id"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "team_stage" (
	"stageID"	INTEGER NOT NULL,
	"character"	INTEGER NOT NULL,
	PRIMARY KEY("stageID" AUTOINCREMENT),
	FOREIGN KEY("character") REFERENCES "character"("id")
);
CREATE TABLE IF NOT EXISTS "abilities" (
	"id"	INTEGER NOT NULL,
	"name"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "type" (
	"id"	INTEGER NOT NULL,
	"name"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "type_effectivenes" (
	"attack_type"	INTEGER NOT NULL,
	"defense_type"	INTEGER NOT NULL,
	"multi"	REAL NOT NULL,
	FOREIGN KEY("attack_type") REFERENCES "type"("id"),
	PRIMARY KEY("attack_type","defense_type"),
	FOREIGN KEY("defense_type") REFERENCES "type"("id")
);
CREATE TABLE IF NOT EXISTS "shop" (
	"id"	INTEGER NOT NULL,
	"city"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("city") REFERENCES "locations"("id")
);
CREATE TABLE IF NOT EXISTS "shop_item" (
	"shop"	INTEGER NOT NULL,
	"item"	INTEGER NOT NULL,
	"price"	INTEGER NOT NULL,
	FOREIGN KEY("shop") REFERENCES "shop"("id"),
	FOREIGN KEY("item") REFERENCES "items"("id")
);
CREATE TABLE IF NOT EXISTS "pokemon_instance" (
	"id"	INTEGER NOT NULL,
	"pokedex_number"	INTEGER NOT NULL,
	"hp"	INTEGER DEFAULT 1,
	"attack"	INTEGER DEFAULT 1,
	"defense"	INTEGER DEFAULT 1,
	"Sp. Atk"	INTEGER DEFAULT 1,
	"Sp. Def"	INTEGER DEFAULT 1,
	"Total"	INTEGER DEFAULT 6,
	"gender"	TEXT CHECK("gender" IN ('male', 'female', 'genderless')),
	"nature"	INTEGER,
	"ability"	INTEGER,
	FOREIGN KEY("nature") REFERENCES "nature"("id"),
	FOREIGN KEY("ability") REFERENCES "abilities"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "games" (
	"id"	INTEGER NOT NULL,
	"name"	INTEGER NOT NULL,
	"year"	INTEGER,
	"platformId"	INTEGER,
	"gen"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("platformId") REFERENCES "platforms"("id"),
	FOREIGN KEY("gen") REFERENCES "generations"("g_id")
);
CREATE TABLE IF NOT EXISTS "teams" (
	"stage"	INTEGER,
	"pokemon"	INTEGER,
	FOREIGN KEY("pokemon") REFERENCES "pokemon_instance"("id"),
	FOREIGN KEY("stage") REFERENCES "team_stage"("stageID")
);
CREATE TABLE IF NOT EXISTS "pokemon_type" (
	"pokemon"	INTEGER,
	"type"	INTEGER,
	FOREIGN KEY("type") REFERENCES "type"("id"),
	FOREIGN KEY("pokemon") REFERENCES "pokemon_game"("localPokedexNumber")
);
CREATE TABLE IF NOT EXISTS "pokemon_sprite" (
	"pokemon_id"	INTEGER NOT NULL,
	"generation"	INTEGER NOT NULL,
	"sprite"	BLOB,
	"sprite_shiny"	BLOB,
	FOREIGN KEY("pokemon_id") REFERENCES "pokemon_national"("global_id"),
	FOREIGN KEY("generation") REFERENCES "generations"("g_id")
);
CREATE TABLE IF NOT EXISTS "pokemon_national" (
	"global_id"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	"evolves_to"	INTEGER,
	"weight"	REAL,
	"height"	REAL,
	"species"	TEXT,
	PRIMARY KEY("global_id"),
	FOREIGN KEY("evolves_to") REFERENCES "pokemon_national"("global_id")
);
CREATE TABLE IF NOT EXISTS "languages" (
	"id"	INTEGER NOT NULL,
	"name"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "name_other_languages" (
	"language"	INTEGER,
	"pokemon"	INTEGER,
	"name"	TEXT,
	"species"	TEXT,
	FOREIGN KEY("language") REFERENCES "languages"("id")
);
CREATE TABLE IF NOT EXISTS "moves" (
	"id"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	"type"	INTEGER NOT NULL,
	"tm"	INTEGER,
	"hm"	INTEGER,
	"category"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "pokemon_learn_move" (
	"pokemon"	INTEGER NOT NULL,
	"move"	INTEGER NOT NULL,
	"canLearn"	INTEGER NOT NULL CHECK("canLearn" IN (0, 1)),
	"levelLearnt"	INTEGER,
	"power"	INTEGER,
	"accuracy"	INTEGER,
	"category"	TEXT CHECK("category" IN ("status", "special", "physical")),
	FOREIGN KEY("move") REFERENCES "moves"("id"),
	FOREIGN KEY("pokemon") REFERENCES "pokemon_game"("localPokedexNumber")
);
CREATE TABLE IF NOT EXISTS "pokeball" (
	"item_id"	INTEGER,
	"id"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	"catch_rate_multiplayer"	REAL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "locations" (
	"id"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	"game"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("game") REFERENCES "games"("id")
);
CREATE TABLE IF NOT EXISTS "pokemon_game_location" (
	"pokemon"	INTEGER,
	"game"	INTEGER,
	"location"	INTEGER,
	FOREIGN KEY("pokemon") REFERENCES "pokemon_national"("global_id"),
	FOREIGN KEY("location") REFERENCES "locations"("id"),
	FOREIGN KEY("game") REFERENCES "games"("id")
);
CREATE TABLE IF NOT EXISTS "pokemon_game" (
	"localPokedexNumber"	INTEGER NOT NULL,
	"pokemonId"	INTEGER NOT NULL,
	"gameId"	INTEGER NOT NULL,
	"entry"	TEXT,
	"catch_rate"	INTEGER,
	"base_friendship"	INTEGER,
	"maleRatio"	INTEGER,
	"femaleRatio"	INTEGER CHECK(("maleRatio" >= 0 AND "femaleRatio" >= 0) AND ("maleRatio" + "femaleRatio" = 100 OR "maleRatio" = 0 AND "femaleRatio" = 0)),
	PRIMARY KEY("localPokedexNumber"),
	FOREIGN KEY("pokemonId") REFERENCES "pokemon_national"("global_id"),
	FOREIGN KEY("gameId") REFERENCES "games"("id")
);
CREATE TABLE IF NOT EXISTS "egg_groups" (
	"id"	INTEGER NOT NULL,
	"name"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "pokemon_egggroups" (
	"egg_group"	INTEGER NOT NULL,
	"pokemon"	INTEGER NOT NULL,
	FOREIGN KEY("egg_group") REFERENCES "egg_groups"("id"),
	FOREIGN KEY("pokemon") REFERENCES "pokemon_national"("global_id")
);
COMMIT;

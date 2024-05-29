--useful queries
--query 1 - evolution chain
--TODO: MERGE GENERATIONS ONTO METHOD
WITH RECURSIVE evolution_chain(pokemonId, pokemon, sprite, evolvesTo, evolvesToName, evolutionMethods, generations, sprite1) AS (
    SELECT e.pokemonId, n.name,
           (SELECT s.sprite FROM pokemon_sprite s WHERE s.generation IS NULL AND s.pokemon_id=e.pokemonId) AS 'sprite',
           e.evolvesTo, n1.name,
           rtrim(
                       CASE WHEN level IS NOT NULL THEN 'level ' || level || ' and ' ELSE '' END ||
                       CASE WHEN stone IS NOT NULL THEN 'use ' || (SELECT name FROM items WHERE id=stone) || ' and ' ELSE '' END ||
                       CASE WHEN nightimeNeeded IS NOT NULL THEN 'Nighttime' || ' and ' ELSE '' END ||
                       CASE WHEN dayTimeneeded IS NOT NULL THEN 'Daytime' || ' and ' ELSE '' END ||
                       CASE WHEN trade IS NOT NULL THEN 'trade: ' || trade || ' and ' ELSE '' END ||
                       CASE WHEN hold_item IS NOT NULL THEN 'hold ' || (SELECT name FROM items WHERE id=hold_item) || ' and ' ELSE '' END ||
                       CASE WHEN other_requirement IS NOT NULL THEN '' || other_requirement || ' and ' ELSE '' END ||
                       CASE WHEN move_learnt IS NOT NULL THEN 'after learning: ' || (SELECT name FROM moves WHERE id=move_learnt) || ' and ' ELSE '' END ||
                       CASE WHEN pokemon_in_party IS NOT NULL THEN 'pokemon in party: ' || (SELECT pn.name FROM pokemon_national pn WHERE pn.global_id=pokemon_in_party) || ' and ' ELSE '' END ||
                       CASE WHEN male_only IS NOT NULL THEN 'male only: ' || male_only || ' and ' ELSE '' END ||
                       CASE WHEN female_only IS NOT NULL THEN 'female only: ' || female_only || ' and ' ELSE '' END ||
                       CASE WHEN highFriendship IS NOT NULL THEN 'High Friendship' || ' and ' ELSE '' END ||
                       CASE WHEN magneticfield IS NOT NULL THEN 'magnetic field: ' || magneticfield ELSE '' END
               , ' and') AS evolutionMethods,
           CASE WHEN e.generation IS NULL THEN '' ELSE e.generation END,
           CASE WHEN (SELECT s.sprite FROM pokemon_sprite s WHERE s.generation IS NULL AND s.pokemon_id=e.evolvesTo) IS NULL THEN 'no image available' ELSE (SELECT s.sprite FROM pokemon_sprite s WHERE s.generation IS NULL AND s.pokemon_id=e.evolvesTo) END
    FROM pokemon_evolving e
             JOIN pokemon_national n ON e.pokemonId = n.global_id
             JOIN pokemon_national n1 ON e.evolvesTo = n1.global_id
             JOIN pokemon_type pt ON n.global_id=pt.pokemon
             JOIN type t on pt.type = t.id
             JOIN (SELECT pt.pokemon, COUNT(pt.type) as qt FROM pokemon_type pt GROUP BY pt.pokemon) typeQt ON n.global_id = typeQt.pokemon
    WHERE e.pokemonId=${id}
    UNION
    SELECT e.pokemonId, n.name,
           (SELECT s.sprite FROM pokemon_sprite s WHERE s.generation IS NULL AND s.pokemon_id=e.pokemonId) AS 'sprite',
           e.evolvesTo, n1.name,
           rtrim(
                       CASE WHEN level IS NOT NULL THEN 'level ' || level || ' and ' ELSE '' END ||
                       CASE WHEN stone IS NOT NULL THEN 'use ' || (SELECT name FROM items WHERE id=stone) || ' and ' ELSE '' END ||
                       CASE WHEN nightimeNeeded IS NOT NULL THEN 'Nighttime' || ' and ' ELSE '' END ||
                       CASE WHEN dayTimeneeded IS NOT NULL THEN 'Daytime' || ' and ' ELSE '' END ||
                       CASE WHEN trade IS NOT NULL THEN 'trade: ' || trade || ' and ' ELSE '' END ||
                       CASE WHEN hold_item IS NOT NULL THEN 'hold ' || (SELECT name FROM items WHERE id=hold_item) || ' and ' ELSE '' END ||
                       CASE WHEN other_requirement IS NOT NULL THEN '' || other_requirement || ' and ' ELSE '' END ||
                       CASE WHEN move_learnt IS NOT NULL THEN 'after learning: ' || (SELECT name FROM moves WHERE id=move_learnt) || ' and ' ELSE '' END ||
                       CASE WHEN pokemon_in_party IS NOT NULL THEN 'pokemon in party: ' || (SELECT pn.name FROM pokemon_national pn WHERE pn.global_id=pokemon_in_party) || ' and ' ELSE '' END ||
                       CASE WHEN male_only IS NOT NULL THEN 'male only: ' || male_only || ' and ' ELSE '' END ||
                       CASE WHEN female_only IS NOT NULL THEN 'female only: ' || female_only || ' and ' ELSE '' END ||
                       CASE WHEN highFriendship IS NOT NULL THEN 'High Friendship' || ' and ' ELSE '' END ||
                       CASE WHEN magneticfield IS NOT NULL THEN 'magnetic field: ' || magneticfield ELSE '' END
               , ' and')
                                                                                                           AS evolutionMethods,
           CASE WHEN e.generation IS NULL THEN '' ELSE e.generation END,
           CASE WHEN (SELECT s.sprite FROM pokemon_sprite s WHERE s.generation IS NULL AND s.pokemon_id=e.evolvesTo) IS NULL THEN 'no image available' ELSE (SELECT s.sprite FROM pokemon_sprite s WHERE s.generation IS NULL AND s.pokemon_id=e.evolvesTo) END
    FROM pokemon_evolving e
             JOIN pokemon_national n ON e.pokemonId = n.global_id
             JOIN pokemon_national n1 ON e.evolvesTo = n1.global_id
             JOIN evolution_chain ec ON e.pokemonId = ec.evolvesTo
)
SELECT * FROM evolution_chain;

--query 1.1 does pokemon have next/previous evolution?
SELECT DISTINCT n.global_id, n.name,
                (CASE WHEN e.pokemonId IS NOT NULL THEN '1' ELSE '0' END) AS 'evolves',
                (CASE WHEN e1.evolvesTo IS NOT NULL THEN '1' ELSE '0' END) AS 'is evolved'
FROM pokemon_national n LEFT JOIN pokemon_evolving e ON n.global_id=e.pokemonId LEFT JOIN pokemon_evolving e1 ON n.global_id=e1.evolvesTo
WHERE n.global_id=${id};

--query 2 - get types of pokemon
WITH CTE AS(
    SELECT pn.global_id, pn.name, (substr(t1.name,1,1)||lower(substr(t1.name,2))) AS type1, (substr(t2.name,1,1)||lower(substr(t2.name,2))) AS type2, ROW_NUMBER() OVER(PARTITION BY pn.global_id ORDER BY t1.name) as rn
    FROM pokemon_national pn JOIN pokemon_type pt1 ON pn.global_id=pt1.pokemon JOIN type t1 on pt1.type = t1.id
                             LEFT JOIN pokemon_type pt2 ON pn.global_id=pt2.pokemon AND pt1.type != pt2.type LEFT JOIN type t2 on pt2.type = t2.id
    WHERE pn.global_id=:id
)
SELECT global_id, name, type1, type2
FROM CTE
WHERE rn = 1;

--todo: 2 queries because mixing them would make the query 100 lines long, and make it very slow plus it's just better because this one will be needed too, maybe mix them in future

SELECT  n.name, t.name
FROM pokemon_national n JOIN pokemon_type pt ON n.global_id=pt.pokemon JOIN type t on pt.type = t.id;


--query 3 - get basic data of pokemon (national n, spcies, height weight gender ratios etc,)
SELECT global_id, name, coalesce(pageDescription, '<description coming soon>') AS 'description', species, height, weight, maleRatio, femaleRatio, base_friendship, special
FROM pokemon_national
WHERE global_id=:id;

--query 4 - get ids of pokemon from different games
SELECT pg.localPokedexNumber, p.description
FROM pokemon_national pn JOIN pokemon_game pg on pn.global_id = pg.pokemonId JOIN pokedex p on pg.pokedexId = p.pokedexId
WHERE global_id=:id;

--query 5.1 get number of types
SELECT COUNT(t.type) as 'tq'
FROM pokemon_national p JOIN pokemon_type t ON p.global_id=t.pokemon
WHERE global_id=:id;

--will be useful for generating the chart
--query 5.2 get type defenses 1 type
--will run only for pokemons with 1 type!!!
SELECT pn.name, te.attack_type, te.multi
FROM pokemon_national pn JOIN pokemon_type pt ON pn.global_id=pt.pokemon JOIN type_effectivenes te ON pt.type=te.defense_type
WHERE global_id=:id AND te.gens LIKE '%9'
  AND (SELECT COUNT(t.type) as 'tq'
       FROM pokemon_national p JOIN pokemon_type t ON p.global_id=t.pokemon
       WHERE global_id=:id)=1;

--query 5.3 get type defenses 2 types
WITH CTE AS
         (SELECT DISTINCT pn.name as 'name1', te1.attack_type as 'attack', te1.defense_type as 'defense', te2.defense_type, te1.multi*te2.multi as 'multi1',
                          ROW_NUMBER() OVER (PARTITION BY pn.name, te1.attack_type ORDER BY te1.defense_type, te2.defense_type) as rn
          FROM pokemon_national pn JOIN pokemon_type pt1 ON pn.global_id=pt1.pokemon JOIN type_effectivenes te1 ON pt1.type=te1.defense_type
                                   JOIN pokemon_type pt2 ON pn.global_id=pt2.pokemon JOIN type_effectivenes te2 ON pt2.type=te2.defense_type AND te2.attack_type=te1.attack_type
              AND te1.defense_type!=te2.defense_type
          WHERE global_id=:id AND te1.gens LIKE '%9' AND te2.gens LIKE '%9'
            AND (SELECT COUNT(t.type) as 'tq'
                 FROM pokemon_national p JOIN pokemon_type t ON p.global_id=t.pokemon
                 WHERE global_id=:id)=2
         )
SELECT name1, attack, multi1
FROM CTE c
WHERE rn = 1
ORDER BY attack;


-- todo: do the same for attacks
--query 5.4 get type attacks 1 type
SELECT pn.name, te.defense_type, te.multi
FROM pokemon_national pn JOIN pokemon_type pt ON pn.global_id=pt.pokemon JOIN type_effectivenes te ON pt.type=te.attack_type
WHERE global_id=:id AND te.gens LIKE '%9'
  AND (SELECT COUNT(t.type) as 'tq'
       FROM pokemon_national p JOIN pokemon_type t ON p.global_id=t.pokemon
       WHERE global_id=:id)=1;

--query 5.5 get type attacks 2 types
WITH CTE AS
         (SELECT DISTINCT pn.name as 'name1', te1.defense_type as 'defense', te1.attack_type as 'attack', te2.attack_type, te1.multi*te2.multi as 'multi1',
                          ROW_NUMBER() OVER (PARTITION BY pn.name, te1.defense_type ORDER BY te1.attack_type, te2.attack_type) as rn
          FROM pokemon_national pn JOIN pokemon_type pt1 ON pn.global_id=pt1.pokemon JOIN type_effectivenes te1 ON pt1.type=te1.attack_type
                                   JOIN pokemon_type pt2 ON pn.global_id=pt2.pokemon JOIN type_effectivenes te2 ON pt2.type=te2.attack_type AND te2.defense_type=te1.defense_type
              AND te1.attack_type!=te2.attack_type
          WHERE global_id=:id AND te1.gens LIKE '%9' AND te2.gens LIKE '%9'
            AND (SELECT COUNT(t.type) as 'tq'
                 FROM pokemon_national p JOIN pokemon_type t ON p.global_id=t.pokemon
                 WHERE global_id=:id)=2)
SELECT name1, defense, multi1
FROM CTE c
WHERE rn = 1
ORDER BY defense;

--query 6 - get pokedex entries
SELECT pe.pokemonId, pe.entry, ltrim(g.name, 'Pokemon ') AS 'game'
FROM pokemon_national pn JOIN pokedex_entry pe ON pn.global_id=pe.pokemonId JOIN games g ON pe.game = g.id
WHERE pokemonId=:id;

--helper TODO: scrape more pokedex entries, these below are missing for some reason IMPORTANT
SELECT global_id, name
FROM pokemon_national pn LEFT JOIN pokedex_entry pe ON pn.global_id=pe.pokemonId
WHERE pokemonId IS NULL AND global_id<252;

--query 7.1 get main sprite
SELECT pokemon_id,sprite
FROM pokemon_sprite
WHERE generation IS NULL
  AND pokemon_id=${id};

--query 7.2 get main and shiny sprite
SELECT pokemon_id,sprite, sprite_shiny
FROM pokemon_sprite
WHERE generation IS NULL
  AND pokemon_id=${id};

--query 7.3 get sprites for each gen
SELECT pokemon_id,generation, sprite, sprite_shiny
FROM pokemon_sprite
WHERE generation IS NOT NULL
  AND pokemon_id=${id};


--query 8 get next and previous pokemon
SELECT global_id, name, 'prev' as 'type'
FROM pokemon_national
WHERE global_id=${id}-1
UNION
SELECT global_id, name, 'next'
FROM pokemon_national
WHERE global_id=${id}+1;


--query 9 get locations
SELECT p.global_id, ltrim(g.name, 'Pokemon ') AS 'game', pgl.type,
       coalesce(l.name, CASE WHEN pgl.type='e' THEN 'Evolve previous pokemon'
                             WHEN pgl.type='o' THEN 'Trade/migrate from another game' END) AS 'location'
FROM pokemon_game_location pgl
         JOIN pokemon_national p ON p.global_id = pgl.pokemon
         JOIN main.games g on pgl.game = g.id
         LEFT JOIN main.locations l on pgl.location = l.id
WHERE global_id=${id}
ORDER BY g.id;

--query 10 get moves
SELECT p.global_id, x.description,l.levelLearnt, m.name AS 'move', t.name AS 'type', m.category, COALESCE(m.power, '-') AS 'power', COALESCE(m.accuracy, '-') AS 'accuracy'
FROM pokemon_national p JOIN pokemon_learn_move l on p.global_id = l.pokemon JOIN moves m on l.move = m.id JOIN pokedex x on l.pokedexId = x.pokedexId JOIN type t on m.type = t.id
WHERE global_id=${id}
ORDER BY x.pokedexId, l.levelLearnt;

--query 10.1 get moves for pokemon and gamefamily
SELECT p.global_id, x.description,l.levelLearnt, m.name AS 'move', t.name AS 'type', m.category, COALESCE(m.power, '-') AS 'power', COALESCE(m.accuracy, '-') AS 'accuracy'
FROM pokemon_national p JOIN pokemon_learn_move l on p.global_id = l.pokemon JOIN moves m on l.move = m.id JOIN pokedex x on l.pokedexId = x.pokedexId JOIN type t on m.type = t.id
WHERE global_id=${id} AND x.pokedexId=${dexId}
ORDER BY l.levelLearnt;
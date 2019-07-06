SELECT abilities.id, types.id AS type_id, name AS type_name,title, stars, start_date, extra FROM abilities
INNER JOIN types ON types.id = abilities.type;
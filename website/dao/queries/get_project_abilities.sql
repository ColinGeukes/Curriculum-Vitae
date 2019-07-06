SELECT abilities.id, type AS type_id, name as type_name, title FROM project_ability
INNER JOIN abilities ON project_ability.project_id = ? AND project_ability.ability_id = abilities.id
INNER JOIN types ON types.id = abilities.type;

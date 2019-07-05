SELECT id, type, title FROM project_ability
INNER JOIN abilities ON project_ability.project_id = ? AND project_ability.ability_id = abilities.id;
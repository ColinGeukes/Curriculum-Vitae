select * from abilities ${type !== '' ? where : ''}
${type !== '' ? 'type = ' + type  + '' : ''};
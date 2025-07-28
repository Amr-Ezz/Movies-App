const { EntitySchema } = require('typeorm');

const Movie = new EntitySchema({
  name: 'Movie',
  tableName: 'movies',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true
    },
    title: {
      type: 'varchar',
      length: 255,
      nullable: false
    },
    type: {
      type: 'enum',
      enum: ['Movie', 'TV Show'],
      default: 'Movie',
      nullable: false
    },
    director: {
      type: 'varchar',
      length: 255,
      nullable: false
    },
    budget: {
      type: 'varchar',
      length: 100,
      nullable: true
    },
    location: {
      type: 'varchar',
      length: 255,
      nullable: true
    },
    duration: {
      type: 'varchar',
      length: 100,
      nullable: true
    },
    yearTime: {
      type: 'varchar',
      length: 100,
      nullable: true,
      name: 'year_time'
    },
    description: {
      type: 'text',
      nullable: true
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
      name: 'created_at'
    },
    updatedAt: {
      type: 'timestamp',
      updateDate: true,
      name: 'updated_at'
    }
  }
});

module.exports = { Movie }; 
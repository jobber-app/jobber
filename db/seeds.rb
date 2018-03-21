# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Run `rake db:seed`

user1 = User.create(name: 'Foo Bar', email: 'example@example.com', password: 'Foo Bar Baz')

user2 = User.create(name: 'Spam Baz', email: 'ham@spam.com', password: 'Foo Foo Foo')

# Fill out your jobs here....
# job11 = user1.jobs.create( ... )
# job12 = user2.jobs.create( ... )

# job21 = user2.jobs.create( ... )
# job22 = user2.jobs.create( ... )




# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Run `rake db:seed`

user0 = User.create!(name: 'djt', email: 'djt@djt.com', password: 'deejaytee', password_confirmation: 'deejaytee')

user1 = User.create!(name: 'ma', email: 'ma@ma.com', password: 'mamamama', password_confirmation: 'mamamama')

# Fill out your jobs here....
job00 = User.first.jobs.create!({ title: "Analyst",         
                                 applydate: "2018-05-03 12:01:01", 
                                 status: 0, 
                                 #employer: "Beare's Boys",      
                                 posttext: "Analyze for us!" })
job01 = User.first.jobs.create!({ title: "Central Manager", 
                                 applydate: "2018-05-06 12:01:01", 
                                 status: 1, 
                                 #employer: "Derek and Sons",    
                                 posttext: "Manage things!" })
job10 = User.last.jobs.create!({ title: "Etherium Expert", 
                                applydate: "2018-05-09 12:01:01", 
                                status: 2, 
                                #employer: "Fully Loaded Inc.", 
                                posttext: "Give us blockchain." })
job11 = User.last.jobs.create!({ title: "Gardening Guru",  
                                applydate: "2018-05-30 12:01:01", 
                                status: 1, 
                                #employer: "Happy Records",     
                                posttext: "Demanding shrubberies!" })

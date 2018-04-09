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
job00 = user0.jobs.create!({ title: "Analyst",         
                             employer: "Beare's Boys",
                             postlink: "https://www.google.com",
                             posttext: "Analyze for us!",
                             applydate: "2018-05-03 12:01:01",
                             location: "Edinburgh, United Kingdom",
                             status: "0", 
                             coverletter: "...",
                             contactdetails: "Email a cover letter and cv.",
                             additionalinfo: "Site gives me deja vu."
                           })
job01 = user0.jobs.create!({ title: "Central Manager", 
                             employer: "Derek and Sons",
                             postlink: "https://www.google.com",
                             posttext: "Manage things!", 
                             applydate: "2018-05-06 12:01:01", 
                             location: "Edinburgh, United Kingdom",
                             status: "0", 
                             coverletter: "...",
                             contactdetails: "Email a cover letter and cv.",
                             additionalinfo: "Site gives me deja vu."
                           })
job10 = user1.jobs.create!({ title: "Etherium Expert", 
                             employer: "Fully Loaded Inc.", 
                             postlink: "https://www.google.com",
                             posttext: "Give us blockchain.",
                             applydate: "2018-05-09 12:01:01", 
                             location: "Edinburgh, United Kingdom",
                             status: "2", 
                             coverletter: "...",
                             contactdetails: "Email a cover letter and cv.",
                             additionalinfo: "Site gives me deja vu."
                           })
job11 = user1.jobs.create!({ title: "Gardening Guru",  
                             employer: "Happy Records",     
                             postlink: "https://www.google.com",
                             posttext: "Demanding shrubberies!",
                             applydate: "2018-05-30 12:01:01", 
                             location: "Edinburgh, United Kingdom",
                             status: "0", 
                             coverletter: "...",
                             contactdetails: "Email a cover letter and cv.",
                             additionalinfo: "Site gives me deja vu."
                           })

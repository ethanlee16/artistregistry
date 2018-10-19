# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Picasso = Artist.create(
  id: 0,
  name: 'Picasso',
  email: 'picasso@picasso.com',
  password: 'password',
  program: 'art',
  open_to_commissions: true
  )
#Picasso has id 0
Picasso.save!
Gates = Buyer.create(
  id:0,
  name: 'Bill Gates',
  email: 'bill@gates.com',
  password: 'password1',
  phone_number: '111-111-1111'
  )
#Gates has id 1
Gates.save!
Lisa = Work.create(
  title: 'Mona Lisa',
  media: 'Oil on canvas',
  work_type: 'Painting',
  status: 0,
  price: 43.45
  )
Lisa.artist_id = Picasso.id
Lisa.save!
#Lisa's id is 1

var mongoose = require('mongoose');

var peopleSchema = new mongoose.Schema({
  email: 		{
  					type: String,
  					unique: true
  				},
  firstName: 	{
        			type: String,
		        	required: true
		      	},
  lastName: 	{
			        type: String,
			        required: true
      			},
  school: 		{
  					type: String,
        			enum: ['Computación', 'Física', 'Matemática', 'Geoquímica', 'Biología']
        		},
  photos: 		[{
		  			photo: String //Base 64 encoded
		  		}],
  updated_at: 	{ type: Date, default: Date.now }
});

module.exports = mongoose.model('People', peopleSchema);
const mongoose = require('mongoose'); 
  
const movieSchema = new mongoose.Schema({ 

    Picture: {
        type: String,
        required: true
    },

    Title: { 
        type: String,
        required: true  
    }, 

    Genre: { 
        type: String,
        required: true 
    },

    Year_Released: {
        type: Number,
        required: true
    },

    Favorite_Cast: {
        type: String,
        required: true
    }
    
});

module.exports = new mongoose.model('Movie', movieSchema); 

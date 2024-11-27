require('dotenv').config();// chargement des variable d'environement avec dotenv
const mongoose = require("mongoose"); //Chargement de Mongoose pour interagir avec MongoDB
const contact= require('./models/contact'); //Chargement du modèle contact
mongoose.connect(process.env.MONGO_URI,{ //Connexion à MongoDB avec Mongoose
    useNewUrlParser:true, 
    useUnifiedTopology:true
})
.then(()=>{ // Gestion des promesses avec .then() et .catch() 
    console.log('connected to mongo db');
})
.catch((err)=>{
    console.error('error connecting to mongo db', err);
})
// creation des objets
const createContact= async()=>{
    const contacts=[
        {
            fullName:'saadouli zeineb',
            email:'sadoulizeineb@yahoo.com',
            mobileNumber: 1234567893,
            birthdate: new Date('2-6-1992').getTime()
        },
        {
            fullName:'zaghdoudi hosni',
            email:'hosnizaghdoudi@yahoo.com',
            mobileNumber: 1236547892,
            birthdate: new Date('4-11-1987').getTime()

        },
        {
        fullName:'basdouri rawdha',
        email:'basdourirawdha@yahoo.com',
        mobileNumber:1234567801,
        birthdate: new Date('12-12-1969').getTime()
    }
    ];
    // ajout d'un contact s'il n'existe pas 
    for (let contactData of contacts) {
        try {
            const existingContact = await contact.findOne({ email: contactData.email });
            if (existingContact) {
                console.log(`Le contact avec l'email ${contactData.email} existe déjà`);
            } else {
                const newContact = new contact(contactData);
                await newContact.save();
                console.log('Contact ajouté:', newContact);
            }
        } catch (err) {
            console.error('Erreur lors de la création du contact:', err);
        }
    }
};
  // methode de recherche par email
const searchContact = async (email)=>{
    try {
    const cont= await contact.findOne({email:email})
    if(cont){
        console.log("contact trouvé", cont);
    }else{
        console.log("aucun contact trouvé");
    }

    } catch (err) {
        console.error("erreur",err);
        
    }
}
// methode de supression
const removeContact = async (email)=>{
    try {
    const removecont= await contact.findOneAndDelete({email:email});
    if(removecont){
        console.log("contact supprimé", removecont);
    }else{
        console.log("aucun contact trouvé pour supprimer");
    }

    } catch (err) {
        console.error("erreur",err);
        
    }
}
//update method
const upDate = async (email,newName)=>{
    try {
    const updatedcont= await contact.findOneAndUpdate(
        {email:email},
    {fullName:newName},
{new: true});
    if(updatedcont){
        console.log("contact mis à jour", updatedcont);
    }else{
        console.log("aucun contact trouvé pour mettre à jour ");
    }

    } catch (err) {
        console.error("erreur",err);
        
    }
}

createContact();
//searchContact('sadoulizeineb@yahoo.com');
//removeContact('sadoulizeineb@yahoo.com');
//upDate('hosnizaghdoudi@yahoo.com','bader');
   
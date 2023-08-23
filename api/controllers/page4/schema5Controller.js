const Schema5Model = require('../../models/page4/tableModel');

const getSchema5Data = async (req, res) => {
  const user_id= req.user._id
  try {
const data = await Schema1Model.find({user_id});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const uploadImage = async (req, res) => {
  const imagePath = req.file.path; // Path to the uploaded image
  const notes = req.body.notes; // Get notes from the request

  try {
    const newDocument = new Schema5Model({
      files: [{ path: imagePath, type: 'image' }],
      notes
    });

    const savedDocument = await newDocument.save();
    res.status(201).json(savedDocument);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

module.exports = { getSchema5Data, uploadImage };

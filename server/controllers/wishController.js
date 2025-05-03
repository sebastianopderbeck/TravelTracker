import Wish from '../models/Wish.js';

export const getWishes = async (req, res) => {
  try {
    const wishes = await Wish.find().sort({ createdAt: -1 });
    res.json(wishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createWish = async (req, res) => {
  const wish = new Wish({
    text: req.body.text
  });

  try {
    const newWish = await wish.save();
    res.status(201).json(newWish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateWish = async (req, res) => {
  try {
    const wish = await Wish.findById(req.params.id);
    if (!wish) {
      return res.status(404).json({ message: 'Deseo no encontrado' });
    }

    wish.text = req.body.text;
    const updatedWish = await wish.save();
    res.json(updatedWish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteWish = async (req, res) => {
  try {
    const wish = await Wish.findById(req.params.id);
    if (!wish) {
      return res.status(404).json({ message: 'Deseo no encontrado' });
    }

    await wish.deleteOne();
    res.json({ message: 'Deseo eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 
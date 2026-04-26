import { Asset } from '../models/Asset.js';

export async function getAssets(req, res) {
  try {
    const { search = '', status = '', category = '' } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { serialNumber: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    if (status) {
      query.status = status;
    }

    if (category) {
      query.category = category;
    }

    const assets = await Asset.find(query)
      .populate('category')
      .sort({ createdAt: -1 });

    res.json(assets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getAssetById(req, res) {
  try {
    const asset = await Asset.findById(req.params.id).populate('category');
    if (!asset) {
      return res.status(404).json({ message: 'Eszköz nem található.' });
    }
    res.json(asset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createAsset(req, res) {
  try {
    const asset = await Asset.create(req.body);
    const populated = await asset.populate('category');
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function updateAsset(req, res) {
  try {
    const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('category');

    if (!asset) {
      return res.status(404).json({ message: 'Eszköz nem található.' });
    }

    res.json(asset);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function deleteAsset(req, res) {
  try {
    const asset = await Asset.findByIdAndDelete(req.params.id);
    if (!asset) {
      return res.status(404).json({ message: 'Eszköz nem található.' });
    }

    res.json({ message: 'Eszköz törölve.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

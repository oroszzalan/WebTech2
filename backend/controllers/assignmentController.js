import { Assignment } from '../models/Assignment.js';
import { Asset } from '../models/Asset.js';

export async function getAssignments(req, res) {
  try {
    const assignments = await Assignment.find()
      .populate({ path: 'asset', populate: { path: 'category' } })
      .sort({ createdAt: -1 });

    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createAssignment(req, res) {
  try {
    const { asset: assetId } = req.body;

    const asset = await Asset.findById(assetId);
    if (!asset) {
      return res.status(404).json({ message: 'Az eszköz nem található.' });
    }

    if (asset.status === 'assigned') {
      return res.status(400).json({ message: 'Az eszköz már ki van adva.' });
    }

    const assignment = await Assignment.create(req.body);
    asset.status = 'assigned';
    await asset.save();

    const populated = await assignment.populate({ path: 'asset', populate: { path: 'category' } });
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function returnAssignment(req, res) {
  try {
    const assignment = await Assignment.findById(req.params.id).populate('asset');
    if (!assignment) {
      return res.status(404).json({ message: 'Kiadás nem található.' });
    }

    if (assignment.returnedAt) {
      return res.status(400).json({ message: 'Ez az eszköz már vissza lett véve.' });
    }

    assignment.returnedAt = new Date();
    await assignment.save();

    await Asset.findByIdAndUpdate(assignment.asset._id, { status: 'available' });

    const populated = await assignment.populate({ path: 'asset', populate: { path: 'category' } });
    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

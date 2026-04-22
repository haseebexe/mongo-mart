import { Address } from "../models/Address.js";
import TryCatch from "../utils/TryCatch.js";

export const addAddress = TryCatch(async (req, res) => {

    const { address, phone } = req.body;

  const createAddress = await Address.create({
    address: address,
    phone: phone,
    user: req.user._id,
  });

  res.json({
    message: "Address has been added",
    createAddress,
  });
});

export const getAllAddress = TryCatch(async (req, res) => {
  const allAddress = await Address.find({
    user: req.user._id,
  });

  res.json(allAddress);
});

export const getSingleAddress = TryCatch(async(req, res) => {
    const singleAddress = await Address.findById(req.params.id)

    res.json(singleAddress);

})

export const removeAddress = TryCatch(async(req, res) => {
    const address = await Address.findOne({
        _id: req.params.id,
        user: req.user._id,
    })

    if (!address) {
    return res.status(404).json({
        message: "Address not found"
    });
}

    await address.deleteOne()

    res.json({
        message: "Address has been deleted"
    })
})

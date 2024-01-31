import HttpError from "../helpers/HttpError.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";
import { Contact } from "../models/contacts.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find({}, "name email phone favorite");
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Contact.findById(id);

    if (!result) {
      throw HttpError(404, "Not found ");
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Contact.findByIdAndDelete(id);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { error } = createContactSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const newContact = await Contact.create(req.body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const bodyFields = Object.keys(req.body);
    if (bodyFields.length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }

    const { error } = updateContactSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateFavourite = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = updateFavoriteSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Public
const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });  //now it is private
    res.status(200).json(contacts);
});

// @desc    Create a new contact
// @route   POST /api/contacts
// @access  Public
const createContact = asyncHandler(async (req, res) => {
    console.log("THE RECEIVED REQUEST FROM CLIENT ->", req.body);
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error('Please provide name, email, and phone');
    }

    const contact = await Contact.create({
        user_id: req.user.id,  // Assign to the logged-in user
        name,
        email,
        phone,

    });

    res.status(201).json(contact);
});

// @desc    Get a single contact
// @route   GET /api/contacts/:id
// @access  Private
const getSingleContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error(`Contact not found with id: ${req.params.id}`);
    }

    // Ensure the logged-in user owns the contact
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You are not authorized to view this contact");
    }

    res.status(200).json(contact);
});

// @desc    Update a contact
// @route   PUT /api/contacts/:id
// @access  Private
const updateContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error(`Contact not found with id: ${req.params.id}`);
    }

    // Ensure the logged-in user owns the contact
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You are not authorized to update this contact");
    }

    // Update fields only if provided
    contact.name = name || contact.name;
    contact.email = email || contact.email;
    contact.phone = phone || contact.phone;

    const updatedContact = await contact.save();

    res.status(200).json(updatedContact);
});

// @desc    Delete a contact
// @route   DELETE /api/contacts/:id
// @access  Private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error(`Contact not found with id: ${req.params.id}`);
    }

    // Ensure the logged-in user owns the contact
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You are not authorized to delete this contact");
    }

    await contact.deleteOne();

    res.status(200).json({
        message: `Contact deleted successfully`,
        id: req.params.id,
    });
});


module.exports = {
    getAllContacts,
    createContact,
    getSingleContact,
    updateContact,
    deleteContact,
};
